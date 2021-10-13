import { Component } from "react";
import './App.css';


class NWLoginDetails extends Component{
   
 
    
    render(){
        console.log(this.props.asiakasObj)
        return(
            <form className="box3" key={this.props.asiakasObj.customerId}>
            <table>
            <tbody>
                <tr><td className="otsikko">Käyttäjätaso</td><td>{this.props.asiakasObj.acceslevelID}</td></tr>
                <tr><td className="otsikko">Sähköposti</td><td>{this.props.asiakasObj.email}</td></tr>
                <tr><td className="otsikko">Etunimi</td><td>{this.props.asiakasObj.firstname} </td></tr>
                <tr><td className="otsikko">Sukunimi</td><td>{this.props.asiakasObj.lastname} </td></tr>
                <tr><td className="otsikko">Käyttäjä tunniste</td><td>{this.props.asiakasObj.loginId} </td></tr>
                <tr><td className="otsikko">Käyttäjätunnus</td><td>{this.props.asiakasObj.userName}</td></tr>
            </tbody>
            </table>
        </form>
        )
    }
}
export default NWLoginDetails