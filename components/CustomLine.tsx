import React,{useState} from 'react';
import { View, StyleSheet, TextStyle } from 'react-native';

interface LineProps {
    length: number;
    x?: number;
    y?: number;
    color: string; // Changed to string for color
    thickness?: number; // Made optional with default
    absolute?:boolean;
    style?:TextStyle
}

const CustomLine: React.FC<LineProps> = ({
    length,
    x,
    y,
    color,
    thickness = 5,
    absolute,
    style
}) => {

    const [abs, setAbs] = useState(absolute);
    return (
        <View style={[
            {   
                ...style,
                width: length,
                left: x,
                top: y,
                backgroundColor: color,
                height: thickness,
                position:absolute? 'absolute' : 'relative'
            },
        ]} />
    );
};

const styles = StyleSheet.create({
    Line: {
        position: 'relative', // Important for positioning
    },
});

export default CustomLine;