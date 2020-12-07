import {ImageBackground, StyleSheet, View} from "react-native";
import TitleText from "./TitleText";
import AvailablePlaces from "./AvailablePlaces";
import React from "react";
import PriceBox from "./PriceBox";

const getCurrency = (currency) => {
    if (currency === 'SEK') {
        return 'kr';
    } return currency;
}

const PropertyItem = ({property}) => {

    const {
        title,
        availableVehicleSpots,
        availableTentSpots,
        totalCost,
        averageCostPerNight,
        currency,
        coverImage
    } = property;

    return (
        <View style={styles.listItem}>
            <ImageBackground style={styles.itemImage} source={{uri: coverImage}} />
            <View style={styles.description}>
                <TitleText>{title}</TitleText>
                <View style={styles.listItemDetails}>
                    <AvailablePlaces number={availableVehicleSpots} type="Fordon"/>
                    <AvailablePlaces number={availableTentSpots} type="Tält"/>
                    <PriceBox total={totalCost} costPerNight={averageCostPerNight} currency={getCurrency(currency)} />
                </View>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    listItem: {
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 8,
        marginVertical: 10,
        backgroundColor: 'white',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        width: '100%'
    },
    listItemDetails: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%'
    },
    description: {
        padding: 12
    },
    itemImage: {
        width: '100%',
        height: 150,
        resizeMode: 'stretch',
        borderRadius: 4
    },
});

export default PropertyItem;