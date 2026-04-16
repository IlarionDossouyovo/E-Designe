// E-Désigne API - Vercel Serverless Function
// Deploys as: https://e-designe.vercel.app/api/*

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
  { id: 24, name: 'Chemise Africaine Mode', price: 69.99, category: 'africain', color: 'vert', size: ['S', 'M', 'L', 'XL'], image: 'https://images.unsplash.com/photo-1552374196-c4a7c5d6b5c6?w=800&q=80', hoverImage: 'https://images.unsplash.com/photo-1552374196-c4a7c5d6b5c6?w=800&q=80', description: 'Chemise mixte wax avec touches africaines.', isNew: false, isSale: false }
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

  // POST /api/ai/chatbot
  if (path === '/api/ai/chatbot' && method === 'POST') {
    const { message } = body || '';
    const lower = message.toLowerCase();
    let response = "Je suis votre assistant E-Désigne.";
    if (lower.includes('livraison')) response = "Livraison gratuite dès 50€.";
    else if (lower.includes('retour')) response = "30 jours pour retourner.";
    else if (lower.includes('taille')) response = "Guide des tailles disponible.";
    else if (lower.includes('paiement')) response = "Stripe, PayPal acceptés.";
    return res.json({ response });
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
    return res.json({ user: { ...user, password: undefined } });
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
    return res.json({ status: 'ok' });
  }

  res.status(404).json({ error: 'Endpoint not found' });
}