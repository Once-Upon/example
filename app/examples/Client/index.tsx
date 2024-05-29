"use client";

import { useState, useEffect } from "react";
import { fetchTransactions } from "../fetchTransactions";
import { TransactionQueryResponse } from "@once-upon/evm-context";
import TransactionList from "@/app/components/TransactionList";

export default function ClientRenderedExample() {
  const [data, setData] = useState<TransactionQueryResponse | null>(null);
  const [loading, setLoading] = useState(true);

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

  if (loading || !data) {
    return <div className="pt-24 w-1/2 text-center">Loading...</div>;
  }

  return <TransactionList txData={data} isServer={false} />;
}
