const express = require('express');
const fs = require('fs');
const cors = require('cors');
const path = require('path');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./docs/swagger');


const { sequelize, Usuario } = require('./models');
const routes = require('./routes');

const app = express();

/* ================================
   MIDDLEWARES GLOBAIS
================================ */

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));



/* ================================
   GARANTIR PASTAS DE UPLOAD
================================ */
const uploadDirs = [
  'src/uploads',
  'src/uploads/capas',
  'src/uploads/livros'
];

uploadDirs.forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

app.use('/uploads', express.static(path.resolve(__dirname, 'src/uploads')))

/* ================================
   ROTAS
================================ */
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));


app.use('/api', routes);

/* ================================
   INICIALIZAÇÃO DO BANCO
================================ */
async function startServer() {
  try {
    await sequelize.authenticate();
    console.log('📦 Banco conectado');

    await sequelize.sync({ alter: true });
    console.log('📚 Banco sincronizado');

    /* ================================
       SEED - USUÁRIO ADMIN
    ================================ */
    const adminEmail = 'admin@livraria.com';

    const adminExists = await Usuario.findOne({
      where: { email: adminEmail }
    });

    if (!adminExists) {
      const bcrypt = require('bcrypt');
      const senhaHash = await bcrypt.hash('admin123', 10);

      await Usuario.create({
        nome: 'Administrador',
        email: adminEmail,
        senha: senhaHash,
        tipo: 'admin'
      });

      console.log('👑 Admin criado: admin@livraria.com | senha: admin123');
    }

    /* ================================
       START SERVER
    ================================ */
    const PORT = 3000;
    app.listen(PORT, () => {
      console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
    });

  } catch (err) {
    console.error('❌ Erro ao iniciar servidor:', err);
  }
}

startServer();
