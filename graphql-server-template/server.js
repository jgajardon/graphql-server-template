import express from 'express';
import bodyParser from 'body-parser';
import { graphiqlExpress, graphqlExpress } from 'apollo-server-express';
import { makeExecutableSchema } from 'graphql-tools';
import cors from 'cors';
import mongoose from 'mongoose';
import typeDefs from './schema';
import resolvers from './resolvers';


//Carga de modelos
const Producto = require('./models/producto');

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

mongoose.Promise = global.Promise;

//URI MongoDB
const MONGO_URI = 'Tu String de conexion para tu base de datos MongoDB';

//Conexion al servidor de base de datos MongoDB
mongoose.connect(MONGO_URI, { useMongoClient: true });
mongoose.connection
  .once('open', () => console.log('Connected MongoDB'))
  .on('error', error => console.log('Error al conectar con MongoDB:', error));

const PORT = 3001;
const app = express().use('*', cors());

//Se levanta servidor GraphQL con los modelos correspondientes
app.use('/graphql', bodyParser.json(), graphqlExpress({ schema, context: { Producto } }));
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));
app.listen(PORT);
