import { TransactionContextType } from "@once-upon/evm-context";

export type TransactionQueryResponse = {
  // List of enriched transactions
  transactions: TransactionEnriched[];

  // Pagination cursor
  cursor: string | null;

  // Party metadata, if included
  // partiesEnriched?: { [key: string]: PartyEnriched };
  partiesEnriched?: { [key: string]: any };

  // Asset metadata, if included
  // assetsEnriched?: { [key: string]: AssetEnriched };
  assetsEnriched?: { [key: string]: any };
};

type TransactionEnriched = {
  // Addresses involved in this transaction (TODO: Stricter type for address/NFT locator)
  parties: string[];

  // Context from https://github.com/Once-Upon/context/blob/main/src/types/transaction.ts
  context: TransactionContextType;

  // Summary of assets that changed ownership in this transaction
  netAssetTransfers: {
    [address: string]: {
      received: [{ type: any; contract: any; value: any; tokenId?: any }];
      sent: [{ type: any; contract: any; value: any; tokenId?: any }];
    };
  };

  // All asset transfers during this transaction
  assetTransfers: {
    from: any;
    to: any;
    value: any;
    type: any;
    contract: any;
    tokenId: any;
  }[];

  // Processed pseudotransactions (EIP 4337)
  pseudotransactions?: any[];
} & any; // Includes standard Viem type

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
    tokenTransfers: [],
    chainIds: [0], // all chains
    contextActions: ["MINTED", "SWAPPED"],
    excludes: [],
  };

  const getOptions = (cursor: string | null = null) => ({
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...params, cursor }),
  });

  try {
    const res = await fetch(url, getOptions(cursor));
    if (!res.ok) throw new Error("Failed to fetch data");
    const data = await res.json();
    return data as TransactionQueryResponse;
  } catch (error) {
    console.error("Error fetching transactions:", error);
    return { transactions: [], cursor: null };
  }
}
