'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { 
  User, Mail, Phone, MapPin, Award, Briefcase, Globe, 
  Linkedin, Twitter, Instagram, Facebook, Youtube,
  MessageSquare, Calendar, Star, TrendingUp, DollarSign,
  Users, BookOpen, Code, Palette, Megaphone, Bot, ArrowLeft, Home
} from 'lucide-react'

interface Founder {
  id: string
  name: string
  title: string
  email: string
  phone: string
  location: string
  bio: string
  vision: string
  achievements: string[]
  skills: string[]
  social: {
    linkedin?: string
    twitter?: string
    instagram?: string
    facebook?: string
    youtube?: string
  }
  stats: {
    yearsExperience: number
    projectsCompleted: number
    clientsServed: number
    awards: number
    teamMembers: number
    revenue: number
  }
}

export default function FounderPage() {
  const [founder, setFounder] = useState<Founder | null>(null)
  const [activeTab, setActiveTab] = useState('about')

  useEffect(() => {
    // Founder data
    setFounder({
      id: 'founder_001',
      name: 'Augustin DOSSOUYOVO',
      title: 'Fondateur & PDG - Graphisme by ELECTRON',
      email: 'dossouyovoauguste@gmail.com',
      phone: '+229 97 00 00 00',
      location: 'Cotonou, République du Benin',
      bio: `Passionné par la technologie et l'innovation, j'ai fondé Graphisme by ELECTRON avec une vision claire : rendre le numérique accessible aux entreprises africaines. Avec plus de 8 ans d'expérience dans le domaine du design et du développement web, je m'efforce de créer des solutions digitales qui font la différence.`,
      vision: `Notre mission est de transformer les idées en réalité numérique. Nous croyons que chaque entreprise, grandes ou petites, mérite une présence en ligne de qualité. Notre équipe s'engage à deliverer Excellence, Innovation et Proximité à chaque projet.`,
      achievements: [
        'Meilleur Startup Tech Benin 2023',
        'Plus de 200 projets livrés',
        'Certification Google Partners',
        'Membre actif de la communauté Tech Africa',
        'Speaker à la Tech Conference 2023',
        'Formateur certifié Meta Blueprint'
      ],
      skills: ['Leadership', 'Strategy', 'UI/UX Design', 'Full Stack Dev', 'AI Integration', 'Business Development'],
      social: {
        linkedin: 'https://linkedin.com/in/augustin-dossouyovo',
        twitter: 'https://twitter.com/electron_bj',
        instagram: 'https://instagram.com/electron_graphisme'
      },
      stats: {
        yearsExperience: 8,
        projectsCompleted: 250,
        clientsServed: 180,
        awards: 5,
        teamMembers: 15,
        revenue: 150000000
      }
    })
  }, [])

  if (!founder) {
    return (
      <div className="min-h-screen bg-premium-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gold"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-premium-black py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Navigation */}
        <div className="flex items-center justify-between mb-4">
          <Link href="/" className="flex items-center gap-2 text-gray-400 hover:text-gold transition-colors">
            <ArrowLeft className="w-5 h-5" />
            Retour
          </Link>
          <Link href="/" className="flex items-center gap-2 text-gray-400 hover:text-gold transition-colors">
            <Home className="w-5 h-5" />
            Accueil
          </Link>
        </div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-br from-gold/20 to-gold/5 flex items-center justify-center">
            <User className="w-16 h-16 text-gold" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">{founder.name}</h1>
          <p className="text-gold text-xl mb-4">{founder.title}</p>
          <div className="flex items-center justify-center gap-4 text-gray-400">
            <span className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              {founder.location}
            </span>
            <span className="flex items-center gap-1">
              <Mail className="w-4 h-4" />
              {founder.email}
            </span>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12"
        >
          <div className="glass-card p-4 text-center">
            <Briefcase className="w-8 h-8 text-gold mx-auto mb-2" />
            <p className="text-2xl font-bold text-white">{founder.stats.yearsExperience}+</p>
            <p className="text-gray-400 text-sm">Années</p>
          </div>
          <div className="glass-card p-4 text-center">
            <TrendingUp className="w-8 h-8 text-green-400 mx-auto mb-2" />
            <p className="text-2xl font-bold text-white">{founder.stats.projectsCompleted}+</p>
            <p className="text-gray-400 text-sm">Projets</p>
          </div>
          <div className="glass-card p-4 text-center">
            <Users className="w-8 h-8 text-blue-400 mx-auto mb-2" />
            <p className="text-2xl font-bold text-white">{founder.stats.clientsServed}+</p>
            <p className="text-gray-400 text-sm">Clients</p>
          </div>
          <div className="glass-card p-4 text-center">
            <Award className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
            <p className="text-2xl font-bold text-white">{founder.stats.awards}</p>
            <p className="text-gray-400 text-sm">Prix</p>
          </div>
          <div className="glass-card p-4 text-center">
            <Users className="w-8 h-8 text-purple-400 mx-auto mb-2" />
            <p className="text-2xl font-bold text-white">{founder.stats.teamMembers}</p>
            <p className="text-gray-400 text-sm">Équipe</p>
          </div>
          <div className="glass-card p-4 text-center">
            <DollarSign className="w-8 h-8 text-gold mx-auto mb-2" />
            <p className="text-2xl font-bold text-white">{(founder.stats.revenue / 1000000).toFixed(0)}M</p>
            <p className="text-gray-400 text-sm">CA</p>
          </div>
        </motion.div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {[
            { id: 'about', label: 'À Propos', icon: User },
            { id: 'vision', label: 'Vision', icon: Globe },
            { id: 'achievements', label: 'Réalisations', icon: Award },
            { id: 'contact', label: 'Contact', icon: Mail }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl transition-all ${
                activeTab === tab.id
                  ? 'bg-gold text-black'
                  : 'bg-white/5 text-white hover:bg-white/10'
              }`}
            >
              <tab.icon className="w-5 h-5" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-8"
        >
          {activeTab === 'about' && (
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">À Propos de {founder.name.split(' ')[1]}</h2>
              <p className="text-gray-300 leading-relaxed mb-6">{founder.bio}</p>
              
              <h3 className="text-lg font-bold text-gold mb-4">Compétences</h3>
              <div className="flex flex-wrap gap-2">
                {founder.skills.map((skill) => (
                  <span key={skill} className="px-4 py-2 bg-gold/10 text-gold rounded-full text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'vision' && (
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">Notre Vision</h2>
              <p className="text-gray-300 leading-relaxed mb-6">{founder.vision}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                <div className="bg-white/5 p-6 rounded-xl">
                  <Palette className="w-10 h-10 text-gold mb-3" />
                  <h3 className="text-lg font-bold text-white mb-2">Design</h3>
                  <p className="text-gray-400">Créer des expériences visuelles mémorables qui distinguent chaque marque.</p>
                </div>
                <div className="bg-white/5 p-6 rounded-xl">
                  <Code className="w-10 h-10 text-gold mb-3" />
                  <h3 className="text-lg font-bold text-white mb-2">Innovation</h3>
                  <p className="text-gray-400">Intégrer les dernières technologies pour des solutions performantes.</p>
                </div>
                <div className="bg-white/5 p-6 rounded-xl">
                  <Megaphone className="w-10 h-10 text-gold mb-3" />
                  <h3 className="text-lg font-bold text-white mb-2">Growth</h3>
                  <p className="text-gray-400">Aider nos clients à atteindre leurs objectifs de croissance digitale.</p>
                </div>
                <div className="bg-white/5 p-6 rounded-xl">
                  <Bot className="w-10 h-10 text-gold mb-3" />
                  <h3 className="text-lg font-bold text-white mb-2">IA</h3>
                  <p className="text-gray-400">Exploiter l'intelligence artificielle pour optimiser les processus.</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'achievements' && (
            <div>
              <h2 className="text-2xl font-bold text-white mb-6">Réalisations</h2>
              <div className="space-y-4">
                {founder.achievements.map((achievement, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-4 p-4 bg-white/5 rounded-xl"
                  >
                    <Award className="w-8 h-8 text-gold flex-shrink-0" />
                    <p className="text-white">{achievement}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'contact' && (
            <div>
              <h2 className="text-2xl font-bold text-white mb-6">Contacter le Fondateur</h2>
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 bg-white/5 rounded-xl">
                  <Mail className="w-8 h-8 text-gold" />
                  <div>
                    <p className="text-gray-400 text-sm">Email</p>
                    <p className="text-white">{founder.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 bg-white/5 rounded-xl">
                  <Phone className="w-8 h-8 text-gold" />
                  <div>
                    <p className="text-gray-400 text-sm">Téléphone</p>
                    <p className="text-white">{founder.phone}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 bg-white/5 rounded-xl">
                  <MapPin className="w-8 h-8 text-gold" />
                  <div>
                    <p className="text-gray-400 text-sm">Adresse</p>
                    <p className="text-white">{founder.location}</p>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <h3 className="text-lg font-bold text-white mb-4">Réseaux Sociaux</h3>
                <div className="flex gap-4">
                  {founder.social.linkedin && (
                    <a href={founder.social.linkedin} target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-blue-600/20 rounded-full flex items-center justify-center text-blue-400 hover:bg-blue-600/30">
                      <Linkedin className="w-6 h-6" />
                    </a>
                  )}
                  {founder.social.twitter && (
                    <a href={founder.social.twitter} target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-sky-500/20 rounded-full flex items-center justify-center text-sky-400 hover:bg-sky-500/30">
                      <Twitter className="w-6 h-6" />
                    </a>
                  )}
                  {founder.social.instagram && (
                    <a href={founder.social.instagram} target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-pink-600/20 rounded-full flex items-center justify-center text-pink-400 hover:bg-pink-600/30">
                      <Instagram className="w-6 h-6" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          )}
        </motion.div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          <a href="https://wa.me/22997000000" className="glass-card p-6 flex items-center gap-4 hover:bg-green-500/10">
            <MessageSquare className="w-10 h-10 text-green-400" />
            <div>
              <p className="text-white font-bold">WhatsApp Direct</p>
              <p className="text-gray-400 text-sm">Discuter maintenant</p>
            </div>
          </a>
          <a href="mailto:dossouyovoauguste@gmail.com" className="glass-card p-6 flex items-center gap-4 hover:bg-blue-500/10">
            <Mail className="w-10 h-10 text-blue-400" />
            <div>
              <p className="text-white font-bold">Email</p>
              <p className="text-gray-400 text-sm">Envoyer un mail</p>
            </div>
          </a>
          <a href="/contact" className="glass-card p-6 flex items-center gap-4 hover:bg-gold/10">
            <Calendar className="w-10 h-10 text-gold" />
            <div>
              <p className="text-white font-bold">Planifier RDV</p>
              <p className="text-gray-400 text-sm">Prendre rendez-vous</p>
            </div>
          </a>
        </div>
      </div>
    </div>
  )
}
