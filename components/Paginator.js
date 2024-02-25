import { StyleSheet, Animated, View, useWindowDimensions } from 'react-native'
import React from 'react'

export default function Paginator({ data, scrollX }) {
    const { width } = useWindowDimensions()

    return (
        <View style={{ flexDirection: 'row', height: 64 }}>
            {data.map((_, i) => {
                // Calculate the input range for the current dot
                const inputRange = [(i - 1) * width, i * width, (i + 1) * width];

                // Interpolate the dot width based on the scroll position
                const dotWidth = scrollX.interpolate({
                    inputRange,
                    outputRange: [10, 20, 10],
                    extrapolate: 'clamp',
                });

                // Interpolate the dot opacity based on the scroll position
                const opacity = scrollX.interpolate({
                    inputRange,
                    outputRange: [0.3, 1, 0.3],
                    extrapolate: 'clamp',
                });

                return (
                    <Animated.View
                        style={[
                            styles.dot,
                            {
                                width: dotWidth,
                                opacity,
                            },
                        ]}
                        key={i.toString()}
                    />
                );
            })}
        </View>
    );
}

const styles = StyleSheet.create({
    dot: {
        height: 10,
        borderRadius: 5,
        backgroundColor: '#493D8A',
        marginHorizontal: 8,
    },
});
