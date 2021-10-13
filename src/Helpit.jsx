import {Component} from "react";
import './App.css';
class Helpit extends Component{
    render(){
        if(this.props.moduli==="x"){
            return(<div><p>Helppiä</p></div>)
        }
        else if(this.props.moduli==="NWCustomerFetch"){
            return(<div><p>Voit hakea asiakkaita ja muokata niiden perustietoja</p></div>)
        }
        else if(this.props.moduli==="NWLoginsFetch"){
            return(<div><p>Voit hakea käyttäjiä ja muokata niiden perustietoja</p></div>)
        }
        else if(this.props.moduli==="NWProductsFetch"){
            return(<div><p>Voit hakea tuotteita ja muokata niiden perustietoja</p></div>)
        }
        else{
            return(<div><p>Helppiä ei löydy</p></div>)
        }
    }
}
export default Helpit;