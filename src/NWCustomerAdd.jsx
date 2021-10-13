import {Component} from "react";
import './App.css';

class NWCustomerAdd extends Component{

    constructor(props){
        super(props);
        this.state={CustomerID:"", CompanyName:"", ContactName:"", Address:"", Phone:""}
        this.handleChangeCustomerID=this.handleChangeCustomerID.bind(this)
        this.handleChangeCompanyName=this.handleChangeCompanyName.bind(this)
        this.handleChangeContactName=this.handleChangeContactName.bind(this)
        this.handleChangeAddress=this.handleChangeAddress.bind(this)
        this.handleChangePhone=this.handleChangePhone.bind(this)
        this.handleSubmit=this.handleSubmit.bind(this)
    }

    dismiss(){
        this.props.unmountMe()
    }

    handleChangeCustomerID(event){
        var input=event.target.value;
        this.setState({...this.state, CustomerID: input.toUpperCase()});
    }
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

    handleSubmit(event){
        alert("Lähetettiin asiakas "+ this.state.CustomerID)
        event.preventDefault();
        this.Insertoikantaan();
    }

    Insertoikantaan(){
        //Luodaan dataobjekti asiakasta varten, johon haetaan statesta tiedot
        const asiakas={
            CustomerID: this.state.CustomerID,
            CompanyName:this.state.CompanyName,
            ContactName:this.state.ContactName,
            Address:this.state.Address,
            Phone:this.state.Phone
        }
        const asiakasJSON = JSON.stringify(asiakas)

        console.log("asiakasJSON= "+ asiakasJSON)
        const apiUrl = 'https://localhost:5001/nw/customer'

        let jwtoken = localStorage.getItem("token")

        fetch(apiUrl,{
            method:"POST",
            headers: {
                Authorization: "Bearer "+ jwtoken,
                "Accept":"application/json",
                "Content-Type": "application/json"
            },
            body: asiakasJSON
        })//Tässä käsitellään vain mitä backendi vastaa, tämä ei ole submitin kannalta tarpeellista
        .then((response)=>response.json()) //vastaus muutetana jsonista javascript muotoon
        .then((json)=>{
            //console.log(`Response from server: ${json}`)
            if(json){
                //alert("Pyyntö tehty")
                this.dismiss() //Tällä poistutaan asiakasnäytöstä
            }
        })
    }

    render(){       
        return(
            
          <form className="box3" onSubmit={this.handleSubmit}>
              <br/>
              <header>CustomerID</header>
              <input type="text" title="Syötä asiakastunnus" placeholder="CustomerID"  onChange={this.handleChangeCustomerID}/>
              <header>Company name</header>
              <input type="text" title="Comapanyname" placeholder="CompanyName" onChange={this.handleChangeCompanyName}/>
              <header>Contact name</header>
              <input type="text" title="ContactName" placeholder="ContactName"  onChange={this.handleChangeContactName}/>
              <header>Address</header>
              <input type="text" title="Address" placeholder="Address"  onChange={this.handleChangeAddress}/>
              <header>Phone</header>
              <input type="text" title="Phone" placeholder="Phone"  onChange={this.handleChangePhone}/>
              <br/> <br/>
              <button className="btn btn-success" type="submit">Tallenna uudet tiedot</button>
          </form>
        );
       
    }
}
export default NWCustomerAdd;