import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Header from './components/Header'
import Footer from './components/Footer'
import ChatWidget from './components/ChatWidget'
import Home from './pages/Home'
import Products from './pages/Products'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import Login from './pages/Login'
import Register from './pages/Register'
import Account from './pages/Account'
import Blog from './pages/Blog'
import BlogPost from './pages/BlogPost'
import Homme from './pages/Homme'
import Femme from './pages/Femme'
import Enfants from './pages/Enfants'
import About from './pages/About'
import Contact from './pages/Contact'
import Wishlist from './pages/Wishlist'
import OrderTracking from './pages/OrderTracking'
import African from './pages/African'
import Babies from './pages/Babies'
import Resellers from './pages/Resellers'
import TextileSuppliers from './pages/TextileSuppliers'
import TextileBlog from './pages/TextileBlog'
import Admin from './pages/Admin'
import AISearch from './pages/AISearch'
import BrandsDirectory from './pages/BrandsDirectory'
import Affiliate from './pages/Affiliate'

export default function App() {
  const [cart, setCart] = useState([])
  const [user, setUser] = useState(null)

  const addToCart = (product) => {
    setCart(prev => {
      const exists = prev.find(item => item.id === product.id)
      if (exists) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: (item.quantity || 1) + 1 } : item)
      }
      return [...prev, { ...product, quantity: 1 }]
    })
  }

  const removeFromCart = (index) => {
    setCart(prev => prev.filter((_, i) => i !== index))
  }

  const updateQuantity = (index, qty) => {
    setCart(prev => prev.map((item, i) => i === index ? { ...item, quantity: qty } : item))
  }

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0)

  return (
    <div className="app">
      <Header user={user} cartCount={cart.length} />
      <main style={{ minHeight: '80vh', paddingTop: '70px' }}>
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<ProductDetail addToCart={addToCart} />} />
            <Route path="/cart" element={<Cart cart={cart} removeFromCart={removeFromCart} updateQuantity={updateQuantity} />} />
            <Route path="/checkout" element={<Checkout cart={cart} cartTotal={cartTotal} user={user} setCart={setCart} />} />
            <Route path="/login" element={<Login setUser={setUser} />} />
            <Route path="/register" element={<Register setUser={setUser} />} />
            <Route path="/account" element={<Account user={user} setUser={setUser} />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:id" element={<BlogPost />} />
            <Route path="/homme" element={<Homme />} />
            <Route path="/femme" element={<Femme />} />
            <Route path="/enfants" element={<Enfants />} />
            <Route path="/africain" element={<African />} />
            <Route path="/bebe" element={<Babies />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/wishlist" element={<Wishlist user={user} addToCart={addToCart} />} />
            <Route path="/order-tracking" element={<OrderTracking />} />
            <Route path="/revendeurs" element={<Resellers />} />
            <Route path="/fournisseurs-textile" element={<TextileSuppliers />} />
            <Route path="/blog-textile" element={<TextileBlog />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/recherche-ia" element={<AISearch />} />
            <Route path="/marques" element={<BrandsDirectory />} />
            <Route path="/partenaire" element={<Affiliate />} />
          </Routes>
        </AnimatePresence>
      </main>
      <Footer />
      <ChatWidget />
    </div>
  )
}
