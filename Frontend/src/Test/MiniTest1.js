import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { useAddNewProductImageMutation, useUpdateProductImageMutation } from "../productImageApiSlice";

const ProductNewImage = ({
    code,
    clickSave,
    savedImages,
    setIsImages,
    isInfors,
    isSaveInforSuccess,
    setIsImagesSaving,
    setImageErrContent,
    setUpdateImageErrContent,
    setIsSaveImagesSuccess,
}) => {
    const [images, setimages] = useState([]);
    const [preimages, setPreimages] = useState([]);

    const [isDragging, setIsDragging] = useState(false);

    const base64ToBlob = (base64Data) => {
        const parts = base64Data.split(',');
        const type = parts[0].match(/:(.*?);/)[1];
        const byteCharacters = atob(parts[1]);
        const byteNumbers = new Uint8Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        };

        return new Blob([byteNumbers], { type: type });
    };

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
            if (!preimages.some(e => e.name === files[i].name)) {
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
        if (images.length) {
            setIsImages(true)
        }
        if (savedImages) {
            if (savedImages.length) {
                setIsImages(true)
            }
            else {
                setIsImages(false)
            }
        }
        else {
            setIsImages(false)
        }
    }, [images, savedImages, setIsImages]);

    const deletePreImage = (theImg) => {
        if (theImg.url) {
            setPreimages(preimages.filter(e => e.url !== theImg.url));
            URL.revokeObjectURL(theImg.url);
        };
        setimages(images.filter(e => e.name !== theImg.name));
    };

    const [addNewImage, {
        isLoading: addNewLoading,
        isSuccess: addNewSuccess,
        error: addnewError
    }] = useAddNewProductImageMutation();

    const [updateImgages, {
        isLoading: updateLoading,
        isSuccess: updateSuccess,
        error: updateError
    }] = useUpdateProductImageMutation();

    const canSave = isInfors && !addNewLoading;
    const canUpdate = isInfors && !updateLoading;

    useEffect(() => {
        if (clickSave && isSaveInforSuccess) {
            const onUpdateImg = async () => {
                if (canUpdate) {
                    if (savedImages) {
                        for (let i = 0; i < savedImages.length; i++) {
                            console.log(savedImages[i].id)
                        }
                    }
                }
            };
            onUpdateImg();
        }
    }, [addNewImage, canUpdate, code, images, savedImages, clickSave, isSaveInforSuccess]);


    useEffect(() => {
        if (addNewLoading || updateLoading) {
            setIsImagesSaving(true)
        };
    }, [addNewLoading, updateLoading, setIsImagesSaving]);

    useEffect(() => {
        if (addnewError) { setImageErrContent(addnewError?.data?.message) };
        if (updateError) { setUpdateImageErrContent(updateError?.data?.message) };
    }, [addnewError, updateError, setImageErrContent, setUpdateImageErrContent]);

    useEffect(() => {
        if (images.length) {
            if (addNewSuccess && updateSuccess) {
                setIsSaveImagesSuccess(true)
            }
        };
        if (updateSuccess) {
            setIsSaveImagesSuccess(true)
        };
    }, [images.length, addNewSuccess, updateSuccess, setIsSaveImagesSuccess]);

    const content = (
        <div className="">
            <p>Images</p>
            <div className="InProductImg">
                <p>Saved Images</p>
                <div className="imgsContainer">
                    {savedImages && savedImages.map((theImg, index) => (
                        <div className="image" key={theImg.name}>
                            <span className="delete"
                            // onClick={() => deletePreImage(theImg)}
                            >
                                <div className="imgsDelIcon">
                                    <FontAwesomeIcon icon={faXmark} />
                                </div>
                            </span>
                            <img src={URL.createObjectURL(base64ToBlob(theImg.data))} alt={theImg.name} />
                        </div>
                    ))}
                </div>
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
                <p className={preimages.length ? "''" : "offscreen"}>New Images:</p>
                <div className="imgsContainer">
                    {preimages && preimages.map((theImg, index) => (
                        <div className="image" key={theImg.name}>
                            <span className="delete" onClick={() => deletePreImage(theImg)}>
                                <div className="imgsDelIcon">
                                    <FontAwesomeIcon icon={faXmark} />
                                </div>
                            </span>
                            <img src={theImg.url} alt={theImg.name} />
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );

    return content;
};

export default ProductNewImage;