import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting seed...')

  await prisma.apiKey.createMany({
    data: [
      {
        key: 'dev_api_key_demo_123456789',
        name: 'Demo API Key',
        isActive: true
      },
      {
        key: 'dev_api_key_test_987654321',
        name: 'Test API Key',
        isActive: true
      }
    ]
  })
  const technologies = await Promise.all([
    prisma.technology.create({
      data: {
        name: 'JavaScript',
        category: 'language',
        description: 'A versatile programming language for web development',
        website: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
        popularity: 95
      }
    }),
    prisma.technology.create({
      data: {
        name: 'TypeScript',
        category: 'language',
        description: 'JavaScript with static type definitions',
        website: 'https://www.typescriptlang.org/',
        popularity: 85
      }
    }),
    prisma.technology.create({
      data: {
        name: 'React',
        category: 'framework',
        description: 'A JavaScript library for building user interfaces',
        website: 'https://reactjs.org/',
        popularity: 90
      }
    }),
    prisma.technology.create({
      data: {
        name: 'Next.js',
        category: 'framework',
        description: 'The React Framework for Production',
        website: 'https://nextjs.org/',
        popularity: 80
      }
    }),
    prisma.technology.create({
      data: {
        name: 'Node.js',
        category: 'runtime',
        description: 'JavaScript runtime built on Chrome\'s V8 JavaScript engine',
        website: 'https://nodejs.org/',
        popularity: 85
      }
    }),
    prisma.technology.create({
      data: {
        name: 'PostgreSQL',
        category: 'database',
        description: 'Open source object-relational database system',
        website: 'https://www.postgresql.org/',
        popularity: 75
      }
    }),
    prisma.technology.create({
      data: {
        name: 'Docker',
        category: 'tool',
        description: 'Platform for developing, shipping, and running applications',
        website: 'https://www.docker.com/',
        popularity: 80
      }
    }),
    prisma.technology.create({
      data: {
        name: 'Git',
        category: 'tool',
        description: 'Distributed version control system',
        website: 'https://git-scm.com/',
        popularity: 98
      }
    })
  ])

  const users = await Promise.all([
    prisma.user.create({
      data: {
        name: 'John Smith',
        email: 'john.smith@example.com',
        username: 'johnsmith',
        avatar: 'https://i.pravatar.cc/150?u=john.smith@example.com',
        role: 'developer',
        bio: 'Full-stack developer with 5+ years of experience',
        location: 'San Francisco, CA',
        website: 'https://johnsmith.dev',
        company: 'Tech Innovations Inc.'
      }
    }),
    prisma.user.create({
      data: {
        name: 'Sarah Johnson',
        email: 'sarah.johnson@example.com',
        username: 'sarahj',
        avatar: 'https://i.pravatar.cc/150?u=sarah.johnson@example.com',
        role: 'designer',
        bio: 'UI/UX Designer passionate about creating beautiful experiences',
        location: 'New York, NY',
        website: 'https://sarahdesigns.com',
        company: 'Creative Solutions'
      }
    }),
    prisma.user.create({
      data: {
        name: 'Mike Chen',
        email: 'mike.chen@example.com',
        username: 'mikechen',
        avatar: 'https://i.pravatar.cc/150?u=mike.chen@example.com',
        role: 'developer',
        bio: 'Backend engineer specializing in distributed systems',
        location: 'Seattle, WA',
        website: 'https://mikechen.dev',
        company: 'Cloud Systems Corp'
      }
    }),
    prisma.user.create({
      data: {
        name: 'Emily Davis',
        email: 'emily.davis@example.com',
        username: 'emilyd',
        avatar: 'https://i.pravatar.cc/150?u=emily.davis@example.com',
        role: 'product-manager',
        bio: 'Product Manager with a focus on developer tools',
        location: 'Austin, TX',
        website: 'https://emilydavis.pm'
      }
    })
  ])

  const projects = await Promise.all([
    prisma.project.create({
      data: {
        name: 'TaskMaster Pro',
        description: 'A comprehensive task management application with real-time collaboration',
        repository: 'https://github.com/johnsmith/taskmaster-pro',
        homepage: 'https://taskmaster.pro',
        language: 'TypeScript',
        framework: 'Next.js',
        status: 'active',
        isPublic: true,
        stars: 156,
        forks: 23,
        ownerId: users[0].id,
        technologies: {
          connect: [
            { id: technologies[1].id },
            { id: technologies[3].id },
            { id: technologies[2].id }
          ]
        }
      }
    }),
    prisma.project.create({
      data: {
        name: 'API Gateway Service',
        description: 'Microservices API gateway with load balancing and authentication',
        repository: 'https://github.com/mikechen/api-gateway',
        language: 'JavaScript',
        framework: 'Express.js',
        status: 'active',
        isPublic: true,
        stars: 89,
        forks: 12,
        ownerId: users[2].id,
        technologies: {
          connect: [
            { id: technologies[0].id },
            { id: technologies[4].id },
            { id: technologies[6].id }
          ]
        }
      }
    }),
    prisma.project.create({
      data: {
        name: 'Design System Components',
        description: 'React component library with Storybook documentation',
        repository: 'https://github.com/sarahj/design-system',
        homepage: 'https://ds.sarahdesigns.com',
        language: 'TypeScript',
        framework: 'React',
        status: 'maintenance',
        isPublic: true,
        stars: 234,
        forks: 45,
        ownerId: users[1].id,
        technologies: {
          connect: [
            { id: technologies[1].id },
            { id: technologies[2].id }
          ]
        }
      }
    })
  ])

  // Create Tasks
  await Promise.all([
    prisma.task.create({
      data: {
        title: 'Implement real-time notifications',
        description: 'Add WebSocket support for real-time task updates',
        status: 'in_progress',
        priority: 'high',
        type: 'feature',
        labels: 'websockets,realtime,notifications',
        estimatedHours: 8,
        projectId: projects[0].id,
        assigneeId: users[0].id
      }
    }),
    prisma.task.create({
      data: {
        title: 'Fix memory leak in task scheduler',
        description: 'Investigation shows memory usage increases over time',
        status: 'todo',
        priority: 'critical',
        type: 'bug',
        labels: 'bug,memory,scheduler',
        estimatedHours: 4,
        projectId: projects[0].id,
        assigneeId: users[0].id
      }
    }),
    prisma.task.create({
      data: {
        title: 'Add rate limiting middleware',
        description: 'Implement rate limiting to prevent API abuse',
        status: 'todo',
        priority: 'medium',
        type: 'feature',
        labels: 'security,middleware,api',
        estimatedHours: 6,
        projectId: projects[1].id,
        assigneeId: users[2].id
      }
    }),
    prisma.task.create({
      data: {
        title: 'Update component documentation',
        description: 'Add examples and usage guidelines for new components',
        status: 'done',
        priority: 'low',
        type: 'documentation',
        labels: 'docs,components,examples',
        estimatedHours: 3,
        completedAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
        projectId: projects[2].id,
        assigneeId: users[1].id
      }
    })
  ])

  await Promise.all([
    prisma.codeSnippet.create({
      data: {
        title: 'Async/Await Error Handling',
        description: 'Clean way to handle errors in async functions',
        code: `async function fetchData(url: string) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(\`HTTP error! status: \${response.status}\`);
    }
    return await response.json();
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
}`,
        language: 'typescript',
        category: 'utility',
        tags: 'async,error-handling,fetch,typescript',
        upvotes: 45,
        views: 234,
        isPublic: true
      }
    }),
    prisma.codeSnippet.create({
      data: {
        title: 'React Custom Hook for API Calls',
        description: 'Reusable hook for making API requests with loading and error states',
        code: `import { useState, useEffect } from 'react';

function useApi<T>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const response = await fetch(url);
        if (!response.ok) throw new Error('Failed to fetch');
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [url]);

  return { data, loading, error };
}`,
        language: 'typescript',
        category: 'pattern',
        tags: 'react,hooks,api,typescript,custom-hook',
        upvotes: 78,
        views: 456,
        isPublic: true
      }
    }),
    prisma.codeSnippet.create({
      data: {
        title: 'Debounce Function',
        description: 'Utility function to debounce rapid function calls',
        code: `function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

// Usage
const debouncedSearch = debounce((query: string) => {
  console.log('Searching for:', query);
}, 300);`,
        language: 'typescript',
        category: 'utility',
        tags: 'debounce,performance,utility,typescript',
        upvotes: 62,
        views: 189,
        isPublic: true
      }
    })
  ])

  await Promise.all([
    prisma.toolRecommendation.create({
      data: {
        name: 'Visual Studio Code',
        category: 'ide',
        description: 'Lightweight but powerful source code editor with great extension ecosystem',
        website: 'https://code.visualstudio.com/',
        price: 'free',
        platform: 'cross-platform',
        rating: 4.8,
        pros: 'Excellent extensions, fast, customizable, great debugging',
        cons: 'Can be resource intensive with many extensions'
      }
    }),
    prisma.toolRecommendation.create({
      data: {
        name: 'Postman',
        category: 'service',
        description: 'API development environment for testing and documenting APIs',
        website: 'https://www.postman.com/',
        price: 'freemium',
        platform: 'cross-platform',
        rating: 4.6,
        pros: 'Great UI, collaboration features, comprehensive testing',
        cons: 'Premium features can be expensive'
      }
    }),
    prisma.toolRecommendation.create({
      data: {
        name: 'Oh My Zsh',
        category: 'cli',
        description: 'Framework for managing your Zsh configuration with themes and plugins',
        website: 'https://ohmyz.sh/',
        price: 'free',
        platform: 'unix',
        rating: 4.7,
        pros: 'Huge plugin ecosystem, beautiful themes, active community',
        cons: 'Can slow down shell startup time'
      }
    }),
    prisma.toolRecommendation.create({
      data: {
        name: 'Figma',
        category: 'service',
        description: 'Collaborative interface design tool',
        website: 'https://www.figma.com/',
        price: 'freemium',
        platform: 'web',
        rating: 4.9,
        pros: 'Real-time collaboration, browser-based, excellent design tools',
        cons: 'Limited offline capabilities'
      }
    })
  ])

  await Promise.all([
    prisma.article.create({
      data: {
        title: 'Getting Started with TypeScript in 2024',
        slug: 'getting-started-typescript-2024',
        excerpt: 'A comprehensive guide to learning TypeScript from scratch',
        content: 'This article covers the fundamentals of TypeScript...',
        published: true,
        featured: true,
        category: 'tutorial',
        tags: 'typescript,javascript,beginner,tutorial',
        views: 1250,
        readingTime: 8,
        publishedAt: new Date(),
        technologies: {
          connect: [{ id: technologies[1].id }]
        }
      }
    }),
    prisma.article.create({
      data: {
        title: 'Building Scalable React Applications',
        slug: 'building-scalable-react-applications',
        excerpt: 'Best practices for structuring large React applications',
        content: 'Learn how to organize your React codebase for scalability...',
        published: true,
        category: 'guide',
        tags: 'react,architecture,scalability,best-practices',
        views: 890,
        readingTime: 12,
        publishedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        technologies: {
          connect: [{ id: technologies[2].id }]
        }
      }
    })
  ])

  await Promise.all([
    prisma.comment.create({
      data: {
        content: 'Great project! The real-time features work perfectly.',
        authorId: users[1].id,
        projectId: projects[0].id
      }
    }),
    prisma.comment.create({
      data: {
        content: 'This task is blocking the deployment. High priority!',
        authorId: users[3].id,
        taskId: (await prisma.task.findFirst({ where: { title: 'Fix memory leak in task scheduler' } }))!.id
      }
    })
  ])

  // Create releases
  await Promise.all([
    prisma.release.create({
      data: {
        version: '1.0.0',
        name: 'Initial Release',
        description: 'First stable release of TaskMaster Pro',
        changelog: '- Initial task management features\n- User authentication\n- Real-time updates',
        isPrerelease: false,
        isDraft: false,
        downloads: 245,
        publishedAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
        projectId: projects[0].id
      }
    }),
    prisma.release.create({
      data: {
        version: '1.1.0-beta',
        name: 'Beta Release',
        description: 'Beta release with new collaboration features',
        changelog: '- Added team collaboration\n- Improved performance\n- Bug fixes',
        isPrerelease: true,
        isDraft: false,
        downloads: 89,
        publishedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        projectId: projects[0].id
      }
    })
  ])

  console.log('✅ Seed completed successfully!')
  console.log('🔑 Demo API Keys:')
  console.log('   - dev_api_key_demo_123456789')
  console.log('   - dev_api_key_test_987654321')
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
