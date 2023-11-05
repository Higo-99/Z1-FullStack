import useTitle from '../hooks/useTitle';
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from "react-router-dom";
import ProductNewInfors from "./MiniTest1";

const Test = () => {
    useTitle('Testing Z1-App');

    const [clickSave, setClickSave] = useState(false);

    const [code, setCode] = useState('');
    const [inforErrContent, setInforErrContent] = useState('');
    const [isSaveInforSuccess, setIsSaveInforSuccess] = useState(false);
    const [isInfors, setIsInfors] = useState(false);

    const [imageErrContent, setImageErrContent] = useState('');
    const [isSaveImagesSuccess, setIsSaveImagesSuccess] = useState(false);
    const [isImages, setIsImages] = useState(false);

    const canSave = isInfors
    //  && isImages;
    const onSaveProduct = () => {
        setClickSave(true);
    };

    const navigate = useNavigate();

    const successAll = isSaveInforSuccess;
    // && isSaveImagesSuccess;
    console.log(isSaveInforSuccess);
    useEffect(() => {
        if (successAll) {
            navigate('/productsManage')
        }
    }, [successAll, navigate]);

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
                            <ProductNewInfors
                                code={code} setCode={setCode}
                                clickSave={clickSave} setClickSave={setClickSave}
                                setInforErrContent={setInforErrContent}
                                setIsSaveInforSuccess={setIsSaveInforSuccess}
                                isImages={isImages}
                                setIsInfors={setIsInfors}
                            />
                        </div>
                    </div>

                    <div className="productFormBtn">
                        <button className="AddNewBtn" onClick={onSaveProduct}
                            disabled={!canSave}
                        >
                            Add New
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );

    return content;
};

export default Test
