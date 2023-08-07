import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import { ethers } from "ethers";

let provider;
if (window.ethereum == null) {

    // If MetaMask is not installed, we use the default provider,
    // which is backed by a variety of third-party services (such
    // as INFURA). They do not have private keys installed so are
    // only have read-only access
    console.log("MetaMask not installed; using read-only defaults")
    provider = ethers.getDefaultProvider()

} else {

    // Connect to the MetaMask EIP-1193 object. This is a standard
    // protocol that allows Ethers access to make all read-only
    // requests through MetaMask.
    provider = new ethers.BrowserProvider(window.ethereum)
}

function App() {
  const [walletAddr, setWalletAddr] = useState("");
  const [balance, setBalance] = useState("");

  const handleConnect = async () => {
    const accounts = await provider.send("eth_requestAccounts", []);
    const balance = await provider.getBalance(accounts[0])
    setWalletAddr(accounts[0]);
    setBalance(ethers.formatEther(balance))
    // console.log(accounts);
  }

  const formatAddr = (addr) => {
    return addr.slice(0,6) + "..." + addr.slice(-4)
  }
  return (
    <div className="App">
      <header className="App-header">
        
        { walletAddr? 
          (<div>{balance}ETH {formatAddr(walletAddr)}</div>):
          (<button onClick={handleConnect}>Connect Wallet</button>)
        }
        
      </header>
    </div>
  );
}

export default App;
