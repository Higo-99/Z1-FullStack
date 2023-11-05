import { useEffect, useState } from "react";
import '.././ProductNew&EditForm.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from "react-router-dom";
import ProductEditInfors from "./ProductEditInfors";
import ProductEditImages from "./ProductEditImages";
import { fragranceList } from "../ProductSelectOptions";
import { useGetProductImagesQuery } from '../productImageApiSlice';

const ProductEditForm = ({ product, savedImages }) => {
    const [inforErrContent, setInforErrContent] = useState('');
    const [isSaveInforSuccess, setIsSaveInforSuccess] = useState(false);
    const [isInfors, setIsInfors] = useState(true);

    const [imageErrContent, setImageErrContent] = useState('');
    const [isSaveImagesSuccess, setIsSaveImagesSuccess] = useState(false);
    const [isImages, setIsImages] = useState(true);

    const [clickSave, setClickSave] = useState(false);

    const [code, setCode] = useState(product.code);
    const productFrags = product.fragrance;
    const filterFrags = fragranceList.filter(frag => productFrags.includes(frag.value));
    const addCommas = num => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    const oldFormatPrice = addCommas(JSON.stringify(product.price));
    const oldFormatPrevPrice = addCommas(JSON.stringify(product.prevPrice));

    // const { images } = useGetProductImagesQuery('images', {
    //     selectFromResult: ({ data }) => ({
    //         images: data
    //     })
    // });

    // let savedImages;

    // if (images) {
    //     const { ids, entities } = images;
    //     const filteredIds = ids.filter(id => entities[id].code === product.code);
    //     savedImages = filteredIds.map(idImg => entities[idImg]);
    // };

    const canSave = isImages && isInfors;
    const onSaveProduct = () => {
        setClickSave(true);
    };

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
                                clickSave={clickSave} setClickSave={setClickSave}
                                setInforErrContent={setInforErrContent}
                                setIsSaveInforSuccess={setIsSaveInforSuccess}
                                isImages={isImages}
                                setIsInfors={setIsInfors}
                            />
                        </div>

                        <div className="imgsInputCard">
                            <ProductEditImages
                                savedImages={savedImages}
                                code={code}
                                clickSave={clickSave} setClickSave={setClickSave}
                                setImageErrContent={setImageErrContent}
                                setIsSaveImagesSuccess={setIsSaveImagesSuccess}
                                isInfors={isInfors}
                                setIsImages={setIsImages}
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
