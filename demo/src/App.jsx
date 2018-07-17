import React, { Component } from 'react';
import withRoot from './withRoot';
import SiteWrapper from './components/SiteWrapper';
import Header from './components/Header';
import DefaultSchemas from './components/DefaultSchemas';
import Main from './components/Main';
import defaultSchemas from './defaultSchemas';
import formThemes from './formThemes';

class App extends Component {
  state = {
    themeIndex: 0,
    schemaIndex: 0,
  }
  handleClickIndex = key => index => {
    this.setState({
      [key]: index,
    })
  }
  handleClickIndex = key => index => {
    this.setState({
      [key]: index,
    })
  }
  render() {
    const { themeIndex, schemaIndex } = this.state;
    return (
      <SiteWrapper>
        <Header
          onClickItem={this.handleClickIndex('themeIndex')}
          activeIndex={themeIndex}
        />
        <DefaultSchemas
          onClickItem={this.handleClickIndex('schemaIndex')}
          activeIndex={schemaIndex}
        />
        <Main
          schema={defaultSchemas[schemaIndex].schema}
          initialValues={defaultSchemas[schemaIndex].initialValues}
          theme={formThemes[themeIndex].theme}
        />
      </SiteWrapper>
    );
  }
}

export default withRoot(App);
