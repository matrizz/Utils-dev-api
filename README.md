# Development API 🚀

A comprehensive RESTful API designed for developers, providing read-only access to development-related data including users, projects, tasks, technologies, code snippets, and tool recommendations. Perfect for testing, prototyping, and learning API integration.

## ✨ Features

- 🔐 **Simple API Key Authentication** - Secure your requests with API keys
- 📊 **Rich Development Data** - Users, projects, tasks, technologies, and more
- 🔍 **Advanced Filtering & Search** - Query data with multiple parameters
- 📄 **Pagination Support** - Handle large datasets efficiently
- 🏃 **Read-Only Operations** - Safe for development and testing
- 🌐 **CORS Enabled** - Use from any frontend application
- 📝 **TypeScript Support** - Full type definitions included
- ⚡ **Fast & Reliable** - Built with Next.js and optimized for Vercel

## 🚀 Quick Start

### Using the API

1. **Get your API key** (demo keys available):
   - `dev_api_key_demo_123456789`
   - `dev_api_key_test_987654321`

2. **Make your first request**:
   ```bash
   curl -H "x-api-key: dev_api_key_demo_123456789" \
        "https://your-api-domain.vercel.app/api/users?limit=5"
   ```

### Local Development

1. **Clone the repository**:
   ```bash
   git clone <your-repo-url>
   cd dev-api
   ```

2. **Install dependencies**:
   ```bash
   pnpm install
   ```

3. **Set up the database**:
   ```bash
   cp .env.example .env.local
   pnpm run db:push
   pnpm run db:seed
   ```

4. **Start the development server**:
   ```bash
   pnpm dev
   ```

   Visit `http://localhost:3000/api` to see the API documentation.

## 📚 API Endpoints

Base URL: `https://your-api-domain.vercel.app/api`

### Authentication

All endpoints require an API key sent via:
- Header: `x-api-key: YOUR_API_KEY`
- Or: `Authorization: Bearer YOUR_API_KEY`

### Available Endpoints

#### 👥 Users
```
GET /api/users
```
Get developers and team members.

**Parameters:**
- `page` - Page number (default: 1)
- `limit` - Items per page (max: 100, default: 10)
- `search` - Search by name, email, or username
- `role` - Filter by role (developer, designer, product-manager, etc.)

**Example:**
```bash
curl -H "x-api-key: YOUR_API_KEY" \
     "https://your-api.vercel.app/api/users?role=developer&limit=5"
```

#### 🚀 Projects
```
GET /api/projects
```
Get development projects and repositories.

**Parameters:**
- `page`, `limit` - Pagination
- `search` - Search by name or description
- `language` - Filter by programming language
- `framework` - Filter by framework
- `status` - Filter by status (active, archived, maintenance)
- `sort` - Sort by (createdAt, updatedAt, name, stars, forks)
- `order` - Sort order (asc, desc)

**Example:**
```bash
curl -H "x-api-key: YOUR_API_KEY" \
     "https://your-api.vercel.app/api/projects?framework=React&sort=stars&order=desc"
```

#### ✅ Tasks
```
GET /api/tasks
```
Get development tasks and issues.

**Parameters:**
- `page`, `limit` - Pagination
- `search` - Search by title or description
- `status` - Filter by status (todo, in_progress, done, cancelled)
- `priority` - Filter by priority (low, medium, high, critical)
- `type` - Filter by type (feature, bug, enhancement, documentation)
- `project` - Filter by project ID

**Example:**
```bash
curl -H "x-api-key: YOUR_API_KEY" \
     "https://your-api.vercel.app/api/tasks?priority=high&status=in_progress"
```

#### ⚡ Technologies
```
GET /api/technologies
```
Get programming languages, frameworks, and tools.

**Parameters:**
- `page`, `limit` - Pagination
- `search` - Search by name or description
- `category` - Filter by category (language, framework, database, tool, service)
- `sort` - Sort by (popularity, createdAt, name)
- `order` - Sort order (asc, desc)

**Example:**
```bash
curl -H "x-api-key: YOUR_API_KEY" \
     "https://your-api.vercel.app/api/technologies?category=language&sort=popularity"
```

#### 💻 Code Snippets
```
GET /api/snippets
```
Get useful code snippets and examples.

**Parameters:**
- `page`, `limit` - Pagination
- `search` - Search by title, description, or tags
- `language` - Filter by programming language
- `category` - Filter by category (utility, algorithm, pattern, example)
- `sort` - Sort by (upvotes, views, createdAt, title)
- `order` - Sort order (asc, desc)

**Example:**
```bash
curl -H "x-api-key: YOUR_API_KEY" \
     "https://your-api.vercel.app/api/snippets?language=typescript&category=utility"
```

#### 🛠️ Tools
```
GET /api/tools
```
Get development tool recommendations.

**Parameters:**
- `page`, `limit` - Pagination
- `search` - Search by name or description
- `category` - Filter by category (ide, extension, cli, service, library)
- `price` - Filter by price (free, paid, freemium)
- `platform` - Filter by platform
- `sort` - Sort by (rating, createdAt, name)
- `order` - Sort order (asc, desc)

**Example:**
```bash
curl -H "x-api-key: YOUR_API_KEY" \
     "https://your-api.vercel.app/api/tools?category=ide&price=free"
```

## 📊 Response Format

All endpoints return data in this format:

```json
{
  "data": [...],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 100,
    "pages": 10
  }
}
```

### Error Responses

```json
{
  "error": "Error message",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

## 🔧 Technology Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Database**: SQLite (development) / PostgreSQL (production)
- **ORM**: Prisma
- **Deployment**: Vercel
- **Authentication**: API Key-based

## 🚢 Deployment

### Deploy to Vercel

1. **Fork this repository**

2. **Connect to Vercel**:
   - Import your repository to Vercel
   - Set environment variables (see `.env.example`)
   - Deploy!

3. **Set up your database**:
   ```bash
   # For SQLite (simple setup)
   DATABASE_URL="file:./dev.db"
   
   # For PostgreSQL (recommended for production)
   DATABASE_URL="postgresql://user:pass@host:5432/dbname"
   ```

4. **Seed your database** (optional):
   After deployment, you can run the seed command locally and push the database.

### Environment Variables

Required environment variables for production:

```bash
DATABASE_URL="your-database-connection-string"
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Issues**: [GitHub Issues](https://github.com/your-username/dev-api/issues)
- **Discussions**: [GitHub Discussions](https://github.com/your-username/dev-api/discussions)
- **Email**: your-email@example.com

## 🎯 Use Cases

This API is perfect for:

- **Learning API Integration** - Practice with realistic development data
- **Frontend Prototyping** - Quick backend for your frontend projects
- **Testing Applications** - Reliable test data for your apps
- **Demo Projects** - Showcase your frontend skills with rich data
- **Educational Projects** - Teach API concepts with real-world examples

## 🔮 Future Enhancements

- [ ] GraphQL support
- [ ] WebSocket endpoints for real-time data
- [ ] Additional data categories
- [ ] Rate limiting and analytics
- [ ] Custom API key management
- [ ] Data export functionality

---

**Built with ❤️ for the developer community**
