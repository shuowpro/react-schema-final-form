export const isObject = obj => 
  typeof obj === 'object' && obj !== null && !Array.isArray(obj);

export const resolveRef = (uri, schema) => {
  uri = uri.replace('#/', '');
  const tokens = uri.split('/');
  const tip = tokens.reduce((obj, token) => obj[token], schema);
  return tip;
}

export const compileRefs = ({
  schema = {},
  root = null,
}) => {
  if (!root) {
    root = schema;
  }
  if (isObject(schema)) {
    let res = {};
    Object.keys(schema).forEach(key => {
      if (key === '$ref') {
        res = compileRefs(resolveRef(schema[key], root), root);
      } else {
        res[key] = compileRefs(schema[key], root);
      }
    });
    return res;
  }
  if (Array.isArray(schema)) {
    return schema.map(item => compileRefs(item, root));
  }
  return schema;
}

export default compileRefs;
