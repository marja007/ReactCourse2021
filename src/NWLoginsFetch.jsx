import {Component} from "react";
import './App.css';
import Helpit from "./Helpit";
import NWLoginAdd from "./NWLoginAdd";
import NWLoginDelete from "./NWLoginDelete";
import NWLoginsEdit from "./NWLoginsEdit";
import NWLoginDetails from "./NWLoginDetails";

class NWLoginsFetch extends Component{
    constructor(props){
        super(props)
        this.state={
            logins:[],
            start:0,
            take: 10,
            lastname:"",
            arvot:[],
            visible:"table",
            yksiLoggari: {},
            poistettavaLoggari: {}
        }
        this.handleChangeLastname=this.handleChangeLastname.bind(this);
        this.handleChildUnmount=this.handleChildUnmount.bind(this)
        this.handleClickEdit =this.handleClickEdit.bind(this)
        this.handleClickDelete =this.handleClickDelete.bind(this)
        this.handleClickDetails =this.handleClickDetails.bind(this)
    }
    handleClickEdit =(dataObj)=>{
        this.setState({  
        yksiLoggari: dataObj,
        visible: "editform"
        })
        console.log("Editoi tätä" + this.state.yksiLoggari)
    }
    handleClickDetails =(dataObj)=>{
        this.setState({  
        yksiLoggari: dataObj,
        visible: "detailsform"
        })
        console.log("Katso tätä" + this.state.yksiLoggari)
    }

    handleClickDelete =(dataObj)=>{
        this.setState({  
        poistettavaLoggari: dataObj,
        visible: "deleteform"
        })
        console.log("Poista tämä" + this.state.poistettavaLoggari)
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
    //muuttujan arvona on funktio jolle annetaan parametrejä. 
    handleClickNext = () =>{
        this.setState({ 
            start: this.state.start+10 
        }, this.haeNWRestApista)
      }

      handeleClickShowAll = () =>{
        this.setState({ 
            lastname:""
        }, this.haeNWRestApista)
        this.arvo.value=""  
      }
      handleClickHelp=()=>{this.setState({visible:"help"})}
      handleClickNEW=()=>{this.setState({visible: "addform", renderChild:true})}
      handeleClickTable=()=>{this.setState({visible:"table"})}

    componentDidMount()   
    {
        this.haeNWRestApista()
    }

    //tämä on funktio
    handleChangeLastname(){
        if(this.arvo.value==="")
        {
            this.setState({lastname: ""}, this.componentDidMount)
        }
        else{
        //Tässä sijoitettan arvo-olioon eventillä vastaanotettu value
        var arvot=[...this.state.arvot]
        arvot.push(this.arvo.value)
        this.setState({arvot})
        //kun staten päivitys on tehty kutsutaan componentDidMounttia, jotta se tulee voimaan heti
        //console.log(arvot + " handlessa")
        this.setState({lastname: arvot},this.componentDidMount)  
       
        }

      }

    
    haeNWRestApista()
        {  
            if(this.state.lastname !==""){
                
                fetch('https://localhost:5001/nw/logins/'+this.state.lastname)
                .then(resp => resp.json())
                .then(oliot => this.setState({logins: oliot}))
            }
            else{
                fetch('https://localhost:5001/nw/logins/r?offset=' + this.state.start + '&limit=' + this.state.take)
                //fetch('https://localhost:5001/nw/logins')
                .then(resp => resp.json())
                .then(oliot => this.setState({logins: oliot}))
            }
        }

        render(){
            const{logins}=this.state
            if(logins.length >9)
            {
                if(this.state.visible === "table"){
                //console.log("State on:  ", this.state.logins)
                return(
                    <div className="box1">
                        <h2>Käyttäjät</h2>
                        <p>Näytetään {logins.length} käyttäjää</p>
                        {/* <p>{this.state.customers[70].title}</p> */}
                        <button disabled={true} onClick={this.handleClickPrev}>Edelliset</button>
                        <button className="btn btn-success" onClick={this.handleClickNext}>Seuraavat</button>
                        <button onClick={this.handleClickNEW}>Uusi käyttäjä</button>
                        <button onClick={this.handleClickHelp}>Helppi</button>
                        <button onClick={this.handeleClickShowAll}>Tyhjennä haku</button>
                       
                        <button onClick={this.handleChangeLastname.bind(this)}>Hae sukunimellä</button>
                        <input type="text" placeholder="Limit with lastname" title="Anna sukunimi" ref={(x)=>{this.arvo=x}}/>
                        <table>
                            <thead>
                                <tr>
                                <th>Etunimi</th>
                                <th>Sukunimi</th>
                                <th>AcceslevelID</th>
                                <th>e-mail</th>
                                <th>Käyttäjätunnus</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* käy läpi jokaisen logins elementin ja aliaisoi sen annetulle elementille (t) */}
                                {logins.map(t=>(
                                    <tr key={t.loginid}>
                                        <td>{t.firstname}</td>
                                        <td>{t.lastname}</td>
                                        <td>{t.acceslevelID}</td>
                                        <td>{t.email}</td>
                                        <td>{t.userName}</td>
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
            else if(this.state.visible === "addform"){
                return(<div className="box2"><h2>Addmoduuli</h2>
                <button onClick={this.handleClickHelp}>Opaste</button>
                <button onClick={this.handeleClickTable}>Selaa käyttäjiä</button>
                {this.state.renderChild ?<NWLoginAdd unmountMe={this.handleChildUnmount}/>: null}
                </div>

                )
            }
            else if(this.state.visible === "help")
            {
                return(<div className="box3"><h2>Helppimoduuli</h2>
                <button onClick={this.handleClickNEW}>Lisää uusi käyttäjä</button>
                <button onClick={this.handeleClickTable}>Selaa käyttäjiä</button>
                <Helpit moduli="NWLoginsFetch"/>
                </div>);
            }
            else if(this.state.visible==="deleteform"){
                return(<div className="box1">
                <h1>Käyttäjän poisto</h1>
                <div>
                    <button onClick={this.handleClickHelp}>Näytä helppi</button>
                    <button onClick={this.handeleClickTable}>Selaa käyttäjiä</button>
                </div>
                <NWLoginDelete asiakasObj={this.state.poistettavaLoggari} unmountMe={this.handleChildUnmount}/>
            </div>)
            }
            else if(this.state.visible==="editform"){
                return(<div className="box1">
                    <h1>Käyttäjätietojen muokkaus</h1>
                    <div>
                        <button onClick={this.handleClickHelp}>Näytä helppi</button>
                        <button onClick={this.handeleClickTable}>Selaa käyttäjiä</button>
                    </div>
                    <NWLoginsEdit asiakasObj={this.state.yksiLoggari} unmountMe={this.handleChildUnmount}/>
                </div>)
            }
            else if(this.state.visible==="detailsform"){
                return(<div className="box1">
                    <h1>Käyttäjätietojen katselu</h1>
                    <div>
                        <button onClick={this.handleClickHelp}>Näytä helppi</button>
                        <button onClick={this.handeleClickTable}>Selaa asiakkaita</button>
                    </div>
                    <NWLoginDetails asiakasObj={this.state.yksiLoggari} unmountMe={this.handleChildUnmount}/>
                </div>)
            }
            else{
                return(
                    <div>Jokin meni pieleen...</div>
                )
            }
        }
        else if(logins.length >0 && logins.length<10){
            if(this.state.visible === "table"){
            //console.log("State on:  ", this.state.logins)
            return(
                <div className="box1">
                    <h2>Käyttäjät</h2>
                    <p>Näytetään {logins.length} käyttäjää</p>
                    {/* <p>{this.state.customers[70].title}</p> */}
                    <button className="btn btn-success" onClick={this.handleClickPrev}>Hae edelliset käyttäjät</button>
                    <button disabled="true">Hae seuraavat käyttäjät</button>
                    <button onClick={this.handleClickNEW}>Uusi käyttäjä</button>
                    <button onClick={this.handleClickHelp}>Helppi</button>
                    <button onClick={this.handeleClickShowAll}>Tyhjennä haku</button>
                   
                    <button onClick={this.handleChangeLastname.bind(this)}>Hae sukunimellä</button>
                    <input type="text" placeholder="Limit with lastname" title="Anna sukunimi" ref={(x)=>{this.arvo=x}}/>
                    <table>
                        <thead>
                            <tr>
                            <th>Etunimi</th>
                            <th>Sukunimi</th>
                            <th>AcceslevelID</th>
                            <th>e-mail</th>
                            <th>Käyttäjätunnus</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* käy läpi jokaisen logins elementin ja aliaisoi sen annetulle elementille (t) */}
                            {logins.map(t=>(
                                <tr key={t.loginid}>
                                    <td>{t.firstname}</td>
                                    <td>{t.lastname}</td>
                                    <td>{t.acceslevelid}</td>
                                    <td>{t.email}</td>
                                    <td>{t.username}</td>
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
        else if(this.state.visible === "addform"){
            return(<div className="box2"><h2>Addmoduuli</h2>
            <button onClick={this.handleClickHelp}>Opaste</button>
            <button onClick={this.handeleClickTable}>Selaa käyttäjiä</button>
            {this.state.renderChild ?<NWLoginAdd unmountMe={this.handleChildUnmount}/>: null}
            </div>

            )
        }
        else if(this.state.visible === "help")
        {
            return(<div className="box3"><h2>Helppimoduuli</h2>
            <button onClick={this.handleClickNEW}>Lisää uusi käyttäjä</button>
            <button onClick={this.handeleClickTable}>Selaa käyttäjiä</button>
            <Helpit moduli="NWLoginsFetch"/>
            </div>);
        }
        else if(this.state.visible==="deleteform"){
            return(<div className="box1">
            <h1>Käyttäjän poisto</h1>
            <div>
                <button onClick={this.handleClickHelp}>Näytä helppi</button>
                <button onClick={this.handeleClickTable}>Selaa käyttäjiä</button>
            </div>
            <NWLoginDelete asiakasObj={this.state.poistettavaLoggari} unmountMe={this.handleChildUnmount}/>
        </div>)
        }
        else if(this.state.visible==="editform"){
            return(<div className="box1">
                <h1>Käyttäjätietojen muokkaus</h1>
                <div>
                    <button onClick={this.handleClickHelp}>Näytä helppi</button>
                    <button onClick={this.handeleClickTable}>Selaa käyttäjiä</button>
                </div>
                <NWLoginsEdit asiakasObj={this.state.yksiLoggari} unmountMe={this.handleChildUnmount}/>
            </div>)
        }
        else if(this.state.visible==="detailsform"){
            return(<div className="box1">
                <h1>Käyttäjätietojen katselu</h1>
                <div>
                    <button onClick={this.handleClickHelp}>Näytä helppi</button>
                    <button onClick={this.handeleClickTable}>Selaa asiakkaita</button>
                </div>
                <NWLoginDetails asiakasObj={this.state.yksiLoggari} unmountMe={this.handleChildUnmount}/>
            </div>)
        }
        else{
            return(
                <div>Jokin meni pieleen...</div>
            )
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
export default NWLoginsFetch
