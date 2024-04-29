import gameBackendService from "./api/GameBackendService";
import express from 'express';
// import { stripeWebhookHandler } from "./api/StripeWebhooks";

const app = express();

/**
 * Start all modules of the app
 */
async function App() {
    // app.use('/webhook/stripe', express.raw({type: 'application/json'}), stripeWebhookHandler);
    await gameBackendService();
}

App();