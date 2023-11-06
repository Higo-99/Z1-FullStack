import './Products-List&Info.scss';
import { useGetProductsQuery } from "../productInforApiSlice";
import HashLoader from 'react-spinners/HashLoader';
import Product from './Product';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import useTitle from "../../../hooks/useTitle";

const ProductsList = () => {
    useTitle('Z1_App Product list');
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

    if (isLoading) {
        content = (
            <div className={`loadingOverplay active`}>
                <div className="loadingContent">
                    <HashLoader color='#8eecff' />
                </div>
            </div>
        )
    };
    if (isError) { content = <p> {error?.data?.message} </p> };
    if (isSuccess) {
        const { ids, entities } = products;
        const tableContent = ids?.length &&
            ids.map(productId => <Product key={productId} productId={productId} code={entities[productId].code} />);

        content = (
            <div className="">
                <div className="addNewBtn">
                    <Link to={'/productsManage/addNew'} className='LinkAddNewProduct'>
                        <FontAwesomeIcon className="EHicon" icon={faCirclePlus} />
                        <p className='EHlabel'>Add New Product</p>
                    </Link>
                </div>
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
                                <th scope="col" className='table__th'>Stock</th>
                                <th scope="col" className='table__th'>Edit</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tableContent}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    };

    return content;
};

export default ProductsList;