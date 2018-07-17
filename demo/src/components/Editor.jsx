import React from 'react';
import MonacoEditor from 'react-monaco-editor';
import _ from 'lodash';

const Editor = props => {
  const {
    code,
    onChange,
    ...rest
  } = props;
  const options = {
    tabSize: 2,
  }
  return (
    <MonacoEditor
      language="json"
      theme="vs-dark"
      value={code}
      options={options}
      onChange={_.debounce(onChange)}
      {...rest}
    />
  )
}

export default Editor;