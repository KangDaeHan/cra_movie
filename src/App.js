import React, { Component } from "react";
import "./App.css";
import Header from "./header/header";
import MovieList from "./movie-list/movie-list";
import { data } from "./data";
import { Route, Switch, withRouter } from "react-router-dom";
import MovieSpecific from "./movie-specific/movie-specific";

class App extends Component {
  state = {
    movieData: data,
    headerMessage: "Movie App"
  };

  render() {
    const renderSpecificMovieData = moives => {
      const filterMovieData = moives.filter((unit, idx) => {
        if (
          unit.movieName === this.props.history.location.pathname.split("/")[1]
        ) {
          return true;
        }
        return false;
      });

      if (filterMovieData.length === 1) {
        return filterMovieData[0];
      }
    };
    return (
      <div className="App">
        <Header headerMessage={this.state.headerMessage} />
        <Switch>
          <Route
            path="/:movieName"
            render={() => (
              <MovieSpecific
                movie={renderSpecificMovieData(this.state.movieData)}
              />
            )}
          />
          <Route
            path="/"
            render={() => (
              <MovieList
                history={this.props.history}
                movieData={this.state.movieData}
              />
            )}
          />
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);
