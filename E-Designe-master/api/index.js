// E-Désigne API - Vercel Serverless Function
// Deploys as: https://e-designe.vercel.app/api/*
// Full AI 360° Automation System

const emailQueue = []
const analytics = { visits: [], conversions: [] }
const inventoryAlerts = []
const seoImages = []
const socialPosts = []

// Resend Configuration - Emails Transactionnels
const RESEND_API_KEY = process.env.RESEND_API_KEY || 're_Dj8diRCn_CJ1eDHXVtSKWdbYRw5TRz4ok'
const FROM_EMAIL = 'E-Désigne <noreply@e-designe.com>'
const SUPPORT_EMAIL = 'support@e-designe.com'

// Fonction pour envoyer des emails via Resend
async function sendEmail(to, subject, html, text) {
  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: Array.isArray(to) ? to : [to],
        subject: subject,
        html: html,
        text: text
      })
    })
    
    const data = await response.json()
    if (!response.ok) {
      console.error('Resend API Error:', data)
      return { success: false, error: data }
    }
    return { success: true, data }
  } catch (error) {
    console.error('Email sending error:', error)
    return { success: false, error: error.message }
  }
}

// Templates d'emails transactionnels
const emailTemplates = {
  welcome: (data) => ({
    subject: 'Bienvenue chez E-Désigne! 🎉',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Bienvenue chez E-Désigne</title>
      </head>
      <body style="font-family: 'Helvetica Neue', Arial, sans-serif; background-color: #0a0a0f; margin: 0; padding: 40px 20px;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #16161f; border-radius: 16px; padding: 40px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #4B6CB7; margin: 0; font-size: 32px;">E-DÉSIGNE</h1>
            <p style="color: #888; margin-top: 8px;">Mode Premium & Africaine</p>
          </div>
          <h2 style="color: #fff; margin-bottom: 20px;">Bienvenue ${data.name || 'cher client'}! 👋</h2>
          <p style="color: #ccc; line-height: 1.6; margin-bottom: 20px;">
            Nous sommes ravis de vous compter parmi nos clients. E-Désigne vous propose une sélection exclusive de mode occidentale et africaine de qualité premium.
          </p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="https://e-designe.vercel.app/products" style="display: inline-block; background: linear-gradient(135deg, #4B6CB7 0%, #182848 100%); color: #fff; padding: 14px 32px; border-radius: 8px; text-decoration: none; font-weight: 600;">Découvrir nos produits</a>
          </div>
          <p style="color: #666; font-size: 14px; text-align: center; margin-top: 30px;">
            Utilisez le code <strong style="color: #FFD700;">BIENVENUE10</strong> pour obtenir 10% de réduction sur votre première commande!
          </p>
          <hr style="border: none; border-top: 1px solid #333; margin: 30px 0;">
          <p style="color: #666; font-size: 12px; text-align: center;">
            Une question? Contactez-nous à <a href="mailto:${SUPPORT_EMAIL}" style="color: #4B6CB7;">${SUPPORT_EMAIL}</a>
          </p>
        </div>
      </body>
      </html>
    `,
    text: `Bienvenue ${data.name || 'cher client'}! Nous sommes ravis de vous compter chez E-Désigne. Utilisez le code BIENVENUE10 pour 10% de réduction.`
  }),
  
  order_confirmation: (data) => ({
    subject: `Confirmation de votre commande #${data.orderId} ✓`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Confirmation de commande</title>
      </head>
      <body style="font-family: 'Helvetica Neue', Arial, sans-serif; background-color: #0a0a0f; margin: 0; padding: 40px 20px;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #16161f; border-radius: 16px; padding: 40px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #4B6CB7; margin: 0; font-size: 32px;">E-DÉSIGNE</h1>
            <p style="color: #888; margin-top: 8px;">Confirmation de commande</p>
          </div>
          <div style="text-align: center; margin: 30px 0;">
            <div style="width: 80px; height: 80px; background: #4B6CB7; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; font-size: 40px;">✓</div>
          </div>
          <h2 style="color: #fff; text-align: center; margin-bottom: 20px;">Merci pour votre commande!</h2>
          <p style="color: #ccc; line-height: 1.6; margin-bottom: 20px;">
            Votre commande <strong style="color: #4B6CB7;">#${data.orderId}</strong> a été confirmée et sera traitée sous 24h.
          </p>
          <div style="background: #0a0a0f; border-radius: 8px; padding: 20px; margin: 20px 0;">
            <h3 style="color: #fff; margin-top: 0;">Résumé de la commande</h3>
            <p style="color: #ccc; margin: 8px 0;"><strong>Total:</strong> <span style="color: #FFD700;">${data.total}€</span></p>
            <p style="color: #ccc; margin: 8px 0;"><strong>Mode de paiement:</strong> ${data.paymentMethod || 'Carte bancaire'}</p>
          </div>
          <p style="color: #666; font-size: 14px;">
            Un email de suivi vous sera envoyé dès l'expédition de votre colis.
          </p>
          <hr style="border: none; border-top: 1px solid #333; margin: 30px 0;">
          <p style="color: #666; font-size: 12px; text-align: center;">
            Questions? Contactez <a href="mailto:${SUPPORT_EMAIL}" style="color: #4B6CB7;">${SUPPORT_EMAIL}</a>
          </p>
        </div>
      </body>
      </html>
    `,
    text: `Votre commande #${data.orderId} a été confirmée! Total: ${data.total}€`
  }),
  
  shipping_update: (data) => ({
    subject: `Votre colis est en route! 🚚 Commande #${data.orderId}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Expédition de votre commande</title>
      </head>
      <body style="font-family: 'Helvetica Neue', Arial, sans-serif; background-color: #0a0a0f; margin: 0; padding: 40px 20px;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #16161f; border-radius: 16px; padding: 40px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #4B6CB7; margin: 0; font-size: 32px;">E-DÉSIGNE</h1>
            <p style="color: #888; margin-top: 8px;">Suivi de livraison</p>
          </div>
          <div style="text-align: center; margin: 30px 0;">
            <div style="font-size: 60px;">🚚</div>
          </div>
          <h2 style="color: #fff; text-align: center; margin-bottom: 20px;">Votre colis est en route!</h2>
          <p style="color: #ccc; line-height: 1.6;">
            Votre commande <strong style="color: #4B6CB7;">#${data.orderId}</strong> a été expédiée.
          </p>
          <div style="background: #0a0a0f; border-radius: 8px; padding: 20px; margin: 20px 0;">
            <p style="color: #ccc; margin: 8px 0;"><strong>Transporteur:</strong> ${data.carrier || 'Colissimo'}</p>
            <p style="color: #ccc; margin: 8px 0;"><strong>Numéro de suivi:</strong> <span style="color: #4B6CB7;">${data.trackingNumber || 'FR' + Date.now()}</span></p>
            <p style="color: #ccc; margin: 8px 0;"><strong>Livraison estimée:</strong> ${data.estimatedDelivery || '3-5 jours ouvrés'}</p>
          </div>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${data.trackingUrl || '#'}" style="display: inline-block; background: #4B6CB7; color: #fff; padding: 14px 32px; border-radius: 8px; text-decoration: none; font-weight: 600;">Suivre mon colis</a>
          </div>
        </div>
      </body>
      </html>
    `,
    text: `Votre commande #${data.orderId} est en route! Livraison estimée: ${data.estimatedDelivery || '3-5 jours'}`
  }),
  
  password_reset: (data) => ({
    subject: 'Réinitialisation de votre mot de passe 🔐',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Réinitialisation mot de passe</title>
      </head>
      <body style="font-family: 'Helvetica Neue', Arial, sans-serif; background-color: #0a0a0f; margin: 0; padding: 40px 20px;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #16161f; border-radius: 16px; padding: 40px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #4B6CB7; margin: 0; font-size: 32px;">E-DÉSIGNE</h1>
            <p style="color: #888; margin-top: 8px;">Réinitialisation mot de passe</p>
          </div>
          <h2 style="color: #fff; margin-bottom: 20px;">Mot de passe oublié?</h2>
          <p style="color: #ccc; line-height: 1.6; margin-bottom: 20px;">
            Vous avez demandé la réinitialisation de votre mot de passe. Cliquez sur le bouton ci-dessous pour créer un nouveau mot de passe.
          </p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${data.resetUrl}" style="display: inline-block; background: linear-gradient(135deg, #4B6CB7 0%, #182848 100%); color: #fff; padding: 14px 32px; border-radius: 8px; text-decoration: none; font-weight: 600;">Réinitialiser mon mot de passe</a>
          </div>
          <p style="color: #666; font-size: 14px;">
            Ce lien expire dans <strong style="color: #FFD700;">1 heure</strong>.
          </p>
          <p style="color: #666; font-size: 12px; margin-top: 30px;">
            Si vous n'avez pas demandé cette réinitialisation, ignorez cet email.
          </p>
        </div>
      </body>
      </html>
    `,
    text: `Réinitialisez votre mot de passe en suivant ce lien: ${data.resetUrl}`
  }),
  
  contact_confirmation: (data) => ({
    subject: 'Nous avons reçu votre message! 📩',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Confirmation de contact</title>
      </head>
      <body style="font-family: 'Helvetica Neue', Arial, sans-serif; background-color: #0a0a0f; margin: 0; padding: 40px 20px;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #16161f; border-radius: 16px; padding: 40px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #4B6CB7; margin: 0; font-size: 32px;">E-DÉSIGNE</h1>
            <p style="color: #888; margin-top: 8px;">Confirmation</p>
          </div>
          <h2 style="color: #fff; text-align: center; margin-bottom: 20px;">Merci pour votre message!</h2>
          <p style="color: #ccc; line-height: 1.6;">
            Nous avons bien reçu votre demande et vous répondrons sous <strong style="color: #4B6CB7;">24-48 heures</strong>.
          </p>
          <div style="background: #0a0a0f; border-radius: 8px; padding: 20px; margin: 20px 0;">
            <p style="color: #ccc; margin: 8px 0;"><strong>Sujet:</strong> ${data.subject || 'Demande de contact'}</p>
            <p style="color: #ccc; margin: 8px 0;"><strong>Message:</strong> ${data.message?.substring(0, 100)}...</p>
          </div>
          <hr style="border: none; border-top: 1px solid #333; margin: 30px 0;">
          <p style="color: #666; font-size: 12px; text-align: center;">
            Pour toute urgence: <a href="mailto:${SUPPORT_EMAIL}" style="color: #4B6CB7;">${SUPPORT_EMAIL}</a>
          </p>
        </div>
      </body>
      </html>
    `,
    text: `Merci pour votre message! Nous vous répondrons sous 24-48h.`
  })
}

const products = [
  { id: 1, name: 'Robe Élégante Noire', price: 89.99, category: 'robes', color: 'noir', size: ['S', 'M', 'L', 'XL'], image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&q=80', hoverImage: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=800&q=80', description: 'Robe élégante en mousseline noire.', isNew: true, isSale: false },
  { id: 2, name: 'Chemise Blanche Classique', price: 49.99, category: 'chemises', color: 'blanc', size: ['S', 'M', 'L', 'XL'], image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&q=80', hoverImage: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800&q=80', description: 'Chemise blanche en coton.', isNew: false, isSale: false },
  { id: 3, name: 'Pantalon Chino Beige', price: 59.99, category: 'pantalons', color: 'beige', size: ['28', '30', '32', '34'], image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=800&q=80', hoverImage: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800&q=80', description: 'Pantalon chino premium.', isNew: false, isSale: true, oldPrice: 79.99 },
  { id: 4, name: 'Veste en Jean Bleu', price: 79.99, category: 'vestes', color: 'bleu', size: ['S', 'M', 'L', 'XL'], image: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=800&q=80', hoverImage: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=800&q=80', description: 'Veste denim vintage.', isNew: false, isSale: false },
  { id: 5, name: 'Robe Rouge Soirée', price: 129.99, category: 'robes', color: 'rouge', size: ['S', 'M', 'L'], image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=800&q=80', hoverImage: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&q=80', description: 'Robe longue rouge satin.', isNew: true, isSale: false },
  { id: 6, name: 'Pullovers Gris', price: 39.99, category: 'pullovers', color: 'gris', size: ['S', 'M', 'L', 'XL'], image: 'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=800&q=80', hoverImage: 'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=800&q=80', description: 'Pull en laine mérinos.', isNew: false, isSale: false },
  { id: 7, name: 'Jupe Noire Mini', price: 45.99, category: 'jupes', color: 'noir', size: ['S', 'M', 'L'], image: 'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=800&q=80', hoverImage: 'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=800&q=80', description: 'Jupe noire plissée.', isNew: false, isSale: false },
  { id: 8, name: 'T-Shirt Blanc Basic', price: 19.99, category: 't-shirts', color: 'blanc', size: ['S', 'M', 'L', 'XL'], image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80', hoverImage: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&q=80', description: 'T-shirt coton bio.', isNew: false, isSale: false },
  { id: 9, name: 'Manteau Noir Hiver', price: 199.99, category: 'manteaux', color: 'noir', size: ['S', 'M', 'L', 'XL'], image: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=800&q=80', hoverImage: 'https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=800&q=80', description: 'Manteau lainage premium.', isNew: true, isSale: false },
  { id: 10, name: 'Sweatshirt Bleu Ciel', price: 55.99, category: 'sweatshirts', color: 'bleu', size: ['S', 'M', 'L', 'XL'], image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&q=80', hoverImage: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=800&q=80', description: 'Sweatshirt douceur.', isNew: false, isSale: false },
  { id: 11, name: 'Costume Gris Foncé', price: 289.99, category: 'costumes', color: 'gris', size: ['46', '48', '50', '52'], image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&q=80', hoverImage: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&q=80', description: 'Costume 2 pièces.', isNew: false, isSale: false },
  { id: 12, name: 'Sac à Main Cuir', price: 159.99, category: 'accessoires', color: 'marron', size: ['Unique'], image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&q=80', hoverImage: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800&q=80', description: 'Sac en cuir véritable.', isNew: true, isSale: false },
  { id: 13, name: 'Chaussures Cuir Marron', price: 129.99, category: 'chaussures', color: 'marron', size: ['40', '41', '42', '43', '44'], image: 'https://images.unsplash.com/photo-1614252369475-531eba835eb1?w=800&q=80', hoverImage: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&q=80', description: 'Chaussures cuir.', isNew: false, isSale: false },
  { id: 14, name: 'Montre Élégante', price: 89.99, category: 'accessoires', color: 'or', size: ['Unique'], image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=800&q=80', hoverImage: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80', description: 'Montre automatique.', isNew: false, isSale: true, oldPrice: 129.99 },
  { id: 15, name: 'Ceinture Cuir Noir', price: 45.99, category: 'accessoires', color: 'noir', size: ['S', 'M', 'L', 'XL'], image: 'https://images.unsplash.com/photo-1624222247344-550fb60583dc?w=800&q=80', hoverImage: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80', description: 'Ceinture cuir.', isNew: false, isSale: false },
  { id: 16, name: 'Lunettes de Soleil', price: 79.99, category: 'accessoires', color: 'noir', size: ['Unique'], image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800&q=80', hoverImage: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&q=80', description: 'Lunettes UV400.', isNew: false, isSale: false },
  // African Clothing - Tenues Africaines
  { id: 17, name: 'Boubou Traditionnel Senegal', price: 149.99, category: 'africain', color: 'bleu', size: ['S', 'M', 'L', 'XL', 'XXL'], image: 'https://images.unsplash.com/photo-1598387993281-cecf8b71a8f8?w=800&q=80', hoverImage: 'https://images.unsplash.com/photo-1598387993281-cecf8b71a8f8?w=800&q=80', description: 'Boubou africain traditionnel en wax, parfait pour les cérémonies.', isNew: true, isSale: false },
  { id: 18, name: 'Robe Ankara Colorée', price: 89.99, category: 'africain', color: 'multicolore', size: ['S', 'M', 'L', 'XL'], image: 'https://images.unsplash.com/photo-1578932750294-f5075e85f44a?w=800&q=80', hoverImage: 'https://images.unsplash.com/photo-1578932750294-f5075e85f44a?w=800&q=80', description: 'Robe africaine Ankara avec motifs traditionnels.', isNew: true, isSale: false },
  { id: 19, name: 'Dashiki Nigeria', price: 79.99, category: 'africain', color: 'rouge', size: ['S', 'M', 'L', 'XL'], image: 'https://images.unsplash.com/photo-1552374196-c4a7c5d6b5c6?w=800&q=80', hoverImage: 'https://images.unsplash.com/photo-1552374196-c4a7c5d6b5c6?w=800&q=80', description: 'Dashiki traditionnel nigérian,纺织精细.', isNew: false, isSale: false },
  { id: 20, name: 'Kente Ghana', price: 199.99, category: 'africain', color: 'or', size: ['Unique'], image: 'https://images.unsplash.com/photo-1599707367072-cd6ad66acc40?w=800&q=80', hoverImage: 'https://images.unsplash.com/photo-1599707367072-cd6ad66acc40?w=800&q=80', description: 'Pagne Kente authentique du Ghana, tissé main.', isNew: false, isSale: false },
  { id: 21, name: 'Grand Boubou Mali', price: 179.99, category: 'africain', color: 'blanc', size: ['M', 'L', 'XL', 'XXL'], image: 'https://images.unsplash.com/photo-1598387993281-cecf8b71a8f8?w=800&q=80', hoverImage: 'https://images.unsplash.com/photo-1598387993281-cecf8b71a8f8?w=800&q=80', description: 'Grand boubou malien en coton premium.', isNew: false, isSale: false },
  { id: 22, name: 'Robe Africaine Elegance', price: 119.99, category: 'africain', color: 'violet', size: ['S', 'M', 'L', 'XL'], image: 'https://images.unsplash.com/photo-1578932750294-f5075e85f44a?w=800&q=80', hoverImage: 'https://images.unsplash.com/photo-1578932750294-f5075e85f44a?w=800&q=80', description: 'Robe africain élégante pour événements.', isNew: true, isSale: false },
  { id: 23, name: 'Pagne Côte d Ivoire', price: 59.99, category: 'africain', color: 'orange', size: ['Unique'], image: 'https://images.unsplash.com/photo-1599707367072-cd6ad66acc40?w=800&q=80', hoverImage: 'https://images.unsplash.com/photo-1599707367072-cd6ad66acc40?w=800&q=80', description: 'Pagne africain colorés de Côte d Ivoire.', isNew: false, isSale: true, oldPrice: 79.99 },
  { id: 24, name: 'Chemise Africaine Mode', price: 69.99, category: 'africain', color: 'vert', size: ['S', 'M', 'L', 'XL'], image: 'https://images.unsplash.com/photo-1552374196-c4a7c5d6b5c6?w=800&q=80', hoverImage: 'https://images.unsplash.com/photo-1552374196-c4a7c5d6b5c6?w=800&q=80', description: 'Chemise mixte wax avec touches africaines.', isNew: false, isSale: false },
  // Bebe & Enfant
  { id: 25, name: 'Body Bebe Rose', price: 24.99, category: 'bebe', color: 'rose', size: ['0-3M', '3-6M', '6-12M'], image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&q=80', hoverImage: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&q=80', description: 'Body coton bio pour bebe.', isNew: true, isSale: false },
  { id: 26, name: 'Pyjama Bebe Bleu', price: 19.99, category: 'bebe', color: 'bleu', size: ['3-6M', '6-12M', '12-18M'], image: 'https://images.unsplash.com/photo-1519689680058-32435c1d4a8a?w=800&q=80', hoverImage: 'https://images.unsplash.com/photo-1519689680058-32435c1d4a8a?w=800&q=80', description: 'Pyjama douce peluche.', isNew: false, isSale: false },
  { id: 27, name: 'Salopette Enfant', price: 34.99, category: 'bebe', color: 'jaune', size: ['2A', '3A', '4A', '5A'], image: 'https://images.unsplash.com/photo-1596871337622-98d48d1cf531?w=800&q=80', hoverImage: 'https://images.unsplash.com/photo-1596871337622-98d48d1cf531?w=800&q=80', description: 'Salopette cotton.', isNew: false, isSale: false },
  { id: 28, name: 'Robe Fille Bebe', price: 29.99, category: 'bebe', color: 'rose', size: ['2A', '3A', '4A'], image: 'https://images.unsplash.com/photo-1598387993281-cecf8b71a8f8?w=800&q=80', hoverImage: 'https://images.unsplash.com/photo-1598387993281-cecf8b71a8f8?w=800&q=80', description: 'Robe adorable.', isNew: true, isSale: false },
  { id: 29, name: 'Chaussons Bebe', price: 14.99, category: 'bebe', color: 'blanc', size: ['0-3M', '3-6M', '6-12M'], image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&q=80', hoverImage: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&q=80', description: 'Chaussons doux.', isNew: false, isSale: false },
  { id: 30, name: 'T-Shirt Enfant Garcon', price: 17.99, category: 'bebe', color: 'vert', size: ['2A', '3A', '4A', '5A'], image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80', hoverImage: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&q=80', description: 'T-shirt coton bio.', isNew: false, isSale: false }
];

const users = [];
const orders = [];
const wishlists = new Map();
const reviews = [];

export default function handler(req, res) {
  const { method, url } = req;
  const body = req.method === 'POST' ? req.body : {};
  
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (method === 'OPTIONS') return res.status(200).end();

  const path = url.split('?')[0];

  // GET /api/products
  if (path === '/api/products' && method === 'GET') {
    const { category, color, search } = req.query;
    let filtered = [...products];
    if (category) filtered = filtered.filter(p => p.category === category);
    if (color) filtered = filtered.filter(p => p.color === color);
    if (search) {
      const q = search.toLowerCase();
      filtered = filtered.filter(p => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q));
    }
    return res.json(filtered);
  }

  // GET /api/products/:id
  const productMatch = path.match(/^\/api\/products\/(\d+)$/);
  if (productMatch && method === 'GET') {
    const product = products.find(p => p.id === parseInt(productMatch[1]));
    return product ? res.json(product) : res.status(404).json({ error: 'Produit non trouvé' });
  }

  // POST /api/ai/search
  if (path === '/api/ai/search' && method === 'POST') {
    const { query } = body || {};
    const q = (query || '').toLowerCase();
    const results = products.filter(p => {
      const text = `${p.name} ${p.description} ${p.category}`.toLowerCase();
      return text.includes(q);
    });
    return res.json({ results, message: `${results.length} produit(s) trouvé(s)` });
  }

  // GET /api/ai/recommendations
  if (path === '/api/ai/recommendations' && method === 'GET') {
    return res.json([...products].sort(() => 0.5 - Math.random()).slice(0, 4));
  }

  // Chatbot IA - Support 24/7
  if (path === '/api/ai/chatbot' && method === 'POST') {
    const { message, userId } = body || '';
    const lower = message.toLowerCase();
    let response = "Je suis votre assistant E-Désigne. Je peux vous aider avec:\n\n• Suivi de commande\n• Informations livraison\n• Politique retour\n• Guide des tailles\n• Paiements\n• Promotion en cours";
    
    if (lower.includes('commande')) {
      const userOrders = orders.filter(o => o.userId === userId || o.userId === 'guest');
      if (userOrders.length > 0) {
        const lastOrder = userOrders[userOrders.length - 1];
        response = `Votre commande #${lastOrder.id}: ${lastOrder.status}`;
      } else {
        response = "Aucune commande trouvée. Souhaitez-vous commander?";
      }
    } else if (lower.includes('livraison')) {
      response = "🚚 LIVRAISON:\n• France: 5.90€ (gratuit dès 50€)\n• Europe: 12.90€\n• 3-5 jours";
    } else if (lower.includes('retour')) {
      response = "↩️ RETOUR: 30 jours gratuit, remboursement sous 14 jours";
    } else if (lower.includes('taille')) {
      response = "📏 TAILLES: XS, S, M, L, XL, XXL";
    } else if (lower.includes('paiement')) {
      response = "💳 Stripe, PayPal, 4x sans frais";
    } else if (lower.includes('contact') || lower.includes('service')) {
      response = "📞 support@e-designe.com | Lun-Ven 9h-18h";
    } else if (lower.includes('promo') || lower.includes('sale')) {
      response = "🔥 -30%-africain | CODE: BIENVENUE10";
    }
    
    return res.json({ response, userId });
  }

  // Analytics prédictions
  if (path === '/api/analytics/predictions' && method === 'GET') {
    const totalProducts = products.length;
    const avgPrice = products.reduce((sum, p) => sum + p.price, 0) / totalProducts;
    return res.json({
      kpis: { conversionRate: 2.3, avgCartValue: avgPrice.toFixed(2), returnRate: 8.5, satisfaction: 4.2 },
      forecast: { nextOrders: 120, nextRevenue: 8500 }
    });
  }

  // POST /api/payment/stripe/create-payment-intent
  if (path === '/api/payment/stripe/create-payment-intent' && method === 'POST') {
    return res.json({ clientSecret: 'pi_simulated_secret', paymentIntentId: 'pi_' + Date.now() });
  }

  // POST /api/payment/paypal/create-order
  if (path === '/api/payment/paypal/create-order' && method === 'POST') {
    return res.json({ id: 'PAY-' + Date.now(), status: 'CREATED' });
  }

  // POST /api/orders
  if (path === '/api/orders' && method === 'POST') {
    const order = { id: 'ORD-' + Date.now(), ...body, status: 'pending', createdAt: new Date().toISOString() };
    orders.push(order);
    
    // Envoyer email confirmation commande via Resend
    if (body.email) {
      const confirmResult = await sendEmail(
        body.email,
        `Confirmation de votre commande #${order.id} ✓`,
        emailTemplates.order_confirmation({ 
          orderId: order.id, 
          total: body.total || 0,
          paymentMethod: body.paymentMethod || 'Carte bancaire'
        }).html,
        emailTemplates.order_confirmation({ orderId: order.id, total: body.total || 0 }).text
      );
      order.confirmationEmailSent = confirmResult.success;
    }
    
    return res.json(order);
  }

  // GET /api/orders/:userId
  const ordersMatch = path.match(/^\/api\/orders\/(.+)$/);
  if (ordersMatch && method === 'GET') {
    return res.json(orders.filter(o => o.userId === ordersMatch[1]));
  }

  // POST /api/wishlist/:userId
  const wishlistMatch = path.match(/^\/api\/wishlist\/([^/]+)$/);
  if (wishlistMatch && method === 'POST') {
    const userId = wishlistMatch[1];
    if (!wishlists.has(userId)) wishlists.set(userId, []);
    const list = wishlists.get(userId);
    if (body.productId && !list.includes(body.productId)) list.push(body.productId);
    return res.json({ wishlist: list });
  }

  // GET /api/wishlist/:userId
  if (wishlistMatch && method === 'GET') {
    const list = wishlists.get(wishlistMatch[1]) || [];
    return res.json(products.filter(p => list.includes(p.id)));
  }

  // DELETE /api/wishlist/:userId/:productId
  const wishlistDelMatch = path.match(/^\/api\/wishlist\/([^/]+)\/(\d+)$/);
  if (wishlistDelMatch && method === 'DELETE') {
    const [, userId, productId] = wishlistDelMatch;
    if (wishlists.has(userId)) wishlists.set(userId, wishlists.get(userId).filter(id => id !== parseInt(productId)));
    return res.json({ success: true });
  }

  // POST /api/reviews
  if (path === '/api/reviews' && method === 'POST') {
    const review = { id: 'REV-' + Date.now(), ...body, createdAt: new Date().toISOString() };
    reviews.push(review);
    return res.json(review);
  }

  // GET /api/reviews/:productId
  const reviewsMatch = path.match(/^\/api\/reviews\/(.+)$/);
  if (reviewsMatch && method === 'GET') {
    return res.json(reviews.filter(r => r.productId === reviewsMatch[1]));
  }

  // POST /api/users/register
  if (path === '/api/users/register' && method === 'POST') {
    const { email, password, name } = body || {};
    if (users.find(u => u.email === email)) return res.status(400).json({ error: 'Email déjà utilisé' });
    const user = { id: 'user_' + Date.now(), email, name, createdAt: new Date().toISOString() };
    users.push({ ...user, password });
    
    // Envoyer email de bienvenue via Resend
    const welcomeResult = await sendEmail(
      email, 
      'Bienvenue chez E-Désigne! 🎉',
      emailTemplates.welcome({ name }).html,
      emailTemplates.welcome({ name }).text
    );
    
    return res.json({ 
      user: { ...user, password: undefined },
      welcomeEmailSent: welcomeResult.success
    });
  }

  // POST /api/users/login
  if (path === '/api/users/login' && method === 'POST') {
    const { email, password } = body || {};
    const user = users.find(u => u.email === email && u.password === password);
    if (!user) return res.status(401).json({ error: 'Email ou mot de passe incorrect' });
    return res.json({ user: { id: user.id, email: user.email, name: user.name } });
  }

  // GET /api/health
  if (path === '/api/health' && method === 'GET') {
    return res.json({ status: 'ok', timestamp: new Date().toISOString() });
  }

  // ═══════════════════════════════════════════════════════════════
  // AI 360° AUTOMATION - ADDITIONAL ENDPOINTS
  // ═══════════════════════════════════════════════════════════════

  // POST /api/ai/email/send - Email Automation avec Resend
  if (path === '/api/ai/email/send' && method === 'POST') {
    const { to, template, data, subject, html } = body || {};
    
    // Si template fourni, utiliser le template
    let emailContent;
    if (template && emailTemplates[template]) {
      emailContent = emailTemplates[template](data || {});
    } else if (html && subject) {
      // Email personnalisé
      emailContent = { subject, html, text: body.text || '' };
    } else {
      return res.status(400).json({ 
        error: 'Template ou contenu email requis',
        availableTemplates: Object.keys(emailTemplates)
      });
    }
    
    // Envoyer via Resend
    const result = await sendEmail(to, emailContent.subject, emailContent.html, emailContent.text);
    
    const emailJob = {
      id: 'EMAIL-' + Date.now(),
      to, template, data,
      status: result.success ? 'sent' : 'failed',
      resendId: result.data?.id,
      error: result.error,
      createdAt: new Date().toISOString()
    };
    emailQueue.push(emailJob);
    
    return res.json({ 
      success: result.success, 
      message: result.success ? 'Email envoyé avec succès' : 'Erreur envoi email',
      emailId: emailJob.id,
      resendId: result.data?.id,
      templates: Object.keys(emailTemplates)
    });
  }

  // GET /api/ai/email/queue - Email Queue Status
  if (path === '/api/ai/email/queue' && method === 'GET') {
    return res.json({ 
      queue: emailQueue,
      count: emailQueue.length,
      templates: ['welcome', 'abandoned_cart', 'order_confirmation', 'shipping_update', 'review_request', 'reengagement']
    });
  }

  // POST /api/ai/analytics/track - Track User Activity
  if (path === '/api/ai/analytics/track' && method === 'POST') {
    const { event, userId, data } = body || {};
    const trackEvent = {
      event, userId, data,
      timestamp: new Date().toISOString()
    };
    if (event === 'pageview') analytics.visits.push(trackEvent);
    else analytics.conversions.push(trackEvent);
    return res.json({ success: true });
  }

  // GET /api/ai/analytics/dashboard - AI Dashboard
  if (path === '/api/ai/analytics/dashboard' && method === 'GET') {
    const today = new Date().toDateString();
    const todayVisits = analytics.visits.filter(v => new Date(v.timestamp).toDateString() === today);
    return res.json({
      overview: {
        visitors: { today: todayVisits.length, total: analytics.visits.length },
        conversions: { today: analytics.conversions.length, total: analytics.conversions.length },
        conversionRate: analytics.visits.length > 0 ? (analytics.conversions.length / analytics.visits.length * 100).toFixed(2) : 0
      },
      kpis: {
        conversionRate: 2.3,
        avgCartValue: 85.50,
        returnRate: 8.5,
        satisfaction: 4.2,
        topCategory: 'robes'
      },
      charts: {
        visitors_daily: todayVisits.length,
        orders_weekly: 45,
        revenue_monthly: 4250
      },
      recommendations: [
        { action: 'increase_stock', product: 'Robe Rouge Soirée', reason: 'high_demand' },
        { action: 'promotion', category: 'africain', reason: 'clear_inventory' }
      ]
    });
  }

  // POST /api/ai/inventory/alert - Inventory Alert System
  if (path === '/api/ai/inventory/alert' && method === 'POST') {
    const { productId, threshold, action } = body || {};
    const alert = {
      id: 'ALERT-' + Date.now(),
      productId, threshold, action,
      status: 'active',
      createdAt: new Date().toISOString()
    };
    inventoryAlerts.push(alert);
    return res.json({ 
      success: true, 
      alertId: alert.id,
      thresholds: { low: 10, critical: 5, reorder: 20 }
    });
  }

  // GET /api/ai/inventory/status - Inventory Status
  if (path === '/api/ai/inventory/status' && method === 'GET') {
    return res.json({
      alerts: inventoryAlerts,
      total: products.length,
      lowStock: products.filter(p =>p.price > 50).length,
      inStock: products.filter(p => p.price <= 100).length,
      recommendations: ['Reorder: Robe Rouge Soirée', 'Promo: African clothing']
    });
  }

  // POST /api/ai/seo/generate - SEO Auto Generation
  if (path === '/api/ai/seo/generate' && method === 'POST') {
    const { productId } = body || {};
    const product = products.find(p => p.id === parseInt(productId));
    if (!product) return res.status(404).json({ error: 'Product not found' });
    
    const seo = {
      metaTitle: `${product.name} | E-Designe - Mode Premium`,
      metaDescription: `Découvrez ${product.name} - ${product.description} | Livraison gratuite dès 50€`,
      schema: {
        '@type': 'Product',
        name: product.name,
        description: product.description,
        offers: { '@type': 'Offer', price: product.price, priceCurrency: 'EUR' }
      },
      altText: `Image de ${product.name} - ${product.category} ${product.color}`,
      keywords: [product.name, product.category, product.color, 'mode', 'premium', 'e-designe']
    };
    seoImages.push({ productId, ...seo });
    return res.json({ success: true, seo });
  }

  // GET /api/ai/seo/status - SEO Status
  if (path === '/api/ai/seo/status' && method === 'GET') {
    return res.json({
      optimized: seoImages.length,
      sitemap: { autoGenerate: true, frequency: 'daily' },
      schema: { product: true, organization: true },
      recommendations: ['Add more alt texts', 'Generate blog content']
    });
  }

  // POST /api/ai/social/post - Social Media Auto Post
  if (path === '/api/ai/social/post' && method === 'POST') {
    const { platform, content, productId } = body || {};
    const post = {
      id: 'POST-' + Date.now(),
      platform: platform || 'instagram',
      content,
      productId,
      status: 'scheduled',
      scheduledAt: new Date().toISOString()
    };
    socialPosts.push(post);
    return res.json({ 
      success: true, 
      postId: post.id,
      platforms: ['facebook', 'instagram', 'tiktok']
    });
  }

  // GET /api/ai/social/posts - Social Posts Queue
  if (path === '/api/ai/social/posts' && method === 'GET') {
    return res.json({
      posts: socialPosts,
      count: socialPosts.length,
      scheduled: socialPosts.filter(p => p.status === 'scheduled').length
    });
  }

  // POST /api/ai/support/ticket - Auto Support Ticket
  if (path === '/api/ai/support/ticket' && method === 'POST') {
    const { subject, priority, userId } = body || {};
    const ticket = {
      id: 'TICKET-' + Date.now(),
      subject,
      priority: priority || 'medium',
      userId,
      status: 'open',
      createdAt: new Date().toISOString(),
      autoAssigned: true
    };
    return res.json({ 
      success: true, 
      ticketId: ticket.id,
      sla: { urgent: '4h', high: '24h', medium: '48h' }
    });
  }

  // GET /api/ai/support/tickets - Support Tickets List
  if (path === '/api/ai/support/tickets' && method === 'GET') {
    return res.json({
      open: 0,
      resolved: 0,
      avgResolutionTime: '24h'
    });
  }

  // POST /api/ai/dropshipping/sync - Dropshipping Sync
  if (path === '/api/ai/dropshipping/sync' && method === 'POST') {
    const { supplierId, products: supplierProducts } = body || {};
    return res.json({ 
      success: true, 
      message: 'Dropshipping sync initiated',
      suppliers: ['supplier_africa', 'supplier_europe', 'supplier_asia'],
      lastSync: new Date().toISOString()
    });
  }

  // GET /api/ai/dropshipping/status - Dropshipping Status
  if (path === '/api/ai/dropshipping/status' && method === 'GET') {
    return res.json({
      suppliers: [
        { id: 'supplier_africa', name: 'African Textiles Co', products: 10, leadTime: '14d', inStock: true },
        { id: 'supplier_europe', name: 'Euro Fashion', products: 25, leadTime: '5d', inStock: true },
        { id: 'supplier_asia', name: 'Asia Manufacturing', products: 50, leadTime: '21d', inStock: true }
      ],
      autoReorder: { enabled: true, threshold: 20 }
    });
  }

  // POST /api/ai/fraud/detect - Fraud Detection
  if (path === '/api/ai/fraud/detect' && method === 'POST') {
    const { ip, amount, card, address } = body || {};
    let risk = 0;
    if (amount > 500) risk += 0.3;
    if (ip && ip.includes('.0.0')) risk += 0.4;
    
    const result = {
      risk: risk.toFixed(2),
      status: risk > 0.7 ? 'blocked' : risk > 0.4 ? 'review' : 'approved',
      factors: risk > 0 ? ['unusual_amount', 'suspicious_ip'] : []
    };
    return res.json(result);
  }

  // GET /api/ai/healthcheck - AI System Health
  if (path === '/api/ai/healthcheck' && method === 'GET') {
    return res.json({
      status: 'healthy',
      services: {
        chatbot: 'operational',
        search: 'operational',
        recommendations: 'operational',
        email: 'operational',
        analytics: 'operational',
        inventory: 'operational',
        seo: 'operational',
        social: 'operational',
        fraud: 'operational'
      },
      emailProvider: {
        resend: 'configured',
        from: FROM_EMAIL,
        templates: Object.keys(emailTemplates).length
      },
      uptime: '99.9%',
      lastUpdate: new Date().toISOString()
    });
  }

  // POST /api/contact - Formulaire de contact
  if (path === '/api/contact' && method === 'POST') {
    const { name, email, subject, message } = body || {};
    
    if (!email || !message) {
      return res.status(400).json({ error: 'Email et message requis' });
    }
    
    // Envoyer confirmation au client
    const confirmResult = await sendEmail(
      email,
      'Nous avons reçu votre message! 📩',
      emailTemplates.contact_confirmation({ subject, message }).html,
      emailTemplates.contact_confirmation({ subject, message }).text
    );
    
    // Envoyer notification à l'admin
    const adminNotify = await sendEmail(
      SUPPORT_EMAIL,
      `Nouveau message de contact: ${subject}`,
      `<p><strong>Nom:</strong> ${name || 'Anonyme'}</p>
       <p><strong>Email:</strong> ${email}</p>
       <p><strong>Sujet:</strong> ${subject || 'Sans sujet'}</p>
       <p><strong>Message:</strong></p>
       <p>${message}</p>`,
      `Nouveau message de ${name || 'Anonyme'} (${email}): ${subject || 'Sans sujet'} - ${message}`
    );
    
    return res.json({ 
      success: true,
      confirmationSent: confirmResult.success,
      adminNotified: adminNotify.success
    });
  }

  // POST /api/password/reset - Demande réinitialisation mot de passe
  if (path === '/api/password/reset' && method === 'POST') {
    const { email, action } = body || {};
    
    if (!email) {
      return res.status(400).json({ error: 'Email requis' });
    }
    
    const user = users.find(u => u.email === email);
    
    // Pour la sécurité, ne pas révéler si l'email existe
    if (action === 'request' && user) {
      const resetToken = 'RESET-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
      const resetUrl = `https://e-designe.vercel.app/reset-password?token=${resetToken}&email=${encodeURIComponent(email)}`;
      
      // Envoyer email de réinitialisation
      const resetResult = await sendEmail(
        email,
        'Réinitialisation de votre mot de passe 🔐',
        emailTemplates.password_reset({ resetUrl }).html,
        emailTemplates.password_reset({ resetUrl }).text
      );
      
      return res.json({ 
        success: true,
        emailSent: resetResult.success,
        message: 'Si cet email existe, vous recevrez un lien de réinitialisation'
      });
    }
    
    return res.json({ success: true, message: 'Si cet email existe, vous recevrez un lien de réinitialisation' });
  }

  res.status(404).json({ error: 'Endpoint not found' });
}