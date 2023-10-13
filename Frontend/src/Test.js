// import './Test.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState, useRef } from 'react';

const Test = () => {
    const [introduce, setIntroduce] = useState('');
    const [style, setStyle] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = () => {
        console.log(description)
    };

    const introduceRef = useRef();
    useEffect(() => {
        introduceRef.current.style.height = introduceRef.current.scrollHeight + 'px';
        setDescription({
            introduce: introduce,
            style: style
        });
    }, [introduce, style]);

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
                            <p>Images uploading</p>

                        </div>
                    </div>

                    <div className="productFormBtn">
                        <button className="AddNewBtn" onClick={handleSubmit}>
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