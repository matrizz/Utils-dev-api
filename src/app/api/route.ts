// @ts-nocheck


import { NextRequest } from 'next/server'
import { createApiResponse } from '@/lib/auth'

export async function GET(request: NextRequest) {
  const baseUrl = request.nextUrl.origin

  return createApiResponse({
    name: 'Development API',
    version: '1.0.0',
    description: 'A comprehensive API for development-related data with read-only access',
    authentication: {
      type: 'API Key',
      headers: ['x-api-key', 'Authorization: Bearer {token}']
    },
    endpoints: {
      users: {
        url: `${baseUrl}/api/users`,
        method: 'GET',
        description: 'Get developers and users',
        parameters: {
          page: 'Page number (default: 1)',
          limit: 'Items per page (max: 100, default: 10)',
          search: 'Search by name, email, or username',
          role: 'Filter by role'
        }
      },
      projects: {
        url: `${baseUrl}/api/projects`,
        method: 'GET',
        description: 'Get development projects',
        parameters: {
          page: 'Page number (default: 1)',
          limit: 'Items per page (max: 100, default: 10)',
          search: 'Search by name or description',
          language: 'Filter by programming language',
          framework: 'Filter by framework',
          status: 'Filter by status (active, archived, maintenance)',
          sort: 'Sort by (createdAt, updatedAt, name, stars, forks)',
          order: 'Sort order (asc, desc)'
        }
      },
      tasks: {
        url: `${baseUrl}/api/tasks`,
        method: 'GET',
        description: 'Get development tasks and issues',
        parameters: {
          page: 'Page number (default: 1)',
          limit: 'Items per page (max: 100, default: 10)',
          search: 'Search by title or description',
          status: 'Filter by status (todo, in_progress, done, cancelled)',
          priority: 'Filter by priority (low, medium, high, critical)',
          type: 'Filter by type (feature, bug, enhancement, documentation)',
          project: 'Filter by project ID'
        }
      },
      technologies: {
        url: `${baseUrl}/api/technologies`,
        method: 'GET',
        description: 'Get programming languages, frameworks, and tools',
        parameters: {
          page: 'Page number (default: 1)',
          limit: 'Items per page (max: 100, default: 10)',
          search: 'Search by name or description',
          category: 'Filter by category (language, framework, database, tool, service)',
          sort: 'Sort by (popularity, createdAt, name)',
          order: 'Sort order (asc, desc)'
        }
      },
      snippets: {
        url: `${baseUrl}/api/snippets`,
        method: 'GET',
        description: 'Get code snippets and examples',
        parameters: {
          page: 'Page number (default: 1)',
          limit: 'Items per page (max: 100, default: 10)',
          search: 'Search by title, description, or tags',
          language: 'Filter by programming language',
          category: 'Filter by category (utility, algorithm, pattern, example)',
          sort: 'Sort by (upvotes, views, createdAt, title)',
          order: 'Sort order (asc, desc)'
        }
      },
      tools: {
        url: `${baseUrl}/api/tools`,
        method: 'GET',
        description: 'Get development tool recommendations',
        parameters: {
          page: 'Page number (default: 1)',
          limit: 'Items per page (max: 100, default: 10)',
          search: 'Search by name or description',
          category: 'Filter by category (ide, extension, cli, service, library)',
          price: 'Filter by price (free, paid, freemium)',
          platform: 'Filter by platform',
          sort: 'Sort by (rating, createdAt, name)',
          order: 'Sort order (asc, desc)'
        }
      }
    },
    examples: {
      'Get first 5 users': `curl -H \"x-api-key: YOUR_API_KEY\" \"${baseUrl}/api/users?limit=5\"`,
      'Search projects by React': `curl -H \"x-api-key: YOUR_API_KEY\" \"${baseUrl}/api/projects?framework=React\"`,
      'Get high priority tasks': `curl -H \"x-api-key: YOUR_API_KEY\" \"${baseUrl}/api/tasks?priority=high\"`,
      'Find JavaScript snippets': `curl -H \"x-api-key: YOUR_API_KEY\" \"${baseUrl}/api/snippets?language=javascript\"`
    },
    contact: {
      documentation: `${baseUrl}/README.md`,
      repository: 'https://github.com/your-username/dev-api'
    }
  })
}
