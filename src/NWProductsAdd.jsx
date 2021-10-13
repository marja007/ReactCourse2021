import {Component} from "react";
import './App.css';
import DropdownList from "./DropdownList";

class NWProductsAdd extends Component{
    constructor(props){
        super(props);
        this.state={ Category: [],ProductId:0, productName:"", SupplierId:0, CategoryId:0, QuantityPerUnit:"",UnitPrice:0,UnitsInStock:0, UnitsOnOrder:0,
                    ReOrderLevel:0, discontinued:false, ImageLink:"", Supplier:"", products:[]}
        this.handleChangeProductName=this.handleChangeProductName.bind(this)
        this.handleChangeSupplierId=this.handleChangeSupplierId.bind(this)
        this.handleChangeQuantityPerUnit=this.handleChangeQuantityPerUnit.bind(this)
        this.handleChangeUnitPrice=this.handleChangeUnitPrice.bind(this)
        this.handleChangeUnitsInStock=this.handleChangeUnitsInStock.bind(this)
        this.handleChangeUnitsOnOrder=this.handleChangeUnitsOnOrder.bind(this)
        this.handleChangeReOrderLevel=this.handleChangeReOrderLevel.bind(this)
        this.handleChangeDiscontinued=this.handleChangeDiscontinued.bind(this)
        this.handleChangeImageLink=this.handleChangeImageLink.bind(this)
        this.handleChangeCategory=this.handleChangeCategory.bind(this)
        this.handleSubmit=this.handleSubmit.bind(this)

    }
    // componentDidMount(){
    //     fetch('https://localhost:5001/nw/categories/')
    //     .then(response=>response.json()) 
    //     .then(data => this.setState({
    //       Category: [{value:"", display:"Select category"}].concat(data)}
    //       )).catch(error=>{
    //         console.log(error)
    //       })

    //     }

    dismiss(){
        this.props.unmountMe()
    }

    handleChangeProductName(event){
        var input=event.target.value;
        this.setState({...this.state, productName: input});
    }    
    handleChangeSupplierId(event){
        var input=event.target.value;
        this.setState({...this.state, SupplierId: parseInt(input)});
    }    
    handleChangeCategory(event){
        if(event.target.value === "Select a category"){
            this.setState({CategoryId:""})
        }
        var input=event.target.value;
        this.setState({CategoryId: input});
    }    
    handleChangeQuantityPerUnit(event){
        var input=event.target.value;
        this.setState({...this.state, QuantityPerUnit: input});
    }
    handleChangeUnitPrice(event){
        var input=event.target.value;
        this.setState({...this.state, UnitPrice: parseInt(input)});
    }
    
    handleChangeUnitsInStock(event){
        var input=event.target.value;
        this.setState({...this.state, UnitsInStock: parseInt(input)});
    }
    handleChangeUnitsOnOrder(event){
        var input=event.target.value;
        this.setState({...this.state, UnitsOnOrder: parseInt(input)});
    }
    handleChangeReOrderLevel(event){
        var input=event.target.value;
        this.setState({...this.state, ReOrderLevel: parseInt(input)});
    }
    handleChangeDiscontinued(){
        this.setState({...this.state, discontinued: true});
    }
    handleChangeImageLink(event){
        var input=event.target.value;
        this.setState({...this.state, ImageLink: input});
    }

    handleSubmit(event){
        event.preventDefault();
        this.Insertoikantaan();
    }
    
    Insertoikantaan(){
        //Luodaan dataobjekti asiakasta varten, johon haetaan statesta tiedot
        const tuote={
            productName:this.state.productName,
            supplierId:this.state.SupplierId,
            categoryId:parseInt(this.state.CategoryId),
            quantityPerUnit:this.state.QuantityPerUnit,
            unitPrice:this.state.UnitPrice,
            unitsInStock:this.state.UnitsInStock,
            unitsOnOrder:this.state.UnitsOnOrder,
            reOrderLevel:this.state.ReOrderLevel,
            discontinued:this.state.discontinued,
            imageLink:this.state.ImageLink,
          }
        const tuoteJSON = JSON.stringify(tuote)

        console.log("tuoteJSON= "+ tuoteJSON)
        const apiUrl = 'https://localhost:5001/nw/productscontroller1'
        fetch(apiUrl,{
            method:"POST",
            headers: {
                "Accept":"application/json",
                "Content-Type": "application/json"
            },
            body: tuoteJSON
        }).then((response)=>response.json())
        .then((jsResponse)=>{
            console.log(`Response from server: ${jsResponse}`)
            if(jsResponse){
               alert("Pyyntö tehty")
                this.dismiss()
            }
        })
    }

    render(){    
        return(
            
          <form className="box3" onSubmit={this.handleSubmit}>
              
              <br/>
              {/* <input type="text" title="Syötä LoginID" placeholder="LoginID"  onChange={this.handleChangeLoginID}/> */}
              <input type="text" title="Product Name" placeholder="Product Name" onChange={this.handleChangeProductName}/>
              <input type="number" title="SupplierId" placeholder="SupplierId"  onChange={this.handleChangeSupplierId}/>
              {/* <input type="number" min="1" max ="8"  title="CategoryId" placeholder="CategoryId välillä 1-8"  onChange={this.handleChangeCategoryId}/> */}
              <input type="text" title="Quantity per Unit" placeholder="Quantity per Unit"  onChange={this.handleChangeQuantityPerUnit}/>
              <input type="number" title="Unit Price" placeholder="Unit Price"  onChange={this.handleChangeUnitPrice}/>
              <input type="number" title="Units in Stock" placeholder="Units in Stock"  onChange={this.handleChangeUnitsInStock}/>
              <input type="number" title="Units on Order" placeholder="Units on Order"  onChange={this.handleChangeUnitsOnOrder}/>
              <input type="number" title="Reorder Level" placeholder="Reorder level"  onChange={this.handleChangeReOrderLevel}/>
              <div onChange={this.handleChangeDiscontinued}>
                  <h5 >Discontinued: check for true</h5>
              <input type="radio" id="true" title="Discontinued"/> True
              </div>
              <input type="text" title="Image Link" placeholder="Image Link"  onChange={this.handleChangeImageLink}/>
              <div>
                  <DropdownList></DropdownList>
          {/* <select value={this.state.CategoryId} onChange={this.handleChangeCategory}>
            {this.state.Category.map((catg)=><option key={catg.value} value={catg.categoryId}>
              {catg.categoryName}{catg.display}</option>)}
          </select> */}
        </div>
              {/* <input type="" title="Category" placeholder="Category" value={this.props.Category} onChange={this.handleChangeCategory}/> */}
              <br/>
              <button type="submit">Tallenna uudet tiedot</button>
          </form>


        );
       
    }
}
export default NWProductsAdd ;
