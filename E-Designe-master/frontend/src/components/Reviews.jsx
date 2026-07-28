import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import axios from 'axios'

export default function Reviews({ productId, user }) {
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [newReview, setNewReview] = useState({ rating: 5, comment: '' })

  useEffect(() => {
    loadReviews()
  }, [productId])

  const loadReviews = async () => {
    try {
      const { data } = await axios.get(`/api/reviews/${productId}`)
      setReviews(data)
    } catch (error) {
      console.error('Erreur:', error)
    }
    setLoading(false)
  }

  const submitReview = async (e) => {
    e.preventDefault()
    if (!user) {
      alert('Veuillez vous connecter pour laisser un avis')
      return
    }

    try {
      const { data } = await axios.post('/api/reviews', {
        productId,
        userId: user.id,
        userName: user.name,
        rating: newReview.rating,
        comment: newReview.comment
      })
      setReviews([data, ...reviews])
      setShowForm(false)
      setNewReview({ rating: 5, comment: '' })
    } catch (error) {
      console.error('Erreur:', error)
    }
  }

  const averageRating = reviews.length > 0 
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : 0

  if (loading) {
    return <div className="loading"><div className="spinner"></div></div>
  }

  return (
    <div style={{ marginTop: '2rem' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <div>
          <h3 style={{ marginBottom: '0.5rem' }}>Avis clients ({reviews.length})</h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '1.5rem', color: '#F6AD55' }}>
              {'★'.repeat(Math.round(averageRating))}
              {'☆'.repeat(5 - Math.round(averageRating))}
            </span>
            <span style={{ color: '#718096' }}>({averageRating}/5)</span>
          </div>
        </div>
        
        <button 
          onClick={() => setShowForm(!showForm)}
          className="btn btn-secondary"
        >
          {showForm ? 'Annuler' : 'Ajouter un avis'}
        </button>
      </div>

      {/* Review Form */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="card"
            style={{ padding: '1.5rem', marginBottom: '1.5rem' }}
          >
            <form onSubmit={submitReview}>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>
                  Note
                </label>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  {[1, 2, 3, 4, 5].map(star => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setNewReview({ ...newReview, rating: star })}
                      style={{
                        fontSize: '1.5rem',
                        background: 'none',
                        cursor: 'pointer',
                        color: star <= newReview.rating ? '#F6AD55' : '#E2E8F0'
                      }}
                    >
                      ★
                    </button>
                  ))}
                </div>
              </div>
              
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>
                  Votre avis
                </label>
                <textarea
                  className="form-control"
                  rows="4"
                  value={newReview.comment}
                  onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                  placeholder="Partagez votre expérience avec ce produit..."
                  required
                />
              </div>
              
              <button type="submit" className="btn btn-primary">
                Soumettre mon avis
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Reviews List */}
      {reviews.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '2rem', background: '#F5F6FA', borderRadius: '12px' }}>
          <p style={{ color: '#718096' }}>Aucun avis pour ce produit. Soyez le premier!</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gap: '1rem' }}>
          {reviews.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="card"
              style={{ padding: '1.5rem' }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    background: '#4B6CB7',
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 600
                  }}>
                    {review.userName?.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <strong>{review.userName}</strong>
                    <p style={{ fontSize: '0.8rem', color: '#A0AEC0' }}>
                      {new Date(review.createdAt).toLocaleDateString('fr-FR')}
                    </p>
                  </div>
                </div>
                <div style={{ color: '#F6AD55', fontSize: '1.2rem' }}>
                  {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
                </div>
              </div>
              <p style={{ color: '#4A5568' }}>{review.comment}</p>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}