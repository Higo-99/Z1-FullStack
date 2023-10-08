import { useEffect, useRef, useState } from "react";
// import './Test.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

const Test = () => {
    const [images, setImages] = useState([]);
    const [preImages, setPreImages] = useState([]);
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef();

    const selectFiles = () => {
        fileInputRef.current.click();
    };

    const convertToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = () => {
                resolve(fileReader.result)
            };
            fileReader.onerror = (error) => {
                reject(error)
            };
        })
    };

    const onFileSelect = async (e) => {
        const files = e.target.files;
        if (files.length === 0) return;
        for (let i = 0; i < files.length; i++) {
            if (!preImages.some(e => e.name === files[i].name)) {
                setPreImages(theImg => [
                    ...theImg, {
                        name: files[i].name,
                        url: URL.createObjectURL(files[i])
                    }]
                );
                const convertImg = await convertToBase64(files[i]);
                setImages(theBI => [
                    ...theBI, {
                        name: files[i].name,
                        data: convertImg
                    }]
                );
            }
        };
    };

    const deletePreImage = (theImg) => {
        if (theImg.url) {
            setPreImages(preImages.filter(e => e.url !== theImg.url));
            URL.revokeObjectURL(theImg.url);
        };
        setImages(images.filter(e => e.name !== theImg.name));
    };

    const onDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
        e.dataTransfer.dropEffect = 'copy';
    };

    const onDragLeave = (e) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const onDrop = async (e) => {
        e.preventDefault();
        setIsDragging(false);
        const files = e.dataTransfer.files;
        for (let i = 0; i < files.length; i++) {
            if (!preImages.some(e => e.name === files[i].name)) {
                setPreImages(theImg => [
                    ...theImg, {
                        name: files[i].name,
                        url: URL.createObjectURL(files[i])
                    }]
                );
                const convertImg = await convertToBase64(files[i]);
                setImages(theBI => [...theBI, convertImg])
            }
        };
    };

    const content = (
        <div className="imgsInputCard">
            <div className="top">
                <p>TEST Drag & Drop img uploading</p>
            </div>
            <div className="drag-area"
                onDragOver={onDragOver} onDragLeave={onDragLeave} onDrop={onDrop}
            >
                {isDragging ? (<span className="select">
                    Drop img here
                </span>) : (<div className="">
                    Drag & Drop here or {''}
                    <span className="select" onClick={selectFiles}>
                        Browse
                    </span>
                </div>)}

                <input type="file" name="file" id="file" className="file"
                    multiple ref={fileInputRef} onChange={onFileSelect} />
            </div>

            <div className="imgsContainer">
                {preImages && preImages.map((theImg, index) => (
                    <div className="image" key={theImg.name}>
                        <span className="delete" onClick={() => deletePreImage(theImg)}>
                            <div className="imgsDelIcon">
                                <FontAwesomeIcon icon={faXmark} />
                            </div>
                        </span>
                        <img src={theImg.url} alt="" />
                    </div>
                ))}
            </div>
            <button type="button">
                Upload
            </button>
        </div>
    );

    return content;
}

export default Test