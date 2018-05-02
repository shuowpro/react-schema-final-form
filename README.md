# React-Schema-Final-Form [![Build Status](https://travis-ci.org/leuction/react-schema-final-form.svg?branch=master)](https://travis-ci.org/leuction/react-schema-final-form/)


> A simple hoc to build a form based on react-final-form and JSON Schema. This library is highly inspried by [Liform-react](https://github.com/Limenius/liform-react/)

## Installation

Via **npm** into a fresh project:

```sh
npm install react-schema-final-form
```

Or use the **yarn** to install that:

```sh
yarn add react-schema-final-form
```

## Basic Usage

The React-schema-final-form will return a component called `<RenderedFields />`, which will be a bunch of Fields based on the the json schema. it will also return a validator called `validate` that we can use to validate the data based on the json schema.

```javascript
import SchemaForm from 'react-schema-final-form';
// You can build you own theme based on the example right here.
import theme from 'react-schema-final-form-material-ui';

// Some schema which the outermost layer is object
const schema = {
  // other properties.
  type: 'object',
  properties: {
    foo: {
      type: 'string',
      title: 'Foo',
    },
    bar: {
      type: 'integer',
      title: 'Bar',
    },
  },
  required: [foo]
}

const Form = props => {
  const {
    schema,
  } = props;
  return (
    // The schema and the theme are required
    <SchemaForm
      schema={schema}
      theme={theme}
    >
      {({ RenderedFields, validate }) => (
        // The RenderedFields will be the Field components based on the theme we created, the validate will be the sync validator based on the ajv json schema validator.
        <Form
          onSubmit={values => window.alert(JSON.stringify(values, 0, 2))}
          validate={validate}
          validateOnBlur
        >
          {({ handleSubmit, pristine, invalid }) => (
            <form onSubmit={handleSubmit}>
              <RenderedFields />
              {/* You can put anything strange here */}
              <button type="submit" disabled={pristine || invalid}>
                Submit
              </button>
            </form>
          )}
        </Form>
      )}
    </SchemaForm>
  )
}
```

## Customization

This library will render the `<Field />` based on the theme you provided in. The theme is basically is object. By default, it will render them by the type. For example, if your json-schema looks like this: 

```javascript
const schema = {
  type: 'string',
}

// theme/index.js
import OtherTheme from 'react-schema-final-form-material-ui';
import StringWidget from './StringWidget';

const theme = {
  ...OtherTheme,
  string: StringWidget,
}
```

If we overwrite the string. we will render the string based on StringWidget.

Please refer to the [react-schema-final-form-material-ui](https://github.com/leuction/react-schema-final-form-material-ui) for examples about how to write a theme.

## Feature Support

- [x] real-time validation
- [x] $ref support
- [ ] allOf support
- [ ] oneOf support
- [ ] anyOf support
