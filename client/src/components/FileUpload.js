    import './FileUpload.css';
    import {useState} from "react";
    import axios from "axios";
    import "./Display.css";

    const FileUpload = ({contract,account,triggerAlert}) => {
        const [file,setFile] = useState(null);
        const [fileName, setFileName] = useState(null);

        const handleSubmit = async(event) => {
            event.preventDefault();
            if(file){
                const uploadButton = document.getElementById("uploadBtn");
                uploadButton.style.backgroundColor = "rgb(0, 100, 0)";
                try{
                    const formData = new FormData();
                    formData.append("file",file);

                    const resFile = await axios({
                        method: "post",
                        url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
                        data: formData,
                        headers: {
                            pinata_api_key: `9e9af3c21e06b36d477e`,
                            pinata_secret_api_key: `541b8903b401bce0eaafea52475bcc544c97828e852d4c171fbeb9f7c6cb8fb7`,
                            "Content-Type": "multipart/form-data",
                        },
                    });

                    
                    const ImgHash = `https://gateway.pinata.cloud/ipfs/${resFile.data.IpfsHash}`;                 console.log(ImgHash);

                    
                    await contract.add(account,ImgHash);
                    

                    triggerAlert("Image uploaded successfully");
                    setFileName("no Image selected");
                    setFile(null);
                }catch(error){
                    triggerAlert(error.message || JSON.stringify(error, null, 2));
                }
                uploadButton.style.backgroundColor = "#3dcb1d";
            }
        }

        const retriveFile = (event)=>{
            const data = event.target.files[0];
            const reader = new window.FileReader();
            reader.readAsArrayBuffer(data);
            reader.onload = () =>{
                setFile(event.target.files[0])
            }
            setFileName(event.target.files[0].name);
            event.preventDefault();
            console.log(event.target.files[0].name);
        }


    return (
        <div className='top'>
            <form className='form' onSubmit={handleSubmit}>
                <p>Choose an image for uploading.</p>
                <label htmlFor='file-upload' className='choose-button'>Choose image</label>
                <input type='file' id='file-upload' name='data' className='file-input'
                onChange={retriveFile} disabled={!account}></input>
                <span className='textArea'>
                    Image: {fileName ? fileName : <span>No image selected</span>}
                </span>
                <button type='submit' className='upload' id='uploadBtn' disabled={!file}> 
                    Upload File
                </button>
            </form>

        </div>
    )
    }

    export default FileUpload;
