import React, { useState, useEffect } from 'react';
import {
    View,
    StyleSheet,
} from 'react-native';
import moment from "moment";
import {getProperties} from "../service";
import {getDayAfter} from "../utils";
import DatesFilter from "../components/DatesFilter";
import PropertiesList from "../components/PropertiesList";

const getDefaultDates = () => ({
    from: moment().format('YYYY-MM-DD'),
    to: getDayAfter()
})

const ResultsScreen = props => {

    const [properties, setProperties] = useState([]);
    const [hasFetched, setHasFetched] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);
    const [dateFrom, setDateFrom] = useState(getDefaultDates().from)
    const [dateTo, setDateTo] = useState(getDefaultDates().to)

    useEffect(() => {
        fetchProperties();
    }, [hasFetched]);

    const fetchProperties = async () => {
        if(!hasFetched && dateFrom && dateTo) {
            setIsLoading(true);
            try {
                const results = await getProperties(dateFrom, dateTo);
                setProperties(results);
            } catch(e) {
                setError(true);
            }
            setHasFetched(true);
            setIsLoading(false);
        }
    }

    const handleSetDateFrom = date => {
        setDateFrom(date);
        if (moment(date).isSameOrAfter(dateTo, 'day')) {
            setDateTo(getDayAfter(date));
        } else {
            setHasFetched(false);
        }
    }

    const handleSetDateTo = date => {
        setDateTo(date);
        setHasFetched(false);
    }

    return (
        <View style={styles.screen}>
            <DatesFilter
                dateFrom={dateFrom}
                dateTo={dateTo}
                onSelectDateFrom={handleSetDateFrom}
                onSelectDateTo={handleSetDateTo}
            />
            <PropertiesList
                isLoading={isLoading}
                error={error}
                properties={properties}
            />
        </View>
    )
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center'
    }
});

export default ResultsScreen;
