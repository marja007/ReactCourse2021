import logo from './logo.svg';
import './App.css';
import { Component } from 'react';
//luodaan app komponentti mitä kutsutaan index.js:n puolelta
class App extends Component
{
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p> Tämä on minun ensimmäinen react sovellus
            {/* Tämä teksti oli defaulttina- miksi nuo code sanat?
             Edit <code>src/App.js</code> and save to reload. */}
          </p>
          {/*Linkki reactiin, tämä tuli defaulttina
           <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a> */}
        </header>
      </div>
    );
  }
}
export default App;
