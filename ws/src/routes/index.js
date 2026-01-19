const express = require('express');
const multer = require('../config/multer');

const uploadLivro = require('../config/multerLivros');
const uploadCategoria = require('../config/multerCategoria');

const auth = require('../middlewares/auth');
const admin = require('../middlewares/admin');
const cliente = require('../middlewares/admin');

const Auth = require('../controllers/AuthController');
const Dashboard = require('../controllers/DashboardController');
const Usuario = require('../controllers/UsuarioController');
const Categoria = require('../controllers/CategoriaController');
const Livro = require('../controllers/LivroController');
const Compra = require('../controllers/CompraController');
const Biblioteca = require('../controllers/BibliotecaController');

const router = express.Router();

/* =====================================================
   AUTH
===================================================== */

/**
 * @swagger
 * tags:
 *   - name: Auth
 *     description: Autenticação de usuários
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Cadastro de usuário
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [nome, email, senha]
 *             properties:
 *               nome: { type: string }
 *               email: { type: string }
 *               senha: { type: string }
 *     responses:
 *       200:
 *         description: Usuário criado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Usuario'
 */
router.post('/auth/register', Auth.register);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login do usuário
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, senha]
 *             properties:
 *               email: { type: string }
 *               senha: { type: string }
 *     responses:
 *       200:
 *         description: Token JWT
 */
router.post('/auth/login', Auth.login);

router.get('/usuarios/list', auth, admin, Usuario.list)

/* =====================================================
   CATEGORIAS
===================================================== */

/**
 * @swagger
 * tags:
 *   - name: Categoria
 *     description: Gerenciamento de categorias
 */

/**
 * @swagger
 * /categorias:
 *   get:
 *     summary: Listar categorias
 *     tags: [Categoria]
 *     responses:
 *       200:
 *         description: Lista de categorias
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Categoria'
 */
router.get('/categorias/list', Categoria.list);

/**
 * @swagger
 * /categorias/{id}:
 *   get:
 *     summary: Buscar categoria por ID
 *     tags: [Categoria]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Categoria encontrada
 */
router.get('/categorias/:id', Categoria.show);

/**
 * @swagger
 * /categorias:
 *   post:
 *     summary: Criar categoria (Admin)
 *     tags: [Categoria]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required: [titulo]
 *             properties:
 *               titulo: { type: string }
 *               descricao: { type: string }
 *               imagem: { type: string, format: binary }
 *     responses:
 *       200:
 *         description: Categoria criada
 */
router.post('/categorias/create', auth, admin, uploadCategoria.single('imagem'), Categoria.create);

/**
 * @swagger
 * /categorias/{id}:
 *   put:
 *     summary: Atualizar categoria (Admin)
 *     tags: [Categoria]
 *     security:
 *       - bearerAuth: []
 */
router.put('/categorias/:id',auth, admin, uploadCategoria.single('imagem'), Categoria.update);

/**
 * @swagger
 * /categorias/{id}:
 *   delete:
 *     summary: Remover categoria (Admin)
 *     tags: [Categoria]
 *     security:
 *       - bearerAuth: []
 */
router.delete('/categorias/:id',auth, admin, Categoria.delete);

/* =====================================================
   LIVROS
===================================================== */

/**
 * @swagger
 * tags:
 *   - name: Livros
 *     description: Gerenciamento de livros
 */

/**
 * @swagger
 * /livros:
 *   get:
 *     summary: Listar livros
 *     tags: [Livros]
 */
router.get('/livros/list', auth, admin , Livro.list);


/**
 * @swagger
 * /livros/{id}:
 *   get:
 *     summary: Buscar livro por categoria
 *     tags: [Livros]
 */
router.get('/livros/categoria/:id', Livro.listByCategoria);

/**
 * @swagger
 * /livros/{id}:
 *   get:
 *     summary: Buscar livro por ID
 *     tags: [Livros]
*/
router.get('/livros/:id',auth, Livro.show);


/**
 * @swagger
 * /livros/delete/{id}:
 *   delete:
 *     summary: Deletar livro por ID
 *     tags: [Livros]
*/
router.delete('/livros/delete/:id', auth, admin , Livro.delete);

/**
 * @swagger
 * /livros:
 *   post:
 *     summary: Criar livro (Admin)
 *     tags: [Livros]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required: [titulo, autor, preco, categoria_id, capa, arquivo]
 *             properties:
 *               titulo: { type: string }
 *               autor: { type: string }
 *               preco: { type: number }
 *               categoria_id: { type: integer }
 *               capa: { type: string, format: binary }
 *               arquivo: { type: string, format: binary }
 *     responses:
 *       200:
 *         description: Livro criado
*/
router.post(
  '/livros/create',
  auth,
  admin,
  uploadLivro.fields([
    { name: 'capa', maxCount: 1 },
    { name: 'arquivo', maxCount: 1 }
  ]),
  Livro.create
);

/**
 * @swagger
 * /livros:
 *   post:
 *     summary: Atualizar livro (Admin)
 *     tags: [Livros]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required: [titulo, autor, preco, categoria_id, capa, arquivo]
 *             properties:
 *               titulo: { type: string }
 *               autor: { type: string }
 *               preco: { type: number }
 *               categoria_id: { type: integer }
 *               capa: { type: string, format: binary }
 *               arquivo: { type: string, format: binary }
 *     responses:
 *       200:
 *         description: Livro Atualizado
*/

router.put(
  '/livros/update/:id',
  uploadLivro.fields([
    { name: 'capa', maxCount: 1 },
    { name: 'arquivo', maxCount: 1 }
  ]),
  Livro.update
);

/* =====================================================
   COMPRAS
===================================================== */

/**
 * @swagger
 * tags:
 *   - name: Compras
 *     description: Processo de compra
 */

/**
 * @swagger
 * /compras:
 *   post:
 *     summary: Criar compra
 *     tags: [Compras]
 *     security:
 *       - bearerAuth: []
 */
router.post('/compras', auth, Compra.criar);

/**
 * @swagger
 * /compras/{id}/pagar:
 *   put:
 *     summary: Confirmar pagamento
 *     tags: [Compras]
 *     security:
 *       - bearerAuth: []
 */
router.put('/compras/:id/pagar', auth, Compra.pagar);

/* =====================================================
   BIBLIOTECA
===================================================== */

/**
 * @swagger
 * tags:
 *   - name: Biblioteca
 *     description: Biblioteca pessoal do usuário
 */

/**
 * @swagger
 * /biblioteca:
 *   get:
 *     summary: Listar biblioteca do usuário
 *     tags: [Biblioteca]
 *     security:
 *       - bearerAuth: []
 */
router.get('/biblioteca', auth, Biblioteca.listar);

/**
 * @swagger
 * /biblioteca/progresso:
 *   put:
 *     summary: Atualizar progresso de leitura
 *     tags: [Biblioteca]
 *     security:
 *       - bearerAuth: []
 */
router.put('/biblioteca/progresso', auth, Biblioteca.atualizarProgresso);

/**
 * @swagger
 * /biblioteca/download/{livroId}:
 *   get:
 *     summary: Download do livro
 *     tags: [Biblioteca]
 *     security:
 *       - bearerAuth: []
 */
router.get('/biblioteca/download/:livroId', auth, Biblioteca.download);

/* =====================================================
  Painel Administrativo
===================================================== */


/**
 * @swagger
 * tags:
 *   - name: Dashboard
 *     description: Painel Administrativo
*/

router.get('/dashboard', auth, admin, Dashboard.list)


module.exports = router;
