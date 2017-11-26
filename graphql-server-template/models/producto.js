import mongoose from 'mongoose';

//Generamos el modelo Producto
const Producto = mongoose.model('Producto', { 
    nombre: String, 
    precio: Number,
    estado: Number,
    createdAt: Number, 
    updatedAt: Number });

    module.exports = Producto;