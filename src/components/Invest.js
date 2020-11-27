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
            amount : 0,
            waitingOnContract: false
        };

        //have to bind functions to this. still dont know why after all these projects lmao,
        //but dont forget it or things break!
        this.ButtonText = this.ButtonText.bind(this);
        /*
        Do not call the update function in the constructor. Only the render function is called when the
        parent tells child to rerender, so anything in the constructor will not be called again.
         */

    }



    invest = async event =>{
        console.log("EYYYYYY");

        event.preventDefault();
        try {
            var accounts;

            this.props.UpdateWaitingOnContract(true);

            await web3.eth.getAccounts().then(function(acc){ accounts = acc })

            console.log(accounts[0]);

            //const batch = new web3.eth.BatchRequest();

            const weiValue = web3.utils.toWei(this.state.amount, 'ether');

            /*
            ------------------------------------------------------------------------------------------
            theres a lot of commented out code in this section, but im leaving it because
            it is a working example of how to use web3 batches correctly, and I might need that later
            ------------------------------------------------------------------------------------------
             */

            /*
            batch.add(Rome.methods.approve(Mushroom.options.address, weiValue).send.request({from: accounts[0]}, callBack));
            batch.add(Mushroom.methods.stake(weiValue).send.request({from: accounts[0]}, callBack));
            */

            await Rome.methods.approve(Mushroom.options.address, weiValue).send({from: accounts[0]});
            await Mushroom.methods.stake(weiValue).send({from: accounts[0]});



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

            this.props.UpdateWaitingOnContract(false);

            this.props.Update();

        } catch (err) {
            console.log("ERROR IN SENDING TO CHAIN " + err);
            this.props.UpdateWaitingOnContract(false);
        }


    }

    /*
    Dynamically render the button to have different text on it when the contract is waiting for transactions to come back

    this function returns a div, which allows it to be passed as a component, and for me to type in words without a string
    could maybe do the same thing without div and passing a literal string, then dealing with string in render,
    but this way seems to look a feel cleaner
     */
    ButtonText() {
        if (this.props.waitingOnContract) {
            return <div>Waiting on Transactions.............</div>;
        }
        return <div>Invest Tokens</div>;
    }


    render() {
        /*
        Anything that needs to happen every rerender need to get called here before the return!!!
         */
        return(
            <div>
                <Card style={{
                    backgroundColor: '#fd00ff'
                }}>


                    <h4 style={{ color: 'Black', fluid: false }}>Invest USDC</h4 >
                    {/*
                     Form that updates a value in order for the chain call function to know how much
                     to put into the invest function of the contract when its called later on the button press

                     uses an event because the event will contain what value the text box's contents just changed to
                     I think it makes it faster or something. Could maybe do it with just using the value of
                     the text box input and throwing it into onchange without the event?
                     Maybe the only way to get the value out is with event? Maybe just fancy pants programmer code
                     back from jordan in ecocap that doesnt need to be that complex?

                    */}
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
                    {/*
                     Button that calls function to send invest transactions to chain
                    */}
                    <button id={'setLocation'} className={'btn btn-md btn-success'} disabled={this.props.waitingOnContract} style={{color:'black'}} onClick={this.invest}>
                        <span>{this.ButtonText()}</span>
                    </button>

                </Card>
            </div>
        )
    }
};
export default Invest;
