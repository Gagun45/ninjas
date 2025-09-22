"use client";

import { useGetSuperheroesQuery } from "@/redux/apis/superheroesApi";
import { useEffect, useState } from "react";
import SuperheroCard from "./SuperheroCard/SuperheroCard";
import PerPageSelect from "../General/PerPageSelect/PerPageSelect";
import Pagination from "../General/Pagination/Pagination";
import LoadingIndicator from "../General/LoadingIndicator/LoadingIndicator";
import { PER_PAGE_OPTIONS, SORT_SUPERHEROES_OPTIONS } from "@/lib/constants";
import SortBySelect from "../General/SortBySelect/SortBySelect";

const AllSuperheroesSection = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [currentSortOption, setCurrentSortOption] = useState(
    SORT_SUPERHEROES_OPTIONS[0]
  );
  const [perPage, setPerPage] = useState(5);
  const { data, isLoading, isFetching } = useGetSuperheroesQuery({
    page: currentPage,
    perPage,
    sortOption: currentSortOption.value,
  });
  useEffect(() => {
    setCurrentPage(1);
  }, [perPage]);
  if (isLoading) return <LoadingIndicator />;
  if (!data?.success) return <div>Something went wrong</div>;
  const { totalCount, superheroes } = data;
  const totalPages = Math.ceil(totalCount / perPage);

  const onChangePerPage = (value: string) => {
    const valueToInt = parseInt(value);
    setPerPage(isNaN(valueToInt) ? parseInt(PER_PAGE_OPTIONS[1]) : valueToInt);
  };
  const onChangePage = (value: number) => {
    setCurrentPage(value);
  };
  const onChangeSortOption = (value: string) => {
    const sortOpt = SORT_SUPERHEROES_OPTIONS.find((opt) => opt.value === value);
    setCurrentSortOption(sortOpt ? sortOpt : SORT_SUPERHEROES_OPTIONS[0]);
  };
  return (
    <section className="flex flex-col w-full gap-2">
      <div className="flex items-center justify-between flex-wrap">
        <PerPageSelect
          onChange={onChangePerPage}
          perPage={perPage}
          options={PER_PAGE_OPTIONS}
        />
        <SortBySelect
          currentOption={currentSortOption}
          options={SORT_SUPERHEROES_OPTIONS}
          onChange={onChangeSortOption}
        />
      </div>
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
