import TransactionList from "./components/TransactionList/index";
import Nav from "./components/Nav";

export default function Home() {
  return (
    <div className="px-4 sm:px-12 py-4 flex flex-col gap-8">
      <Nav />
      <TransactionList />
    </div>
  );
}
