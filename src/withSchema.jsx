import React from 'react';
import SchemaContext from './SchemaContext';

const withSchema = Component => (props) => (
  <SchemaContext.Consumer>
    {others => <Component {...props} {...others} />}
  </SchemaContext.Consumer>
);

export default withSchema;