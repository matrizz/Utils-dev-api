import { NextRequest } from 'next/server'
import { db } from './db'

export async function verifyApiKey(request: NextRequest): Promise<boolean> {
  const apiKey = request.headers.get('x-api-key') || request.headers.get('authorization')?.replace('Bearer ', '')
  
  if (!apiKey) {
    return false
  }

  try {
    const key = await db.apiKey.findUnique({
      where: {
        key: apiKey,
        isActive: true
      }
    })
    
    return !!key
  } catch (error) {
    console.error('Error verifying API key:', error)
    return false
  }
}

export function createApiResponse(data: any, status: number = 200) {
  return Response.json(data, { 
    status,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-API-Key',
    }
  })
}

export function createErrorResponse(message: string, status: number = 400) {
  return createApiResponse({
    error: message,
    timestamp: new Date().toISOString()
  }, status)
}
