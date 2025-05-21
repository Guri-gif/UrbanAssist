const {google} = require('googleapis')

const clientId = process.env.GOOGLE_CLIENT_ID
const clientSecret = process.env.GOOGLE_CLIENT_SECRET


exports.oauth2Client = new google.auth.OAuth2(
    clientId,
    clientSecret,
    'postmessage'
)