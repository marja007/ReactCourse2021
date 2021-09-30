import {Component} from "react";
import './App.css';
import Helpit from "./Helpit";
import NWLoginAdd from "./NWLoginAdd";

class NWLoginsFetch extends Component{
    constructor(props){
        super(props)
        this.state={
            logins:[],
            start:0,
            take: 10,
            lastname:"",
            arvot:[],
            visible:"table"
        }
        this.handleChangeLastname=this.handleChangeLastname.bind(this);
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
 
        //Tässä sijoitettan arvo-olioon eventillä vastaanotettu value
        var arvot=[...this.state.arvot]
        arvot.push(this.arvo.value)
        this.setState({arvot})
        //kun staten päivitys on tehty kutsutaan componentDidMounttia, jotta se tulee voimaan heti
        //console.log(arvot + " handlessa")
        this.setState({lastname: arvot},this.componentDidMount)  
      }

    
    haeNWRestApista()
        {  
            if(this.state.lastname !==""){
                fetch('https://localhost:5001/nw/logins/'+this.state.lastname)
                .then(resp => resp.json())
                .then(oliot => this.setState({logins: oliot}))
            }
            else{
                fetch('https://localhost:5001/nw/logins')
                .then(resp => resp.json())
                .then(oliot => this.setState({logins: oliot}))
            }
        }

        render(){
            const{logins}=this.state
            if(logins.length >0)
            {
                if(this.state.visible === "table"){
                //console.log("State on:  ", this.state.logins)
                return(
                    <div className="box1">
                        <h2>Käyttäjät</h2>
                        {/* <p>{this.state.customers[70].title}</p> */}
                        <button onClick={this.handleClickPrev}>Edelliset</button>
                        <button onClick={this.handleClickNext}>Seuraavat</button>
                        <button onClick={this.handleClickNEW}>Uusi käyttäjä</button>
                        <button onClick={this.handleClickHelp}>Helpppi</button>
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
