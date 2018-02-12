import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Grid, Header, Message } from 'semantic-ui-react';
import { addToCart } from '../../actions/index';

class Msg extends Component {
  render() {
    return <Message floating positive content={this.props.content} />;
  }
}

const mapStateToProps = state => {
  return { ...state };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Msg);
