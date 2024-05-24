import React from "react";

const PageNumber = ({ pageNumber }: { pageNumber: number }) => {
  return (
    <div className="flex gap-2 items-center">
      <div className="text-sm font-semibold">Page: {pageNumber}</div>
    </div>
  );
};

export default PageNumber;
