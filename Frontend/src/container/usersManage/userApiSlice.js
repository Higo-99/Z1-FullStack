import { createEntityAdapter, createSelector } from '@reduxjs/toolkit';
import { apiSlice } from '../../app/api/apiSlice';

const usersAdapter = createEntityAdapter({});

const initialState = usersAdapter.getInitialState();

export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getUsers: builder.query({
            query: () => ({
                url: '/users',
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

export const selectUsersResult = userApiSlice.endpoints.getUsers.select();

const selectUserData = createSelector(
    selectUsersResult,
    usersResult => usersResult.data
);

export const {
    selectAll: selectAllUsers,
    selectById: selectUserById,
    selectIds: selectUserIds
} = usersAdapter.getSelectors(state => selectUserData(state) ?? initialState);