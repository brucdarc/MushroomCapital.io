import React, { Component } from "react";
import web3 from "../web3"
import {Card, Form} from "semantic-ui-react";
import Mushroom from "../Mushroom";
import Rome from "../Rome";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Invest from "./Invest";
import Liquidate from "./Liquidate";
import Container from "react-bootstrap/Container";
//import Card from 'react-bootstrap/Card'
//import Box from '@material-ui/core/Box';
import Text from 'react-text';

//here cause text-shadow css no like
const moneyBlack = {color: 'black', margin: 0, 'text-shadow': '0px 0px 2px #33cd0c'}

function callBack(err, result) {
    console.warn(result);
    console.warn("balance ballls ballls balls ballllsss");
}

class Dashboard extends Component{



    constructor(props){
        super(props);
        this.state={
        };
    }


    /*
    calls a bunch of the view functions to get data about what cryptos are in the contract and owned by the user and stuff
    stores these in class state/ component state? which one owns it?

    updates the state, then things down in render actually display the values
     */


/*
<pre style={{ color: 'white', margin: 0, 'text-shadow': '0px 0px 2px #35FFEC' }}>{'' +
                'Total MUSH Supply:      ${Total_Mush} MUSH\n' +
                'Your MUSH Holdings:     ${this.state.UserMush} MUSH'}
 */

    render() {
        /*
        Never call something that sets state inside a render funciton. There was gore here.
        Infinite recursion, bad code BAD CODE. Setting state rerenders which calls render again which
        calls a thing that sets state again. Dont do it. UpdateStats moved to app class, 1 layer above.
         */


        return(
            <div>
                <h2 style={{ color: 'white', margin: 0, 'text-shadow': '0px 0px 2px #33cd0c' }}>
                <Container>
                    <Row>
                        <Col>
                            Total MUSH Supply
                        </Col>
                        <Col>
                            <h2 style={moneyBlack}>
                            {this.props.TotalMush} MUSH
                            </h2>
                        </Col>
                    </Row>
                    <br/><br/>
                    <Row>
                        <Col>
                            Total USDC Holdings of this Contract
                        </Col>
                        <Col>
                            <h2 style={moneyBlack}>
                            {this.props.TotalUsdc} USDC
                            </h2>
                        </Col>
                    </Row>
                    <br/><br/>
                    <Row>
                        <Col>
                            Estimated Value of all Mushroom Assets
                        </Col>
                        <Col>
                            <h2 style={moneyBlack}>
                            ${this.props.EstimatedUsdcValue} USD
                            </h2>
                        </Col>
                    </Row>
                    <br/><br/>
                    <Row>
                        <Col>
                            Value of MUSH coin in USDC
                        </Col>
                        <Col>
                            <h2 style={moneyBlack}>
                                {this.props.EstimatedUsdcValue/this.props.TotalMush} UDSC
                            </h2>
                        </Col>
                    </Row>
                    <br/><br/>
                    <Row>
                        <Col>
                            Your MUSH Holdings
                        </Col>
                        <Col>
                            <h2 style={moneyBlack}>
                            {this.props.UserMush} MUSH
                            </h2>
                        </Col>
                    </Row>
                    <br/><br/>
                    <Row>
                        <Col>
                            Your USDC Holdings (outside this project)
                        </Col>
                        <Col>
                            <h2 style={moneyBlack}>
                            {this.props.UserUsdc} UDSC
                            </h2>
                        </Col>
                    </Row>

                </Container>
                </h2>
            </div>
        )
    }
};
export default Dashboard;
