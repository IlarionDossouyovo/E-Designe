// Careers API - Graphisme by ELECTRON
// Manage job postings and applications

import { NextRequest, NextResponse } from 'next/server'

interface Job {
  id: string
  title: string
  department: string
  location: string
  type: 'full-time' | 'part-time' | 'contract' | 'internship'
  description: string
  requirements: string[]
  salary?: string
  active: boolean
  createdAt: string
}

let jobs: Job[] = [
  {
    id: '1',
    title: 'Designer Graphique',
    department: 'Design',
    location: 'Cotonou, Benin',
    type: 'full-time',
    description: 'Nous cherchons un designer graphique créatif pour rejoindre notre équipe.',
    requirements: ['Maîtrise de Photoshop/Illustrator', 'Portfolio impératif', 'Créativité', 'Communication'],
    salary: '150 000 - 250 000 XOF',
    active: true,
    createdAt: '2024-01-15T10:00:00Z'
  },
  {
    id: '2',
    title: 'Développeur Web',
    department: 'Technique',
    location: 'Remote',
    type: 'full-time',
    description: 'Développeur web Full Stack pour projets web et mobile.',
    requirements: ['React/Next.js', 'Node.js', 'TypeScript', 'Base de données'],
    salary: '200 000 - 350 000 XOF',
    active: true,
    createdAt: '2024-01-10T10:00:00Z'
  },
  {
    id: '3',
    title: 'Community Manager',
    department: 'Marketing',
    location: 'Cotonou, Benin',
    type: 'full-time',
    description: 'Gérez nos réseaux sociaux et communauté en ligne.',
    requirements: ['Expérience réseaux sociaux', 'Créateur de contenu', 'Anglais', 'Gestion de communauté'],
    salary: '100 000 - 180 000 XOF',
    active: true,
    createdAt: '2024-01-05T10:00:00Z'
  }
]

let applications: any[] = []

// GET - Get jobs
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const active = searchParams.get('active')
  const department = searchParams.get('department')

  let result = [...jobs]

  if (active === 'true') result = result.filter(j => j.active)
  if (department) result = result.filter(j => j.department === department)

  return NextResponse.json({
    jobs: result,
    departments: Array.from(new Set(jobs.map(j => j.department)))
  })
}

// POST - Apply for job or add job
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { jobId, applicantName, applicantEmail, applicantPhone, cv, coverLetter, ...jobData } = body

    // If jobId provided, it's an application
    if (jobId) {
      if (!applicantName || !applicantEmail) {
        return NextResponse.json({ error: 'Veuillez remplir tous les champs' }, { status: 400 })
      }

      applications.push({
        id: `app_${Date.now()}`,
        jobId,
        applicantName,
        applicantEmail,
        applicantPhone: applicantPhone || '',
        cv: cv || '',
        coverLetter: coverLetter || '',
        status: 'pending',
        createdAt: new Date().toISOString()
      })

      return NextResponse.json({
        success: true,
        message: 'Candidature envoyée! Nous vous contacterons sous 48h.'
      })
    }

    // Otherwise create new job
    if (!jobData.title || !jobData.department) {
      return NextResponse.json({ error: 'Titre et département requis' }, { status: 400 })
    }

    const job: Job = {
      id: `job_${Date.now()}`,
      ...jobData,
      active: true,
      createdAt: new Date().toISOString()
    }

    jobs.push(job)

    return NextResponse.json({ success: true, job })

  } catch (error) {
    return NextResponse.json({ error: 'Erreur' }, { status: 500 })
  }
}
