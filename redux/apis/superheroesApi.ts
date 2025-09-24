import {
  createSuperhero,
  getSuperheroes,
  deleteSuperheroByPid,
  editSuperhero,
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
        try {
          const data = await getSuperheroes({ page, perPage, sortOption });
          return { data };
        } catch {
          return { error: "Unexpected error" };
        }
      },
      providesTags: ["AllSuperheroes"],
    }),
    deleteSuperheroByPid: builder.mutation<
      { success: boolean, message: string },
      { pid: string }
    >({
      queryFn: async ({ pid }) => {
        try {
          const data = await deleteSuperheroByPid({ pid });
          return { data };
        } catch {
          return { error: "Unexpected error" };
        }
      },
      invalidatesTags: ["AllSuperheroes"],
    }),
    editSuperhero: builder.mutation<
      { success: boolean; message: string },
      { values: superheroSchemaType; pid: string }
    >({
      queryFn: async ({ pid, values }) => {
        try {
          const data = await editSuperhero(values, pid);
          return { data };
        } catch {
          return { error: "Unexpected error" };
        }
      },
      invalidatesTags: ["AllSuperheroes"],
    }),
    createSuperhero: builder.mutation<
      { success: boolean; pid: string; message: string },
      { values: superheroSchemaType }
    >({
      queryFn: async ({ values }) => {
        try {
          const data = await createSuperhero(values);
          return { data };
        } catch {
          return { error: "Unexpected error" };
        }
      },
      invalidatesTags: ["AllSuperheroes"],
    }),
  }),
});

export const {
  useCreateSuperheroMutation,
  useGetSuperheroesQuery,
  useDeleteSuperheroByPidMutation,
  useEditSuperheroMutation,
} = superheroesApi;
