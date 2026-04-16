import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});
app.use('/api/', limiter);

// In-memory data store (would be replaced by Firebase in production)
const products = [
  { id: 1, name: 'Robe Élégante Noire', price: 89.99, category: 'robes', color: 'noir', size: ['S', 'M', 'L', 'XL'], image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&q=80', hoverImage: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=800&q=80', description: 'Robe élégante en mousseline noire, parfaite pour vos soirées.', isNew: true, isSale: false },
  { id: 2, name: 'Chemise Blanche Classique', price: 49.99, category: 'chemises', color: 'blanc', size: ['S', 'M', 'L', 'XL'], image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&q=80', hoverImage: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800&q=80', description: 'Chemise blanche en coton égyptien, coupe slim.', isNew: false, isSale: false },
  { id: 3, name: 'Pantalon Chino Beige', price: 59.99, category: 'pantalons', color: 'beige', size: ['28', '30', '32', '34'], image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=800&q=80', hoverImage: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800&q=80', description: 'Pantalon chino en coton premium, coupe droite.', isNew: false, isSale: true, oldPrice: 79.99 },
  { id: 4, name: 'Veste en Jean Bleu', price: 79.99, category: 'vestes', color: 'bleu', size: ['S', 'M', 'L', 'XL'], image: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=800&q=80', hoverImage: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=800&q=80', description: 'Veste en denim Lavage medium, style vintage.', isNew: false, isSale: false },
  { id: 5, name: 'Robe Rouge Soirée', price: 129.99, category: 'robes', color: 'rouge', size: ['S', 'M', 'L'], image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=800&q=80', hoverImage: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&q=80', description: 'Robe longue rouge en satin, appropriée pour les grands événements.', isNew: true, isSale: false },
  { id: 6, name: 'Pullovers Gris', price: 39.99, category: 'pullovers', color: 'gris', size: ['S', 'M', 'L', 'XL'], image: 'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=800&q=80', hoverImage: 'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=800&q=80', description: 'Pull en laine mérinos, douceur extrême.', isNew: false, isSale: false },
  { id: 7, name: 'Jupe Noire Mini', price: 45.99, category: 'jupes', color: 'noir', size: ['S', 'M', 'L'], image: 'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=800&q=80', hoverImage: 'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=800&q=80', description: 'Jupe noire plissée, style moderne.', isNew: false, isSale: false },
  { id: 8, name: 'T-Shirt Blanc Basic', price: 19.99, category: 't-shirts', color: 'blanc', size: ['S', 'M', 'L', 'XL'], image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80', hoverImage: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&q=80', description: 'T-shirt en coton bio, coupe regular.', isNew: false, isSale: false },
  { id: 9, name: 'Manteau Noir Hiver', price: 199.99, category: 'manteaux', color: 'noir', size: ['S', 'M', 'L', 'XL'], image: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=800&q=80', hoverImage: 'https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=800&q=80', description: 'Manteau lainage premium, chaud et élégant.', isNew: true, isSale: false },
  { id: 10, name: 'Sweatshirt Bleu Ciel', price: 55.99, category: 'sweatshirts', color: 'bleu', size: ['S', 'M', 'L', 'XL'], image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&q=80', hoverImage: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=800&q=80', description: 'Sweatshirt douceur peluche, couleur tendances.', isNew: false, isSale: false },
  { id: 11, name: 'Costume Gris Foncé', price: 289.99, category: 'costumes', color: 'gris', size: ['46', '48', '50', '52'], image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&q=80', hoverImage: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&q=80', description: 'Costume 2 pièces, laine fine, coupe moderne.', isNew: false, isSale: false },
  { id: 12, name: 'Sac à Main Cuir', price: 159.99, category: 'accessoires', color: 'marron', size: ['Unique'], image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&q=80', hoverImage: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800&q=80', description: 'Sac en cuir véritable, qualité supérieure.', isNew: true, isSale: false },
  { id: 13, name: 'Chaussures Cuir Marron', price: 129.99, category: 'chaussures', color: 'marron', size: ['40', '41', '42', '43', '44'], image: 'https://images.unsplash.com/photo-1614252369475-531eba835eb1?w=800&q=80', hoverImage: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&q=80', description: 'Chaussures en cuir véritable, style classique.', isNew: false, isSale: false },
  { id: 14, name: 'Montre Élégante', price: 89.99, category: 'accessoires', color: 'or', size: ['Unique'], image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=800&q=80', hoverImage: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80', description: 'Montre automatique, étanche 50m.', isNew: false, isSale: true, oldPrice: 129.99 },
  { id: 15, name: 'Ceinture Cuir Noir', price: 45.99, category: 'accessoires', color: 'noir', size: ['S', 'M', 'L', 'XL'], image: 'https://images.unsplash.com/photo-1624222247344-550fb60583dc?w=800&q=80', hoverImage: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80', description: 'Ceinture en cuir véritable, boucle argent.', isNew: false, isSale: false },
  { id: 16, name: 'Lunettes de Soleil', price: 79.99, category: 'accessoires', color: 'noir', size: ['Unique'], image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800&q=80', hoverImage: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&q=80', description: 'Lunettes UV400, monture acetate.', isNew: false, isSale: false }
];

const users = [];
const orders = [];
const wishlists = new Map(); // userId -> array of productIds

// Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Products
app.get('/api/products', (req, res) => {
  const { category, color, minPrice, maxPrice, search } = req.query;
  let filtered = [...products];
  
  if (category) filtered = filtered.filter(p => p.category === category);
  if (color) filtered = filtered.filter(p => p.color === color);
  if (minPrice) filtered = filtered.filter(p => p.price >= parseFloat(minPrice));
  if (maxPrice) filtered = filtered.filter(p => p.price <= parseFloat(maxPrice));
  if (search) {
    const searchLower = search.toLowerCase();
    filtered = filtered.filter(p => 
      p.name.toLowerCase().includes(searchLower) || 
      p.description.toLowerCase().includes(searchLower)
    );
  }
  
  res.json(filtered);
});

app.get('/api/products/:id', (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (!product) return res.status(404).json({ error: 'Produit non trouvé' });
  res.json(product);
});

// Categories
app.get('/api/categories', (req, res) => {
  const categories = [...new Set(products.map(p => p.category))];
  res.json(categories);
});

// AI Search
app.post('/api/ai/search', async (req, res) => {
  const { query } = req.body;
  
  if (!query) return res.status(400).json({ error: 'Requête requise' });
  
  // Parse intelligent search
  const queryLower = query.toLowerCase();
  const filters = {
    color: null,
    category: null,
    size: null,
    price: null
  };
  
  // Extract colors
  const colors = ['noir', 'blanc', 'rouge', 'bleu', 'beige', 'gris'];
  for (const color of colors) {
    if (queryLower.includes(color)) filters.color = color;
  }
  
  // Extract categories
  const categories = ['robe', 'chemise', 'pantalon', 'veste', 'jupe', 'pullover', 't-shirt'];
  for (const cat of categories) {
    if (queryLower.includes(cat)) filters.category = cat;
  }
  
  // Extract sizes
  const sizes = ['S', 'M', 'L', 'XL', 'XS'];
  for (const size of sizes) {
    if (queryLower.includes(size)) filters.size = size;
  }
  
  // Apply filters
  let results = [...products];
  if (filters.color) results = results.filter(p => p.color === filters.color);
  if (filters.category) results = results.filter(p => p.category === filters.category);
  if (filters.size) results = results.filter(p => p.size.includes(filters.size));
  
  // If no matches, return all products
  if (results.length === 0) results = products;
  
  res.json({
    results,
    filters: filters,
    originalQuery: query
  });
});

// AI Recommendations
app.post('/api/ai/recommend', (req, res) => {
  const { userId, viewedProducts = [] } = req.body;
  
  // Simple recommendation based on viewed products
  let recommendations = [...products];
  
  if (viewedProducts.length > 0) {
    const viewedCategories = products
      .filter(p => viewedProducts.includes(p.id))
      .map(p => p.category);
    
    recommendations = products
      .filter(p => viewedCategories.includes(p.category))
      .sort(() => Math.random() - 0.5)
      .slice(0, 4);
  }
  
  res.json(recommendations);
});

// Chatbot
app.post('/api/ai/chat', (req, res) => {
  const { message, context = {} } = req.body;
  
  const messageLower = message.toLowerCase();
  let response = '';
  
  if (messageLower.includes('commande') || messageLower.includes('suivi')) {
    response = 'Pour suivre votre commande, rendez-vous dans la section "Mon Compte" > "Mes Commandes". Vous trouverez votre numéro de suivi ahí.';
  } else if (messageLower.includes('retour') || messageLower.includes('échange')) {
    response = 'Nous acceptons les retours sous 30 jours. Veuillez contacter notre service client pour initier un retour.';
  } else if (messageLower.includes('paiement') || messageLower.includes('payer')) {
    response = 'Nous acceptons les paiements par carte bancaire (Stripe) et PayPal. Tous les paiements sont sécurisés.';
  } else if (messageLower.includes('taille') || messageLower.includes('guide')) {
    response = 'Consultez notre guide des tailles sur chaque page produit. Nous proposons les tailles XS à XL.';
  } else if (messageLower.includes('contact') || messageLower.includes('aide')) {
    response = 'Vous pouvez nous contacter par email à support@stylhub.com ou via le chat en direct.';
  } else {
    response = 'Je suis votre assistant Stylhub. Je peux vous aider avec les commandes, les tailles, les paiements ou les retours. Que souhaitez-vous savoir?';
  }
  
  res.json({ response, timestamp: new Date().toISOString() });
});

// Stripe Payment
app.post('/api/payment/stripe/create-intent', async (req, res) => {
  const { amount, currency = 'eur' } = req.body;
  
  // In production, use actual Stripe API
  // const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
  
  const paymentIntent = {
    id: 'pi_' + Math.random().toString(36).substr(2, 9),
    amount: Math.round(amount * 100),
    currency,
    status: 'requires_payment_method'
  };
  
  res.json({
    clientSecret: paymentIntent.id + '_secret_' + Math.random().toString(36).substr(2, 9),
    paymentIntentId: paymentIntent.id
  });
});

// PayPal Payment
app.post('/api/payment/paypal/create-order', async (req, res) => {
  const { amount, currency = 'USD' } = req.body;
  
  const order = {
    id: 'PAY-' + Math.random().toString(36).substr(2, 9).toUpperCase(),
    status: 'CREATED',
    amount: { currency_code: currency.toUpperCase(), value: amount.toFixed(2) }
  };
  
  res.json(order);
});

// Orders
app.post('/api/orders', (req, res) => {
  const { userId, items, total, paymentMethod, shipping } = req.body;
  
  const order = {
    id: 'ORD-' + Date.now(),
    userId: userId || 'guest',
    items,
    total,
    paymentMethod,
    shipping: shipping || {},
    status: 'pending',
    createdAt: new Date().toISOString()
  };
  
  orders.push(order);
  res.json(order);
});

app.get('/api/orders/:userId', (req, res) => {
  const userOrders = orders.filter(o => o.userId === req.params.userId);
  res.json(userOrders);
});

// Wishlist
app.post('/api/wishlist/:userId', (req, res) => {
  const { productId } = req.body;
  const userId = req.params.userId;
  
  if (!wishlists.has(userId)) {
    wishlists.set(userId, []);
  }
  
  const list = wishlists.get(userId);
  if (!list.includes(productId)) {
    list.push(productId);
  }
  
  res.json({ wishlist: list });
});

app.delete('/api/wishlist/:userId/:productId', (req, res) => {
  const userId = req.params.userId;
  const productId = parseInt(req.params.productId);
  
  if (wishlists.has(userId)) {
    const list = wishlists.get(userId).filter(id => id !== productId);
    wishlists.set(userId, list);
  }
  
  res.json({ success: true });
});

app.get('/api/wishlist/:userId', (req, res) => {
  const userId = req.params.userId;
  const list = wishlists.get(userId) || [];
  
  // Get full product details
  const wishlistProducts = products.filter(p => list.includes(p.id));
  res.json(wishlistProducts);
});

// Reviews
const reviews = [];

app.post('/api/reviews', (req, res) => {
  const { productId, userId, userName, rating, comment } = req.body;
  
  const review = {
    id: 'REV-' + Date.now(),
    productId,
    userId,
    userName,
    rating,
    comment,
    createdAt: new Date().toISOString()
  };
  
  reviews.push(review);
  res.json(review);
});

app.get('/api/reviews/:productId', (req, res) => {
  const productReviews = reviews.filter(r => r.productId === req.params.productId);
  res.json(productReviews);
});

// Users (simplified)
app.post('/api/users/register', (req, res) => {
  const { email, password, name } = req.body;
  
  if (users.find(u => u.email === email)) {
    return res.status(400).json({ error: 'Email déjà utilisé' });
  }
  
  const user = {
    id: 'user_' + Date.now(),
    email,
    name,
    createdAt: new Date().toISOString()
  };
  
  users.push(user);
  res.json({ user, token: 'jwt-token-placeholder' });
});

app.post('/api/users/login', (req, res) => {
  const { email, password } = req.body;
  
  const user = users.find(u => u.email === email);
  if (!user) {
    return res.status(401).json({ error: 'Identifiants invalides' });
  }
  
  res.json({ user, token: 'jwt-token-placeholder' });
});

// Webhook endpoint (placeholder)
app.post('/api/webhooks/stripe', (req, res) => {
  console.log('Stripe webhook received:', req.body.type);
  res.json({ received: true });
});

app.listen(PORT, () => {
  console.log(`🚀 Stylhub API running on port ${PORT}`);
});

export default app;