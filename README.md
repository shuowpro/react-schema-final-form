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

> Because we upgraded with the latest context api, you need at least the **React 16.3** to use it.

## Basic Usage

The React-schema-final-form will return a component called `<RenderedFields />`, which will be a bunch of Fields based on the the json schema. it will also return a validator called `validate` that we can use to validate the data based on the json schema, which based on the **ajv**.

```javascript
import React from 'react';
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
              {/* You can put anything strange here, button for example */}
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

## Reordering the widgets

We will order the widgets based on a property called `propertyOrder`. For example, if we want to render it in reverse order, we can rewrite the schema as following:

```javascript
const schema = {
  // other properties.
  type: 'object',
  properties: {
    foo: {
      type: 'string',
      title: 'Foo',
      propertyOrder: 2,
    },
    bar: {
      type: 'integer',
      title: 'Bar',
      propertyOrder: 1,
    },
  },
  required: [foo]
}
```

## Costumizing the widget

Initially, we will render the widget based on its type. For example, if we have the `type = string`, we will render it to `<StringWidget />` if we have the theme

```javascript
const theme = {
  string: StringWidget,
  other: OtherWidget,
};
```

However, sometimes we want to render it to a different widget, we can add the special property to the schema called `widget`. For example:

```javascript
const schema = {
  // other properties.
  type: 'object',
  properties: {
    foo: {
      type: 'string',
      title: 'Foo',
      widget: 'other',
    },
  },
  required: [foo]
}
```

We will render the foo into `<OtherWidget />`.

## Context

We can provide any kind of props into the `<SchemaForm />`. For example, if we want to hide something while we switching to the advance mode, we can pass a prop called `isAdvanced` into the `<SchemaForm />`, then, we can get the `isAdvanced` from the hoc `withSchema`.

```javascript
import React, { Component } from 'react';
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
  },
  required: [foo]
}

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAdvanced
    }
  }
  render() {
    const { schema } = this.props;
    const { isAdvanced } = this.state;
    return (
      // The schema and the theme are required
      <SchemaForm
        schema={schema}
        theme={theme}
        isAdvanced={isAdvanced} // Can be accessd with the withSchema
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
                {/* You can put anything strange here, button for example */}
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
}
```
In the StringWidget

```javascript
import React from 'react';
import { Field } from 'react-final-form';
// Use this hoc to get access of the props you provided
import { withSchema } from 'react-schema-final-form';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';

const BaseInputWidget = props => {
  const {
    isAdvanced, // It is accessed by withSchema hoc.
    fieldName,
    schema,
    required,
    type,
    ...rest
  } = props;
  return (
    (!isAdvanced || !schema.isAdvanced) &&
    <Field
      name={fieldName}
      label={schema.title}
      {...rest}
    >
      {({
        input: { name, ...restInput },
        meta: { touched, error },
      }) => (
        <FormControl
          className={classes.root}
          error={!!touched && !!error}
          required={required}
          fullWidth
        >
          <Input id={fieldName} type={type} placeholder={schema.default ? schema.default + '' : ''} {...restInput} />
        </FormControl>
      )}
    </Field>
  )
};

export default withSchema(BaseInputWidget);
```

## Customizing the theme

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

## Types

### `SchemaFormProps`

These are props that you need to pass to the `<SchemaForm />`

#### `schema: object`

The json schema that you need to use. Currently, the type of the schema should be `object`.

#### `theme: object`

A object that map the `type` or `widget` to the specific component that we want to render.

### `WidgetProps`

The props that we passed to the widget

#### `fieldName: string`

The name that we need to pass the the `name` prop of the component `Field`

```javascript
<Field name={props.fieldName} />
```

#### `required: boolean`

A prop that indicate whether this widget is required.

#### `schema: object`

The current widget schema, we can read the properties from it. For example, the `type`, `default`..., 

#### `theme: object`

The theme that you passed from `<SchemaForm />`.

### `renderFieldProps`

The props that we passed to the renderField function.

#### `schema: object`

The current json schema we used to render the widget.

#### `rootSchema: object`

The root json schema.

#### `theme: object`

The theme that we passed via `<SchemaForm />`

#### `fieldName: string?`

The `fieldName` that we need to pass to the widget.

#### `required: boolean?`

The `required` that we need to pass to the widget.

## API

These can be imported from `react-schema-final-form`

### `SchemaForm`

The default export component, which is a hoc export the `validate` function and the `<RenderedFields />`.

### `renderField`

The function that taking the `renderFieldProps` and return the rendered widget based on the theme. Used for render anything other than object.

### `renderObjectProperties`

When render the object, we will render the items in the properties one by one. Sorted by a property called `propertyOrder`. Used for render the object.

### `buildSyncValidation`

The function that generate the validator which used the `ajv` to validate the value. This is for internal usage.

### `withSchema`

The hoc that pass the value from the `SchemaContext` to the props

### `SchemaContext`

The context of the the `<SchemaForm />`, recommend to use the `withSchema`.

## ToDo List

- [x] real-time validation
- [x] $ref support
- [ ] allOf support
- [ ] oneOf support
- [ ] anyOf support
