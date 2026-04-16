import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { motion } from 'framer-motion'
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
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetail addToCart={addToCart} />} />
          <Route path="/cart" element={<Cart cart={cart} removeFromCart={removeFromCart} updateQuantity={updateQuantity} />} />
          <Route path="/checkout" element={<Checkout cart={cart} cartTotal={cartTotal} user={user} setCart={setCart} />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/register" element={<Register setUser={setUser} />} />
          <Route path="/account" element={<Account user={user} setUser={setUser} />} />
        </Routes>
      </main>
      <Footer />
      <ChatWidget />
    </div>
  )
}