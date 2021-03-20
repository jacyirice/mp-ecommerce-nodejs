// SDK de Mercado Pago
require('dotenv').config();
const mercadopago = require('mercadopago');

// Configura credenciais
mercadopago.configure({
    access_token: process.env.access_token,
    integrator_id: process.env.integrator_id,
});

module.exports = mercadopago;