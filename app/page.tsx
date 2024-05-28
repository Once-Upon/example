import Nav from "./components/Nav";
import TransactionListClient from "./components/TransactionList/examples/Client";
import TransactionListServer from "./components/TransactionList/examples/Server/server";

export default function Home() {
  return (
    <div className="px-4 sm:px-12 py-4 flex flex-col gap-8">
      <Nav />
      <TransactionListServer />
      {/* <TransactionListClient /> */}
    </div>
  );
}
