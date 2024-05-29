import TransactionList from "@/app/components/TransactionList";
import { fetchTransactions } from "../fetchTransactions";

export default async function ServerRenderedExample() {
  const data = await fetchTransactions();
  return <TransactionList txData={data} isServer />;
}
