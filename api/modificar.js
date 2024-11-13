const express = require('express');
const admin = require('firebase-admin');

const servicio = require('./final-be-iot-firebase-adminsdk-wakra-51b5387d94.json');

admin.initializeApp({
    credential: admin.credential.cert(servicio),
    databaseURL: 'https://final-be-iot.firebaseio.com' 
});

const app = express();
app.use(express.json());

app.put("/update/:id", async (req, res) => {
    try {
        const { nombre, ubicacion, region, presupuesto, fecha_i, codigo, solicitante, estado, fecha_t, descripcion  } = req.body;
        const { id } = req.params;
        const proyectoRef = admin.firestore().collection('Proyectos').doc(id);
        await proyectoRef.update({nombre, ubicacion, region, presupuesto, fecha_i, codigo, solicitante, estado, fecha_t, descripcion });
        res.status(200).send('el documto se se actualizo');
    } catch (error) {
        res.status(500).send('error al actualizar: ' + error.message);
    }
});

const PORT = process.env.PORT || 3003;

app.listen(PORT, () => {
    console.log(`servidor compilado en el puerto ${PORT}, funcionando`);
});