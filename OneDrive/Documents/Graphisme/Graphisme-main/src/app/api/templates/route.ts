import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const dataDir = path.join(process.cwd(), 'src/lib/db/data')
const templatesFile = path.join(dataDir, 'templates.json')

// GET - Retrieve all templates with filtering
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    
    const category = searchParams.get('category')
    const subcategory = searchParams.get('subcategory')
    const style = searchParams.get('style')
    const colorScheme = searchParams.get('colorScheme')
    const layout = searchParams.get('layout')
    const premium = searchParams.get('premium')
    const popular = searchParams.get('popular')
    const search = searchParams.get('search')
    const tags = searchParams.get('tags')?.split(',')
    const technologies = searchParams.get('technologies')?.split(',')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')
    const sortBy = searchParams.get('sortBy') || 'popular'
    const sortOrder = searchParams.get('sortOrder') || 'desc'

    // Read templates data
    const templatesData = JSON.parse(fs.readFileSync(templatesFile, 'utf-8'))
    let templates = [...templatesData.templates]
    let categories = templatesData.categories
    let styles = templatesData.styles
    let colorSchemes = templatesData.colorSchemes
    let layouts = templatesData.layouts
    let features = templatesData.features

    // Apply filters
    if (category) {
      templates = templates.filter(t => t.category === category)
    }
    if (subcategory) {
      templates = templates.filter(t => t.subcategory === subcategory)
    }
    if (style) {
      templates = templates.filter(t => t.style === style)
    }
    if (colorScheme) {
      templates = templates.filter(t => t.colorScheme === colorScheme)
    }
    if (layout) {
      templates = templates.filter(t => t.layout === layout)
    }
    if (premium === 'true') {
      templates = templates.filter(t => t.premium === true)
    }
    if (popular === 'true') {
      templates = templates.filter(t => t.popular === true)
    }
    if (search) {
      const searchLower = search.toLowerCase()
      templates = templates.filter(t => 
        t.name.toLowerCase().includes(searchLower) ||
        t.description.toLowerCase().includes(searchLower) ||
        t.tags.some((tag: string) => tag.toLowerCase().includes(searchLower))
      )
    }
    if (tags && tags.length > 0) {
      templates = templates.filter(t => 
        tags.some(tag => t.tags.includes(tag.trim()))
      )
    }
    if (technologies && technologies.length > 0) {
      templates = templates.filter(t => 
        technologies.some(tech => t.technologies.includes(tech.trim()))
      )
    }

    // Sort
    templates.sort((a: any, b: any) => {
      let aVal = a[sortBy] || 0
      let bVal = b[sortBy] || 0
      if (typeof aVal === 'string') {
        return sortOrder === 'asc' 
          ? aVal.localeCompare(bVal)
          : bVal.localeCompare(aVal)
      }
      return sortOrder === 'asc' ? aVal - bVal : bVal - aVal
    })

    // Pagination
    const total = templates.length
    const totalPages = Math.ceil(total / limit)
    const start = (page - 1) * limit
    const paginatedTemplates = templates.slice(start, start + limit)

    return NextResponse.json({
      success: true,
      data: {
        templates: paginatedTemplates,
        pagination: {
          page,
          limit,
          total,
          totalPages,
          hasMore: page < totalPages
        },
        filters: {
          categories,
          styles,
          colorSchemes,
          layouts,
          features
        }
      }
    })
  } catch (error) {
    console.error('Error fetching templates:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch templates' },
      { status: 500 }
    )
  }
}

// POST - Create new template
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate required fields
    const requiredFields = ['name', 'category', 'style', 'colorScheme', 'layout']
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { success: false, error: `Missing required field: ${field}` },
          { status: 400 }
        )
      }
    }

    // Read existing templates
    const templatesData = JSON.parse(fs.readFileSync(templatesFile, 'utf-8'))
    
    // Generate unique ID
    const newId = `tpl-${String(templatesData.templates.length + 1).padStart(3, '0')}`
    
    // Create new template
    const newTemplate = {
      id: newId,
      name: body.name,
      category: body.category,
      subcategory: body.subcategory || body.category,
      style: body.style,
      colorScheme: body.colorScheme,
      layout: body.layout,
      features: body.features || [],
      technologies: body.technologies || [],
      tags: body.tags || [],
      premium: body.premium || false,
      popular: body.popular || false,
      image: body.image || `/templates/${body.category}/${newId}.jpg`,
      mockup: body.mockup || `/mockups/${body.category}/${newId}-mockup.jpg`,
      description: body.description || '',
      longDescription: body.longDescription || '',
      caseStudy: body.caseStudy || null
    }

    // Add to templates array
    templatesData.templates.push(newTemplate)
    
    // Save to file
    fs.writeFileSync(templatesFile, JSON.stringify(templatesData, null, 2))

    return NextResponse.json({
      success: true,
      data: newTemplate
    }, { status: 201 })
  } catch (error) {
    console.error('Error creating template:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create template' },
      { status: 500 }
    )
  }
}
