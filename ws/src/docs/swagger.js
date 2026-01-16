const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Livraria Online',
      version: '1.0.0',
      description: 'Documentação da API da Livraria Online'
    },
    servers: [
      {
        url: 'http://localhost:3000/api',
        description: 'Servidor Local'
      }
    ],
    components: {
        securitySchemes: {
            bearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT'
            }
        },
        schemas: {

            /* =======================
            USUÁRIO
            ======================= */
            Usuario: {
            type: 'object',
            properties: {
                id: { type: 'integer', example: 1 },
                nome: { type: 'string', example: 'João Silva' },
                email: { type: 'string', example: 'joao@email.com' },
                tipo: { type: 'string', example: 'cliente' }
            }
            },

            /* =======================
            CATEGORIA
            ======================= */
            Categoria: {
            type: 'object',
            properties: {
                id: { type: 'integer', example: 1 },
                titulo: { type: 'string', example: 'Tecnologia' },
                descricao: { type: 'string', example: 'Livros técnicos' },
                imagem: { type: 'string', example: 'categoria.png' }
            }
            },

            /* =======================
            LIVRO
            ======================= */
            Livro: {
            type: 'object',
            properties: {
                id: { type: 'integer', example: 1 },
                titulo: { type: 'string', example: 'Node.js Avançado' },
                descricao: { type: 'string' },
                autor: { type: 'string', example: 'Fulano' },
                preco: { type: 'number', example: 49.90 },
                formato: { type: 'string', example: 'pdf' },
                capa: { type: 'string', example: 'capa.jpg' },
                arquivo: { type: 'string', example: 'livro.pdf' },
                categoria_id: { type: 'integer', example: 1 }
            }
            },

            /* =======================
            COMPRA
            ======================= */
            Compra: {
            type: 'object',
            properties: {
                id: { type: 'integer', example: 10 },
                user_id: { type: 'integer', example: 1 },
                total: { type: 'number', example: 99.80 },
                status: {
                type: 'string',
                enum: ['pendente', 'pago', 'cancelado'],
                example: 'pago'
                },
                data_compra: {
                type: 'string',
                format: 'date-time',
                example: '2026-01-14T20:00:00Z'
                }
            }
            },

            /* =======================
            ITEM COMPRA
            ======================= */
            ItemCompra: {
            type: 'object',
            properties: {
                id: { type: 'integer', example: 5 },
                compra_id: { type: 'integer', example: 10 },
                livro_id: { type: 'integer', example: 1 },
                preco: { type: 'number', example: 49.90 }
            }
            },

            /* =======================
            BIBLIOTECA
            ======================= */
            Biblioteca: {
            type: 'object',
            properties: {
                id: { type: 'integer', example: 3 },
                user_id: { type: 'integer', example: 1 },
                livro_id: { type: 'integer', example: 1 },
                progresso: {
                type: 'integer',
                example: 45,
                description: 'Progresso de leitura em porcentagem'
                },
                pagina_atual: {
                type: 'integer',
                example: 120
                },
                ultima_leitura: {
                type: 'string',
                format: 'date',
                example: '2026-01-14'
                }
            }
            }
        }
    },
    security: [{ bearerAuth: [] }]
  },
  apis: ['./src/routes/*.js'] // Lê comentários das rotas
};

module.exports = swaggerJsdoc(options);
