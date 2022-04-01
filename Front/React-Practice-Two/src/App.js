import React, { useContext, useState } from 'react'
import { Container, Navbar, Nav, NavDropdown, Form, FormControl, Button, Jumbotron, Modal } from 'react-bootstrap'
import './App.css';
import { Link, Route, Switch } from 'react-router-dom';
import Detail from './Detail.js';
import axios from 'axios';

let stockContext = React.createContext();

function App() {

  let data = [
    {
      id : 0,
      title : "White and Black",
      content : "Born in France",
      price : 120000
    },
    {
      id : 1,
      title : "Red Knit",
      content : "Born in Seoul",
      price : 110000
    },
    {
      id : 2,
      title : "Born in Seoul",
      content : "Born in the States",
      price : 130000
    }
  ]

  let [shoes, shoesSet] = useState(data);
  let [alert, alertSet] = useState(true);
  let [stock, stockSet] = useState([10,11,12]);


  return (
    <div className="App">
      <Navbars/>  

      { /* exact는 정확히 path가 일치할 때만 Route 기능을 지원함 */ }
      
      <Switch>
        <Route exact path="/">
          <Jumbotron className="background">
            <h1>20% Season Off</h1>
            <p>
              This is a simple hero unit, a simple jumbotron-style component for calling
              extra attention to featured content or information.
            </p>
            <p>
              <Button variant="primary">Learn more</Button>
            </p>
          </Jumbotron>


          <div className="container">
            <stockContext.Provider value={stock}>

            <div className="row">
              {
                shoes.map((data, index) => {
                    return <Card shoes={data} index={index}/>
                    // or <Card shoes={shoes[index]} index={index}/>
                })
              }
            </div>

            </stockContext.Provider>

            <button className="btn btn-primary" onClick={()=>{
              
              axios.get('https://codingapple1.github.io/shop/data2.json')
              .then((result) => { 
                shoesSet([...shoes, ...result.data]) 
              })
              .catch((error) => { console.log(error) })

            }}>더보기</button>
          </div>
        </Route>
        <Route path="/details/:id">
          <Detail shoes={ shoes } stock={ stock } stockSet={ stockSet }/>
        </Route>

        <Route path="/:id">
          <div>아무거나</div>
        </Route>
      </Switch>

    </div>
  );
}

function Navbars() {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand> <Link to="/"> ShoeShop </Link> </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link> <Link to="/">Home</Link> </Nav.Link>
            <Nav.Link> <Link to="/details/1">Detail</Link> </Nav.Link>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Form inline>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            <Button variant="outline-success">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
      </Navbar>
  );
}

function Card(props) {
  
  let storedStock = useContext(stockContext);

  return (
    <div className="col-md-4">
      <img src={ `https://codingapple1.github.io/shop/shoes${props.index + 1}.jpg` } width="100%" alt="shoes1"/>
      <h4>{ props.shoes.title }</h4>
      <p>{ props.shoes.content } & { props.shoes.price }</p>
    </div>
  );
}


export default App;
