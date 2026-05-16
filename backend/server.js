const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

// Endpoint POST /webhook
app.post('/webhook', (req, res) => {
    console.log('Alerta de riesgo recibida en tiempo real:', req.body);
    res.status(200).send('OK');
});

// Endpoint GET /users/:foreign_user_id
app.get('/users/:foreign_user_id', (req, res) => {
    const foreignUserId = req.params.foreign_user_id;
    
    // JSON simulado estructurado para cumplir con la legislación mexicana
    const mockUser = {
        givenName: "Juan",
        maternalSurname: "Pérez",
        email: "juan.perez@example.com",
        address: {
            street: "Av. Paseo de la Reforma 250",
            city: "Ciudad de México",
            state: "CDMX",
            zipCode: "06600",
            country: "Mexico"
        },
        mexico: {
            rfc: "PEPJ800101XYZ",
            curp: "PEPJ800101HDFRXX00"
        }
    };

    console.log(`Petición recibida para foreign_user_id: ${foreignUserId}`);
    res.json(mockUser);
});

app.listen(PORT, () => {
    console.log(`Servidor de Wavy Node ejecutándose en http://localhost:${PORT}`);
});
