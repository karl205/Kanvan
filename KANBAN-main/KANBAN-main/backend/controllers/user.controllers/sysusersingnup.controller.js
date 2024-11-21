const { MongoClient, ObjectId } = require('mongodb');

const MONGODB_URI = 'mongodb+srv://root:root@cluster0.jjbfxws.mongodb.net/Plan_Events?retryWrites=true&w=majority';

// Registro de usuario
const registrouser = async (req, res) => {
  try {
    const userData = req.body;

    const client = new MongoClient(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    await client.connect();

    const collection = client.db().collection("Usuarios");

    const existingUser = await collection.findOne({ email: userData.email });

    if (existingUser) {
      await client.close();
      return res.json({ message: "El usuario ya está registrado" });
    }

    // Agregar el campo "notificacion: true" al objeto userData
    userData.notificacion = true;

    // Si el usuario no existe, insertarlo en la colección de usuarios
    await collection.insertOne(userData);
    await client.close();

    console.log("Datos del usuario guardados en MongoDB:", userData);
    res.json({
      message: "Datos del usuario guardados correctamente en MongoDB",
    });
  } catch (error) {
    console.error("Error al registrar el usuario:", error);
    res.status(500).json({
      message: "Error al registrar el usuario",
      error,
    });
  }
};

// Buscar usuario por ID
const buscarUsuarioPorId = async (req, res) => {
  const { id } = req.params; // Obtener el ID del usuario de los parámetros de la solicitud

  try {
    const client = new MongoClient(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    await client.connect();
    const collection = client.db().collection("Usuarios");

    // Buscar el usuario por su ID
    const usuarioEncontrado = await collection.findOne({ _id: ObjectId(id) });

    if (!usuarioEncontrado) {
      // Si el usuario no existe, devolver un mensaje de error
      return res.status(404).json({
        message: "Usuario no encontrado",
      });
    }

    // Si se encuentra el usuario, devolver los datos del usuario
    res.json(usuarioEncontrado);
  } catch (error) {
    console.error("Error al buscar usuario por ID:", error);
    res.status(500).json({ message: "Error al buscar usuario por ID" });
  }
};


// Buscar usuario por email
const buscarUsuarioPorEmail = async (req, res) => {
  try {
    const { email } = req.params; // Obtener el correo electrónico del parámetro de la solicitud
    const client = new MongoClient(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    await client.connect();
    const collection = client.db().collection("Usuarios");

    // Buscar el usuario por su correo electrónico
    const usuarioEncontrado = await collection.findOne({ email });

    if (!usuarioEncontrado) {
      // Si el usuario no existe, devolver un mensaje de error
      return res.status(404).json({
        message: "Usuario no encontrado",
      });
    }

    // Si se encuentra el usuario, devolver los datos del usuario
    res.json(usuarioEncontrado);
  } catch (error) {
    res.status(500).json({
      message: "Error al buscar el usuario por correo electrónico",
      error,
    });
  }
};

module.exports = {
    registrouser,
    buscarUsuarioPorEmail,
    buscarUsuarioPorId
};
