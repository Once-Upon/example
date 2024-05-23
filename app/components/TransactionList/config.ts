const url = `${process.env.NEXT_PUBLIC_ONCE_UPON_NEST_API_URL}/v3/transactions`;

const params = {
  contextAddresses: [
    {
      address: "0xD19BF5F0B785c6f1F6228C72A8A31C9f383a49c4",
      toFromAll: "All",
    },
  ],
  filterAddresses: [],
  dateRange: {},
  sort: -1,
  limit: 0,
  functionSelectors: [],
  tokenTransfers: [],
  chainIds: [0],
  blockNumber: 0,
  contextActions: [],
  excludes: [],
  cursor: null,
};

const options = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(params),
};

export { url, options };
