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

// Endpoint POST /api/register-wallet (Wavy Node Mock)
app.post('/api/register-wallet', (req, res) => {
    console.log('Petición recibida en /api/register-wallet:', req.body);
    
    // Simulamos la latencia de red de 2.5s para que se vea el loading spinner en el frontend
    setTimeout(() => {
        const mockResponse = {
            success: true,
            riskScore: 12,
            riskLevel: "Minimal",
            message: "Wallet registrada y analizada exitosamente. Cumplimiento AML/KYC verificado."
        };
        console.log('Enviando respuesta simulada (Riesgo Mínimo).');
        res.status(200).json(mockResponse);
    }, 2500);
});

app.listen(PORT, () => {
    console.log(`Servidor de Wavy Node ejecutándose en http://localhost:${PORT}`);
});
