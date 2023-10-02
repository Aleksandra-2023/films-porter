import {Movies} from '../components/Movies'
import React from 'react';
import { Preloader } from '../components/Preloader';
import {Search} from '../components/Search';


class Main extends React.Component{
   constructor()   {
    super()
    this.state = {
        movies: [],
        loading: true
    };
    this.searchMovies = this.searchMovies.bind(this) 
   }
   
    componentDidMount(){
        fetch(`http://www.omdbapi.com/?apikey=c7f08337&s=matrix`)
        .then(response => response.json())
        .then(data=>this.setState({movies: data.Search, loading: false}))

    }
    searchMovies = (str, type = 'all') => {
        this.setState({ loading: true});
        fetch(`https://www.omdbapi.com/?apikey=c7f08337&s=${str}${
            type !== 'all' ? `&type=${type}` : ' ' }`)
        .then(response => response.json())
        .then(data=>this.setState({movies: data.Search, loading: false})) 
    }
  
    render(){
        const {movies, loading}=this.state;
        return <main className='container content'>
            <Search   searchMovies={this.searchMovies} />
             {loading ? <Preloader/> : <Movies movies={movies} />
             }
               </main>
    }
 
}

export {Main}