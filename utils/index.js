import moment from "moment";

export const formatCurrency = (currency) => {
    if (currency === 'SEK') {
        return 'kr';
    } return currency;
}

export const getDayAfter = date => {
    return moment(date).add(1, 'd').format('YYYY-MM-DD');
};