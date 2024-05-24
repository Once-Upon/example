import { BigNumber } from "ethers";
import { commify, formatUnits } from "ethers/lib/utils";

const MAX_BIG_NUM = BigNumber.from(2).pow(256).sub(1);

export function formatToken(_value: any, decimals = 18, limit = 3): string {
  try {
    const value = String(_value);
    if (MAX_BIG_NUM.toString() === value) return "ALL";
    return limitDecimals(
      commify(formatUnits(BigNumber.from(value), decimals)),
      limit
    );
  } catch (error) {
    console.log("formatToken ERROR", error);
    return "--";
  }
}

function limitDecimals(numStr: string, limit = 3): string {
  if (numStr.indexOf(".") === -1) return numStr;
  const [whole, decimal] = numStr.split(".");
  if (whole === "0" && decimal === "0".repeat(decimal.length)) return "0";

  let fixed = limit;
  let shownDecimals = decimal.slice(0, fixed);
  while (whole === "0" && shownDecimals === "0".repeat(fixed)) {
    fixed += 1;
    shownDecimals = decimal.slice(0, fixed);
  }
  const r = limit ? `${whole}.${decimal.substring(0, fixed)}` : whole;
  return r;
}
