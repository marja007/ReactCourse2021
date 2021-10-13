import { Component } from "react";
import './App.css';
import md5 from "md5";


class NWLoginsEdit extends Component{

constructor(props){
    super(props);
    this.state={loggariObj: [], loginId:0, acceslevelID:0, email:"", firstname: "", lastname:"", passWord:"",
    userName:""}
    //this.handleChangeloginId=this.handleChangeloginId.bind(this)
    this.handleChangeacceslevelID=this.handleChangeacceslevelID.bind(this)
    this.handleChangeemail=this.handleChangeemail.bind(this)
    this.handleChangefirstname=this.handleChangefirstname.bind(this)
    this.handleChangelastname=this.handleChangelastname.bind(this)
    this.handleChangepassWord=this.handleChangepassWord.bind(this)
    this.handleChangeuserName=this.handleChangeuserName.bind(this)
    
    this.handleSubmit=this.handleSubmit.bind(this)
}

dismiss(){
    this.props.unmountMe()
}

// handleChangeloginId(event){
//      var input=event.target.value;
//      this.setState({...this.state, loginId: parseInt(input)});
//  }
handleChangeacceslevelID(event){
    var input=event.target.value;
    this.setState({...this.state, acceslevelID: parseInt(input)});
}    
handleChangeemail(event){
    var input=event.target.value;
    this.setState({...this.state, email: input});
}    
handleChangelastname(event){
    var input=event.target.value;
    this.setState({...this.state, lastname: input});
}    
handleChangepassWord(event){
    var input=event.target.value;
    var salattu = md5(input)
    this.setState({...this.state, passWord: salattu});
}

handleChangefirstname(event){
    var input=event.target.value;
    this.setState({...this.state, firstname: input});
}

handleChangeuserName(event){
    var input=event.target.value;
    this.setState({...this.state, userName: input});
}


handleSubmit(event){
    alert("Päivitettävä asiakas "+ this.state.loginId)
    event.preventDefault();
    this.Insertoikantaan();
}

componentDidMount(){
    this.setState({
        loginId: this.props.asiakasObj.loginId,
        acceslevelID: this.props.asiakasObj.acceslevelID,
        email: this.props.asiakasObj.email,
        lastname: this.props.asiakasObj.lastname,
        passWord: this.props.asiakasObj.passWord,
        firstname: this.props.asiakasObj.firstname,
        userName: this.props.asiakasObj.userName,
 
    })
    
}

Insertoikantaan(){
    //Luodaan dataobjekti asiakasta varten, johon haetaan statesta tiedot
    const asiakas={
        loginId: this.state.loginId,
        acceslevelID:this.state.acceslevelID,
        email:this.state.email,
        lastname:this.state.lastname,
        passWord:this.state.passWord,
        firstname:this.state.firstname,
        userName:this.state.userName,
    }
    const asiakasJSON = JSON.stringify(asiakas)

    console.log("asiakasJSON= "+ asiakasJSON)
    const apiUrl = 'https://localhost:5001/nw/logins/'+this.state.loginId
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
    console.log("renderistä"+this.state.loginId)     
    return(
        
      <form className="box3" onSubmit={this.handleSubmit}>
          <br/>
          <header>LoginID</header>
          <input type="text" disabled={true} value = {this.state.loginId} title="LoginID" placeholder="loginId"/>
          <header>accesslevelID</header>
          <input type="number" value={this.state.acceslevelID} title="accesslevelID" placeholder="accesslevelID" onChange={this.handleChangeacceslevelID}/>
          <header>email</header>
          <input type="text" value={this.state.email} title="email" placeholder="email"  onChange={this.handleChangeemail}/>
          <header>lastname</header>
          <input type="text" value={this.state.lastname} title="lastname" placeholder="lastname"  onChange={this.handleChangelastname}/>
          <header>password</header>
          <input type="password" value={this.state.passWord} title="passWord" placeholder="passWord"  onChange={this.handleChangepassWord}/>
          <header>firstname</header>
          <input type="text" value={this.state.firstname} title="firstname" placeholder="firstname"  onChange={this.handleChangefirstname}/>
          <header>userName</header>
          <input type="text" value={this.state.userName} title="userName" placeholder="userName"  onChange={this.handleChangeuserName}/>
          <br/><br/>
          <button className="btn btn-success" type="submit">Tallenna uudet tiedot</button>
      </form>
    );
   
}
}

export default NWLoginsEdit