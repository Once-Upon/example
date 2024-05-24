import React from "react";

type PaginationButtonProps = {
  nextDisabled: boolean;
  prevDisabled: boolean;
  handleNext: () => void;
  handlePrevious: () => void;
};

const PaginationButton: React.FC<PaginationButtonProps> = ({
  nextDisabled,
  prevDisabled,
  handleNext,
  handlePrevious,
}) => {
  const base =
    "flex items-center gap-1 px-[6px] py-[4px] text-xs font-semibold border-[1px] min-w-max rounded-lg justify-center w-[60px]";
  const disabled = "bg-white text-gray-300";
  const enabled = "cursor-pointer transition duration-200 hover:bg-gray-50";

  return (
    <div className="flex gap-2 items-center">
      <button
        onClick={handlePrevious}
        disabled={prevDisabled}
        className={`${base} ${prevDisabled ? disabled : enabled}`}
      >
        Previous
      </button>

      <button
        onClick={handleNext}
        disabled={nextDisabled}
        className={`${base} ${nextDisabled ? disabled : enabled}`}
      >
        Next
      </button>
    </div>
  );
};

export default PaginationButton;
