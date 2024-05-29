export default function PaginationButton({
  isDisabled,
  onClick,
}: {
  isDisabled: boolean;
  onClick: () => void;
}) {
  const base =
    "flex items-center gap-1 px-[6px] py-[4px] text-xs font-semibold border-[1px] min-w-max rounded-lg justify-center w-[60px]";
  const disabled = "bg-white text-gray-300";
  const enabled = "cursor-pointer transition duration-200 hover:bg-gray-50";

  return (
    <button
      onClick={onClick}
      disabled={isDisabled}
      className={`${base} ${isDisabled ? disabled : enabled}`}
    >
      Next
    </button>
  );
}
