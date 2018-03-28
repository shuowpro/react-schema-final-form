import React from 'react';

const getWidget = ({
  schema = {},
  theme = {},
}) => {
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

const renderField = ({
  schema = {},
  fieldName = '',
  theme = {},
  required = false,
  mutators = {},
}) => {
  const widget = getWidget({
    schema,
    theme,
  });

  if (!theme[widget]) {
    throw new Error('We do not support this widget right now, are you forget to import the widget into the theme?');
  }

  return React.createElement(theme[widget], {
    key: fieldName,
    fieldName,
    required,
    schema,
    theme,
    mutators,
  })
}

export default renderField;
