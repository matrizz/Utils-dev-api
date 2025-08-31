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
    const category = searchParams.get('category') || ''
    const price = searchParams.get('price') || ''
    const platform = searchParams.get('platform') || ''
    const sortBy = searchParams.get('sort') || 'rating'
    const sortOrder = searchParams.get('order') === 'asc' ? 'asc' : 'desc'
    
    const skip = (page - 1) * limit

    const where = {
      ...(search && {
        OR: [
          { name: { contains: search, mode: 'insensitive' as const } },
          { description: { contains: search, mode: 'insensitive' as const } }
        ]
      }),
      ...(category && { category }),
      ...(price && { price }),
      ...(platform && { platform })
    }

    const validSortFields = ['rating', 'createdAt', 'name']
    const orderBy = validSortFields.includes(sortBy) 
      ? { [sortBy]: sortOrder }
      : { rating: 'desc' }

    const [tools, total] = await Promise.all([
      db.toolRecommendation.findMany({
        where,
        skip,
        take: limit,
        orderBy
      }),
      db.toolRecommendation.count({ where })
    ])

    return createApiResponse({
      data: tools,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    })
  } catch (error) {
    console.error('Error fetching tools:', error)
    return createErrorResponse('Internal server error', 500)
  }
}
