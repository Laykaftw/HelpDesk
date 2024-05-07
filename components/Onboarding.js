import React, { useState, useRef } from "react";
import { View, StyleSheet, FlatList, Animated } from "react-native";
import slides from "../slides";
import OnboardingItem from "./OnboardingItem";
import Paginator from "./Paginator";
import NextButton from "./NextButton";

const Onboarding = ({ navigation }) => {
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
            navigation.navigate('Home');
            // try {
            //     const onboardingPreference = await AsyncStorage.getItem('@viewedOnboarding');
            //     console.log('onboardingPreference : ', onboardingPreference)
            //     if (onboardingPreference !== 'true') {
            //         Alert.alert(
            //             'Onboarding Preference',
            //             'Do you want to see the onboarding slides every time you open the app?',
            //             [
            //                 {
            //                     text: 'No',
            //                     onPress: async () => {
            //                         console.log('tttt')
            //                         await AsyncStorage.setItem('@viewedOnboarding', 'true');
            //                         navigation.navigate('Home');
            //                     },
            //                     style: 'cancel',
            //                 },
            //                 {
            //                     text: 'Yes',
            //                     onPress: async () => {
            //                         await AsyncStorage.setItem('@viewedOnboarding', 'false');
            //                         navigation.navigate('Home');
            //                     },
            //                 },
            //             ],
            //             { cancelable: false }
            //         );
            //     } else {
            //         navigation.navigate('Home');
            //     }
            // } catch (error) {
            //     console.log("Error @setItem : ", error);
            // }
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
