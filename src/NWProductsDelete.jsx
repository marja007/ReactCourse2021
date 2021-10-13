import { Component } from "react";
import './App.css';


class NWProductsDelete extends Component{
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
        console.log(this.props.asiakasObj.productId)
    const apiUrl = 'https://localhost:5001/nw/productscontroller1/'+this.props.asiakasObj.productId
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
            <form className="box3" key={this.props.asiakasObj.productId} onSubmit={this.handlePerformDelete}>
            <table>
            <tbody>
                <tr><td className="otsikko">Product name</td><td>{this.props.asiakasObj.productName}</td></tr>
                <tr><td className="otsikko">CategoryID</td><td>{this.props.asiakasObj.categoryId}</td></tr>
                <tr><td className="otsikko">Quantity per Unit</td><td>{this.props.asiakasObj.quantityPerUnit} </td></tr>
                <tr><td className="otsikko">Unit Price</td><td>{this.props.asiakasObj.unitPrice} </td></tr>
                <tr><td className="otsikko">Units In Stock</td><td>{this.props.asiakasObj.unitsInStock} </td></tr>
                <tr><td className="otsikko">Units on Order</td><td>{this.props.asiakasObj.unitsOnOrder}</td></tr>
                <tr><td className="otsikko">Discontinued</td><td>{this.props.asiakasObj.discontinued}</td></tr>
            </tbody>
            </table>
            <button className="btn btn-danger" type="submit">Poista tämä tuote</button>
        </form>
        )
    }
}
export default NWProductsDelete