import {
  createSuperhero,
  getSuperheroes,
  deleteSuperheroByPid,
} from "@/lib/actions/superhero.actions";
import type { SuperheroHomepageType } from "@/lib/types";
import type { superheroSchemaType } from "@/lib/zod-schemas";
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
      { page: number; perPage: number; sortOption: string }
    >({
      queryFn: async ({ page, perPage, sortOption }) => {
        const data = await getSuperheroes({ page, perPage, sortOption });
        return { data };
      },
      providesTags: ["AllSuperheroes"],
    }),
    deleteSuperheroByPid: builder.mutation<
      { success: boolean },
      { pid: string }
    >({
      queryFn: async ({ pid }) => {
        const data = await deleteSuperheroByPid({ pid });
        return { data };
      },
      invalidatesTags: ["AllSuperheroes"],
    }),
    createSuperhero: builder.mutation<
      { success: boolean; pid: string },
      { values: superheroSchemaType }
    >({
      queryFn: async ({ values }) => {
        const data = await createSuperhero(values);
        return { data };
      },
      invalidatesTags: ["AllSuperheroes"],
    }),
  }),
});

export const {
  useCreateSuperheroMutation,
  useGetSuperheroesQuery,
  useDeleteSuperheroByPidMutation,
} = superheroesApi;
