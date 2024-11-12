# Node.js Express TypeScript Template

A Node.js starter template using Express, MongoDB and TypeScript with a clean 3-tier architecture.
Start your Node.js application in 2 simple commands.
1. npm install
2. npm run dev

## Features

- **TypeScript Support** - Full TypeScript support with proper configuration
- **3-Tier Architecture** - Clean separation between routes, controllers, services, and repositories
- **MongoDB Integration** - Ready-to-use MongoDB connection and repository pattern
- **Error Handling** - Global error handling with custom error types
- **Security Middleware** - CORS, Helmet for secure HTTP headers
- **Rate Limiting** - Basic rate limiting configuration
- **Environment Variables** - dotenv configuration
- **Code Quality** - TypeScript strict mode enabled
- **Development Tools** - Nodemon 

## Project Structure

```
src/
├── config/
│   └── database.ts         # Database configuration
├── controllers/
│   └── catController.ts    # Example controller
├── middleware/
│   ├── errors/
│   │   └── AppError.ts     # Custom error classes
│   └── errorHandler.ts     # Global error handler
├── repositories/
│   └── catRepository.ts    # Example repository
├── services/
│   └── catService.ts       # Example service
├── types/
│   ├── cat.types.ts        # Type definitions
│   └── error.types.ts      # Error type definitions
├── routes/
│   └── catRoutes.ts        # Route definitions
├── app.ts                  # Express app setup
└── index.ts               # Application entry point
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/ngchinchia/nodejs-template.git
```

2. Install dependencies
```bash
npm install
```

3. Create a .env file in the root directory
```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/your_database
NODE_ENV=development
```

4. Start the development server
```bash
npm run dev
```

### Available Scripts

- `npm run dev` - Start the development server with hot reloading
- `npm run build` - Build the project for production
- `npm start` - Start the production server
- `npm test` - Run tests (when configured)

## API Example

The template includes a basic CRUD API for cats as an example:

### Endpoints

```typescript
// Create a new cat
POST /api/cats
Body: {
  "name": "Whiskers",
  "breed": "Persian",
  "age": 3
}

// Get all cats
GET /api/cats

// Get a specific cat
GET /api/cats/:id

// Update a cat
PUT /api/cats/:id
Body: {
  "age": 4
}

// Delete a cat
DELETE /api/cats/:id
```

### Error Handling

The template includes a global error handling system:

```typescript
// Example error responses
{
  "status": "error",
  "code": 404,
  "message": "Cat not found"
}

{
  "status": "error",
  "code": 400,
  "message": "Invalid input"
}
```

## Architecture

### 1. Controllers
Handle HTTP requests and responses.
```typescript
const createCat = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const cat = await catService.createCat(req.body);
    res.status(201).json({ data: cat });
  } catch (error) {
    next(error);
  }
};
```

### 2. Services
Implement business logic.
```typescript
const createCat = async (data: Omit<Cat, '_id'>): Promise<Cat> => {
  if (!data.name) {
    throw AppError.badRequest('Name is required');
  }
  return await catRepository.create(data);
};
```

### 3. Repositories
Handle database operations.
```typescript
const create = async (cat: Omit<Cat, '_id'>): Promise<Cat> => {
  const collection = await getCollection();
  const result = await collection.insertOne(cat);
  return { ...cat, _id: result.insertedId };
};
```

## Adding New Features

1. Define types in `types/`
2. Create repository in `repositories/`
3. Implement service in `services/`
4. Create controller in `controllers/`
5. Define routes in `routes/`
6. Register routes in `app.ts`

## Best Practices

- Use the provided error handling system for consistent error responses
- Follow the established architecture pattern
- Keep controllers thin, put business logic in services
- Use TypeScript types for better type safety
- Use environment variables for configuration

## Error Types

```typescript
AppError.badRequest('Invalid input');  // 400
AppError.unauthorized('Not logged in'); // 401
AppError.forbidden('Not allowed');     // 403
AppError.notFound('Resource not found'); // 404
AppError.internal('Server error');     // 500
```


## Acknowledgments

- Express.js
- TypeScript
- MongoDB

---

Feel free to customize this template to your needs and contribute to its improvement!
