import React, { useReducer } from 'react'
import Login from './pages/Auth/Login/Login';
import Home from './pages/Home/Home';
import Showtimes from './pages/Showtimes/Showtimes'
import MovieDetails from './pages/MovieDetails/MovieDetails'
import Search from './pages/Search/Search'
import NotFound from './pages/NotFound/NotFound'
import AuthContext from './context/authContext'
import { reducer, initialState } from './reducer'
import './App.css';
import {
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import Register from './pages/Auth/Register/Register';
import Checkout from './pages/Checkout/Checkout';

function App() {

  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <div className="App">
      <AuthContext.Provider value={{
      user: state.user,
      login: (user) => dispatch({ type: 'login', user: user }),
      logout: () => dispatch({ type: 'logout' })
      }}>
      <Switch>
        <Redirect exact from="/" to="/home" />
        <Route path="/login" component={Login}/>
        <Route path="/register" component={Register}/>
        <Route path="/home" component={Home}/>
        <Route path="/movie/:id" component={MovieDetails}/>
        <Route path="/showtimes" component={Showtimes}/>
        <Route path='/search/:q?' component={Search} />
        <Route path='/checkout/:movieid/:showtimeid' component={Checkout}/>
        <Route component={NotFound} />
      </Switch>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
