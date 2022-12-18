import axios from 'axios';
import NProgress from 'nprogress';

import { mockData, mockData40 } from './mock-data';

const config = {
    "getAuthUrl": "https://bqdq1h09r5.execute-api.us-west-2.amazonaws.com/dev/api/get-auth-url",
    "getAccessTokenUrl": "https://bqdq1h09r5.execute-api.us-west-2.amazonaws.com/dev/api/token",
    "getCalendarEventsUrl": "https://bqdq1h09r5.execute-api.us-west-2.amazonaws.com/dev/api/get-events"
}


const getToken = async(code) => {
    const encodeCode = encodeURIComponent(code);
    const { access_token } = await fetch(config.getAccessTokenUrl + '/' + encodeCode)
        .then((res) => {
            return res.json();
        })
        .catch((error) => error);

    access_token && localStorage.setItem("access_token", access_token);

    return access_token
}

export const checkToken = async (accessToken) => {
    const tokenLink = `https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${accessToken}`;

    const result = await fetch(tokenLink)
        .then(result => result.json())
        .catch(err => err.json());

    return result;
}

const removeQuery = () => {
    if (window.history.pushState && window.location.pathname) {
        // Why use var here?
        // var newurl =
        const newurl =
            window.location.protocol +
            "//" +
            window.location.host +
            window.location.pathname;

        window.history.pushState("", "", newurl);
    } else {
        // newurl = window.location.protocol + "//" + window.location.host;
        const newurl = window.location.protocol + "//" + window.location.host;
        window.history.pushState("", "", newurl);
    }
};

/**
 * @param {*} events:
 * This function takes an events array, then uses map to create a new array with only locations.
 * It will also remove all duplicates by creating another new array using the spread operator and spreading a Set.
 * The Set will remove all duplicates from the array.
 */
export const extractLocations = (events) => {
    try {
        const locations = events.map( event => event.location);
        // Set removes duplicates
        // Using spread converts back to array
        return [...new Set(locations)];
    }
    catch {
        return [];
    }
}


export const getEvents = async () => {
    NProgress.start();

    if (!navigator.onLine) {
        console.log('Offline mode')
        const data = localStorage.getItem("lastEvents");
        NProgress.done();
        return data ? JSON.parse(data) : [];

    } else if (window.location.href.startsWith('http://localhost')) {
        console.log('localhost detected');
        NProgress.done();


        const locations = extractLocations(mockData40);
        localStorage.setItem("lastEvents", JSON.stringify(mockData40));
        localStorage.setItem("locations", JSON.stringify(locations));

        return mockData40;
    }

    console.log('Network detected');
    const accessToken = await getAccessToken();

    if (accessToken) {
        removeQuery();

        // GET to /get-events
        const googleUrl = config.getCalendarEventsUrl + '/' + accessToken;
        const result = await axios.get(googleUrl);

        if (result.data) {
            // Why use var here?
            // var locations = extractLocations(result.data);
            const locations = extractLocations(result.data);
            localStorage.setItem("lastEvents", JSON.stringify(result.data));
            localStorage.setItem("locations", JSON.stringify(locations));
        }
        NProgress.done();
        return result.data.events;
    }
}

export const getAccessToken = async () => {
    const accessToken = localStorage.getItem('access_token');
    const tokenCheck = accessToken && (await checkToken(accessToken));

    if (!accessToken || tokenCheck.error) {
        await localStorage.removeItem('access_token');
        const searchParams = new URLSearchParams(window.location.search);
        const code = await searchParams.get('code');

        if (!code) {
            const result = await axios.get(config.getAuthUrl);
            const { authUrl } = result.data;

            return ( window.location.href = authUrl );
        } else {
            return code && getToken(code);
        }
    } else {
        return accessToken;
    }

}
