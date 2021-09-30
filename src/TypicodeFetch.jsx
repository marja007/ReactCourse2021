import {Component} from "react";
import './App.css';

class TypicodeFetch extends Component{
    constructor(props){
        super(props)
        this.state={
            todos:[],
            recordcount:0,
            page: 1, 
            limit: 10,
            userId:""
        }
        //input kentän onCahnge-kuuntelijan funktio sidotaan itseensä
        this.handleChangeUserId=this.handleChangeUserId.bind(this);
    }

    handleClickNext=() =>{
       this.setState({
           page: this.state.page+1
       },this.HaeTypicodesta)
    }

    handleClickPrev=()=>{
        let pagenumber = this.state.page;
        if (pagenumber > 0) {
            pagenumber = pagenumber-1;
        }
        this.setState({
            page: pagenumber,
        },this.HaeTypicodesta);
    }

    handleChangeUserId(event){
        //Tässä sijoitettan arvo-olioon eventillä vastaanotettu value
        let arvo=event.target.value;
        //kun staten päivitys on tehty kutsutaan componentDidMounttia, jotta se tulee voimaan heti
        console.log(arvo)
        this.setState({userId: arvo}, this.componentDidMount);
    }

    componentDidMount()   
    {
        this.HaeTypicodesta()
    }

    HaeTypicodesta()
        { //Haetaan diibadaaba dataa netistä
            if(this.state.userId !==""){
                fetch('https://jsonplaceholder.typicode.com/todos?userId='+this.state.userId+'&_page='+this.state.page+'&_limit='+this.state.limit)
                .then(resp => resp.json())
                .then(oliot => this.setState({todos: oliot}))
            }
            else{
                fetch('https://jsonplaceholder.typicode.com/todos?_page='+this.state.page+'&_limit='+this.state.limit)
                .then(resp => resp.json())
                .then(oliot => this.setState({todos: oliot}))
            }

        }
    
        render(){
            const{todos}=this.state

            if(todos.length >0)
            {
                //console.log("State on:  ", this.state.todos)
                return(
                    <div>
                        <h2>Todos from Typicode</h2>
                        {/* <p>{this.state.todos[70].title}</p> */}
                        {/* luodaan hakukenttä mistä annettu arvo välitetään onCange eventillä handleChangeUserId:lle */}
                        <input type="text" placeholder="Limit with userId" title="Anna userID" value={this.state.userId} onChange={this.handleChangeUserId}/>
                        <button onClick={this.handleClickPrev}>Edelliset</button>
                        <button onClick={this.handleClickNext}>Seuraavat</button>
                        <table>
                            <thead>
                                <tr>
                                <th>id</th>
                                <th>userId</th>
                                <th>title</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* käy läpi jokaisen todo elementin ja aliaisoi sen annetulle elementille */}
                                {todos.map(t=>(
                                    <tr key={t.id}>
                                        <td>{t.id}</td>
                                        <td>{t.userId}</td>
                                        <td>{t.title}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )
            }
            else
            {
                return(
                    <div>
                        <h2>Ladataan....</h2>
                    </div>
                )
            }
    }
}
export default TypicodeFetch
