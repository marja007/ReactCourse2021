import {Component} from "react";
import './App.css';
import Helpit from "./Helpit";
import NWCustomerAdd from "./NWCustomerAdd";
import NWCustomerEdit from "./NWCustomerEdit";
import NWCustomerDelete from "./NWCustomerDelete";
import NWCustomerDetails from "./NWCustomerDetails";

class NWCustomerFetch extends Component{
    constructor(props){
        super(props)
        this.state={
            customers:[],
            start:0,
            take: 10,
            visible:"table", //oletuksena näytetään asikaslistaus
            yksiAsiakas:{}, //editoitava asiakas olio
            poistettavaAsiakas:{}, //poistettava asiakas olio
            Message:""

        }
        this.handleChildUnmount =this.handleChildUnmount.bind(this)
        this.handleClickEdit =this.handleClickEdit.bind(this)
        this.handleClickDelete =this.handleClickDelete.bind(this)
        this.handleClickDetails =this.handleClickDetails.bind(this)
    }

    handleChildUnmount(){

        this.setState({visible: "table"})
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
    {   let Message=this.props.location.state.message
        if(Message==="uusiAsiakas"){
            this.setState({visible:"addform"})
        }
        this.haeNWRestApista();
    }

    handleClickEdit =(dataObj)=>{
        this.setState({  
        yksiAsiakas: dataObj,
        visible: "editform"
        })
        console.log("Editoi tätä" + this.state.yksiAsiakas)
    }

    handleClickDetails =(dataObj)=>{
        this.setState({  
        yksiAsiakas: dataObj,
        visible: "detailsform"
        })
        console.log("Katso tätä" + this.state.yksiAsiakas)
    }

    handleClickDelete =(dataObj)=>{
        this.setState({  
        poistettavaAsiakas: dataObj,
        visible: "deleteform"
        })
        console.log("Poista tämä" + this.state.poistettavaAsiakas)
    }

    handleClickHelp=()=>{this.setState({visible:"help"})}
    handleClickNEW=()=>{this.setState({...this.state, visible: "addform"})}
    handleClickTable=()=>{this.setState({visible:"table"})}

    haeNWRestApista()
        { //Haetaan diibadaaba dataa northwindistä -käynnistä WebApiHarjoituskoodi VisualStudiolla BackEndiksi
            //haetaan localstoragesta token
            let jwtoken = localStorage.getItem('token')
            //console.log('https://localhost:5001/nw/customer/r?offset=' + this.state.start + '&limit=' + this.state.take)
            fetch('https://localhost:5001/nw/customer/r?offset=' + this.state.start + '&limit=' + this.state.take,  
            //seuraavat sulkeet lisättiin autorisaation takia, jotta saadaa Bearer mukaan
             {
                method:"GET",
                headers: {
                    Authorization: "Bearer "+ jwtoken,
                    "Accept":"application/json",
                    "Content-Type": "application/json"
                }
            })
            // fetch('https://localhost:5001/nw/customer') hakee kaikki ilman kympin pätkäisyä
                .then(resp => resp.json())
                .then(oliot => this.setState({customers: oliot}))
        }
    
        render(){
            const{customers}=this.state
            console.log("State on:  ", this.state.customers)
            console.log("Viesti on "+ this.state.Message)
            if(customers.length >0)
            {
                
                if(this.state.visible === "table"){
                   
                    return(
                        <div className="box1">
                            
                            <h2>Asiakkaat</h2>
                            {/* <p>{this.state.customers[70].title}</p> */}
                            <button onClick={this.handleClickPrev}>Edelliset</button>
                            <button onClick={this.handleClickNext}>Seuraavat</button>
                            <button onClick={this.handleClickNEW}>Lisää uusi asiakas</button>
                            <button onClick={this.handleClickHelp}>Opaste</button>
                            <button onClick={this.handleClickTable}>Selaa asiakkaita</button>
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
                                            <td><button onClick={()=>this.handleClickEdit(t)}>Muokkaa</button></td>
                                            <td><button className="btn-danger" onClick={()=>this.handleClickDelete(t)}>Poista</button></td>
                                            <td><button onClick={()=>this.handleClickDetails(t)}>Tiedot</button></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )
                }
                else if (this.state.visible === "addform" || this.state.Message=== "uusiAsiakas"){
                    return(<div className="box2"><h2>Addmoduuli</h2>
                        <div><button onClick={this.handleClickHelp}>Opaste</button>
                        <button onClick={this.handleClickTable}>Selaa asiakkaita</button></div>
                        <NWCustomerAdd asiakasObj={this.state.yksiAsiakas} unmountMe={this.handleChildUnmount}/>
                        </div>);
                }
                else if (this.state.visible==="help")
                {
                    return(<div className="box3"><h2>Helppimoduuli</h2>
                    <button onClick={this.handleClickNEW}>Lisää uusi asiakas</button>
                    <button onClick={this.handleClickTable}>Selaa asiakkaita</button>
                    <Helpit moduli="NWCustomerFetch"/>
                    </div>);
                }
                else if(this.state.visible==="deleteform"){
                    return(<div className="box1">
                    <h1>Asiakkaan poisto</h1>
                    <div>
                        <button onClick={this.handleClickHelp}>Näytä helppi</button>
                        <button onClick={this.handleClickTable}>Selaa asiakkaita</button>
                    </div>
                    <NWCustomerDelete asiakasObj={this.state.poistettavaAsiakas} unmountMe={this.handleChildUnmount}/>
                </div>)
                }
                else if(this.state.visible==="editform"){
                    return(<div className="box1">
                        <h1>Asiakastietojen muokkaus</h1>
                        <div>
                            <button onClick={this.handleClickHelp}>Näytä helppi</button>
                            <button onClick={this.handleClickTable}>Selaa asiakkaita</button>
                        </div>
                        <NWCustomerEdit asiakasObj={this.state.yksiAsiakas} unmountMe={this.handleChildUnmount}/>
                    </div>)
                }
                else if(this.state.visible==="detailsform"){
                    return(<div className="box1">
                        <h1>Asiakastietojen katselu</h1>
                        <div>
                            <button onClick={this.handleClickHelp}>Näytä helppi</button>
                            <button onClick={this.handleClickTable}>Selaa asiakkaita</button>
                        </div>
                        <NWCustomerDetails asiakasObj={this.state.yksiAsiakas} unmountMe={this.handleChildUnmount}/>
                    </div>)
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
