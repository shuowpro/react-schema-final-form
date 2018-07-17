import React, { Component } from 'react';
import styled from 'styled-components';

const ErrorWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ErrorMessage = styled.h1`
  display: block;
`;

class ErrorBoundary extends Component {
  state = {
    hasError: false,
  }
  componentDidCatch(error, info) {
    this.setState({
      hasError: true,
    })
  }

  render() {
    const { hasError } = this.state;
    if (hasError) {
      return (
        <ErrorWrapper>
          <ErrorMessage>The json schema might be wrong, please fix it.</ErrorMessage>
        </ErrorWrapper>
      )
    }
    return this.props.children;
  }
}

export default ErrorBoundary;