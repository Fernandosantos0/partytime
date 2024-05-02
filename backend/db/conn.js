require('dotenv').config();

const mongoose = require('mongoose');
const colors = require('colors');

async function main(app) {
    try {
        mongoose.set('strictQuery', true);

        await mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.kxrqgzl.mongodb.net/PARTYTIME?retryWrites=true&w=majority`);

        console.log('Conexão com o banco de dados realizado com sucesso'.blue.bold);
        app.emit('server-on');
    } catch(err) {
        console.log('Não foi possível realizar a conexão com o banco de dados'.red.bold);
        console.error(err);
    }
}

module.exports = main;
