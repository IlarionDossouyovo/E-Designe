import { Link } from 'react-router-dom'

export default function About() {
  return (
    <div style={{ padding: '2rem 20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ marginBottom: '1rem' }}>À propos d'E-Designe</h1>
      
      <p style={{ lineHeight: 1.8, marginBottom: '1.5rem' }}>
        E-Designe est votre plateforme e-commerce préféré pour la mode au Benin et en Afrique. 
        Nous proposons une large gamme de vêtements, accessoires et produits culturels authentiques.
      </p>
      
      <h2 style={{ marginTop: '2rem', marginBottom: '1rem' }}>Nos services</h2>
      <ul style={{ lineHeight: 2 }}>
        <li>🤖 Assistant IA pour conseils personnalisés</li>
        <li>🌍 Mode africana authentique</li>
        <li>🚚 Livraison rapide à Cotonou et ailleurs</li>
        <li>💬 Support 24/7</li>
      </ul>
      
      <h2 style={{ marginTop: '2rem', marginBottom: '1rem' }}>Contactez-nous</h2>
      <p>Email: support@e-designe.com</p>
      <p>WhatsApp: +229 01 97 700 347</p>
      <p>Adresse: Cotonou, Bénin</p>
    </div>
  )
}
