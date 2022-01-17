import React from 'react';
import Header from '../../components/Header/Header';
import Movies from '../../components/Movies/Movies';

export default function Home (){
    return (
        <div>
        <Header/>
        <Movies sortBy="popular" title="Popular Movies"/>
        <Movies sortBy="upcoming" title="Upcoming Movies"/>
        </div>
    ); 
}
