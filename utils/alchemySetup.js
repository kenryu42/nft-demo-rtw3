import { Network, Alchemy } from "alchemy-sdk";

const alchemyApiKey = process.env.ALCHEMY_API_KEY;

const settings = {
    apiKey: alchemyApiKey,
    network: Network.ETH_MAINNET,
};

export const alchemy = new Alchemy(settings);
