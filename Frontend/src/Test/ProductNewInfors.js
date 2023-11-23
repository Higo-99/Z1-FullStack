import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { fragranceList } from './ProductSelectOptions';

const ProductNewInfo = ({
    code, setCode,

}) => {

    const content = (
        <div className="">
            <div className="smallTopProduct">
                <div className="code Product">
                    <label htmlFor="codeProduct">Code</label>
                    <input type="text" id="codeProduct"
                        value={code} onChange={(e) => setCode(e.target.value)} />
                </div>

            </div>
        </div>
    )
    return content;

};

export default ProductNewInfo;