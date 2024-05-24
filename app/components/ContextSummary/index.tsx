import { CHAIN_NAMES } from "@/app/chains";
import { AssetType, ContextSummaryType } from "@once-upon/evm-context";
import {
  formatToken,
  getBgColorByCategory,
  getNameForAddress,
  getNativeCurrency,
  getPartyForAddress,
  truncateMiddle,
} from "@/utils";
import { Fragment } from "react";
import FarcasterInline from "../FarcasterInline";

const space = <>&#8196;</>;

function ContextSummary({
  tx,
  chainId,
  parties,
}: {
  tx: any;
  chainId: number;
  parties: any;
}) {
  const context = tx.context;
  const summaryTemplate =
    context.summaries.en.long ?? context.summaries.en.default;
  if (!summaryTemplate) return null;

  const regex = /(\[\[.*?\]\])/;
  const parts = summaryTemplate.split(regex).filter((x: any) => x);
  const filteredParts = parts.filter((part: any) => part.trim().length > 0);

  const formattedParts = filteredParts.map((part: any, i: number) => {
    if (isVariable(part)) {
      const variableName = part.slice(2, -2);
      const varContext = context.variables[variableName];

      return (
        <Fragment key={i}>
          {formatSection(chainId, varContext, i, tx, parties)}

          {space}
        </Fragment>
      );
    } else {
      return strWithSpaces(part, i);
    }
  });

  return (
    <div className="line-clamp-2 w-full max-h-[42px]">{formattedParts}</div>
  );
}

function isVariable(str: string) {
  return str.startsWith("[[") && str.endsWith("]]");
}

function strWithSpaces(str: string, i: number) {
  str = str.trim() + " ";

  return (
    <span key={`${str}-${i}`} className="inline-flex">
      <span>{str}</span>
      <span>{space}</span>
    </span>
  );
}

export function ContextActionPill({
  category,
  value,
  label,
  isDarkMode = false,
}: {
  category: ContextSummaryType["category"];
  value: string;
  label?: string;
  isDarkMode?: boolean;
}) {
  const colorClasses = getBgColorByCategory(category || "UNKNOWN");

  // change screaming snake case to lower case with spaces
  const decodedValue = value.replace(/_/g, " ").toLowerCase();

  return (
    <span
      className={`inline-flex items-center gap-1 px-1.5 py-0 lh rounded transition duration-250 ${colorClasses} ${
        isDarkMode ? "invert contrast-150 brightness-75" : ""
      }`}
    >
      {label || decodedValue}
    </span>
  );
}

function formatSection(
  chainId: number,
  section: any,
  i: number,
  tx: any,
  parties: any
) {
  const varContext = section;

  const varKey = i;

  if (varContext?.type === "contextAction") {
    return (
      <ContextActionPill
        category={tx.context?.summaries?.category}
        value={varContext?.value}
      />
    );
  }

  if (varContext?.type === "string" && varContext?.emphasis) {
    return <span className="font-semibold lh">{varContext?.value}</span>;
  }

  // TODO: Make this non-emphasis version DRY
  if (varContext?.type === "string") {
    return <span className="lh">{varContext?.value}</span>;
  }

  if (varContext?.type === "number" && varContext?.emphasis) {
    return (
      <span className="font-semibold lh">
        {varContext?.value} {varContext?.unit ? varContext?.unit : null}
      </span>
    );
  }

  if (varContext?.type === "chainID") {
    return (
      <span className="lh">
        {/* check if we have a chain id  */}
        {varContext?.value
          ? // and it is in our list of chains
            CHAIN_NAMES.hasOwnProperty(varContext.value)
            ? // if so, show the chain name
              CHAIN_NAMES[varContext.value]
            : // otherwise show the chain id
              `chain ID ${varContext.value}`
          : //  if we don't have a chain id show 'unknown chain'
            "Unknown chain"}
      </span>
    );
  }

  // TODO: Make this non-emphasis version DRY
  if (varContext?.type === "number") {
    return (
      <span className="lh">
        {varContext?.value} {varContext?.unit ? varContext?.unit : null}
      </span>
    );
  }

  if (varContext?.type === "link") {
    const truncate = varContext?.truncate;
    const value = varContext?.value;

    return (
      <span className="font-semibold lh">
        {value && <a>{truncate ? truncateMiddle(value) : value}</a>}
      </span>
    );
  }

  if (varContext?.type === "farcasterID") {
    // const { data: farcaster } = useFarcasterHandle(varContext?.value);
    // const name = getUsernameFromFID(varContext?.value, tx);
    const name = varContext?.value;

    return (
      <span className="font-semibold lh">
        {varContext?.value} {name && <a>(@{name})</a>}
      </span>
    );
  }

  if (varContext?.type === "referrer") {
    return <span className="font-semibold lh">{varContext?.value}</span>;
  }

  if (varContext?.type === "chainID") {
    return (
      <Fragment key={varKey}>
        <span>{"chain"}&nbsp;</span>
        <span className="font-semibold lh min-w-max">
          {`${varContext?.value}`}
        </span>
      </Fragment>
    );
  }

  if (varContext?.type === "address") {
    const name = getNameForAddress(varContext?.value, parties);
    const isRegularAddress = name.startsWith("0x");
    const isFarcasterName = name.startsWith("@");

    return (
      <span key={varKey} className="inline-flex font-normal lh">
        <span className={isRegularAddress ? "" : "font-semibold"}>
          {isFarcasterName ? (
            <span className="mr-0.5">
              <FarcasterInline />
            </span>
          ) : null}
          {name}
        </span>
      </span>
    );
  }

  if (
    varContext?.type === AssetType.ETH ||
    varContext?.type === AssetType.DEGEN
  ) {
    return (
      <span key={varKey} className="font-semibold lh">
        {`${formatToken(varContext?.value)} ${getNativeCurrency(chainId)}`}
      </span>
    );
  }

  if (varContext?.type === "erc721" || varContext?.type === "erc1155") {
    const fallback = "";
    let img: string = fallback; // Initialize img with fallback as default

    // Construct addressWithToken only if varContext.token is present
    if (varContext.token) {
      let addressWithToken: string | null = null;

      // If tokenId is present, construct addressWithToken and try to find a matching imageUrl
      if (varContext.tokenId) {
        addressWithToken = `${varContext.token}-${varContext.tokenId}`;
        img = tx.assetsEnriched[addressWithToken]?.imageUrl || fallback;
      } else {
        // If tokenId is not present, find the first match in tx.assetsEnriched based on the contract address
        const assetKeys = Object.keys(tx.assetsEnriched);
        const foundKey = assetKeys.find((key) =>
          key.startsWith(`${varContext.token}-`)
        );
        if (foundKey) {
          img = tx.assetsEnriched[foundKey]?.imageUrl || fallback;
        }
        // If no matching key is found, img remains set to the fallback
      }
    }

    const contract = varContext.token;
    const tokenId = varContext.tokenId;
    const name = getNameForAddress(contract, parties);

    return (
      <span>
        {name !== " " && (
          <span>
            <span>{name}</span>
          </span>
        )}{" "}
        {tokenId && (
          <span className="inline-flex items-center gap-2 font-semibold">
            {truncateMiddle(` #${tokenId}`)}
          </span>
        )}
      </span>
    );
  }

  if (varContext?.type === "erc20") {
    const party = getPartyForAddress(varContext?.token, parties);

    if (party) {
      const symbolText = getNameForAddress(varContext?.token, parties);
      const decimals =
        party.decimals !== undefined && party.decimals !== null
          ? party.decimals
          : "18";
      const decimalPlaces = 2;
      const formattedValue = formatToken(
        varContext?.value,
        decimals,
        decimalPlaces
      );

      return (
        <span className="font-semibold">
          {`${formattedValue} `}
          {symbolText}
        </span>
      );
    }
  }

  if (varContext?.type === "transaction") {
    return <div>{varContext?.value}</div>;

    // <ContextColumnLink key={varKey} id={varContext?.value} noAvatar />;
  }
}

export default ContextSummary;
