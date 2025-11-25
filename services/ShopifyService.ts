// ShopifyService.ts
import { gql } from "graphql-request";
import { GraphQLClient } from "graphql-request";

// Replace with your own values
const SHOPIFY_DOMAIN = "your-shop-name.myshopify.com";
const STOREFRONT_ACCESS_TOKEN = "your-storefront-access-token";

const endpoint = `https://${SHOPIFY_DOMAIN}/api/2025-01/graphql.json`;

const client = new GraphQLClient(endpoint, {
  headers: {
    "X-Shopify-Storefront-Access-Token": STOREFRONT_ACCESS_TOKEN,
    "Content-Type": "application/json",
  },
});

// ─────────────────────────────────────────────
// Interfaces
// ─────────────────────────────────────────────
export interface ShopifyImage {
  url: string;
  altText?: string | null;
}

export interface ShopifyVariant {
  id: string;
  title: string;
  priceV2: {
    amount: string;
    currencyCode: string;
  };
  availableForSale: boolean;
  selectedOptions: {
    name: string;
    value: string;
  }[];
}

export interface ShopifyStandardizedValue {
  name: string;
  value: string;
}

export interface ShopifyStandardizedProductType {
  standardizedProductTypeId: string;
  productTaxonomyNode: {
    name: string;
    fullName: string;
  };
  values: ShopifyStandardizedValue[];
}

export interface ShopifyProduct {
  id: string;
  title: string;
  description: string;
  handle: string;
  images: ShopifyImage[];
  priceRange: {
    minVariantPrice: {
      amount: string;
      currencyCode: string;
    };
  };
  variants: ShopifyVariant[];
  standardizedProductType?: ShopifyStandardizedProductType;
}

// ─────────────────────────────────────────────
// GraphQL Query
// ─────────────────────────────────────────────
const GET_ALL_PRODUCTS = gql`
  query GetProducts($first: Int!) {
    products(first: $first) {
      edges {
        node {
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
                availableForSale
                priceV2 {
                  amount
                  currencyCode
                }
                selectedOptions {
                  name
                  value
                }
              }
            }
          }
          standardizedProductType {
            standardizedProductTypeId
            productTaxonomyNode {
              name
              fullName
            }
            values {
              name
              value
            }
          }
        }
      }
    }
  }
`;

// ─────────────────────────────────────────────
// Service Methods
// ─────────────────────────────────────────────
export const ShopifyService = {
  async getAllProducts(limit = 50): Promise<ShopifyProduct[]> {
    const data = await client.request(GET_ALL_PRODUCTS, { first: limit });

    const products: ShopifyProduct[] = data.products.edges.map(
      ({ node }: any) => ({
        id: node.id,
        title: node.title,
        description: node.description,
        handle: node.handle,
        images: node.images.edges.map((img: any) => img.node),
        priceRange: node.priceRange,
        variants: node.variants.edges.map((v: any) => v.node),
        standardizedProductType: node.standardizedProductType,
      })
    );

    return products;
  },
};
