import TransactionListClient from "./client";
import { fetchTransactions } from "../fetchTransactions";

export default async function TransactionList() {
  const data = await fetchTransactions();
  return <TransactionListClient txData={data} />;
}
