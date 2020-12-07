import {Image, StyleSheet, View} from "react-native";
import TitleText from "./TitleText";
import AvailablePlaces from "./AvailablePlaces";
import React from "react";
import PriceBox from "./PriceBox";
import {formatCurrency} from "../utils";

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
        <View style={styles.container}>
            <Image style={styles.itemImage} source={{uri: coverImage}} />
            <View style={styles.description}>
                <TitleText style={styles.title}>{title}</TitleText>
                <View style={styles.details}>
                    <AvailablePlaces number={availableVehicleSpots} type="Fordon"/>
                    <AvailablePlaces number={availableTentSpots} type="Tält"/>
                    <PriceBox total={totalCost} costPerNight={averageCostPerNight} currency={formatCurrency(currency)} />
                </View>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
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
    details: {
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
    title: {
        marginBottom: 8
    }
});

export default PropertyItem;