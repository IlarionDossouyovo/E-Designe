import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';

// Import database services (Supabase or Firebase)
import { supabaseHelpers } from './supabase.js';

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

// ============== PRODUITS CLASÉS PAR CATÉGORIES ==============
// In-memory data store (would be replaced by Firebase in production)
const products = [
  // ===== ROBES =====
  { id: 1, name: 'Robe Élégante Noire', price: 89.99, category: 'robes', subcategory: 'robe-soiree', color: 'noir', size: ['S', 'M', 'L', 'XL'], image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&q=80', hoverImage: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=800&q=80', description: 'Robe élégante en mousseline noire, parfaite pour vos soirées.', isNew: true, isSale: false, brand: 'E-Designe' },
  { id: 2, name: 'Robe Rouge Soirée', price: 129.99, category: 'robes', subcategory: 'robe-soiree', color: 'rouge', size: ['S', 'M', 'L'], image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=800&q=80', hoverImage: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&q=80', description: 'Robe longue rouge en satin, appropriée pour les grands événements.', isNew: true, isSale: false, brand: 'E-Designe' },
  { id: 3, name: 'Robe Fleurie Été', price: 69.99, category: 'robes', subcategory: 'robe-casual', color: 'multicolore', size: ['S', 'M', 'L', 'XL'], image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800&q=80', hoverImage: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&q=80', description: 'Robe légère à fleurs pour lété.', isNew: false, isSale: true, oldPrice: 89.99, brand: 'Zara' },
  { id: 4, name: 'Robe Noire Midi', price: 79.99, category: 'robes', subcategory: 'robe-casual', color: 'noir', size: ['S', 'M', 'L'], image: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=800&q=80', hoverImage: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=800&q=80', description: 'Robe noire coupe midi élégante.', isNew: false, isSale: false, brand: 'Mango' },
  
  // ===== CHEMISES =====
  { id: 5, name: 'Chemise Blanche Classique', price: 49.99, category: 'chemises', subcategory: 'chemise-classique', color: 'blanc', size: ['S', 'M', 'L', 'XL'], image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&q=80', hoverImage: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800&q=80', description: 'Chemise blanche en coton égyptien, coupe slim.', isNew: false, isSale: false, brand: 'Ralph Lauren' },
  { id: 6, name: 'Chemise Bleu ciel', price: 45.99, category: 'chemises', subcategory: 'chemise-casual', color: 'bleu', size: ['S', 'M', 'L', 'XL'], image: 'https://images.unsplash.com/photo-1598033129183-c4cf850751da?w=800&q=80', hoverImage: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&q=80', description: 'Chemise légère bleu ciel en lin.', isNew: false, isSale: false, brand: 'Tommy Hilfiger' },
  { id: 7, name: 'Chemise Noire Manches Longues', price: 55.99, category: 'chemises', subcategory: 'chemise-classique', color: 'noir', size: ['S', 'M', 'L', 'XL'], image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800&q=80', hoverImage: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&q=80', description: 'Chemise noire elegante.', isNew: true, isSale: false, brand: 'Hugo Boss' },
  
  // ===== PANTALONS =====
  { id: 8, name: 'Pantalon Chino Beige', price: 59.99, category: 'pantalons', subcategory: 'chino', color: 'beige', size: ['28', '30', '32', '34'], image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=800&q=80', hoverImage: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800&q=80', description: 'Pantalon chino en coton premium, coupe droite.', isNew: false, isSale: true, oldPrice: 79.99, brand: 'Levi\'s' },
  { id: 9, name: 'Jean Slim Noir', price: 69.99, category: 'pantalons', subcategory: 'jean', color: 'noir', size: ['28', '30', '32', '34', '36'], image: 'https://images.unsplash.com/photo-1542272604-787c62755385?w=800&q=80', hoverImage: 'https://images.unsplash.com/photo-1542272454315-4c01d7abdf4a?w=800&q=80', description: 'Jean slim fit noir.', isNew: false, isSale: false, brand: 'Levi\'s' },
  { id: 10, name: 'Pantalon Dress Gris', price: 79.99, category: 'pantalons', subcategory: 'dress', color: 'gris', size: ['30', '32', '34', '36'], image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&q=80', hoverImage: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&q=80', description: 'Pantalon de costume gris élégant.', isNew: false, isSale: false, brand: 'Brooks Brothers' },
  
  // ===== VESTES =====
  { id: 11, name: 'Veste en Jean Bleu', price: 79.99, category: 'vestes', subcategory: 'denim', color: 'bleu', size: ['S', 'M', 'L', 'XL'], image: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=800&q=80', hoverImage: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=800&q=80', description: 'Veste en denim Lavage medium, style vintage.', isNew: false, isSale: false, brand: 'Lee' },
  { id: 12, name: 'Veste Coupe Noir', price: 149.99, category: 'vestes', subcategory: 'blazer', color: 'noir', size: ['46', '48', '50', '52'], image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&q=80', hoverImage: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&q=80', description: 'Blazer noir elegant.', isNew: true, isSale: false, brand: 'Armani' },
  { id: 13, name: 'Doudoune Noire', price: 189.99, category: 'vestes', subcategory: 'doudoune', color: 'noir', size: ['S', 'M', 'L', 'XL'], image: 'https://images.unsplash.com/photo-1544923243-46e2e8e4e846?w=800&q=80', hoverImage: 'https://images.unsplash.com/photo-1544923243-46e2e8e4e846?w=800&q=80', description: 'Doudoune légère et chaude.', isNew: false, isSale: false, brand: 'Nike' },
  
  // ===== JUPES =====
  { id: 14, name: 'Jupe Noire Mini', price: 45.99, category: 'jupes', subcategory: 'mini', color: 'noir', size: ['S', 'M', 'L'], image: 'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=800&q=80', hoverImage: 'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=800&q=80', description: 'Jupe noire plissée, style moderne.', isNew: false, isSale: false, brand: 'Zara' },
  { id: 15, name: 'Jupe Plissée Beige', price: 49.99, category: 'jupes', subcategory: 'longue', color: 'beige', size: ['S', 'M', 'L'], image: 'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=800&q=80', hoverImage: 'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=800&q=80', description: 'Jupe plissée beige élégante.', isNew: false, isSale: false, brand: 'Massimo Dutti' },
  
  // ===== T-SHIRTS =====
  { id: 16, name: 'T-Shirt Blanc Basic', price: 19.99, category: 't-shirts', subcategory: 'tshirt-basic', color: 'blanc', size: ['S', 'M', 'L', 'XL'], image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80', hoverImage: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&q=80', description: 'T-shirt en coton bio, coupe regular.', isNew: false, isSale: false, brand: 'H&M' },
  { id: 17, name: 'T-Shirt Noir Logo', price: 24.99, category: 't-shirts', subcategory: 'tshirt-basic', color: 'noir', size: ['S', 'M', 'L', 'XL'], image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&q=80', hoverImage: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80', description: 'T-shirt noir avec logo.', isNew: false, isSale: false, brand: 'Calvin Klein' },
  
  // ===== PULOVERS & GILETS =====
  { id: 18, name: 'Pullover Gris', price: 39.99, category: 'pullovers', subcategory: 'pull', color: 'gris', size: ['S', 'M', 'L', 'XL'], image: 'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=800&q=80', hoverImage: 'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=800&q=80', description: 'Pull en laine mérinos, douceur extrême.', isNew: false, isSale: false, brand: 'Lacoste' },
  { id: 19, name: 'Cardigan Beige', price: 69.99, category: 'pullovers', subcategory: 'cardigan', color: 'beige', size: ['S', 'M', 'L', 'XL'], image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3109?w=800&q=80', hoverImage: 'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=800&q=80', description: 'Cardigan en cachemire.', isNew: true, isSale: false, brand: 'Ralph Lauren' },
  
  // ===== SWEATSHIRTS =====
  { id: 20, name: 'Sweatshirt Bleu Ciel', price: 55.99, category: 'sweatshirts', subcategory: 'sweat-capuche', color: 'bleu', size: ['S', 'M', 'L', 'XL'], image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&q=80', hoverImage: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=800&q=80', description: 'Sweatshirt douceur peluche, couleur tendances.', isNew: false, isSale: false, brand: 'Adidas' },
  { id: 21, name: 'Sweat Noir Capuche', price: 65.99, category: 'sweatshirts', subcategory: 'sweat-capuche', color: 'noir', size: ['S', 'M', 'L', 'XL', 'XXL'], image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=800&q=80', hoverImage: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&q=80', description: 'Sweat à capuche noir.', isNew: false, isSale: true, oldPrice: 79.99, brand: 'Nike' },
  
  // ===== MANTEAUX =====
  { id: 22, name: 'Manteau Noir Hiver', price: 199.99, category: 'manteaux', subcategory: 'manteau-winter', color: 'noir', size: ['S', 'M', 'L', 'XL'], image: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=800&q=80', hoverImage: 'https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=800&q=80', description: 'Manteau lainage premium, chaud et élégant.', isNew: true, isSale: false, brand: 'Hugo Boss' },
  { id: 23, name: 'Trench Beige', price: 179.99, category: 'manteaux', subcategory: 'trench', color: 'beige', size: ['S', 'M', 'L', 'XL'], image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&q=80', hoverImage: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=800&q=80', description: 'Trench classique beige.', isNew: false, isSale: false, brand: 'Burberry' },
  
  // ===== COSTUMES =====
  { id: 24, name: 'Costume Gris Foncé', price: 289.99, category: 'costumes', subcategory: 'costume-complet', color: 'gris', size: ['46', '48', '50', '52'], image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&q=80', hoverImage: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&q=80', description: 'Costume 2 pièces, laine fine, coupe moderne.', isNew: false, isSale: false, brand: 'Hugo Boss' },
  { id: 25, name: 'Costume Noir Mariage', price: 349.99, category: 'costumes', subcategory: 'costume-complet', color: 'noir', size: ['46', '48', '50', '52', '54'], image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&q=80', hoverImage: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&q=80', description: 'Costume mariage noir premium.', isNew: false, isSale: false, brand: 'Armani' },
  
  // ===== SAC & MAROQUINERIE =====
  { id: 26, name: 'Sac à Main Cuir', price: 159.99, category: 'accessoires', subcategory: 'sacs', color: 'marron', size: ['Unique'], image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&q=80', hoverImage: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800&q=80', description: 'Sac en cuir véritable, qualité supérieure.', isNew: true, isSale: false, brand: 'Coach' },
  { id: 27, name: 'Sac à Dos Cuir Noir', price: 129.99, category: 'accessoires', subcategory: 'sacs', color: 'noir', size: ['Unique'], image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800&q=80', hoverImage: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&q=80', description: 'Sac à dos en cuir.', isNew: false, isSale: false, brand: 'Eastpak' },
  { id: 28, name: 'Sac Bandoulière', price: 89.99, category: 'accessoires', subcategory: 'sacs', color: 'marron', size: ['Unique'], image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800&q=80', hoverImage: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&q=80', description: 'Sac bandoulière cuir.', isNew: false, isSale: true, oldPrice: 119.99, brand: 'Fossil' },
  
  // ===== CEINTURES =====
  { id: 29, name: 'Ceinture Cuir Noir', price: 45.99, category: 'accessoires', subcategory: 'ceintures', color: 'noir', size: ['S', 'M', 'L', 'XL'], image: 'https://images.unsplash.com/photo-1624222247344-550fb60583dc?w=800&q=80', hoverImage: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80', description: 'Ceinture en cuir véritable, boucle argent.', isNew: false, isSale: false, brand: 'Levi\'s' },
  { id: 30, name: 'Ceinture Cuir Marron', price: 45.99, category: 'accessoires', subcategory: 'ceintures', color: 'marron', size: ['S', 'M', 'L', 'XL'], image: 'https://images.unsplash.com/photo-1624222247344-550fb60583dc?w=800&q=80', hoverImage: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80', description: 'Ceinture cuir marron boucle laiton.', isNew: false, isSale: false, brand: 'Tommy Hilfiger' },
  
  // ===== MONTRES =====
  { id: 31, name: 'Montre Élégante Or', price: 89.99, category: 'accessoires', subcategory: 'montres', color: 'or', size: ['Unique'], image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=800&q=80', hoverImage: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80', description: 'Montre automatique, étanche 50m.', isNew: false, isSale: true, oldPrice: 129.99, brand: 'Seiko' },
  { id: 32, name: 'Montre Sport Noir', price: 149.99, category: 'accessoires', subcategory: 'montres', color: 'noir', size: ['Unique'], image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80', hoverImage: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=800&q=80', description: 'Montre sport chrono.', isNew: true, isSale: false, brand: 'Apple' },
  { id: 33, name: 'Montre Classic Argent', price: 199.99, category: 'accessoires', subcategory: 'montres', color: 'argent', size: ['Unique'], image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80', hoverImage: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=800&q=80', description: 'Montre classic argent.', isNew: false, isSale: false, brand: 'Seiko' },
  
  // ===== LUNETTES =====
  { id: 34, name: 'Lunettes de Soleil Noir', price: 79.99, category: 'accessoires', subcategory: 'lunettes', color: 'noir', size: ['Unique'], image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800&q=80', hoverImage: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&q=80', description: 'Lunettes UV400, monture acetate.', isNew: false, isSale: false, brand: 'Ray-Ban' },
  { id: 35, name: 'Lunettes de Soleil Dorées', price: 99.99, category: 'accessoires', subcategory: 'lunettes', color: 'or', size: ['Unique'], image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&q=80', hoverImage: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800&q=80', description: 'Lunettes de soleil dorées vintage.', isNew: false, isSale: false, brand: 'Warby Parker' },
  { id: 36, name: 'Lunettes de Vue', price: 59.99, category: 'accessoires', subcategory: 'lunettes', color: 'noir', size: ['Unique'], image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800&q=80', hoverImage: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&q=80', description: 'Lunettes de vue modernes.', isNew: false, isSale: false, brand: 'Warby Parker' },
  
  // ===== CHAUSSURES =====
  { id: 37, name: 'Chaussures Cuir Marron', price: 129.99, category: 'chaussures', subcategory: 'chaussures-ville', color: 'marron', size: ['40', '41', '42', '43', '44'], image: 'https://images.unsplash.com/photo-1614252369475-531eba835eb1?w=800&q=80', hoverImage: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&q=80', description: 'Chaussures en cuir véritable, style classique.', isNew: false, isSale: false, brand: 'Clarks' },
  { id: 38, name: 'Sneakers Blanc', price: 89.99, category: 'chaussures', subcategory: 'sneakers', color: 'blanc', size: ['40', '41', '42', '43', '44', '45'], image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&q=80', hoverImage: 'https://images.unsplash.com/photo-1614252369475-531eba835eb1?w=800&q=80', description: 'Sneakers leather blanc.', isNew: true, isSale: false, brand: 'Nike' },
  { id: 39, name: 'Basket Noir', price: 109.99, category: 'chaussures', subcategory: 'sneakers', color: 'noir', size: ['40', '41', '42', '43', '44'], image: 'https://images.unsplash.com/photo-1460353581641-37baddd0b9c3?w=800&q=80', hoverImage: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&q=80', description: 'Basket streetwear noir.', isNew: false, isSale: true, oldPrice: 139.99, brand: 'Adidas' },
  { id: 40, name: 'Chaussures Ville Noir', price: 119.99, category: 'chaussures', subcategory: 'chaussures-ville', color: 'noir', size: ['40', '41', '42', '43', '44'], image: 'https://images.unsplash.com/photo-1614252369475-531eba835eb1?w=800&q=80', hoverImage: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&q=80', description: 'Chaussures de ville noir.', isNew: false, isSale: false, brand: 'Hugo Boss' },
  { id: 41, name: 'Mocassins Cuir', price: 89.99, category: 'chaussures', subcategory: 'mocassins', color: 'marron', size: ['40', '41', '42', '43', '44'], image: 'https://images.unsplash.com/photo-1614252369475-531eba835eb1?w=800&q=80', hoverImage: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&q=80', description: 'Mocassins en cuir souple.', isNew: false, isSale: false, brand: 'Gucci' },
  
  // ===== BIJOUX =====
  { id: 42, name: 'Collier Or', price: 45.99, category: 'accessoires', subcategory: 'bijoux', color: 'or', size: ['Unique'], image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&q=80', hoverImage: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&q=80', description: 'Collier en or 18k.', isNew: false, isSale: false, brand: 'Swarovski' },
  { id: 43, name: 'Bracelet Cuir', price: 29.99, category: 'accessoires', subcategory: 'bijoux', color: 'marron', size: ['Unique'], image: 'https://images.unsplash.com/photo-1602751584552-8a43e70a4458?w=800&q=80', hoverImage: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&q=80', description: 'Bracelet cuir tressé.', isNew: false, isSale: false, brand: 'Fossil' },
  { id: 44, name: 'Boucles d\'Oreilles', price: 34.99, category: 'accessoires', subcategory: 'bijoux', color: 'argent', size: ['Unique'], image: 'https://images.unsplash.com/photo-1535632066927-7c0e2dbbafd3?w=800&q=80', hoverImage: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&q=80', description: 'Boucles d\'oreilles argent.', isNew: false, isSale: false, brand: 'Pandora' },
  
  // ===== ÉCHARPES & FOULARDS =====
  { id: 45, name: 'Écharpe Laine', price: 49.99, category: 'accessoires', subcategory: 'echarpes', color: 'gris', size: ['Unique'], image: 'https://images.unsplash.com/photo-1520903920243-00d872a2d1c8?w=800&q=80', hoverImage: 'https://images.unsplash.com/photo-1520903920243-00d872a2d1c8?w=800&q=80', description: 'Écharpe en laine mérinos.', isNew: false, isSale: false, brand: 'Acne Studios' },
  { id: 46, name: 'Foulard Soie', price: 39.99, category: 'accessoires', subcategory: 'echarpes', color: 'multicolore', size: ['Unique'], image: 'https://images.unsplash.com/photo-1584030373081-f37b7bb4fa6e?w=800&q=80', hoverImage: 'https://images.unsplash.com/photo-1520903920243-00d872a2d1c8?w=800&q=80', description: 'Foulard en soie printed.', isNew: false, isSale: false, brand: 'Hermès' },
  { id: 47, name: 'Chèche Solide', price: 19.99, category: 'accessoires', subcategory: 'echarpes', color: 'noir', size: ['Unique'], image: 'https://images.unsplash.com/photo-1520903920243-00d872a2d1c8?w=800&q=80', hoverImage: 'https://images.unsplash.com/photo-1584030373081-f37b7bb4fa6e?w=800&q=80', description: 'Chècheurban.', isNew: false, isSale: false, brand: 'Adidas' },
  
  // ===== GANTS =====
  { id: 48, name: 'Gants Cuir Noir', price: 35.99, category: 'accessoires', subcategory: 'gants', color: 'noir', size: ['S', 'M', 'L'], image: 'https://images.unsplash.com/photo-1535632066927-7c0e2dbbafd3?w=800&q=80', hoverImage: 'https://images.unsplash.com/photo-1535632066927-7c0e2dbbafd3?w=800&q=80', description: 'Gants cuir véritable.', isNew: false, isSale: false, brand: 'Hugo Boss' },
  { id: 49, name: 'Gants Lainage', price: 24.99, category: 'accessoires', subcategory: 'gants', color: 'gris', size: ['S', 'M', 'L', 'XL'], image: 'https://images.unsplash.com/photo-1535632066927-7c0e2dbbafd3?w=800&q=80', hoverImage: 'https://images.unsplash.com/photo-1535632066927-7c0e2dbbafd3?w=800&q=80', description: 'Gants hiver lainage.', isNew: false, isSale: false, brand: 'H&M' },
  
  // ===== CHAPEAUX =====
  { id: 50, name: 'Chapeau Fedora', price: 59.99, category: 'accessoires', subcategory: 'chapeaux', color: 'marron', size: ['Unique'], image: 'https://images.unsplash.com/photo-1514327605112-b887c0e61c0a?w=800&q=80', hoverImage: 'https://images.unsplash.com/photo-1514327605112-b887c0e61c0a?w=800&q=80', description: 'Fedora cuir.', isNew: true, isSale: false, brand: 'Brixton' },
  { id: 51, name: 'Casquette Noir', price: 24.99, category: 'accessoires', subcategory: 'chapeaux', color: 'noir', size: ['Unique'], image: 'https://images.unsplash.com/photo-1514327605112-b887c0e61c0a?w=800&q=80', hoverImage: 'https://images.unsplash.com/photo-1514327605112-b887c0e61c0a?w=800&q=80', description: 'Casquette baseball.', isNew: false, isSale: false, brand: 'New Era' },
  { id: 52, name: 'Bonnet Laine', price: 19.99, category: 'accessoires', subcategory: 'chapeaux', color: 'noir', size: ['Unique'], image: 'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=800&q=80', hoverImage: 'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=800&q=80', description: 'Bonnetwinter.', isNew: false, isSale: false, brand: 'Carhartt' }
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