import { Component } from "react";
import './App.css';


class NWCustomerEdit extends Component{

constructor(props){
    super(props);
    this.state={asiakasObj: [], CustomerID:"", CompanyName:"", ContactName:"", ContactTitle: "", Address:"", Phone:"",
    PostalCode:"", City: "", Country:"", Fax:""}
    //this.handleChangeCustomerID=this.handleChangeCustomerID.bind(this)
    this.handleChangeCompanyName=this.handleChangeCompanyName.bind(this)
    this.handleChangeContactName=this.handleChangeContactName.bind(this)
    this.handleChangeContactTitle=this.handleChangeContactTitle.bind(this)
    this.handleChangeAddress=this.handleChangeAddress.bind(this)
    this.handleChangePhone=this.handleChangePhone.bind(this)
    this.handleChangePostalCode=this.handleChangePostalCode.bind(this)
    this.handleChangeCity=this.handleChangeCity.bind(this)
    this.handleChangeCountry=this.handleChangeCountry.bind(this)
    //this.handleChangeFax=this.handleChangeFax.bind(this)
    
    this.handleSubmit=this.handleSubmit.bind(this)
}

dismiss(){
    this.props.unmountMe()
}

// handleChangeCustomerID(event){
//      var input=event.target.value;
//      this.setState({...this.state, CustomerID: input.toUpperCase()});
//  }
handleChangeCompanyName(event){
    var input=event.target.value;
    this.setState({...this.state, CompanyName: input});
}    
handleChangeContactName(event){
    var input=event.target.value;
    this.setState({...this.state, ContactName: input});
}    
handleChangeAddress(event){
    var input=event.target.value;
    this.setState({...this.state, Address: input});
}    
handleChangePhone(event){
    var input=event.target.value;
    this.setState({...this.state, Phone: input});
}

handleChangeContactTitle(event){
    var input=event.target.value;
    this.setState({...this.state, ContactTitle: input});
}

handleChangePostalCode(event){
    var input=event.target.value;
    this.setState({...this.state, PostalCode: input});
}

handleChangeCity(event){
    var input=event.target.value;
    this.setState({...this.state, City: input});
}

handleChangeCountry(event){
    var input=event.target.value;
    this.setState({...this.state, Country: input});
}

// handleChangeFax(event){
//      var input=event.target.value;
//     this.setState({...this.state, Fax: input});
// }

handleSubmit(event){
    alert("Päivitettävä asiakas "+ this.state.CustomerID)
    event.preventDefault();
    this.Insertoikantaan();
}

componentDidMount(){
    this.setState({
        CustomerID: this.props.asiakasObj.customerId,
        CompanyName: this.props.asiakasObj.companyName,
        ContactName: this.props.asiakasObj.contactName,
        Address: this.props.asiakasObj.address,
        Phone: this.props.asiakasObj.phone,
        City: this.props.asiakasObj.city,
        ContactTitle: this.props.asiakasObj.contactTitle,
        PostalCode: this.props.asiakasObj.postalCode,
        Country: this.props.asiakasObj.country,
        //Fax: this.props.asiakasObj.Fax
    })
    
}

Insertoikantaan(){
    //Luodaan dataobjekti asiakasta varten, johon haetaan statesta tiedot
    const asiakas={
        CustomerID: this.state.CustomerID,
        CompanyName:this.state.CompanyName,
        ContactName:this.state.ContactName,
        Address:this.state.Address,
        Phone:this.state.Phone,
        City:this.state.City,
        ContactTitle:this.state.ContactTitle,
        PostalCode:this.state.PostalCode,
        Country:this.state.Country,
        //Fax:this.state.Fax
    }
    const asiakasJSON = JSON.stringify(asiakas)

    console.log("asiakasJSON= "+ asiakasJSON)
    const apiUrl = 'https://localhost:5001/nw/customer/'+this.state.CustomerID
    fetch(apiUrl,{
        method:"PUT",
        headers: {
            "Accept":"application/json",
            "Content-Type": "application/json"
        },
        body: asiakasJSON
    })//Tässä käsitellään vain mitä backendi vastaa, tämä ei ole submitin kannalta tarpeellista
    .then((response)=>response.json()) //vastaus muutetana jsonista javascript muotoon
    .then((json)=>{
        console.log(`Response from server: ${json}`)
        if(json){
            //alert("Pyyntö tehty")
            this.dismiss() //Tällä poistutaan asiakasnäytöstä
        }
    })
}

render(){  
    console.log("renderistä"+this.state.CustomerID)     
    return(
        
      <form className="box3" onSubmit={this.handleSubmit}>
          <br/>
          <header>CustomerId</header>
          <input type="text" disabled={true} value = {this.state.CustomerID} title="Syötä asiakastunnus" placeholder="CustomerID"/>
          <header>Company name</header>
          <input type="text" value={this.state.CompanyName} title="Comapanyname" placeholder="CompanyName" onChange={this.handleChangeCompanyName}/>
          <header>Contact name</header>
          <input type="text" value={this.state.ContactName} title="ContactName" placeholder="ContactName"  onChange={this.handleChangeContactName}/>
          <header>Address</header>
          <input type="text" value={this.state.Address} title="Address" placeholder="Address"  onChange={this.handleChangeAddress}/>
          <header>Phone</header>
          <input type="text" value={this.state.Phone} title="Phone" placeholder="Phone"  onChange={this.handleChangePhone}/>
          <header>Contact title</header>
          <input type="text" value={this.state.ContactTitle} title="ContactTitle" placeholder="ContactTitle"  onChange={this.handleChangeContactTitle}/>
          <header>Postal code</header>
          <input type="text" value={this.state.PostalCode} title="PostalCode" placeholder="PostalCode"  onChange={this.handleChangePostalCode}/>
          <header>Country</header>
          <input type="text" value={this.state.Country} title="Country" placeholder="Country"  onChange={this.handleChangeCountry}/>
          <header>City</header>
          <input type="text" value={this.state.City} title="City" placeholder="City"  onChange={this.handleChangeCity}/>
          {/* <input type="text" title="Fax" placeholder="Fax"  onChange={this.handleChangeFax}/> */}
          <br/> <br/>
          <button class="btn btn-success" type="submit">Tallenna uudet tiedot</button>
      </form>
    );
   
}
}

export default NWCustomerEdit