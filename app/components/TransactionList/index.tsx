"use client";
import { useState, useEffect } from "react";
import TransactionRow from "../TransactionRow";
import { url, getOptions } from "./config";

export default function TransactionList() {
  const [transactions, setTransactions] = useState([]);
  const [cursor, setCursor] = useState(null);
  const [pageNumber, setPageNumber] = useState(0);
  const [previousCursors, setPreviousCursors] = useState([null]);
  const [parties, setParties] = useState([]);
  const [loading, setLoading] = useState(false);
  const [initialFetchComplete, setInitialFetchComplete] = useState(false);

  const fetchTransactions = async (newCursor = null, direction = "next") => {
    setLoading(true);
    const options = getOptions(newCursor);

    try {
      const res = await fetch(url, options);

      if (!res.ok) {
        console.error(await res.json());
        throw new Error("Failed to fetch data");
      }

      const data = await res.json();
      if (!initialFetchComplete) setInitialFetchComplete(true);
      if (pageNumber === 0) setPageNumber(1);

      if (direction === "next") {
        if (cursor) setPreviousCursors((prev) => [...prev, newCursor]);
      } else {
        setPreviousCursors((prev) => prev.slice(0, -1));
      }

      setCursor(data.cursor);
      setTransactions(data.transactions);
      setParties(data.partiesEnriched);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Only run on mount

  const handleNext = () => {
    setPageNumber(pageNumber + 1);
    fetchTransactions(cursor, "next");
  };

  const handlePrevious = () => {
    setPageNumber(pageNumber - 1);
    if (previousCursors.length > 1) {
      const previousCursor = previousCursors[previousCursors.length - 2];
      fetchTransactions(previousCursor, "previous");
    }
  };

  const buttonDisabled = loading;
  const prevButtonDisabled =
    buttonDisabled || cursor === null || previousCursors.length === 1;

  return (
    <div className="flex min-h-screen flex-col items-center justify-between sm:px-32 sm:pb-24">
      <div className="min-w-full w-full">
        <div className="flex justify-between items-center border-b pb-2">
          <div className="flex gap-2 items-center">
            <button
              className={`flex items-center gap-1 px-[6px] py-[4px] text-xs font-semibold border-[1px] min-w-max rounded-lg justify-center w-[60px] ${
                prevButtonDisabled
                  ? "bg-white text-gray-300"
                  : "cursor-pointer transition duration-200 hover:bg-gray-50 "
              }`}
              onClick={handlePrevious}
              disabled={prevButtonDisabled}
            >
              Previous
            </button>

            <button
              className={`flex items-center gap-1 px-[6px] py-[4px] text-xs font-semibold border-[1px] min-w-max rounded-lg justify-center w-[60px] ${
                buttonDisabled
                  ? "bg-white text-gray-300"
                  : "cursor-pointer transition duration-200 hover:bg-gray-50 "
              }`}
              onClick={handleNext}
              disabled={buttonDisabled}
            >
              Next
            </button>
          </div>

          {pageNumber > 0 && (
            <div className="flex gap-2 items-center">
              <div className="text-sm font-semibold">Page: {pageNumber}</div>
            </div>
          )}
        </div>

        {loading ? (
          <div className="pt-24 text-center">Loading...</div>
        ) : transactions.length > 0 ? (
          <div className="divide-y">
            {transactions.map((tx: any, idx) => (
              <TransactionRow parties={parties} key={idx} tx={tx} />
            ))}
          </div>
        ) : (
          initialFetchComplete && (
            <div className="pt-24 text-center">No transactions available</div>
          )
        )}
      </div>
    </div>
  );
}
