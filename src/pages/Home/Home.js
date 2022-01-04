import React from 'react';
import Header from '../../components/Header/Header';
import Movies from '../../components/Movies/Movies';

export default function Home (){
    return (
        <div>
        <Header/>
        <Movies sortBy="now_playing" title="Now playing"/>
        <Movies sortBy="upcoming" title="Upcoming"/>
        </div>
    ); 
}
