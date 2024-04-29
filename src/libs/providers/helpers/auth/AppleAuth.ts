import { AppStoreServerAPIClient, Environment } from "@apple/app-store-server-library";
import fs from 'fs';
require('dotenv').config();

const rootFolder = process.env.ROOT_FOLDER;
const teamKeyId = process.env.APPLE_TEAM_KEY_ID as string;
const issuerId = process.env.APPLE_ISSUER_ID as string;
const bundleId = process.env.APPLE_BID as string;
const privateKeyPath = `${rootFolder}/libs/providers/helpers/security/Apple/AuthKey_${teamKeyId}.p8`;
const privateKey = fs.readFileSync(privateKeyPath, 'utf-8');
const environment = Environment.SANDBOX;
       
export const appleApiProvider = new AppStoreServerAPIClient(privateKey, teamKeyId, issuerId, bundleId, environment);
