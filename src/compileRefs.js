export const isObject = obj => 
  typeof obj === 'object' && obj !== null && !Array.isArray(obj);

export const resolveRef = (uri, wrapWith, schema) => {
  uri = uri.replace('#/', '');
  const tokens = [
    ...wrapWith.split('/').filter(v => v !== ''),
    ...uri.split('/'),
  ];
  const tip = tokens.reduce((obj, token) => obj[token], schema);
  return tip;
}

export const compileSchema = (
  schema = {},
  wrapWith = '',
  root = {},
) => {
  if (isObject(schema)) {
    let res = {};
    Object.keys(schema).forEach(key => {
      if (key === '$ref') {
        res = compileSchema(resolveRef(schema[key], wrapWith, root), wrapWith, root);
      } else {
        res[key] = compileSchema(schema[key], wrapWith, root);
      }
    });
    return res;
  }
  if (Array.isArray(schema)) {
    return schema.map(item => compileSchema(item, wrapWith, root));
  }
  return schema;
}

const compileRefs = ({
  schema = {},
  wrapWith = '',
}) => {

  const compiled = compileSchema(schema, wrapWith, schema);
  const originSchema = wrapWith.split('/').filter(v => v !== '').reduce((obj, key) => obj[key] || {}, compiled);
  delete originSchema.definitions;
  return compiled;
}

export default compileRefs;
