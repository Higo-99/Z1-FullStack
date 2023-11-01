import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { useAddNewProductMutation } from "../productInforApiSlice";
import { fragranceList } from '../ProductSelectOptions';

const ProductNewInfo = ({
    code, setCode,
    clickSave, setClickSave,
    setInforErrContent,
    setIsSaveInforSuccess,
    isImages,
    setIsInfors
}) => {
    const [label, setLabel] = useState('');
    const [volume, setVolume] = useState('');
    const [stock, setStock] = useState('');
    const [price, setPrice] = useState();
    const [formatPrice, setFormatPrice] = useState();
    const [prevPrice, setPrevPrice] = useState();
    const [formatPrevPrice, setFormatPrevPrice] = useState();
    const [type, setType] = useState('Nam');
    const [fragrance, setFragrance] = useState([]);
    const [fragranceSelect, setFragranceSelect] = useState([]);
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
    const productFragRef = useRef();
    useEffect(() => {
        let handler = (e) => {
            if (!productFragRef.current.contains(e.target)) {
                setIsFragSelectOpen(false)
            };
        };
        document.addEventListener('mousedown', handler);

        return () => {
            document.removeEventListener('mousedown', handler);
        }
    });

    const selectFragrance = (fragranceOption) => {
        if (fragranceSelect.includes(fragranceOption)) {
            setFragranceSelect(fragranceSelect.filter(op => op !== fragranceOption))
            setFragrance(fragrance.filter(op => op !== fragranceOption.value))
        }
        else {
            setFragranceSelect([...fragranceSelect, fragranceOption])
            setFragrance([...fragrance, fragranceOption.value])
        }
    };

    const isSelected = (fragranceOption) => {
        return fragranceSelect.includes(fragranceOption);
    };

    const introduceRef = useRef();
    useEffect(() => {
        introduceRef.current.style.height = introduceRef.current.scrollHeight + 'px';
    }, [introduce]);

    const [addNewProductInfors, {
        isLoading,
        isSuccess,
        error
    }] = useAddNewProductMutation();

    const canSave = !isLoading && isImages;

    const onSaveInfors = async (e) => {
        if (canSave) {
            await addNewProductInfors({ label, code, stock, price, prevPrice, type, volume, fragrance, introduce, style })
        }
    };

    const allInfors = [label, code, price].every(Boolean);
    useEffect(() => {
        if (allInfors) {
            setIsInfors(true)
        } else {
            setIsInfors(false)
        }
    }, [allInfors]);

    useEffect(() => {
        if (clickSave) {
            onSaveInfors();
            setClickSave(false);
        };

    }, [clickSave, setClickSave]);

    useEffect(() => {
        if (isSuccess) {
            setIsSaveInforSuccess(true)
        }
    }, [isSuccess, setIsSaveInforSuccess]);

    useEffect(() => {
        if (error) {
            setInforErrContent(error?.data?.message)
        };
    }, [error, setInforErrContent]);

    const content = (
        <div className="">
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

            <div className="fragrance Product" ref={productFragRef}>
                <label htmlFor="fragranceProduct">Fragrance</label>

                <div
                    tabIndex={0} className="fragranceSelect" id="fragranceProduct"
                    onClick={() => setIsFragSelectOpen(!isFragSelectOpen)}
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
                            setFragrance([])
                        }}
                    >
                        <FontAwesomeIcon icon={faXmark} />
                    </div>
                    <div className="fragranceDivider"></div>
                    <div className={`fragranceCaret ${isFragSelectOpen ? 'active' : ''}`}
                        onClick={() => setIsFragSelectOpen(!isFragSelectOpen)}
                    ></div>
                    <div className={`fragrancedropdown ${isFragSelectOpen ? 'active' : ''}`}>
                        <ul className={`fragranceList active`}>
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
    )
    return content;

};

export default ProductNewInfo;