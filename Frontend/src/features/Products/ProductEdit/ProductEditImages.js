import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { useAddNewProductImageMutation } from "../productImageApiSlice";

const ProductNewImage = ({
    code,
    clickSave, setClickSave,
    setImageErrContent,
    setIsSaveImagesSuccess,
    isInfors,
    setIsImages
}) => {
    const [images, setimages] = useState([]);
    const [preimages, setPreimages] = useState([]);

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
            if (!preimages.some(img => img.name === files[i].name)) {
                setPreimages(theImg => [
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
                setimages(theBI => [...theBI, { imgBinary }]);
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
            if (!preimages.some(e => e.name === files[i].name)) { // check if there are any old imgs with the same name
                setPreimages(theImg => [
                    ...theImg, {
                        name: files[i].name,
                        url: URL.createObjectURL(files[i])
                    }]
                );
                const convertImg = await convertToBase64(files[i]);
                const imgBinary = {
                    code: code,
                    name: files[i].name,
                    data: convertImg
                };
                setimages(theBinaryImg => [...theBinaryImg, imgBinary]);
            }
        };
    };

    useEffect(() => {
        if (images.length) { // and check if there are old imgs? ========================
            setIsImages(true)
        } else {
            setIsImages(false)
        }
    }, [images, setIsImages]);

    const deleteImage = (theImg) => {
        if (theImg.url) {
            setPreimages(preimages.filter(e => e.url !== theImg.url));
            URL.revokeObjectURL(theImg.url);
        };
        setimages(images.filter(e => e.name !== theImg.name));
    };

    const [addNewImage, {
        isLoading,
        isSuccess,
        error
    }] = useAddNewProductImageMutation();

    const canSave = isInfors && !isLoading;

    // const onSaveImgs = async (e) => {
    //     if (canSave) {
    //         for (let i = 0; i < images.length; i++) {
    //             await addNewImage({ code, name: images[i].name, stand: i, data: images[i].data })
    //         }
    //     }
    // };

    useEffect(() => {
        if (clickSave) {
            const onSaveImgs = async (e) => {
                if (canSave) {
                    for (let i = 0; i < images.length; i++) {
                        await addNewImage({ code, name: images[i].name, stand: i, data: images[i].data })
                    }
                }
            };
            onSaveImgs();
            setClickSave(false);
        }
    }, [addNewImage, canSave, code, images, setClickSave, clickSave]);

    useEffect(() => {
        if (error) { setImageErrContent(error?.data?.message) }
    }, [error, setImageErrContent]);

    useEffect(() => {
        if (isSuccess) {
            setIsSaveImagesSuccess(true)
        }
    }, [isSuccess, setIsSaveImagesSuccess]);

    const content = (
        <div className="">
            <p>Images</p>
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
                {preimages && preimages.map((theImg, index) => (
                    <div className="image" key={theImg.name}>
                        <span className="delete" onClick={() => deleteImage(theImg)}>
                            <div className="imgsDelIcon">
                                <FontAwesomeIcon icon={faXmark} />
                            </div>
                        </span>
                        <img src={theImg.url} alt={theImg.name} />
                    </div>
                ))}

            </div>
        </div>
    );

    return content;
};

export default ProductNewImage;