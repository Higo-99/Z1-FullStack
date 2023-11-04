import { createEntityAdapter } from '@reduxjs/toolkit';
import { apiSlice } from '../../app/api/apiSlice';

const productsAdapter = createEntityAdapter({});

const initialState = productsAdapter.getInitialState();

export const productsApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getProducts: builder.query({
            query: () => ({
                url: '/products',
                validateStatus: (response, result) => {
                    return response.status === 200 && !result.isError;
                }
            }),
            transformResponse: responseData => {
                return productsAdapter.setAll(initialState, responseData)
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'Product', id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'Product', id }))
                    ]
                } else return [{ type: 'Product', id: 'LIST' }]
            }
        }),
        addNewProduct: builder.mutation({
            query: initialProductData => ({
                url: '/products',
                method: 'POST',
                body: { ...initialProductData }
            }),
            invalidatesTags: [
                { type: 'Product', id: 'LIST' }
            ]
        }),
        updateProduct: builder.mutation({
            query: initialProductData => ({
                url: '/products',
                method: 'PACTH',
                body: { ...initialProductData }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Product', id: arg.id }
            ]
        }),
        deleteProduct: builder.mutation({
            query: ({ id }) => ({
                url: '/products',
                method: 'DELETE',
                body: { id }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Product', id: arg.id }
            ]
        })
    })
});

export const {
    useGetProductsQuery,
    useAddNewProductMutation,
    useUpdateProductMutation,
    useDeleteProductMutation
} = productsApiSlice;