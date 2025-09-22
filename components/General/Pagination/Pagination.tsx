import { Button } from "@/components/ui/button";

interface Props {
  totalPages: number;
  onChange: (value: number) => void;
  currentPage: number;
}

const Pagination = ({ currentPage, onChange, totalPages }: Props) => {
  const pagesArray = Array.from({ length: totalPages }).map((_, i) => i + 1);
  return (
    <div className="flex justify-between items-center">
      <Button
        disabled={currentPage <= 1}
        onClick={() => onChange(currentPage - 1)}
      >
        Prev
      </Button>
      <div className="flex items-center gap-1">
        {pagesArray.map((page) => {
          const isCurrentPage = page === currentPage;
          return (
            <Button
              className={`${
                isCurrentPage
                  ? "bg-main hover:bg-main"
                  : "bg-gray-200 text-gray-800 hover:bg-gray-300"
              }`}
              onClick={() => onChange(page)}
              key={page}
            >
              {page}
            </Button>
          );
        })}
      </div>
      <Button
        disabled={currentPage >= totalPages}
        onClick={() => onChange(currentPage + 1)}
      >
        Next
      </Button>
    </div>
  );
};
export default Pagination;
