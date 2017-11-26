import { merge } from 'lodash';

//Archivo para cargar resolvers
const resolvers = {};

export default resolvers;

import productoResolvers from './productoResolvers';
merge(resolvers, productoResolvers);