const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb://mongodb:27017/api_node_db';
    
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
      connectTimeoutMS: 10000,
      socketTimeoutMS: 45000,
    });

    console.log('✅ MongoDB conectado com sucesso!');
    console.log(`📍 Conectado em: ${mongoURI}`);
  } catch (error) {
    console.error('❌ Erro ao conectar ao MongoDB:', error.message);
    setTimeout(() => {
      process.exit(1);
    }, 2000);
  }
};

module.exports = connectDB;
