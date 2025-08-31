// @ts-nocheck

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
    const category = searchParams.get('category') || ''
    const sortBy = searchParams.get('sort') || 'upvotes'
    const sortOrder = searchParams.get('order') === 'asc' ? 'asc' : 'desc'
    
    const skip = (page - 1) * limit

    const where = {
      isPublic: true,
      ...(search && {
        OR: [
          { title: { contains: search, mode: 'insensitive' as const } },
          { description: { contains: search, mode: 'insensitive' as const } },
          { tags: { contains: search, mode: 'insensitive' as const } }
        ]
      }),
      ...(language && { language }),
      ...(category && { category })
    }

    const validSortFields = ['upvotes', 'views', 'createdAt', 'title']
    const orderBy = validSortFields.includes(sortBy) 
      ? { [sortBy]: sortOrder }
      : { upvotes: 'desc' }

    const [snippets, total] = await Promise.all([
      db.codeSnippet.findMany({
        where,
        skip,
        take: limit,
        orderBy
      }),
      db.codeSnippet.count({ where })
    ])

    return createApiResponse({
      data: snippets,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    })
  } catch (error) {
    console.error('Error fetching code snippets:', error)
    return createErrorResponse('Internal server error', 500)
  }
}
