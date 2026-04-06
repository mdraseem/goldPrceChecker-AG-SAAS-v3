const express = require('express');
const cors = require('cors');
const path = require('path');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.static(path.join(__dirname, 'public'), {
    etag: false,
    maxAge: '0'
}));
app.use((req, res, next) => {
    res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private');
    next();
});
app.use(express.json());

// Mock Live Gold Price Data (Price per Gram in USD)
// In a real app, this would be fetched from an API like metalpriceapi.com or goldapi.io
let currencyRates = { 
    USD: 1, AED: 3.67, AFN: 70.5, ALL: 93.4, AMD: 403.5, ANG: 1.79, AOA: 833.5, ARS: 840.5, AUD: 1.52, AWG: 1.79, AZN: 1.70, 
    BAM: 1.80, BBD: 2.00, BDT: 110.1, BGN: 1.80, BHD: 0.377, BIF: 2845.0, BMD: 1.00, BND: 1.34, BOB: 6.91, BRL: 4.95, BSD: 1.00, 
    BTN: 83.1, BWP: 13.6, BYN: 3.26, BZD: 2.00, CAD: 1.35, CDF: 2750.0, CHF: 0.88, CLP: 960.5, CNY: 7.19, COP: 3950.0, CRC: 512.0, 
    CUP: 24.0, CVE: 101.5, CZK: 23.4, DJF: 177.7, DKK: 6.87, DOP: 58.7, DZD: 134.5, EGP: 30.9, ERN: 15.0, ETB: 56.5, EUR: 0.92, 
    FJD: 2.24, FKP: 0.79, GBP: 0.79, GEL: 2.65, GHS: 12.4, GIP: 0.79, GMD: 67.5, GNF: 8590.0, GTQ: 7.82, GYD: 209.0, HKD: 7.82, 
    HNL: 24.7, HRK: 6.93, HTG: 132.5, HUF: 358.5, IDR: 15650.0, ILS: 3.64, INR: 83.12, IQD: 1310.0, IRR: 42105, ISK: 137.5, JMD: 155.5, 
    JOD: 0.709, JPY: 150.5, KES: 145.0, KGS: 89.4, KHR: 4080.0, KMF: 452.5, KRW: 1335.0, KWD: 0.308, KYD: 0.83, KZT: 448.5, LAK: 20850, 
    LBP: 89000, LKR: 312.5, LRD: 191.0, LSL: 19.1, LYD: 4.83, MAD: 10.0, MDL: 17.8, MGA: 4550.0, MKD: 56.5, MMK: 2100, MNT: 3450, 
    MOP: 8.06, MRU: 39.5, MUR: 45.4, MVR: 15.4, MWK: 1680.0, MXN: 17.0, MYR: 4.77, MZN: 63.8, NAD: 19.1, NGN: 1500.0, NIO: 36.6, 
    NOK: 10.45, NPR: 133.0, NZD: 1.62, OMR: 0.384, PAB: 1.00, PEN: 3.79, PGK: 3.74, PHP: 55.9, PKR: 279.0, PLN: 4.01, PYG: 7280.0, 
    QAR: 3.64, RON: 4.57, RSD: 107.5, RUB: 92.5, RWF: 1270.0, SAR: 3.75, SBD: 8.46, SCR: 13.5, SDG: 601.0, SEK: 10.35, SGD: 1.34, 
    SHP: 0.79, SLE: 22.7, SLL: 22700, SOS: 571.0, SRD: 35.1, SSP: 1100.0, STN: 22.5, SYP: 2512.0, SZL: 19.1, THB: 35.9, TJS: 10.9, 
    TMT: 3.50, TND: 3.12, TOP: 2.34, TRY: 31.1, TTD: 6.78, TWD: 31.5, TZS: 2540.0, UAH: 38.3, UGX: 3920.0, UYU: 39.1, UZS: 12450, 
    VES: 36.2, VND: 24600, VUV: 119.5, WST: 2.73, XAF: 603.5, XCD: 2.70, XOF: 603.5, XPF: 110.0, YER: 250.0, ZAR: 19.1, ZMW: 24.8, ZWL: 322.0
};

// Fetch live currency rates from public API
async function updateLiveFiatRates() {
    try {
        const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD', {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
            }
        });
        const data = await response.json();
        if (data && data.rates) {
            currencyRates = data.rates;
            console.log(`[Update] Live Fiat Currency rates updated successfully. (USD->INR: ${currencyRates.INR})`);
        }
    } catch (error) {
        console.error('Failed to fetch live fiat rates, using fallback:', error.message);
    }
}

// Initial fetch and interval (Update every hour)
updateLiveFiatRates();
setInterval(updateLiveFiatRates, 3600000);

// --- GoldAPI Integration ---
require('dotenv').config();
const GOLDAPI_KEY = process.env.GOLDAPI_KEY;
let currentGoldPriceUSD = 74.50; // Fallback mock price if API fails
let isUsingMock = false;

async function updateLiveGoldPrice() {
    if (!GOLDAPI_KEY) {
        console.log('[Info] No GOLDAPI_KEY provided in .env. Using fallback live pricing (for demo purposes).');
        isUsingMock = true;
        // Simulating a tiny bit of live fluctuation (optional but nice)
        currentGoldPriceUSD = 74.50 + (Math.random() * 0.1 - 0.05);
        return;
    }
    
    try {
        const response = await fetch('https://www.goldapi.io/api/XAU/USD', {
            method: 'GET',
            headers: {
                'x-access-token': GOLDAPI_KEY,
                'Content-Type': 'application/json',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
            }
        });
        
        const data = await response.json();
        if (data && data.price) {
            // GoldAPI provides price per Troy Ounce (XAU) by default.
            // Some keys also provide price_gram_24k directly.
            // We'll calculate it from 'price' (USD/oz) as it's most reliable for XAU.
            currentGoldPriceUSD = data.price_gram_24k || (data.price / 31.1034768);
            console.log(`[Update] GoldAPI Live Sync Successful: $${currentGoldPriceUSD.toFixed(2)} USD/gram 24K`);
        } else {
            console.log('[Error] GoldAPI Sync failed. Invalid response or rate limit hit:', data);
        }
    } catch (error) {
        console.error('Failed to fetch from GoldAPI:', error.message);
    }
}

// Initial fetch and standard safe polling interval
updateLiveGoldPrice();
// GoldAPI's live update threshold varies by subscription. We'll poll every hour to respect limits safely.
setInterval(updateLiveGoldPrice, 3600000); 

// API to get live gold price and currency rates
app.get('/api/live-prices', (req, res) => {
    res.json({
        success: true,
        data: {
            pricePerGram24k_USD: currentGoldPriceUSD,
            currencyRates: currencyRates,
            updatedAt: new Date().toISOString()
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
