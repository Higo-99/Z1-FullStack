import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

const ProductNewImage = () => {
    const [images, setImages] = useState('');
    const [imagesSelect, setImagesSelect] = useState([]);
    const [preImagesSelect, setPreImagesSelect] = useState([]);
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
            if (!preImagesSelect.some(e => e.name === files[i].name)) {
                setPreImagesSelect(theImg => [
                    ...theImg, {
                        name: files[i].name,
                        url: URL.createObjectURL(files[i])
                    }]
                );
                const convertImg = await convertToBase64(files[i]);
                setImagesSelect(theBI => [
                    ...theBI, {
                        name: files[i].name,
                        data: convertImg
                    }]
                );
            }
        };
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
            if (!preImagesSelect.some(e => e.name === files[i].name)) {
                setPreImagesSelect(theImg => [
                    ...theImg, {
                        name: files[i].name,
                        url: URL.createObjectURL(files[i])
                    }]
                );
                const convertImg = await convertToBase64(files[i]);
                const imgBinary = {
                    name: files[i].name,
                    data: convertImg
                };
                setImagesSelect(theBinaryImg => [
                    ...theBinaryImg, imgBinary]
                );

            }
        };
    };

    imagesSelect && imagesSelect.map((theImg, index) => (
        console.log(theImg.data)
    ))

    const deleteImage = (theImg) => {
        if (theImg.url) {
            setPreImagesSelect(preImagesSelect.filter(e => e.url !== theImg.url));
            URL.revokeObjectURL(theImg.url);
        };
        setImagesSelect(imagesSelect.filter(e => e.name !== theImg.name));
    };

    // useEffect(() => {
    //     setImages(JSON.stringify(imagesSelect))
    // }, [imagesSelect]);

    const content = (
        <div className="">
            <p>ImagesSelect uploading</p>
            <div className="drag-area"
                onDragOver={onDragOver} onDragLeave={onDragLeave} onDrop={onDrop}
            >
                <div className="innerD-D-area">
                    {isDragging ? (<span className="imgsSelect">
                        Drop img here
                    </span>) : (<div className="">
                        Drag & Drop here or {''}
                        <span className="imgsSelect" onClick={selectFiles}>
                            Browse
                        </span>
                    </div>)}
                </div>
                <input type="file" name="file" id="file" className="file"
                    multiple ref={fileInputRef} onChange={onFileSelect} />
            </div>

            <div className="imgsContainer">
                {/* {preImagesSelect && preImagesSelect.map((theImg, index) => (
                    <div className="image" key={theImg.name}>
                        <span className="delete" onClick={() => deleteImage(theImg)}>
                            <div className="imgsDelIcon">
                                <FontAwesomeIcon icon={faXmark} />
                            </div>
                        </span>
                        <img src={theImg.url} alt="" />
                    </div>
                ))} */}
                {imagesSelect && imagesSelect.map((theImg, index) => (
                    <div className="image" key={theImg.name}>
                        <span className="delete" onClick={() => deleteImage(theImg)}>
                            <div className="imgsDelIcon">
                                <FontAwesomeIcon icon={faXmark} />
                            </div>
                        </span>
                        <img src={theImg.data} alt="" />
                    </div>
                ))}

            </div>
        </div>
    );

    return content;
};

export default ProductNewImage;