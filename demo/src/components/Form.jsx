import React, { Component } from 'react'
import styled from 'styled-components';
import SchemaForm from 'react-schema-final-form';
import { Form as FinalForm } from 'react-final-form';
import arrayMutators from 'final-form-arrays';
import MuiButton from '@material-ui/core/Button';
import MuiPaper from '@material-ui/core/Paper';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { defaultTheme } from 'smooth-ui'
import { ThemeProvider } from 'styled-components'
import ErrorBoundary from './ErrorBoundary';

const muiTheme = createMuiTheme({
  typography: {
    fontSize: 16,
  },
});

const FormWrapper = styled.section`
  grid-area: form;
  padding: 1rem;
`;

const Paper = styled(MuiPaper)`
  padding: 1rem;
`;

const Button = styled(MuiButton)`
  margin-top: 2rem;
`;

const getRandomKey = () =>
  Math.random().toString(36).substring(7);

class Form extends Component {
  static getDerivedStateFromProps(props, state) {
    let { schema, initialValues } = state;
    if (props.schema) {
      schema = props.schema;
    }
    if (props.initialValues) {
      initialValues = props.initialValues;
    }
    return {
      schema,
      initialValues,
    }
  }
  state = {
    schema: {},
    initialValues: {},
  }
  render() {
    const { schema, initialValues } = this.state;
    const { theme, onValuesChange, ...rest } = this.props;
    return (
      <FormWrapper>
        <ErrorBoundary key={getRandomKey()}>
          <MuiThemeProvider theme={muiTheme}>
            <ThemeProvider theme={defaultTheme}>
              <Paper>
                <SchemaForm
                  schema={schema}
                  theme={theme}
                  {...rest}
                  >
                  {({ RenderedFields, validate }) => (
                    <FinalForm
                    initialValues={initialValues}
                    onSubmit={values => window.alert(JSON.stringify(values, 0, 2))}
                    validate={validate}
                    mutators={{
                      ...arrayMutators
                    }}
                    validateOnBlur
                    >
                      {({ handleSubmit }) => (
                        <form onSubmit={handleSubmit}>
                          <RenderedFields />
                          <Button type="submit">
                            Submit!
                          </Button>
                        </form>
                      )}
                    </FinalForm>
                  )}
                </SchemaForm>
              </Paper>
            </ThemeProvider>
          </MuiThemeProvider>
        </ErrorBoundary>
      </FormWrapper>
    )
  }
}

export default Form;