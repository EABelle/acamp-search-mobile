import {View} from "react-native";
import BodyText from "./BodyText";
import React from "react";

const PriceBox = ({total, costPerNight, currency}) => (
    <View>
        <BodyText style={{fontWeight: 'bold'}}>{total} {currency} totalt</BodyText>
        <BodyText>{costPerNight} {currency} / Natt</BodyText>
    </View>
);

export default PriceBox;