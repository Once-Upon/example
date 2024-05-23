import { CHAIN_NAMES } from "@/app/chains";
import { url, options } from "./config";
import ContextSummary from "../ContextSummary";
import ChainLogo from "../ChainLogo";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import NFTImage from "../NFTImage";
import {
  BadgeAlert,
  CircleAlert,
  CircleX,
  FileCode2,
  TriangleAlert,
} from "lucide-react";
dayjs.extend(localizedFormat);

export default async function TransactionList() {
  const res = await fetch(url, options);

  if (!res.ok) {
    console.log(await res.json());
    throw new Error("Failed to fetch data");
  }
  const data = await res.json();
  // console.log("cursor", data.cursor);
  const transactions = data.transactions;

  return (
    <div>
      {transactions?.length > 0 &&
        transactions.map((tx: any) => {
          const isFailed = !tx.receipt.status;
          const chainId = tx?.chainId as number;
          const date = dayjs.unix(tx.timestamp).format("ll").replace(",", "");
          const time = dayjs.unix(tx.timestamp).format("LT");

          const category = tx?.context?.summaries?.category || "";

          const type: string =
            tx.context?.summaries?.en?.title !== ""
              ? tx.context.summaries.en.title
              : tx.decode?.name || (tx.sigHash !== "0x" ? tx.sigHash : "--");
          const showProtocol = category.includes("PROTOCOL");

          const assets: {
            imageUrl?: string;
          }[] = Object.values(tx.assetsEnriched);

          const firstAsset = assets[0];
          const imageUrl = firstAsset?.imageUrl;
          return (
            <div
              key={tx.hash}
              className="flex gap-4 p-4 my-4 rounded-lg bg-gray-100"
            >
              <div className="flex gap-4 items-center">
                {firstAsset && imageUrl ? (
                  <NFTImage img={imageUrl} />
                ) : (
                  <div className="h-[75px] w-[75px] shrink-0 flex justify-center bg-gray-200 items-center rounded-lg transition duration-250">
                    <span className={`inline-flex items-center gap-[4px] lh`}>
                      <FileCode2
                        size={22}
                        strokeWidth={1.5}
                        absoluteStrokeWidth
                      />
                    </span>
                  </div>
                )}

                <div className="flex gap-4 w-full flex-col">
                  <ContextSummary tx={tx} chainId={tx.chainId} />

                  <div className="flex items-center gap-1 text-[12px] text-gray-500 leading-[16px]">
                    {isFailed && (
                      <>
                        <BadgeAlert size={12} className="text-red" />
                        <span className="text-red">Failed</span>
                        <span className="text-[6px]">•</span>
                      </>
                    )}

                    <ChainLogo chainId={tx.chainId} size={12} />
                    <div>{CHAIN_NAMES[chainId]}</div>

                    <span className="text-[6px]">•</span>

                    <span>
                      {date}, {time}
                    </span>

                    {showProtocol && (
                      <>
                        <span className="text-[6px]">•</span>
                        <span>{type}</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
}
