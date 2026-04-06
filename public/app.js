/**
 * AuraGold - Live Gold Price Calculator
 * App Logic
 */

// --- Constants & Config --- //
const UNIT_MULTIPLIERS = {
    gram: 1,
    toz: 31.1034768, // Troy Ounce to Grams
    tola: 11.6638038 // Tola to Grams
};

const translations = {
    en: {
        title: "KaratSmart – Gold Price Checker",
        subtitle: "This is NOT just a calculator. It is a decision tool",
        tabStandard: "Standard Calculator",
        tabJewellery: "Jewellery Pricing",
        currencyLabel: "Currency:",
        purityLabel: "Gold Purity (Karat)",
        weightLabel: "Weight",
        calculateBtn: "Calculate Value",
        totalValueLabel: "Total Estimated Value",
        purityResult: "Purity",
        weightResult: "Weight in Grams",
        marketPriceResult: "Market Price (1g 24K)",
        historyTitle: "Calculation History",
        saveBtn: "Save",
        shareBtn: "Share",
        jWeightLabel: "Gold Weight (g)",
        jPurityLabel: "Purity",
        jWastageLabel: "Wastage",
        jMakingLabel: "Making Charges",
        jStonesLabel: "Stones / Diamonds Price",
        jScrapLabel: "Old Scrap Value Deduction",
        jTaxLabel: "Tax / GST (%)",
        jCalculateBtnText: "Checkout Estimate",
        jNetPayable: "Final Net Payable",
        jCustomRateLabel: "Manual Market Rate",
        jCustomRateHint: "Enter price for 1g of the selected purity."
    },
    es: {
        title: "Calculadora de Precio del Oro",
        subtitle: "Calcule el valor en tiempo real de su oro según la pureza, el peso y la tasa de mercado actual.",
        tabStandard: "Calculadora Estándar",
        tabJewellery: "Precios de Joyería",
        currencyLabel: "Moneda:",
        purityLabel: "Pureza del Oro (Quilates)",
        weightLabel: "Peso",
        calculateBtn: "Calcular Valor",
        totalValueLabel: "Valor Estimado Total",
        purityResult: "Pureza",
        weightResult: "Peso en Gramos",
        marketPriceResult: "Precio de Mercado (1g 24K)",
        historyTitle: "Historial de Cálculos",
        saveBtn: "Guardar",
        shareBtn: "Compartir",
        jWeightLabel: "Peso del Oro (g)",
        jPurityLabel: "Pureza",
        jWastageLabel: "Desperdicio",
        jMakingLabel: "Cargos de Fabricación",
        jStonesLabel: "Precio de Piedras / Diamantes",
        jScrapLabel: "Deducción de Valor de Chatarra",
        jTaxLabel: "Impuesto / IVA (%)",
        jCalculateBtnText: "Pagar Estimación",
        jNetPayable: "Neto Final a Pagar",
        jCustomRateLabel: "Tarifa Manual de Mercado",
        jCustomRateHint: "Ingrese el precio por 1g de la pureza seleccionada."
    },
    hi: {
        title: "सोना मूल्य कैलकुलेटर",
        subtitle: "शुद्धता, वजन और आज की बाजार दर के आधार पर अपने सोने के वास्तविक समय के मूल्य की गणना करें।",
        tabStandard: "मानक कैलकुलेटर",
        tabJewellery: "आभूषण मूल्य निर्धारण",
        currencyLabel: "मुद्रा:",
        purityLabel: "सोने की शुद्धता (कैरेट)",
        weightLabel: "वजन",
        calculateBtn: "मूल्य की गणना करें",
        totalValueLabel: "कुल अनुमानित मूल्य",
        purityResult: "शुद्धता",
        weightResult: "ग्राम में वजन",
        marketPriceResult: "बाजार मूल्य (1g 24K)",
        historyTitle: "गणना इतिहास",
        saveBtn: "सहेजें",
        shareBtn: "साझा करें",
        jWeightLabel: "सोने का वजन (ग्राम)",
        jPurityLabel: "शुद्धता",
        jWastageLabel: "अपव्यय",
        jMakingLabel: "मेकिंग चार्जेस",
        jStonesLabel: "पत्थर / हीरे की कीमत",
        jScrapLabel: "पुराना स्क्रैप मूल्य कटौती",
        jTaxLabel: "कर / GST (%)",
        jCalculateBtnText: "चेकआउट अनुमान",
        jNetPayable: "कुल देय राशि",
        jCustomRateLabel: "मैनुअल बाजार दर",
        jCustomRateHint: "चयनित शुद्धता के 1 ग्राम की कीमत दर्ज करें।"
    },
    fr: {
        title: "Calculateur de prix de l'or",
        subtitle: "Calculez la valeur en temps réel de votre or en fonction de la pureté, du poids et du taux du marché actuel.",
        tabStandard: "Calculateur Standard",
        tabJewellery: "Prix de la bijouterie",
        currencyLabel: "Devise:",
        purityLabel: "Pureté de l'or (Carat)",
        weightLabel: "Poids",
        calculateBtn: "Calculer la valeur",
        totalValueLabel: "Valeur totale estimée",
        purityResult: "Pureté",
        weightResult: "Poids en grammes",
        marketPriceResult: "Prix du marché (1g 24K)",
        historyTitle: "Historique des calculs",
        saveBtn: "Enregistrer",
        shareBtn: "Partager",
        jWeightLabel: "Poids de l'or (g)",
        jPurityLabel: "Pureté",
        jWastageLabel: "Gaspillage",
        jMakingLabel: "Frais de fabrication",
        jStonesLabel: "Prix des pierres / diamants",
        jScrapLabel: "Déduction de la valeur de la ferraille",
        jTaxLabel: "Taxe / TVA (%)",
        jCalculateBtnText: "Estimation de la caisse",
        jNetPayable: "Net final à payer",
        jCustomRateLabel: "Prix ​​du marché manuel",
        jCustomRateHint: "Entrez le prix pour 1 g de la pureté sélectionnée."
    },
    zh: {
        title: "黄金价格计算器",
        subtitle: "根据成色、重量和当今日报率计算您的黄金实时价值。",
        tabStandard: "标准计算器",
        tabJewellery: "珠宝定价",
        currencyLabel: "货币:",
        purityLabel: "黄金成色 (克拉)",
        weightLabel: "重量",
        calculateBtn: "计算价值",
        totalValueLabel: "总估值",
        purityResult: "成色",
        weightResult: "重量（克）",
        marketPriceResult: "市场价格 (1g 24K)",
        historyTitle: "计算历史",
        saveBtn: "保存",
        shareBtn: "分享",
        jWeightLabel: "黄金重量 (克)",
        jPurityLabel: "成色",
        jWastageLabel: "损耗",
        jMakingLabel: "工费",
        jStonesLabel: "宝石/钻石价格",
        jScrapLabel: "旧料抵扣",
        jTaxLabel: "税费/增值税 (%)",
        jCalculateBtnText: "结算估算",
        jNetPayable: "最终实付",
        jCustomRateLabel: "手动市场价格",
        jCustomRateHint: "输入所选成色 1 克的价格。"
    },
    ar: {
        title: "حاسبة سعر الذهب",
        subtitle: "احسب القيمة الحقيقية لذهبك بناءً على النقاء والوزن وسعر السوق اليوم.",
        tabStandard: "الحاسبة القياسية",
        tabJewellery: "تسعير المجوهرات",
        currencyLabel: "العملة:",
        purityLabel: "نقاء الذهب (قيراط)",
        weightLabel: "الوزن",
        calculateBtn: "احسب القيمة",
        totalValueLabel: "إجمالي القيمة التقديرية",
        purityResult: "النقاء",
        weightResult: "الوزن بالجرام",
        marketPriceResult: "سعر السوق (1 جرام 24 قيراط)",
        historyTitle: "سجل العمليات",
        saveBtn: "حفظ",
        shareBtn: "مشاركة",
        jWeightLabel: "وزن الذهب (جرام)",
        jPurityLabel: "النقاء",
        jWastageLabel: "الهالك",
        jMakingLabel: "أجور المصنعية",
        jStonesLabel: "سعر الأحجار / الألماس",
        jScrapLabel: "خصم قيمة الذهب القديم",
        jTaxLabel: "الضريبة / ضريبة القيمة المضافة (%)",
        jCalculateBtnText: "عرض التقدير",
        jNetPayable: "صافي المبلغ المستحق",
        jCustomRateLabel: "سعر السوق اليدوي",
        jCustomRateHint: "أدخل سعر 1 جرام للنقاء المحدد."
    },
    ta: {
        title: "தங்க விலை கால்குலேட்டர்",
        subtitle: "தூய்மை, எடை மற்றும் இன்றைய சந்தை விலையின் அடிப்படையில் உங்கள் தங்கத்தின் மதிப்பைக் கணக்கிடுங்கள்.",
        tabStandard: "நிலையான கால்குலேட்டர்",
        tabJewellery: "நகை விலை",
        currencyLabel: "நாணயம்:",
        purityLabel: "தங்கத்தின் தூய்மை (காரட்)",
        weightLabel: "எடை",
        calculateBtn: "மதிப்பைக் கணக்கிடு",
        totalValueLabel: "மொத்த மதிப்பிடப்பட்ட மதிப்பு",
        purityResult: "தூய்மை",
        weightResult: "கிராமில் எடை",
        marketPriceResult: "சந்தை விலை (1 கிராம் 24K)",
        historyTitle: "கணக்கீடு வரலாறு",
        saveBtn: "சேமி",
        shareBtn: "பகிர்",
        jWeightLabel: "தங்க எடை (கிராம்)",
        jPurityLabel: "தூய்மை",
        jWastageLabel: "சேதாரம்",
        jMakingLabel: "கூலி",
        jStonesLabel: "கல் / வைரம் விலை",
        jScrapLabel: "பழைய தங்க கழிவு",
        jTaxLabel: "வரி / GST (%)",
        jCalculateBtnText: "மதிப்பீடு பார்க்க",
        jNetPayable: "மொத்த தொகை",
        jCustomRateLabel: "கைமுறை சந்தை விலை",
        jCustomRateHint: "தேர்ந்தெடுக்கப்பட்ட தூய்மையின் 1 கிராம் விலையை உள்ளிடவும்."
    },
    te: {
        title: "బంగారం ధర క్యాలిక్యులేటర్",
        subtitle: "శుద్ధత, బరువు మరియు నేటి మార్కెట్ ధర ఆధారంగా మీ బంగారం విలువను లెక్కించండి.",
        tabStandard: "సాధారణ క్యాలిక్యులేటర్",
        tabJewellery: "నగల ధర",
        currencyLabel: "కరెన్సీ:",
        purityLabel: "బంగారం శుద్ధత (క్యారెట్)",
        weightLabel: "బరువు",
        calculateBtn: "విలువను లెక్కించు",
        totalValueLabel: "మొత్తం అంచనా విలువ",
        purityResult: "శుద్ధత",
        weightResult: "గ్రాములలో బరువు",
        marketPriceResult: "మార్కెట్ ధర (1 గ్రాము 24K)",
        historyTitle: "లెక్కల చరిత్ర",
        saveBtn: "సేవ్ చేయండి",
        shareBtn: "షేర్ చేయండి",
        jWeightLabel: "బంగారం బరువు (గ్రాములు)",
        jPurityLabel: "శుద్ధత",
        jWastageLabel: "తరుగు",
        jMakingLabel: "మజూరీ ఖర్చులు",
        jStonesLabel: "రాళ్ళు / వజ్రాల ధర",
        jScrapLabel: "పాత బంగారం తగ్గింపు",
        jTaxLabel: "పన్ను / GST (%)",
        jCalculateBtnText: "అంచనా చూడండి",
        jNetPayable: "మొత్తం చెల్లించవలసినది",
        jCustomRateLabel: "మాన్యువల్ మార్కెట్ ధర",
        jCustomRateHint: "ఎంచుకున్న శుద్ధత యొక్క 1 గ్రాము ధరను నమోదు చేయండి."
    },
    bn: {
        title: "স্বর্ণের দাম ক্যালকুলেটর",
        subtitle: "বিশুদ্ধতা, ওজন এবং আজকের বাজার দরের ভিত্তিতে আপনার স্বর্ণের রিয়েল-টাইম মূল্য গণনা করুন।",
        tabStandard: "স্ট্যান্ডার্ড ক্যালকুলেটর",
        tabJewellery: "জুয়েলারি মূল্য",
        currencyLabel: "মুদ্রা:",
        purityLabel: "স্বর্ণের বিশুদ্ধতা (ক্যারেট)",
        weightLabel: "ওজন",
        calculateBtn: "মূল্য গণনা করুন",
        totalValueLabel: "মোট আনুমানিক মূল্য",
        purityResult: "বিশুদ্ধতা",
        weightResult: "গ্রামে ওজন",
        marketPriceResult: "বাজার মূল্য (১ গ্রাম ২৪ ক্যারেট)",
        historyTitle: "গণনার ইতিহাস",
        saveBtn: "সংরক্ষণ করুন",
        shareBtn: "শেয়ার করুন",
        jWeightLabel: "স্বর্ণের ওজন (গ্রাম)",
        jPurityLabel: "বিশুদ্ধতা",
        jWastageLabel: "অপচয় (ওয়াসটেজ)",
        jMakingLabel: "মেকিং চার্জ",
        jStonesLabel: "পাথর / হীরা মূল্য",
        jScrapLabel: "পুরানো স্ক্র্যাপ মূল্য কর্তন",
        jTaxLabel: "কর / জিএসটি (%)",
        jCalculateBtnText: "চেকআউট অনুমান",
        jNetPayable: "চূড়ান্ত বকেয়া",
        jCustomRateLabel: "ম্যানুয়াল বাজার মূল্য",
        jCustomRateHint: "নির্বাচিত বিশুদ্ধতার ১ গ্রামের দাম লিখুন।"
    }
};

// Generate Karat Options (1 to 24)
const karats = [];
for (let i = 24; i >= 1; i--) {
    let purity = ((i / 24) * 100).toFixed(1);
    if (i === 24) purity = '99.9'; // standard notation
    karats.push({ k: i, purity: parseFloat(purity) });
}

// --- State --- //
let liveMarketPriceUSD = 74.50; 
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
let calculationHistory = [];
let currentCalculation = null; 
let currentLang = 'en';
let isPriceCached = false; // To track if we're using offline cached data

// --- DOM Elements --- //
const DOM = {
    // Inputs (Standard)
    karatSelect: document.getElementById('karat'),
    weightInput: document.getElementById('weight'),
    unitSelect: document.getElementById('weightUnit'),
    currencySelect: document.getElementById('currency'),
    calcBtn: document.getElementById('calculateBtn'),
    
    // Outputs (Standard)
    outTotalValue: document.getElementById('outTotalValue'),
    outPurity: document.getElementById('outPurity'),
    outWeight: document.getElementById('outWeight'),
    outMarketPrice: document.getElementById('outMarketPrice'),
    
    // Actions & Layout
    themeToggle: document.getElementById('themeToggle'),
    themeIcon: document.getElementById('themeIcon'),
    saveHistoryBtn: document.getElementById('saveHistoryBtn'),
    shareReceiptBtn: document.getElementById('shareReceiptBtn'),
    clearHistoryBtn: document.getElementById('clearHistoryBtn'),
    tabStandard: document.getElementById('tabStandard'),
    tabJewellery: document.getElementById('tabJewellery'),
    standardFormContainer: document.getElementById('standardFormContainer'),
    jewelleryFormContainer: document.getElementById('jewelleryFormContainer'),
    standardOutputCard: document.getElementById('standardOutputCard'),
    jewelleryOutputCard: document.getElementById('jewelleryOutputCard'),
    langButton: document.getElementById('langButton'),
    langDropdown: document.getElementById('langDropdown'),
    currentLangLabel: document.getElementById('currentLangLabel'),
    
    // Standard Override
    sUseCustomRate: document.getElementById('sUseCustomRate'),
    sCustomRate: document.getElementById('sCustomRate'),
    sCustomRateContainer: document.getElementById('sCustomRateContainer'),
    
    // Jewellery Inputs
    jWeight: document.getElementById('jWeight'),
    jKarat: document.getElementById('jKarat'),
    jWastageVal: document.getElementById('jWastageVal'),
    jWastageType: document.getElementById('jWastageType'),
    jMakingVal: document.getElementById('jMakingVal'),
    jMakingType: document.getElementById('jMakingType'),
    jStones: document.getElementById('jStones'),
    jScrap: document.getElementById('jScrap'),
    jTax: document.getElementById('jTax'),
    jCalculateBtn: document.getElementById('jCalculateBtn'),
    jUseCustomRate: document.getElementById('jUseCustomRate'),
    jCustomRate: document.getElementById('jCustomRate'),
    jCustomRateContainer: document.getElementById('jCustomRateContainer'),

    // Deal Checker (Inline)
    dcSellerPrice: document.getElementById('dcSellerPrice'),
    dcCheckBtn: document.getElementById('dcCheckBtn'),
    dcResult: document.getElementById('dcResult'),
    dcVerdict: document.getElementById('dcVerdict'),
    dcOutSeller: document.getElementById('dcOutSeller'),
    dcOutDiff: document.getElementById('dcOutDiff'),

    // Jewellery Outputs
    jOutTotalValue: document.getElementById('jOutTotalValue'),
    jOutBasePrice: document.getElementById('jOutBasePrice'),
    jOutWastagePrice: document.getElementById('jOutWastagePrice'),
    jOutMakingPrice: document.getElementById('jOutMakingPrice'),
    jOutStonesPrice: document.getElementById('jOutStonesPrice'),
    jOutSubtotal: document.getElementById('jOutSubtotal'),
    jOutScrapValue: document.getElementById('jOutScrapValue'),
    jOutTaxable: document.getElementById('jOutTaxable'),
    jOutTaxValue: document.getElementById('jOutTaxValue'),
    jOutBaseWeight: document.getElementById('jOutBaseWeight'),
    jOutWastageType: document.getElementById('jOutWastageType'),
    jOutMakingType: document.getElementById('jOutMakingType'),
    jOutTaxPerc: document.getElementById('jOutTaxPerc'),
    
    // History Table
    historyTable: document.getElementById('historyTableBody'),
    noHistoryMessage: document.getElementById('noHistoryMessage'),

    // Jewellery specific actions
    jSaveHistoryBtn: document.getElementById('jSaveHistoryBtn'),
    jShareReceiptBtn: document.getElementById('jShareReceiptBtn')
};


// --- Initialization --- //
function init() {
    initTheme();
    populateKarats();
    loadHistory();
    loadCachedPrices(); // Load from localStorage first
    fetchLivePrices(); // Then try to fetch live

    // Initialize Language
    const savedLang = localStorage.getItem('goldHelper_lang') || 'en';
    selectLang(null, savedLang);
    
    // Auto-fetch every 5 minutes (300,000 ms)
    setInterval(fetchLivePrices, 300000);

    // Event Listeners
    DOM.calcBtn.addEventListener('click', performCalculation);
    DOM.jCalculateBtn.addEventListener('click', performJewelleryCalculation);
    DOM.themeToggle.addEventListener('click', toggleTheme);
    DOM.saveHistoryBtn.addEventListener('click', saveToHistory);
    DOM.clearHistoryBtn.addEventListener('click', clearHistory);
    DOM.shareReceiptBtn.addEventListener('click', shareAsImage);

    if (DOM.jSaveHistoryBtn) DOM.jSaveHistoryBtn.addEventListener('click', saveToHistory);
    if (DOM.jShareReceiptBtn) DOM.jShareReceiptBtn.addEventListener('click', shareAsImage);

    // Tab Listeners
    DOM.tabStandard.addEventListener('click', () => switchTab('standard'));
    DOM.tabJewellery.addEventListener('click', () => switchTab('jewellery'));

    // Deal Checker Listeners
    if (DOM.dcCheckBtn) DOM.dcCheckBtn.addEventListener('click', performJewelleryCalculation);

    // Enter key support for input
    DOM.weightInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') performCalculation();
    });
    DOM.jWeight.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') performJewelleryCalculation();
    });

    // Language Toggle Listener
    if (DOM.langButton) {
        DOM.langButton.addEventListener('click', (e) => {
            e.stopPropagation();
            DOM.langDropdown.classList.toggle('opacity-0');
            DOM.langDropdown.classList.toggle('invisible');
        });
    }

    // Close language menu when clicking elsewhere
    document.addEventListener('click', () => {
        if (DOM.langDropdown && !DOM.langDropdown.classList.contains('invisible')) {
            DOM.langDropdown.classList.add('opacity-0', 'invisible');
        }
    });

    // Custom Rate Toggle (Jewellery)
    if (DOM.jUseCustomRate) {
        DOM.jUseCustomRate.addEventListener('change', () => {
            if (DOM.jUseCustomRate.checked) {
                DOM.jCustomRateContainer.classList.remove('hidden');
                DOM.jCustomRate.focus();
            } else {
                DOM.jCustomRateContainer.classList.add('hidden');
            }
        });
    }

    // Custom Rate Toggle (Standard)
    if (DOM.sUseCustomRate) {
        DOM.sUseCustomRate.addEventListener('change', () => {
            if (DOM.sUseCustomRate.checked) {
                DOM.sCustomRateContainer.classList.remove('hidden');
                DOM.sCustomRate.focus();
            } else {
                DOM.sCustomRateContainer.classList.add('hidden');
            }
        });
    }
}

function switchTab(tab) {
    if (tab === 'standard') {
        DOM.tabStandard.classList.add('text-gold-600', 'dark:text-gold-400', 'border-gold-500');
        DOM.tabStandard.classList.remove('text-gray-500', 'border-transparent');
        DOM.tabJewellery.classList.remove('text-gold-600', 'dark:text-gold-400', 'border-gold-500');
        DOM.tabJewellery.classList.add('text-gray-500', 'border-transparent');
        if (DOM.tabDeal) {
            DOM.tabDeal.classList.remove('text-blue-600', 'dark:text-blue-400', 'border-blue-500');
            DOM.tabDeal.classList.add('text-gray-500', 'border-transparent');
        }
        
        DOM.standardFormContainer.classList.remove('hidden');
        DOM.standardOutputCard.classList.remove('hidden');
        DOM.jewelleryFormContainer.classList.add('hidden');
        DOM.jewelleryOutputCard.classList.add('hidden');
        if (DOM.dealContainer) DOM.dealContainer.classList.add('hidden');
        document.getElementById('mainGrid').classList.remove('hidden');
        
    } else if (tab === 'jewellery') {
        DOM.tabJewellery.classList.add('text-gold-600', 'dark:text-gold-400', 'border-gold-500');
        DOM.tabJewellery.classList.remove('text-gray-500', 'border-transparent');
        DOM.tabStandard.classList.remove('text-gold-600', 'dark:text-gold-400', 'border-gold-500');
        DOM.tabStandard.classList.add('text-gray-500', 'border-transparent');
        if (DOM.tabDeal) {
            DOM.tabDeal.classList.remove('text-blue-600', 'dark:text-blue-400', 'border-blue-500');
            DOM.tabDeal.classList.add('text-gray-500', 'border-transparent');
        }

        DOM.standardFormContainer.classList.add('hidden');
        DOM.standardOutputCard.classList.add('hidden');
        DOM.jewelleryFormContainer.classList.remove('hidden');
        DOM.jewelleryOutputCard.classList.remove('hidden');
        if (DOM.dealContainer) DOM.dealContainer.classList.add('hidden');
        document.getElementById('mainGrid').classList.remove('hidden');
        
    } else if (tab === 'deal') {
        if (DOM.tabDeal) {
            DOM.tabDeal.classList.add('text-blue-600', 'dark:text-blue-400', 'border-blue-500');
            DOM.tabDeal.classList.remove('text-gray-500', 'border-transparent');
        }
        DOM.tabStandard.classList.remove('text-gold-600', 'dark:text-gold-400', 'border-gold-500');
        DOM.tabStandard.classList.add('text-gray-500', 'border-transparent');
        DOM.tabJewellery.classList.remove('text-gold-600', 'dark:text-gold-400', 'border-gold-500');
        DOM.tabJewellery.classList.add('text-gray-500', 'border-transparent');
        
        document.getElementById('mainGrid').classList.add('hidden');
        if (DOM.dealContainer) DOM.dealContainer.classList.remove('hidden');
    }
}

// --- Theme Management --- //
function initTheme() {
    const isDark = localStorage.getItem('theme') === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
    if (isDark) {
        document.documentElement.classList.add('dark');
        DOM.themeIcon.classList.replace('ph-moon', 'ph-sun');
    }
}

function toggleTheme() {
    document.documentElement.classList.toggle('dark');
    const isDark = document.documentElement.classList.contains('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    
    if (isDark) {
        DOM.themeIcon.classList.replace('ph-moon', 'ph-sun');
    } else {
        DOM.themeIcon.classList.replace('ph-sun', 'ph-moon');
    }
}

// --- Setup UI --- //
function populateKarats() {
    const optionsHtml = karats.map(k => 
        `<option value="${k.k}">${k.k}K - ${k.purity}% Purity</option>`
    ).join('');
    
    if (DOM.karatSelect) DOM.karatSelect.innerHTML = optionsHtml;
    if (DOM.jKarat) {
        DOM.jKarat.innerHTML = optionsHtml;
        DOM.jKarat.value = "22"; // default to 22K for jewellery
    }
    if (DOM.dcKarat) {
        DOM.dcKarat.innerHTML = optionsHtml;
        DOM.dcKarat.value = "22"; // default to 22K for deal checker
    }
}



// --- API Handling --- //
async function fetchLivePrices() {
    try {
        const response = await fetch('/api/live-prices');
        const json = await response.json();
        
        if (json.success) {
            liveMarketPriceUSD = json.data.pricePerGram24k_USD;
            currencyRates = json.data.currencyRates;
            isPriceCached = false;
            
            // Sync to localStorage
            savePriceToCache(liveMarketPriceUSD, currencyRates);
            updateLiveIndicator(true);

            // Re-populate currencies to ensure 100+ show up
            populateCurrencies();

            // Auto re-calculate if weight exists
            if (DOM.weightInput.value) performCalculation();
            if (DOM.jWeight.value) performJewelleryCalculation();
            if(window.updateCurrencyOutputs) window.updateCurrencyOutputs();
        }
    } catch (error) {
        console.warn('Network issue, using cached prices:', error.message);
        isPriceCached = true;
        updateLiveIndicator(false);
    }
}

function loadCachedPrices() {
    const cachedPrice = localStorage.getItem('gold_price_usd');
    const cachedRates = localStorage.getItem('gold_currency_rates');
    
    if (cachedPrice) {
        liveMarketPriceUSD = parseFloat(cachedPrice);
        isPriceCached = true;
    }
    if (cachedRates) {
        currencyRates = JSON.parse(cachedRates);
    }
    
    // Populate UI with cached data immediately
    if (Object.keys(currencyRates).length > 1) {
        populateCurrencies();
        updateLiveIndicator(false);
    }
}

function savePriceToCache(price, rates) {
    localStorage.setItem('gold_price_usd', price);
    localStorage.setItem('gold_currency_rates', JSON.stringify(rates));
    localStorage.setItem('gold_last_sync', new Date().toISOString());
}

function updateLiveIndicator(isOnline) {
    const indicator = document.getElementById('live-indicator');
    if (!indicator) return;

    if (isOnline) {
        indicator.innerHTML = `
            <span class="relative flex h-2 w-2">
                <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span class="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            Live Market
        `;
        indicator.classList.remove('bg-blue-100', 'text-blue-700', 'border-blue-200');
        indicator.classList.add('bg-green-100', 'text-green-700', 'border-green-200');
    } else {
        const lastSync = localStorage.getItem('gold_last_sync');
        const timeStr = lastSync ? new Date(lastSync).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : 'Offline';
        indicator.innerHTML = `
            <span class="flex h-2 w-2 rounded-full bg-blue-500"></span>
            Offline (Synced ${timeStr})
        `;
        indicator.classList.remove('bg-green-100', 'text-green-700', 'border-green-200');
        indicator.classList.add('bg-blue-100', 'text-blue-700', 'border-blue-200');
    }
    indicator.classList.remove('hidden');
}

window.updateCurrencyOutputs = function() {
    const sym = getCurrencySymbol(DOM.currencySelect.value) || '$';
    document.querySelectorAll('.jCurrencySymbol').forEach(el => el.innerText = sym);
}

// --- Dynamic Currency Setup --- //
function populateCurrencies() {
    const topCurrencies = ['USD', 'EUR', 'GBP', 'JPY', 'AUD', 'CAD', 'CHF', 'CNH', 'HKD', 'NZD', 'INR', 'SGD', 'AED'];
    
    // Get all available currencies passed from backend
    const allCodes = Object.keys(currencyRates);
    
    // Separate into top and others
    const top = topCurrencies.filter(c => allCodes.includes(c));
    const others = allCodes.filter(c => !topCurrencies.includes(c)).sort();
    
    const displayNames = new Intl.DisplayNames(['en'], { type: 'currency' });

    function createOption(code) {
        let name = code;
        try {
            name = displayNames.of(code);
        } catch(e) {}
        
        // Try to generate a rough flag from the currency code (using first two letters)
        let flag = '';
        if (code === 'EUR') flag = '🇪🇺';
        else {
            const countryCode = code.substring(0, 2);
            flag = String.fromCodePoint(...[...countryCode].map(c => c.charCodeAt(0) + 127397));
        }
        
        return `<option value="${code}">${flag} ${code} - ${name}</option>`;
    }

    let html = ``;
    if (top.length > 0) {
        html += `<optgroup label="Most Used">` + top.map(createOption).join('') + `</optgroup>`;
    }
    if (others.length > 0) {
        html += `<optgroup label="Other Currencies">` + others.map(createOption).join('') + `</optgroup>`;
    }
    
    DOM.currencySelect.innerHTML = html;
}

// --- Core Calculation Logic --- //
function performCalculation() {
    const weightVal = parseFloat(DOM.weightInput.value);
    
    if (isNaN(weightVal) || weightVal <= 0) {
        alert('Please enter a valid weight greater than 0.');
        DOM.weightInput.focus();
        return;
    }

    // Get selections
    const kVal = parseInt(DOM.karatSelect.value);
    const unit = DOM.unitSelect.value;
    const currency = DOM.currencySelect.value;
    const currencySymbol = getCurrencySymbol(currency);

    // 1. Convert weight to grams
    const weightGrams = weightVal * UNIT_MULTIPLIERS[unit];

    // 2. Calculate Purity Multiplier
    const purityObj = karats.find(k => k.k === kVal);
    const purityMultiplier = purityObj.purity / 100;

    // 3. Current Market Price
    let pricePerGramCurrency;
    const rate = currencyRates[currency] || 1;

    // Check for Manual Override
    if (DOM.sUseCustomRate.checked && !isNaN(parseFloat(DOM.sCustomRate.value))) {
        pricePerGramCurrency = parseFloat(DOM.sCustomRate.value);
    } else {
        // Convert USD per gram to Selected Currency per gram
        pricePerGramCurrency = liveMarketPriceUSD * rate;
    }

    // 4. Calculate Total Value
    const totalValue = weightGrams * purityMultiplier * pricePerGramCurrency;

    // Update UI 
    updateOutputs({
        weightStr: weightVal,
        unitStr: unit,
        weightGrams: weightGrams,
        karat: kVal,
        purity: purityObj.purity,
        totalValue: totalValue,
        pricePerGram: pricePerGramCurrency,
        currencySymbol: currencySymbol,
        currency: currency,
        isManual: DOM.sUseCustomRate.checked
    });
}

function updateOutputs(data) {
    // Animate numbers (simple way: add a quick fade)
    DOM.outTotalValue.style.opacity = '0.5';
    
    setTimeout(() => {
        // Format outputs
        DOM.outTotalValue.innerText = `${data.currencySymbol}${data.totalValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
        DOM.outPurity.innerText = `${data.karat} Karat (${data.purity}%)`;
        DOM.outWeight.innerText = `${data.weightGrams.toFixed(3)} g`;
        DOM.outMarketPrice.innerText = `${data.currencySymbol}${data.pricePerGram.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}/g`;
        
        DOM.outTotalValue.style.opacity = '1';
        
        // Save to current state
        currentCalculation = {
            date: new Date().toISOString(),
            ...data
        };
    }, 150);
}



// --- Jewellery Calculation Logic (PRO) --- //
function performJewelleryCalculation() {
    const weightGrams = parseFloat(DOM.jWeight.value) || 0;
    const kVal = parseInt(DOM.jKarat.value);
    const wastageVal = parseFloat(DOM.jWastageVal.value) || 0;
    const wastageType = DOM.jWastageType.value;
    const makingVal = parseFloat(DOM.jMakingVal.value) || 0;
    const makingType = DOM.jMakingType.value;
    const stonesVal = parseFloat(DOM.jStones.value) || 0;
    const scrapVal = parseFloat(DOM.jScrap.value) || 0;
    const taxPerc = parseFloat(DOM.jTax.value) || 0;

    const currency = DOM.currencySelect.value;
    const currencySymbol = getCurrencySymbol(currency);
    const rate = currencyRates[currency] || 1;
    
    // Purity Multiplier from the global karats config
    const purityObj = karats.find(k => k.k === kVal) || { purity: 91.6 };
    const purityMultiplier = purityObj.purity / 100;

    let pricePerGramCurrency; // This will hold the market rate for the selected currency
    let purityPricePerGram;  // This will hold the price for 1g of the SELECTED PURITY

    if (DOM.jUseCustomRate.checked && !isNaN(parseFloat(DOM.jCustomRate.value))) {
        // If manual rate is used, the user enters the price for the SELECTED purity
        purityPricePerGram = parseFloat(DOM.jCustomRate.value);
        // We can back-calculate 24k price for reference/logic consistency if needed
        pricePerGramCurrency = purityPricePerGram / (purityMultiplier || 1);
    } else {
        // Standard live price is always for 24K
        pricePerGramCurrency = liveMarketPriceUSD * rate;
        purityPricePerGram = pricePerGramCurrency * purityMultiplier;
    }

    if (weightGrams <= 0) {
        alert('Please enter a valid gold weight.');
        DOM.jWeight.focus();
        return;
    }

    // 1. Base Price (Gold Value Only)
    const basePrice = weightGrams * purityPricePerGram;

    // 2. Wastage
    let wastageAmount = 0;
    if (wastageType === 'percent') {
        // Wastage calculated on the gold value of the piece
        wastageAmount = basePrice * (wastageVal / 100);
        DOM.jOutWastageType.innerText = `(${wastageVal}%)`;
    } else {
        // Wastage entered as pure grams of gold
        // Value of wastage grams should be calculated at the purity-specific rate
        wastageAmount = wastageVal * purityPricePerGram;
        DOM.jOutWastageType.innerText = `(${wastageVal}g)`;
    }

    // 3. Making Charges
    let makingAmount = 0;
    if (makingType === 'percent') {
        makingAmount = basePrice * (makingVal / 100);
        DOM.jOutMakingType.innerText = `(${makingVal}%)`;
    } else if (makingType === 'per_gram') {
        makingAmount = makingVal * weightGrams;
        DOM.jOutMakingType.innerText = `(${makingVal}/g)`;
    } else if (makingType === 'flat') {
        makingAmount = makingVal;
        DOM.jOutMakingType.innerText = `(Flat)`;
    }

    // 4. Subtotal
    const subtotal = basePrice + wastageAmount + makingAmount + stonesVal;

    // 5. Old Scrap Deduction
    const taxableValue = Math.max(0, subtotal - scrapVal);

    // 6. Tax (GST etc.)
    const taxAmount = taxableValue * (taxPerc / 100);

    // 7. Net Total
    const finalTotal = taxableValue + taxAmount;

    // Formatting outputs
    const formatValue = (val) => `${currencySymbol}${val.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

    DOM.jOutBasePrice.innerText = formatValue(basePrice);
    DOM.jOutWastagePrice.innerText = '+' + formatValue(wastageAmount);
    DOM.jOutMakingPrice.innerText = '+' + formatValue(makingAmount);
    DOM.jOutStonesPrice.innerText = '+' + formatValue(stonesVal);
    DOM.jOutSubtotal.innerText = formatValue(subtotal);
    DOM.jOutScrapValue.innerText = '-' + formatValue(scrapVal);
    DOM.jOutTaxable.innerText = formatValue(taxableValue);
    DOM.jOutTaxPerc.innerText = `(${taxPerc}% Tax)`;
    DOM.jOutTaxValue.innerText = '+' + formatValue(taxAmount);
    DOM.jOutTotalValue.innerText = formatValue(finalTotal);
    DOM.jOutBaseWeight.innerText = `(${weightGrams}g @ ${kVal}K)`;

    // Keep state
    currentCalculation = {
        date: new Date().toISOString(),
        currencySymbol,
        totalValue: finalTotal,
        pricePerGram: purityPricePerGram,
        weightStr: weightGrams.toFixed(2),
        unitStr: 'g',
        karat: kVal,
        purity: purityObj.purity
    };

    // Deal Checker Logic
    const sellerPrice = parseFloat(DOM.dcSellerPrice.value) || 0;
    if (sellerPrice > 0) {
        const difference = sellerPrice - finalTotal;
        const diffPercent = (difference / finalTotal) * 100;
        
        DOM.dcOutSeller.innerText = formatValue(sellerPrice);
        
        const diffEl = DOM.dcOutDiff;
        const verdictEl = DOM.dcVerdict;

        if (diffPercent <= 0) {
            // Good Deal
            diffEl.innerText = `${diffPercent < 0 ? '' : '+'}${diffPercent.toFixed(2)}%`;
            diffEl.className = 'font-mono font-bold text-base text-green-500';
            
            verdictEl.innerText = 'Good Deal';
            verdictEl.className = 'absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 px-3 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-green-100 text-green-700 border border-green-200 dark:bg-gray-900 dark:text-green-400 dark:border-green-600 whitespace-nowrap shadow-sm';
        } else if (diffPercent <= 5) {
            // Fair
            diffEl.innerText = `+${diffPercent.toFixed(2)}%`;
            diffEl.className = 'font-mono font-bold text-base text-blue-500 dark:text-blue-400';

            verdictEl.innerText = 'Fair';
            verdictEl.className = 'absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 px-3 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-100 text-blue-700 border border-blue-200 dark:bg-gray-900 dark:text-blue-400 dark:border-blue-600 whitespace-nowrap shadow-sm';
        } else if (diffPercent <= 15) {
            // Slightly High
            diffEl.innerText = `+${diffPercent.toFixed(2)}%`;
            diffEl.className = 'font-mono font-bold text-base text-orange-500';

            verdictEl.innerText = 'Slightly High';
            verdictEl.className = 'absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 px-3 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-orange-100 text-orange-700 border border-orange-200 dark:bg-gray-900 dark:text-orange-400 dark:border-orange-600 whitespace-nowrap shadow-sm';
        } else {
            // Overpriced
            diffEl.innerText = `+${diffPercent.toFixed(2)}%`;
            diffEl.className = 'font-mono font-bold text-base text-red-500';

            verdictEl.innerText = 'Overpriced';
            verdictEl.className = 'absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 px-3 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-red-100 text-red-700 border border-red-200 dark:bg-gray-900 dark:text-red-400 dark:border-red-600 whitespace-nowrap shadow-sm';
        }

        DOM.dcResult.classList.remove('hidden');
    } else {
        DOM.dcResult.classList.add('hidden');
    }

    // Simple animation effect
    DOM.jewelleryOutputCard.style.opacity = '0.7';
    setTimeout(() => DOM.jewelleryOutputCard.style.opacity = '1', 100);
}

// --- History Management --- //
function loadHistory() {
    const saved = localStorage.getItem('goldHelper_history');
    if (saved) {
        calculationHistory = JSON.parse(saved);
    }
    renderHistory();
}

function saveToHistory(e) {
    if (!currentCalculation) {
        alert("Please calculate a value first.");
        return;
    }

    // Add to top of array
    calculationHistory.unshift(currentCalculation);
    // Keep max 20 entries
    if (calculationHistory.length > 20) {
        calculationHistory.pop();
    }
    
    localStorage.setItem('goldHelper_history', JSON.stringify(calculationHistory));
    renderHistory();
    
    // Add visual feedback to button
    const btn = e ? e.currentTarget : DOM.saveHistoryBtn;
    const ogText = btn.innerHTML;
    btn.innerHTML = '<i class="ph ph-check-circle text-lg"></i> Saved';
    btn.classList.add('bg-green-500/20', 'text-green-400', 'border-green-500/30');
    
    setTimeout(() => {
        btn.innerHTML = ogText;
        btn.classList.remove('bg-green-500/20', 'text-green-400', 'border-green-500/30');
    }, 2000);
}

function clearHistory() {
    if(confirm('Are you sure you want to clear your calculation history?')) {
        calculationHistory = [];
        localStorage.removeItem('goldHelper_history');
        renderHistory();
    }
}

function renderHistory() {
    if (calculationHistory.length === 0) {
        DOM.historyTable.innerHTML = '';
        DOM.noHistoryMessage.classList.remove('hidden');
        DOM.clearHistoryBtn.classList.add('hidden');
        return;
    }

    DOM.noHistoryMessage.classList.add('hidden');
    DOM.clearHistoryBtn.classList.remove('hidden');

    DOM.historyTable.innerHTML = calculationHistory.map(item => {
        const date = new Date(item.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
        const totalStr = `${item.currencySymbol}${item.totalValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
        const marketStr = `${item.currencySymbol}${item.pricePerGram.toFixed(2)}`;
        
        return `
            <tr class="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                <td class="px-4 py-3 text-gray-500 dark:text-gray-400 whitespace-nowrap">${date}</td>
                <td class="px-4 py-3">
                    <span class="font-medium text-gray-900 dark:text-white">${item.weightStr} ${item.unitStr}</span>
                    <span class="text-xs ml-1 text-gold-600 dark:text-gold-400 bg-gold-50 dark:bg-gold-900/20 px-1.5 py-0.5 rounded-full border border-gold-200 dark:border-gold-800">${item.karat}K</span>
                </td>
                <td class="px-4 py-3 font-mono text-xs text-gray-500 dark:text-gray-400">${marketStr}</td>
                <td class="px-4 py-3 text-right font-medium text-gray-900 dark:text-white font-mono">${totalStr}</td>
            </tr>
        `;
    }).join('');
}

// --- Utilities --- //
function getCurrencySymbol(code) {
    try {
        // Automatically fetch correct symbol via native API
        const formatter = new Intl.NumberFormat('en', { style: 'currency', currency: code, maximumFractionDigits: 0 });
        const parts = formatter.formatToParts(0);
        const symbolPart = parts.find(p => p.type === 'currency');
        return symbolPart ? symbolPart.value : code + ' ';
    } catch (e) {
        return code + ' ';
    }
}

// --- Export to Image / PDF functionality --- //
function shareAsImage(e) {
    if (!currentCalculation) {
        alert("Please calculate a value first before sharing.");
        return;
    }

    const captureArea = document.getElementById('captureArea');
    const watermark = document.getElementById('captureWatermark');
    
    // UI feedback
    const btn = e ? e.currentTarget : DOM.shareReceiptBtn;
    const originalText = btn.innerHTML;
    btn.innerHTML = '<i class="ph ph-spinner animate-spin text-lg"></i> Generating...';
    
    // Add watermark temporarily for the screenshot
    watermark.innerText = 'Karat Smart';
    watermark.classList.remove('hidden');
    
    // Use html2canvas
    html2canvas(captureArea, {
        scale: 2, // High resolution
        backgroundColor: document.documentElement.classList.contains('dark') ? '#111827' : '#f9fafb', 
        logging: false,
        useCORS: true
    }).then(canvas => {
        // Create an image blob to share natively if supported
        canvas.toBlob(async (blob) => {
            const fileName = `KaratSmart_Quote_${new Date().getTime()}.png`;
            const file = new File([blob], fileName, { type: 'image/png' });

            if (navigator.canShare && navigator.canShare({ files: [file] })) {
                try {
                    await navigator.share({
                        title: 'Karat Smart Quote',
                        text: 'Here is my Gold Price Estimate from Karat Smart.',
                        files: [file]
                    });
                } catch (err) {
                    // Ignore abort errors which happen when user closes share sheet
                    if (err.name !== 'AbortError') {
                        console.error('Share failed', err);
                    }
                }
            } else {
                // Fallback to direct download on desktop/unsupported browsers
                const imageURI = canvas.toDataURL('image/png');
                const link = document.createElement('a');
                link.download = fileName;
                link.href = imageURI;
                link.click();
            }

            // Cleanup UI
            watermark.classList.add('hidden');
            btn.innerHTML = '<i class="ph ph-check text-lg"></i> Shared';
            setTimeout(() => {
                btn.innerHTML = originalText;
            }, 2000);
        }, 'image/png');
        
    }).catch(err => {
        console.error("Error generating image:", err);
        watermark.classList.add('hidden');
        btn.innerHTML = originalText;
        alert("Failed to generate image.");
    });
}

// --- Language Controls --- //
function selectLang(e, lang) {
    if (e) e.preventDefault();
    
    // Close dropdown
    if (DOM.langDropdown) {
        DOM.langDropdown.classList.add('opacity-0', 'invisible');
    }

    currentLang = lang;
    applyTranslations();
    
    // Update Label
    const langNames = {
        'en': 'English',
        'es': 'Español',
        'hi': 'हिन्दी',
        'fr': 'Français',
        'zh': '中文',
        'ar': 'العربية',
        'ta': 'தமிழ்',
        'te': 'తెలుగు',
        'bn': 'বাংলা',
        'mr': 'मराठी',
        'gu': 'ગુજરાતી'
    };
    if (DOM.currentLangLabel) DOM.currentLangLabel.innerText = langNames[lang] || lang.toUpperCase();
    
    // Save preference
    localStorage.setItem('goldHelper_lang', lang);
}

function applyTranslations() {
    const t = translations[currentLang];
    if (!t) return;

    // Direct text replacements
    const elements = [
        { id: 't-title', key: 'title' },
        { id: 't-subtitle', key: 'subtitle' },
        { id: 'tabStandard', key: 'tabStandard' },
        { id: 'tabJewellery', key: 'tabJewellery' },
        { id: 't-currencyLabel', key: 'currencyLabel' },
        { id: 't-purityLabel', key: 'purityLabel' },
        { id: 't-weightLabel', key: 'weightLabel' },
        { id: 't-calculateBtn', key: 'calculateBtn' },
        { id: 't-totalValueLabel', key: 'totalValueLabel' },
        { id: 't-purityResult', key: 'purityResult' },
        { id: 't-weightResult', key: 'weightResult' },
        { id: 't-marketPriceResult', key: 'marketPriceResult' },
        { id: 't-saveBtn', key: 'saveBtn' },
        { id: 't-shareBtn', key: 'shareBtn' },
        { id: 't-historyTitle', key: 'historyTitle' },
        { id: 't-jWeightLabel', key: 'jWeightLabel' },
        { id: 't-jPurityLabel', key: 'jPurityLabel' },
        { id: 't-jWastageLabel', key: 'jWastageLabel' },
        { id: 't-jMakingLabel', key: 'jMakingLabel' },
        { id: 't-jStonesLabel', key: 'jStonesLabel' },
        { id: 't-jScrapLabel', key: 'jScrapLabel' },
        { id: 't-jTaxLabel', key: 'jTaxLabel' },
        { id: 't-jCalculateBtnText', key: 'jCalculateBtnText' },
        { id: 't-jNetPayable', key: 'jNetPayable' },
        { id: 't-jCustomRateLabel', key: 'jCustomRateLabel' },
        { id: 't-jCustomRateHint', key: 'jCustomRateHint' }
    ];

    elements.forEach(item => {
        const el = document.getElementById(item.id);
        if (el && t[item.key]) {
            el.innerText = t[item.key];
        }
    });
}

function closeModal() {
    const modal = document.getElementById('premiumModal');
    if (modal) {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
    }
}

// --- Deal Check Logic --- //
function performDealCheck() {
    const weightGrams = parseFloat(DOM.dcWeight.value) || 0;
    const kVal = parseInt(DOM.dcKarat.value);
    const sellerPrice = parseFloat(DOM.dcSellerPrice.value) || 0;
    const currency = DOM.currencySelect.value;
    const currencySymbol = getCurrencySymbol(currency);
    const rate = currencyRates[currency] || 1;

    if (weightGrams <= 0) {
        alert('Please enter a valid weight.');
        DOM.dcWeight.focus();
        return;
    }
    if (sellerPrice <= 0) {
        alert("Please enter the seller\'s price.");
        DOM.dcSellerPrice.focus();
        return;
    }

    const purityObj = karats.find(k => k.k === kVal) || { purity: 91.6 };
    const purityMultiplier = purityObj.purity / 100;

    // Use live price for fair value
    const pricePerGramCurrency = liveMarketPriceUSD * rate;
    const purityPricePerGram = pricePerGramCurrency * purityMultiplier;
    
    // Fair Price calculation (Raw Gold Value)
    const fairPrice = weightGrams * purityPricePerGram;

    const difference = sellerPrice - fairPrice;
    const diffPercent = (difference / fairPrice) * 100;

    // Format outputs
    const formatValue = (val) => `${currencySymbol}${val.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    
    DOM.dcFairPrice.innerText = formatValue(fairPrice);
    DOM.dcOutSeller.innerText = formatValue(sellerPrice);
    
    const diffEl = DOM.dcOutDiff;
    const verdictEl = DOM.dcVerdict;

    if (diffPercent <= 0) {
        // Good Deal
        diffEl.innerText = `${diffPercent < 0 ? '' : '+'}${diffPercent.toFixed(2)}%`;
        diffEl.className = 'font-mono font-bold text-lg text-green-500';
        
        verdictEl.innerText = 'Good Deal';
        verdictEl.className = 'inline-flex items-center justify-center px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-wider mb-5 bg-green-100 text-green-700 border border-green-200 dark:bg-green-900/40 dark:text-green-400 dark:border-green-800';
    } else if (diffPercent <= 5) {
        // Fair
        diffEl.innerText = `+${diffPercent.toFixed(2)}%`;
        diffEl.className = 'font-mono font-bold text-lg text-blue-500 dark:text-blue-400';

        verdictEl.innerText = 'Fair';
        verdictEl.className = 'inline-flex items-center justify-center px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-wider mb-5 bg-blue-100 text-blue-700 border border-blue-200 dark:bg-blue-900/40 dark:text-blue-400 dark:border-blue-800';
    } else if (diffPercent <= 15) {
        // Slightly High
        diffEl.innerText = `+${diffPercent.toFixed(2)}%`;
        diffEl.className = 'font-mono font-bold text-lg text-orange-500';

        verdictEl.innerText = 'Slightly High';
        verdictEl.className = 'inline-flex items-center justify-center px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-wider mb-5 bg-orange-100 text-orange-700 border border-orange-200 dark:bg-orange-900/40 dark:text-orange-400 dark:border-orange-800';
    } else {
        // Overpriced
        diffEl.innerText = `+${diffPercent.toFixed(2)}%`;
        diffEl.className = 'font-mono font-bold text-lg text-red-500';

        verdictEl.innerText = 'Overpriced';
        verdictEl.className = 'inline-flex items-center justify-center px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-wider mb-5 bg-red-100 text-red-700 border border-red-200 dark:bg-red-900/40 dark:text-red-400 dark:border-red-800';
    }

    DOM.dcResult.classList.remove('hidden');
    // Scroll slightly 
    setTimeout(() => {
        DOM.dcResult.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 50);
}

// Start app
document.addEventListener('DOMContentLoaded', init);
