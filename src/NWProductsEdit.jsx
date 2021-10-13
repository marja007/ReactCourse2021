import { Component } from "react";
import './App.css';

class NWProductsEdit extends Component{

constructor(props){
    super(props);
    this.state={productId:0, productName:"", supplierId:0, categoryId:0, quantityPerUnit:"",unitPrice:0,unitsInStock:0, unitsOnOrder:0,
    reorderLevel:0,  imageLink:"", category:"", supplier:""}
    //this.handleChangeloginId=this.handleChangeloginId.bind(this)
    this.handleChangeProductName=this.handleChangeProductName.bind(this)
    this.handleChangeSupplierId=this.handleChangeSupplierId.bind(this)
    this.handleChangeCategoryId=this.handleChangeCategoryId.bind(this)
    this.handleChangeQuantityPerUnit=this.handleChangeQuantityPerUnit.bind(this)
    this.handleChangeUnitPrice=this.handleChangeUnitPrice.bind(this)
    this.handleChangeUnitsInStock=this.handleChangeUnitsInStock.bind(this)
    this.handleChangeUnitsOnOrder=this.handleChangeUnitsOnOrder.bind(this)
    this.handleChangeReOrderLevel=this.handleChangeReOrderLevel.bind(this)
    // this.handleChangeDiscontinued=this.handleChangeDiscontinued.bind(this)
    this.handleChangeImageLink=this.handleChangeImageLink.bind(this)
    // this.handleChangeCategory=this.handleChangeCategory.bind(this)
    // this.handleChangeSupplier=this.handleChangeSupplier.bind(this)
    this.handleSubmit=this.handleSubmit.bind(this)
}

dismiss(){
    this.props.unmountMe()
}

handleChangeProductName(event){
    var input=event.target.value;
    this.setState({...this.state, productName: input});
}    
handleChangeSupplierId(event){
    var input=event.target.value;
    this.setState({...this.state, supplierId: parseInt(input)});
}    
handleChangeCategoryId(event){
    var input=event.target.value;
    this.setState({...this.state, categoryId: parseInt(input)});
}    
handleChangeQuantityPerUnit(event){
    var input=event.target.value;
    this.setState({...this.state, quantityPerUnit: input});
}
handleChangeUnitPrice(event){
    var input=event.target.value;
    this.setState({...this.state, unitPrice: parseInt(input)});
}

handleChangeUnitsInStock(event){
    var input=event.target.value;
    this.setState({...this.state, unitsInStock: parseInt(input)});
}
handleChangeUnitsOnOrder(event){
    var input=event.target.value;
    this.setState({...this.state, unitsOnOrder: parseInt(input)});
}
handleChangeReOrderLevel(event){
    var input=event.target.value;
    this.setState({...this.state, reorderLevel: parseInt(input)});
}
// handleChangeDiscontinued(event){
//     var input=event.target.value;
//     this.setState({...this.state, Discontinued: input});
// }
handleChangeImageLink(event){
    var input=event.target.value;
    this.setState({...this.state, imageLink: input});
}
// handleChangeCategory(event){
//     var input=event.target.value;
//     this.setState({...this.state, Category:input});
// }
// handleChangeSupplier(event){
//     var input=event.target.value;
//     this.setState({...this.state, Supplier: input});
// }


handleSubmit(event){
    alert("Päivitettävä tuote "+ this.state.productId)
    event.preventDefault();
    this.Insertoikantaan();
}

componentDidMount(){
    this.setState({
        productId:this.props.asiakasObj.productId,
        productName:this.props.asiakasObj.productName,
        supplierId:this.props.asiakasObj.supplierId,
        categoryId:this.props.asiakasObj.categoryId,
        quantityPerUnit:this.props.asiakasObj.quantityPerUnit,
        unitPrice:this.props.asiakasObj.unitPrice,
        unitsInStock:this.props.asiakasObj.unitsInStock,
        unitsOnOrder:this.props.asiakasObj.unitsOnOrder,
        reorderLevel:this.props.asiakasObj.reorderLevel,
        // discontinued:this.props.asiakasObj.Discontinued,
        imageLink:this.props.asiakasObj.imageLink,
        // category:this.props.asiakasObj.Category,
        // supplier:this.props.asiakasObj.Supplier
 
    })
    
}

Insertoikantaan(){
    //Luodaan dataobjekti asiakasta varten, johon haetaan statesta tiedot
    const tuote={
        productId:this.state.productId,
        productName:this.state.productName,
        supplierId:this.state.supplierId,
        categoryId:this.state.categoryId,
        quantityPerUnit:this.state.quantityPerUnit,
        unitPrice:this.state.unitPrice,
        unitsInStock:this.state.unitsInStock,
        unitsOnOrder:this.state.unitsOnOrder,
        reorderLevel:this.state.reorderLevel,
        // discontinued:this.state.Discontinued,
        imageLink:this.state.imageLink,
        // category:this.state.Category,
        // supplier:this.state.Supplier
    }
    const productJSON = JSON.stringify(tuote)

    console.log("productJSON= "+ productJSON)
    const apiUrl = 'https://localhost:5001/nw/productscontroller1/'+this.state.productId
    fetch(apiUrl,{
        method:"PUT",
        headers: {
            "Accept":"application/json",
            "Content-Type": "application/json"
        },
        body: productJSON
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
    console.log("renderistä"+this.state.productId)     
    return(
        
      <form className="box3" onSubmit={this.handleSubmit}>
          <br/>
          <header>ProductId</header>
          <input type="number" disabled={true} value = {this.state.productId} title="ProductId" placeholder="ProductId"/>
          <header>productName</header>
          <input type="text" value={this.state.productName} title="productName" placeholder="productName" onChange={this.handleChangeProductName}/>
          <header>SupplierID</header>
          <input type="number" value={this.state.supplierId} title="SupplierId" placeholder="SupplierId"  onChange={this.handleChangeSupplierId}/>
          <header>CategoryId</header>
          <input type="number" value={this.state.categoryId}   title="CategoryId" placeholder="CategoryId välillä 1-8"  onChange={this.handleChangeCategoryId}/>
          <header>Quantity per unit</header>
          <input type="text" value={this.state.quantityPerUnit} title="QuantityPerUnit" placeholder="QuantityPerUnit"  onChange={this.handleChangeQuantityPerUnit}/>
          <header>Units in Stock</header>
          <input type="number" value={this.state.unitsInStock} title="UnitsInStock" placeholder="UnitsInStock"  onChange={this.handleChangeUnitsInStock}/>
          <header>Units on Order</header>
          <input type="number" value={this.state.unitsOnOrder} title="UnitsOnOrder" placeholder="UnitsOnOrder"  onChange={this.handleChangeUnitsOnOrder}/>
          <header>Reorder Level</header>
          <input type="number" value={this.state.reorderLevel} title="ReOrderLevel" placeholder="ReOrderLevel"  onChange={this.handleChangeReOrderLevel}/>
          <header>Image link</header>
          <input type="text" value={this.state.imageLink} title="ImageLink" placeholder="ImageLink"  onChange={this.handleChangeImageLink}/>
          <br/>
          <br/>
          <button class="btn btn-success" type="submit">Tallenna uudet tiedot</button>
      </form>
    );
   
}
}

export default NWProductsEdit