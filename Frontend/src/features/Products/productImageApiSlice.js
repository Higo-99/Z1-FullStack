import { createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const productImageAdapter = createEntityAdapter({});

const initialState = productImageAdapter.getInitialState();

export const productImageApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getProductImages: builder.query({
            query: () => ({
                url: '/productImages',
                validateStatus: (response, result) => {
                    return response.status === 200 && !result.isError;
                }
            }),
            transformResponse: responseData => {
                return productImageAdapter.setAll(initialState, responseData)
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'ProductImage', id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'ProductImage', id: id }))
                    ]
                } else return [{ type: 'ProductImage', id: 'LIST' }]
            }
        }),
        addNewProductImage: builder.mutation({
            query: initialProductImageData => ({
                url: '/productImages',
                method: 'POST',
                body: { ...initialProductImageData }
            }),
            invalidatesTags: [
                { type: 'ProductImage', id: 'LIST' }
            ]
        }),
        updateProductImage: builder.mutation({
            query: initialProductImageData => ({
                url: '/productImages',
                method: 'PATCH',
                body: { ...initialProductImageData }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'ProductImage', id: arg.id }
            ]
        }),
        deleteProductImage: builder.mutation({
            query: ({ id }) => ({
                url: '/productImages',
                method: 'DELETE',
                body: { id }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'ProductImage', id: arg.id }
            ]
        }),
    })
})

export const {
    useGetProductImagesQuery,
    useAddNewProductImageMutation,
    useUpdateProductImageMutation,
    useDeleteProductImageMutation
} = productImageApiSlice;