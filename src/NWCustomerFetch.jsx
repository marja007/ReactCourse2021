import {Component} from "react";
import './App.css';
import Helpit from "./Helpit";
import NWCustomerAdd from "./NWCustomerAdd";

class NWCustomerFetch extends Component{
    constructor(props){
        super(props)
        this.state={
            customers:[],
            start:0,
            take: 10,
            visible:"table"
        }
        this.handleChildUnmount=this.handleChildUnmount.bind(this)
    }

    handleChildUnmount(){
        this.setState({renderChild: false})
        this.handeleClickTable()
        this.haeNWRestApista()
    }

    handleClickPrev = () => {
        let startvalue = this.state.start;
        if (startvalue > 0) {
          startvalue = startvalue - 10;
        }
        this.setState({ start: startvalue }, this.haeNWRestApista);
      }
    
    handleClickNext = () =>{
        this.setState({ 
            start: this.state.start+10 
        }, this.haeNWRestApista)
      }

    componentDidMount()   
    {
        this.haeNWRestApista()
    }

    handleClickHelp=()=>{this.setState({visible:"help"})}
    handleClickNEW=()=>{this.setState({visible: "addform", renderChild:true})}
    handeleClickTable=()=>{this.setState({visible:"table"})}

    haeNWRestApista()
        { //Haetaan diibadaaba dataa northwindistä -käynnistä WebApiHarjoituskoodi VisualStudiolla BackEndiksi
            //fetch('https://jsonplaceholder.typicode.com/customers?_page='+this.state.page+'&_limit='+this.state.limit)
            console.log('https://localhost:5001/nw/customer/r?offset=' + this.state.start + '&limit=' + this.state.take)
            fetch('https://localhost:5001/nw/customer/r?offset=' + this.state.start + '&limit=' + this.state.take)
            // fetch('https://localhost:5001/nw/customer')
                .then(resp => resp.json())
                .then(oliot => this.setState({customers: oliot}))
        }
    
        render(){
            const{customers}=this.state
            console.log("State on:  ", this.state.customers)
            if(customers.length >0)
            {
                // let testiviesti="";
                if(this.state.visible === "table"){
                    // testiviesti="table"
                    return(
                        <div className="box1">
                            {/* <p>{testiviesti}</p> */}
                            <h2>Asiakkaat</h2>
                            {/* <p>{this.state.customers[70].title}</p> */}
                            <button onClick={this.handleClickPrev}>Edelliset</button>
                            <button onClick={this.handleClickNext}>Seuraavat</button>
                            <button onClick={this.handleClickNEW}>Lisää uusi asiakas</button>
                            <button onClick={this.handleClickHelp}>Opaste</button>
                            <button onClick={this.handeleClickTable}>Selaa asiakkaita</button>
                            <table>
                                <thead>
                                    <tr>
                                    <th>Yritys</th>
                                    <th>Yhteyshenkilö</th>
                                    <th>City</th>
                                    <th>Country</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* käy läpi jokaisen todo elementin ja aliaisoi sen annetulle elementille (t) */}
                                    {customers.map(t=>(
                                        <tr key={t.customerId}>
                                            <td>{t.companyName}</td>
                                            <td>{t.contactName}</td>
                                            <td>{t.city}</td>
                                            <td>{t.country}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )
                }
                else if (this.state.visible === "addform"){
                    return(<div className="box2"><h2>Addmoduuli</h2>
                        <button onClick={this.handleClickHelp}>Opaste</button>
                        <button onClick={this.handeleClickTable}>Selaa asiakkaita</button>
                        {this.state.renderChild ?<NWCustomerAdd unmountMe={this.handleChildUnmount}/>: null}
                        </div>);
                }
                else if (this.state.visible==="help")
                {
                    return(<div className="box3"><h2>Helppimoduuli</h2>
                    <button onClick={this.handleClickNEW}>Lisää uusi asiakas</button>
                    <button onClick={this.handeleClickTable}>Selaa asiakkaita</button>
                    <Helpit moduli="NWCustomerFetch"/>
                    </div>);
                }
                else{
                    // testiviesti="elsessä"
                    return(<div><h1>Lataa sivu uudelleen</h1></div>)
                }  
            }
            else
            {
                return(
                    <div>
                        <h2>Ladataan....</h2>
                    </div>
                )
            }
    }
}
export default NWCustomerFetch
