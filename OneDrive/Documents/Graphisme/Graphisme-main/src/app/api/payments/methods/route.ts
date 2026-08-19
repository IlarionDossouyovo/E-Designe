// Payment Methods API - Graphisme by ELECTRON
// All payment methods for all countries

import { NextRequest, NextResponse } from 'next/server'

interface PaymentMethod {
  id: string
  name: string
  type: 'card' | 'bank' | 'wallet' | 'mobile_money' | 'crypto' | 'cash'
  countries: string[]
  currencies: string[]
  icon: string
  description: string
  enabled: boolean
  fees: number
  processingTime: string
}

const paymentMethods: PaymentMethod[] = [
  // ================ AFRICA ================
  // Benin
  { id: 'mtn-bj', name: 'MTN Mobile Money', type: 'mobile_money', countries: ['BJ', 'CI', 'GH', 'CM', 'SN', 'TG', 'CG', 'CD'], currencies: ['XOF', 'GHS', 'XAF', 'CDF'], icon: '📱', description: 'Paiement mobile MTN', enabled: true, fees: 1.5, processingTime: 'Instantané' },
  { id: 'moov-bj', name: 'Moov Money', type: 'mobile_money', countries: ['BJ', 'TG', 'NE', 'BF', 'CI'], currencies: ['XOF'], icon: '📱', description: 'Paiement mobile Moov', enabled: true, fees: 1.5, processingTime: 'Instantané' },
  { id: 'wave-bj', name: 'Wave', type: 'mobile_money', countries: ['BJ', 'SN', 'ML', 'BF'], currencies: ['XOF'], icon: '🌊', description: 'Paiement mobile Wave', enabled: true, fees: 1.0, processingTime: 'Instantané' },
  { id: 'coris-bj', name: 'Coris Bank', type: 'bank', countries: ['BJ', 'TG', 'BF'], currencies: ['XOF', 'EUR'], icon: '🏦', description: 'Virement bancaire Coris', enabled: true, fees: 0.5, processingTime: '24-48h' },
  
  // Nigeria
  { id: 'paystack-ng', name: 'Paystack', type: 'card', countries: ['NG'], currencies: ['NGN'], icon: '💳', description: 'Cartes Visa/Mastercard', enabled: true, fees: 1.5, processingTime: 'Instantané' },
  { id: 'flutterwave-ng', name: 'Flutterwave', type: 'card', countries: ['NG'], currencies: ['NGN'], icon: '💳', description: 'Cartes Visa/Mastercard', enabled: true, fees: 1.5, processingTime: 'Instantané' },
  { id: 'opay-ng', name: 'Opay', type: 'wallet', countries: ['NG'], currencies: ['NGN'], icon: '📱', description: 'Portefeuille Opay', enabled: true, fees: 1.0, processingTime: 'Instantané' },
  { id: 'palmpay-ng', name: 'PalmPay', type: 'wallet', countries: ['NG'], currencies: ['NGN'], icon: '📱', description: 'Portefeuille PalmPay', enabled: true, fees: 1.0, processingTime: 'Instantané' },
  
  // Kenya
  { id: 'mpesa-ke', name: 'M-Pesa', type: 'mobile_money', countries: ['KE', 'TZ', 'GH', 'CD'], currencies: ['KES', 'TZS', 'GHS', 'CDF'], icon: '📱', description: 'M-Pesa mobile money', enabled: true, fees: 1.5, processingTime: 'Instantané' },
  { id: 'stripe-ke', name: 'Stripe', type: 'card', countries: ['KE'], currencies: ['KES', 'USD'], icon: '💳', description: 'Cartes Visa/Mastercard', enabled: true, fees: 2.9, processingTime: 'Instantané' },
  
  // Ghana
  { id: 'mtn-gh', name: 'MTN Mobile Money', type: 'mobile_money', countries: ['GH'], currencies: ['GHS'], icon: '📱', description: 'MTN Ghana', enabled: true, fees: 1.5, processingTime: 'Instantané' },
  { id: 'vodafone-gh', name: 'Vodafone Cash', type: 'mobile_money', countries: ['GH'], currencies: ['GHS'], icon: '📱', description: 'Vodafone Ghana', enabled: true, fees: 1.5, processingTime: 'Instantané' },
  { id: 'airteltigo-gh', name: 'AirtelTigo Money', type: 'mobile_money', countries: ['GH'], currencies: ['GHS'], icon: '📱', description: 'AirtelTigo Ghana', enabled: true, fees: 1.5, processingTime: 'Instantané' },
  
  // Ivory Coast
  { id: 'mtn-ci', name: 'MTN Mobile Money', type: 'mobile_money', countries: ['CI'], currencies: ['XOF'], icon: '📱', description: 'MTN Côte d\'Ivoire', enabled: true, fees: 1.5, processingTime: 'Instantané' },
  { id: 'orange-ci', name: 'Orange Money', type: 'mobile_money', countries: ['CI', 'SN', 'ML', 'BF', 'GN'], currencies: ['XOF'], icon: '📱', description: 'Orange Côte d\'Ivoire', enabled: true, fees: 1.5, processingTime: 'Instantané' },
  { id: 'moov-ci', name: 'Moov Money', type: 'mobile_money', countries: ['CI'], currencies: ['XOF'], icon: '📱', description: 'Moov Côte d\'Ivoire', enabled: true, fees: 1.5, processingTime: 'Instantané' },
  
  // Senegal
  { id: 'orange-sn', name: 'Orange Money', type: 'mobile_money', countries: ['SN'], currencies: ['XOF'], icon: '📱', description: 'Orange Sénégal', enabled: true, fees: 1.5, processingTime: 'Instantané' },
  { id: 'free-sn', name: 'Free Money', type: 'mobile_money', countries: ['SN'], currencies: ['XOF'], icon: '📱', description: 'Free Sénégal', enabled: true, fees: 1.5, processingTime: 'Instantané' },
  { id: 'wave-sn', name: 'Wave', type: 'mobile_money', countries: ['SN'], currencies: ['XOF'], icon: '🌊', description: 'Wave Sénégal', enabled: true, fees: 1.0, processingTime: 'Instantané' },

  // Cameroon
  { id: 'mtn-cm', name: 'MTN Mobile Money', type: 'mobile_money', countries: ['CM'], currencies: ['XAF'], icon: '📱', description: 'MTN Cameroun', enabled: true, fees: 1.5, processingTime: 'Instantané' },
  { id: 'orange-cm', name: 'Orange Money', type: 'mobile_money', countries: ['CM'], currencies: ['XAF'], icon: '📱', description: 'Orange Cameroun', enabled: true, fees: 1.5, processingTime: 'Instantané' },
  { id: 'visa-cm', name: 'Visa', type: 'card', countries: ['CM'], currencies: ['XAF', 'EUR', 'USD'], icon: '💳', description: 'Carte Visa', enabled: true, fees: 2.9, processingTime: 'Instantané' },

  // DR Congo
  { id: 'mtn-cd', name: 'MTN Mobile Money', type: 'mobile_money', countries: ['CD'], currencies: ['CDF'], icon: '📱', description: 'MTN RDC', enabled: true, fees: 1.5, processingTime: 'Instantané' },
  { id: 'airtel-cd', name: 'Airtel Money', type: 'mobile_money', countries: ['CD', 'RW', 'KE', 'TZ', 'UG'], currencies: ['CDF', 'RWF', 'KES', 'TZS', 'UGX'], icon: '📱', description: 'Airtel Money', enabled: true, fees: 1.5, processingTime: 'Instantané' },

  // ================ INTERNATIONAL ================
  // Global Cards
  { id: 'visa', name: 'Visa', type: 'card', countries: ['WORLD'], currencies: ['USD', 'EUR', 'GBP', 'XOF', 'GHS', 'NGN', 'KES', 'XAF'], icon: '💳', description: 'Carte Visa internationale', enabled: true, fees: 2.9, processingTime: 'Instantané' },
  { id: 'mastercard', name: 'Mastercard', type: 'card', countries: ['WORLD'], currencies: ['USD', 'EUR', 'GBP', 'XOF', 'GHS', 'NGN', 'KES', 'XAF'], icon: '💳', description: 'Carte Mastercard', enabled: true, fees: 2.9, processingTime: 'Instantané' },
  { id: 'amex', name: 'American Express', type: 'card', countries: ['WORLD'], currencies: ['USD', 'EUR'], icon: '💳', description: 'Carte American Express', enabled: true, fees: 3.5, processingTime: 'Instantané' },
  
  // PayPal
  { id: 'paypal', name: 'PayPal', type: 'wallet', countries: ['WORLD'], currencies: ['USD', 'EUR', 'GBP'], icon: '🅿️', description: 'Compte PayPal', enabled: true, fees: 3.5, processingTime: 'Instantané' },
  
  // Crypto
  { id: 'bitcoin', name: 'Bitcoin', type: 'crypto', countries: ['WORLD'], currencies: ['USD', 'EUR', 'BTC'], icon: '₿', description: 'Bitcoin', enabled: true, fees: 1.0, processingTime: '10-30 min' },
  { id: 'ethereum', name: 'Ethereum', type: 'crypto', countries: ['WORLD'], currencies: ['USD', 'EUR', 'ETH'], icon: 'Ξ', description: 'Ethereum', enabled: true, fees: 1.0, processingTime: '10-30 min' },
  { id: 'usdt', name: 'USDT', type: 'crypto', countries: ['WORLD'], currencies: ['USD', 'EUR', 'USDT'], icon: '₮', description: 'Tether (USDT)', enabled: true, fees: 1.0, processingTime: '10-30 min' },
  
  // Bank Transfer
  { id: 'swift', name: 'SWIFT Transfer', type: 'bank', countries: ['WORLD'], currencies: ['USD', 'EUR', 'GBP'], icon: '🏦', description: 'Virement SWIFT international', enabled: true, fees: 0.5, processingTime: '2-5 jours' },
  { id: 'sepa', name: 'SEPA Transfer', type: 'bank', countries: ['EU'], currencies: ['EUR'], icon: '🏦', description: 'Virement SEPA Europe', enabled: true, fees: 0, processingTime: '24-48h' },
  
  // Mobile Money Other
  { id: 'airtel-money', name: 'Airtel Money', type: 'mobile_money', countries: ['KE', 'TZ', 'UG', 'RW', 'CD', 'ZM', 'MW', 'NP'], currencies: ['KES', 'TZS', 'UGX', 'RWF', 'CDF', 'ZMW', 'MWK', 'NPR'], icon: '📱', description: 'Airtel Money', enabled: true, fees: 1.5, processingTime: 'Instantané' },
  { id: 'zambia-money', name: 'Zamtel', type: 'mobile_money', countries: ['ZM'], currencies: ['ZMW'], icon: '📱', description: 'Zamtel Kwacha', enabled: true, fees: 1.5, processingTime: 'Instantané' },
]

const countries = [
  { code: 'BJ', name: 'Benin', flag: '🇧🇯', currency: 'XOF', symbol: 'CFA' },
  { code: 'NG', name: 'Nigeria', flag: '🇳🇬', currency: 'NGN', symbol: '₦' },
  { code: 'GH', name: 'Ghana', flag: '🇬🇭', currency: 'GHS', symbol: '₵' },
  { code: 'KE', name: 'Kenya', flag: '🇰🇪', currency: 'KES', symbol: 'KSh' },
  { code: 'CI', name: "Côte d'Ivoire", flag: '🇨🇮', currency: 'XOF', symbol: 'CFA' },
  { code: 'SN', name: 'Sénégal', flag: '🇸🇳', currency: 'XOF', symbol: 'CFA' },
  { code: 'CM', name: 'Cameroun', flag: '🇨🇲', currency: 'XAF', symbol: 'FCFA' },
  { code: 'CD', name: 'RDC', flag: '🇨🇩', currency: 'CDF', symbol: 'FC' },
  { code: 'TG', name: 'Togo', flag: '🇹🇬', currency: 'XOF', symbol: 'CFA' },
  { code: 'BF', name: 'Burkina Faso', flag: '🇧🇫', currency: 'XOF', symbol: 'CFA' },
  { code: 'ML', name: 'Mali', flag: '🇲🇱', currency: 'XOF', symbol: 'CFA' },
  { code: 'NE', name: 'Niger', flag: '🇳🇪', currency: 'XOF', symbol: 'CFA' },
  { code: 'RW', name: 'Rwanda', flag: '🇷🇼', currency: 'RWF', symbol: 'FRw' },
  { code: 'TZ', name: 'Tanzanie', flag: '🇹🇿', currency: 'TZS', symbol: 'TSh' },
  { code: 'UG', name: 'Ouganda', flag: '🇺🇬', currency: 'UGX', symbol: 'USh' },
  { code: 'ZA', name: 'Afrique du Sud', flag: '🇿🇦', currency: 'ZAR', symbol: 'R' },
  { code: 'ZM', name: 'Zambie', flag: '🇿🇲', currency: 'ZMW', symbol: 'ZK' },
  { code: 'MA', name: 'Maroc', flag: '🇲🇦', currency: 'MAD', symbol: 'د.م.' },
  { code: 'EG', name: 'Égypte', flag: '🇪🇬', currency: 'EGP', symbol: 'E£' },
  { code: 'FR', name: 'France', flag: '🇫🇷', currency: 'EUR', symbol: '€' },
  { code: 'US', name: 'États-Unis', flag: '🇺🇸', currency: 'USD', symbol: '$' },
  { code: 'GB', name: 'Royaume-Uni', flag: '🇬🇧', currency: 'GBP', symbol: '£' },
  { code: 'EU', name: 'Union Européenne', flag: '🇪🇺', currency: 'EUR', symbol: '€' },
  { code: 'WORLD', name: 'Mondial', flag: '🌍', currency: 'USD', symbol: '$' },
]

// GET - Get payment methods
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const country = searchParams.get('country')
  const currency = searchParams.get('currency')
  const type = searchParams.get('type')

  let methods = [...paymentMethods]

  if (country) {
    methods = methods.filter(m => 
      m.countries.includes(country) || m.countries.includes('WORLD')
    )
  }

  if (currency) {
    methods = methods.filter(m => m.currencies.includes(currency))
  }

  if (type) {
    methods = methods.filter(m => m.type === type)
  }

  const responseMethods = methods.map(m => ({
    ...m,
    countries: m.countries.includes('WORLD') 
      ? ['Tous les pays'] 
      : m.countries.map(c => countries.find(ct => ct.code === c)?.name || c)
  }))

  return NextResponse.json({
    methods: responseMethods,
    countries,
    stats: {
      total: paymentMethods.length,
      byType: {
        mobile_money: paymentMethods.filter(m => m.type === 'mobile_money').length,
        card: paymentMethods.filter(m => m.type === 'card').length,
        bank: paymentMethods.filter(m => m.type === 'bank').length,
        crypto: paymentMethods.filter(m => m.type === 'crypto').length,
        wallet: paymentMethods.filter(m => m.type === 'wallet').length,
      }
    }
  })
}

// POST - Get methods for specific country
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { country, currency } = body

    let methods = paymentMethods.filter(m => 
      m.countries.includes(country) || m.countries.includes('WORLD')
    )

    if (currency) {
      methods = methods.filter(m => m.currencies.includes(currency))
    }

    const countryInfo = countries.find(c => c.code === country)

    return NextResponse.json({
      country: countryInfo,
      methods: methods.map(m => ({
        ...m,
        countries: m.countries.includes('WORLD') 
          ? ['Tous les pays'] 
          : m.countries.map(c => countries.find(ct => ct.code === c)?.name || c)
      }))
    })

  } catch (error) {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
