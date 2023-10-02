import './Products-List&Info.scss';
import { useGetProductsQuery } from "./productApiSlice";
import PulseLoader from 'react-spinners/PulseLoader';
import ProductsInfor from './ProductsInfor';

const ProductsList = () => {
    const {
        data: products,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetProductsQuery('productsList', {
        pollingInterval: 60000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    });

    let content;

    if (isLoading) { content = <PulseLoader color='#0099ff' /> };
    if (isError) { content = <p> {error?.data?.message} </p> };
    if (isSuccess) {
        const { ids } = products;
        const tableContent = ids?.length &&
            ids.map(productId => <ProductsInfor key={productId} productId={productId} />);

        content = (
            <div className='ProductsListPage' >
                <table>
                    <thead>
                        <tr>
                            <th scope="col" className='table__th'>Id</th>
                            <th scope="col" className='table__th'>Image</th>
                            <th scope="col" className='table__th'>Label</th>
                            <th scope="col" className='table__th'>Code</th>
                            <th scope="col" className='table__th'>Price</th>
                            <th scope="col" className='table__th'>Type</th>
                            <th scope="col" className='table__th'>Fragrance</th>
                            <th scope="col" className='table__th'>Style</th>
                            <th scope="col" className='table__th'>Edit</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tableContent}
                    </tbody>
                </table>
            </div>
        );
    };

    return content;
};

export default ProductsList;