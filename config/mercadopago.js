// SDK de Mercado Pago
const mercadopago = require('mercadopago');

// Configura credenciais
mercadopago.configure({
    access_token: 'APP_USR-334491433003961-030821-12d7475807d694b645722c1946d5ce5a-725736327',
    integrator_id: 'dev_24c65fb163bf11ea96500242ac130004',
});

module.exports = mercadopago;