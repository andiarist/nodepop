'use strict';

require('dotenv').config();

const connection = require('./lib/connectMongoose');
const Anuncio = require('./models/Anuncio');
const fs = require('fs')
const readLine = require('readline');

connection.once('open', async () => {
    try{
        const answer = await acceptDeleteBD('Seguro que quieres inicializar la BD?(no)/si: ');

        if (answer.toLowerCase() !== 'si'){
            console.log('Cancelando proceso.');
            return process.exit(0);
        }

        await initAnuncios();

        connection.close();

    } catch (err) {
        console.log('Se ha producido un error:', err);
        process.exit(1);
    }
});

async function initAnuncios() {
    // delete docs on collections
    console.log('Vaciando colección de anuncios');
    await Anuncio.deleteMany();

    // load init docs
    console.log('Cargando anuncios.');

    // read fs json for loading on insertMany

    const data = fs.readFileSync('datos.json', 'utf-8');
    
    const result = await Anuncio.insertMany(JSON.parse(data));

    console.log(`Se han creado ${result.length} anuncios.`);
}

function acceptDeleteBD(questionText) {
    return new Promise((resolve, reject) => {
        const rl = readLine.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        rl.question(questionText, answer => {
            rl.close();
            resolve(answer);
        });
    });
}