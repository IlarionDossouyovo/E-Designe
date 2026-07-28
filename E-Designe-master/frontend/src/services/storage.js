// Local Storage Service
// Handles persistence without backend

const STORAGE_KEYS = {
  CART: 'e-designe-cart',
  WISHLIST: 'e-designe-wishlist',
  USER: 'e-designe-user',
  RECENT: 'e-designe-recent',
  PREFERENCES: 'e-designe-prefs'
}

export const storage = {
  // Cart operations
  getCart: () => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEYS.CART)) || []
    } catch { return [] }
  },
  
  setCart: (items) => {
    localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(items))
  },
  
  addToCart: (product) => {
    const cart = storage.getCart()
    const exists = cart.find(item => item.id === product.id)
    if (exists) {
      exists.quantity = (exists.quantity || 1) + 1
    } else {
      cart.push({ ...product, quantity: 1 })
    }
    storage.setCart(cart)
    return cart
  },
  
  removeFromCart: (productId) => {
    const cart = storage.getCart().filter(item => item.id !== productId)
    storage.setCart(cart)
    return cart
  },
  
  updateCartQuantity: (productId, qty) => {
    const cart = storage.getCart().map(item => 
      item.id === productId ? { ...item, quantity: qty } : item
    )
    storage.setCart(cart)
    return cart
  },
  
  clearCart: () => {
    localStorage.removeItem(STORAGE_KEYS.CART)
  },

  // Wishlist operations
  getWishlist: () => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEYS.WISHLIST)) || []
    } catch { return [] }
  },
  
  addToWishlist: (product) => {
    const wishlist = storage.getWishlist()
    if (!wishlist.find(item => item.id === product.id)) {
      wishlist.push(product)
      localStorage.setItem(STORAGE_KEYS.WISHLIST, JSON.stringify(wishlist))
    }
    return wishlist
  },
  
  removeFromWishlist: (productId) => {
    const wishlist = storage.getWishlist().filter(item => item.id !== productId)
    localStorage.setItem(STORAGE_KEYS.WISHLIST, JSON.stringify(wishlist))
    return wishlist
  },

  // User operations
  getUser: () => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEYS.USER))
    } catch { return null }
  },
  
  setUser: (user) => {
    if (user) {
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user))
    } else {
      localStorage.removeItem(STORAGE_KEYS.USER)
    }
  },

  // Recent products
  getRecent: () => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEYS.RECENT)) || []
    } catch { return [] }
  },
  
  addRecent: (product) => {
    let recent = storage.getRecent().filter(item => item.id !== product.id)
    recent.unshift(product)
    recent = recent.slice(0, 10) // Keep only 10 recent
    localStorage.setItem(STORAGE_KEYS.RECENT, JSON.stringify(recent))
    return recent
  },

  // Preferences
  getPreferences: () => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEYS.PREFERENCES)) || {}
    } catch { return {} }
  },
  
  setPreferences: (prefs) => {
    localStorage.setItem(STORAGE_KEYS.PREFERENCES, JSON.stringify(prefs))
  }
}

export default storage
