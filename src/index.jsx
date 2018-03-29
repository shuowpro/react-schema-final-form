import React from 'react';
import compileRefs from './compileRefs';
import renderField from './renderField';
export { default as renderField } from './renderField.js';
export { default as renderObjectProperties } from './renderObjectProperties';
export { default as buildSyncValidation } from './buildSyncValidation';

const renderSchema = ({
  schema = {},
  theme = {},
  mutators = {},
}) => {
  if (!schema.type) {
    return (<div />)
  }
  if (schema.type !== 'object') {
    throw new Error('We only support the outermost layer of JSON to be object');
  }
  return renderField({
    schema: compileRefs(schema),
    theme,
    mutators,
  })
}

export default renderSchema;