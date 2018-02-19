import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default class WikiSetup extends Component {
  constructor(props) {
    super(props);
    this.state = { title: '' };
  }

  componentDidMount() {
    this.setState({ title: 'Los Angeles' });
  }

  render() {
    if (this.state.title) {
      var link = {
        pathname: this.state.title,
        state: { titles: [this.state.title] },
      };
      return (
        <Link to={link}>
          <Button>Start with {this.state.title}</Button>
        </Link>
      );
    } else {
      return <div>Loading</div>;
    }
  }
}
