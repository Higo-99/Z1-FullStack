import { memo } from 'react';
import './Products-List&Info.scss';
import { useGetProductsQuery } from './productApiSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";

const ProductsInfor = ({ productId }) => {
    const { product } = useGetProductsQuery('product', {
        selectFromResult: ({ data }) => ({
            product: data?.entities[productId]
        })
    });
    if (product) {
        const fragrances = JSON.parse(product.fragrance);
        console.log(fragrances);
        const fragranceContent = (
            fragrances.map(frag => (
                frag.label + ' '
            ))
        );
        return (
            <tr>
                <td className='table__cell'>{product.id}</td>
                <td className='table__cell'>{
                    <img src={product.images} alt="" srcset="" />
                }</td>
                <td className='table__cell'>{product.label}</td>
                <td className='table__cell'>{product.code}</td>
                <td className='table__cell'>{product.price}</td>
                <td className='table__cell'>{product.type}</td>
                <td className='table__cell'>{fragranceContent}</td>
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