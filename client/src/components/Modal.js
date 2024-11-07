import React, { useEffect, useRef, useState } from 'react';
import './Modal.css';

const Modal = ({ setModalOpen, contract }) => {
  const addressInputRef = useRef(null);
  const displayListRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const shareAccess = async () => {
    try {
      const address = addressInputRef.current.value;
      if (!address) {
        alert("Please enter an address");
        return;
      }
      await contract.allow(address);
      setModalOpen(false);
      alert("Access granted");
    } catch (error) {
      console.error("Error granting access:", error);
      alert("Failed to grant access");
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

        addressList.forEach(([addr,isAllowed]) => {
          console.log(isAllowed);
          if(isAllowed){  // Check is the account has access
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
                alert("Removed access");
             }catch(error){
                        console.log(error);
                        alert("Failed to remove");
             }
          };
          

          listItem.appendChild(removeBtn);
          displayList.appendChild(listItem); 
        }
        });
      } catch (error) {
        console.error("Error fetching access list:", error);
        alert("Failed to fetch access list");
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
        <label htmlFor="displayList">People with access:</label>
          <ul id="displayList" ref={displayListRef}></ul>
        {loading && <p>Loading access list...</p>}
      </div>
      
    </div>
  );
};

export default Modal;
