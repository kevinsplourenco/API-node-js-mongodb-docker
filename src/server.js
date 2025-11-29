const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
require('dotenv').config();

const connectDB = require('./config/database');
const swaggerSpec = require('./config/swagger');
const studentRoutes = require('./routes/studentRoutes');

const app = express();

connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

// Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
  swaggerOptions: {
    url: '/swagger.json'
  }
}));

app.get('/swagger.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

app.use('/api/students', studentRoutes);

app.get('/', (req, res) => {
  res.status(200).json({
    message: 'API de Gerenciamento de Estudantes',
    version: '1.0.0',
    endpoints: {
      docs: '/api-docs',
      students: '/api/students'
    }
  });
});

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Rota não encontrada'
  });
});

app.use((err, req, res, next) => {
  console.error('Erro:', err);
  res.status(500).json({
    success: false,
    message: 'Erro interno do servidor',
    error: err.message
  });
});

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || '0.0.0.0';

app.listen(PORT, HOST, () => {
  console.log(`
Servidor iniciado em: http://${HOST}:${PORT}
Documentacao: http://localhost:${PORT}/api-docs
  `);
});

module.exports = app;
