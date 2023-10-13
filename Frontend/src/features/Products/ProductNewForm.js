import { useEffect, useRef, useState } from "react";
import './ProductNewForm.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { useAddNewProductMutation } from "./productApiSlice";
import { useNavigate } from "react-router-dom";

const ProductNewForm = () => {
    const [label, setLabel] = useState('');
    const [code, setCode] = useState('');
    const [volume, setVolume] = useState('');
    const [stock, setStock] = useState('');
    const [price, setPrice] = useState();
    const [formatPrice, setFormatPrice] = useState();
    const [prevPrice, setPrevPrice] = useState();
    const [formatPrevPrice, setFormatPrevPrice] = useState();
    const [type, setType] = useState('');

    const [fragrance, setFragrance] = useState([]);

    const [description, setdescription] = useState('');
    const [images, setImages] = useState([]);
    const [preImages, setPreImages] = useState([]);
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef();

    const addCommas = num => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    const removeNonNumeric = num => num.toString().replace(/[^0-9]/g, "");

    const onChangeVolume = (e) => {
        setVolume(addCommas(removeNonNumeric(e.target.value)))
    }
    const onChangePrice = (e) => {
        setFormatPrice(addCommas(removeNonNumeric(e.target.value)));
    };
    useEffect(() => {
        if (formatPrice) {
            const number = formatPrice.replace(/,/g, '');
            setPrice(parseInt(number));
        }
    }, [formatPrice]);

    const onChangePrevPrice = (e) => {
        setFormatPrevPrice(addCommas(removeNonNumeric(e.target.value)));
    };
    useEffect(() => {
        if (formatPrevPrice) {
            const number = formatPrevPrice.replace(/,/g, '');
            setPrevPrice(parseInt(number));
        }
    }, [formatPrevPrice]);

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

    const [addNewProduct, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useAddNewProductMutation();

    const onSaveProduct = async () => {
        if (!isLoading) {
            // await addNewProduct({
            //     images, label, code, price, prevPrice
            // })
            console.log(images, label, code, volume, price, prevPrice)
        }
    };

    const navigate = useNavigate();

    useEffect(() => {
        if (isSuccess) {
            navigate('/productsManage')
        }
    }, [isSuccess]);

    const errClass = (isError) ? "errmsg" : "offscreen";
    const errContent = (error?.data?.message) ?? '';

    const content = (
        <div className="productFormBackground">
            <p className={errClass}>{errContent}</p>
            <div className="productFormContent">
                <form className="productForm" action="" onSubmit={(e) => e.preventDefault()}>
                    <div className="productFormHeader">
                        <FontAwesomeIcon className="PFHicon" icon={faCirclePlus} />
                        <p className="PFHcontent">ADD NEW PRODUCT</p>
                    </div>

                    <div className="mainProductForm">
                        <div className="top">
                            <div className="label Product">
                                <label htmlFor="labelProduct">Label</label>
                                <input type="text" id="labelProduct"
                                    value={label} onChange={(e) => setLabel(e.target.value)} />
                            </div>

                            <div className="smallTopProduct">
                                <div className="code Product">
                                    <label htmlFor="codeProduct">Code</label>
                                    <input type="text" id="codeProduct"
                                        value={code} onChange={(e) => setCode(e.target.value)} />
                                </div>
                                <div className="stock Product">
                                    <label htmlFor="stockProduct">Stock</label>
                                    <input type="number" id="stockProduct"
                                        value={stock} onChange={(e) => setStock(e.target.value)} />
                                </div>
                            </div>

                            <div className="smallTopProduct">
                                <div className="formatPrice Product">
                                    <label htmlFor="formatPrice Product">Price</label>
                                    <input type="text" id="formatPrice Product"
                                        value={formatPrice} onChange={onChangePrice} />
                                </div>
                                <div className="formatPrevPrice Product">
                                    <label htmlFor="formatPrevPrice Product">PrevPrice</label>
                                    <input type="text" id="formatPrevPrice Product"
                                        value={formatPrevPrice} onChange={onChangePrevPrice} />
                                </div>
                            </div>

                            <div className="smallTopProduct">
                                <div className="type Product">
                                    <label htmlFor="typeProduct">Type</label>
                                    <select id="typeProduct" name="typeProduct" className="selectTypeProduct"
                                        value={type} onChange={(e) => setType(e.target.value)}
                                    >
                                        <option value="Nam">Nam</option>
                                        <option value="Nu">Nữ</option>
                                        <option value="Unisex">Unisex</option>
                                        <option value="Xe-Hoi">Xe Hơi</option>
                                        <option value="Tre-Em">Trẻ Em</option>
                                    </select>
                                </div>
                                <div className="volume Product">
                                    <label htmlFor="volumeProduct">Volume</label>
                                    <input type="text" id="volumeProduct"
                                        value={volume} onChange={onChangeVolume} />
                                </div>
                            </div>
                            <div className="fragrance Product">
                                <label htmlFor="fragranceProduct">Fragrance</label>
                                <select name="fragranceProduct" id="fragranceProduct">
                                    OPTIONS
                                </select>
                            </div>
                            <div className="description Product">
                                <label htmlFor="descriptionProduct">Description</label>
                                <input type="text" name="descriptionProduct" id="descriptionProduct" />
                            </div>

                        </div>
                        <div className="imgsInputCard">
                            <p>Images uploading</p>
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
                        </div>
                    </div>

                    <div className="productFormBtn">
                        <button className="AddNewBtn" onClick={onSaveProduct}>
                            Add New
                        </button>
                    </div>
                </form>

            </div>
        </div>


    );

    return content;
}

export default ProductNewForm
