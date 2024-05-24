import TransactionList from "./components/TransactionList/index";

export default function Home() {
  return (
    <div className=" flex min-h-screen flex-col items-center justify-between p-4 sm:px-48 sm:py-24">
      <TransactionList />
    </div>
  );
}
