// Analytics Service
// Track user behavior

const ANALYTICS_ID = process.env.REACT_APP_GA_ID || 'G-XXXXXXXXXX'

export const analytics = {
  // Initialize analytics
  init() {
    // In production: initialize Google Analytics
    console.log('Analytics initialized:', ANALYTICS_ID)
  },

  // Track page view
  pageView(page, title) {
    console.log('Page view:', page, title)
    // In production: gtag('event', 'page_view', ...)
  },

  // Track product view
  productView(product) {
    console.log('Product view:', product.name)
    // In production: track ecommerce
  },

  // Track add to cart
  addToCart(product, quantity) {
    console.log('Add to cart:', product.name, 'x', quantity)
  },

  // Track checkout
  beginCheckout(cart, total) {
    console.log('Begin checkout:', cart.length, 'items,', total, '€')
  },

  // Track purchase
  purchase(order) {
    console.log('Purchase:', order.id, order.total)
  },

  // Track search
  search(query, results) {
    console.log('Search:', query, '->', results, 'results')
  },

  // Track custom event
  event(category, action, label) {
    console.log('Event:', category, action, label)
  },

  // Set user properties
  setUser(user) {
    console.log('User:', user?.id)
  }
}

export default analytics
