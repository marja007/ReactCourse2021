import { Component } from "react";
import './App.css';


class NWCustomerDetails extends Component{
   
 
    
    render(){
        console.log(this.props.asiakasObj)
        return(
            <form className="box3" key={this.props.asiakasObj.customerId}>
            <table>
            <tbody>
                <tr><td className="otsikko">Asiakastunnus</td><td>{this.props.asiakasObj.customerId}</td></tr>
                <tr><td className="otsikko">Yritys</td><td>{this.props.asiakasObj.companyName}</td></tr>
                <tr><td className="otsikko">Yhteyshenkilö</td><td>{this.props.asiakasObj.contactName} </td></tr>
                <tr><td className="otsikko">Titteli</td><td>{this.props.asiakasObj.contactTitle} </td></tr>
                <tr><td className="otsikko">Osoite</td><td>{this.props.asiakasObj.address} </td></tr>
                <tr><td className="otsikko">Kaupunki</td><td>{this.props.asiakasObj.city}</td></tr>
                <tr><td className="otsikko">Maa</td><td>{this.props.asiakasObj.country}</td></tr>
                <tr><td className="otsikko">Puhelin</td><td>{this.props.asiakasObj.phone}</td></tr>
                <tr><td className="otsikko">Postinumero</td><td>{this.props.asiakasObj.postalCode}</td></tr>
            </tbody>
            </table>
        </form>
        )
    }
}
export default NWCustomerDetails