export interface FormData {
    companyName: string;
    vatNo: string;
    address: string;
    postcode: string;
    city: string;
    email: string;
    phone: string;
    firstName: string;
    lastName: string;
    contactEmail: string;
    contactPhone: string;
    countryCode: string;
    contactCountryCode: string;
    installSmartPrice: boolean;
    installationTiming: 'next-visit' | 'asap';
    systemName: string;
    xrgiIdNumber: string;
    selectedModel: string;
    systemAddress: string;
    systemPostcode: string;
    systemCity: string;
    systemCountry: string;
    hasServiceContract: boolean | null;
    serviceProviderName: string;
    serviceProviderEmail: string;
    serviceProviderPhone: string;
    serviceCountryCode: string;
    isSalesPartnerSame: boolean | null;
    salesPartnerName: string;
    salesPartnerEmail: string;
    salesPartnerPhone: string;
    salesCountryCode: string;
    isSystemInstalled: boolean;
    energyCheckPlus: boolean;
    expectedAnnualSavings: string;
    expectedCO2Savings: string;
    expectedOperatingHours: string;
    industry: string;
    recipientEmails: string;
    distributeHoursEvenly: boolean;
    monthlyDistribution: {
        month: string;
        percentage: string;
        hours: string;
        editable: boolean;
    }[];
}

export const countryCodes = [
    { code: '+1', country: 'US/CA', flag: '🇺🇸' },
    { code: '+44', country: 'UK', flag: '🇬🇧' },
    { code: '+91', country: 'IN', flag: '🇮🇳' },
    { code: '+49', country: 'DE', flag: '🇩🇪' },
    { code: '+33', country: 'FR', flag: '🇫🇷' },
    { code: '+86', country: 'CN', flag: '🇨🇳' },
    { code: '+81', country: 'JP', flag: '🇯🇵' },
    { code: '+61', country: 'AU', flag: '🇦🇺' },
    { code: '+971', country: 'AE', flag: '🇦🇪' },
    { code: '+7', country: 'RU', flag: '🇷🇺' },
];

export const models = [
    'XRGI 15',
    'XRGI 20',
    'XRGI 25',
    'XRGI 30',
    'XRGI 35',
    'XRGI 40',
    'XRGI 45',
    'XRGI 50',
];

export const industries = [
    'Manufacturing',
    'Healthcare',
    'Education',
    'Retail',
    'Hospitality',
    'Agriculture',
    'Other',
];

export const country = [
    'United States',
    'United Kingdom',
    'India',
    'Germany',
    'France',
    'Brazil',
    'Japan',
    'Australia',
    'United Arab Emirates',
    'Russia',
]