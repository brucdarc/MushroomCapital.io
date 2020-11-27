
import Web3 from 'web3';

const web3 = new Web3(window.ethereum)
if(typeof window.ethereum !== 'undefined') {
    window.ethereum.enable().catch(error => {
        // User denied account access
        console.log(error)
    })
}

export default web3;