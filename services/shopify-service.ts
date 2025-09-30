const SHOPIFY_STORE_DOMAIN = '0hiwit-w1.myshopify.com';
const STOREFRONT_ACCESS_TOKEN = '9dfc03c1652c7018e93d16fb979f0db8';


const SHOPIFY_GRAPHQL_URL = `https://${SHOPIFY_STORE_DOMAIN}/api/2024-01/graphql.json`;

interface ShopifyProduct {
  id: string;
  title: string;
  description: string;
  handle: string;
  images: {
    edges: Array<{
      node: {
        url: string;
        altText: string | null;
      };
    }>;
  };
  priceRange: {
    minVariantPrice: {
      amount: string;
      currencyCode: string;
    };
  };
  variants: {
    edges: Array<{
      node: {
        id: string;
        title: string;
        priceV2: {
          amount: string;
          currencyCode: string;
        };
        availableForSale: boolean;
      };
    }>;
  };
}

class ShopifyService {
  private async fetchGraphQL(query: string, variables: any = {}) {
    try {
      const response = await fetch(SHOPIFY_GRAPHQL_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Shopify-Storefront-Access-Token': STOREFRONT_ACCESS_TOKEN,
        },
        body: JSON.stringify({ query, variables }),
      });

      const result = await response.json();

      if (result.errors) {
        console.error('GraphQL errors:', result.errors);
        throw new Error(result.errors[0].message);
      }

      return result.data;
    } catch (error) {
      console.error('Shopify API error:', error);
      throw error;
    }
  }

  async getAllProducts(first: number = 20) {
    const query = `
      query GetProducts($first: Int!) {
        products(first: $first) {
          edges {
            node {
              id
              title
              description
              handle
              images(first: 5) {
                edges {
                  node {
                    url
                    altText
                  }
                }
              }
              priceRange {
                minVariantPrice {
                  amount
                  currencyCode
                }
              }
              variants(first: 10) {
                edges {
                  node {
                    id
                    title
                    priceV2 {
                      amount
                      currencyCode
                    }
                    availableForSale
                  }
                }
              }
            }
          }
        }
      }
    `;

    const data = await this.fetchGraphQL(query, { first });
    return data.products.edges.map((edge: any) => edge.node);
  }

  async getProductByHandle(handle: string) {
    const query = `
      query GetProductByHandle($handle: String!) {
        productByHandle(handle: $handle) {
          id
          title
          description
          handle
          images(first: 10) {
            edges {
              node {
                url
                altText
              }
            }
          }
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
          variants(first: 20) {
            edges {
              node {
                id
                title
                priceV2 {
                  amount
                  currencyCode
                }
                availableForSale
                selectedOptions {
                  name
                  value
                }
              }
            }
          }
        }
      }
    `;

    const data = await this.fetchGraphQL(query, { handle });
    return data.productByHandle;
  }

  async getProductsByCollection(collectionHandle: string, first: number = 20) {
    const query = `
      query GetProductsByCollection($handle: String!, $first: Int!) {
        collectionByHandle(handle: $handle) {
          title
          products(first: $first) {
            edges {
              node {
                id
                title
                description
                handle
                images(first: 5) {
                  edges {
                    node {
                      url
                      altText
                    }
                  }
                }
                priceRange {
                  minVariantPrice {
                    amount
                    currencyCode
                  }
                }
              }
            }
          }
        }
      }
    `;

    const data = await this.fetchGraphQL(query, { handle: collectionHandle, first });
    return data.collectionByHandle?.products.edges.map((edge: any) => edge.node) || [];
  }

  async searchProducts(searchTerm: string, first: number = 20) {
    const query = `
      query SearchProducts($query: String!, $first: Int!) {
        products(first: $first, query: $query) {
          edges {
            node {
              id
              title
              description
              handle
              images(first: 5) {
                edges {
                  node {
                    url
                    altText
                  }
                }
              }
              priceRange {
                minVariantPrice {
                  amount
                  currencyCode
                }
              }
            }
          }
        }
      }
    `;

    const data = await this.fetchGraphQL(query, { query: searchTerm, first });
    console.log(data.products.edges.map((edge: any) => edge.node))
    return data.products.edges.map((edge: any) => edge.node);
  }
}

export default new ShopifyService();
export type { ShopifyProduct };
