import { createEntityAdapter } from '@reduxjs/toolkit';
import { apiSlice } from '../../app/api/apiSlice';

const usersAdapter = createEntityAdapter({});

const initialState = usersAdapter.getInitialState();

export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getUsers: builder.query({
            query: () => ({
                url: '/users',
                method: 'GET',
                validateStatus: (response, result) => {
                    return response.status === 200 && !result.isError;
                }
            }),
            transformResponse: responseData => {
                return usersAdapter.setAll(initialState, responseData);
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'User', id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'User', id }))
                    ];
                }
                else return [{ type: 'User', id: 'LIST' }];
            }
        }),
        addNewUser: builder.mutation({
            query: initialUserData => ({
                url: '/users',
                method: 'POST',
                body: { ...initialUserData }
            }),
            invalidatesTags: [
                { type: 'User', id: 'LIST' }
            ]
        }),
        editUsers: builder.mutation({
            query: initialUserData => ({
                url: '/users',
                method: 'PATCH',
                body: { ...initialUserData }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'User', id: arg.id }
            ]
        }),
        deleteUser: builder.mutation({
            query: ({ id }) => ({
                url: '/users',
                method: 'DELETE',
                body: { id }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'User', id: arg.id }
            ]
        })
    })
});

export const {
    useGetUsersQuery,
    useAddNewUserMutation,
    useEditUsersMutation,
    useDeleteUserMutation
} = userApiSlice;