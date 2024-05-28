"use client";

import { useState, useEffect } from "react";
import {
  TransactionQueryResponse,
  fetchTransactions,
} from "../fetchTransactions";
import TransactionRow from "../../TransactionRow";
import PaginationButton from "../../PaginationButtons";
import PageNumber from "../../PageNumber";

export default function TransactionListClient() {
  const [data, setData] = useState<TransactionQueryResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [pageNumber, setPageNumber] = useState(1);
  const [previousCursors, setPreviousCursors] = useState<(string | null)[]>([
    null,
  ]);

  useEffect(() => {
    const initialFetch = async () => {
      try {
        const result = await fetchTransactions();
        setData(result);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    initialFetch();
  }, []);

  const fetchAndSetData = async (
    cursor: string | null,
    direction: "next" | "previous"
  ) => {
    setLoading(true);
    try {
      const result = await fetchTransactions(cursor);
      if (direction === "next" && data?.cursor) {
        setPreviousCursors((prev) => [...prev, cursor]);
      } else if (direction === "previous") {
        setPreviousCursors((prev) => prev.slice(0, -1));
      }
      setData(result);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleNext = () => {
    setPageNumber(pageNumber + 1);
    if (data) {
      fetchAndSetData(data.cursor, "next");
    }
  };

  const handlePrevious = () => {
    setPageNumber(pageNumber - 1);
    if (previousCursors.length > 1 && data) {
      const previousCursor = previousCursors[previousCursors.length - 2];
      fetchAndSetData(previousCursor, "previous");
    }
  };

  const loadingOrEmpty = loading || !data || data.transactions.length === 0;

  return (
    <div className="flex min-h-screen flex-col items-center justify-between sm:px-32 sm:pb-24">
      <div className="min-w-full w-full">
        <h1 className="pb-2">Client-side Rendering Example</h1>
        <div className="flex justify-between items-center border-b pb-2">
          <PaginationButton
            nextDisabled={loadingOrEmpty}
            prevDisabled={
              loading || !data?.cursor || previousCursors.length === 1
            }
            handleNext={handleNext}
            handlePrevious={handlePrevious}
          />

          {pageNumber > 0 && <PageNumber pageNumber={pageNumber} />}
        </div>

        {loadingOrEmpty ? (
          <div className="pt-24 text-center">Loading...</div>
        ) : (
          <div className="divide-y">
            {data.transactions.map((tx, idx) => (
              <TransactionRow
                parties={data.partiesEnriched}
                assets={data.assetsEnriched}
                key={idx}
                tx={tx}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
