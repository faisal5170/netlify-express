require('dotenv').config();
const express = require('express');
const serverless = require('serverless-http');
const app = express();
const request = require('request-promise-native');
//var requestBase = require('request');
const NodeCache = require('node-cache');
const session = require('express-session');
//const opn = require('open');
const path = require('path');
const stripe = require("stripe")("sk_test_Iu1RptoXSkqNMZQ40Umyp0hi");
var bodyParser = require('body-parser');
var configData = require('./src/config.json');
const API_URL = configData.API_URL;
const FRONTEND_API_URL = configData.REACT_API_URL;

const cors = require('cors');
app.use(cors());

//const PORT = 5000;

app.use(express.static(path.join(__dirname, 'build')));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const refreshTokenStore = {};
const accessTokenCache = new NodeCache({ deleteOnExpire: true });

if (!process.env.CLIENT_ID || !process.env.CLIENT_SECRET) {
    throw new Error('Missing CLIENT_ID or CLIENT_SECRET environment variable.')
}

//===========================================================================//
//  HUBSPOT APP CONFIGURATION
//
//  All the following values must match configuration settings in your app.
//  They will be used to build the OAuth URL, which users visit to begin
//  installing. If they don't match your app's configuration, users will
//  see an error page.

// Replace the following with the values from your app auth config, 
// or set them as environment variables before running.
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;

// Scopes for this app will default to `contacts`
// To request others, set the SCOPE environment variable instead
let SCOPES = ['contacts'];
if (process.env.SCOPE) {
    SCOPES = (process.env.SCOPE.split(/ |, ?|%20/)).join(' ');
}

// On successful install, users will be redirected to /oauth-callback
const REDIRECT_URI = API_URL + `/oauth-callback`;

//===========================================================================//

// Use a session to keep track of client ID
app.use(session({
    secret: Math.random().toString(36).substring(2),
    resave: false,
    saveUninitialized: true
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//================================//
//   Running the OAuth 2.0 Flow   //
//================================//

// Step 1
// Build the authorization URL to redirect a user
// to when they choose to install the app
const authUrl =
    'https://app.hubspot.com/oauth/authorize' +
    `?client_id=${encodeURIComponent(CLIENT_ID)}` + // app's client ID
    `&scope=${encodeURIComponent(SCOPES)}` + // scopes being requested by the app
    `&redirect_uri=${encodeURIComponent(REDIRECT_URI)}`; // where to send the user after the consent page

// Redirect the user from the installation page to
// the authorization URL
app.get('/install', (req, res) => {
    console.log('');
    console.log('=== Initiating OAuth 2.0 flow with HubSpot ===');
    console.log('');
    console.log("===> Step 1: Redirecting user to your app's OAuth URL");
    //res.send(authUrl);
    res.status(200).json({
        IsSuccess: true,
        data: authUrl
    });
    //sendResponse(res, 200, true, authUrl);
    console.log('===> Step 2: User is being prompted for consent by HubSpot');
});

// Step 2
// The user is prompted to give the app access to the requested
// resources. This is all done by HubSpot, so no work is necessary
// on the app's end

// Step 3
// Receive the authorization code from the OAuth 2.0 Server,
// and process it based on the query parameters that are passed
app.get('/oauth-callback', async (req, res) => {
    console.log('===> Step 3: Handling the request sent by the server');

    // Received a user authorization code, so now combine that with the other
    // required values and exchange both for an access token and a refresh token
    if (req.query.code) {
        console.log('       > Received an authorization token');

        const authCodeProof = {
            grant_type: 'authorization_code',
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET,
            redirect_uri: REDIRECT_URI,
            code: req.query.code
        };

        // Step 4
        // Exchange the authorization code for an access token and refresh token
        console.log('===> Step 4: Exchanging authorization code for an access token and refresh token');
        const token = await exchangeForTokens(req.sessionID, authCodeProof);
        console.log(token);
        if (token.message) {
            return res.redirect(`/error?msg=${token.message}`);
        }

        // Once the tokens have been retrieved, use them to make a query
        // to the HubSpot API
        res.redirect(FRONTEND_API_URL + `/portal?t=` + token);
    }
});

//==========================================//
//   Exchanging Proof for an Access Token   //
//==========================================//

const exchangeForTokens = async (userId, exchangeProof) => {
    try {
        const responseBody = await request.post('https://api.hubapi.com/oauth/v1/token', {
            form: exchangeProof
        });
        // Usually, this token data should be persisted in a database and associated with
        // a user identity.
        const tokens = JSON.parse(responseBody);
        refreshTokenStore[userId] = tokens.refresh_token;
        accessTokenCache.set(userId, tokens.access_token, Math.round(tokens.expires_in * 0.75));

        console.log('       > Received an access token and refresh token');
        return tokens.access_token;
    } catch (e) {
        console.error(`       > Error exchanging ${exchangeProof.grant_type} for access token`);
        console.error(e);
        return JSON.parse(e.response.body);
    }
};

const refreshAccessToken = async (userId) => {
    const refreshTokenProof = {
        grant_type: 'refresh_token',
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        redirect_uri: REDIRECT_URI,
        refresh_token: refreshTokenStore[userId]
    };
    return await exchangeForTokens(userId, refreshTokenProof);
};

const getAccessToken = async (userId) => {
    // If the access token has expired, retrieve
    // a new one using the refresh token
    if (!accessTokenCache.get(userId)) {
        console.log('Refreshing expired access token');
        await refreshAccessToken(userId);
    }
    return accessTokenCache.get(userId);
};

const isAuthorized = (userId) => {
    return refreshTokenStore[userId] ? true : false;
};

//====================================================//
//   Using an Access Token to Query the HubSpot API   //
//====================================================//

const getContact = async (accessToken) => {
    console.log('');
    console.log('=== Retrieving a contact from HubSpot using the access token ===');
    try {
        const headers = {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        };
        console.log('===> Replace the following request.get() to test other API calls');
        console.log('===> request.get(\'https://api.hubapi.com/contacts/v1/lists/all/contacts/all?count=1\')');
        const result = await request.get('https://api.hubapi.com/contacts/v1/lists/all/contacts/all?count=1', {
            headers: headers
        });

        return JSON.parse(result).contacts[0];
    } catch (e) {
        console.error('  > Unable to retrieve contact');
        return JSON.parse(e.response.body);
    }
};


//========================================//
//   Displaying information to the user   //
//========================================//

const displayContactName = (res, contact) => {
    if (contact.status === 'error') {
        res.write(`<p>Unable to retrieve contact! Error Message: ${contact.message}</p>`);
        return;
    }
    const { firstname, lastname } = contact.properties;
    res.write(`<p>Contact name: ${firstname.value} ${lastname.value}</p>`);
};

app.get('/', async (req, res) => {
    res.setHeader('Content-Type', 'text/html');
    res.write(`<h2>HubSpot OAuth 2.0 Quickstart App</h2>`);
    if (isAuthorized(req.sessionID)) {
        const accessToken = await getAccessToken(req.sessionID);
        const contact = await getContact(accessToken);
        res.write(`<h4>Access token: ${accessToken}</h4>`);
        displayContactName(res, contact);
    } else {
        res.write(`<a href="/install"><h3>Install the app</h3></a>`);
    }
    res.end();
});

app.get('/error', (req, res) => {
    res.setHeader('Content-Type', 'text/html');
    res.write(`<h4>Error: ${req.query.msg}</h4>`);
    res.end();
});

app.use(function (req, res, next) {
    //Enabling CORS 
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "*");
    res.header("Access-Control-Allow-Headers", "*");
    next();
});

app.post('/payment', async (req, res) => {
    return await stripe.tokens.create({
        card: {
            number: req.body.paymentCardNumber,
            exp_month: req.body.paymentCardMonth,
            exp_year: req.body.paymentcardYear,
            cvc: req.body.paymentCardCvc,
        },
    })
        .then(async token => {
            return await stripe.charges.create({
                amount: req.body.total * 100,
                currency: 'usd',
                description: req.body.paymentCardName + '\'s Campaign charge',
                source: token.id,
                receipt_email: req.body.paymentEmail
            })
                .then(charge => {
                    res.json(charge);
                })
                .catch(error => {
                    res.json(error);
                });

        })
        .catch(error => {
            res.json(error);
        });
});

app.post('/hubspot/userinfo', async (req, res) => {
    try {
        const result = await request.get('https://api.hubapi.com/oauth/v1/access-tokens/' + req.body.token);
        return res.status(200).json(JSON.parse(result));
    } catch (e) {
        return res.status(400).json(e);
    }
});


app.post('/Customers/transactions', async (req, res) => {
    var options = {
        'method': 'POST',
        'url': configData.CLONE_MY_PORTAL_API + '/Customers/transactions',
        'headers': {
        },
        formData: {
            'portal_id': req.body.hub_id,
            'email_address': req.body.user,
            'stripe_transaction_id': req.body.id,
            'total_amount': req.body.amount,
            'packages': req.body.title
        }
    };
    request(options, function (error, response) {
        if (error) throw new Error(error);
        res.json(response.body);
    });
});

app.post('/Customers/history', async (req, res) => {
    var options = {
        'method': 'POST',
        'url': configData.CLONE_MY_PORTAL_API + '/Customers/history',
        'headers': {
        },
        formData: {
            'portal_id': req.body.hub_id,
        }
    };
    request(options, function (error, response) {
        if (error) throw new Error(error);
        res.json(response.body);
    });
});

function getCustomerPackageEndpoint(packageName) {
    switch (packageName) {
        case 'Re-engagement Campaign':
            return '/ReengagementCampaign';
        case 'SDR Outreach campaign':
            return '';
        case 'Lead Routing Campaign':
            return '/LeadRoutingCampaign';
        case 'New Customer Campaign':
            return '/NewCustomerCampaign';
        case 'B2B Evergreen Nature Campaign':
            return '/B2bevergreenCampaign';
        case 'Webinar campaign':
            return '/WebinarCampaign';
        case 'Customer Feedback package':
            return '/CustomerFeedback';
        case 'Welcome Series package':
            return '/WelcomeSeries';
        default:
            return '';
    }
}

app.post('/Customers/transfer', async (req, res) => {
    var packages = req.body.packages.split(',');
    var resultArr = [];
    var promises = packages.map(function (packageName) {
        var options = {
            'method': 'POST',
            'url': configData.CLONE_MY_PORTAL_API + getCustomerPackageEndpoint(packageName),
            'headers': {
            },
            formData: {
                'ct_id': req.body.ctId,
                'bearertoken': req.body.token
            }
        };
        return request(options, function (error, response) { })
            .then(function (data) {
                try {
                    var apiRes = JSON.parse(data);
                    resultArr.push({ 'package': packageName, "isCloned": apiRes.error === 0 ? true : false });
                } catch (error) {
                    resultArr.push({ 'package': packageName, "isCloned": false });
                }
            }, function (err) {
                resultArr.push({ 'package': packageName, "isCloned": false });
            });
    });
    Promise.all(promises).then(function () {
        console.log(resultArr);
        res.json(resultArr);
    });
});

//app.use('/api/makepayment', require('./payment'));

//app.listen(PORT, () => console.log(`=== Starting your app on http://localhost:${PORT} ===`));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/public/build/index.html'));
});

// const server = app.listen(process.env.PORT || 5000, () => {
//     const port = server.address().port;
//     console.log(`Starting your app on port ${port}`);
// });
//opn(`http://localhost:${PORT}`);

module.exports = app;
module.exports.handler = serverless(app);