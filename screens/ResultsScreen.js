import React, { useState, useEffect } from 'react';
import {
    View,
    StyleSheet,
    FlatList,
    Dimensions,
} from 'react-native';
import Card from "../components/Card";
import moment from "moment";
import Datepicker from "../components/Datepicker";
import {getProperties} from "../service";
import AnimatedLoader from "react-native-animated-loader";
import PropertyItem from "../components/PropertyItem";

const renderListItem = (listLength, itemData) => {
    return <PropertyItem property={itemData.item} />
};

const getDayAfter = date => {
    return moment(date).add(1, 'd').format('YYYY-MM-DD');
};

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
            <Card style={styles.searchFilterContainer}>
                <View style={styles.dateFilterContainer}>
                    <Datepicker date={dateFrom} setDate={handleSetDateFrom} placeholder="From" />
                    <Datepicker date={dateTo} setDate={handleSetDateTo} placeholder="To" />
                </View>
            </Card>
            <View style={styles.listContainer}>
                {
                    isLoading ?
                         <AnimatedLoader
                            visible={true}
                            overlayColor="rgba(255,255,255,0.75)"
                            source={require("../assets/lottie-loader.json")}
                            animationStyle={styles.lottie}
                            speed={1}
                        />
//                    : error ?
//                        <Image source={require("../assets/error-icon.png")} />
//                    : !properties.length ?
//                        <Image source={require("../assets/empty-loupe.svg")} />
                    :
                        <FlatList
                            keyExtractor={item => item.id}
                            data={properties}
                            renderItem={renderListItem.bind(this, properties.length)}
                            contentContainerStyle={styles.list}
                        />
                }
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center'
    },
    searchFilterContainer: {
        marginTop: Dimensions.get('window').height > 600 ? 20 : 5,
        width: 400,
        maxWidth: '90%',
    },
    dateFilterContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%'
    },
    listContainer: {
        flex: 1,
        width: 400,
        maxWidth: '90%',
    },
    list: {
        flexGrow: 1,
        justifyContent: 'flex-end'
    },
    lottie: {
        width: 100,
        height: 100
    }
});

export default ResultsScreen;
