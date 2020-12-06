import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { AppLoading } from "expo";
import * as Font from 'expo-font';
import Header from "./components/Header";
import ResultsScreen from "./screens/ResultsScreen";

const fetchFonts = () => (
    Font.loadAsync({
        'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
        'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
    })
);

export default function App() {

    const [dataLoaded, setDataLoaded] = useState(false);

    if(!dataLoaded) {
        return(
            <AppLoading
                startAsync={fetchFonts}
                onFinish={() => setDataLoaded(true)}
                onError={(e) => console.log(e)}
            />
        );
    }

    return (
        <View style={styles.screen}>
            <Header title="Acamp" />
            <ResultsScreen />
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },
});
