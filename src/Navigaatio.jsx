import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Digikello from "./Digikello";
import NWCustomerFetch from "./NWCustomerFetch";
import TypicodeFetch from './TypicodeFetch';
import Viestit from "./Viestit";
import {Component} from 'react';
import './index.css';
import NWLoginsFetch from "./NWLoginsFetch";
import MD5demo from "./MD5demo"

class Navigaatio extends Component{
    render(){
        return(
            <Router>
                <div>
                    <h2>Eka React App-Typicodea ja Northwindiä</h2>
                    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                        <ul className="navbar-nav mr-auto">
                            <li><Link to={'/'} className="nav-link">Home</Link></li>
                            <li><Link to={'/NWCustomerFetch'} className="nav-link" >NWCustomerFetch</Link></li>
                            <li><Link to={'/TypicodeFetch'} className="nav-link">TypicodeFetch</Link></li>
                            <li><Link to={'/Viestit'} className="nav-link">Viestit</Link></li>
                            <li><Link to={'/NWLoginsFetch'} className="nav-link">NWLoginsFetch</Link></li>
                            <li><Link to={'/MD5demo'} className="nav-link">MD5demo</Link></li>
                        </ul>
                    </nav>
                    <hr/>
                    <Switch>
                        <Route exact path='/' component={Digikello}/>
                        <Route path='/NWCustomerFetch' component={NWCustomerFetch}/>
                        <Route path='/TypicodeFetch' component={TypicodeFetch}/>
                        <Route path='/Viestit' component={Viestit}/>
                        <Route path='/NWLoginsFetch' component={NWLoginsFetch}/>
                        <Route path='/MD5demo' component={MD5demo}/>
                    </Switch>
                </div>
            </Router>
        );
    }
}
export default Navigaatio