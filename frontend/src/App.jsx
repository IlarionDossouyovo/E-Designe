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
import Suppliers from './pages/Suppliers'
import Blog from './pages/Blog'
import About from './pages/About'
import Contact from './pages/Contact'
import Wishlist from './pages/Wishlist'
import OrderTracking from './pages/OrderTracking'

export default function App() {
  const [cart, setCart] = useState([])
  const [user, setUser] = useState(null)

  useEffect(() => {
    const savedCart = localStorage.getItem('stylhub-cart')
    if (savedCart) setCart(JSON.parse(savedCart))
    const savedUser = localStorage.getItem('stylhub-user')
    if (savedUser) setUser(JSON.parse(savedUser))
  }, [])

  useEffect(() => {
    localStorage.setItem('stylhub-cart', JSON.stringify(cart))
  }, [cart])

  const addToCart = (product, size) => {
    const existing = cart.find(item => item.id === product.id && item.size === size)
    if (existing) {
      setCart(cart.map(item => 
        item.id === product.id && item.size === size 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ))
    } else {
      setCart([...cart, { ...product, size, quantity: 1 }])
    }
  }

  const removeFromCart = (id, size) => {
    setCart(cart.filter(item => !(item.id === id && item.size === size)))
  }

  const updateQuantity = (id, size, quantity) => {
    if (quantity <= 0) {
      removeFromCart(id, size)
    } else {
      setCart(cart.map(item => 
        item.id === id && item.size === size 
          ? { ...item, quantity }
          : item
      ))
    }
  }

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <div className="app">
      <Header cartCount={cartCount} user={user} />
      <main>
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
            <Route path="/fournisseurs/homme" element={<Suppliers category="Homme" />} />
            <Route path="/fournisseurs/femme" element={<Suppliers category="Femme" />} />
            <Route path="/fournisseurs/enfants" element={<Suppliers category="Enfants" />} />
            <Route path="/fournisseurs/cosmetiques" element={<Suppliers category="Cosmétiques" />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/wishlist" element={<Wishlist user={user} addToCart={addToCart} />} />
            <Route path="/order-tracking" element={<OrderTracking />} />
          </Routes>
        </AnimatePresence>
      </main>
      <Footer />
      <ChatWidget />
    </div>
  )
}