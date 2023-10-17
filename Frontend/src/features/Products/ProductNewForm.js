import { useEffect, useRef, useState } from "react";
import './ProductNewForm.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { useAddNewProductMutation } from "./productApiSlice";
import { useNavigate } from "react-router-dom";
import { fragranceList } from './ProductSelectOptions';

const ProductNewForm = () => {
    const [label, setLabel] = useState('');
    const [code, setCode] = useState('');
    const [volume, setVolume] = useState('');
    const [stock, setStock] = useState('');
    const [price, setPrice] = useState();
    const [formatPrice, setFormatPrice] = useState();
    const [prevPrice, setPrevPrice] = useState();
    const [formatPrevPrice, setFormatPrevPrice] = useState();
    const [type, setType] = useState('Nam');
    const [fragrance, setFragrance] = useState('');
    const [fragranceSelect, setFragranceSelect] = useState([]);
    const [description, setDescription] = useState('');
    const [images, setImages] = useState('');
    const [imagesSelect, setImagesSelect] = useState([]);
    const [preImagesSelect, setPreImagesSelect] = useState([]);
    const [isDragging, setIsDragging] = useState(false);

    const [introduce, setIntroduce] = useState('');
    const [style, setStyle] = useState('');

    const addCommas = num => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    const removeNonNumeric = num => num.toString().replace(/[^0-9]/g, "");

    const onChangeVolume = (e) => {
        setVolume(addCommas(removeNonNumeric(e.target.value)))
    };

    const onChangePrice = (e) => {
        setFormatPrice(addCommas(removeNonNumeric(e.target.value)));
    };
    const onChangePrevPrice = (e) => {
        setFormatPrevPrice(addCommas(removeNonNumeric(e.target.value)));
    };
    useEffect(() => {
        if (formatPrice) {
            const number = formatPrice.replace(/,/g, '');
            setPrice(parseInt(number));
        };
        if (formatPrevPrice) {
            const number = formatPrevPrice.replace(/,/g, '');
            setPrevPrice(parseInt(number));
        };
    }, [formatPrice, formatPrevPrice]);

    const [isFragSelectOpen, setIsFragSelectOpen] = useState(false);

    const selectFragrance = (fragranceOption) => {
        if (fragranceSelect.includes(fragranceOption)) {
            setFragranceSelect(fragranceSelect.filter(op => op !== fragranceOption))
        }
        else {
            setFragranceSelect([...fragranceSelect, fragranceOption])
        }
    };

    const isSelected = (fragranceOption) => {
        return fragranceSelect.includes(fragranceOption);
    };

    useEffect(() => {
        setFragrance(JSON.stringify(fragranceSelect));
    }, [fragranceSelect])

    const introduceRef = useRef();
    useEffect(() => {
        introduceRef.current.style.height = introduceRef.current.scrollHeight + 'px';
        setDescription(JSON.stringify({
            introduce: introduce,
            style: style
        }));
    }, [introduce, style]);

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
                const imgOb = JSON.stringify({
                    name: files[i].name,
                    data: convertImg
                });
                setImagesSelect(theBinaryImg => [
                    ...theBinaryImg, imgOb]
                );
            }
        };
    };

    const deleteImage = (theImg) => {
        if (theImg.url) {
            setPreImagesSelect(preImagesSelect.filter(e => e.url !== theImg.url));
            URL.revokeObjectURL(theImg.url);
        };
        setImagesSelect(imagesSelect.filter(e => e.name !== theImg.name));
    };

    useEffect(() => {
        setImages(JSON.stringify(imagesSelect))
    }, [imagesSelect]);

    const [addNewProduct, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useAddNewProductMutation();

    const onSaveProduct = async (e) => {
        e.preventDefault();
        if (!isLoading) {
            await addNewProduct({ label, code, stock, price, prevPrice, type, volume, fragrance, description })
        }
    };

    const navigate = useNavigate();

    useEffect(() => {
        if (isSuccess) {
            navigate('/productsManage')
        }
    }, [isSuccess, navigate]);

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
                                        value={stock} onChange={(e) => setStock(parseInt(e.target.value))} />
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

                                <div
                                    tabIndex={0} className="fragranceSelect" id="fragranceProduct"
                                    onClick={() => setIsFragSelectOpen(!isFragSelectOpen)}
                                    onBlur={() => setIsFragSelectOpen(false)}
                                >
                                    <span className='fragranceValue'>
                                        {fragranceSelect.map(frag => (
                                            <button key={frag.value} className="option-badge"
                                                onClick={e => {
                                                    e.stopPropagation()
                                                    selectFragrance(frag)
                                                }}
                                            >
                                                {frag.label}
                                                <span className='remove-btn'>
                                                    <FontAwesomeIcon icon={faXmark} />
                                                </span>
                                            </button>
                                        ))}
                                    </span>
                                    <div className="fragranceClearBTN"
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            setFragranceSelect([])
                                        }}
                                    >
                                        <FontAwesomeIcon icon={faXmark} />
                                    </div>
                                    <div className="fragranceDivider"></div>
                                    <div className={`fragranceCaret ${isFragSelectOpen ? 'active' : ''}`}
                                        onClick={() => setIsFragSelectOpen(!isFragSelectOpen)}
                                    ></div>
                                    <ul className={`fragranceList ${isFragSelectOpen ? 'active' : ''}`}>
                                        {fragranceList.map(fragranceOption => (
                                            <li key={fragranceOption.value}
                                                className={`fragranceOption ${isSelected(fragranceOption) ? 'selected' : ''}`}
                                                onClick={e => {
                                                    e.stopPropagation()
                                                    selectFragrance(fragranceOption)
                                                }}
                                            >
                                                {fragranceOption.label}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            <div className="description Product">
                                <label htmlFor="descriptionProduct">Description</label>
                                <div className="descriptionProductContent">
                                    <label htmlFor="introduce">Introduce</label>
                                    <textarea name="introduce" id="introduce"
                                        ref={introduceRef} className='ProductIntroduce'
                                        value={introduce} onChange={(e) => setIntroduce(e.target.value)} />
                                    <label htmlFor="style">Style</label>
                                    <input type="text" name="style" id="style" className='ProductStyle'
                                        value={style} onChange={(e) => setStyle(e.target.value)} />
                                </div>
                            </div>

                        </div>
                        <div className="imgsInputCard">
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
