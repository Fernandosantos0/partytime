require('dotenv').config();

/* Importando os emódulos */
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const colors = require('colors');

/* Invocando o express */
const app = express();

/* Middleware para liberar a api por domínios */
app.use(cors());

/* Tratando o envio de dados pelo body da página */
app.use(bodyParser.urlencoded({
    extended: true,
}));
app.use(bodyParser.json());

/* DB Connection */
const conn = require('./db/conn');
conn(app);

/* Routes */
const routes = require('./routes/routes');
app.use('/api', routes);

/* Subindo o servidor */
app.on('server-on', () => {
    const port = process.env.PORT || 3000;
    const host = process.env.HOST || 'localhost';
    app.listen(port, host, () => {
        console.log(`Server ON - http://${host}:${port}/api`.green.bold);
    });
});
