import { useEffect, useState } from "react";
import '.././ProductNew&EditForm.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from "react-router-dom";
import ProductNewInfo from "./ProductNewInfors";
import ProductNewImage from "./ProductNewImages";

const ProductNewForm = () => {
    const [clickSave, setClickSave] = useState(false);

    const [code, setCode] = useState('');
    const [inforErrContent, setInforErrContent] = useState('');
    const [isSaveInforSuccess, setIsSaveInforSuccess] = useState(false);

    const [imageErrContent, setImageErrContent] = useState('');
    const [isSaveImagesSuccess, setIsSaveImagesSuccess] = useState(false);

    const onSaveProduct = () => {
        setClickSave(true);
    };

    const navigate = useNavigate();

    useEffect(() => {
        if (isSaveInforSuccess & isSaveImagesSuccess) {
            navigate('/productsManage')
        }
    }, [isSaveInforSuccess, navigate]);

    const content = (
        <div className="productFormBackground">
            <p className={inforErrContent ? "errmsg" : "offscreen"}>{inforErrContent}</p>
            <p className={imageErrContent ? "errmsg" : "offscreen"}>{imageErrContent}</p>
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
                                setInforErrContent={setInforErrContent}
                                setIsSaveInforSuccess={setIsSaveInforSuccess}
                            />
                        </div>

                        <div className="imgsInputCard">
                            <ProductNewImage
                                code={code}
                                clickSave={clickSave} setClickSave={setClickSave}
                                setImageErrContent={setImageErrContent}
                                setIsSaveImagesSuccess={setIsSaveImagesSuccess}
                            />
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
};

export default ProductNewForm
