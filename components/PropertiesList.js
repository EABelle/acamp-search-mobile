import React from 'react';
import {
    View,
    StyleSheet,
    FlatList,
    Image
} from 'react-native';
import AnimatedLoader from "react-native-animated-loader";
import PropertyItem from "../components/PropertyItem";

const renderListItem = (listLength, itemData) => {
    return <PropertyItem property={itemData.item} />
};

const PropertiesList = ({ isLoading, error, properties }) => {

    return (
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
                    <Image
                        source={require("../assets/error-icon.png")}
                        style={styles.errorImage}
                    />
                    : !properties.length ?
                        <Image
                            source={require("../assets/empty-loupe.svg")}
                            style={styles.errorImage}
                        />
                        :
                        <FlatList
                            keyExtractor={item => item.id}
                            data={properties}
                            renderItem={renderListItem.bind(this, properties.length)}
                            contentContainerStyle={styles.list}
                        />
            }
        </View>
    )
};

const styles = StyleSheet.create({
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
    },
    errorImage: {
        width: 100,
        height: 100,
        marginTop: '45%',
    }
});

export default PropertiesList;
