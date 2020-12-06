import React from 'react';
import DatePicker from "react-native-datepicker";
import {Ionicons} from "@expo/vector-icons";
import {StyleSheet, Text, View} from "react-native";

export default function Datepicker({date, setDate}) {
    return (
        <View style={styles.datePickerContainer}>
            <Text style={styles.placeHolder}>From</Text>
            <DatePicker
                style={{width: 150}}
                date={date}
                mode="date"
                placeholder=""
                format="YYYY-MM-DD"
                minDate={date}
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                customStyles={styles}
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
                onDateChange={setDate}
            />
        </View>
    )
}

const styles = StyleSheet.create({
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
    datePickerContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        position: 'relative'
    },
    placeHolder: {
        position: 'absolute',
        backgroundColor: '#fff',
        zIndex: 1,
        left: 12,
        top: -8,
        fontSize: 12
    }
});