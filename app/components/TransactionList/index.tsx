"use client";

import { useState } from "react";
import PaginationButton from "./PaginationButtons";
import TransactionRow from "./TransactionRow";
import { fetchTransactions } from "@/app/examples/fetchTransactions";
import { TransactionQueryResponse } from "@once-upon/evm-context";
import Loading from "./Loading";

export default function TransactionListClient({
  txData,
  isServer = false,
}: {
  txData: TransactionQueryResponse;
  isServer?: boolean;
}) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<TransactionQueryResponse>(txData);

  const fetchNextPage = async (cursor: string | null) => {
    setLoading(true);
    try {
      const fetchedData = await fetchTransactions(cursor);
      setData(fetchedData);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleClick = () => fetchNextPage(data.nextCursor);
  const isLoading = loading || data?.transactions.length === 0;

  return (
    <div className="flex sm:min-h-screen flex-col items-center sm:min-w-1/2 justify-between sm:w-1/2">
      <div className="min-w-full w-full">
        <div className="border-b pb-2 flex justify-between items-center">
          <h1 className="pb-2 font-semibold">
            {isServer ? "Server" : "Client"}-side Rendering Example
          </h1>
          <PaginationButton isDisabled={isLoading} onClick={handleClick} />
        </div>
        {isLoading ? (
          <Loading />
        ) : (
          <div className="divide-y max-h-[500px] sm:max-h-full sm:overflow-auto overflow-y-scroll border-b sm:border-none">
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
