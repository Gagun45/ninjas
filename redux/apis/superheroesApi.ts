import {
  createSuperhero,
  getSuperheroes,
} from "@/lib/actions/superhero.actions";
import type { SuperheroHomepageType } from "@/lib/types";
import type { createSuperheroSchemaType } from "@/lib/zod-schemas";
import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";

export const superheroesApi = createApi({
  reducerPath: "superheroesApi",
  baseQuery: fakeBaseQuery(),
  tagTypes: ["AllSuperheroes"],
  endpoints: (builder) => ({
    getSuperheroes: builder.query<
      {
        success: boolean;
        superheroes: SuperheroHomepageType[];
        totalCount: number;
      },
      { page: number; perPage: number }
    >({
      queryFn: async ({ page, perPage }) => {
        try {
          const data = await getSuperheroes({ page, perPage });
          return { data };
        } catch (error) {
          return { error };
        }
      },
      providesTags: ["AllSuperheroes"],
    }),
    createSuperhero: builder.mutation<
      { success: boolean; pid: string },
      { values: createSuperheroSchemaType }
    >({
      queryFn: async ({ values }) => {
        try {
          const data = await createSuperhero(values);
          return { data };
        } catch (error) {
          return { error };
        }
      },
      invalidatesTags: ["AllSuperheroes"],
    }),
  }),
});

export const { useCreateSuperheroMutation, useGetSuperheroesQuery } =
  superheroesApi;
