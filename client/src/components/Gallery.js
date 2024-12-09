import React, { useState } from "react";
import "./Gallery.css";
import m1 from "./demo photos/m1.png";
import m2 from "./demo photos/m2.png";
import u1 from "./demo photos/u1.png";
import u2 from "./demo photos/u2.png";
import u3 from "./demo photos/u3.png";
import u4 from "./demo photos/u4.png";
import u5 from "./demo photos/u5.png";
import d1 from "./demo photos/d1.png";
import a1 from "./demo photos/a1.png";
import a2 from "./demo photos/a2.png";
import a3 from "./demo photos/a3.png";
import a4 from "./demo photos/a4.png";
import da1 from "./demo photos/da1.png";
import da2 from "./demo photos/da2.png";
import rem1 from "./demo photos/rem1.png";
import rem2 from "./demo photos/rem2.png";
import rem3 from "./demo photos/rem3.png";


const Gallery = () => {
  const images = [
    {
      url: m1,
      description: "Step-1: Intall the metamask wallet extension in your browser",
    },
    {
        url: m2,
        description: "Step-2: Set up your account using security phrases and connect to the Ethereum mainnet network.",
    },
    {
        url: u1,
        description: "Step-3: Click on the choose image button to select an image.",
      },

      {
        url: u2,
        description: "Step-4: In the window, select your image and click open.",
      },
    
      {
        url: u3,
        description: "Step-5: Once you see the image name on the screen, click upload file.",
    },
    {
        url: u4,
        description: "Step-6: Metamask asks you to confirm a transaction. Select Confirm.",
    },
    {
        url: u5,
        description: "Step-7: You will see a message that image successfully uploaded.",
    },
    {
        url: d1,
        description: "Step-8: Click on the 'get my data' button' to display the images uploaded by you.",
    },
    {
        url: a1,
        description: "Step-9: To allow someone access to your data, click on the share button on the top left corner.",
    },
    {
        url: a2,
        description: "Step-10: Enter the address of the user to whom you want to share access and click on the share button.",
    },
    {
        url: a3,
        description: "Step-11: Click on confirm option in the metamask alert box.",
    },
    {
        url: a4,
        description: "Step-12: Refresh the page to see the account in the people with access list.",
    },
    {
        url: da1,
        description: "Step-13: To view the data of a user, enter that user's account address in the input field at the bottom.",
    },
    {
        url: da2,
        description: "Step-14: Click on the get data button to view this account's data.",
    },
    {
        url: rem1,
        description: "Step-15: To disallow a person's access, click on the remove button next to the account's number in the access list",
    },
    {
        url: rem2,
        description: "Step-16: Confirm the transaction again to complete this.",
    },
    {
        url: rem3,
        description: "Step-17: Refresh the page to see the account removed from the access list",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => 
      (prevIndex - 1 + images.length) % images.length
    );
  };

  return (
    <div className="gallery-container">
      <button className="nav-button left" onClick={handlePrevious}>
        &lt;
      </button>
      <div className="image-container">
        <img 
          src={images[currentIndex].url} 
          alt={images[currentIndex].description} 
          className="gallery-image" 
        />
        <p className="image-description">{images[currentIndex].description}</p>
      </div>
      <button className="nav-button right" onClick={handleNext}>
        &gt;
      </button>
    </div>
  );
};

export default Gallery;
