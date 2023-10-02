import './Users-List&Infor.scss';
import { useGetUsersQuery } from './userApiSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from 'react-router-dom';
import { memo } from 'react';

const UsersInf = ({ userId }) => {
    const { user } = useGetUsersQuery('user', {
        selectFromResult: ({ data }) => ({
            user: data?.entities[userId]
        })
    });

    const navigate = useNavigate();

    if (user) {
        const handleEdit = () => navigate(`/usersManage/${userId}`);
        return (
            <tr>
                <td className='table__cell'>{user.id}</td>
                <td className='table__cell'>{user.email}</td>
                <td className='table__cell'>{user.firstName}</td>
                <td className='table__cell'>{user.lastName}</td>
                <td className='table__cell'>{user.birthday}</td>
                <td className='table__cell'>{user.address}</td>
                <td className='table__cell'>{user.gender}</td>
                <td className='table__cell'>{user.phoneNumber}</td>
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
}

const UserMemoized = memo(UsersInf);

export default UserMemoized;