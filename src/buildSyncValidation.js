import _set from 'lodash.set';
import Ajv from 'ajv';

export const setError = (error, schema, res) => {
  // remove the first '.', convert '.foo.bar' to 'foo.bar'
  const dataPath = error.dataPath.charAt(0) === '.' ? error.dataPath.slice(1) : error.dataPath;
  _set(res, dataPath, error.message);
  return res;
};

const buildSyncValidation = (schema) => {
  const ajv = new Ajv({
    allErrors: true,
    errorDataPath: 'property',
  });
  return values => {
    const valid = ajv.validate(schema, values);
    if (valid) {
      return {};
    }
    const errors = ajv.errors.reduce((res, error) => setError(error, schema, res), {});
    return errors;
  }
}

export default buildSyncValidation;
