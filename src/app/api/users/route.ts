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
    const role = searchParams.get('role') || ''
    
    const skip = (page - 1) * limit

    const where = {
      ...(search && {
        OR: [
          { name: { contains: search, mode: 'insensitive' as const } },
          { email: { contains: search, mode: 'insensitive' as const } },
          { username: { contains: search, mode: 'insensitive' as const } }
        ]
      }),
      ...(role && { role })
    }

    const [users, total] = await Promise.all([
      db.user.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          name: true,
          email: true,
          username: true,
          avatar: true,
          role: true,
          bio: true,
          location: true,
          website: true,
          company: true,
          createdAt: true,
          _count: {
            select: {
              projects: true,
              tasks: true,
              comments: true
            }
          }
        }
      }),
      db.user.count({ where })
    ])

    return createApiResponse({
      data: users,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    })
  } catch (error) {
    console.error('Error fetching users:', error)
    return createErrorResponse('Internal server error', 500)
  }
}
