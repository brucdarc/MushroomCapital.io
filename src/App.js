import logo from './logo.svg';
import './App.css';
import web3 from "./web3";
import Invest from "./components/Invest";
import Liquidate from "./components/Liquidate";
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Card, Form} from "semantic-ui-react";
import {Component, React, Text} from "react";
import Dashboard from "./components/Dashboard";




class App extends Component{

    constructor(props){
        super(props);

        this.state={
            Dummy: 0
        };

        this.Update = this.Update.bind(this);
    }

    Update() {
        this.forceUpdate();
        console.log("I got called!");
    }

    render() {
        return (
            //set mushroom forest background, make it fill screen
            <div className="App" style={{
                backgroundImage: "url(" + "https://images8.alphacoders.com/600/600182.jpg" + ")",
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat'
            }}>
                <header className="App-header" style={{
                    backgroundColor: 'transparent'
                }}>
                    <br/><br/><br/><br/>
                    <h1 style={{color: 'white', margin: 0, 'text-shadow': '0px 0px 2px #35FFEC'}}> {/* neat white text with blue fading outline */}
                        Welcome to Mushroom Capital
                    </h1>
                    <br/><br/><br/><br/><br/> {/*Tons of new lines*/}
                    <Dashboard /> {/* render dashboard child component from dashboard.js */}
                    <br/><br/>
                </header>
                {/*
                     Uses bootstrap cols and rows to make everything all nice and scalable
                    */}
                <Container>
                    <Row>
                        <Col sm>
                            <Invest Update={this.Update}/> {/* render invest child component from invest.js */}
                        </Col>
                        <Col sm>
                            <Liquidate/> {/* render liquidate child component from liquidate.js */}
                        </Col>
                    </Row>
                </Container>
                <header className="App-header" style={{
                    backgroundColor: 'transparent'
                }}>
                    {/*
                     Put all those good legal warning messages up
                    */}
                    <h3 style={{color: 'EBEBEB', margin: 0, 'text-shadow': '0px 0px 2px #35FFEC'}}>
                        All initial investments are subject to up to a 1 month holding period to account for slippage.
                    </h3>
                    <h3 style={{color: 'EBEBEB', margin: 0, 'text-shadow': '0px 0px 2px #35FFEC'}}>
                        Prices may fluctuate, and Mushroom Capital is not responsible for temporary or permanent loss of
                        funds.
                    </h3>
                </header>
            </div>
        );
    }
}

export default App;