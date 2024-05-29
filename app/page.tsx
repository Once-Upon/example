import Nav from "./components/Nav";
import ClientRenderedExample from "./examples/Client";
import ServerRenderedExample from "./examples/Server";

export default function Home() {
  return (
    <div className="px-4 sm:px-12 py-4 flex flex-col gap-8">
      <Nav />

      <div className="flex gap-12 sm:gap-24 flex-col sm:flex-row justify-between sm:pb-24">
        <ServerRenderedExample />
        <ClientRenderedExample />
      </div>
    </div>
  );
}
