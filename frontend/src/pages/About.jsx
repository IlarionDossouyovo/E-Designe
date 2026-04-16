import { motion } from 'framer-motion'

export default function About() {
  const stats = [
    { value: '10K+', label: 'Clients satisfaits' },
    { value: '500+', label: 'Marques partenaires' },
    { value: '50+', label: 'Pays livrés' },
    { value: '24/7', label: 'Support client' }
  ]

  const values = [
    { icon: '🎯', title: 'Excellence', desc: 'Nous sélectionnons les meilleures marques et produits.' },
    { icon: '🌱', title: 'Durabilité', desc: 'Engagés pour une mode responsable et eco-responsable.' },
    { icon: '💎', title: ' Qualité', desc: 'Des produits premium adaptés à tous les budgets.' },
    { icon: '🚀', title: 'Innovation', desc: 'Intelligence artificielle pour une expérience optimale.' }
  ]

  const team = [
    { name: 'Équipe E-Designe', role: 'Fondateurs', image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80' },
    { name: 'Support Client', role: 'Service client', image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&q=80' },
    { name: 'Logistique', role: 'Expédition', image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=400&q=80' }
  ]

  return (
    <div className="container" style={{ padding: '3rem 20px' }}>
      {/* Hero */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ 
          textAlign: 'center', 
          marginBottom: '4rem',
          padding: '4rem 2rem',
          background: 'linear-gradient(135deg, #19232D 0%, #4B6CB7 100%)',
          borderRadius: '20px',
          color: 'white'
        }}
      >
        <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>À Propos de E-Designe</h1>
        <p style={{ fontSize: '1.1rem', opacity: 0.9, maxWidth: '600px', margin: '0 auto' }}>
          Votre destination shopping premium avec intelligence artificielle
        </p>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-products" style={{ gridTemplateColumns: 'repeat(4, 1fr)', marginBottom: '4rem' }}>
        {stats.map((stat, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            style={{ textAlign: 'center', padding: '2rem', background: '#F5F6FA', borderRadius: '15px' }}
          >
            <div style={{ fontSize: '2.5rem', fontWeight: 700, color: '#4B6CB7' }}>{stat.value}</div>
            <div style={{ color: '#718096', marginTop: '0.5rem' }}>{stat.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Mission */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', marginBottom: '4rem', alignItems: 'center' }}>
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem', color: '#19232D' }}>Notre Mission</h2>
          <p style={{ color: '#718096', lineHeight: 1.8, marginBottom: '1rem' }}>
            E-Designe By ELECTRON est né d'une vision simple : rendre la mode premium accessible à tous 
            grâce à la technologie. Notre plateforme combine l'élégance française à l'innovation 
            technologique pour créer une expérience d'achat unique.
          </p>
          <p style={{ color: '#718096', lineHeight: 1.8 }}>
            Grâce à notre intelligence artificielle, nous vous aidons à trouver exactement ce que 
            vous cherchez en quelques secondes. Fini le temps perdu à naviguer entre des centaines 
            de produits - notre IA comprend vos besoins et vous propose des résultats personnalisés.
          </p>
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <img 
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80" 
            alt="Boutique E-Designe"
            style={{ width: '100%', borderRadius: '20px' }}
          />
        </motion.div>
      </div>

      {/* Values */}
      <h2 style={{ textAlign: 'center', marginBottom: '2rem', fontSize: '2rem' }}>Nos Valeurs</h2>
      <div className="grid grid-products" style={{ marginBottom: '4rem' }}>
        {values.map((val, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="card"
            style={{ padding: '2rem', textAlign: 'center' }}
          >
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>{val.icon}</div>
            <h3 style={{ marginBottom: '0.5rem' }}>{val.title}</h3>
            <p style={{ color: '#718096' }}>{val.desc}</p>
          </motion.div>
        ))}
      </div>

      {/* Team */}
      <h2 style={{ textAlign: 'center', marginBottom: '2rem', fontSize: '2rem' }}>Notre Équipe</h2>
      <div className="grid grid-products" style={{ marginBottom: '4rem' }}>
        {team.map((member, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            style={{ textAlign: 'center' }}
          >
            <img 
              src={member.image} 
              alt={member.name}
              style={{ width: '150px', height: '150px', borderRadius: '50%', objectFit: 'cover', marginBottom: '1rem' }}
            />
            <h4>{member.name}</h4>
            <p style={{ color: '#718096', fontSize: '0.9rem' }}>{member.role}</p>
          </motion.div>
        ))}
      </div>

      {/* CTA */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ 
          textAlign: 'center', 
          padding: '3rem',
          background: '#F5F6FA',
          borderRadius: '20px'
        }}
      >
        <h2 style={{ marginBottom: '1rem' }}>Prêt à découvrir la mode nouvelle génération?</h2>
        <p style={{ color: '#718096', marginBottom: '2rem' }}>
          Rejoignez des milliers de clients satisfaits et vivez l'expérience E-Designe
        </p>
        <a href="/products" className="btn btn-primary" style={{ padding: '1rem 2rem', borderRadius: '30px' }}>
          Découvrir la boutique
        </a>
      </motion.div>
    </div>
  )
}