import React, { Component } from "react";
import ExtensionWarning from "./component/shared/extensionWarning";
import "./App.css";
import tokenAbi from "./WeenusTokenABI";
import Web3 from "web3";

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      metamaskAddOn: false,
      accountLogin: false,
      hostError: false,
      ethBalance: '',
      tokenBalance: '',
      contractAddress: "0x101848D5C5bBca18E6b4431eEdF6B95E9ADF82FA",
      tokenAbi: tokenAbi,
      sendingAmount: "",
      toAddress: "",

    }
  }


  componentDidMount() {
    console.log(window.ethereum);

    setInterval(() => {

      if (window.web3 !== undefined) {
        this.setState({
          metamaskAddOn: false
        })
        if (window.web3 && window.ethereum.selectedAddress) {
          this.setState({
            accountLogin: true,
            fromAddress: window.ethereum.selectedAddress
          })
          this.getBalance();

        } else {
          this.setState({
            accountLogin: false

          })
        }
      } else {
        this.setState({
          metamaskAddOn: true,
        })
      }

      this.getTokenBalance();
    }, 2000)

  }


  // login metamask pop up
  connectMetamask = async () => {
    if (window.web3) {
      await window.ethereum.enable();
    }
  }


  // get eth balance
  getBalance = () => {
    window.web3.eth.getBalance(this.state.fromAddress, (err, balance) => {
      let ethBalance = window.web3.fromWei(balance, "ether") + " ETH";
      this.setState({ ethBalance })
    });
  }


  // get token Balance 
  getTokenBalance = async () => {
    if (window.web3) {
      let web3 = new Web3(window.web3.currentProvider);
      let contract = new web3.eth.Contract(this.state.tokenAbi, this.state.contractAddress);
      let tokenBalance = await contract.methods.balanceOf(this.state.fromAddress).call();
      this.setState({
        tokenBalance
      })
    }
  }



  // token transfer 

  transferToken = async () => {

    try {
      if (window.web3 && window.ethereum.selectedAddress) {
        let web3 = new Web3(window.web3.currentProvider);
        let contract = new web3.eth.Contract(this.state.tokenAbi, this.state.contractAddress);
        let result = await contract.methods.transfer(this.state.toAddress, (1000000000000000000 * this.state.sendingAmount).toString()).send({
          from: this.state.fromAddress
        }).then((res) => {
          console.log(res);
        })

      }
    } catch (err) {
      console.log(err)
    }
  }


  render() {
    return (
      <>
        {this.state.metamaskAddOn ? <ExtensionWarning /> : ''}

        <header>
          <h2>Weenes</h2>
          {!this.state.accountLogin ? <button onClick={this.connectMetamask}>Connect to Metamask</button> : this.state.fromAddress ? <span className="connected">Connected</span> : ''}
        </header>


        <div className="balaceContainer">
          <h2 className="text-white">ETH Balance</h2>
          <h3 className="text-white">{this.state.ethBalance}</h3>
        </div>

        <div className="balaceContainer">
          <h2 className="text-white">Token Balance</h2>
          <h3 className="text-white">{this.state.tokenBalance}</h3>
        </div>

        <div className="tokenTransfer">
          <label htmlFor="amount">Enter Amount</label>
          <input type="text" id="amount" onChange={(e) => this.setState({ sendingAmount: e.target.value })} />

          <label htmlFor="reciverAddress">Receiver Address</label>
          <input type="text" id="reciverAddress" onChange={(e) => this.setState({ toAddress: e.target.value })} />

          <button type="button" onClick={this.transferToken}>Transfer</button>
        </div>
      </>
    )
  }
}

