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
import Mushroom from "./Mushroom";
import Rome from "./Rome";


//here and not in style sheet because css doesnt like text-shadow 33cd0c 35FFEC
const radiantWhite = {color: 'white', margin: 0, 'text-shadow': '0px 0px 2px #35FFEC'}


class App extends Component{



    constructor(props){
        super(props);

        this.state={
            waitingOnContract: false,
            TotalMush : 0,
            TotalUsdc: 0,
            EstimatedUsdcValue: 0,
            UserMush: 0,
            UserUsdc: 0
        };

        this.Update = this.Update.bind(this);
        this.UpdateWaitingOnContract = this.UpdateWaitingOnContract.bind(this);
        this.updateContractStats = this.updateContractStats.bind(this);
        //go fetch data from chain
        this.updateContractStats();
    }
    /*
    moved this here because we need to call it when invest or liquidate calls the update function, and having
    something that calls setstate in a render method causes infinite recursion slowly
    */

    async updateContractStats() {

        var accounts;

        try {
            await web3.eth.getAccounts().then(function (acc) {
                accounts = acc
            })

            let total_mush = await Mushroom.methods.totalSupply().call();
            let user_mush = await Mushroom.methods.balanceOf(accounts[0]).call();

            let est_value = await Mushroom.methods.viewEstValue().call();

            let total_usdc = await Rome.methods.balanceOf(Mushroom.options.address).call();
            let user_usdc = await Rome.methods.balanceOf(accounts[0]).call();

            total_mush = web3.utils.fromWei(total_mush, 'ether');
            user_mush = web3.utils.fromWei(user_mush, 'ether');
            est_value = web3.utils.fromWei(est_value, 'ether');
            total_usdc = web3.utils.fromWei(total_usdc, 'ether');
            user_usdc = web3.utils.fromWei(user_usdc, 'ether');


            this.setState({
                TotalMush: total_mush,
                UserMush: user_mush,
                TotalUsdc: total_usdc,
                UserUsdc: user_usdc,
                EstimatedUsdcValue: est_value
            });


        }
        catch (err) {
            console.log("ERROR IN SENDING TO CHAIN " + err);
            this.setState({
            });
        }
    }

    Update() {
        this.updateContractStats();
        this.forceUpdate();
        console.log("I got called!");
    }

    UpdateWaitingOnContract(bool) {
        this.setState({
            waitingOnContract: bool
        });
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
                    <h1 style={radiantWhite}> {/* neat white text with blue fading outline */}
                        Welcome to Mushroom Capital
                    </h1>
                    <br/><br/><br/><br/><br/> {/*Tons of new lines*/}
                    <Dashboard TotalMush={this.state.TotalMush} UserMush={this.state.UserMush}
                               TotalUsdc={this.state.TotalUsdc} UserUsdc={this.state.UserUsdc}
                               EstimatedUsdcValue={this.state.EstimatedUsdcValue}
                    /> {/* render dashboard child component from dashboard.js */}
                    <br/><br/>
                </header>
                {/*
                     Uses bootstrap cols and rows to make everything all nice and scalable
                    */}
                <Container>
                    <Row>
                        <Col sm>
                            <Invest Update={this.Update} waitingOnContract={this.state.waitingOnContract} UpdateWaitingOnContract={this.UpdateWaitingOnContract} /> {/* render invest child component from invest.js */}
                        </Col>
                        <Col sm>
                            <Liquidate Update={this.Update} waitingOnContract={this.state.waitingOnContract} UpdateWaitingOnContract={this.UpdateWaitingOnContract}/> {/* render liquidate child component from liquidate.js */}
                        </Col>
                    </Row>
                </Container>
                <header className="App-header" style={{
                    backgroundColor: 'transparent'
                }}>
                    {/*
                     Put all those good legal warning messages up
                    */}
                    <h3 style={radiantWhite}>
                        All initial investments are subject to up to a 1 month holding period to account for slippage.
                    </h3>
                    <h3 style={radiantWhite}>
                        Prices may fluctuate, and Mushroom Capital is not responsible for temporary or permanent loss of
                        funds.
                    </h3>
                </header>
            </div>
        );
    }
}

export default App;