import React from 'react';
import Navbar from './Navbar';
import Moviecard from './MovieCard';
import { data } from '../data';
import { addMovies, setShowFavourite } from '../actions';

class App extends React.Component {
  componentDidMount() {
    const { store } = this.props;
    store.subscribe(() => {
      this.forceUpdate();
    })
    store.dispatch(addMovies(data));
  }
  isMovieFavourite = (movie) => {
    const { favourites } = this.props.store.getState();
    const index = favourites.indexOf(movie);
    if (index !== -1) {
      //found movie
      return true;
    }
    return false;
  }
  onChangeTab = (val) => {
    this.props.store.dispatch(setShowFavourite(val))
  }
  render() {
    const { list, favourites, showFavourite } = this.props.store.getState();
    console.log("RENDER", this.props.store.getState());

    const displayMovie = showFavourite ? favourites : list;
    return (
      <div className="App" >
        <Navbar />
        <div className="main">
          <div className='tabs'>
            <div className={`tab ${showFavourite ? '' : "active-tabs"}`} onClick={() => this.onChangeTab(false)}>Movies</div>
            <div className={`tab ${showFavourite ? "active-tabs" : ''}`} onClick={() => this.onChangeTab(true)}>Favourites</div>
          </div>
          <div className="list">
            {displayMovie.map((movie, index) => {
              return <Moviecard
                movie={movie}
                key={`movie-${index}`}
                dispatch={this.props.store.dispatch}
                isFavourite={this.isMovieFavourite(movie)}
              />
            })}
          </div>
          {displayMovie.length === 0 ? <div className='no-movies'>No Movies To Display!</div> : null}
        </div>
      </div>
    );
  }
}

export default App;
