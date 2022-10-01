const { google } = require('googleapis');
const { calendar } = require('googleapis/build/src/apis/calendar');
const { oauth2 } = require('googleapis/build/src/apis/oauth2');
// const calendar = google.calendar('v3');

/**
 * SCOPES allows you to set access levels; this is set to readonly for now because you don't have access rights to
 * update the calendar yourself. For more info, check out the SCOPES documentation at this link: https://developers.google.com/identity/protocols/oauth2/scopes
 */
const SCOPES = ["https://www.googleapis.com/auth/calendar.readonly"];

const credentials = {
    client_id: process.env.CLIENT_ID,
    project_id: process.env.PROJECT_ID,
    client_secret: process.env.CLIENT_SECRET,
    calendar_id: process.env.CALENDAR_ID,
    auth_uri: "https://accounts.google.com/o/oauth2/auth",
    token_uri: "https://oauth2.googleapis.com/token",
    auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
    redirect_uris: ["https://bentleyjensen.github.io/meet-app/"],
    javascript_origins: ["https://bentleyjensen.github.io", "http://localhost:3000"],
}

module.exports.getAuthURL = async () => {
    const oAuth2Client = new google.auth.OAuth2(
        credentials.client_id,
        credentials.client_secret,
        credentials.redirect_uris[0]
    );

    const authUrl = oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: SCOPES,
    });

    return {
        statusCode: 200,
        headers: {
            'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({
            authUrl,
        })
    }
}

module.exports.getAccessToken = async (event) => {
    const oAuth2Client = new google.auth.OAuth2(
        credentials.client_id,
        credentials.client_secret,
        credentials.redirect_uris[0]
    );

    const code = decodeURIComponent(`${event.pathParameters.code}`);

    return new Promise((resolve, reject) => {
        oAuth2Client.getToken(code, (err, token) => {
            if (err) {
                return reject(err);
            } else {
                return resolve(token);
            }
        });
    }).then((token) => {
        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
            },
            body: JSON.stringify(token),
        }
    }).catch((err) => {
        console.error(err);
        return {
            statusCode: 500,
            body: JSON.stringify(err),
        }
    });
}

module.exports.getCalendarEvents = async (event) => {
    const oAuth2Client = new google.auth.OAuth2(
        credentials.client_id,
        credentials.client_secret,
        credentials.redirect_uris[0]
    );

    const accessToken = decodeURIComponent(`${event.pathParameters.accessToken}`);

    oAuth2Client.setCredentials({ accessToken });

    return new Promise((resolve, reject) => {
        calendar.events.list(
            {
                calendarId: credentials.calendar_id,
                auth: oAuth2Client,
                timeMin: new Date().toISOString(),
                singleEvents: true,
                orderBy: "startTime",
            },
            (error, response) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(response);
                }
            }
        );
    }).then((result) => {
        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
            },
            body: JSON.stringify({
                events: result.data.items
            }),
        }
    }).catch((err) => {
        console.error(err);
        return {
            statusCode: 500,
            body: JSON.stringify(err),
        }
    });
}
