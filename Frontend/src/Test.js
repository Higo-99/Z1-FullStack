// import './Test.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { fragranceList } from './ProductSelectOptions';
import { useState } from 'react';

const Test = () => {
    // const [selectedFrag, setSelectedFrag] = useState(fragranceList[0]);
    const [fragrance, setFragrance] = useState();

    const [isOpen, setIsOpen] = useState(false);

    const selectFragrance = (fragranceOption) => {
        if (fragranceOption !== fragrance) {
            setFragrance(fragranceOption)
        }
    };

    const isSelected = (fragranceOption) => {
        return fragranceOption === fragrance;
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
                                    onClick={() => setIsOpen(!isOpen)} onBlur={() => setIsOpen(false)}
                                >
                                    <span className='fragranceValue'>{fragrance?.label}</span>
                                    <div className="fragranceClearBTN"
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            setFragrance(undefined)
                                        }}
                                    >
                                        <FontAwesomeIcon icon={faXmark} />
                                    </div>
                                    <div className="fragranceDivider"></div>
                                    <div className={`fragranceCaret ${isOpen ? 'active' : ''}`}
                                        onClick={() => setIsOpen(!isOpen)}
                                    ></div>
                                    <ul className={`fragranceList ${isOpen ? 'active' : ''}`}>
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