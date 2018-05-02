import * as React from 'react';
import PropTypes from 'prop-types';
import buildSyncValidation from './buildSyncValidation';
import renderField from './renderField';

class ReactFinalSchemaForm extends React.Component {
  static propTypes = {
    /**
     * Function responsible for rendering forms based on json schema
     * This function should implemented the following signature:
     * ({ RenderedFields, validate }) => PropTypes.element
     * 
     * The RenderedFields should be Fields based on the json schema,
     * The validate should return a function that get errors based on the ajv.
     */
    children: PropTypes.func.isRequired,

    /**
     * The json schema that we need to render
     * This outmost layer of the json schema currently only support object because the problem of ajv.
     */
    schema: PropTypes.object.isRequired,

    /**
     * The theme that we can used to render the fields.
     */
    theme: PropTypes.object.isRequired,
  }
  static childContextTypes = {
    reactFinalSchemaForm: PropTypes.object,
  }

  getChildContext() {
    const { schema, theme } = this.props;
    return {
      reactFinalSchemaForm: {
        schema,
        theme,
      },
    };
  }

  render() {
    const { children, schema, theme } = this.props;
    const RenderedFields = props => {
      // We will only render the fields if the outermost layer of schema is object
      if (schema && schema.type === 'object') {
        return renderField({
          schema,
          theme,
          ...props
        });
      }
      return null;
    }
    const validate = buildSyncValidation(schema);
    return children({
      RenderedFields,
      validate,
    })
  }
}

export default ReactFinalSchemaForm;
