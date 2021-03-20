var express = require('express');
var exphbs = require('express-handlebars');
var port = process.env.PORT || 3000
var mercadopago = require('./config/mercadopago')
var app = express();

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static('assets'));

app.use('/assets', express.static(__dirname + '/assets'));

app.get('/', function(req, res) {
    res.render('home');
});

app.get('/detail', function(req, res) {
    res.render('detail', req.query);
});
app.post('/ipn', function(req, res) {
    console.log(req.body)
    res.status(200).json({})
})
app.get('/checkout', function(req, res) {
    res.render('checkout', req.query);
});

app.get('/payment/fail', function(req, res) {
    res.render('payment-status/fail', req.query);
});
app.get('/payment/in-process', function(req, res) {
    res.render('payment-status/in_process', req.query);
});
app.get('/payment/success', function(req, res) {
    res.render('payment-status/success', req.query);
});

app.post("/create_preference", (req, res) => {
    let preference = {
        items: [{
            title: req.body.title,
            quantity: Number(req.body.quantity),
            description: req.body.description,
            picture_url: req.body.img,
            currency_id: 'BRL',
            unit_price: Number(req.body.price),
        }],
        external_reference: "jacyirice@gmail.com",
        payer: {
            name: req.body.payer.name,
            surname: req.body.payer.surname,
            email: req.body.payer.email,
            phone: {
                area_code: req.body.payer.phone.area_code,
                number: Number(req.body.payer.phone.number)
            },

            address: {
                street_name: req.body.payer.address.street_name,
                street_number: Number(req.body.payer.address.street_number),
                zip_code: req.body.payer.address.zip_code
            }
        },
        back_urls: {
            "success": "http://localhost:3000/payment/success",
            "failure": "http://localhost:3000/payment/fail",
            "pending": "http://localhost:3000/payment/in-process"
        },
        auto_return: 'approved',
        payment_methods: {
            excluded_payment_methods: [{
                id: "amex"
            }],
            installments: 6
        },
        notification_url: "https://checkout-pro-mercadopago.herokuapp.com/ipn",
    };
    console.log(preference);
    mercadopago.preferences.create(preference)
        .then(function(response) {
            res.json({ id: response.body.id })
        }).catch(function(error) {
            console.log(error);
        });
});

app.listen(port);