import './App.css';
import { Component } from 'react';
import AnalogClock from 'analog-clock-react';

class Kello extends Component{
    render(){
        return(
            <h4>Propsi kello on nyt: {this.props.kellonaika}</h4>
        );
    }
}

class Digikello extends Component
{
    //Tässä on konsturktori
  constructor(props){
      super(props);
      this.state={
          time: new Date().toLocaleTimeString(),
          date: new Date().toLocaleDateString(),
          pvm: new Date()
      };
  }  

  //Kun intervalli laukeaa niin kutsutaan tickiä
  componentDidMount(){
      this.intervalID = setInterval(
          ()=>this.tick(),
          //millisekunteja
          1000
      );
  }

  tick(){
    this.setState({
        //Aina kun tick laukeaa niin katsotaan mikä hetki nyt on
        time: new Date().toLocaleTimeString(),
        date: new Date().toLocaleDateString(),
        pvm: new Date(),
    });
  }

  componentWillUnmount(){
      clearInterval(this.intervalID);
  }

  render() {
      //luodaan objekti jolla on ominaisuuksia
    let opt = {
        width: "300px",
        border: true,
        borderColor: "#2e2e2e",
        baseColor: "#17a2b8",
        centerColor: "#459cff",
        centerBorderColor: "#fff",
        handColors: {
          second: "#d81c7a",
          minute: "#fff",
          hour: "#fff"
        }
    };
    //luodaan toinen objekti jolla on uusia ominaisuuksia
    let opt1={
        baseColor: "blue",
        centerColor: "red",
        centerBorderColor: "yellow"
    }
    //yhdistetään objektit ja syötetään uuden arvot 
    let mergedOpt= {...opt, ...opt1}
    
    return (   
      <div className="digitaalikello">
        <p>Kellonaika: {this.state.time}</p>
        <p>Päivämäärä: {this.state.date}</p>
        <div>
        {/* tässä välitetään komponentille propsi ja sille data */}
        <Kello kellonaika={this.state.time}/>
        </div>
        <p className="Ana">Tässä on analogikello</p>
        {/* Javascriptin spreadsyntaksi on ... tuo kaikki olion tiedot*/}
        <div>
        <AnalogClock {...opt} value={this.state.pvm}/>
        </div>
        {/* Javascriptin spreadsyntaksi on ... tuo kaikki olion tiedot*/}
        <div> <AnalogClock {...mergedOpt} value={this.state.pvm}/></div>
      </div>

    );
  }
}
export default Digikello;
