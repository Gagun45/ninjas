export const PER_PAGE_OPTIONS = ["2", "5", "10"];

export interface SortSuperheroOptionInterface {
  label: string;
  value: string;
}
export const SORT_SUPERHEROES_OPTIONS: SortSuperheroOptionInterface[] = [
  { label: "Nickname A to Z", value: "nicknameAsc" },
  { label: "Nickname Z to A", value: "nicknameDesc" },
];
