import React, { Component } from "react";
import web3 from "../web3"
import {Card, Form} from "semantic-ui-react";
import Mushroom from "../Mushroom";
import Rome from "../Rome";
//import Card from 'react-bootstrap/Card'
//import Box from '@material-ui/core/Box';


function callBack(err, result) {
    console.warn(result);
    console.warn("balance ballls ballls balls ballllsss");
}

class Liquidate extends Component{



    constructor(props){
        super(props);
        this.state={
            amount : 0
        };

    }



    invest = async event =>{
        console.log("EYYYYYY");

        event.preventDefault();
        try {
            this.props.UpdateWaitingOnContract(true);
            var accounts;
            await web3.eth.getAccounts().then(function(acc){ accounts = acc })

            console.log(accounts[0]);

            const batch = new web3.eth.BatchRequest();

            const weiValue = web3.utils.toWei(this.state.amount, 'ether');

            /*
            batch.add(Rome.methods.buyRome(this.state.amount).send.request({from: accounts[0], value: this.state.amount*10000000000000000}, callBack));
            batch.add(Rome.methods.buyRome(this.state.amount).send.request({from: accounts[0], value: this.state.amount*10000000000000000}, callBack));
            */

            batch.add(Mushroom.methods.unstake(weiValue).send.request({from: accounts[0]}, callBack));



            /*
            const params = { to: token.address, data: contractData, from: address };
            batch.add(web3.eth.call.request(params, callBack));
            */

            /*
            .call(from:accounts[0]))
            batch.add(Mushroom.methods
                .mint(this.state.amount) // contains the user account name
                .send({
                    from: accounts[0]
                }));

             */
            // batches let you put more than one transaction together to be processed at one
            // need them for approve transfer, then transferfrom when using erc tokens
            await batch.execute();

            this.props.UpdateWaitingOnContract(false);
            //await Rome.methods.buyRome(this.state.amount).send({from: accounts[0], value: this.state.amount*10000000000000000, gas: 100000000000000});

        } catch (err) {
            console.log("ERROR IN SENDING TO CHAIN " + err);
            this.props.UpdateWaitingOnContract(false);
        }


    }

    ButtonText() {
        if (this.props.waitingOnContract) {
            return <div>Waiting on Transactions.............</div>;
        }
        return <div>Remove Funds</div>;
    }

    render() {
        return(
            <div>
                <Card style={{
                    backgroundColor: '#fd00ff'
                }}>


                <h4 style={{ color: 'Black', fluid: false }}>Remove Funds</h4 >
                <Form.Field >
                    <input
                        style={{width:'80%'}}
                        placeholder="How many Mushroom tokens would you like to exchange?"
                        onChange={event =>
                            this.setState({
                                amount: event.target.value
                            })
                        }
                    />
                </Form.Field>
                <br/>
                <h4 style={{ color: 'Black', margin: 0  }}>   Your mushrooms will be BURNED and you will receive an equivalent stake of the pool if funds are available, and not currently tied up in investments.</h4>
                    <button id={'setLocation'} className={'btn btn-md btn-success'} disabled={this.props.waitingOnContract} style={{color:'black'}} onClick={this.invest}>
                    <span>{this.ButtonText()}</span>
                </button>

                </Card>
            </div>
        )
    }
};
export default Liquidate;
