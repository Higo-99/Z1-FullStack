import { memo } from 'react';
import './Products-List&Info.scss';
import { useGetProductsQuery } from '../productInforApiSlice';
import { useGetProductImagesQuery } from '../productImageApiSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from 'react-router-dom';

const Product = ({ productId, code }) => {
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

    let firstBlobImageData;

    if (image) {
        const { ids, entities } = image;
        const filteredIds = ids.filter(imgId => entities[imgId].code === code);
        const firstImageFilter = filteredIds.filter(id => entities[id].stand === '0')
        firstBlobImageData = entities[firstImageFilter];
    };

    const base64ToBlob = (base64Data) => {
        const parts = base64Data.split(',');
        const type = parts[0].match(/:(.*?);/)[1];
        const byteCharacters = atob(parts[1]);
        const byteNumbers = new Uint8Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        };

        return new Blob([byteNumbers], { type: type });
    };

    let imgContent;
    if (firstBlobImageData) {
        const imgData = firstBlobImageData.data;
        const imgName = firstBlobImageData.name;
        const deCodeImg = base64ToBlob(imgData);
        const imgUrl = URL.createObjectURL(deCodeImg)
        imgContent = (<img className='tdImg' src={imgUrl} alt={imgName} />);
    };

    const navigate = useNavigate();

    if (product) {
        const handleEdit = () => navigate(`/productsManage/${productId}`);
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
                        onClick={handleEdit}
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

const ProductMemoized = memo(Product);

export default ProductMemoized;