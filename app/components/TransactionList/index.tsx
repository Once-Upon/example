"use client";

import { useState, useEffect } from "react";
import TransactionRow from "./TransactionRow";
import PaginationButton from "./PaginationButtons";
import PageNumber from "./PageNumber";

export default function TransactionList() {
  const [data, setData] = useState({
    transactions: [],
    cursor: null,
    parties: [],
  });
  const [loading, setLoading] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [previousCursors, setPreviousCursors] = useState([null]);

  const fetchTransactions = async (newCursor = null, direction = "next") => {
    setLoading(true);

    const url = `${process.env.NEXT_PUBLIC_ONCE_UPON_NEST_API_URL}/v3/transactions`;

    const params = {
      contextAddresses: [
        {
          address: "0xD19BF5F0B785c6f1F6228C72A8A31C9f383a49c4",
          toFromAll: "All",
        },
        {
          address: "0x662127bf82b794a26b7ddb6b495f6a5a20b81738",
          toFromAll: "All",
        },
        {
          address: "0x74B78e98093F5B522A7eBDAc3B994641cA7c2b20",
          toFromAll: "All",
        },
      ],
      filterAddresses: [],
      dateRange: {},
      sort: -1,
      includes: ["partiesEnriched"],
      limit: 25,
      functionSelectors: [],
      tokenTransfers: [],
      chainIds: [0], // all chains
      contextActions: ["MINTED", "SWAPPED"],
      excludes: [],
    };

    const getOptions = (cursor = null) => ({
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...params, cursor }),
    });

    const options = getOptions(newCursor);

    try {
      const res = await fetch(url, options);

      if (!res.ok) throw new Error("Failed to fetch data");

      const result = await res.json();

      if (direction === "next") {
        if (data.cursor) setPreviousCursors((prev) => [...prev, newCursor]);
      } else {
        setPreviousCursors((prev) => prev.slice(0, -1));
      }

      setData(result);
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
    fetchTransactions(data.cursor, "next");
  };

  const handlePrevious = () => {
    setPageNumber(pageNumber - 1);
    if (previousCursors.length > 1) {
      const previousCursor = previousCursors[previousCursors.length - 2];
      fetchTransactions(previousCursor, "previous");
    }
  };

  const loadingOrEmpty = loading || data.transactions.length === 0;

  return (
    <div className="flex min-h-screen flex-col items-center justify-between sm:px-32 sm:pb-24">
      <div className="min-w-full w-full">
        <div className="flex justify-between items-center border-b pb-2">
          <PaginationButton
            nextDisabled={loadingOrEmpty}
            prevDisabled={
              loading || data.cursor === null || previousCursors.length === 1
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
            {data.transactions.map((tx: any, idx) => (
              <TransactionRow parties={data.parties} key={idx} tx={tx} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
