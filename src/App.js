import React from "react";
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Header from './components/Header';
import Country from './components/Country';
import Search from './components/Search';

function App() {
  return (
    <Router>
      <Header />
      <Route exact path="/">
          <Search />
      </Route>
      <Route path="/countries/:name" children={<Country />}></Route>
    </Router>
  );
}

export default App;
