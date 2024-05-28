import TransactionListClient from "./client";
import { fetchTransactions } from "./fetch";

export default async function TransactionList() {
  const data = await fetchTransactions();
  return <TransactionListClient txData={data} />;
}
