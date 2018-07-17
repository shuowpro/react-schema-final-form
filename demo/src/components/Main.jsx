import React, { Component } from 'react';
import styled from 'styled-components';
import Editor from './Editor';
import Form from './Form';
import Ajv from 'ajv';

const ajv = new Ajv();

const MainWrapper = styled.main`
  grid-area: main;
  display: grid;
  grid-template-areas:
    'schema initialvalues form';
  grid-template-columns: repeat(3, 1fr);
`;

const SchemaWrapper = styled.section`
  grid-area: schema;
  overflow: hidden;
  padding: 1rem;
`;

const InitialValuesWrapper = styled.section`
  grid-area: initialvalues;
  overflow: hidden;
  padding: 1rem;
`;

class Main extends Component {
  static getDerivedStateFromProps(props, state) {
    let { initialValues, schema } = state;
    if (props.initialValues !== state.prevProps.initialValues)  {
      initialValues = props.initialValues;
    }
    if (props.schema !== state.prevProps.schema) {
      schema = props.schema;
    }
    return {
      prevProps: props,
      initialValues,
      schema,
    }
  }
  state = {
    schema: '',
    initialValues: '',
    prevProps: {},
  }

  handleUpdateCode = key => (code) => {
    this.setState({
      [key]: code,
    })
  }

  parseJson = (code) => {
    let obj = null;
    try {
      obj = JSON.parse(code);
    } catch (error) {}
    return obj;
  }

  validateSchema = schema =>
    (schema && ajv.validateSchema(schema)) ? schema : null;

  render() {
    const {
      schema,
      initialValues,
    } = this.state;
    const { theme } = this.props;
    return (
      <MainWrapper>
        <SchemaWrapper>
          <Editor
            code={schema}
            onChange={this.handleUpdateCode('schema')}
          />
        </SchemaWrapper>
        <InitialValuesWrapper>
          <Editor
            code={initialValues}
            onChange={this.handleUpdateCode('initialValues')}
          />
        </InitialValuesWrapper>
        <Form 
          theme={theme}
          schema={this.validateSchema(this.parseJson(schema))}
          initialValues={this.parseJson(initialValues)}
        />
      </MainWrapper>
    )
  }
}

export default Main;