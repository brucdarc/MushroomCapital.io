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
import {React, Text} from "react";
import Dashboard from "./components/Dashboard";






function App() {
  return (
    <div className="App" style={{
        backgroundImage: "url(" + "https://images8.alphacoders.com/600/600182.jpg" + ")",
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat'
    }}>
      <header className="App-header" style={{
          backgroundColor: 'transparent'
      }}>
          <h1 style={{ color: 'white', margin: 0, 'text-shadow': '0px 0px 2px #35FFEC' }}>
              Welcome to Mushroom Capital
          </h1>
          <br/><br/><br/><br/><br/>
          <Dashboard/>
      </header>
        <Container>

            <Row>
                <Col sm>
                    <Invest/>
                </Col>
                <Col sm>
                    <Liquidate/>
                </Col>
            </Row>
        </Container>
        <header className="App-header" style={{
            backgroundColor: 'transparent'
        }}>
            <h3 style={{ color: 'EBEBEB', margin: 0, 'text-shadow': '0px 0px 2px #35FFEC'   }}>
                All initial investments are subject to up to a 1 month holding period to account for slippage.
            </h3>
            <h3 style={{ color: 'EBEBEB', margin: 0, 'text-shadow': '0px 0px 2px #35FFEC'   }}>
                Prices may fluctuate, and Mushroom Capital is not responsible for temporary or permanent loss of funds.
            </h3>
        </header>
    </div>
  );
}

export default App;
