'use client'

import { useState } from 'react'
import { User, Mail, Phone, MapPin, Camera, Save, Lock, Bell } from 'lucide-react'

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('profile')
  const [isSaving, setIsSaving] = useState(false)
  
  const [profile, setProfile] = useState({
    firstName: 'Augustin',
    lastName: 'Dossou',
    email: 'augustin@graphisme.electron',
    phone: '+229 01 00 00 00 00',
    company: 'ELECTRON',
    address: 'Cotonou, Benin',
    bio: 'Passionné par la technologie et le design.',
  })

  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    promotions: true,
    orderUpdates: true,
  })

  const handleSave = async () => {
    setIsSaving(true)
    // Simuler l'enregistrement
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsSaving(false)
    alert('Profil enregistré avec succès!')
  }

  return (
    <div className="min-h-screen bg-premium-dark pt-20 pb-12">
      <div className="max-w-6xl mx-auto px-6">
        <h1 className="text-3xl font-bold text-white mb-8">Mon Profil</h1>
        
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-premium-black rounded-2xl p-6 border border-white/10">
              <div className="text-center mb-6">
                <div className="relative inline-block">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-gold/30 to-gold/10 flex items-center justify-center mx-auto mb-4">
                    <User className="w-12 h-12 text-gold" />
                  </div>
                  <button className="absolute bottom-0 right-0 bg-gold text-black p-2 rounded-full hover:bg-yellow-400 transition-colors">
                    <Camera className="w-4 h-4" />
                  </button>
                </div>
                <h3 className="text-white font-semibold">{profile.firstName} {profile.lastName}</h3>
                <p className="text-gray-400 text-sm">{profile.email}</p>
              </div>
              
              <nav className="space-y-2">
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`w-full text-left px-4 py-3 rounded-xl transition-colors flex items-center gap-3 ${activeTab === 'profile' ? 'bg-gold/20 text-gold' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
                >
                  <User className="w-5 h-5" />
                  Profil
                </button>
                <button
                  onClick={() => setActiveTab('security')}
                  className={`w-full text-left px-4 py-3 rounded-xl transition-colors flex items-center gap-3 ${activeTab === 'security' ? 'bg-gold/20 text-gold' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
                >
                  <Lock className="w-5 h-5" />
                  Sécurité
                </button>
                <button
                  onClick={() => setActiveTab('notifications')}
                  className={`w-full text-left px-4 py-3 rounded-xl transition-colors flex items-center gap-3 ${activeTab === 'notifications' ? 'bg-gold/20 text-gold' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
                >
                  <Bell className="w-5 h-5" />
                  Notifications
                </button>
              </nav>
            </div>
          </div>
          
          {/* Contenu principal */}
          <div className="lg:col-span-3">
            {activeTab === 'profile' && (
              <div className="bg-premium-black rounded-2xl p-8 border border-white/10">
                <h2 className="text-xl font-semibold text-white mb-6">Informations du profil</h2>
                
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Prénom</label>
                    <input
                      type="text"
                      value={profile.firstName}
                      onChange={(e) => setProfile({...profile, firstName: e.target.value})}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-gold focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Nom</label>
                    <input
                      type="text"
                      value={profile.lastName}
                      onChange={(e) => setProfile({...profile, lastName: e.target.value})}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-gold focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Email</label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                      <input
                        type="email"
                        value={profile.email}
                        onChange={(e) => setProfile({...profile, email: e.target.value})}
                        className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-gold focus:outline-none"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Téléphone</label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                      <input
                        type="tel"
                        value={profile.phone}
                        onChange={(e) => setProfile({...profile, phone: e.target.value})}
                        className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-gold focus:outline-none"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Entreprise</label>
                    <input
                      type="text"
                      value={profile.company}
                      onChange={(e) => setProfile({...profile, company: e.target.value})}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-gold focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Adresse</label>
                    <div className="relative">
                      <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                      <input
                        type="text"
                        value={profile.address}
                        onChange={(e) => setProfile({...profile, address: e.target.value})}
                        className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-gold focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="mb-6">
                  <label className="block text-gray-400 text-sm mb-2">Bio</label>
                  <textarea
                    value={profile.bio}
                    onChange={(e) => setProfile({...profile, bio: e.target.value})}
                    rows={4}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-gold focus:outline-none resize-none"
                  />
                </div>
                
                <button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="bg-gold text-black px-6 py-3 rounded-xl font-semibold hover:bg-yellow-400 transition-colors flex items-center gap-2 disabled:opacity-50"
                >
                  <Save className="w-5 h-5" />
                  {isSaving ? 'Enregistrement...' : 'Enregistrer'}
                </button>
              </div>
            )}
            
            {activeTab === 'security' && (
              <div className="bg-premium-black rounded-2xl p-8 border border-white/10">
                <h2 className="text-xl font-semibold text-white mb-6">Sécurité</h2>
                
                <div className="space-y-6">
                  <div className="p-6 bg-white/5 rounded-xl border border-white/10">
                    <h3 className="text-white font-medium mb-4">Changer le mot de passe</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-gray-400 text-sm mb-2">Mot de passe actuel</label>
                        <input type="password" className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-gold focus:outline-none" />
                      </div>
                      <div>
                        <label className="block text-gray-400 text-sm mb-2">Nouveau mot de passe</label>
                        <input type="password" className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-gold focus:outline-none" />
                      </div>
                      <div>
                        <label className="block text-gray-400 text-sm mb-2">Confirmer le mot de passe</label>
                        <input type="password" className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-gold focus:outline-none" />
                      </div>
                    </div>
                    <button className="mt-4 bg-gold text-black px-6 py-2 rounded-xl font-semibold hover:bg-yellow-400 transition-colors">
                      Mettre à jour
                    </button>
                  </div>
                  
                  <div className="p-6 bg-white/5 rounded-xl border border-white/10">
                    <h3 className="text-white font-medium mb-4">Authentification à deux facteurs</h3>
                    <p className="text-gray-400 text-sm mb-4">Ajoutez une couche de sécurité supplémentaire à votre compte.</p>
                    <button className="bg-gold/20 text-gold px-6 py-2 rounded-xl font-semibold hover:bg-gold/30 transition-colors">
                      Activer 2FA
                    </button>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'notifications' && (
              <div className="bg-premium-black rounded-2xl p-8 border border-white/10">
                <h2 className="text-xl font-semibold text-white mb-6">Préférences de notifications</h2>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10">
                    <div>
                      <h3 className="text-white font-medium">Notifications par email</h3>
                      <p className="text-gray-400 text-sm">Recevez les mises à jour par email</p>
                    </div>
                    <button
                      onClick={() => setNotifications({...notifications, email: !notifications.email})}
                      className={`w-12 h-6 rounded-full transition-colors ${notifications.email ? 'bg-gold' : 'bg-gray-600'}`}
                    >
                      <div className={`w-5 h-5 bg-white rounded-full transition-transform ${notifications.email ? 'translate-x-6' : 'translate-x-0.5'}`} />
                    </button>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10">
                    <div>
                      <h3 className="text-white font-medium">Notifications SMS</h3>
                      <p className="text-gray-400 text-sm">Recevez des alertes par SMS</p>
                    </div>
                    <button
                      onClick={() => setNotifications({...notifications, sms: !notifications.sms})}
                      className={`w-12 h-6 rounded-full transition-colors ${notifications.sms ? 'bg-gold' : 'bg-gray-600'}`}
                    >
                      <div className={`w-5 h-5 bg-white rounded-full transition-transform ${notifications.sms ? 'translate-x-6' : 'translate-x-0.5'}`} />
                    </button>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10">
                    <div>
                      <h3 className="text-white font-medium">Promotions</h3>
                      <p className="text-gray-400 text-sm">Recevez des offres promotionnelles</p>
                    </div>
                    <button
                      onClick={() => setNotifications({...notifications, promotions: !notifications.promotions})}
                      className={`w-12 h-6 rounded-full transition-colors ${notifications.promotions ? 'bg-gold' : 'bg-gray-600'}`}
                    >
                      <div className={`w-5 h-5 bg-white rounded-full transition-transform ${notifications.promotions ? 'translate-x-6' : 'translate-x-0.5'}`} />
                    </button>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10">
                    <div>
                      <h3 className="text-white font-medium">Mises à jour des commandes</h3>
                      <p className="text-gray-400 text-sm">Suivez l'état de vos commandes</p>
                    </div>
                    <button
                      onClick={() => setNotifications({...notifications, orderUpdates: !notifications.orderUpdates})}
                      className={`w-12 h-6 rounded-full transition-colors ${notifications.orderUpdates ? 'bg-gold' : 'bg-gray-600'}`}
                    >
                      <div className={`w-5 h-5 bg-white rounded-full transition-transform ${notifications.orderUpdates ? 'translate-x-6' : 'translate-x-0.5'}`} />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
