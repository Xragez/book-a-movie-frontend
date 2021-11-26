import React from 'react';
import Header from '../../components/Header/Header';
import Movies from '../../components/Movies/Movies';

export default function Home (){
    return (
        <div>
        <Header/>
        <Movies sortBy="popularity.desc" title="Most Popular"/>
        <Movies sortBy="vote_average.desc" title="Top Rated" vote_count="1000"/>
        </div>
    ); 
}
