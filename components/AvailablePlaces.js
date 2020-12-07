import {StyleSheet, View} from "react-native";
import BodyText from "./BodyText";
import React from "react";

const AvailablePlaces = ({number, type}) => (
    number &&
    <View>
        <BodyText style={styles.text}><BodyText style={styles.availablePlacesCount}>{number}</BodyText> {type}</BodyText>
        <BodyText>Platser</BodyText>
    </View>
);

const styles = StyleSheet.create({
    text: {
        fontWeight: 'bold'
    },
    availablePlacesCount: {
        borderRadius: 3,
        paddingLeft: 4,
        paddingRight: 4,
        backgroundColor: '#dfede7'
    },
});


export default AvailablePlaces;