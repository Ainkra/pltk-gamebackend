import { google } from "googleapis";
require('dotenv').config();

export const authClient = new google.auth.JWT({
    keyFile: "src/libs/providers/helpers/security/Google/keys.json",
    email: process.env.GSERVICE_EMAIL,
    scopes: 'https://www.googleapis.com/auth/androidpublisher',
})