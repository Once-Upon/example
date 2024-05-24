"use client";

import { useState, useEffect } from "react";
import TransactionRow from "../TransactionRow";
import { url, getOptions } from "./config";
import PaginationButton from "./PaginationButtons";
import PageNumber from "./PageNumber";

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

  return (
    <div className="flex min-h-screen flex-col items-center justify-between sm:px-32 sm:pb-24">
      <div className="min-w-full w-full">
        <div className="flex justify-between items-center border-b pb-2">
          <PaginationButton
            nextDisabled={loading}
            prevDisabled={
              loading || cursor === null || previousCursors.length === 1
            }
            handleNext={handleNext}
            handlePrevious={handlePrevious}
          />

          {pageNumber > 0 && <PageNumber pageNumber={pageNumber} />}
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
