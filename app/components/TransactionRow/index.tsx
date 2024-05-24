import { CHAIN_NAMES } from "@/app/chains";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import { ArrowRight, BadgeAlert, FileCode2 } from "lucide-react";
import ChainLogo from "../ChainLogo";
import ContextSummary from "../ContextSummary";
import NFTImage from "../NFTImage";
dayjs.extend(localizedFormat);

const TransactionRow = ({ tx, parties }: any) => {
  const isFailed = !tx.receipt.status;
  const chainId = tx?.chainId as number;
  const date = dayjs.unix(tx.timestamp).format("ll").replace(",", "");
  const time = dayjs.unix(tx.timestamp).format("LT");

  const category = tx?.context?.summaries?.category || "";
  const showProtocol = category.includes("PROTOCOL");

  const assets: {
    imageUrl?: string;
  }[] = Object.values(tx.assetsEnriched);

  const firstAsset = assets[0];
  const imageUrl = firstAsset?.imageUrl;

  return (
    <div key={tx.hash} className="flex gap-4 py-4">
      <div className="flex gap-4 items-center justify-between w-full">
        <>
          {firstAsset && imageUrl ? (
            <NFTImage img={imageUrl} />
          ) : (
            <div className="h-[75px] w-[75px] shrink-0 flex justify-center bg-gray-100 border items-center rounded-lg transition duration-250">
              <span className={`inline-flex items-center gap-[4px] lh`}>
                <FileCode2 size={22} strokeWidth={1.5} absoluteStrokeWidth />
              </span>
            </div>
          )}

          <div className="flex gap-4 w-full flex-col">
            <ContextSummary parties={parties} tx={tx} chainId={tx.chainId} />

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
                  <span>{tx.context?.summaries?.en?.title}</span>
                </>
              )}
            </div>
          </div>
        </>

        <div
          className="hidden sm:block p-2 rounded-lg cursor-pointer border transition duration-200 hover:bg-gray-50"
          onClick={() => window.open(`https://www.onceupon.xyz/${tx.hash}`)}
        >
          <ArrowRight size={12} strokeWidth={1.5} absoluteStrokeWidth />
        </div>
      </div>
    </div>
  );
};

export default TransactionRow;
