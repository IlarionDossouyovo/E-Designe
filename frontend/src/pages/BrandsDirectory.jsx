import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

// ============== MARQUES PAR PAYS ET CATÉGORIE ==============
const brandDirectory = {
  // ===== FRANCE =====
  'France': {
    flag: '🇫🇷',
    currency: 'EUR',
   lang: 'Français',
    marcas: [
      // Mode Femmes
      { name: 'Chanel', category: 'Luxe', products: 'Vêtements, Sacs, Parfums', website: 'chanel.com', tier: 'Premium', year: 1910 },
      { name: 'Louis Vuitton', category: 'Luxe', products: 'Sacs, Vêtements, Accessoires', website: 'louisvuitton.com', tier: 'Premium', year: 1854 },
      { name: 'Dior', category: 'Luxe', products: 'Vêtements, Parfums, Sacs', website: 'dior.com', tier: 'Premium', year: 1946 },
      { name: 'Sézane', category: 'Prêt-à-porter', products: 'Vêtements féminins', website: 'sezane.com', tier: 'Mid-range', year: 2013 },
      { name: 'Ba&sh', category: 'Prêt-à-porter', products: 'Vêtements féminins', website: 'ba-sh.com', tier: 'Mid-range', year: 2000 },
      { name: 'The Kooples', category: 'Luxe accessible', products: 'Vêtements rock chic', website: 'thekooples.com', tier: 'Mid-range', year: 2008 },
      { name: 'Longchamp', category: 'Maroquinerie', products: 'Sacs, Accessoires', website: 'longchamp.com', tier: 'Premium', year: 1948 },
      { name: 'Lancôme', category: 'Cosmétiques', products: 'Parfums, Maquillage', website: 'lancome.com', tier: 'Premium', year: 1935 },
      { name: 'YSL Beauté', category: 'Cosmétiques', products: 'Parfums, Maquillage', website: 'yslbeauty.com', tier: 'Premium', year: 1961 },
      // Mode Hommes
      { name: 'Lacoste', category: 'Sportwear', products: 'Polos, T-shirts, Vêtements', website: 'lacoste.com', tier: 'Mid-range', year: 1933 },
      { name: 'Berluti', category: 'Luxe', products: 'Chaussures, Maroquinerie', website: 'berluti.com', tier: 'Premium', year: 1895 },
      // Enfants
      { name: 'Jacadi', category: 'Enfants', products: 'Vêtements noblesse', website: 'jacadi.com', tier: 'Premium', year: 1976 },
      { name: 'Catimini', category: 'Enfants', products: 'Vêtements colorés', website: 'catimini.com', tier: 'Mid-range', year: 1978 },
      { name: 'Okaïdi', category: 'Enfants', products: 'Vêtements enfants', website: 'okaidi.com', tier: 'Budget', year: 1992 },
      // Cosmétiques
      { name: "L'Oréal Paris", category: 'Cosmétiques', products: 'Cosmétiques grand public', website: 'loreal-paris.fr', tier: 'Budget', year: 1909 },
      { name: 'Vichy', category: 'Dermocosmétiques', products: 'Soins dermatologiques', website: 'vichy.fr', tier: 'Mid-range', year: 1931 },
      { name: 'La Roche-Posay', category: 'Dermocosmétiques', products: 'Soins sensibles', website: 'laroche-posay.fr', tier: 'Mid-range', year: 1992 },
      { name: 'Nuxe', category: 'Cosmétiques bio', products: 'Soins naturels', website: 'nuxe.com', tier: 'Mid-range', year: 1989 },
      { name: 'Bioderma', category: 'Dermocosmétiques', products: 'Soins dermatologiques', website: 'bioderma.com', tier: 'Mid-range', year: 1985 },
      { name: 'Caudalie', category: 'Cosmétiques', products: 'Soins vigne', website: 'caudalie.com', tier: 'Mid-range', year: 1995 },
      { name: 'Clarins', category: 'Cosmétiques', products: 'Soins et maquillage', website: 'clarins.com', tier: 'Premium', year: 1954 }
    ]
  },
  
  // ===== ITALIE =====
  'Italie': {
    flag: '🇮🇹',
    currency: 'EUR',
    lang: 'Italien',
    marcas: [
      { name: 'Gucci', category: 'Luxe', products: 'Sacs, Vêtements, Chaussures', website: 'gucci.com', tier: 'Premium', year: 1921 },
      { name: 'Prada', category: 'Luxe', products: 'Sacs, Vêtements, Chaussures', website: 'prada.com', tier: 'Premium', year: 1913 },
      { name: 'Armani', category: 'Luxe', products: 'Costumes, Vêtements, Accessoires', website: 'armani.com', tier: 'Premium', year: 1975 },
      { name: 'Versace', category: 'Luxe', products: 'Vêtements, Accessoires', website: 'versace.com', tier: 'Premium', year: 1978 },
      { name: 'Dolce & Gabbana', category: 'Luxe', products: 'Vêtements, Accessoires', website: 'doleegabbana.com', tier: 'Premium', year: 1985 },
      { name: 'Fendi', category: 'Luxe', products: 'Sacs, Vêtements', website: 'fendi.com', tier: 'Premium', year: 1925 },
      { name: 'Valentino', category: 'Luxe', products: 'Vêtements, Chaussures', website: 'valentino.com', tier: 'Premium', year: 1960 },
      { name: 'Bottega Veneta', category: 'Luxe', products: 'Sacs, Maroquinerie', website: 'bottegaveneta.com', tier: 'Premium', year: 1966 },
      { name: 'Benetton', category: 'Prêt-à-porter', products: 'Vêtements colorés', website: 'benetton.com', tier: 'Budget', year: 1965 },
      { name: 'Michele', category: 'Cosmétiques', products: 'Soins capillaires', website: 'michele.it', tier: 'Mid-range', year: 2000 }
    ]
  },
  
  // ===== ÉTATS-UNIS =====
  'USA': {
    flag: '🇺🇸',
    currency: 'USD',
    lang: 'Anglais',
    marcas: [
      { name: 'Ralph Lauren', category: 'Luxe accessible', products: 'Chemises, Manteaux, Accessoires', website: 'ralphlauren.com', tier: 'Mid-range', year: 1967 },
      { name: 'Tommy Hilfiger', category: 'Streetwear', products: 'Vêtements, Montres, Accessoires', website: 'tommy.com', tier: 'Mid-range', year: 1985 },
      { name: 'Calvin Klein', category: 'Luxe accessible', products: 'Sous-vêtements, Jeans, Parfums', website: 'calvinklein.com', tier: 'Mid-range', year: 1968 },
      { name: "Levi's", category: 'Denim', products: 'Jeans, Vêtements décontractés', website: 'levis.com', tier: 'Budget', year: 1853 },
      { name: 'Nike', category: 'Sport', products: 'Vêtements sport, Chaussures', website: 'nike.com', tier: 'Mid-range', year: 1964 },
      { name: 'GAP', category: 'Prêt-à-porter', products: 'Vêtements, Accessoires', website: 'gap.com', tier: 'Budget', year: 1969 },
      { name: 'Brooks Brothers', category: 'Luxe', products: 'Costumes, Chemises', website: 'brooksbrothers.com', tier: 'Premium', year: 1818 },
      { name: 'Michael Kors', category: 'Luxe accessible', products: 'Sacs, Vêtements', website: 'michaelkors.com', tier: 'Mid-range', year: 1981 },
      { name: 'Coach', category: 'Luxe accessible', products: 'Sacs, Accessoires', website: 'coach.com', tier: 'Mid-range', year: 1941 },
      { name: 'Kate Spade', category: 'Luxe accessible', products: 'Sacs, Accessoires', website: 'katespade.com', tier: 'Mid-range', year: 1993 },
      { name: 'Estée Lauder', category: 'Cosmétiques', products: 'Parfums, Maquillage', website: 'esteelauder.com', tier: 'Premium', year: 1946 },
      { name: 'Clinique', category: 'Cosmétiques', products: 'Cosmétiques dermatologiques', website: 'clinique.com', tier: 'Mid-range', year: 1968 },
      { name: 'MAC Cosmetics', category: 'Cosmétiques', products: 'Maquillage professionnel', website: 'maccosmetics.com', tier: 'Mid-range', year: 1984 }
    ]
  },
  
  // ===== ALLEMAGNE =====
  'Allemagne': {
    flag: '🇩🇪',
    currency: 'EUR',
    lang: 'Allemand',
    marcas: [
      { name: 'Hugo Boss', category: 'Luxe', products: 'Costumes, Chemises, Chaussures', website: 'hugoboss.com', tier: 'Premium', year: 1924 },
      { name: 'Adidas', category: 'Sport', products: 'Vêtements sport, Chaussures', website: 'adidas.com', tier: 'Mid-range', year: 1949 },
      { name: 'Puma', category: 'Sport', products: 'Vêtements sport, Chaussures', website: 'puma.com', tier: 'Mid-range', year: 1948 },
      { name: 'MCM', category: 'Luxe', products: 'Sacs, Maroquinerie', website: 'mcmworldwide.com', tier: 'Premium', year: 1976 },
      { name: 'Rimowa', category: 'Luxe', products: 'Valises', website: 'rimowa.com', tier: 'Premium', year: 1898 },
      { name: 'BOSS', category: 'Luxe', products: 'Costumes, Vêtements', website: 'hugoboss.com', tier: 'Premium', year: 1924 }
    ]
  },
  
  // ===== ROYAUME-UNI =====
  'Royaume-Uni': {
    flag: '🇬🇧',
    currency: 'GBP',
    lang: 'Anglais',
    marcas: [
      { name: 'Burberry', category: 'Luxe', products: 'Vêtements, Sacs, Parfums', website: 'burberry.com', tier: 'Premium', year: 1856 },
      { name: 'Alexander McQueen', category: 'Luxe', products: 'Vêtements, Chaussures', website: 'alexandermcqueen.com', tier: 'Premium', year: 1992 },
      { name: 'The Body Shop', category: 'Cosmétiques', products: 'Cosmétiques éthiques', website: 'thebodyshop.com', tier: 'Budget', year: 1976 },
      { name: 'Lush', category: 'Cosmétiques', products: 'Cosmétiques frais', website: 'lush.com', tier: 'Budget', year: 1994 },
      { name: 'Jack & Jones', category: 'Streetwear', products: 'Vêtements hommes', website: 'jackjones.com', tier: 'Budget', year: 1990 },
      { name: 'Topshop', category: 'Fast fashion', products: 'Vêtements tendances', website: 'topshop.com', tier: 'Budget', year: 1964 }
    ]
  },
  
  // ===== ESPAGNE =====
  'Espagne': {
    flag: '🇪🇸',
    currency: 'EUR',
    lang: 'Espagnol',
    marcas: [
      { name: 'Zara', category: 'Fast fashion', products: 'Vêtements tendances', website: 'zara.com', tier: 'Budget', year: 1975 },
      { name: 'Massimo Dutti', category: 'Prêt-à-porter', products: 'Vêtements élégant', website: 'massimodutti.com', tier: 'Mid-range', year: 1993 },
      { name: 'Mango', category: 'Prêt-à-porter', products: 'Vêtements féminins', website: 'mango.com', tier: 'Mid-range', year: 1984 },
      { name: 'Camper', category: 'Chaussures', products: 'Chaussures', website: 'camper.com', tier: 'Mid-range', year: 1975 },
      { name: 'Loewe', category: 'Luxe', products: 'Sacs, Vêtements', website: 'loewe.com', tier: 'Premium', year: 1846 },
      { name: 'Paloma Picasso', category: 'Bijoux', products: 'Bijoux', website: 'palomapicasso.com', tier: 'Premium', year: 1989 }
    ]
  },
  
  // ===== SUÈDE =====
  'Suède': {
    flag: '🇸🇪',
    currency: 'SEK',
    lang: 'Suédois',
    marcas: [
      { name: 'H&M', category: 'Fast fashion', products: 'Vêtements, Accessoires', website: 'hm.com', tier: 'Budget', year: 1947 },
      { name: 'Acne Studios', category: 'Luxe accessible', products: 'Vêtements, Accessoires', website: 'acnestudios.com', tier: 'Mid-range', year: 1996 },
      { name: 'GANT', category: 'Prêt-à-porter', products: 'Vêtements classiques', website: 'gant.com', tier: 'Mid-range', year: 1949 },
      { name: 'COS', category: 'Minimaliste', products: 'Vêtements minimalistes', website: 'cos.com', tier: 'Mid-range', year: 2007 }
    ]
  },
  
  // ===== JAPON =====
  'Japon': {
    flag: '🇯🇵',
    currency: 'JPY',
    lang: 'Japonais',
    marcas: [
      { name: 'Uniqlo', category: 'Fast fashion', products: 'Vêtements essentiels', website: 'uniqlo.com', tier: 'Budget', year: 1949 },
      { name: 'Shiseido', category: 'Cosmétiques', products: 'Cosmétiques asiatiques', website: 'shiseido.com', tier: 'Premium', year: 1872 },
      { name: 'SK-II', category: 'Cosmétiques', products: 'Soins premium', website: 'skp2.com', tier: 'Premium', year: 1980 },
      { name: 'Issey Miyake', category: 'Luxe', products: 'Vêtements, Accessoires', website: 'isseymiyake.com', tier: 'Premium', year: 1970 },
      { name: 'Comme des Garçons', category: 'Luxe', products: 'Vêtements', website: 'cdgplay.com', tier: 'Premium', year: 1969 },
      { name: 'Muji', category: 'Lifestyle', products: 'Vêtements, Accessoires', website: 'muji.com', tier: 'Budget', year: 1980 }
    ]
  },
  
  // ===== CHINE =====
  'Chine': {
    flag: '🇨🇳',
    currency: 'CNY',
    lang: 'Chinois',
    marcas: [
      { name: 'Li-Ning', category: 'Sport', products: 'Vêtements sport', website: 'li-ning.com', tier: 'Budget', year: 1990 },
      { name: 'Anta', category: 'Sport', products: 'Vêtements sport', website: 'anta.com', tier: 'Budget', year: 1991 },
      { name: 'Peak', category: 'Sport', products: 'Vêtements sport', website: 'peak.com.cn', tier: 'Budget', year: 1989 },
      { name: 'Peacebird', category: 'Fast fashion', products: 'Vêtements tendances', website: 'peacebird.com', tier: 'Budget', year: 1995 },
      { name: 'Moomoo', category: 'Enfants', products: 'Vêtements enfants', website: 'moomoo.com', tier: 'Budget', year: 2009 }
    ]
  },
  
  // ===== CORÉE DU SUD =====
  'Corée du Sud': {
    flag: '🇰🇷',
    currency: 'KRW',
    lang: 'Coréen',
    marcas: [
      { name: 'Innisfree', category: 'Cosmétiques', products: 'Cosmétiques naturels', website: 'innisfree.com', tier: 'Mid-range', year: 2000 },
      { name: 'Etude House', category: 'Cosmétiques', products: 'Maquillage', website: 'etudehouse.com', tier: 'Budget', year: 1956 },
      { name: 'Laneige', category: 'Cosmétiques', products: 'Soins губ', website: 'laneige.com', tier: 'Mid-range', year: 1994 },
      { name: 'Sulwhasoo', category: 'Cosmétiques', products: 'Soins traditionnels', website: 'sulwhasoo.com', tier: 'Premium', year: 1997 },
      { name: 'Amorepacific', category: 'Cosmétiques', products: 'Cosmétiques集团', website: 'amorepacific.com', tier: 'Premium', year: 1945 }
    ]
  },
  
  // ===== BRÉSIL =====
  'Brésil': {
    flag: '🇧🇷',
    currency: 'BRL',
    lang: 'Portugais',
    marcas: [
      { name: 'C&A', category: 'Fast fashion', products: 'Vêtements', website: 'cea.com', tier: 'Budget', year: 1841 },
      { name: 'Loiacono', category: 'Prêt-à-porter', products: 'Vêtements hommes', website: 'loiacono.com', tier: 'Mid-range', year: 2013 },
      { name: 'Riachuelo', category: 'Fast fashion', products: 'Vêtements, Accessoires', website: 'riachuelo.com.br', tier: 'Budget', year: 1947 }
    ]
  },
  
  // ===== INDE =====
  'Inde': {
    flag: '🇮🇳',
    currency: 'INR',
    lang: 'Hindi',
    marcas: [
      { name: 'Raymond', category: 'Textiles', products: 'Tissus, Vêtements', website: 'raymond.com', tier: 'Mid-range', year: 1925 },
      { name: 'Arvind', category: 'Textiles', products: 'Tissus', website: 'arvind.com', tier: 'Mid-range', year: 1931 },
      { name: 'W', category: 'Prêt-à-porter', products: 'Vêtements femmes', website: 'wonline.in', tier: 'Budget', year: 2001 },
      { name: 'Allen Solly', category: 'Prêt-à-porter', products: 'Vêtements hommes', website: 'allensolly.com', tier: 'Mid-range', year: 1993 },
      { name: 'Van Heusen', category: 'Prêt-à-porter', products: 'Vêtements hommes', website: 'vanheusen.com', tier: 'Mid-range', year: 1889 }
    ]
  },
  
  // ===== AFRIQUE DU SUD =====
  'Afrique du Sud': {
    flag: '🇿🇦',
    currency: 'ZAR',
    lang: 'Anglais/Afrikaans',
    marcas: [
      { name: 'Truworths', category: 'Prêt-à-porter', products: 'Vêtements', website: 'truworths.co.za', tier: 'Mid-range', year: 1917 },
      { name: 'Markham', category: 'Prêt-à-porter', products: 'Vêtements hommes', website: 'markham.co.za', tier: 'Budget', year: 1984 },
      { name: 'Yde', category: 'Mode jeunes', products: 'Vêtements tendances', website: 'yde.co.za', tier: 'Budget', year: 1994 },
      { name: 'Exact', category: 'Prêt-à-porter', products: 'Vêtements femmes', website: 'exact.org.za', tier: 'Budget', year: 1990 }
    ]
  },
  
  // ===== NIGÉRIA =====
  'Nigéria': {
    flag: '🇳🇬',
    currency: 'NGN',
    lang: 'Anglais',
    marcas: [
      { name: 'Orange Culture', category: 'Mode traditionnelle', products: 'Vêtements traditionnels', website: 'orangecultureng.com', tier: 'Mid-range', year: 2015 },
      { name: 'Viola', category: 'Mode traditionnelle', products: 'Tissus wax', website: 'violangi.com', tier: 'Mid-range', year: 2013 },
      { name: 'Bodice', category: 'Mode femmes', products: 'Vêtements femmes', website: 'bodiceng.com', tier: 'Mid-range', year: 2017 },
      { name: 'Maxivel', category: 'Mode hommes', products: 'Vêtements hommes', website: 'maxivel.com.ng', tier: 'Mid-range', year: 2016 }
    ]
  },
  
  // ===== SÉNÉGAL =====
  'Sénégal': {
    flag: '🇸🇳',
    currency: 'XOF',
    lang: 'Français',
    marcas: [
      { name: 'Lô', category: 'Mode traditionnelle', products: 'Tissus traditionnels', website: 'lo-fashion.sn', tier: 'Budget', year: 2018 },
      { name: 'Sunut', category: 'Mode traditionnelle', products: 'Tissus et vêtements', website: 'sunut.sn', tier: 'Budget', year: 2016 },
      { name: 'Khar Yoff', category: 'Mode traditionnelle', products: 'Tissus wax', website: 'kharyoff.com', tier: 'Budget', year: 2019 }
    ]
  },
  
  // ===== CÔTE D'IVOIRE =====
  "Côte d'Ivoire": {
    flag: '🇨🇮',
    currency: 'XOF',
    lang: 'Français',
    marcas: [
      { name: 'Victory', category: 'Mode traditionnelle', products: 'Tissus wax', website: 'victoryci.com', tier: 'Budget', year: 2018 },
      { name: 'Le Kannel', category: 'Mode traditionnelle', products: 'Vêtements traditionnels', website: 'lekannel.com', tier: 'Mid-range', year: 2017 },
      { name: 'Grain Ble', category: 'Mode traditionnelle', products: 'Tissus', website: 'grainble.ci', tier: 'Budget', year: 2019 }
    ]
  }
}

// ============== FOURNISSEURS PAR PAYS ==============
const suppliersByCountry = {
  'France': [
    { city: 'Paris', type: 'Grossiste textile', products: 'Tissus, Fils', suppliers: ['France Textile', 'Tissus du Rhône', 'La Maison des Tissus'] },
    { city: 'Lyon', type: 'Soieries', products: 'Soie, Velours', suppliers: ['La Soierie Lyonnaise', 'Les公开ries de Lyon'] },
    { city: 'Mulhouse', type: 'Coton', products: 'CotonBio, Tissus', suppliers: ['Mulhouse Cotton Co'] },
    { city: 'Roubaix', type: 'Laine', products: 'Laine, Lainage', suppliers: ['Roubaix Wool'] }
  ],
  'Italie': [
    { city: 'Milan', type: 'Cuir', products: 'Cuir, Maroquinerie', suppliers: ['Mario Cuir Milano', 'Conceria Tuscany'] },
    { city: 'Prato', type: 'Textiles', products: 'Tissus, Lainages', suppliers: ['Prato Tessile', 'Italian Wool'] },
    { city: 'Biella', type: 'Laine premium', products: 'Laine fine', suppliers: ['Biella Yarn'] }
  ],
  'Portugal': [
    { city: 'Porto', type: 'Manufacture', products: 'Vêtements, Chaussures', suppliers: ['Porto Manufacturing', 'North Coast'] },
    { city: 'Guimarães', type: ' textile', products: 'Tissus techniques', suppliers: ['Texeira Guimarães'] }
  ],
  'Turquie': [
    { city: 'Istanbul', type: 'Fabricant', products: 'Vêtements, Tissus', suppliers: ['Istanbul Textile', 'Turkish Cotton'] },
    { city: 'Gaziantep', type: ' textile', products: 'Coton, Lainage', suppliers: ['Gaziantep Fabrics'] }
  ],
  'Chine': [
    { city: 'Shenzhen', type: 'Manufacturer', products: 'Vêtements, Accessoires', suppliers: ['Shenzhen Garments', 'China Source'] },
    { city: 'Guangzhou', type: ' textile', products: 'Soie, Coton', suppliers: ['Guangzhou Textile'] },
    { city: 'Shanghai', type: 'Trading', products: 'Tissus, Fils', suppliers: ['Shanghai Trade Co'] }
  ],
  'Bangladesj': [
    { city: 'Dhaka', type: 'Manufacturer', products: 'Vêtements bon marché', suppliers: ['Bangladesh Garments', 'DHL Textile'] },
    { city: 'Chittagong', type: 'Export', products: 'Vêtements, Tissus', suppliers: ['Chittagong Export'] }
  ],
  'Vietnam': [
    { city: 'Hô Chi Minh', type: 'Manufacturer', products: 'Vêtements, Chaussures', suppliers: ['Vietnam Garments', 'Saigon Textile'] },
    { city: 'Hanoï', type: 'Textiles', products: 'Tissus', suppliers: ['Hanoi Fabrics'] }
  ],
  'Inde': [
    { city: 'Mumbai', type: 'Textiles', products: 'Coton, Soie', suppliers: ['Mumbai Textile', 'India Cotton'] },
    { city: 'Surat', type: 'Silk', products: 'Soie, Sari', suppliers: ['Surat Silk House'] },
    { city: 'Delhi', type: 'Trading', products: 'Tissus divers', suppliers: ['Delhi Fabrics'] }
  ],
  'Égypte': [
    { city: 'Le Caire', type: 'Cotton', products: 'CotonEgyptien', suppliers: ['Egypt Cotton Co'] },
    { city: 'Alexandrie', type: 'Textiles', products: 'Tissus', suppliers: ['Alexandria Textile'] }
  ],
  'Maroc': [
    { city: 'Casablanca', type: 'Manufacturer', products: 'Vêtements, Tissus', suppliers: ['Casablanca Garments'] },
    { city: 'Fès', type: 'Artisanat', products: 'Tissus traditionnels', suppliers: ['Fes Artisan textile'] }
  ],
  'Tunisie': [
    { city: 'Tunis', type: 'Manufacturer', products: 'Vêtements', suppliers: ['Tunis Textile'] },
    { city: 'Sfax', type: ' textile', products: 'Coton, Tissus', suppliers: ['Sfax Cotton'] }
  ],
  'Nigéria': [
    { city: 'Lagos', type: 'Trading', products: 'Tissus wax, Vêtements', suppliers: ['Lagos Textiles', 'Nigerian Fabrics'] },
    { city: 'Kano', type: 'Textile', products: 'Cotonnade', suppliers: ['Kano Cotton'] }
  ],
  'Kenya': [
    { city: 'Nairobi', type: 'Manufacturer', products: 'Vêtements, Tissus', suppliers: ['Nairobi Garments', 'Kenya Textiles'] },
    { city: 'Mombasa', type: 'Export', products: 'Tissus', suppliers: ['Mombasa Exports'] }
  ],
  'Afrique du Sud': [
    { city: 'Johannesburg', type: 'Trading', products: 'Vêtements, Tissus', suppliers: ['JHB Textiles', 'South African Fabrics'] },
    { city: 'Durban', type: 'Manufacturer', products: 'Vêtements', suppliers: ['Durban Garments'] }
  ]
}

// ============== COMPOSANT PRINCIPAL ==============
export default function BrandsDirectory() {
  const [selectedCountry, setSelectedCountry] = useState('France')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  const countries = Object.keys(brandDirectory)
  const allBrands = selectedCountry === 'all' 
    ? Object.entries(brandDirectory).flatMap(([country, data]) => data.marcas.map(b => ({...b, country, countryFlag: brandDirectory[country].flag})))
    : brandDirectory[selectedCountry]?.marcas.map(b => ({...b, country: selectedCountry, countryFlag: brandDirectory[selectedCountry].flag})) || []

  const filteredBrands = allBrands.filter(brand => {
    const matchesCategory = selectedCategory === 'all' || brand.category.toLowerCase().includes(selectedCategory.toLowerCase())
    const matchesSearch = brand.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                     brand.products.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const categories = [...new Set(allBrands.map(b => b.category))]

  return (
    <div style={{ background: '#0a0a0f', minHeight: '100vh', padding: '2rem 0' }}>
      <div className="container" style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 20px' }}>
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ textAlign: 'center', marginBottom: '3rem' }}
        >
          <span style={{ color: '#4B6CB7', fontWeight: 600, letterSpacing: '3px', textTransform: 'uppercase' }}>
            Annuaire Worldwide
          </span>
          <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', color: '#fff', marginBottom: '1rem', marginTop: '0.5rem' }}>
            Marques & Fournisseurs 🌎
          </h1>
          <p style={{ color: '#718096', maxWidth: '600px', margin: '0 auto', fontSize: '18px' }}>
            Decouvrez toutes les marques de mode connectees a nos fournisseurs a travers le monde
          </p>
        </motion.div>

        {/* Filtres */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          style={{ 
            display: 'flex', 
            gap: '1rem', 
            marginBottom: '2rem',
            flexWrap: 'wrap',
            justifyContent: 'center'
          }}
        >
          <input
            type="text"
            placeholder="Rechercher une marque..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              padding: '12px 20px',
              borderRadius: '12px',
              border: '1px solid #333',
              background: '#16161f',
              color: '#fff',
              width: '100%',
              maxWidth: '300px',
              fontSize: '16px'
            }}
          />
          
          <select
            value={selectedCountry}
            onChange={(e) => setSelectedCountry(e.target.value)}
            style={{
              padding: '12px 20px',
              borderRadius: '12px',
              border: '1px solid #333',
              background: '#16161f',
              color: '#fff',
              fontSize: '16px',
              cursor: 'pointer'
            }}
          >
            <option value="all">Tous les pays</option>
            {countries.map(country => (
              <option key={country} value={country}>
                {brandDirectory[country].flag} {country}
              </option>
            ))}
          </select>

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            style={{
              padding: '12px 20px',
              borderRadius: '12px',
              border: '1px solid #333',
              background: '#16161f',
              color: '#fff',
              fontSize: '16px',
              cursor: 'pointer'
            }}
          >
            <option value="all">Toutes categories</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </motion.div>

        {/* Statistics */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
            gap: '1rem',
            marginBottom: '3rem'
          }}
        >
          <div style={{ background: '#16161f', padding: '1.5rem', borderRadius: '16px', textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', fontWeight: 700, color: '#4B6CB7' }}>{countries.length}</div>
            <div style={{ color: '#718096' }}>Pays couverts</div>
          </div>
          <div style={{ background: '#16161f', padding: '1.5rem', borderRadius: '16px', textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', fontWeight: 700, color: '#00D9A5' }}>
              {Object.values(brandDirectory).reduce((sum, d) => sum + d.marcas.length, 0)}
            </div>
            <div style={{ color: '#718096' }}>Marques</div>
          </div>
          <div style={{ background: '#16161f', padding: '1.5rem', borderRadius: '16px', textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', fontWeight: 700, color: '#E94560' }}>{categories.length}</div>
            <div style={{ color: '#718096' }}>Categories</div>
          </div>
          <div style={{ background: '#16161f', padding: '1.5rem', borderRadius: '16px', textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', fontWeight: 700, color: '#FFD700' }}>100%</div>
            <div style={{ color: '#718096' }}>Authentifie</div>
          </div>
        </motion.div>

        {/* Brands Grid */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '1.5rem',
            marginBottom: '4rem'
          }}
        >
          {filteredBrands.slice(0, 20).map((brand, index) => (
            <motion.div
              key={`${brand.name}-${index}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              style={{
                background: '#16161f',
                borderRadius: '16px',
                padding: '1.5rem',
                border: '1px solid #2a2a35',
                transition: 'all 0.3s ease'
              }}
              whileHover={{ transform: 'translateY(-5px)', borderColor: '#4B6CB7' }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                <div>
                  <h3 style={{ color: '#fff', marginBottom: '0.25rem', fontSize: '1.25rem' }}>{brand.name}</h3>
                  <span style={{ color: '#4B6CB7', fontSize: '14px' }}>{brand.category}</span>
                </div>
                <span style={{ fontSize: '1.5rem' }}>{brand.countryFlag}</span>
              </div>
              <p style={{ color: '#718096', fontSize: '14px', marginBottom: '1rem' }}>{brand.products}</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ 
                  color: brand.tier === 'Premium' ? '#FFD700' : brand.tier === 'Mid-range' ? '#00D9A5' : '#718096',
                  fontSize: '14px',
                  fontWeight: 600
                }}>
                  {brand.tier}
                </span>
                <span style={{ color: '#4a4a5a', fontSize: '12px' }}>Depuis {brand.year}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Fournisseurs par Pays */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <h2 style={{ color: '#fff', fontSize: '2rem', marginBottom: '2rem', textAlign: 'center' }}>
            Fournisseurs Regionaux
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.5rem'
          }}>
            {Object.entries(suppliersByCountry).slice(0, 8).map(([country, cities]) => (
              <div key={country} style={{ background: '#16161f', borderRadius: '16px', padding: '1.5rem' }}>
                <h3 style={{ color: '#fff', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  {brandDirectory[country]?.flag || '🏳️'} {country}
                </h3>
                {cities.map((city) => (
                  <div key={city.city} style={{ marginBottom: '1rem', paddingBottom: '1rem', borderBottom: '1px solid #2a2a35' }}>
                    <h4 style={{ color: '#4B6CB7', marginBottom: '0.5rem' }}>{city.city}</h4>
                    <p style={{ color: '#718096', fontSize: '14px' }}>{city.type}</p>
                    <p style={{ color: '#aaa', fontSize: '13px' }}>{city.products}</p>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          style={{
            textAlign: 'center',
            padding: '4rem 2rem',
            marginTop: '4rem',
            background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
            borderRadius: '24px'
          }}
        >
          <h2 style={{ color: '#fff', marginBottom: '1rem' }}>Devenez Fournisseur</h2>
          <p style={{ color: '#718096', marginBottom: '2rem', maxWidth: '500px', margin: '0 auto 2rem' }}>
            Vous etes un fournisseur de textiles ou de vetements? Rejoignez notre reseau international
          </p>
          <Link
            to="/contact"
            style={{
              padding: '14px 40px',
              background: '#4B6CB7',
              color: '#fff',
              borderRadius: '12px',
              fontWeight: 600,
              textDecoration: 'none',
              display: 'inline-block'
            }}
          >
            Nous Contacter
          </Link>
        </motion.div>
      </div>
    </div>
  )
}