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


function callBack(err, result) {
    console.warn(result);
    console.warn("balance ballls ballls balls ballllsss");
}

class Dashboard extends Component{



    constructor(props){
        super(props);
        this.state={
            TotalMush : 0,
            TotalUsdc: 0,
            EstimatedUsdcValue: 0,
            UserMush: 0,
            UserUsdc: 0
        };
        this.updateDash = this.updateDash.bind(this);
        this.updateDash();
    }



    async updateDash() {

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
/*
<pre style={{ color: 'white', margin: 0, 'text-shadow': '0px 0px 2px #35FFEC' }}>{'' +
                'Total MUSH Supply:      ${Total_Mush} MUSH\n' +
                'Your MUSH Holdings:     ${this.state.UserMush} MUSH'}
 */

    render() {


        return(
            <div>
                <h2 style={{ color: 'white', margin: 0, 'text-shadow': '0px 0px 2px #35FFEC' }}>
                <Container>
                    <Row>
                        <Col>
                            Total MUSH Supply
                        </Col>
                        <Col>
                            {this.state.TotalMush} MUSH
                        </Col>
                    </Row>
                    <br/><br/>
                    <Row>
                        <Col>
                            Total USDC Holdings of this Contract
                        </Col>
                        <Col>
                            {this.state.TotalUsdc} MUSH
                        </Col>
                    </Row>
                    <br/><br/>
                    <Row>
                        <Col>
                            Estimated Value of all Mushroom Assets
                        </Col>
                        <Col>
                            {this.state.EstimatedUsdcValue} MUSH
                        </Col>
                    </Row>
                    <br/><br/>
                    <Row>
                        <Col>
                            Your MUSH Holdings
                        </Col>
                        <Col>
                            {this.state.UserMush} MUSH
                        </Col>
                    </Row>
                    <br/><br/>
                    <Row>
                        <Col>
                            Your USDC Holdings (outside this project)
                        </Col>
                        <Col>
                            {this.state.UserUsdc} MUSH
                        </Col>
                    </Row>
                </Container>
                </h2>
            </div>
        )
    }
};
export default Dashboard;
