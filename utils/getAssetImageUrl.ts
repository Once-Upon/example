export const getAssetImageUrl = (tx: any, assets: any): string => {
  const token = tx.context?.variables?.token;
  const tokenId = token?.tokenId;
  const tokenKey = token?.token ? `${token.token}-${tokenId}` : null;

  const firstAsset = tokenKey ? assets[tokenKey] : null;
  const imageUrl = firstAsset?.imageUrl || "";

  return imageUrl;
};
