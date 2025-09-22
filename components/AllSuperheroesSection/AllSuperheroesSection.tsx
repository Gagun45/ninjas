"use client";

import { useGetSuperheroesQuery } from "@/redux/apis/superheroesApi";
import { useEffect, useState } from "react";
import SuperheroCard from "./SuperheroCard/SuperheroCard";
import PerPageSelect from "../General/PerPageSelect/PerPageSelect";
import Pagination from "../General/Pagination/Pagination";
import LoadingIndicator from "../General/LoadingIndicator/LoadingIndicator";

const AllSuperheroesSection = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(5);
  const { data, isLoading, isFetching } = useGetSuperheroesQuery({
    page: currentPage,
    perPage,
  });
  useEffect(() => {
    setCurrentPage(1);
  }, [perPage]);
  if (isLoading) return <LoadingIndicator />;
  if (!data?.success) return <div>Something went wrong</div>;
  const { totalCount, superheroes } = data;
  const totalPages = Math.ceil(totalCount / perPage);

  const onChangePerPage = (value: number) => {
    setPerPage(value);
  };
  const onChangePage = (value: number) => {
    setCurrentPage(value);
  };
  return (
    <section className="flex flex-col w-full gap-2">
      <PerPageSelect onChange={onChangePerPage} perPage={perPage} />
      {isFetching ? (
        <LoadingIndicator />
      ) : (
        <div className="flex justify-start flex-wrap gap-2">
          {superheroes.map((superhero) => (
            <SuperheroCard superhero={superhero} key={superhero.pid} />
          ))}
        </div>
      )}
      <Pagination
        totalPages={totalPages}
        onChange={onChangePage}
        currentPage={currentPage}
      />
    </section>
  );
};
export default AllSuperheroesSection;
