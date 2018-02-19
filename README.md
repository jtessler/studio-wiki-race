# Wikipedia Game in React

_Manages a single round of the Wikipedia Game (shortest path between two
articles) using React JS_

## Component Documentation

### `WikiSetup`

The initial page loaded for the `/` route. Should load a random article (or one
specified by the user) to start the Wikipedia game. Must include a `<Link>` tag
to start the game, e.g.

```
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
```

### `WikiGameApp`

The entry point for all of your code.

Should display a list of all visited articles via `this.props.titles`, the
target title via `this.props.targetTitle`, and the current title via
`this.props.currentTitle`.

Should also handle user events. When a user adds a new link, it should call
`this.props.addTitle(title)`. When a user selects a new "current title", e.g.
when clicking a previously visited title, it should call
`this.props.setCurrentTitle(title)`.

### `WikiApi`

**YOU SHOULD NOT EDIT THIS FILE.**

Implements all necessary Wikipedia API calls:

- `WikiApi.getRandomArticles(count)`: Returns a `Promise` to a list of random
  Wikipedia article titles. The list length is determined by the given `count`
  parameter.
- `WikiApi.getSummary(title)`: Returns a `Promise` to a string of the first 500
  words of the Wikipedia article for the given `title`.
- `WikiApi.getLinks(title)`: Returns a `Promise` to a list of all titles linked
  in the Wikipedia article of the given `title`.

An example call using a `Promise` object is shown below (notice
`then(function)`):

```
WikiApi.getRandomArticles(10).then(function(titles) {
  for (var i = 0; i < titles.length; i++) {
    console.log(titles[i]);
  }
});
```

### `WikiGameHistory`

**YOU SHOULD NOT EDIT THIS FILE.**

Manages all browser history and implements the following methods to be used in
`WikiGameApp` via `this.props`:

- `this.props.addTitle(title)`: Called when a user adds a new link to the game.
- `this.props.setCurrentTitle(title)`: Called when a user goes "back" in the
  list of visited Wikipedia Articles.

Also sends the following properties to `WikiGameApp`:

- `this.props.titles`: The list of all visited titles (including the starter
  title)
- `this.props.targetTitle`: The title users should eventually reach.
- `this.props.isComplete`: Is `true` if the game is done!
