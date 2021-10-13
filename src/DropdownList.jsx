import {Component} from "react";
import './App.css';

class DropdownList extends Component{
    state= {
        Category: [],
        selectedCategory: "",
        categoryName:"",
        CategoryId:""
    }

    componentDidMount(){
      fetch('https://localhost:5001/nw/categories/')
      .then(response=>response.json()) 
      .then(data => this.setState({
        Category: [{value:"", display:"Select category"}].concat(data)}
        )).catch(error=>{
          console.log(error)
        })
        }

    render(){
      return(
        <div>
          <select value={this.state.CategoryId} onChange={this.handleChangeCategory}>
            {this.state.Category.map((catg)=><option key={catg.value} value={catg.categoryId}>
              {catg.categoryName}{catg.display}</option>)}
          </select>
        </div>
      )
    }
}
export default DropdownList