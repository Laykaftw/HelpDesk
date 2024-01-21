import React, { useState, useRef } from "react";
import { View, Text, StyleSheet, FlatList, Animated, Alert } from "react-native";
import slides from "../slides";
import OnboardingItem from "./OnboardingItem";
import Paginator from "./Paginator";
import NextButton from "./NextButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import HomeScreen from "./HomeScreen";



const Onboarding = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const slidesRef = useRef(null);
    const scrollX = useRef(new Animated.Value(0)).current;

    const viewableItemsChanged = useRef(({ viewableItems }) => {
        setCurrentIndex(viewableItems[0]?.index || 0);
    }).current;

    const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

    const scrollTo = async () => {
        if (currentIndex < slides.length - 1 && slidesRef.current) {
            slidesRef.current.scrollToIndex({ index: currentIndex + 1 });
        } else {
            try {
                const onboardingPreference = await AsyncStorage.getItem('@viewedOnboarding');
                if (!onboardingPreference || onboardingPreference !== 'true') {
                    Alert.alert(
                        'Onboarding Preference',
                        'Do you want to see the onboarding slides every time you open the app?',
                        [
                            {
                                text: 'No',
                                onPress: async () => {
                                    await AsyncStorage.setItem('@viewedOnboarding', 'true');
                                    navigator.navigate('Home')
                                },
                                style: 'cancel',
                            },
                            {
                                text: 'Yes',
                                onPress: async () => {
                                    await AsyncStorage.setItem('@viewedOnboarding', 'false');
                                    <HomeScreen />
                                },
                            },

                        ],
                        { cancelable: false }
                    );

                }
            } catch (error) {
                console.log("Error @setItem : ", error);
            }
        }
    };

    return (
        <NavigationContainer>
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
        </NavigationContainer>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    skipBtn: {
        fontWeight: "bold",
        marginBottom: 50,
        fontSize: 16,
    }
});

export default Onboarding;
