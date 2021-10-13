import { Component } from "react";
import './App.css';


class NWLoginsDelete extends Component{
    constructor(props){
        super(props);
        this.handlePerformDelete=this.handlePerformDelete.bind(this)
    }

    handlePerformDelete(event){
        event.preventDefault()
        this.NWDeleteRestApista()
    }

    handleSubmit(event){
        event.preventDefault()
        this.InsertoiKantaan()
    }



    NWDeleteRestApista(){
    const apiUrl = 'https://localhost:5001/nw/logins/'+this.props.asiakasObj.loginId
    fetch(apiUrl,{
        method:"DELETE",
        headers: {
            "Accept":"application/json",
            "Content-Type": "application/json"
        },
        body: null
    })//Tässä käsitellään vain mitä backendi vastaa, tämä ei ole submitin kannalta tarpeellista
    .then((response)=>response.json()) //vastaus muutetana jsonista javascript muotoon
    .then((json)=>{
        console.log(`Response from server:`, json)
        if(json){
            //alert("Pyyntö tehty")
            this.props.unmountMe() //Tällä poistutaan asiakasnäytöstä
        }
    })
    }
    render(){
        console.log(this.props.asiakasObj)
        return(
            <form className="box3" key={this.props.asiakasObj.loginId} onSubmit={this.handlePerformDelete}>
            <table>
            <tbody>
                <tr><td className="otsikko">AccesslevelId</td><td>{this.props.asiakasObj.acceslevelID}</td></tr>
                <tr><td className="otsikko">Email</td><td>{this.props.asiakasObj.email}</td></tr>
                <tr><td className="otsikko">Firstname</td><td>{this.props.asiakasObj.firstname} </td></tr>
                <tr><td className="otsikko">Lastname</td><td>{this.props.asiakasObj.lastname} </td></tr>
                <tr><td className="otsikko">LoginId</td><td>{this.props.asiakasObj.loginId} </td></tr>
                <tr><td className="otsikko">Password</td><td>{this.props.asiakasObj.passWord}</td></tr>
                <tr><td className="otsikko">Username</td><td>{this.props.asiakasObj.userName}</td></tr>
            </tbody>
            </table>
            <button className="btn btn-danger" type="submit">Poista tämä asiakas</button>
        </form>
        )
    }
}
export default NWLoginsDelete