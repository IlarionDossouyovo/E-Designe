import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'

const blogPosts = {
  1: { 
    title: 'Tendances Mode 2024', 
    content: `Decouvrez les tendances de la saison prochaine qui reinventent elegance et confort.

## Les couleurs dominantes
Cette saison, les couleurs naturellees dominent: beige, terracotta, vert sauge et bleu nuit.

## Coupe et silhouette
Les coupes oversize restent tendances, avec des vetements amples et confortables.
Les costumes masculins evoluent vers des modeles plus detendus.

## Materiaux
Les materiaux durables et eco-responsables sont a l'honneur. 
Le cotton bio, le lin et les tissus recycles sont prioritaires.

##Conseils
- Optez pour des pieces vertes
- Misez sur la qualite plutôt que la quantite
- Investissez dans des classiqes intemporels`,
    date: '15 Avril 2024', 
    category: 'Mode',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=400&fit=crop',
    readTime: '5 min'
  },
  2: { 
    title: 'Comment choisir sa taille', 
    content: `Guide complet pour trouver la taille parfaite et assurer votre confort.

## Mesurer
Utilisez un metre couturier pour mesurer:
- Poitrine: au niveau des pectoraux
- Taille: au niveau du nombril
- Hanches: au niveau le plus large

## Tableau des tailles
| Taille | Poitrine | Taille | Hanches |
|--------|----------|--------|---------|
| XS | 86-91 | 71-76 | 86-91 |
| S | 91-96 | 76-81 | 91-96 |
| M | 96-101 | 81-86 | 96-101 |
| L | 101-106 | 86-91 | 101-106 |
| XL | 106-111 | 91-96 | 106-111 |

##Conseils
- Preferer legerement ample si hesitation
- Les tailles peuvent varier selon les marques
- Verifiez guide taille specifique`,
    date: '10 Avril 2024', 
    category: 'Conseils',
    image: 'https://images.unsplash.com/1445208178998-f45938955d8f2?w=800&h=400&fit=crop',
    readTime: '4 min'
  },
  3: { 
    title: "L'art du pagne africain", 
    content: `Histoire et signification des tissues traditionnelafricain authentique.

## Origine
Le pagne africain est un tissu couleur originate d'Afrique de l'Ouest.
Chaque motif racont une histoire et possede une signification particuliere.

## Les types de tissu
- Wax: tissu impregne de cire, brillant et durable
- bazin: tissu brillant et rigide
- hollande: tissu doux et confortable
-Kitaa: tissu fin et leger

## Signification des motifs
Les motifs ne sont pas decoratifs: ils racontent des histoires.
- Motifs geometriques: force et stabilite
- Motifs floraux: beaute et fertilite
- Motifs animaux: puissance et sagesse

##Conseils
- Choisir selon l'occasion
- Le wax pour les ceremonies
- Le bazin pour les evenements formels`,
    date: '5 Avril 2024', 
    category: 'Culture',
    image: 'https://images.unsplash.com/photo-1583391722359-1528b3ceabd2?w=800&h=400&fit=crop',
    readTime: '6 min'
  },
  4: { 
    title: 'Entretien des vetements', 
    content: `Conseils pratiques pour prolonger la vie de vos habits preferes.

## Lavage
- Temperature: 30°C pour les couleurs, 40°C pour le blanc
- Lessive: preferer lessive sans phosphate
- Eviter surechargement machine

## Sechage
- Sеcher a l'air libre preferablement
- Eviter seche-linge frequente
- Repasser encore humide pour meilleur resultat

## Rangement
- Suspendre les vetements delicate
- Ranger dans un endroit sec
- Utiliser housses pour vetements saisonniers

##Conseils
- Laver les vetements neuves avant premiere portee
- Traiter les taches immediatement
- Verifier eti'uettes pour instructions specifiques`,
    date: '1 Avril 2024', 
    category: 'Entretien',
    image: 'https://images.unsplash.com/photo-1556905055-8f2a19ce7145?w=800&h=400&fit=crop',
    readTime: '4 min'
  },
  5: { 
    title: 'Mode Durable', 
    content: `Adopter une mode plus responsable et respectueuse de l'environnement.

##Pourquoi?
L'industrie textile est parmi les plus polluantes au monde.
Adopter une mode durable aide a reducer l'empreinte environnementale.

## Gestes eco-responsables
- Acheter moins mais mie ux
- Privilegier qualite et durabilite
- Choisir produits locaux
- Recycler et reutiliser

## Labels eco-responsables
- GOTS: textile biologique
- OEKO-TEX: sans substances nocives
- Fair Trade: commerce equitable
- B Corp: entreprise responsable

##Conseils
- Verifier conditions de fabrication
- Preferer tissus naturels
- Entretien responsable`,
    date: '25 Mars 2024', 
    category: 'Ecologie',
    image: 'https://images.unsplash.com/photo-1528901166007-3784c7dd3653?w=800&h=400&fit=crop',
    readTime: '5 min'
  },
  6: { 
    title: 'Coordonner vos looks', 
    content: `Creer des tenues harmonieuses pour toutes les occasions.

## Les bases
Une garde-robe bien organisee commence par des essentiels:
- Chemise blanche
- Pantalon noir
- Jupe classique
- Vest e neuter

## Regles de coordination
- 1 dominance de couleur + 2 accompagnantes
-Melanger matieres et textures
-Accessor avec parcimonie

## Occasions
- Bureau: classe et professionnel
- Week-end: detendu et confortable
- Soiree: elegant et sophistique

##Conseils
- Commencer par outfits simples
- Ajouter accessoi res progressivement
- Construire sur base existante`,
    date: '20 Mars 2024', 
    category: 'Conseils',
    image: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=800&h=400&fit=crop',
    readTime: '4 min'
  }
}

export default function BlogPost() {
  const { id } = useParams()
  const post = blogPosts[id] || blogPosts[1]
  
  const getCatColor = (cat) => {
    const colors = { 
      Mode: '#4B6CB7', 
      Conseils: '#28a745', 
      Culture: '#9c27b0', 
      Entretien: '#ff9800', 
      Ecologie: '#20c997' 
    }
    return colors[cat] || '#6c757d'
  }

  const relatedPosts = Object.entries(blogPosts)
    .filter(([key]) => key !== id)
    .slice(0, 3)

  return (
    <div style={{ padding: '2rem 20px', maxWidth: '900px', margin: '0 auto' }}>
      {/* Back */}
      <Link to="/blog" style={{ color: '#4B6CB7', textDecoration: 'none', marginBottom: '1.5rem', display: 'inline-block' }}>
        ← Retour au blog
      </Link>

      {/* Hero Image */}
      <div style={{ borderRadius: '16px', overflow: 'hidden', marginBottom: '2rem' }}>
        <img 
          src={post.image} 
          alt={post.title} 
          style={{ width: '100%', height: '400px', objectFit: 'cover' }} 
          onError={(e) => e.target.style.display = 'none'}
        />
      </div>

      {/* Meta */}
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
        <span 
          style={{ 
            background: getCatColor(post.category), 
            color: '#fff', 
            padding: '6px 14px', 
            borderRadius: '20px', 
            fontSize: '13px', 
            fontWeight: 'bold'
          }}
        >
          {post.category}
        </span>
        <span style={{ color: '#666', fontSize: '14px' }}>{post.date}</span>
        <span style={{ color: '#999', fontSize: '14px' }}>{post.readTime} de lecture</span>
      </div>

      {/* Title */}
      <h1 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', lineHeight: '1.2' }}>
        {post.title}
      </h1>

      {/* Content */}
      <div 
        style={{ 
          fontSize: '1.1rem', 
          lineHeight: '1.8', 
          color: '#333',
          whiteSpace: 'pre-line'
        }}
      >
        {post.content.split('\n').map((para, i) => {
          if (para.startsWith('## ')) {
            return <h2 key={i} style={{ marginTop: '2rem', marginBottom: '1rem' }}>{para.replace('## ', '')}</h2>
          }
          if (para.startsWith('- ')) {
            return <li key={i} style={{ marginLeft: '1rem', marginBottom: '0.5rem' }}>{para.replace('- ', '')}</li>
          }
          return para ? <p key={i} style={{ marginBottom: '1rem' }}>{para}</p> : <br key={i} />
        })}
      </div>

      {/* Related */}
      <div style={{ marginTop: '4rem', paddingTop: '2rem', borderTop: '1px solid #eee' }}>
        <h3 style={{ marginBottom: '1.5rem' }}>Articles similaires</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
          {relatedPosts.map(([key, p]) => (
            <Link key={key} to={`/blog/${key}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <div style={{ background: '#fff', padding: '1rem', borderRadius: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
                <span style={{ fontSize: '11px', color: getCatColor(p.category) }}>{p.category}</span>
                <h4 style={{ marginTop: '0.5rem', fontSize: '1rem' }}>{p.title}</h4>
                <span style={{ fontSize: '12px', color: '#999' }}>{p.date}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
