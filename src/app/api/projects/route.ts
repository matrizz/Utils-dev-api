import { NextRequest } from 'next/server'
import { db } from '@/lib/db'
import { verifyApiKey, createApiResponse, createErrorResponse } from '@/lib/auth'

export async function GET(request: NextRequest) {
  const isValidKey = await verifyApiKey(request)
  if (!isValidKey) {
    return createErrorResponse('Invalid or missing API key', 401)
  }

  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = Math.min(parseInt(searchParams.get('limit') || '10'), 100)
    const search = searchParams.get('search') || ''
    const language = searchParams.get('language') || ''
    const framework = searchParams.get('framework') || ''
    const status = searchParams.get('status') || ''
    const sortBy = searchParams.get('sort') || 'createdAt'
    const sortOrder = searchParams.get('order') === 'asc' ? 'asc' : 'desc'
    
    const skip = (page - 1) * limit

    const where = {
      isPublic: true,
      ...(search && {
        OR: [
          { name: { contains: search, mode: 'insensitive' as const } },
          { description: { contains: search, mode: 'insensitive' as const } }
        ]
      }),
      ...(language && { language }),
      ...(framework && { framework }),
      ...(status && { status })
    }

    const validSortFields = ['createdAt', 'updatedAt', 'name', 'stars', 'forks']
    const orderBy = validSortFields.includes(sortBy) 
      ? { [sortBy]: sortOrder }
      : { createdAt: 'desc' }

    const [projects, total] = await Promise.all([
      db.project.findMany({
        where,
        skip,
        take: limit,
        orderBy,
        include: {
          owner: {
            select: {
              id: true,
              name: true,
              username: true,
              avatar: true
            }
          },
          technologies: {
            select: {
              id: true,
              name: true,
              category: true
            }
          },
          _count: {
            select: {
              tasks: true,
              comments: true,
              releases: true
            }
          }
        }
      }),
      db.project.count({ where })
    ])

    return createApiResponse({
      data: projects,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    })
  } catch (error) {
    console.error('Error fetching projects:', error)
    return createErrorResponse('Internal server error', 500)
  }
}
