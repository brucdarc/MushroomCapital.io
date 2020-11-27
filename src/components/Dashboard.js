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



    async updateDash(){
        var accounts;
        await web3.eth.getAccounts().then(function(acc){ accounts = acc })
        
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


        this.setState({TotalMush:total_mush, UserMush: user_mush, TotalUsdc: total_usdc, UserUsdc: user_usdc, EstimatedUsdcValue: est_value });
    }

/*
<pre style={{ color: 'white', margin: 0, 'text-shadow': '0px 0px 2px #35FFEC' }}>{'' +
                'Total MUSH Supply:      ${Total_Mush} MUSH\n' +
                'Your MUSH Holdings:     ${this.state.UserMush} MUSH'}
 */

    render() {
        var Total_Mush = <pre style={{ color: 'white', margin: 0, 'text-shadow': '0px 0px 2px #35FFEC' }}>Total MUSH Supply                             {this.state.TotalMush} MUSH</pre>
        var User_Mush = <pre style={{ color: 'white', margin: 0, 'text-shadow': '0px 0px 2px #35FFEC' }}>Your MUSH Holdings                            {this.state.UserMush} MUSH</pre>
        var Total_Usdc = <pre style={{ color: 'white', margin: 0, 'text-shadow': '0px 0px 2px #35FFEC' }}>Total USDC Holdings of this Contract          {this.state.TotalUsdc} USDC</pre>
        var User_Usdc = <pre style={{ color: 'white', margin: 0, 'text-shadow': '0px 0px 2px #35FFEC' }}>Your USDC Holdings (outside this project)     {this.state.UserUsdc} USDC</pre>
        var Est_Value = <pre style={{ color: 'white', margin: 0, 'text-shadow': '0px 0px 2px #35FFEC' }}>Estimated Value of all Mushroom Assets        {this.state.EstimatedUsdcValue} USD </pre>


        return(
            <div>
                <h2>
                    {Total_Mush}
                    {Total_Usdc}
                    {Est_Value}
                    <br/><br/>
                    {User_Mush}
                    {User_Usdc}
                </h2>
            </div>
        )
    }
};
export default Dashboard;
