import React, { useState, useRef } from "react";
import { View, Text, StyleSheet, FlatList, Animated, Alert } from "react-native";
import slides from "../slides";
import OnboardingItem from "../components/OnboardingItem";
import Paginator from "../components/Paginator";
import NextButton from "../components/NextButton";

// Onboarding component
const Onboarding = ({ navigation }) => {
    const [currentIndex, setCurrentIndex] = useState(0); // Current slide index
    const slidesRef = useRef(null); // Reference to the FlatList component
    const scrollX = useRef(new Animated.Value(0)).current; // Animated value for scroll position

    // Callback function when viewable items change
    const viewableItemsChanged = useRef(({ viewableItems }) => {
        setCurrentIndex(viewableItems[0]?.index || 0); // Update current index based on the first viewable item
    }).current;

    const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current; // Viewability configuration

    // Function to scroll to the next slide
    const scrollTo = async () => {
        if (currentIndex < slides.length - 1 && slidesRef.current) {
            slidesRef.current.scrollToIndex({ index: currentIndex + 1 });
        } else {
            navigation.navigate('Home'); // Navigate to the home screen when the last slide is reached
        }
    };

    return (
        <View style={styles.container}>
            <View style={{ flex: 3 }}>
                <FlatList
                    ref={slidesRef}
                    data={slides}
                    renderItem={({ item }) => <OnboardingItem item={item} />}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    pagingEnabled
                    bounces={false}
                    keyExtractor={(item) => item.id}
                    onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], { useNativeDriver: false, })}
                    scrollEventThrottle={32}
                    onViewableItemsChanged={viewableItemsChanged}
                    viewabilityConfig={viewConfig}
                />
            </View>
            <Paginator data={slides} scrollX={scrollX} />
            <NextButton scrollTo={scrollTo} percentage={(currentIndex + 1) * (100 / slides.length)} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: "center",
        alignItems: "center",
    },
});

export default Onboarding;
