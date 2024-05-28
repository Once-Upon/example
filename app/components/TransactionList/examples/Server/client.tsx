"use client";

import { useState } from "react";
import {
  TransactionQueryResponse,
  fetchTransactions,
} from "../fetchTransactions";
import TransactionRow from "../../TransactionRow";
import PaginationButton from "../../PaginationButtons";
import PageNumber from "../../PageNumber";

export default function TransactionListClient({
  txData,
}: {
  txData: TransactionQueryResponse;
}) {
  const [data, setData] = useState<TransactionQueryResponse>(txData);
  const [loading, setLoading] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [cursors, setCursors] = useState<(string | null)[]>([null]);

  const fetchAndSetData = async (
    cursor: string | null,
    direction: "next" | "previous"
  ) => {
    setLoading(true);
    try {
      const result = await fetchTransactions(cursor);
      if (direction === "next" && data.cursor) {
        setCursors((prev) => [...prev, cursor]);
      } else if (direction === "previous") {
        setCursors((prev) => prev.slice(0, -1));
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
    fetchAndSetData(data.cursor, "next");
  };

  const handlePrevious = () => {
    setPageNumber(pageNumber - 1);
    if (cursors.length > 1) {
      const previousCursor = cursors[cursors.length - 2];
      fetchAndSetData(previousCursor, "previous");
    }
  };

  const loadingOrEmpty = loading || data.transactions.length === 0;

  return (
    <div className="flex min-h-screen flex-col items-center justify-between sm:px-32 sm:pb-24">
      <div className="min-w-full w-full">
        <h1>Server-side Rendering</h1>
        <div className="flex justify-between items-center border-b pb-2">
          <PaginationButton
            nextDisabled={loadingOrEmpty}
            prevDisabled={loading || cursors.length === 1}
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
                tx={tx}
                key={idx}
                assets={data.assetsEnriched}
                parties={data.partiesEnriched}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
