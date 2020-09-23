import React from 'react';
import './App.css';
import store from './Redux/store'
import {Provider} from 'react-redux'
import About from './components/About'
import RegisterPage from './components/RegisterPage'
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom'; 
import NavBarComponenet from './components/NavBarComponent'
import Login from './components/Login'
import TodoPage from './components/TodoPage'
import Home from './components/Home'
function App() {
  return (
  <Provider store={store}>
    <Router>
    <div className="App">
     {/* <UserPostContainer/> */}
    
     <NavBarComponenet/>
     <Switch>
     <Route path="/home" exact component={Home}/>
     <Route path="/register" exact component={RegisterPage} />
     <Route path='/login' exact component={Login}/>
     <Route path='/todo' exact component={TodoPage}/>
     </Switch>
    </div>
    </Router>
    </Provider>
  );
}

export default App