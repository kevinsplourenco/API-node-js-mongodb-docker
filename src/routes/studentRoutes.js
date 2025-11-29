const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');

/**
 * @swagger
 * /api/students:
 *   post:
 *     summary: Criar um novo estudante
 *     tags:
 *       - Students
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - matricula
 *               - age
 *               - course
 *             properties:
 *               name:
 *                 type: string
 *                 example: "João Silva"
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "joao@example.com"
 *               matricula:
 *                 type: string
 *                 example: "2023001"
 *               age:
 *                 type: number
 *                 example: 20
 *               course:
 *                 type: string
 *                 enum: ["Engenharia", "Administração", "Sistemas", "Marketing", "Outros"]
 *                 example: "Engenharia"
 *     responses:
 *       201:
 *         description: Estudante criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/Student'
 *       400:
 *         description: Erro de validação
 *       500:
 *         description: Erro do servidor
 */
router.post('/', studentController.createStudent);

/**
 * @swagger
 * /api/students:
 *   get:
 *     summary: Listar todos os estudantes
 *     tags:
 *       - Students
 *     responses:
 *       200:
 *         description: Lista de estudantes recuperada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Student'
 *                 total:
 *                   type: number
 *       500:
 *         description: Erro do servidor
 */
router.get('/', studentController.getAllStudents);

/**
 * @swagger
 * /api/students/{id}:
 *   get:
 *     summary: Obter um estudante por ID
 *     tags:
 *       - Students
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do estudante (MongoDB ObjectId)
 *     responses:
 *       200:
 *         description: Estudante encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/Student'
 *       404:
 *         description: Estudante não encontrado
 *       500:
 *         description: Erro do servidor
 */
router.get('/:id', studentController.getStudentById);

/**
 * @swagger
 * /api/students/{id}:
 *   put:
 *     summary: Atualizar um estudante
 *     tags:
 *       - Students
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do estudante (MongoDB ObjectId)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "João Silva Atualizado"
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "joao.novo@example.com"
 *               matricula:
 *                 type: string
 *                 example: "2023001"
 *               age:
 *                 type: number
 *                 example: 21
 *               course:
 *                 type: string
 *                 enum: ["Engenharia", "Administração", "Sistemas", "Marketing", "Outros"]
 *               active:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       200:
 *         description: Estudante atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/Student'
 *       404:
 *         description: Estudante não encontrado
 *       500:
 *         description: Erro do servidor
 */
router.put('/:id', studentController.updateStudent);

/**
 * @swagger
 * /api/students/{id}:
 *   delete:
 *     summary: Deletar um estudante
 *     tags:
 *       - Students
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do estudante (MongoDB ObjectId)
 *     responses:
 *       200:
 *         description: Estudante deletado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/Student'
 *       404:
 *         description: Estudante não encontrado
 *       500:
 *         description: Erro do servidor
 */
router.delete('/:id', studentController.deleteStudent);

module.exports = router;
