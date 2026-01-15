import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'User Management Service API',
      version: '1.0.0',
      description: 'A RESTful API for managing users with authentication',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development server',
      },
      {
        url: 'https://user-api.example.com',
        description: 'Production server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'JWT token to access protected routes'
        }
      },
      schemas: {
        User: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              description: 'Unique identifier for the user',
              example: 1
            },
            fullName: {
              type: 'string',
              description: 'Full name of the user',
              example: 'John Doe'
            },
            birthDate: {
              type: 'string',
              format: 'date',
              description: 'Birth date of the user',
              example: '1990-01-01'
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'Email address of the user',
              example: 'john@example.com'
            },
            role: {
              type: 'string',
              enum: ['admin', 'user'],
              description: 'Role of the user',
              example: 'user'
            },
            isActive: {
              type: 'boolean',
              description: 'Status of the user account',
              example: true
            }
          }
        },
        RegisterRequest: {
          type: 'object',
          required: ['fullName', 'birthDate', 'email', 'password'],
          properties: {
            fullName: {
              type: 'string',
              description: 'Full name of the user',
              example: 'John Doe',
              maxLength: 100
            },
            birthDate: {
              type: 'string',
              format: 'date',
              description: 'Birth date of the user in ISO format',
              example: '1990-01-01'
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'Email address of the user',
              example: 'john@example.com'
            },
            password: {
              type: 'string',
              minLength: 6,
              description: 'Password for the user account',
              example: 'password123'
            }
          }
        },
        LoginRequest: {
          type: 'object',
          required: ['email', 'password'],
          properties: {
            email: {
              type: 'string',
              format: 'email',
              description: 'Email address of the user',
              example: 'john@example.com'
            },
            password: {
              type: 'string',
              description: 'Password for the user account',
              example: 'password123'
            }
          }
        },
        AuthResponse: {
          type: 'object',
          properties: {
            message: {
              type: 'string',
              description: 'Response message',
              example: 'User registered successfully'
            },
            token: {
              type: 'string',
              description: 'JWT token for authentication',
              example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
            },
            user: {
              $ref: '#/components/schemas/User'
            }
          }
        },
        ErrorResponse: {
          type: 'object',
          properties: {
            message: {
              type: 'string',
              description: 'Error message',
              example: 'User with this email already exists'
            }
          }
        }
      }
    }
  },
  apis: ['./src/routes/*.ts', './src/controllers/*.ts'], // files containing OpenAPI definitions
};

const specs = swaggerJsdoc(options);

export { specs, swaggerUi };