import React from 'react';
import Card from "./Card";
import {Dimensions, StyleSheet} from "react-native";
import Datepicker from "./Datepicker";

export default function DatesFilter({
    dateFrom,
    dateTo,
    onSelectDateFrom,
    onSelectDateTo
}) {
    return (
        <Card style={styles.dateFilterContainer}>
            <Datepicker date={dateFrom} setDate={onSelectDateFrom} placeholder="From" />
            <Datepicker date={dateTo} setDate={onSelectDateTo} placeholder="To" />
        </Card>
    )
}

const styles = StyleSheet.create({
    dateFilterContainer: {
        marginTop: Dimensions.get('window').height > 600 ? 20 : 5,
        width: 400,
        maxWidth: '90%',
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
});