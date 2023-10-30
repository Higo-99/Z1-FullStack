import { useParams } from 'react-router-dom';
import useTitle from '../../../hooks/useTitle'
import { useGetProductsQuery } from '../productInforApiSlice';
import PulseLoader from 'react-spinners/PulseLoader';
import ProductEditForm from './ProductEditForm';

const ProductEdit = () => {
    useTitle('Edit product Z1_App');

    const { id } = useParams();

    const { product } = useGetProductsQuery('product', {
        selectFromResult: ({ data }) => ({
            product: data?.entities[id]
        })
    });

    if (!product) { return <PulseLoader color='#0099ff' /> };

    let content = <ProductEditForm product={product} />

    return content;
};

export default ProductEdit;