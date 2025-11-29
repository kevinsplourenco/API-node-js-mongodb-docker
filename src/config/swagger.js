const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Gerenciamento de Estudantes',
      description: 'API REST desenvolvida em Node.js com Express e MongoDB para gerenciar dados de estudantes',
      version: '1.0.0',
      contact: {
        name: 'Suporte',
        email: 'suporte@example.com'
      }
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Servidor Local'
      },
      {
        url: 'http://app:3000',
        description: 'Servidor Docker'
      }
    ],
    components: {
      schemas: {
        Student: {
          type: 'object',
          required: ['name', 'email', 'matricula', 'age', 'course'],
          properties: {
            _id: {
              type: 'string',
              description: 'ID único do estudante (MongoDB ObjectId)',
              example: '507f1f77bcf86cd799439011'
            },
            name: {
              type: 'string',
              description: 'Nome completo do estudante',
              example: 'João Silva'
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'Email único do estudante',
              example: 'joao@example.com'
            },
            matricula: {
              type: 'string',
              description: 'Número de matrícula único',
              example: '2023001'
            },
            age: {
              type: 'number',
              description: 'Idade do estudante (mínimo 18)',
              example: 20
            },
            course: {
              type: 'string',
              enum: ['Engenharia', 'Administração', 'Sistemas', 'Marketing', 'Outros'],
              description: 'Curso do estudante',
              example: 'Engenharia'
            },
            active: {
              type: 'boolean',
              description: 'Status ativo do estudante',
              example: true,
              default: true
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'Data de criação do registro',
              example: '2024-11-25T10:30:00.000Z'
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              description: 'Data da última atualização',
              example: '2024-11-25T10:30:00.000Z'
            }
          }
        },
        Error: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              example: false
            },
            message: {
              type: 'string',
              example: 'Erro ao processar a requisição'
            },
            error: {
              type: 'string',
              example: 'Detalhes do erro'
            }
          }
        }
      }
    },
    tags: [
      {
        name: 'Students',
        description: 'Operações de gerenciamento de estudantes'
      }
    ]
  },
  apis: ['./src/routes/*.js']
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
