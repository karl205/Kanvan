const mongoose = require("mongoose");
const MONGODB_URI = 'mongodb+srv://root:root@cluster0.jjbfxws.mongodb.net/Plan_Events?retryWrites=true&w=majority';

const conectarDB = async () => {
  try {
    const db = await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const url = `${db.connection.host}:${db.connection.port}`;
    console.log(`MongoDB conectado en: ${url}`);
  } catch (error) {
    console.log(`error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = conectarDB;
