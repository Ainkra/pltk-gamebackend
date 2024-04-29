import { google } from "googleapis";
require('dotenv').config();

// const auth = new google.auth.GoogleAuth({
//     keyFile: "../security/Google/keys.json",
//     scopes: ['https://www.googleapis.com/auth/androidpublisher']
// });

export const authClient = new google.auth.JWT({
    keyFile: "src/libs/providers/helpers/security/Google/keys.json",
    email: process.env.GSERVICE_EMAIL,
    scopes: 'https://www.googleapis.com/auth/androidpublisher',
})