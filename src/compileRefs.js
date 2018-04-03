export const isObject = obj => 
  typeof obj === 'object' && obj !== null && !Array.isArray(obj);

export const resolveRef = (uri, schema) => {
  uri = uri.replace('#/', '');
  const tokens = uri.split('/');
  const tip = tokens.reduce((obj, token) => obj[token], schema);
  return tip;
}

export const compileSchema = (
  schema = {},
  root = {},
) => {
  if (isObject(schema)) {
    let res = {};
    Object.keys(schema).forEach(key => {
      if (key === '$ref') {
        res = compileSchema(resolveRef(schema[key], root), root);
      } else {
        res[key] = compileSchema(schema[key], root);
      }
    });
    return res;
  }
  if (Array.isArray(schema)) {
    return schema.map(item => compileSchema(item, root));
  }
  return schema;
}

const compileRefs = (
  schema = {}
) => {
  const compiled = compileSchema(schema, schema);
  return compiled;
}

export default compileRefs;
