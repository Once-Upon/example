import { url, options } from "./config";
import TransactionRow from "../TransactionRow";

export default async function TransactionList() {
  const res = await fetch(url, options);

  if (!res.ok) {
    console.log(await res.json());
    throw new Error("Failed to fetch data");
  }

  const data = await res.json();
  const transactions = data.transactions;
  const parties = data.partiesEnriched;

  return (
    <div>
      {transactions?.length > 0 ? (
        transactions.map((tx: any) => (
          <TransactionRow parties={parties} key={tx.hash} tx={tx} />
        ))
      ) : (
        <div />
      )}
    </div>
  );
}
