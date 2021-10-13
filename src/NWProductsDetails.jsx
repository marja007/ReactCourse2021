import { Component } from "react";
import './App.css';


class NWProductsDetails extends Component{
   
 
    
    render(){
        console.log(this.props.asiakasObj)
        return(
            <form className="box3" key={this.props.asiakasObj.productId}>
            <table>
            <tbody>
                <tr><td className="otsikko">ProductID</td><td>{this.props.asiakasObj.productId}</td></tr>
                <tr><td className="otsikko">Product name</td><td>{this.props.asiakasObj.productName}</td></tr>
                <tr><td className="otsikko">SupplierID</td><td>{this.props.asiakasObj.supplierId} </td></tr>
                <tr><td className="otsikko">CategoryID</td><td>{this.props.asiakasObj.categoryId} </td></tr>
                <tr><td className="otsikko">Quantity per Unit </td><td>{this.props.asiakasObj.quantityPerUnit} </td></tr>
                <tr><td className="otsikko">Unit Price</td><td>{this.props.asiakasObj.unitPrice}</td></tr>
                <tr><td className="otsikko">Units in Stock</td><td>{this.props.asiakasObj.unitsInStock}</td></tr>
                <tr><td className="otsikko">Unint on Order</td><td>{this.props.asiakasObj.unitsOnOrder}</td></tr>
                <tr><td className="otsikko">Reorder Level</td><td>{this.props.asiakasObj.reorderLevel}</td></tr>
                <tr><td className="otsikko">Discontinued</td><td>{this.props.asiakasObj.discontinued.toString()}</td></tr>
                <tr><td className="otsikko">Image link</td><td>{this.props.asiakasObj.imageLink}</td></tr>
            </tbody>
            </table>
        </form>
        )
    }
}
export default NWProductsDetails