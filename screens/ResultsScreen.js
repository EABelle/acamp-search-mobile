import React, { useState, useEffect } from 'react';
import {
    View,
    StyleSheet,
    FlatList,
    Dimensions,
    ImageBackground
} from 'react-native';
import Card from "../components/Card";
import BodyText from "../components/BodyText";
import TitleText from "../components/TitleText";
import moment from "moment";
import Datepicker from "../components/Datepicker";
import {getProperties} from "../service";
import AnimatedLoader from "react-native-animated-loader";
import {Image} from "react-native-web";

const AvailablePlaces = ({number, type}) => (
    number &&
    <View style={styles.availablePlacesContainer}>
        <BodyText style={{fontWeight: 'bold'}}><BodyText style={styles.availablePlacesCount}>{number}</BodyText> {type}</BodyText>
        <BodyText>Platser</BodyText>
    </View>
);

const PriceBox = ({total, costPerNight, currency}) => (
    <View style={styles.availablePlacesContainer}>
        <BodyText style={{fontWeight: 'bold'}}>{total} {currency} totalt</BodyText>
        <BodyText>{costPerNight} {currency} / Natt</BodyText>
    </View>
);

const getCurrency = (currency) => {
    if (currency === 'SEK') {
        return 'kr';
    } return currency;
}

const renderListItem = (listLength, itemData) => {

    const {
        title,
        availableVehicleSpots,
        availableTentSpots,
        totalCost,
        averageCostPerNight,
        currency,
        coverImage
    } = itemData.item;

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
)};

const getDefaultDates = () => ({
    from: moment().format('YYYY-MM-DD'),
    to: moment().add(1, 'd').format('YYYY-MM-DD')
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
        setDateTo(date);
    }

    return (
        <View style={styles.screen}>
            <Card style={styles.searchFilterContainer}>
                <View style={styles.dateFilterContainer}>
                    <Datepicker date={dateFrom} setDate={handleSetDateFrom} placeholder="From" />
                    <Datepicker date={dateTo} setDate={setDateTo} placeholder="To" />
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
                    : error ?
                        <Image source={require("../assets/error-icon.png")} />
                    : !properties.length ?
                        <Image source={require("../assets/empty-loupe.svg")} />
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
    availablePlacesCount: {
        borderRadius: 3,
        paddingLeft: 4,
        paddingRight: 4,
        backgroundColor: '#dfede7'
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
    lottie: {
        width: 100,
        height: 100
    }
});

export default ResultsScreen;
