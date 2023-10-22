import { useEffect, useState } from "react";
import '.././ProductNew&EditForm.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from "react-router-dom";
import ProductNewInfo from "./ProductNewInfo";
import ProductNewImage from "./ProductNewImage";

const ProductNewForm = () => {
    const [clickSave, setClickSave] = useState(false);

    const [code, setCode] = useState('');
    const [inforErrContent, setinforErrContent] = useState('');
    const [isSaveInforSuccess, setIsSaveInforSuccess] = useState(false);

    // const [images, setImages] = useState('');
    // const [imagesSelect, setImagesSelect] = useState([]);
    // const [preImagesSelect, setPreImagesSelect] = useState([]);
    // const [isDragging, setIsDragging] = useState(false);

    // const fileInputRef = useRef();
    // const selectFiles = () => {
    //     fileInputRef.current.click();
    // };
    // const convertToBase64 = (file) => {
    //     return new Promise((resolve, reject) => {
    //         const fileReader = new FileReader();
    //         fileReader.readAsDataURL(file);
    //         fileReader.onload = () => {
    //             resolve(fileReader.result)
    //         };
    //         fileReader.onerror = (error) => {
    //             reject(error)
    //         };
    //     })
    // };

    // const onFileSelect = async (e) => {
    //     const files = e.target.files;
    //     if (files.length === 0) return;
    //     for (let i = 0; i < files.length; i++) {
    //         if (!preImagesSelect.some(e => e.name === files[i].name)) {
    //             setPreImagesSelect(theImg => [
    //                 ...theImg, {
    //                     name: files[i].name,
    //                     url: URL.createObjectURL(files[i])
    //                 }]
    //             );
    //             const convertImg = await convertToBase64(files[i]);
    //             setImagesSelect(theBI => [
    //                 ...theBI, {
    //                     name: files[i].name,
    //                     data: convertImg
    //                 }]
    //             );
    //         }
    //     };
    // };

    // const onDragOver = (e) => {
    //     e.preventDefault();
    //     setIsDragging(true);
    //     e.dataTransfer.dropEffect = 'copy';
    // };

    // const onDragLeave = (e) => {
    //     e.preventDefault();
    //     setIsDragging(false);
    // };

    // const onDrop = async (e) => {
    //     e.preventDefault();
    //     setIsDragging(false);
    //     const files = e.dataTransfer.files;
    //     for (let i = 0; i < files.length; i++) {
    //         if (!preImagesSelect.some(e => e.name === files[i].name)) {
    //             setPreImagesSelect(theImg => [
    //                 ...theImg, {
    //                     name: files[i].name,
    //                     url: URL.createObjectURL(files[i])
    //                 }]
    //             );
    //             const convertImg = await convertToBase64(files[i]);
    //             const imgOb = JSON.stringify({
    //                 name: files[i].name,
    //                 data: convertImg
    //             });
    //             setImagesSelect(theBinaryImg => [
    //                 ...theBinaryImg, imgOb]
    //             );
    //         }
    //     };
    // };

    // const deleteImage = (theImg) => {
    //     if (theImg.url) {
    //         setPreImagesSelect(preImagesSelect.filter(e => e.url !== theImg.url));
    //         URL.revokeObjectURL(theImg.url);
    //     };
    //     setImagesSelect(imagesSelect.filter(e => e.name !== theImg.name));
    // };

    // useEffect(() => {
    //     setImages(JSON.stringify(imagesSelect))
    // }, [imagesSelect]);

    const onSaveProduct = () => {
        setClickSave(true);
    };

    const navigate = useNavigate();

    useEffect(() => {
        if (isSaveInforSuccess) {
            navigate('/productsManage')
        }
    }, [isSaveInforSuccess, navigate]);

    const content = (
        <div className="productFormBackground">
            <p className={inforErrContent ? "errmsg" : "offscreen"}>{inforErrContent}</p>
            <div className="productFormContent">
                <div className="productForm" action="" >
                    <div className="productFormHeader">
                        <FontAwesomeIcon className="PFHicon" icon={faCirclePlus} />
                        <p className="PFHcontent">ADD NEW PRODUCT</p>
                    </div>

                    <div className="mainProductForm">
                        <div className="top">
                            <ProductNewInfo
                                code={code} setCode={setCode}
                                clickSave={clickSave} setClickSave={setClickSave}
                                setinforErrContent={setinforErrContent}
                                setIsSaveInforSuccess={setIsSaveInforSuccess}
                            />
                        </div>

                        <div className="imgsInputCard">
                            <ProductNewImage />
                            {/* <p>ImagesSelect uploading</p>
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
                                {preImagesSelect && preImagesSelect.map((theImg, index) => (
                                    <div className="image" key={theImg.name}>
                                        <span className="delete" onClick={() => deleteImage(theImg)}>
                                            <div className="imgsDelIcon">
                                                <FontAwesomeIcon icon={faXmark} />
                                            </div>
                                        </span>
                                        <img src={theImg.url} alt="" />
                                    </div>
                                ))}
                            </div> */}
                        </div>
                    </div>

                    <div className="productFormBtn">
                        <button className="AddNewBtn" onClick={onSaveProduct}>
                            Add New
                        </button>
                    </div>
                </div>

            </div>
        </div>


    );

    return content;
}

export default ProductNewForm
