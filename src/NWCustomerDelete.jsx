import { Component } from "react";
import './App.css';


class NWCustomerDelete extends Component{
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

    // ResetDeleteDone(){
    //     this.handleClickTable()
    //     this.haeNWRestApista()
    // }
    // callBackRoutine(){
    //    console.log('Logins callback ', this.props.tuotePbje.customerId)
    //}

    NWDeleteRestApista(){
    const apiUrl = 'https://localhost:5001/nw/customer/'+this.props.asiakasObj.customerId
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
            <form className="box3" key={this.props.asiakasObj.customerId} onSubmit={this.handlePerformDelete}>
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
            <button className="btn btn-danger" type="submit">Poista tämä asiakas</button>
        </form>
        )
    }
}
export default NWCustomerDelete