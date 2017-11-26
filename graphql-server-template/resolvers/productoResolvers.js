const moment = require('moment');

const resolvers = {
  Query: {
    buscarProducto: async (parent, args, { Producto }) => {
      //Query para buscar producto ocupando Promesas
      let productoBuscado = new Promise((resolve, reject) => {
        return resolve(Producto.findById({ _id: args.id }))
      });
      
      //Devuelve el producto buscado, si el id no es el correcto devuelve null
      return productoBuscado
        .then((res) => {
          return res;
        })
    },
    todosLosProductos: async (parent, args, { Producto }) => {
      const productos = await Producto.find({ estado: 1 });
      return productos;
    }
  },
  Mutation: {
    crearProducto: async (parent, args, { Producto }) => {
        const fecha = moment().format("x");
        args.createdAt = parseFloat(fecha);
        args.updatedAt = parseFloat(fecha);
        
        //estado = 1 = producto activo
        args.estado = 1;
  
        const result = await new Producto(args).save();
  
        if(result.nombre === args.nombre){
          return result;
        }
      },
    actualizarProducto: async (parent, args, { Producto }) => {
      const fecha = moment().format("x");
      //args.updatedAt = parseFloat(fecha);

      let productoActualizado = new Promise((resolve, reject) => {
        return resolve(Producto.findByIdAndUpdate(args.id, { $set: { nombre: args.nombre, precio: args.precio, updatedAt: parseFloat(fecha) } }, { new: true }))
      });
  
      //Devuelve el producto actualizado, si el id no es el correcto devuelve null
      return productoActualizado
        .then((res) => {
          return res;
        });
    },
    eliminarProducto: async (parent, args, { Producto }) => {

      let productoEliminado = new Promise((resolve, reject) => {
        return resolve(Producto.findByIdAndUpdate(args.id, { $set: { estado: 0 } }, { new: true }))
      });
  
      //Devuelve el producto eliminado(actualizado ele stado a 0), si el id no es el correcto devuelve null
      return productoEliminado
        .then((res) => {
          return res;
        });
    }
  },
};

export default resolvers;