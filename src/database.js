const mongoose = require('mongoose');
//mongoose.connect('mongodb://127.0.0.1/veterinaria') //conexión a veterinaria
//mongoose.connect('mongodb+srv://admin:admin123@veterinaria.9afbjz4.mongodb.net/veterinaria?retryWrites=true&w=majority')

mongoose.connect('mongodb://admin:admin123@veterinaria-shard-00-00.qlvum.mongodb.net:27017,veterinaria-shard-00-01.qlvum.mongodb.net:27017,veterinaria-shard-00-02.qlvum.mongodb.net:27017/veterinario?ssl=true&replicaSet=atlas-4cec1q-shard-0&authSource=admin&retryWrites=true&w=majority')
    .then(db => console.log('Conectada'))
    .catch(err => console.error(err));

