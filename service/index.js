import Axios from "axios";

const client = Axios.create({});

export const getProperties = (checkInDate, checkOutDate) => client.put(
    'https://api.acamp.com/public-api/v1/properties/all',
    {
        checkInDate,
        checkOutDate
    }).then(({ data }) => data.properties)