import React from 'react';
import { ThemeProvider } from 'styled-components';
import theme from './theme';
import './base';
import 'codemirror/lib/codemirror.css';

const withRoot = Component => props => (
  <ThemeProvider theme={theme}>
    <Component {...props} />
  </ThemeProvider>
)

export default withRoot;
