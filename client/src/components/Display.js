
import { useState } from "react";
import "./Display.css";

const Display = ({contract, account}) => {
   const [data,setData] = useState([]);
     const getData = async ()=>{
        let dataArray=[];
        let otherAddress = true;
        try{
          let addressInput = document.querySelector(".address");
          let address = addressInput.value;
          if(!address){
            address = account;
            otherAddress = false;
          } 
          dataArray = await contract.display(address);
        }catch(error){
          alert(error.reason);
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
       } else{
          !otherAddress && alert("Nothing to display");
       }
    }

  return (
    <div>
      <div className="input-address">
      <input type='text'
        placeholder='Enter Address'
        className='address'></input>  
       <button className='center button' onClick={getData}>
            Get Data
            </button>
      <button className='button clear' onClick={()=>{setData("");
      document.querySelector(".address").value = "";
      }}>
            Clear
      </button>
      </div>
      <div className='image-list'>{data}
      </div>
      
    </div>
  )
}

export default Display
