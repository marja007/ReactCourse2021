import React, { Component } from 'react'
import md5 from 'md5'
import './App.css'

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            password: '',
            ShowLoginForm: true,
            LoggedInUser: ''
        }
        this.handleChangeUserName = this.handleChangeUserName.bind(this)
        this.handleChangePassword = this.handleChangePassword.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    componentDidMount() {
        //Haetaan user localstoregesta ja viitataan sen avaimeen (avain arvo pari - userilla on arvo, joka haetaan)
        const userFromLS = localStorage.getItem('user')
        //jos löytyy niin muutemaan kaksi määritettyä tietoa
        if (userFromLS) {
            this.setState({ ...this.state, ShowLoginForm: false, LoggedInUser: userFromLS })
        }
    }

    logout() {
        //tyhjentää lovalstoragen
        localStorage.clear()
        //muuttaa stateen kaksi määritettyä asiaa
        this.setState({ ...this.state, LoggedInUser: '', ShowLoginForm: true })
    }

    handleChangeUserName(event) {
        var syöte = event.target.value
        this.setState({ ...this.state, userName: syöte })
    }
    handleChangePassword(event) {
        var syöte = md5(event.target.value)
        console.log(syöte)
        //var syöte = (event.target.value)
        this.setState({ ...this.state, password: syöte })
    }

    handleSubmit(event) {
        event.preventDefault()
        this.LuoObjekti()
    }

    LuoObjekti() {

        const tunnukset = {
            //otetaan tilasta username ja password jotka on tulleet sinne formin kautta
            userName: this.state.userName,
            password: this.state.password
        }

        // send an asynchronous request to the backend
        const tunnuksetJson = JSON.stringify(tunnukset)

        let apiUrl = 'https://localhost:5001/api/authentication/'

        //let apiUrl = 'https://localhost:5001/api/authentication/'

        fetch(apiUrl, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: tunnuksetJson
        }).then((response) => response.json())
            .then((json) => {
                const success = json
                //tutkitaan onko success palautuksessa mukana username, jos tulee error niin sitä ei ole
                if (success.userName === undefined) {
                    alert("Kirjautuminen epäonnistui")
                }
                else {
                    //asetetaan localstorageen arvot
                    localStorage.setItem('user', success.userName)
                    localStorage.setItem('token', success.token)
                    //muutetaan tilaa
                    this.setState({ ...this.state, LoggedInUser: success.userName, ShowLoginForm: false })
                }
            })
    }

    render() {
        if (this.state.ShowLoginForm === true) {
            return (
                //kirjautumis formi
                <form onSubmit={this.handleSubmit}>

                    <input type="text" placeholder="userName"
                        onChange={this.handleChangeUserName} />

                    <input type="password" placeholder="password" onChange={this.handleChangePassword} />

                    <br />
                    <button type="submit">Kirjaudu</button>
                </form>
            )
        }
        else {
            return (
                <>
                    <h4>Kirjautunut käyttäjä {this.state.LoggedInUser}</h4>
                    <button className="btn-primary" onClick={() => this.logout()}>Kirjaudu ulos</button>
                </>
            )
        }
    }
}

export default Login
