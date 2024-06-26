import { TransactionQueryResponse } from "@once-upon/evm-context";

export async function fetchTransactions(
  cursor: string | null = null
): Promise<TransactionQueryResponse> {
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
    includes: ["partiesEnriched", "assetsEnriched"],
    limit: 25,
    functionSelectors: [],
    chainIds: [0], // all chains
    contextActions: ["MINTED", "SWAPPED"],
    excludes: [],
  };

  const getParams = (cursor: string | null = null) => ({
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...params, cursor }),
  });

  try {
    const res = await fetch(url, getParams(cursor));
    if (!res.ok) throw new Error("Failed to fetch data");
    const data = await res.json();
    return data as TransactionQueryResponse;
  } catch (error) {
    console.error("Error fetching transactions:", error);
    return { transactions: [], cursor: null };
  }
}
