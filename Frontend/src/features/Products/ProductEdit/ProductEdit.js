import { useParams } from 'react-router-dom';
import useTitle from '../../../hooks/useTitle'
import { useGetProductsQuery } from '../productInforApiSlice';
import HashLoader from 'react-spinners/HashLoader';
import ProductEditForm from "./ProductEditForm";
import { useGetProductImagesQuery } from '../productImageApiSlice';

const ProductEdit = () => {
    useTitle('Z1_App Edit product');
    const { id } = useParams();

    const { product } = useGetProductsQuery('product', {
        selectFromResult: ({ data }) => ({
            product: data?.entities[id]
        })
    });

    const { images } = useGetProductImagesQuery('images', {
        selectFromResult: ({ data }) => ({
            images: data
        })
    });

    let savedImages;

    if (images) {
        const { ids, entities } = images;
        const filteredIds = ids.filter(id => entities[id].code === product.code);
        savedImages = filteredIds.map(idImg => entities[idImg]);
    };

    if (!product) {
        return (
            <div className={`loadingOverplay active`}>
                <div className="loadingContent">
                    <HashLoader color='#8eecff' />
                </div>
            </div>
        )
    };

    return (<ProductEditForm product={product} savedImages={savedImages} />);
};

export default ProductEdit;