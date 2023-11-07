import { useEffect, useState } from "react";
import '.././ProductNew&EditForm.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from "react-router-dom";
import ProductEditInfors from "./ProductEditInfors";
import ProductEditImages from "./ProductEditImages";
import { fragranceList } from "../ProductSelectOptions";
import HashLoader from 'react-spinners/HashLoader';

const ProductEditForm = ({ product, savedImages }) => {
    const [isInfors, setIsInfors] = useState(true);
    const [isInforsSaving, setIsInforsSaving] = useState(false);
    const [inforErrContent, setInforErrContent] = useState('');
    const [isSaveInforSuccess, setIsSaveInforSuccess] = useState(false);

    const [isImages, setIsImages] = useState(true);
    const [imageErrContent, setImageErrContent] = useState('');
    const [isImagesSaving, setIsImagesSaving] = useState(false);
    const [updateImageErrContent, setUpdateImageErrContent] = useState('');
    const [isSaveImagesSuccess, setIsSaveImagesSuccess] = useState(false);

    const [clickSave, setClickSave] = useState(false);

    const [code, setCode] = useState(product.code);
    const productFrags = product.fragrance;
    const filterFrags = fragranceList.filter(frag => productFrags.includes(frag.value));
    const addCommas = num => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    const oldFormatPrice = addCommas(JSON.stringify(product.price));
    const oldFormatPrevPrice = addCommas(JSON.stringify(product.prevPrice));

    const canSave = isImages && isInfors;
    const onSaveProduct = () => {
        setClickSave(true);
    };

    const loading = isImagesSaving || isInforsSaving;

    const navigate = useNavigate();

    const successAll = isSaveInforSuccess && isSaveImagesSuccess;

    useEffect(() => {
        if (successAll) {
            navigate('/productsManage')
        }
    }, [successAll, navigate]);

    const content = (
        <div className="productFormBackground">
            <p className={inforErrContent ? "errmsg" : "offscreen"}>{inforErrContent}</p>
            <p className={imageErrContent ? "errmsg" : "offscreen"}>{imageErrContent}</p>
            <p className={updateImageErrContent ? "errmsg" : "offscreen"}>{updateImageErrContent}</p>

            <div className={`loadingOverplay ${loading ? 'active' : 'offscreen'}`}>
                <div className="loadingContent">
                    <HashLoader color='#8eecff' loading={loading} />
                </div>
            </div>

            <div className="productFormContent">
                <div className="productForm" action="" >
                    <div className="productFormHeader">
                        <FontAwesomeIcon className="PFHicon" icon={faCirclePlus} />
                        <p className="PFHcontent">ADD NEW PRODUCT</p>
                    </div>

                    <div className="mainProductForm">
                        <div className="top">
                            <ProductEditInfors
                                product={product}
                                filterFrags={filterFrags}
                                oldFormatPrice={oldFormatPrice}
                                oldFormatPrevPrice={oldFormatPrevPrice}
                                code={code} setCode={setCode}
                                setIsInfors={setIsInfors}
                                isImages={isImages}
                                clickSave={clickSave} setClickSave={setClickSave}
                                setIsInforsSaving={setIsInforsSaving}
                                setInforErrContent={setInforErrContent}
                                setIsSaveInforSuccess={setIsSaveInforSuccess}
                            />
                        </div>

                        <div className="imgsInputCard">
                            <ProductEditImages
                                code={code}
                                clickSave={clickSave}
                                savedImages={savedImages}
                                setIsImages={setIsImages}
                                isInfors={isInfors}
                                isSaveInforSuccess={isSaveInforSuccess}
                                setIsImagesSaving={setIsImagesSaving}
                                setImageErrContent={setImageErrContent}
                                setUpdateImageErrContent={setUpdateImageErrContent}
                                setIsSaveImagesSuccess={setIsSaveImagesSuccess}
                            />
                        </div>
                    </div>

                    <div className="productFormBtn">
                        <button className="AddNewBtn" onClick={onSaveProduct} disabled={!canSave}>
                            Save Edit
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );

    return content;
};

export default ProductEditForm
