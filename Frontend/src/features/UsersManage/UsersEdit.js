import React from 'react'
import { useParams } from 'react-router-dom'
import useTitle from '../../hooks/useTitle';
import { useGetUsersQuery } from './userApiSlice';
import HashLoader from 'react-spinners/HashLoader';
import UsersEditForm from './UsersEditForm';

const UsersEdit = () => {
    useTitle('Z1_App Edit user');

    const { id } = useParams();

    const { user } = useGetUsersQuery('usersList', {
        selectFromResult: ({ data }) => ({
            user: data?.entities[id]
        })
    });

    if (!user) {
        return (
            <div className={`loadingOverplay active`}>
                <div className="loadingContent">
                    <HashLoader color='#8eecff' />
                </div>
            </div>
        )
    };

    let content = <UsersEditForm user={user} />;

    return content;
};

export default UsersEdit;