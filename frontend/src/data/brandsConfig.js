// Configuration complète des marques E-DÉSIGNE
// Avec catégories, sous-catégories, produits et articles blog

export const brandsConfig = {
  // Liste des marques avec leurs détails
  brands: [
    {
      id: 'nike',
      name: 'Nike',
      nameFr: 'Nike',
      logo: '🏃',
      color: '#111111',
      category: 'Sport',
      country: 'USA',
      description: 'Marque leader mondial d\'équipements sportifs',
      website: 'https://nike.com',
      commission: '10%',
      dropship: true,
      minOrder: 10,
      categories: {
        homme: {
          title: 'Homme',
          icon: '👨',
          subcategories: [
            { id: 'nike-homme-chaussures', name: 'Chaussures', products: 45 },
            { id: 'nike-homme-vetements', name: 'Vêtements', products: 38 },
            { id: 'nike-homme-accessoires', name: 'Accessoires', products: 22 }
          ]
        },
        femme: {
          title: 'Femme',
          icon: '👩',
          subcategories: [
            { id: 'nike-femme-chaussures', name: 'Chaussures', products: 42 },
            { id: 'nike-femme-vetements', name: 'Vêtements', products: 35 },
            { id: 'nike-femme-accessoires', name: 'Accessoires', products: 18 }
          ]
        },
        enfants: {
          title: 'Enfants',
          icon: '👶',
          subcategories: [
            { id: 'nike-enfants-chaussures', name: 'Chaussures', products: 28 },
            { id: 'nike-enfants-vetements', name: 'Vêtements', products: 25 },
            { id: 'nike-enfants-accessoires', name: 'Accessoires', products: 12 }
          ]
        }
      },
      blogTemplates: {
        homme: [
          { title: 'Guide des meilleures baskets Nike pour homme 2024', category: 'Mode', readTime: '5 min' },
          { title: 'Nike Air Max: L\'histoire de la légende', category: 'Lifestyle', readTime: '8 min' },
          { title: 'Comment choisir ses baskets de running Nike', category: 'Sport', readTime: '6 min' }
        ],
        femme: [
          { title: 'Top 10 des sneakers Nike pour femme', category: 'Mode', readTime: '4 min' },
          { title: 'Nike Leggings: Le guide complet', category: 'Fitness', readTime: '5 min' },
          { title: 'Collections Nike femme: Tendances 2024', category: 'Mode', readTime: '6 min' }
        ],
        enfants: [
          { title: 'Guide tailles chaussures Nike enfants', category: 'Parentalité', readTime: '4 min' },
          { title: 'Les meilleures baskets Nike pour le sport scolaire', category: 'Sport', readTime: '5 min' },
          { title: 'Nike Kids: Confort et style pour les enfants', category: 'Mode', readTime: '4 min' }
        ]
      }
    },
    {
      id: 'zara',
      name: 'Zara',
      nameFr: 'Zara',
      logo: '👔',
      color: '#000000',
      category: 'Mode',
      country: 'Espagne',
      description: 'Mode rapide espagnole pour homme, femme et enfant',
      website: 'https://zara.com',
      commission: '8%',
      dropship: true,
      minOrder: 15,
      categories: {
        homme: {
          title: 'Homme',
          icon: '👨',
          subcategories: [
            { id: 'zara-homme-manteaux', name: 'Manteaux & Vestes', products: 35 },
            { id: 'zara-homme-pantalons', name: 'Pantalons', products: 30 },
            { id: 'zara-homme chemises', name: 'Chemises', products: 28 },
            { id: 'zara-homme-pullovers', name: 'Pullovers', products: 25 }
          ]
        },
        femme: {
          title: 'Femme',
          icon: '👩',
          subcategories: [
            { id: 'zara-femme-robes', name: 'Robes', products: 45 },
            { id: 'zara-femme-hauts', name: 'Hauts', products: 42 },
            { id: 'zara-femme-pantalons', name: 'Pantalons', products: 35 },
            { id: 'zara-femme-jupes', name: 'Jupes', products: 28 }
          ]
        },
        enfants: {
          title: 'Enfants',
          icon: '👶',
          subcategories: [
            { id: 'zara-enfants-filles-robes', name: 'Robes Filles', products: 30 },
            { id: 'zara-enfants-garcons', name: 'Vêtements Garçons', products: 32 },
            { id: 'zara-enfants-bebe', name: 'Bébé', products: 25 }
          ]
        }
      },
      blogTemplates: {
        homme: [
          { title: 'Guide style Zara homme: Les essentiels', category: 'Mode', readTime: '6 min' },
          { title: 'Zara homme: Tendances saisonnières', category: 'Mode', readTime: '5 min' }
        ],
        femme: [
          { title: 'Zara femme: Les must-have de la saison', category: 'Mode', readTime: '5 min' },
          { title: 'Comment porter les pièces Zara', category: 'Style', readTime: '4 min' }
        ],
        enfants: [
          { title: 'Zara Kids: Collection enfants 2024', category: 'Mode Enfant', readTime: '4 min' }
        ]
      }
    },
    {
      id: 'adidas',
      name: 'Adidas',
      nameFr: 'Adidas',
      logo: '🏅',
      color: '#000000',
      category: 'Sport',
      country: 'Allemagne',
      description: 'Marque allemande d\'articles de sport et lifestyle',
      website: 'https://adidas.com',
      commission: '11%',
      dropship: true,
      minOrder: 10,
      categories: {
        homme: {
          title: 'Homme',
          icon: '👨',
          subcategories: [
            { id: 'adidas-homme-chaussures', name: 'Chaussures', products: 48 },
            { id: 'adidas-homme-vetements', name: 'Vêtements', products: 40 },
            { id: 'adidas-homme-accessoires', name: 'Accessoires', products: 25 }
          ]
        },
        femme: {
          title: 'Femme',
          icon: '👩',
          subcategories: [
            { id: 'adidas-femme-chaussures', name: 'Chaussures', products: 44 },
            { id: 'adidas-femme-vetements', name: 'Vêtements', products: 36 },
            { id: 'adidas-femme-accessoires', name: 'Accessoires', products: 20 }
          ]
        },
        enfants: {
          title: 'Enfants',
          icon: '👶',
          subcategories: [
            { id: 'adidas-enfants-chaussures', name: 'Chaussures', products: 30 },
            { id: 'adidas-enfants-vetements', name: 'Vêtements', products: 28 },
            { id: 'adidas-enfants-accessoires', name: 'Accessoires', products: 15 }
          ]
        }
      },
      blogTemplates: {
        homme: [
          { title: 'Adidas Stan Smith: L\'iconique sneaker', category: 'Mode', readTime: '5 min' },
          { title: 'Guide Adidas Ultraboost homme', category: 'Sport', readTime: '6 min' }
        ],
        femme: [
          { title: 'Adidas Superstar: Le intemporel', category: 'Mode', readTime: '4 min' },
          { title: 'Adidas femme: Les must-have 2024', category: 'Mode', readTime: '5 min' }
        ],
        enfants: [
          { title: 'Adidas enfants: Choix et tailles', category: 'Parentalité', readTime: '4 min' }
        ]
      }
    },
    {
      id: 'zara',
      name: 'Zara',
      nameFr: 'Zara',
      logo: '👔',
      color: '#000000',
      category: 'Mode',
      country: 'Espagne',
      description: 'Mode rapide espagnole pour homme, femme et enfant',
      website: 'https://zara.com',
      commission: '8%',
      dropship: true,
      minOrder: 15,
      categories: {
        homme: {
          title: 'Homme',
          icon: '👨',
          subcategories: [
            { id: 'zara-homme-manteaux', name: 'Manteaux & Vestes', products: 35 },
            { id: 'zara-homme-pantalons', name: 'Pantalons', products: 30 },
            { id: 'zara-homme chemises', name: 'Chemises', products: 28 },
            { id: 'zara-homme-pullovers', name: 'Pullovers', products: 25 }
          ]
        },
        femme: {
          title: 'Femme',
          icon: '👩',
          subcategories: [
            { id: 'zara-femme-robes', name: 'Robes', products: 45 },
            { id: 'zara-femme-hauts', name: 'Hauts', products: 42 },
            { id: 'zara-femme-pantalons', name: 'Pantalons', products: 35 },
            { id: 'zara-femme-jupes', name: 'Jupes', products: 28 }
          ]
        },
        enfants: {
          title: 'Enfants',
          icon: '👶',
          subcategories: [
            { id: 'zara-enfants-filles-robes', name: 'Robes Filles', products: 30 },
            { id: 'zara-enfants-garcons', name: 'Vêtements Garçons', products: 32 },
            { id: 'zara-enfants-bebe', name: 'Bébé', products: 25 }
          ]
        }
      },
      blogTemplates: {
        homme: [
          { title: 'Guide style Zara homme: Les essentiels', category: 'Mode', readTime: '6 min' },
          { title: 'Zara homme: Tendances saisonnières', category: 'Mode', readTime: '5 min' }
        ],
        femme: [
          { title: 'Zara femme: Les must-have de la saison', category: 'Mode', readTime: '5 min' },
          { title: 'Comment porter les pièces Zara', category: 'Style', readTime: '4 min' }
        ],
        enfants: [
          { title: 'Zara Kids: Collection enfants 2024', category: 'Mode Enfant', readTime: '4 min' }
        ]
      }
    },
    {
      id: 'gucci',
      name: 'Gucci',
      nameFr: 'Gucci',
      logo: '🐆',
      color: '#BFA15F',
      category: 'Luxe',
      country: 'Italie',
      description: 'Maison de luxe italienne fondée en 1921',
      website: 'https://gucci.com',
      commission: '15%',
      dropship: true,
      minOrder: 5,
      categories: {
        homme: {
          title: 'Homme',
          icon: '👨',
          subcategories: [
            { id: 'gucci-homme-sacs', name: 'Sacs & Accessoires', products: 35 },
            { id: 'gucci-homme-ceintures', name: 'Ceintures', products: 20 },
            { id: 'gucci-homme-montres', name: 'Montres', products: 15 },
            { id: 'gucci-homme-chaussures', name: 'Chaussures', products: 25 }
          ]
        },
        femme: {
          title: 'Femme',
          icon: '👩',
          subcategories: [
            { id: 'gucci-femme-sacs', name: 'Sacs à main', products: 50 },
            { id: 'gucci-femme-bijoux', name: 'Bijoux', products: 30 },
            { id: 'gucci-femme-chaussures', name: 'Chaussures', products: 28 },
            { id: 'gucci-femme-vetements', name: 'Vêtements', products: 22 }
          ]
        },
        enfants: {
          title: 'Enfants',
          icon: '👶',
          subcategories: [
            { id: 'gucci-enfants-sacs', name: 'Sacs & Accessoires', products: 18 },
            { id: 'gucci-enfants-vetements', name: 'Vêtements', products: 20 }
          ]
        }
      },
      blogTemplates: {
        homme: [
          { title: 'Guide luxe: Ceintures Gucci homme', category: 'Luxe', readTime: '5 min' },
          { title: 'Gucci pour homme: L\'élégance italienne', category: 'Mode Luxe', readTime: '6 min' }
        ],
        femme: [
          { title: 'Sacs Gucci: Les modèles iconiques', category: 'Luxe', readTime: '7 min' },
          { title: 'Gucci femme: Du classique au moderne', category: 'Mode Luxe', readTime: '5 min' }
        ],
        enfants: [
          { title: 'Gucci Kids: Le luxe pour les enfants', category: 'Mode Enfant', readTime: '4 min' }
        ]
      }
    },
    {
      id: 'hm',
      name: 'H&M',
      nameFr: 'H&M',
      logo: '🛍️',
      color: '#E83D3D',
      category: 'Mode',
      country: 'Suède',
      description: 'Mode accessible pour toute la famille',
      website: 'https://hm.com',
      commission: '7%',
      dropship: true,
      minOrder: 20,
      categories: {
        homme: {
          title: 'Homme',
          icon: '👨',
          subcategories: [
            { id: 'hm-homme-basiques', name: 'Basiques', products: 40 },
            { id: 'hm-homme-costumes', name: 'Costumes', products: 20 },
            { id: 'hm-homme-sport', name: 'Sport', products: 25 }
          ]
        },
        femme: {
          title: 'Femme',
          icon: '👩',
          subcategories: [
            { id: 'hm-femme-robes', name: 'Robes', products: 55 },
            { id: 'hm-femme-hauts', name: 'Hauts', products: 48 },
            { id: 'hm-femme-grossesse', name: 'Grossesse', products: 15 }
          ]
        },
        enfants: {
          title: 'Enfants',
          icon: '👶',
          subcategories: [
            { id: 'hm-enfants-fille', name: 'Fille (2-14 ans)', products: 45 },
            { id: 'hm-enfants-garcon', name: 'Garçon (2-14 ans)', products: 42 },
            { id: 'hm-enfants-bebe', name: 'Bébé (0-2 ans)', products: 35 }
          ]
        }
      },
      blogTemplates: {
        homme: [
          { title: 'H&M homme: Les basiques indispensables', category: 'Mode', readTime: '4 min' }
        ],
        femme: [
          { title: 'H&M femme: Tendances du moment', category: 'Mode', readTime: '5 min' }
        ],
        enfants: [
          { title: 'H&M Kids: Mode enfant accessible', category: 'Mode Enfant', readTime: '4 min' }
        ]
      }
    }
  ],

  // Articles blog généraux par marque
  generalBlogTemplates: [
    { title: 'Histoire de la marque', category: 'Marque', readTime: '8 min' },
    { title: 'Guide des tailles', category: 'Guide', readTime: '5 min' },
    { title: 'Entretien des produits', category: 'Conseils', readTime: '6 min' },
    { title: 'Comparaison avec la concurrence', category: 'Comparatif', readTime: '7 min' },
    { title: 'Promotions et soldes à venir', category: 'Actualités', readTime: '3 min' }
  ]
}

export default brandsConfig
