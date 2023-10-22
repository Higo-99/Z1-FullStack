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
    })
})
