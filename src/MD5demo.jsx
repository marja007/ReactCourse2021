import './App.css'
import { Component } from 'react'
import md5 from 'md5'

class MD5Demo extends Component {
    render(){
        let salattava = "Hessu123"
        let salattu = md5(salattava)
        return(
            <div>
                <h4>Salattava merkkijono: {salattava}</h4>
                <h4>Merkkijono salattuna: {salattu}</h4>
            </div>
        )
    }
}
export default MD5Demo