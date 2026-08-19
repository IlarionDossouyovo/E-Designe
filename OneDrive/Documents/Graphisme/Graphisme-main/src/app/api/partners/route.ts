// Partners API - Graphisme by ELECTRON
// Manage partner program

import { NextRequest, NextResponse } from 'next/server'

interface Partner {
  id: string
  companyName: string
  contactName: string
  email: string
  phone: string
  type: 'reseller' | 'referral' | 'franchise' | 'affiliate'
  commission: number
  status: 'pending' | 'active' | 'suspended'
  totalSales: number
  createdAt: string
}

let partners: Partner[] = []

// GET - Get partners
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const status = searchParams.get('status')
  const type = searchParams.get('type')

  let result = [...partners]

  if (status) result = result.filter(p => p.status === status)
  if (type) result = result.filter(p => p.type === type)

  result.sort((a, b) => b.totalSales - a.totalSales)

  return NextResponse.json({
    partners: result,
    stats: {
      total: partners.length,
      active: partners.filter(p => p.status === 'active').length,
      totalRevenue: partners.reduce((sum, p) => sum + p.totalSales, 0)
    }
  })
}

// POST - Apply as partner
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { companyName, contactName, email, phone, type } = body

    if (!companyName || !contactName || !email || !type) {
      return NextResponse.json(
        { error: 'Veuillez remplir tous les champs obligatoires' },
        { status: 400 }
      )
    }

    const partner: Partner = {
      id: `partner_${Date.now()}`,
      companyName,
      contactName,
      email,
      phone: phone || '',
      type,
      commission: type === 'franchise' ? 30 : type === 'reseller' ? 20 : 10,
      status: 'pending',
      totalSales: 0,
      createdAt: new Date().toISOString()
    }

    partners.push(partner)

    return NextResponse.json({
      success: true,
      partner,
      message: 'Candidature enregistrée! Nous vous contacterons sous 48h.'
    })

  } catch (error) {
    return NextResponse.json({ error: 'Erreur' }, { status: 500 })
  }
}

// PUT - Update partner
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { partnerId, status, totalSales } = body

    const partner = partners.find(p => p.id === partnerId)
    if (!partner) {
      return NextResponse.json({ error: 'Partenaire non trouvé' }, { status: 404 })
    }

    if (status) partner.status = status
    if (totalSales) partner.totalSales += totalSales

    return NextResponse.json({ success: true, partner })

  } catch (error) {
    return NextResponse.json({ error: 'Erreur' }, { status: 500 })
  }
}
