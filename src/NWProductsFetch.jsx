import {Component} from "react";
import './App.css';
import Helpit from "./Helpit";
import NWProductsAdd from "./NWProductsAdd";
import NWProductsDelete from "./NWProductsDelete";
import NWProductsEdit from "./NWProductsEdit";
import NWProductsDetails from "./NWProductsDetails";

class NWProductsFetch extends Component{
    constructor(props){
        super(props)
        this.state={
            products:[],
            visible:"table",
            yksiTuote: {},
            poistettavaTuote: {},
        }
        this.handleChildUnmount=this.handleChildUnmount.bind(this)
        this.handleClickEdit =this.handleClickEdit.bind(this)
        this.handleClickDelete =this.handleClickDelete.bind(this)
        this.handleClickDetails =this.handleClickDetails.bind(this)
    }
    handleClickEdit =(dataObj)=>{
        this.setState({  
        yksiTuote: dataObj,
        visible: "editform"
        })
        console.log("Editoi tätä" + this.state.yksiTuote)
    }
    handleClickDetails =(dataObj)=>{
        this.setState({  
        yksiTuote: dataObj,
        visible: "detailsform"
        })
        console.log("Katso tätä" + this.state.yksiTuote)
    }

    handleClickDelete =(dataObj)=>{
        this.setState({  
        poistettavaTuote: dataObj,
        visible: "deleteform"
        })
        console.log("Poista tämä" + this.state.poistettavaTuote)
    }
    handleChildUnmount(){
        this.setState({renderChild: false})
        this.handeleClickTable()
        this.haeNWRestApista()
    }

      handleClickHelp=()=>{this.setState({visible:"help"})}
      handleClickNEW=()=>{this.setState({visible: "addform", renderChild:true})}
      handeleClickTable=()=>{this.setState({visible:"table"})}

    componentDidMount()   
    {
        this.haeNWRestApista()
    }


    
    haeNWRestApista()
    {  
        fetch('https://localhost:5001/nw/productscontroller1/')
        .then(resp => resp.json())
        .then(oliot => this.setState({products: oliot}))
        
    }

    render(){
        const{products}=this.state
        //console.log("State on "+ this.state.products)
        if(this.state.visible === "table"){
            //console.log("State on:  ", this.state.logins)
            return(
                <div className="box1">
                    <h2>Tuotteet</h2>
                    <p>Näytetään {products.length} tuotetta</p>
                    <button onClick={this.handleClickNEW}>Uusi tuote</button>
                    <button onClick={this.handleClickHelp}>Helppi</button>                    
                    <table>
                        <thead>
                            <tr>
                            <th>Tuotenimi</th>
                            <th>Yksikköhinta</th>
                            <th>Varastossa</th>
                            <th>Tilauksessa</th>
                            <th>KategoriaId</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* käy läpi jokaisen logins elementin ja aliaisoi sen annetulle elementille (t) */}
                            {products.map(t=>(
                                <tr key={t.productId}>
                                    <td>{t.productName}</td>
                                    <td>{t.unitPrice}</td>
                                    <td>{t.unitsInStock}</td>
                                    <td>{t.unitsOnOrder}</td>
                                    <td>{t.categoryId}</td>
                                    <td><button onClick={()=>this.handleClickEdit(t)}>Muokkaa</button></td>
                                    <td><button className="btn-danger" onClick={()=>this.handleClickDelete(t)}>Poista</button></td>
                                    <td><button onClick={()=>this.handleClickDetails(t)}>Tiedot</button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )
        }
        else if(this.state.visible === "addform"){
            return(<div className="box2"><h2>Addmoduuli</h2>
            <button onClick={this.handleClickHelp}>Opaste</button>
            <button onClick={this.handeleClickTable}>Selaa tuotteita</button>
            {this.state.renderChild ?<NWProductsAdd unmountMe={this.handleChildUnmount}/>: null}
            </div>

            )
        }
        else if(this.state.visible === "help")
        {
            return(<div className="box3"><h2>Helppimoduuli</h2>
            <button onClick={this.handleClickNEW}>Lisää uusi tuote</button>
            <button onClick={this.handeleClickTable}>Selaa tuotteita</button>
            <Helpit moduli="NWProductsFetch"/>
            </div>);
        }
        else if(this.state.visible==="deleteform"){
            return(<div className="box1">
            <h1>Tuotteen poisto</h1>
            <div>
                <button onClick={this.handleClickHelp}>Näytä helppi</button>
                <button onClick={this.handeleClickTable}>Selaa tuotteita</button>
            </div>
            <NWProductsDelete asiakasObj={this.state.poistettavaTuote} unmountMe={this.handleChildUnmount}/>
        </div>)
        }
        else if(this.state.visible==="editform"){
            return(<div className="box1">
                <h1>Tuotetietojen muokkaus</h1>
                <div>
                    <button onClick={this.handleClickHelp}>Näytä helppi</button>
                    <button onClick={this.handeleClickTable}>Selaa tuotteita</button>
                </div>
                <NWProductsEdit asiakasObj={this.state.yksiTuote} unmountMe={this.handleChildUnmount}/>
            </div>)
        }
        else if(this.state.visible==="detailsform"){
            return(<div className="box1">
                <h1>Tuotetietojen katselu</h1>
                <div>
                    <button onClick={this.handleClickHelp}>Näytä helppi</button>
                    <button onClick={this.handeleClickTable}>Selaa tuotteita</button>
                </div>
                <NWProductsDetails asiakasObj={this.state.yksiTuote} unmountMe={this.handleChildUnmount}/>
            </div>)
        }
        else{
            return(
                <div>Jokin meni pieleen...</div>
            )
        }
    }
}

export default NWProductsFetch
