import md5 from "md5";
import {Component} from "react";
import './App.css';

class NWLoginAdd extends Component{
    constructor(props){
        super(props);
        this.state={Firstname:"", Lastname:"", Email:"", Username:"", Password:"",Password2:"",Match:"", AcceslevelID:0}
        this.handleChangeFirstname=this.handleChangeFirstname.bind(this)
        this.handleChangeLastname=this.handleChangeLastname.bind(this)
        this.handleChangeEmail=this.handleChangeEmail.bind(this)
        this.handleChangeUsername=this.handleChangeUsername.bind(this)
        this.handleChangePassword=this.handleChangePassword.bind(this)
        this.handleconfirmPassword=this.handleconfirmPassword.bind(this)
        this.handleChangeAcceslevelID=this.handleChangeAcceslevelID.bind(this)
        this.handleSubmit=this.handleSubmit.bind(this)
    }

    dismiss(){
        this.props.unmountMe()
    }

    handleChangeFirstname(event){
        var input=event.target.value;
        this.setState({...this.state, Firstname: input});
    }    
    handleChangeLastname(event){
        var input=event.target.value;
        this.setState({...this.state, Lastname: input});
    }    
    handleChangeEmail(event){
        var input=event.target.value;
        this.setState({...this.state, Email: input});
    }    
    handleChangeUsername(event){
        var input=event.target.value;
        this.setState({...this.state, Username: input});
    }
    handleChangePassword(event){
        var input=event.target.value;
        var salattu = md5(input)
        this.setState({...this.state, Password: salattu});
        //console.log(input + " "+ salattu)
    }
    handleconfirmPassword(event){
        var input=event.target.value
        var salasana2=md5(input)
        this.setState({...this.state, Password2: salasana2})
        if(this.state.Password !== salasana2){
        this.setState({Match: "salasanat eivät täsmää"});
        }
        else{
            this.setState({Match: "Nyt täsmää"})
        }

    }
    handleChangeAcceslevelID(event){
        var input=event.target.value;
        this.setState({...this.state, AcceslevelID: parseInt(input)});
        //console.log("AcceslevelID: "+input)
    }

    handleSubmit(event){
        event.preventDefault();
        if(this.state.Password===this.state.Password2)
        {
            alert("Lähetettiin käyttäjä "+ this.state.Firstname)
            this.Insertoikantaan();
        }
        else{
            alert("salasanakentät eivät täsmää")
        }

    }

    Insertoikantaan(){
        //Luodaan dataobjekti asiakasta varten, johon haetaan statesta tiedot
        const loggaaja={
           // LoginID: this.state.LoginID,
            Firstname:this.state.Firstname,
            Lastname:this.state.Lastname,
            Email:this.state.Email,
            Username:this.state.Username,
            Password:this.state.Password,
            AcceslevelID:this.state.AcceslevelID
        }
        const loggariJSON = JSON.stringify(loggaaja)

        //console.log("loggariJSON= "+ loggariJSON)
        const apiUrl = 'https://localhost:5001/nw/logins'
        fetch(apiUrl,{
            method:"POST",
            headers: {
                "Accept":"application/json",
                "Content-Type": "application/json"
            },
            body: loggariJSON
        }).then((response)=>response.json())
        .then((jsResponse)=>{
            //console.log(`Response from server: ${jsResponse}`)
            if(jsResponse){
               // alert("Pyyntö tehty")
                this.dismiss()
            }
        })
    }

    render(){       
        return(
            
          <form className="box3" onSubmit={this.handleSubmit}>
              <br/>
              {/* <input type="text" title="Syötä LoginID" placeholder="LoginID"  onChange={this.handleChangeLoginID}/> */}
              <input type="text" title="Firstname" placeholder="Firstname" onChange={this.handleChangeFirstname}/>
              <input type="text" title="Lastname" placeholder="Lastname"  onChange={this.handleChangeLastname}/>
              <input type="text" title="Email" placeholder="Email"  onChange={this.handleChangeEmail}/>
              <input type="text" title="Username" placeholder="Username"  onChange={this.handleChangeUsername}/>
              <input type="password" title="Password" placeholder="Password"  onChange={this.handleChangePassword}/>
              <input type="password" title="Password" placeholder="Confirm Password"  onChange={this.handleconfirmPassword}/>
              <input type="number" title="AcceslevelID" placeholder="AcceslevelID"  onChange={this.handleChangeAcceslevelID}/>
              <br/>
              <button type="submit">Tallenna uudet tiedot</button>
              <p>{this.state.Match}</p>
          </form>
        );
       
    }
}
export default NWLoginAdd ;
