import {
  createSuperpower,
  getAllSuperpowers,
} from "@/lib/actions/superpower.actions";
import type { SuperpowerType } from "@/lib/types";
import { createSuperpowerSchemaType } from "@/lib/zod-schemas";
import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";

export const superpowersApi = createApi({
  reducerPath: "superpowersApi",
  baseQuery: fakeBaseQuery(),
  tagTypes: ["AllSuperpowers"],
  endpoints: (builder) => ({
    getSuperpowers: builder.query<{ superpowers: SuperpowerType[] }, void>({
      queryFn: async () => {
        try {
          const data = await getAllSuperpowers();
          return { data };
        } catch {
          return { error: "Unexpected error" };
        }
      },
      providesTags: ["AllSuperpowers"],
    }),
    createSuperpower: builder.mutation<
      { success: boolean, message: string },
      { values: createSuperpowerSchemaType }
    >({
      queryFn: async ({ values }) => {
        try {
          const data = await createSuperpower(values);
          return { data };
        } catch {
          return { error: 'Unexpected error' };
        }
      },
      invalidatesTags: ["AllSuperpowers"],
    }),
  }),
});

export const { useCreateSuperpowerMutation, useGetSuperpowersQuery } =
  superpowersApi;
