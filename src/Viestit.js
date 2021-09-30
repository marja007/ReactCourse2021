import './App.css';
import { Component } from 'react';
import Digikello from './Digikello';

class Viesti extends Component{
    render(){
        return(
            <p>Tässä on oma vakioviesti</p>
        );
    }
}

//Prp viittaa propseihin
class ViestiPrp extends Component{
    render(){
        console.log(this.props.autonMalli);
        return(
            //xml syntaksi vaatii ylätason container tagin toistuville tageille- tässä tyhjä sisältää useita p:tä
            <>
                <p>{this.props.viesti}</p>
                <p>{this.props.mitavaan}</p>
            </>
        );
    }
}
//luodaan viestit komponentti mitä kutsutaan index.js:n puolelta
//tämä on ylemmän tason komponentti, joka käyttää alemman tason komponentteja
class Viestit extends Component
{
  render() {
    return (
    <div>
      <div className="Viestit">
        <header className="Viestit-header">
        <h3>Viestit sovellusikkuna</h3>
        </header>
      </div>
        <div className="Viestit-p">
            <p >Tässä luetellaan viestejä</p>
            {/* tässä käytetään alemman tason komponentteja */}
            <Viesti/>
            {/* tässä välitetään propsi alemmalle komponentille ja siihen dataksi "Viesti Nro 1" */}
            <ViestiPrp viesti="Viesti Nro 1" mitavaan="JEE!" autonMalli="RIO"/>
            {/* Kelloa voidana kutsua sekä komponenteissa että suoraan indexissä */}
            <h2 className="Viestit-h2">Tämä kello tulee viesteistä:</h2>
            <Digikello/>
        </div>
    </div>
    );
  }
}
export default Viestit;
