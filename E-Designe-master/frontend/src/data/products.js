// Comprehensive product catalog with quality tiers
export const products = {
  // HOMME Category
  homme: {
    costumes: [
      { id: 'h1', name: 'Costume Premium Milano', price: 250, quality: 'Premium', image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400', category: 'Homme', sub: 'Costumes' },
      { id: 'h2', name: 'Costume Executive', price: 180, quality: 'Moyenne', image: 'https://images.unsplash.com/photo-1593032465175-481aa7c42d5e?w=400', category: 'Homme', sub: 'Costumes' },
      { id: 'h3', name: 'Costume Classique', price: 89, quality: 'Basic', image: 'https://images.unsplash.com/photo-1507679799987-c7377957cc3f?w=400', category: 'Homme', sub: 'Costumes' }
    ],
    chemises: [
      { id: 'h4', name: 'Chemise Soie Italienne', price: 120, quality: 'Premium', image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400', category: 'Homme', sub: 'Chemises' },
      { id: 'h5', name: 'Chemise Coton Egyptien', price: 65, quality: 'Moyenne', image: 'https://images.unsplash.com/photo-1598033129183-c4f50c3fb03d?w=400', category: 'Homme', sub: 'Chemises' },
      { id: 'h6', name: 'Chemise Standard', price: 25, quality: 'Basic', image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=400', category: 'Homme', sub: 'Chemises' }
    ],
    pantalons: [
      { id: 'h7', name: 'Pantalon Wool Premium', price: 150, quality: 'Premium', image: 'https://images.unsplash.com/photo-1624378439575d870b5a4b76e47d5de?w=400', category: 'Homme', sub: 'Pantalons' },
      { id: 'h8', name: 'Pantalon Chino Premium', price: 85, quality: 'Moyenne', image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=400', category: 'Homme', sub: 'Pantalons' },
      { id: 'h9', name: 'Pantalon Jean Basic', price: 35, quality: 'Basic', image: 'https://images.unsplash.com/photo-1542272454315-4c01d7abdf4a?w=400', category: 'Homme', sub: 'Pantalons' }
    ],
    vestes: [
      { id: 'h10', name: 'Veste Cuir Premium', price: 320, quality: 'Premium', image: 'https://images.unsplash.com/photo-1551028719-00167f22ec93?w=400', category: 'Homme', sub: 'Vestes' },
      { id: 'h11', name: 'Veste Denim', price: 90, quality: 'Moyenne', image: 'https://images.unsplash.com/photo-1576995853122-5a3e342f91c4?w=400', category: 'Homme', sub: 'Vestes' },
      { id: 'h12', name: 'Veste Sweatette Basic', price: 45, quality: 'Basic', image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400', category: 'Homme', sub: 'Vestes' }
    ]
  },
  // FEMME Category
  femme: {
    robes: [
      { id: 'f1', name: 'Robe Soiree Luxe', price: 280, quality: 'Premium', image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400', category: 'Femme', sub: 'Robes' },
      { id: 'f2', name: 'Robe Cocktail', price: 150, quality: 'Moyenne', image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=400', category: 'Femme', sub: 'Robes' },
      { id: 'f3', name: 'Robe Everyday', price: 55, quality: 'Basic', image: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=400', category: 'Femme', sub: 'Robes' }
    ],
    tops: [
      { id: 'f4', name: 'Blouse Soie', price: 95, quality: 'Premium', image: 'https://images.unsplash.com/photo-1564257631407-4deb1f99d992?w=400', category: 'Femme', sub: 'Tops' },
      { id: 'f5', name: 'Blouse Coton', price: 45, quality: 'Moyenne', image: 'https://images.unsplash.com/photo-1583744946564-b52ac1c2c998?w=400', category: 'Femme', sub: 'Tops' },
      { id: 'f6', name: 'T-shirt Basic', price: 15, quality: 'Basic', image: 'https://images.unsplash.com/photo-1576566588028-4147f8942fe6?w=400', category: 'Femme', sub: 'Tops' }
    ],
    jupes: [
      { id: 'f7', name: 'Jupe Crayon Premium', price: 120, quality: 'Premium', image: 'https://images.unsplash.com/photo-1583496661160-fb5886a0edd0?w=400', category: 'Femme', sub: 'Jupes' },
      { id: 'f8', name: 'Jupe Plissee', price: 65, quality: 'Moyenne', image: 'https://images.unsplash.com/photo-1592301933927-35b9762bf95a?w=400', category: 'Femme', sub: 'Jupes' },
      { id: 'f9', name: 'Jupe Simple', price: 25, quality: 'Basic', image: 'https://images.unsplash.com/photo-1577900232422-02b300d7ef45?w=400', category: 'Femme', sub: 'Jupes' }
    ],
    pantalons: [
      { id: 'f10', name: 'Pantalon Tailleur', price: 140, quality: 'Premium', image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400', category: 'Femme', sub: 'Pantalons' },
      { id: 'f11', name: 'Jean Premium', price: 85, quality: 'Moyenne', image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400', category: 'Femme', sub: 'Pantalons' },
      { id: 'f12', name: 'Jean Basic', price: 35, quality: 'Basic', image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400', category: 'Femme', sub: 'Pantalons' }
    ]
  },
  // AFRICAIN Category
  africain: {
    robes: [
      { id: 'a1', name: 'Robe Ankara Premium', price: 180, quality: 'Premium', image: 'https://images.unsplash.com/photo-1618932260643-afa2e765e8c4?w=400', category: 'Africain', sub: 'Robes' },
      { id: 'a2', name: 'Robe wax Standard', price: 95, quality: 'Moyenne', image: 'https://images.unsplash.com/photo-1515347619252-60a6bf4fffce?w=400', category: 'Africain', sub: 'Robes' },
      { id: 'a3', name: 'Robe Artisanale', price: 45, quality: 'Basic', image: 'https://images.unsplash.com/photo-1532453288672-3a72728dd258?w=400', category: 'Africain', sub: 'Robes' }
    ],
    boubous: [
      { id: 'a4', name: 'Boubou Brode', price: 220, quality: 'Premium', image: 'https://images.unsplash.com/photo-1591191057091-ee5f0b2c30b4?w=400', category: 'Africain', sub: 'Boubous' },
      { id: 'a5', name: 'Boubou Tradition', price: 120, quality: 'Moyenne', image: 'https://images.unsplash.com/photo-1594938328870-962ea1761f9c?w=400', category: 'Africain', sub: 'Boubous' },
      { id: 'a6', name: 'Boubou Simple', price: 55, quality: 'Basic', image: 'https://images.unsplash.com/photo-1594938328870-962ea1761f9c?w=400', category: 'Africain', sub: 'Boubous' }
    ],
    pagnes: [
      { id: 'a7', name: 'Pagne Soie Premium', price: 85, quality: 'Premium', image: 'https://images.unsplash.com/photo-1598324797618-16700e8eb28e?w=400', category: 'Africain', sub: 'Pagnes' },
      { id: 'a8', name: 'Pagne Coton', price: 45, quality: 'Moyenne', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400', category: 'Africain', sub: 'Pagnes' },
      { id: 'a9', name: 'Pagne Basic', price: 20, quality: 'Basic', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400', category: 'Africain', sub: 'Pagnes' }
    ],
    accessoires: [
      { id: 'a10', name: 'Gele Premium', price: 65, quality: 'Premium', image: 'https://images.unsplash.com/photo-1589829545856-d3e70454f164?w=400', category: 'Africain', sub: 'Accessoires' },
      { id: 'a11', name: 'Gele Standard', price: 35, quality: 'Moyenne', image: 'https://images.unsplash.com/photo-1589829545856-d3e70454f164?w=400', category: 'Africain', sub: 'Accessoires' },
      { id: 'a12', name: 'Foulard Basic', price: 15, quality: 'Basic', image: 'https://images.unsplash.com/photo-1589829545856-d3e70454f164?w=400', category: 'Africain', sub: 'Accessoires' }
    ]
  },
  // BEBE Category
  bebe: {
    ensembles: [
      { id: 'b1', name: 'Ensemble Cotton Bio', price: 45, quality: 'Premium', image: 'https://images.unsplash.com/photo-1522771930-78848d9293e8?w=400', category: 'Bebe', sub: 'Ensembles' },
      { id: 'b2', name: 'Body Coton', price: 25, quality: 'Moyenne', image: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?w=400', category: 'Bebe', sub: 'Ensembles' },
      { id: 'b3', name: 'Body Basic', price: 12, quality: 'Basic', image: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?w=400', category: 'Bebe', sub: 'Ensembles' }
    ],
    robes: [
      { id: 'b4', name: 'Robe Bapteme', price: 55, quality: 'Premium', image: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?w=400', category: 'Bebe', sub: 'Robes' },
      { id: 'b5', name: 'Robe Cotillon', price: 30, quality: 'Moyenne', image: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?w=400', category: 'Bebe', sub: 'Robes' },
      { id: 'b6', name: 'Robe Simple', price: 15, quality: 'Basic', image: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?w=400', category: 'Bebe', sub: 'Robes' }
    ],
    pyjamas: [
      { id: 'b7', name: 'Pyjama Velours', price: 35, quality: 'Premium', image: 'https://images.unsplash.com/photo-1522771930-78848d9293e8?w=400', category: 'Bebe', sub: 'Pyjamas' },
      { id: 'b8', name: 'Pyjama Coton', price: 18, quality: 'Moyenne', image: 'https://images.unsplash.com/photo-1522771930-78848d9293e8?w=400', category: 'Bebe', sub: 'Pyjamas' },
      { id: 'b9', name: 'Pyjama Basic', price: 8, quality: 'Basic', image: 'https://images.unsplash.com/photo-1522771930-78848d9293e8?w=400', category: 'Bebe', sub: 'Pyjamas' }
    ],
    chausettes: [
      { id: 'b10', name: 'Lot Chaunettes Bio', price: 18, quality: 'Premium', image: 'https://images.unsplash.com/photo-1522771930-78848d9293e8?w=400', category: 'Bebe', sub: 'Chaussettes' },
      { id: 'b11', name: 'Lot Chaunettes', price: 10, quality: 'Moyenne', image: 'https://images.unsplash.com/photo-1522771930-78848d9293e8?w=400', category: 'Bebe', sub: 'Chaussettes' },
      { id: 'b12', name: 'Chaussettes Basic', price: 5, quality: 'Basic', image: 'https://images.unsplash.com/photo-1522771930-78848d9293e8?w=400', category: 'Bebe', sub: 'Chaussettes' }
    ]
  }
}

export const categories = [
  { id: 'homme', name: 'Homme', icon: '👔', color: '#1e3a5f' },
  { id: 'femme', name: 'Femme', icon: '👗', color: '#c71585' },
  { id: 'africain', name: 'Africain', icon: '🌍', color: '#d4af37' },
  { id: 'bebe', name: 'Bebe', icon: '👶', color: '#ffb6c1' }
]

export const qualityTiers = [
  { id: 'Premium', name: 'Premium', color: '#FFD700', desc: 'Qualite superieure' },
  { id: 'Moyenne', name: 'Moyenne', color: '#C0C0C0', desc: 'Qualite moyenne' },
  { id: 'Basic', name: 'Basic', color: '#CD7F32', desc: 'Qualite standard' }
]

export const allProducts = Object.values(products).flatMap(cat => 
  Object.values(cat).flat()
)