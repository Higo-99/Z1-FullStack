import { memo } from 'react';
import './Products-List&Info.scss';
import { useGetProductsQuery } from '../productInforApiSlice';
import { useGetProductImagesQuery } from '../productImageApiSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";

const ProductsInfor = ({ productId, code }) => {
    const { product } = useGetProductsQuery('product', {
        selectFromResult: ({ data }) => ({
            product: data?.entities[productId]
        })
    });

    const { image } = useGetProductImagesQuery('image', {
        selectFromResult: ({ data }) => ({
            image: data
        })
    });

    let firstImageData;

    if (image) {
        const { ids, entities } = image;
        const filteredIds = ids.filter(imgId => entities[imgId].code === code);
        const firstImageFilter = filteredIds.filter(id => entities[id].stand === '0')
        firstImageData = entities[firstImageFilter].data;
    };

    const imgContent = <img className='tdImg' src={firstImageData} alt="" />;

    if (product) {
        return (
            <tr>
                <td className='table__cell'>{product.id}</td>
                <td className='table__cell'>{imgContent}</td>
                <td className='table__cell'>{product.label}</td>
                <td className='table__cell'>{product.code}</td>
                <td className='table__cell'>{product.price}</td>
                <td className='table__cell'>{product.type}</td>
                <td className='table__cell'>{product.stock}</td>
                <td className='table__cell'>
                    <button
                        className="icon-button table__button"
                    // onClick={handleEdit}
                    >
                        <FontAwesomeIcon icon={faPenToSquare} />
                    </button>
                </td>
            </tr>
        );
    }
    else {
        return null;
    };
};

const ProductMemoized = memo(ProductsInfor);

export default ProductMemoized;