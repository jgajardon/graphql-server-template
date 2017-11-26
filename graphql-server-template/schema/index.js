import fs from 'fs';

function requireGraphQL(name) {
  const filename = require.resolve(name);
  return fs.readFileSync(filename, 'utf8');
}

//Archivo de carga de Schemas
const typeDefs = [`
  type Query {
    # A placeholder, please ignore
    placeholder: Int
  }
  type Mutation {
    # A placeholder, please ignore
    placeholder: Int
  }
  type Subscription {
    # A placeholder, please ignore
    placeholder: Int
  }
`];

export default typeDefs;

typeDefs.push(requireGraphQL('./productoSchema.graphql'));
