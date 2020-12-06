import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { primary } from "../constants/colors";
import TitleText from "./TitleText";

const Header = (props) => {
    return (
        <View style={styles.header}>
            <TitleText style={styles.headerTitle}>{props.title}</TitleText>
        </View>
    )
};

const styles = StyleSheet.create({
    header: {
        width: '100%',
        height: 78,
        paddingTop: 24,
        backgroundColor: Platform.OS === 'android' ? primary : 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerTitle: {
        color: 'white',
    }
});

export default Header;
