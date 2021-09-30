import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
// import Viestit from './Viestit'
import reportWebVitals from './reportWebVitals';
// import Digikello from './Digikello';
// import TypicodeFetch from './TypicodeFetch';
// import NWCustomerFetch from './NWCustomerFetch';
// import NWLoginsFetch from './NWLoginsFetch';
import {BrowserRouter} from 'react-router-dom';
import Navigaatio from './Navigaatio';

ReactDOM.render(
  <BrowserRouter>
  <React.StrictMode>
    <Navigaatio/>
    {/* Kutsutaan TcF komponenttia 
    <TypicodeFetch/>
    {/* Kutsutaan NWCF komponenttia 
    <NWCustomerFetch/>
    {/* Kutsutaan NWLF komponenttia 
    <NWLoginsFetch/>
    {/* Kutsutaan Viestit komponenttia 
    <Viestit/>
    {/* Kelloa voidana kutsua sekä komponenteissa että suoraan indexissä 
    <h2 className="Index-h2">Tämä kello tulee indeksistä:</h2>
    <div className="Index-p"><Digikello/></div>
      {/* Kutsutaan App komponenttia 
    <App />*/}
  </React.StrictMode>
  </BrowserRouter>,
  //Laitetaan se root id:hen html sivulla
  document.getElementById('root')
);

reportWebVitals();
