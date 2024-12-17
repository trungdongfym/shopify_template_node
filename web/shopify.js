import { LATEST_API_VERSION } from '@shopify/shopify-api';
import { shopifyApp } from '@shopify/shopify-app-express';
import { SQLiteSessionStorage } from '@shopify/shopify-app-session-storage-sqlite';
import { restResources } from '@shopify/shopify-api/rest/admin/2024-10';

const DB_PATH = `${process.cwd()}/database.sqlite`;

// The transactions with Shopify will always be marked as test transactions, unless NODE_ENV is production.
// See the ensureBilling helper to learn more about billing in this template.
// const billingConfig = {
//     'My Shopify One-Time Charge': {
//         // This is an example configuration that would do a one-time charge for $5 (only USD is currently supported)
//         amount: 5.0,
//         currencyCode: 'USD',
//         interval: BillingInterval.OneTime,
//     },
// };

const { VITE_SHOPIFY_API_KEY, SHOPIFY_API_SECRET, SHOPIFY_SCOPES, VITE_HOST } = process.env;

const config = {
    apiKey: VITE_SHOPIFY_API_KEY,
    apiSecretKey: SHOPIFY_API_SECRET,
    scopes: SHOPIFY_SCOPES.split(','),
    hostScheme: 'https',
    hostName: VITE_HOST.replace(/^https:\/\//, ''),
    isEmbeddedApp: true,
};

const shopify = shopifyApp({
    api: {
        apiVersion: LATEST_API_VERSION,
        restResources,
        future: {
            customerAddressDefaultFix: true,
            lineItemBilling: true,
            unstable_managedPricingSupport: true,
        },
        billing: undefined, // or replace with billingConfig above to enable example billing,
        ...config,
    },
    auth: {
        path: '/api/auth',
        callbackPath: '/api/auth/callback',
    },
    webhooks: {
        path: '/api/webhooks',
    },
    sessionStorage: new SQLiteSessionStorage(DB_PATH),
});

export default shopify;
