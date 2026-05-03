// Firebase Database Service
// Ce fichier initialise la connexion à Firebase Firestore

import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import dotenv from 'dotenv';

dotenv.config();

const serviceAccount = {
  type: 'service_account',
  project_id: process.env.FIREBASE_PROJECT_ID || 'e-designe-app',
  private_key: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  client_email: process.env.FIREBASE_CLIENT_EMAIL,
};

// Initialize Firebase only if not already initialized
let db = null;
let app = null;

if (getApps().length === 0) {
  try {
    if (serviceAccount.private_key && serviceAccount.private_key !== 'placeholder') {
      app = initializeApp({
        credential: cert(serviceAccount),
      });
      db = getFirestore(app);
      console.log('✅ Firebase Firestore Connected');
    } else {
      console.log('⚠️ Firebase: Clés manquantes - mode in-memory actif');
    }
  } catch (error) {
    console.error('❌ Firebase initialization error:', error.message);
  }
} else {
  app = getApps()[0];
  db = getFirestore(app);
}

export { db, app };

// Helper functions Firestore
export const firestoreHelpers = {
  // Users
  async getUser(userId) {
    if (!db) return null;
    const doc = await db.collection('users').doc(userId).get();
    return doc.exists ? doc.data() : null;
  },

  async createUser(userId, data) {
    if (!db) return { id: userId, ...data };
    await db.collection('users').doc(userId).set(data);
    return { id: userId, ...data };
  },

  async updateUser(userId, data) {
    if (!db) return { id: userId, ...data };
    await db.collection('users').doc(userId).update(data);
    return { id: userId, ...data };
  },

  // Products
  async getProduct(productId) {
    if (!db) return null;
    const doc = await db.collection('products').doc(productId).get();
    return doc.exists ? { id: doc.id, ...doc.data() } : null;
  },

  async getProducts(filters = {}) {
    if (!db) return [];
    let ref = db.collection('products');
    if (filters.category) {
      ref = ref.where('category', '==', filters.category);
    }
    const snapshot = await ref.get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  },

  async createProduct(productId, data) {
    if (!db) return { id: productId, ...data };
    await db.collection('products').doc(productId).set(data);
    return { id: productId, ...data };
  },

  async updateProduct(productId, data) {
    if (!db) return { id: productId, ...data };
    await db.collection('products').doc(productId).update(data);
    return { id: productId, ...data };
  },

  // Orders
  async getOrder(orderId) {
    if (!db) return null;
    const doc = await db.collection('orders').doc(orderId).get();
    return doc.exists ? { id: doc.id, ...doc.data() } : null;
  },

  async getOrdersByUser(userId) {
    if (!db) return [];
    const snapshot = await db.collection('orders')
      .where('userId', '==', userId)
      .get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  },

  async createOrder(orderId, data) {
    if (!db) return { id: orderId, ...data };
    await db.collection('orders').doc(orderId).set(data);
    return { id: orderId, ...data };
  },

  async updateOrderStatus(orderId, status) {
    if (!db) return { id: orderId, status };
    await db.collection('orders').doc(orderId).update({ status });
    return { id: orderId, status };
  },

  // Wishlists
  async getWishlist(userId) {
    if (!db) return [];
    const doc = await db.collection('wishlists').doc(userId).get();
    return doc.exists ? doc.data().products : [];
  },

  async addToWishlist(userId, productId) {
    if (!db) return [];
    const docRef = db.collection('wishlists').doc(userId);
    const doc = await docRef.get();
    
    let products = [];
    if (doc.exists) {
      products = doc.data().products || [];
    }
    
    if (!products.includes(productId)) {
      products.push(productId);
      await docRef.set({ products, updatedAt: new Date().toISOString() });
    }
    
    return products;
  },

  async removeFromWishlist(userId, productId) {
    if (!db) return [];
    const docRef = db.collection('wishlists').doc(userId);
    const doc = await docRef.get();
    
    let products = [];
    if (doc.exists) {
      products = (doc.data().products || []).filter(id => id !== productId);
      await docRef.set({ products, updatedAt: new Date().toISOString() });
    }
    
    return products;
  },

  // Reviews
  async getReviews(productId) {
    if (!db) return [];
    const snapshot = await db.collection('reviews')
      .where('productId', '==', productId)
      .get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  },

  async createReview(reviewId, data) {
    if (!db) return { id: reviewId, ...data };
    await db.collection('reviews').doc(reviewId).set(data);
    return { id: reviewId, ...data };
  },

  // Analytics
  async logVisit(data) {
    if (!db) return;
    await db.collection('analytics').doc('visits').collection('daily').add({
      ...data,
      timestamp: new Date().toISOString(),
    });
  },

  async logConversion(data) {
    if (!db) return;
    await db.collection('analytics').doc('conversions').collection('daily').add({
      ...data,
      timestamp: new Date().toISOString(),
    });
  },
};

export default firestoreHelpers;