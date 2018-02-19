import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import WikiGameApp from './WikiGameApp';
import { withRouter } from 'react-router-dom';

const TITLE_END = 'New York City';

class WikiGameHistory extends Component {

  componentDidUpdate(prevProps, prevState) {
    // Scroll to the top when anything changes.
    ReactDOM.findDOMNode(this).scrollIntoView();

    // Set the web page title to the updated Wiki article title.
    document.title = this.props.match.params.title;
  }

  componentDidMount() {
    // Set the web page title to the initial Wiki article title.
    document.title = this.props.match.params.title;
  }

  addTitle(title) {
    var titles = this.props.location.state.titles;
    if (titles.indexOf(title) < 0) {
      this.props.history.push(title, { titles: titles.concat([title]) });
    }
  }

  setCurrentTitle(title) {
    var titles = this.props.location.state.titles;
    var index = titles.indexOf(title);
    this.props.history.push(title, { titles: titles.slice(0, index + 1) });
  }

  render() {
    var currentTitle = this.props.match.params.title;
    return (
      <WikiGameApp
          titles={this.props.location.state.titles}
          targetTitle={TITLE_END}
          currentTitle={currentTitle}
          isComplete={currentTitle === TITLE_END}
          addTitle={title => this.addTitle(title)}
          setCurrentTitle={title => this.setCurrentTitle(title)}
          />
    );
  }
}

export default withRouter(WikiGameHistory);
