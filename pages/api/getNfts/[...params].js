import { alchemy } from "../../../utils/alchemySetup";

export default async function handler(req, res) {
    let filter = {};
    const { params } = req.query;
    const [ownerAddress, contractAddress, pageKey] = params;

    console.log(`getting nfts for owner`);
    console.log(`ownerAddress: ${ownerAddress}`);

    if (contractAddress && pageKey) {
        filter = {
            contractAddresses: [contractAddress],
            pageKey: pageKey,
        };
    } else if (contractAddress) {
        filter = {
            contractAddresses: [contractAddress],
        };
    }
    const nfts = await alchemy.nft
        .getNftsForOwner(ownerAddress, filter)
        .then((data) => data);

    res.status(200).json(nfts);
}
