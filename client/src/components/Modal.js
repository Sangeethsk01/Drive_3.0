import React, { useEffect, useRef, useState } from 'react';
import './Modal.css';

const Modal = ({ setModalOpen, contract,triggerAlert }) => {
  const addressInputRef = useRef(null);
  const displayListRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [accessListSize, setAccessListSize] = useState(0);
  const [alertMessage,setAlertMessage] = useState("");

  const shareAccess = async () => {
    try {
      const address = addressInputRef.current.value;
      if (!address) {
        setAlertMessage("Please enter an address");
        return;
      }
    
      await contract.allow(address);
      addressInputRef.current.value = '';
      setAlertMessage("Access granted. Refresh to see changes");
    } catch (error) {
      console.error("Error granting access:", error);
      setAlertMessage("Failed to grant access");
    }
  };

 


  useEffect(() => {
    const accessList = async () => {
      if (!contract) return;
      setLoading(true);

      try {
       
        const addressList = await contract.shareAccess();
        
        console.log(addressList);
        const displayList = displayListRef.current;
        displayList.innerHTML = ""; // Clear previous options
        let count = 0;
        addressList.forEach(([addr,isAllowed]) => {
          if(isAllowed){  // Check if the account has access
          count++;
          const listItem = document.createElement("li");
          listItem.className = "listItem"; 


          const addressSpan = document.createElement("span");
          addressSpan.textContent = addr;
          addressSpan.className = "otherAddress";
          listItem.appendChild(addressSpan);
          
          const removeBtn = document.createElement("button");
          removeBtn.textContent = "remove";
          removeBtn.className = "remove-access-btn";
          removeBtn.onclick = async (event)=>{
            const button = event.target;
            const addressSpan = button.previousElementSibling;
           const removeAddr = addressSpan.textContent;
             try {
               
                await contract.disallow(removeAddr);
                
                setAlertMessage("Removed access (Refresh the page to see changes)");
             }catch(error){
                        console.log(error);
                        setAlertMessage("Failed to remove");
             }
          };
          

          listItem.appendChild(removeBtn);
          displayList.appendChild(listItem); 
        }
        });
        setAccessListSize(count);
      } catch (error) {
        console.error("Error fetching access list:", error);
        setAlertMessage("Failed to fetch access list");
      } finally {
        setLoading(false);
      }
    };

    accessList();
  }, [contract]);

  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="title">Share with</div>
        <div className="body">
          <input
            type="text"
            ref={addressInputRef}
            className="address"
            placeholder="Enter Address"
          />
        </div>
        <div className="footer">
          <button id="cancelBtn" onClick={() => setModalOpen(false)}>
            Cancel
          </button>
          <button onClick={shareAccess}>Share</button>
        </div>
        <div className='alertMessage'>{alertMessage}</div>
        <label htmlFor="displayList">People with access ({accessListSize}):</label>
          <ul id="displayList" ref={displayListRef}></ul>
        {loading && <p>Loading access list...</p>}
      </div>
      
    </div>
  );
};

export default Modal;
