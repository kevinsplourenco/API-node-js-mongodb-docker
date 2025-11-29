const Student = require('../models/Student');

// @desc    Criar um novo estudante
// @route   POST /api/students
// @access  Public
exports.createStudent = async (req, res) => {
  try {
    const { name, email, matricula, age, course } = req.body;

    // Validar campos obrigatórios
    if (!name || !email || !matricula || !age || !course) {
      return res.status(400).json({
        success: false,
        message: 'Por favor, preencha todos os campos obrigatórios'
      });
    }

    // Verificar se já existe estudante com esse email
    const existingEmail = await Student.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({
        success: false,
        message: 'Este email já está registrado'
      });
    }

    // Verificar se já existe estudante com essa matrícula
    const existingMatricula = await Student.findOne({ matricula });
    if (existingMatricula) {
      return res.status(400).json({
        success: false,
        message: 'Esta matrícula já está registrada'
      });
    }

    // Criar novo estudante
    const student = new Student({
      name,
      email,
      matricula,
      age,
      course
    });

    await student.save();

    res.status(201).json({
      success: true,
      message: 'Estudante criado com sucesso',
      data: student
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erro ao criar estudante',
      error: error.message
    });
  }
};

// @desc    Obter todos os estudantes
// @route   GET /api/students
// @access  Public
exports.getAllStudents = async (req, res) => {
  try {
    const students = await Student.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      message: 'Estudantes recuperados com sucesso',
      data: students,
      total: students.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erro ao buscar estudantes',
      error: error.message
    });
  }
};

// @desc    Obter um estudante por ID
// @route   GET /api/students/:id
// @access  Public
exports.getStudentById = async (req, res) => {
  try {
    const { id } = req.params;

    // Validar se o ID é válido
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({
        success: false,
        message: 'ID inválido'
      });
    }

    const student = await Student.findById(id);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Estudante não encontrado'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Estudante recuperado com sucesso',
      data: student
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erro ao buscar estudante',
      error: error.message
    });
  }
};

// @desc    Atualizar um estudante
// @route   PUT /api/students/:id
// @access  Public
exports.updateStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, matricula, age, course, active } = req.body;

    // Validar se o ID é válido
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({
        success: false,
        message: 'ID inválido'
      });
    }

    // Procurar o estudante
    const student = await Student.findById(id);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Estudante não encontrado'
      });
    }

    // Atualizar apenas os campos fornecidos
    if (name) student.name = name;
    if (email) student.email = email;
    if (matricula) student.matricula = matricula;
    if (age) student.age = age;
    if (course) student.course = course;
    if (active !== undefined) student.active = active;
    student.updatedAt = Date.now();

    // Validar email único (exceto o próprio)
    if (email) {
      const emailExists = await Student.findOne({
        email: email,
        _id: { $ne: id }
      });
      if (emailExists) {
        return res.status(400).json({
          success: false,
          message: 'Este email já está em uso'
        });
      }
    }

    // Validar matrícula única (exceto a própria)
    if (matricula) {
      const matriculaExists = await Student.findOne({
        matricula: matricula,
        _id: { $ne: id }
      });
      if (matriculaExists) {
        return res.status(400).json({
          success: false,
          message: 'Esta matrícula já está em uso'
        });
      }
    }

    await student.save();

    res.status(200).json({
      success: true,
      message: 'Estudante atualizado com sucesso',
      data: student
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erro ao atualizar estudante',
      error: error.message
    });
  }
};

// @desc    Deletar um estudante
// @route   DELETE /api/students/:id
// @access  Public
exports.deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;

    // Validar se o ID é válido
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({
        success: false,
        message: 'ID inválido'
      });
    }

    const student = await Student.findByIdAndDelete(id);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Estudante não encontrado'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Estudante deletado com sucesso',
      data: student
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erro ao deletar estudante',
      error: error.message
    });
  }
};
