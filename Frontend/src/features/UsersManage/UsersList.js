import useTitle from '../../hooks/useTitle';
import './Users-List&Infor.scss';
import { useGetUsersQuery } from './userApiSlice';
import PulseLoader from 'react-spinners/PulseLoader';
import UsersInfor from './UsersInfor';

const UserList = () => {
    useTitle('Users List Z1_App');

    const {
        data: users,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetUsersQuery('usersList', {
        pollingInterval: 60000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    }
    );

    let content;
    if (isLoading) { content = <PulseLoader color='#0099ff' /> };
    if (isError) { content = <p className='errmsg'>{error?.data?.message}</p> };
    if (isSuccess) {
        const { ids } = users;
        const tableContent = ids?.length &&
            ids.map(userId => <UsersInfor key={userId} userId={userId} />);

        content = (
            <div className='UserListPage' >
                <table>
                    <thead>
                        <tr>
                            <th scope="col" className='table__th'>Id</th>
                            <th scope="col" className='table__th'>Email</th>
                            <th scope="col" className='table__th'>First Name</th>
                            <th scope="col" className='table__th'>Last Name</th>
                            <th scope="col" className='table__th'>Birth day</th>
                            <th scope="col" className='table__th'>Address</th>
                            <th scope="col" className='table__th'>Gender</th>
                            <th scope="col" className='table__th'>Phonenumber</th>
                            <th scope="col" className='table__th'>Edit</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tableContent}
                    </tbody>
                </table>
            </div>
        );
    }


    return content;
}

export default UserList