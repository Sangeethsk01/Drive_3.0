import './App.css';
import { useEffect, useState } from "react";
import Upload from "./artifacts/contracts/Upload.sol/Upload.json";
import { ethers } from "ethers";
import FileUpload from "./components/FileUpload";
import Display from "./components/Display";
import Modal from "./components/Modal";


function App() {
  const [account, setAccount] = useState('');
  
  const [contract, setContract] = useState(null);
  const [provider, setProvider] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const connectWallet = async () => {
      // Check if MetaMask is installed
      if (typeof window.ethereum === 'undefined') {
        alert("Please install MetaMask!");
        return; // Exit if MetaMask is not installed
      }

      // Create a new provider
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      setProvider(provider);

      try {
        // Request account access
        await provider.send("eth_requestAccounts", []);

        window.ethereum.on("accountsChanged", ()=>{
          window.location.reload();
        });

        const signer = provider.getSigner();
        const address = await signer.getAddress(); 
        console.log("Connected account:", address);
        setAccount(address);

        

        const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
        const contract = new ethers.Contract(contractAddress, Upload.abi, signer);
        console.log("Contract instance:", contract);
        setContract(contract);
      } catch (error) {
        // Enhanced error handling
        console.error("Error connecting to wallet:", error);
        alert(`Error connecting to MetaMask: ${error.message || JSON.stringify(error, null, 2)}`);
      }
    };

    connectWallet(); // Call the function to connect the wallet
  }, []);

  console.log(provider);

  return (
    <>
    <div className="App">
    {!modalOpen && (<button className='share' onClick={()=>{setModalOpen(true)}}>Share</button>)}
    {modalOpen && (<Modal setModalOpen={setModalOpen} contract={contract}></Modal>)}
      {/* You can implement your UI components here */}
      <h1>Welcome to the Drive 3.0</h1>
      <p>Connected Account: { 
  account ? (
    <>
      {account} 
      <button 
        className='copyAddr' 
        onClick={() => { navigator.clipboard.writeText(account); }}>
        Copy
      </button>
    </>
  ) : (
    <span>Not connected</span>
  ) 
}
 </p> 
      {contract && <p>Contract Loaded Successfully!</p>}
      <FileUpload account={account}
        contract={contract}></FileUpload>
      <Display account={account} contract={contract}></Display>
    </div>
    </>
  );
}

export default App;
