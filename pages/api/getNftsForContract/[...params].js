import { alchemy } from "../../../utils/alchemySetup";

export default async function handler(req, res) {
    const { params } = req.query;
    const [address, pageKey] = params;

    console.log(`getting nft collection`);
    console.log(`contract address: ${address}`);
    const nfts = await alchemy.nft
        .getNftsForContract(address, pageKey ? { pageKey: pageKey } : {})
        .then((data) => data);

    res.status(200).json(nfts);
}
