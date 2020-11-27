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

class Invest extends Component{



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
            var accounts;
            await web3.eth.getAccounts().then(function(acc){ accounts = acc })

            console.log(accounts[0]);

            //const batch = new web3.eth.BatchRequest();

            const weiValue = web3.utils.toWei(this.state.amount, 'ether');


            /*
            batch.add(Rome.methods.buyRome(this.state.amount).send.request({from: accounts[0], value: this.state.amount*10000000000000000}, callBack));
            batch.add(Rome.methods.buyRome(this.state.amount).send.request({from: accounts[0], value: this.state.amount*10000000000000000}, callBack));
            */

            /*
            batch.add(Rome.methods.approve(Mushroom.options.address, weiValue).send.request({from: accounts[0]}, callBack));
            batch.add(Mushroom.methods.stake(weiValue).send.request({from: accounts[0]}, callBack));
            */

            await Rome.methods.approve(Mushroom.options.address, weiValue).send({from: accounts[0]});
            await Mushroom.methods.stake(weiValue).send({from: accounts[0]});


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
            //await batch.execute();

            //await Rome.methods.buyRome(this.state.amount).send({from: accounts[0], value: this.state.amount*10000000000000000, gas: 100000000000000});

        } catch (err) {
            console.log("ERROR IN SENDING TO CHAIN " + err);
            this.setState({
            });
        }


    }

    render() {
        return(
            <div>
                <Card style={{
                    backgroundColor: '#fd00ff'
                }}>


                <h4 style={{ color: 'Black', fluid: false }}>Invest USDC</h4 >
                <Form.Field >
                    <input
                        style={{width:'80%'}}
                        placeholder="How many USDC tokens would you like to invest?"
                        onChange={event =>
                            this.setState({
                                amount: event.target.value
                            })
                        }
                    />
                </Form.Field>
                <br/>
                <h4 style={{ color: 'Black', margin: 0, }} align="center">   Tokens will be used for investments and you will get MUSH tokens based on your share of the investment pool. (Approve Both Transactions)</h4>
                    <br/>


                <button id={'setLocation'} className={'btn btn-md btn-success'} style={{color:'black'}} onClick={this.invest}>
                    <span>Invest Tokens</span>
                </button>

                </Card>
            </div>
        )
    }
};
export default Invest;
