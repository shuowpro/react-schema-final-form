import _set from 'lodash.set';
import Ajv from 'ajv';

const setError = (error, schema, res) => {
  // remove the first '.', convert '.foo.bar' to 'foo.bar'
  const dataPath = error.dataPath.charAt(0) === '.' ? error.dataPath.slice(1) : error.dataPath;

  const type = findTypeInSchema(schema, dataPath.split('.'));

  const errorMessage = (type === "array") ?
    { _error: error.message } :
    error.message;

  _set(res, dataPath, errorMessage);
  return res;
};

const findTypeInSchema = (schema, dataPath) => {
  if (!schema) {
    return;
  } else if (dataPath.length === 0) {
    return schema.type;
  } else {
    if (schema.type === "array") {
      return findTypeInSchema(schema.items, dataPath.slice(1));
    } else {
      return findTypeInSchema(
        schema.properties[dataPath[0]],
        dataPath.slice(1)
      );
    }
  }
};


const buildSyncValidation = (schema) => {
  const ajv = new Ajv({
    allErrors: true,
    errorDataPath: 'property',
  });
  const validate = ajv.compile(schema);
  return values => {
    const valid = validate(values);
    if (valid) {
      return {};
    }
    const errors = validate.errors.reduce((res, error) => setError(error, schema, res), {});
    return errors;
  }
}

export default buildSyncValidation;
