import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const suppliersData = {
  'Homme': [
    { name: 'Lacoste', country: 'France', products: 'Polos, T-shirts, Pulls', website: 'lacoste.com', description: 'Marque emblématique française de vêtements sportwear.' },
    { name: 'Ralph Lauren', country: 'USA', products: 'Chemises, Manteaux, Accessoires', website: 'ralphlauren.com', description: 'Luxe américain connu pour le style preppy.' },
    { name: 'Tommy Hilfiger', country: 'USA', products: 'Vêtements, Montres, Accessoires', website: 'tommy.com', description: 'Marque américaine emblématique du streetwear.' },
    { name: 'Hugo Boss', country: 'Allemagne', products: 'Costumes, Chemises, Chaussures', website: 'hugoboss.com', description: 'Mode masculine haut de gamme et business.' },
    { name: 'Zara', country: 'Espagne', products: 'Vêtements tendances', website: 'zara.com', description: 'Fast fashion européen leader.' },
    { name: 'H&M', country: 'Suède', products: 'Vêtements, Accessoires', website: 'hm.com', description: 'Gigant du fast fashion.' },
    { name: 'Calvin Klein', country: 'USA', products: 'Sous-vêtements, Jeans, Parfums', website: 'calvinklein.com', description: 'Marque américaine iconique.' },
    { name: 'Armani', country: 'Italie', products: 'Costumes, Vêtements, Accessoires', website: 'armani.com', description: 'Luxe italien par excellence.' },
    { name: 'Benetton', country: 'Italie', products: 'Vêtements colorés', website: 'benetton.com', description: 'Mode italienne colorée.' },
    { name: 'Levi\'s', country: 'USA', products: 'Jeans, Vêtements décontractés', website: 'levis.com', description: 'Marque américaine de jeans mythique.' },
    { name: 'Nike', country: 'USA', products: 'Vêtements sport, Chaussures', website: 'nike.com', description: 'Leader mondial des équipements sportifs.' },
    { name: 'Adidas', country: 'Allemagne', products: 'Vêtements sport, Chaussures', website: 'adidas.com', description: 'Marque allemande de sport leader.' },
    { name: 'Puma', country: 'Allemagne', products: 'Vêtements sport, Chaussures', website: 'puma.com', description: 'Marque sportive allemande emblématique.' },
    { name: 'Lacoste', country: 'France', products: 'Polos, Vêtements sport', website: 'lacoste.com', description: 'Elégance française sportwear.' },
    { name: 'Brooks Brothers', country: 'USA', products: 'Costumes, Chemises', website: 'brooksbrothers.com', description: 'Luxe américain classique.' }
  ],
  'Femme': [
    { name: 'Chanel', country: 'France', products: 'Vêtements, Sacs, Parfums', website: 'chanel.com', description: 'Maison de luxe française emblématique.' },
    { name: 'Louis Vuitton', country: 'France', products: 'Sacs, Vêtements, Accessoires', website: 'louisvuitton.com', description: 'Luxe français reconnu mondialement.' },
    { name: 'Dior', country: 'France', products: 'Vêtements, Parfums, Sacs', website: 'dior.com', description: 'Maison de couture française.' },
    { name: 'Gucci', country: 'Italie', products: 'Sacs, Vêtements, Chaussures', website: 'gucci.com', description: 'Luxe italien audacieux.' },
    { name: 'Prada', country: 'Italie', products: 'Sacs, Vêtements, Chaussures', website: 'prada.com', description: 'Mode italienne minimaliste.' },
    { name: 'Zara', country: 'Espagne', products: 'Vêtements tendances', website: 'zara.com', description: 'Fast fashion européen.' },
    { name: 'H&M', country: 'Suède', products: 'Vêtements, Accessoires', website: 'hm.com', description: 'Mode accessible et tendance.' },
    { name: 'Massimo Dutti', country: 'Espagne', products: 'Vêtements élégant', website: 'massimodutti.com', description: 'Mode féminine élégante.' },
    { name: 'Mango', country: 'Espagne', products: 'Vêtements féminins', website: 'mango.com', description: 'Mode féminine tendance.' },
    { name: 'Sézane', country: 'France', products: 'Vêtements féminins', website: 'sezane.com', description: 'Marque française电商.' },
    { name: 'Ba&sh', country: 'France', products: 'Vêtements féminins', website: 'ba-sh.com', description: 'Mode féminine française.' },
    { name: 'The Kooples', country: 'France', products: 'Vêtements rock chic', website: 'thekooples.com', description: 'Mode rock et élégant.' },
    { name: 'Longchamp', country: 'France', products: 'Sacs, Accessoires', website: 'longchamp.com', description: 'Maroquinerie française.' },
    { name: 'Lancôme', country: 'France', products: 'Cosmétiques', website: 'lancome.com', description: 'Cosmétiques français de luxe.' },
    { name: 'Yves Saint Laurent Beauté', country: 'France', products: 'Parfums, Maquillage', website: 'yslbeauty.com', description: 'Beauté de luxe française.' }
  ],
  'Enfants': [
    { name: 'Carcassonne Kids', country: 'France', products: 'Vêtements enfants', website: 'carcaskids.com', description: 'Mode enfants française.' },
    { name: 'Tape à l\'œil', country: 'France', products: 'Vêtements enfants', website: 'tapealoeil.com', description: 'Mode enfants française.' },
    { name: 'Orchestra', country: 'France', products: 'Vêtements enfants', website: 'orchestra.com', description: 'Mode enfants multi-marques.' },
    { name: 'Okaïdi', country: 'France', products: 'Vêtements enfants', website: 'okaidi.com', description: 'Mode enfants française.' },
    { name: 'Kiabi', country: 'France', products: 'Vêtements enfants', website: 'kiabi.com', description: 'Mode enfants économique.' },
    { name: 'Jacadi', country: 'France', products: 'Vêtements nobles enfants', website: 'jacadi.com', description: 'Mode enfants haut de gamme.' },
    { name: 'Catimini', country: 'France', products: 'Vêtements colorés enfants', website: 'catimini.com', description: 'Mode enfants créative.' },
    { name: 'DPAM', country: 'France', products: 'Vêtements enfants', website: 'dpam.com', description: 'Mode enfants moderne.' },
    { name: 'Flux Collection', country: 'France', products: 'Vêtements enfants bio', website: 'fluxcollection.com', description: 'Mode enfants eco-responsable.' },
    { name: 'Shooter', country: 'France', products: 'Vêtements sport enfants', website: 'shooter.fr', description: 'Sport enfants français.' },
    { name: 'Nike Kids', country: 'USA', products: 'Vêtements sport enfants', website: 'nike.com', description: 'Sport enfants international.' },
    { name: 'Adidas Kids', country: 'Allemagne', products: 'Vêtements sport enfants', website: 'adidas.com', description: 'Sport enfants mondial.' },
    { name: 'Puma Kids', country: 'Allemagne', products: 'Vêtements sport enfants', website: 'puma.com', description: 'Sport enfants fun.' },
    { name: 'GAP Kids', country: 'USA', products: 'Vêtements enfants', website: 'gap.com', description: 'Mode enfants américaine.' },
    { name: 'Zara Kids', country: 'Espagne', products: 'Vêtements enfants tendance', website: 'zara.com', description: 'Mode enfants trendy.' }
  ],
  'Cosmétiques': [
    { name: 'L\'Oréal Paris', country: 'France', products: 'Cosmétiques grand public', website: 'loreal-paris.fr', description: 'Leader mondial des cosmétiques.' },
    { name: 'Garnier', country: 'France', products: 'Cosmétiques, Soins', website: 'garnier.fr', description: 'Cosmétiques accessibles.' },
    { name: 'Vichy', country: 'France', products: 'Soins dermatologiques', website: 'vichy.fr', description: 'Soins pharmaceutiques.' },
    { name: 'La Roche-Posay', country: 'France', products: 'Soins sensibles', website: 'laroche-posay.fr', description: 'Soins dermatologiques.' },
    { name: 'Nuxe', country: 'France', products: 'Soins naturels', website: 'nuxe.com', description: 'Cosmétiques bio français.' },
    { name: 'Bioderma', country: 'France', products: 'Soins dermatologiques', website: 'bioderma.com', description: 'Soins pharma.' },
    { name: 'Caudalie', country: 'France', products: 'Soins vigne', website: 'caudalie.com', description: 'Cosmétiques naturels.' },
    { name: 'Aesop', country: 'Australie', products: 'Soins botaniques', website: 'aesop.com', description: 'Soins premium australien.' },
    { name: 'The Body Shop', country: 'Royaume-Uni', products: 'Cosmétiques éthiques', website: 'thebodyshop.com', description: 'Cosmétiques responsables.' },
    { name: 'Lush', country: 'Royaume-Uni', products: 'Cosmétiques frais', website: 'lush.com', description: 'Cosmétiques faits main.' },
    { name: 'Estée Lauder', country: 'USA', products: 'Luxe cosmétique', website: 'esteelauder.com', description: 'Luxe américain.' },
    { name: 'Clinique', country: 'USA', products: 'Cosmétiques dermatologiques', website: 'clinique.com', description: 'Soins hypoallergéniques.' },
    { name: 'Shiseido', country: 'Japon', products: 'Cosmétiques asiatiques', website: 'shiseido.com', description: 'Luxe japonais.' },
    { name: 'Clarins', country: 'France', products: 'Soins et maquillage', website: 'clarins.com', description: 'Soins français.' },
    { name: 'Decathlon', country: 'France', products: 'Cosmétiques sport', website: 'decathlon.fr', description: 'Sport et récupération.' }
  ]
}

const blogPosts = {
  'Homme': [
    { title: 'Les tendances mode masculine 2024', excerpt: 'Découvrez les styles qui dominent cette année...', date: '15 Avril 2024' },
    { title: 'Comment choisir un costume parfait', excerpt: 'Guide complet pour trouver la tenue idéale...', date: '12 Avril 2024' },
    { title: 'Les essentiels du dressing masculin', excerpt: 'Les pièces indispensables pour toute garde-robe...', date: '10 Avril 2024' }
  ],
  'Femme': [
    { title: 'Les créateurs roses qui font la tendance', excerpt: 'Les marques roses qui révolutionnent la mode...', date: '14 Avril 2024' },
    { title: 'Guide des tailles: trouver la bonne coupe', excerpt: 'Conseils pour choisir vos vêtements parfaits...', date: '11 Avril 2024' },
    { title: 'Capsule wardrobe: l\'élégance minimaliste', excerpt: 'Comment créer une garde-robe polyvalente...', date: '8 Avril 2024' }
  ],
  'Enfants': [
    { title: 'Mode enfant durable:label eco-friendly', excerpt: 'Les marques qui respectent l\'environnement...', date: '13 Avril 2024' },
    { title: 'Trouver les bonnes tailles pour grandir', excerpt: 'Guide pour habiller vos enfants correctement...', date: '9 Avril 2024' },
    { title: 'Tendance Junior: les looks de la saison', excerpt: 'Les styles adoptés par les plus jeunes...', date: '6 Avril 2024' }
  ],
  'Cosmétiques': [
    { title: 'Routine beauté: les étape essentielles', excerpt: 'Construisez votre rituel quotidien...', date: '14 Avril 2024' },
    { title: 'Cosmétiques bio: avantages et choix', excerpt: 'Pourquoi passer au naturel?...', date: '11 Avril 2024' },
    { title: 'Les ingredients à éviter dans vos produits', excerpt: 'Guide pour une peau en meilleure santé...', date: '7 Avril 2024' }
  ]
}

export default function Suppliers({ category }) {
  const [suppliers, setSuppliers] = useState([])
  const [posts, setPosts] = useState([])
  const [activeTab, setActiveTab] = useState('suppliers')

  useEffect(() => {
    if (category && suppliersData[category]) {
      setSuppliers(suppliersData[category])
      setPosts(blogPosts[category] || [])
    }
  }, [category])

  const categoryTitle = {
    'Homme': 'Fournisseurs Mode Homme',
    'Femme': 'Fournisseurs Mode Femme',
    'Enfants': 'Fournisseurs Mode Enfants',
    'Cosmétiques': 'Fournisseurs Cosmétiques'
  }

  return (
    <div className="container" style={{ padding: '3rem 20px' }}>
      <h1 style={{ marginBottom: '2rem' }}>{categoryTitle[category] || 'Fournisseurs'}</h1>
      
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
        <button 
          onClick={() => setActiveTab('suppliers')}
          className={`btn ${activeTab === 'suppliers' ? 'btn-primary' : 'btn-secondary'}`}
        >
          Fournisseurs
        </button>
        <button 
          onClick={() => setActiveTab('blog')}
          className={`btn ${activeTab === 'blog' ? 'btn-primary' : 'btn-secondary'}`}
        >
          Blog & Actualités
        </button>
      </div>

      {activeTab === 'suppliers' ? (
        <div className="grid grid-products">
          {suppliers.map((supplier, index) => (
            <div key={index} className="card" style={{ padding: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem' }}>
                <h3 style={{ margin: 0 }}>{supplier.name}</h3>
                <span style={{ 
                  fontSize: '0.75rem', 
                  padding: '0.25rem 0.5rem', 
                  background: '#F5F6FA', 
                  borderRadius: '4px' 
                }}>
                  {supplier.country}
                </span>
              </div>
              <p style={{ color: '#718096', fontSize: '0.875rem', marginBottom: '0.5rem' }}>
                <strong>Produits:</strong> {supplier.products}
              </p>
              <p style={{ color: '#718096', fontSize: '0.875rem', marginBottom: '1rem' }}>
                {supplier.description}
              </p>
              <a 
                href={`https://${supplier.website}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn btn-secondary"
                style={{ fontSize: '0.875rem', padding: '0.5rem 1rem' }}
              >
                Visiter le site →
              </a>
            </div>
          ))}
        </div>
      ) : (
        <div>
          {posts.map((post, index) => (
            <div key={index} className="card" style={{ padding: '1.5rem', marginBottom: '1rem' }}>
              <p style={{ fontSize: '0.75rem', color: '#4B6CB7', marginBottom: '0.5rem' }}>{post.date}</p>
              <h3 style={{ marginBottom: '0.5rem' }}>{post.title}</h3>
              <p style={{ color: '#718096', marginBottom: '1rem' }}>{post.excerpt}</p>
              <a href="#" style={{ color: '#4B6CB7', fontWeight: 500 }}>Lire la suite →</a>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export { suppliersData, blogPosts }