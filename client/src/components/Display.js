
import { useState } from "react";
import "./Display.css";

const Display = ({contract, account, triggerAlert}) => {
   const [data,setData] = useState([]);
     const getMyData = async ()=>{
        let dataArray=[];
        try{
          
          dataArray = await contract.display(account);
          
        }catch(error){
          triggerAlert(error.reason);
        } 
       const isEmpty = dataArray.length === 0;
      console.log(dataArray);
       if(!isEmpty){
        const images = dataArray.map((item,i)=>{
          return(
            <a href={item} key={i} target="_blank" rel="noopener noreferrer">
            <img src={item} alt="img" width={100} height={100} className="image" />
            </a>
          )
        })
        setData(images);
       } else{
          triggerAlert("Nothing to display");
       }
    }

    const getData = async ()=>{
      let dataArray=[];
      let accountAccessed  =false;
      try{
        let addressInput = document.querySelector(".address-input");
        let address = addressInput.value;
        if(!address){
          triggerAlert("Please enter an address");
        } else{
        dataArray = await contract.display(address);
        accountAccessed = true;
        }
      }catch(error){
        triggerAlert(error.reason);
        accountAccessed = false;
      } 
     const isEmpty = dataArray.length === 0;

     if(!isEmpty){
      const images = dataArray.map((item,i)=>{
        return(
          <a href={item} key={i} target="_blank" rel="noopener noreferrer">
          <img src={item} alt="img" width={100} height={100} className="image" />
          </a>
        )
      })
      setData(images);
      console.log(data);
     } else{
       accountAccessed && triggerAlert("Nothing to display");
     }
  }


  return (
    <div className="container">


<div className="input-buttons">
<p className="bold-txt">Click here to show your data:</p> <button className="center button" onClick={getMyData}>
      Get My Data
    </button>
    <button
      className="button clear"
      onClick={() => {
        setData("");
        document.querySelector(".address-input").value = "";
      }}
    >
      Clear
    </button>
  </div>
  
  <div className="otherDataAccess">
  <p>To access the data of a different account, enter the account address below.</p> <p> (Make sure you have the permission to access this account.)</p>
    
    <input type="text" className="address-input"></input> <button className="address-btn" onClick={getData}>Get Data</button>
    </div>
  

   <div className="image-list"> Images ({data.length}):
    <div className="images">{data}</div></div> 
</div>

  )
}

export default Display
