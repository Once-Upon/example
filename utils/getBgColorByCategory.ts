export const getBgColorByCategory = (category: string): string => {
  switch (category) {
    case "NFT":
      return "text-orange bg-orange-light";
    case "FUNGIBLE_TOKEN":
      return "text-green bg-green-light";
    case "CORE":
      return "text-blue bg-blue-light";
    case "IDENTITY":
      return "text-yellow bg-yellow-light";
    case "OTHER":
      return "text-gray-800 bg-gray-300";
    case "MULTICHAIN":
      return "text-red bg-red-light";
    case "DEV":
      return "text-brown bg-brown-light";
    case "UNKNOWN":
      return "text-gray-700 bg-gray-200";
    case "PROTOCOL_1":
      return "text-purple-100 bg-purple-800";
    case "PROTOCOL_2":
      return "text-purple-200 bg-purple-600";
    case "PROTOCOL_3":
      return "text-purple-600 bg-purple-300";
    case "PROTOCOL_4":
      return "text-purple-600 bg-purple-200";
    case "PROTOCOL_5":
      return "text-purple-800 bg-purple-100";
    default:
      return "text-gray-700 bg-gray-200";
  }
};
