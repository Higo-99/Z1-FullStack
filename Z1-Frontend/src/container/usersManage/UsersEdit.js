import React from 'react'
import { useParams } from 'react-router-dom'
import useTitle from '../hooks/useTitle';
import { useGetUsersQuery } from './userApiSlice';
import PulseLoader from 'react-spinners/PulseLoader';

const UsersEdit = () => {
    useTitle('Edit user Z1_Hospital')

    const { id } = useParams();

    const { user } = useGetUsersQuery('usersList', {
        selectFromResult: ({ data }) => ({
            user: data?.entities[id]
        })
    });

    if (!user) { content = <PulseLoader color='#0099ff' /> };

    let content = `Edit user ${user.email}`;

    return content;
};

export default UsersEdit;