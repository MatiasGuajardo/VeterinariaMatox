const mongoose = require('mongoose');
const {Schema} = mongoose;

const NoteSchema = new Schema ({
    title: {type: String, required: true},
    description: {type: String, required: true},
    pet: {type: String, required: true},
    tamano: {type: String, required: true},
    nombre: {type: String, required: true},
    date: {type: Date, default: Date.now},
    user: {type: String}
});

module.exports = mongoose.model('Note', NoteSchema)