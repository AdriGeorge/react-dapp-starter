import React, { Component } from "react";
import CalculatorContract from "./contracts/Calculator.json";
import getWeb3 from "./getWeb3";

import "./App.css";


class App extends Component {
  state = { x: 0, y: 0, result: 0, web3: null, accounts: null, contract: null };
  componentDidMount = async () => {
    try {
      
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = CalculatorContract.networks[networkId];
      const instance = new web3.eth.Contract(
        CalculatorContract.abi,
        deployedNetwork && deployedNetwork.address,
      );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, contract: instance }, this.runExample);
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };
  

  runExample = async () => {
    const { accounts, contract } = this.state;
    
    // Add 1+1
    const r = await contract.methods.plus(1,1).call({ from:accounts[0] });
   
  };

  runSum = async () => {
    const {x, y, contract, accounts} = this.state;

    const r = await contract.methods.plus(x,y).call({ from:accounts[0] });
   
    this.setState({ result: r});
  };

  handleSubmit = (e) => {
    console.log("handle -> result", this.state.result)
    e.preventDefault();
    console.log("handle")
    this.runSum();
  }

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <section className="section-center">
        <form className="input-number" onSubmit={this.handleSubmit}>
          <label htmlFor="first">First</label>
          <input 
            type="number" 
            id="first"
            name="first"
            placeholder="0"
            value={this.state.x} 
            onChange={(e) => this.setState({ x: e.target.value })} />
          <label htmlFor="second">Second</label>
          <input 
            type="number" 
            id="second"
            name="second"
            placeholder="0" 
            value={this.state.y} 
            onChange={(e) => this.setState({ y: e.target.value })} />
          <input type="submit" value="Submit" className="btn"></input>
        </form>
        <div className="result">
          {this.state.result}
        </div>
      </section>
    );
  }
}

export default App;
