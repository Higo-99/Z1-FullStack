// import './Test.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { fragranceList } from './features/Products/ProductSelectOptions';
import { useState } from 'react';

const Test = () => {
    const [fragrance, setFragrance] = useState([]);

    const [isFragSelectOpen, setIsFragSelectOpen] = useState(false);

    const selectFragrance = (fragranceOption) => {
        if (fragrance.includes(fragranceOption)) {
            setFragrance(fragrance.filter(op => op !== fragranceOption))
        }
        else {
            setFragrance([...fragrance, fragranceOption])
        }
    };

    const isSelected = (fragranceOption) => {
        return fragrance.includes(fragranceOption);
    };

    const content = (
        <div className="productFormBackground">
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
                                <input type="text" id="labelProduct" />
                            </div>


                            <div className="fragrance Product">
                                <label htmlFor="fragranceProduct">Fragrance</label>

                                <div
                                    tabIndex={0} className="fragranceSelect" id="fragranceProduct"
                                    onClick={() => setIsFragSelectOpen(!isFragSelectOpen)} onBlur={() => setIsFragSelectOpen(false)}
                                >
                                    <span className='fragranceValue'>
                                        {fragrance.map(frag => (
                                            <button key={frag.value} className="option-badge"
                                                onClick={e => {
                                                    e.stopPropagation()
                                                    selectFragrance(frag)
                                                }}
                                            >
                                                {frag.label}
                                                <span className='remove-btn'><FontAwesomeIcon icon={faXmark} /></span>
                                            </button>
                                        ))}
                                    </span>
                                    <div className="fragranceClearBTN"
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            setFragrance([])
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
                                <input type="text" name="descriptionProduct" id="descriptionProduct" />
                            </div>

                        </div>
                        <div className="imgsInputCard">
                            <p>Images uploading</p>

                        </div>
                    </div>

                    <div className="productFormBtn">
                        <button className="AddNewBtn" >
                            Add New
                        </button>
                    </div>
                </form>

            </div>
        </div>


    );

    return content;
}

export default Test