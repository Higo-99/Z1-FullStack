import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { useAddNewProductImageMutation } from "../productImageApiSlice";

const ProductNewImage = ({
    code,
    clickSave,
    isSaveInforSuccess,
    setImageErrContent,
    setIsSaveImagesSuccess,
    isInfors,
    setIsImages
}) => {
    const [images, setImages] = useState([]);
    const [preimages, setPreimages] = useState([]);

    const [isDragging, setIsDragging] = useState(false);

    const fileInputRef = useRef();
    const selectFiles = () => {
        fileInputRef.current.click();
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
                setImages(theBinaryImg => [...theBinaryImg, files[i]]);
                // setImages(files[i]);
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
                setImages(theBinaryImg => [...theBinaryImg, files[i]]);
            }
        };
    };

    const deleteImage = (theImg) => {
        if (theImg.url) {
            setPreimages(preimages.filter(e => e.url !== theImg.url));
            URL.revokeObjectURL(theImg.url);
        };
        setImages(images.filter(e => e.name !== theImg.name));
    };

    const [addNewImage, {
        isLoading,
        isSuccess,
        error
    }] = useAddNewProductImageMutation();

    // const canSave = isInfors && !isLoading;
    const canSave = !isLoading;

    useEffect(() => {
        if (images.length) {
            setIsImages(true)
        }
        else {
            setIsImages(false)
        }
    }, [images.length, setIsImages]);

    const onSaveImgs = async () => {
        if (canSave) {
            // for (let i = 0; i < images.length; i++) {
            //     const formData = new FormData();
            //     const formImg = formData.append(images[i].name, images[i]);
            //     // console.log(images[i])
            //     await addNewImage(formImg);
            // }
            const myFiles = document.getElementById('file').files

            const formData = new FormData()

            Object.keys(myFiles).forEach(key => {
                formData.append(myFiles.item(key).name, myFiles.item(key))
            })

            await addNewImage(formData);
        }
    };

    // useEffect(() => {
    //     if (clickSave && isSaveInforSuccess) {
    //         onSaveImgs();
    //     }
    // }, [clickSave, isSaveInforSuccess, onSaveImgs]);

    useEffect(() => {
        if (clickSave) {
            onSaveImgs();
            // console.log('img');
        }
    }, [clickSave, onSaveImgs]);

    useEffect(() => {
        if (error) { setImageErrContent(error?.data?.message) }
    }, [error, setImageErrContent]);

    useEffect(() => {
        if (isSuccess) {
            setIsSaveImagesSuccess(true)
        }
    }, [isSuccess, setIsSaveImagesSuccess]);

    const content = (
        <form className="" onSubmit={e => e.preventDefault()}>
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
        </form>
    );

    return content;
};

export default ProductNewImage;