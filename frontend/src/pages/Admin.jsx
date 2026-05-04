import { useState } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts'

const stats = {
  totalOrders: 1240,
  totalRevenue: 89450,
  totalProducts: 52,
  totalUsers: 489
}

const ordersData = [
  { name: 'Lun', orders: 45 },
  { name: 'Mar', orders: 52 },
  { name: 'Mer', orders: 38 },
  { name: 'Jeu', orders: 65 },
  { name: 'Ven', orders: 78 },
  { name: 'Sam', orders: 92 },
  { name: 'Dim', orders: 56 },
]

const productsData = [
  { name: 'Homme', value: 12 },
  { name: 'Femme', value: 16 },
  { name: 'Africain', value: 12 },
  { name: 'Bebe', value: 12 },
]

export default function Admin() {
  const [period, setPeriod] = useState('week')

  return (
    <div style={{ padding: '2rem 20px', maxWidth: '1400px', margin: '0 auto', background: '#0a0a0f', minHeight: '100vh' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ margin: 0, color: '#fff' }}>⚙️ Administration</h1>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button onClick={() => setPeriod('week')} style={{ padding: '8px 16px', background: period === 'week' ? '#4B6CB7' : '#16161f', color: period === 'week' ? '#fff' : '#9ca3af', border: '1px solid #2a2a35', borderRadius: '8px', cursor: 'pointer' }}>Cette semaine</button>
          <button onClick={() => setPeriod('month')} style={{ padding: '8px 16px', background: period === 'month' ? '#4B6CB7' : '#16161f', color: period === 'month' ? '#fff' : '#9ca3af', border: '1px solid #2a2a35', borderRadius: '8px', cursor: 'pointer' }}>Ce mois</button>
        </div>
      </div>

      {/* Stats Grid - Dark */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '40px' }}>
        <div style={{ background: '#16161f', padding: '24px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.3)', border: '1px solid #2a2a35' }}>
          <p style={{ fontSize: '12px', color: '#9ca3af', margin: '0 0 8px' }}>Commandes</p>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#4B6CB7', margin: 0 }}>{stats.totalOrders}</p>
        </div>
        <div style={{ background: '#16161f', padding: '24px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.3)', border: '1px solid #2a2a35' }}>
          <p style={{ fontSize: '12px', color: '#9ca3af', margin: '0 0 8px' }}>Revenus</p>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#22c55e', margin: 0 }}>{stats.totalRevenue}€</p>
        </div>
        <div style={{ background: '#16161f', padding: '24px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.3)', border: '1px solid #2a2a35' }}>
          <p style={{ fontSize: '12px', color: '#9ca3af', margin: '0 0 8px' }}>Produits</p>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#f59e0b', margin: 0 }}>{stats.totalProducts}</p>
        </div>
        <div style={{ background: '#16161f', padding: '24px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.3)', border: '1px solid #2a2a35' }}>
          <p style={{ fontSize: '12px', color: '#9ca3af', margin: '0 0 8px' }}>Utilisateurs</p>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#8b5cf6', margin: 0 }}>{stats.totalUsers}</p>
        </div>
      </div>

      {/* Charts - Dark */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px', marginBottom: '40px' }}>
        <div style={{ background: '#16161f', padding: '24px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.3)', border: '1px solid #2a2a35' }}>
          <h3 style={{ margin: '0 0 20px', color: '#fff' }}>Commandes (7 derniers jours)</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={ordersData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="orders" stroke="#4B6CB7" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div style={{ background: '#16161f', padding: '24px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.3)', border: '1px solid #2a2a35' }}>
          <h3 style={{ margin: '0 0 20px', color: '#fff' }}>Produits par categorie</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={productsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#4B6CB7" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Orders */}
      <div style={{ background: '#fff', padding: '24px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
        <h3 style={{ margin: '0 0 20px' }}>Dernieres commandes</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #eee' }}>
              <th style={{ textAlign: 'left', padding: '12px', color: '#666' }}>ID</th>
              <th style={{ textAlign: 'left', padding: '12px', color: '#666' }}>Client</th>
              <th style={{ textAlign: 'left', padding: '12px', color: '#666' }}>Montant</th>
              <th style={{ textAlign: 'left', padding: '12px', color: '#666' }}>Statut</th>
              <th style={{ textAlign: 'left', padding: '12px', color: '#666' }}>Date</th>
            </tr>
          </thead>
          <tbody>
            {[
              { id: '#CMD-1240', client: 'Mamadou D.', amount: '189.99€', status: 'En cours', date: '04/05/2026' },
              { id: '#CMD-1239', client: 'Aminata S.', amount: '89.99€', status: 'Livre', date: '03/05/2026' },
              { id: '#CMD-1238', client: 'Ousmane B.', amount: '259.99€', status: 'En cours', date: '03/05/2026' },
              { id: '#CMD-1237', client: 'Fatou M.', amount: '145.00€', status: 'Livre', date: '02/05/2026' },
            ].map(order => (
              <tr key={order.id} style={{ borderBottom: '1px solid #eee' }}>
                <td style={{ padding: '12px' }}>{order.id}</td>
                <td style={{ padding: '12px' }}>{order.client}</td>
                <td style={{ padding: '12px' }}>{order.amount}</td>
                <td style={{ padding: '12px' }}>
                  <span style={{ background: order.status === 'Livre' ? '#dcfce7' : '#fef3c7', color: order.status === 'Livre' ? '#16a34a' : '#d97706', padding: '4px 8px', borderRadius: '4px', fontSize: '12px' }}>{order.status}</span>
                </td>
                <td style={{ padding: '12px', color: '#666' }}>{order.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
