import React from 'react';
import renderField from './renderField';
export { default as compileRefs } from './compileRefs';
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
    schema,
    theme,
    mutators,
  })
}

export default renderSchema;