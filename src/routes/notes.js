const express = require('express');
const router = express.Router();

const Note = require('../models/Note');
const { isAuthenticated } = require('../helpers/auth')

router.get('/notes/add', isAuthenticated, (req, res) => {
    res.render('notes/new-note');
});

router.post('/notes/new-note', isAuthenticated, async (req, res) => {
    const {title, description, pet, tamano, nombre} = req.body;
    const errors = []
    if(!title) {
        errors.push({text: 'Escriba el nombre del dueño'});
    }
    if (!description) {
        errors.push({text: 'Escriba una historia breve del caso del animal'});
    }
    if (!pet) {
        errors.push({text: 'Escriba la raza del perro'});
    }
    if (!tamano) {
        errors.push({text: 'Escriba el tamaño del perro'});
    }
    if (!nombre) {
        errors.push({text: 'Escriba el nombre del perro'});
    }
    if (errors.length > 0) {
        res.render('notes/new-note', {
            errors,
            title,
            description,
            pet,
            tamano,
            nombre
        });
    } else {
       const newNote = new Note({title, description, pet, tamano, nombre});
       newNote.user = req.user.id;
       await newNote.save();
       req.flash('success_msg', 'Nota agregada correctamente')
       res.redirect('/notes')
    }
});

///////////////////////////////////////////////////////////////////////////////////

router.get('/notes', isAuthenticated, async (req, res) =>{
    const notes = await Note.find({user: req.user.id}).lean().sort({date: 'asc'});
    res.render('notes/all-notes', { notes })
})

router.get('/notes/dueno', isAuthenticated, async (req, res) =>{
    const notes = await Note.find({user: req.user.id}).lean().sort({date: 'asc'});
    res.render('notes/dueno', { notes })
})

router.get('/notes/detalles', isAuthenticated, async (req, res) =>{
    const notes = await Note.find({user: req.user.id}).lean().sort({date: 'asc'});
    res.render('notes/detalles', { notes })
})

router.get('/notes/razas', isAuthenticated, async (req, res) =>{
    const notes = await Note.find({user: req.user.id}).lean().sort({date: 'asc'});
    res.render('notes/razas', { notes })
})

router.get('/notes/borrar', isAuthenticated, async (req, res) =>{
    const notes = await Note.find({user: req.user.id});
    res.render('notes/borrar', { notes })
})

router.get('/notes/borrarm', isAuthenticated, async (req, res) =>{
    const notes = await Note.find({user: req.user.id});
    res.render('notes/borrarm', { notes })
})

router.get('/notes/borrarg', isAuthenticated, async (req, res) =>{
    const notes = await Note.find({user: req.user.id});
    res.render('notes/borrarg', { notes })
})

router.get('/notes/tamano', isAuthenticated, async (req, res) =>{
    const notes = await Note.find({user: req.user.id}).lean().sort({date: 'asc'});
    res.render('notes/tamano', { notes })
})

///////////////////////////////////////////////////////////////////////////////////

router.get('/notes/actuaran', isAuthenticated, async (req, res) =>{
    const notes = await Note.find({user: req.user.id});
    res.render('notes/actuaran', { notes })
})

router.get('/notes/actuarang', isAuthenticated, async (req, res) =>{
    const notes = await Note.find({user: req.user.id});
    res.render('notes/actuarang', { notes })
})

router.get('/notes/actuaranm', isAuthenticated, async (req, res) =>{
    const notes = await Note.find({user: req.user.id});
    res.render('notes/actuaranm', { notes })
})

///////////////////////////////////////////////////////////////////////////////////

router.get('/notes/edit/:id', isAuthenticated, async (req, res) => {
    const note =  await Note.findById(req.params.id).lean();
    res.render('notes/edit-note', {note});
});

///////////////////////////////////////////////////////////////////////////////////

router.put('/notes/edit-note/:id', isAuthenticated, async (req, res) => {
    const {title, description, pet, tamano, nombre} = req.body;
    await Note.findByIdAndUpdate(req.params.id, {title, description, pet, tamano, nombre});
    req.flash('success_msg', 'Nota actualizada correctamente');
    res.redirect('/notes');
});

///////////////////////////////////////////////////////////////////////////////////

router.put('/notes/pactua/', isAuthenticated, async (req, res) => {
    await Note.updateMany({ tamano: /^P/, $options:'i' }, { $set: { tamano: 'Mediano' } });
    req.flash('success_msg', 'Notas actualizadas correctamente');
    res.redirect('/notes');
});

router.put('/notes/pactuam/', isAuthenticated, async (req, res) => {
    await Note.updateMany({ tamano: /^G/, $options:'i' }, { $set: { tamano: 'Pequeño' } });
    req.flash('success_msg', 'Notas actualizadas correctamente');
    res.redirect('/notes');
});

router.put('/notes/pactuag/', isAuthenticated, async (req, res) => {
    await Note.updateMany({ tamano: /^M/, $options:'i' }, { $set: { tamano: 'Grande' } });
    req.flash('success_msg', 'Notas actualizadas correctamente');
    res.redirect('/notes');
});

///////////////////////////////////////////////////////////////////////////////////
router.delete('/notes/delete/:id', isAuthenticated, async (req, res) => {
     await Note.findByIdAndDelete(req.params.id);
     req.flash('success_msg', 'Nota eliminada correctamente');
     res.redirect('/notes');
});

router.delete('/notes/prango/', isAuthenticated, async (req, res) => {
    await Note.deleteMany({tamano:{$regex:/Pequeño/, $options:'i'}});
    req.flash('success_msg', 'Notas eliminadas correctamente');
    res.redirect('/notes');
});

router.delete('/notes/mrango/', isAuthenticated, async (req, res) => {
    await Note.deleteMany({tamano:{$regex:/Mediano/, $options:'i'}});
    req.flash('success_msg', 'Notas eliminadas correctamente');
    res.redirect('/notes');
});

router.delete('/notes/grango/', isAuthenticated, async (req, res) => {
    await Note.deleteMany({tamano:{$regex:/Grande/, $options:'i'}});
    req.flash('success_msg', 'Notas eliminadas correctamente');
    res.redirect('/notes');
});
///////////////////////////////////////////////////////////////////////////////////

module.exports = router;