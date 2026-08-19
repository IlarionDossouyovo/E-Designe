'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, ChevronDown, HelpCircle, MessageCircle, ArrowLeft, Home } from 'lucide-react'
import Link from 'next/link'

interface FAQItem {
  id: string
  question: string
  answer: string
  category: string
}

const faqItems: FAQItem[] = [
  {
    id: '1',
    category: 'Commandes',
    question: 'Comment passer une commande?',
    answer: 'Pour passer une commande, rendez-vous sur notre boutique /shop, ajoutez les produits souhaités au panier, puis suivez les étapes de paiement. Vous pouvez payer par carte bancaire, Mobile Money (Wave, MTN, Orange) ou en espèces.'
  },
  {
    id: '2',
    category: 'Commandes',
    question: 'Quels sont les délais de livraison?',
    answer: 'Les délais varient selon le service: Logo (2-5 jours), Site Web (7-30 jours), Application Mobile (30-90 jours). Nous vous tiendrons informé de l\'avancement tout au long du projet.'
  },
  {
    id: '3',
    category: 'Paiements',
    question: 'Quels moyens de paiement acceptez-vous?',
    answer: 'Nous acceptons: Cartes bancaires (Visa, Mastercard), Mobile Money (Wave, MTN, Moov, Orange Money), Virements bancaires, Espèces (sur rendez-vous).'
  },
  {
    id: '4',
    category: 'Paiements',
    question: 'Le paiement est-il sécurisé?',
    answer: 'Oui! Nous utilisons Stripe pour les paiements par carte et des passerelles mobiles money sécurisées. Vos données financières ne sont jamais stockées sur nos serveurs.'
  },
  {
    id: '5',
    category: 'Services',
    question: 'Puis-je avoir un remboursement?',
    answer: 'Nous offrons un remboursement sous 7 jours si le travail n\'a pas encore commencé. En cours de projet, nous évaluons chaque cas individuellement selon l\'avancement du travail.'
  },
  {
    id: '6',
    category: 'Services',
    question: 'Proposez-vous des revisions?',
    answer: 'Oui! Chaque commande inclut 2 à 3 révisions gratuites selon le package. Les révisions supplémentaires peuvent être facturées séparément.'
  },
  {
    id: '7',
    category: 'Technique',
    question: 'Hébergez-vous les sites créés?',
    answer: 'Nous proposons l\'hébergement web à partir de 15 000 XOF/mois. Vous pouvez également choisir votre propre hébergeur si vous préférez.'
  },
  {
    id: '8',
    category: 'Technique',
    question: 'Puis-je modifier mon site moi-même?',
    answer: 'Oui! Nous fournissons un panneau d\'administration facile à utiliser. Nous proposons également des formations si vous souhaitez gérer votre contenu vous-même.'
  },
  {
    id: '9',
    category: 'Support',
    question: 'Comment obtenir du support?',
    answer: 'Vous pouvez nous contacter via: WhatsApp (+229 XX XX XX XX), Email (support@graphisme.electron), Formulaire de contact (/support), ou utiliser notre système de tickets.'
  },
  {
    id: '10',
    category: 'Support',
    question: 'Quel est votre horaire de support?',
    answer: 'Notre équipe est disponible: Lun-Ven: 8h-18h, Sam: 9h-14h. Pour les urgences, vous pouvez laisser un message et nous vous rappellerons sous 24h.'
  }
]

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [openItem, setOpenItem] = useState<string | null>(null)

  const categories = Array.from(new Set(faqItems.map(item => item.category)))

  const filteredFAQs = faqItems.filter(item => {
    const matchesSearch = searchQuery === '' || 
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === '' || item.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen bg-premium-black py-20 px-4">
      {/* Navigation */}
      <div className="flex items-center justify-between px-6 py-4 max-w-4xl mx-auto mb-8">
        <Link href="/" className="flex items-center gap-2 text-gray-400 hover:text-gold transition-colors">
          <ArrowLeft className="w-5 h-5" />
          Retour
        </Link>
        <Link href="/" className="flex items-center gap-2 text-gray-400 hover:text-gold transition-colors">
          <Home className="w-5 h-5" />
          Accueil
        </Link>
      </div>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-white mb-4">
          Questions <span className="text-gold">Fréquentes</span>
        </h1>
        <p className="text-gray-400 text-center mb-8">
          Trouvez rapidement les réponses à vos questions
        </p>

        {/* Search */}
        <div className="relative mb-8">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Rechercher une question..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:border-gold/50 text-lg"
          />
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-2 mb-8">
          <button
            onClick={() => setSelectedCategory('')}
            className={`px-4 py-2 rounded-full transition-all ${
              selectedCategory === ''
                ? 'bg-gold text-black'
                : 'bg-white/10 text-gray-400 hover:bg-white/20'
            }`}
          >
            Toutes
          </button>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full transition-all ${
                selectedCategory === cat
                  ? 'bg-gold text-black'
                  : 'bg-white/10 text-gray-400 hover:bg-white/20'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* FAQ List */}
        <div className="space-y-3">
          <AnimatePresence>
            {filteredFAQs.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-card overflow-hidden"
              >
                <button
                  onClick={() => setOpenItem(openItem === item.id ? null : item.id)}
                  className="w-full p-6 text-left flex items-center justify-between"
                >
                  <div>
                    <span className="text-xs text-gold mb-1 block">{item.category}</span>
                    <h3 className="text-white font-semibold">{item.question}</h3>
                  </div>
                  <ChevronDown 
                    className={`w-5 h-5 text-gray-400 transition-transform ${
                      openItem === item.id ? 'rotate-180' : ''
                    }`} 
                  />
                </button>
                <AnimatePresence>
                  {openItem === item.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 text-gray-400 leading-relaxed">
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredFAQs.length === 0 && (
          <div className="text-center py-12">
            <HelpCircle className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Question non trouvée</h3>
            <p className="text-gray-400 mb-4">Contactez notre support pour obtenir une réponse</p>
            <a
              href="/support"
              className="inline-flex items-center gap-2 bg-gold text-black px-6 py-3 rounded-xl font-bold hover:bg-gold/90"
            >
              <MessageCircle className="w-5 h-5" />
              Contacter le Support
            </a>
          </div>
        )}

        {/* Contact CTA */}
        <div className="mt-12 glass-card p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Vous n'avez pas trouvé votre réponse?</h2>
          <p className="text-gray-400 mb-6">
            Notre équipe est disponible pour répondre à toutes vos questions
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="/support"
              className="bg-gold text-black px-6 py-3 rounded-xl font-bold hover:bg-gold/90"
            >
              Ouvrir un Ticket
            </a>
            <a
              href="/contact"
              className="bg-white/10 text-white px-6 py-3 rounded-xl font-bold hover:bg-white/20"
            >
              Nous Contacter
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
