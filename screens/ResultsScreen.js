import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    Dimensions,
    Image,
    ImageBackground
} from 'react-native';
import Card from "../components/Card";
import BodyText from "../components/BodyText";
import Axios from "axios";
import TitleText from "../components/TitleText";
import DatePicker from 'react-native-datepicker'
import moment from "moment";
import { Ionicons } from '@expo/vector-icons';

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

const client = Axios.create({});

const getProperties = () => client.put(
    'https://api.acamp.com/public-api/v1/properties/all',
    {
        "checkInDate": "2020-12-06",
        "checkOutDate": "2020-12-07"
    }).then(({ data }) => data.properties)

const getDefaultDates = () => ({
    from: moment().format('YYYY-MM-DD'),
    to: moment().add(1, 'd').format('YYYY-MM-DD')
})

const ResultsScreen = props => {

    const [properties, setProperties] = useState([]);
    const [hasFetched, setHasFetched] = useState([]);
    const [isLoading, setIsLoading] = useState([]);
    const [error, setError] = useState([]);
    const [dateFrom, setDateFrom] = useState(getDefaultDates().from)
    const [dateTo, setDateTo] = useState(getDefaultDates().to)
    useEffect(() => {
        getProperties()
            .then(results => {
                setProperties(results)
            });
    }, []);

    return (
        <View style={styles.screen}>
            <Card style={styles.buttonContainer}>
                <Text style={styles.placeHolder}>From</Text>
                <DatePicker
                    style={{width: 150}}
                    date={dateFrom}
                    mode="date"
                    placeholder=""
                    format="YYYY-MM-DD"
                    minDate="2016-05-01"
                    maxDate="2016-06-01"
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    customStyles={{
                        dateInput: {
                            position: 'relative',
                            marginLeft: 4,
                            borderRadius: 4,
                            justifyContent: 'flex-start',
                            alignItems: 'center',
                            flexDirection: 'row',
                            padding: 8
                        },
                        dateTouchBody: {
                            position: 'relative',
                        },
                        dateText: {

                        }
                    }}
                    iconComponent={
                        (<Ionicons
                            name={'ios-calendar'}
                            size={23}
                            color={'#ccc'}
                            style={{
                                marginLeft: 4,
                                position: 'absolute',
                                left: 120
                            }}
                        />)
                    }
                    onDateChange={(date) => {setDateFrom(date)}}
                />
            </Card>
            <View style={styles.listContainer}>
                <FlatList
                    keyExtractor={item => item.id}
                    data={properties}
                    renderItem={renderListItem.bind(this, properties.length)}
                    contentContainerStyle={styles.list}
                />
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center'
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginTop: Dimensions.get('window').height > 600 ? 20 : 5,
        width: 400,
        maxWidth: '90%'
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
    availablePlacesContainer: {
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
    placeHolder: {
        position: 'absolute',
        backgroundColor: '#fff',
        zIndex: 1,
        left: 24,
        top: 4,
        fontSize: 12
    }
});

export default ResultsScreen;
