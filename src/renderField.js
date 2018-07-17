import * as React from 'react';
import _get from 'lodash.get';

// TODO: support oneOf, anyOf, allOf,
export const getWidget = (schema, theme) => {
  if (schema.widget) {
    return schema.widget;
  } else if (schema.hasOwnProperty('enum')) {
    return 'choice';
  } else if (schema.format && theme[schema.format]) {
    return schema.format;
  } else {
    return schema.type || 'object';
  }
}

export const getRef = (ref, rootSchema) => {
  const path = ref.replace("#/", "").replace("/", ".");
  return _get(rootSchema, path);
}

/**
 * @param {object} schema The current schema that we used to render the widget 
 * @param {object} rootSchema The root schema that we can use to parse the $ref
 * @param {object} theme The theme which contains widgets, so that we can render schema based on it.
 * @param {string} fieldName The fieldName which will be used at <Field name={fieldName} />, very import.
 * @param {bool} required Whether the widget is required based on the required field in the object.
 */
const renderField = ({
  schema,
  rootSchema,
  theme,
  fieldName = '',
  required = false,
  ...rest,
}) => {
  if (schema.$ref) {
    const { $ref, ...others } = schema;
    const newSchema = getRef($ref, rootSchema);
    if (!newSchema) throw new Error("Cannot resolve the $ref: " + schema.$ref);
    return renderField({
      schema: {
        ...others,
        ...newSchema
      },
      rootSchema,
      theme,
      fieldName,
      required,
      ...rest
    })
  }

  const widget = getWidget(schema, theme);

  if (!theme[widget]) {
    throw new Error(`We do not support the widget "${widget}" right now, are you forget to import the widget into the theme?`);
  }

  return React.createElement(theme[widget], {
    key: fieldName,
    fieldName,
    required,
    schema,
    theme,
    ...rest
  })
}

export default renderField;
