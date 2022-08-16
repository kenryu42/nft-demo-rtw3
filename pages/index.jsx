import { useState } from "react";
import { ethers } from "ethers";
import { NFTCard } from "../components/nftCard";
import { BiArrowToTop } from "react-icons/bi";
import ScrollToTop from "react-scroll-to-top";
import useSWR from "swr";

const fetcher = (url) => fetch(url).then((r) => r.json());

const Home = () => {
    const [nfts, setNfts] = useState([]);
    const [walletAddress, setWalletAddress] = useState("");
    const [collectionAddress, setCollectionAddress] = useState("");
    const [fetchforCollection, setFetchforCollection] = useState(false);
    const [ownerPageKey, setOwnerPageKey] = useState("");
    const [collectionPageKey, setCollectionPageKey] = useState("");
    const isWalletAddress = ethers.utils.isAddress(walletAddress);
    const isContractAddress = ethers.utils.isAddress(collectionAddress);

    const { data: nftsForOwner } = useSWR(
        (isWalletAddress || (isWalletAddress && isContractAddress)) &&
            !fetchforCollection
            ? `/api/getNfts/${walletAddress}/${collectionAddress}/${ownerPageKey}`
            : null,
        fetcher
    );

    const { data: nftsCollection } = useSWR(
        fetchforCollection && isContractAddress
            ? `/api/getNftsForContract/${collectionAddress}/${collectionPageKey}`
            : null,
        fetcher
    );

    const handlerClick = () => {
        console.log("fetching nfts");
        setCollectionPageKey("");
        setOwnerPageKey("");

        if (nftsCollection) {
            setNfts(nftsCollection.nfts);
            setCollectionPageKey(nftsCollection.pageKey ?? "");
        } else if (nftsForOwner) {
            setNfts(nftsForOwner.ownedNfts);
            setOwnerPageKey(nftsForOwner.pageKey ?? "");
        }
    };

    const handlerLoad = () => {
        console.log("fetching more nfts");

        if (nftsCollection) {
            setNfts([...nfts, ...nftsCollection.nfts]);
            setCollectionPageKey(nftsCollection.pageKey ?? "");
        } else if (nftsForOwner) {
            setNfts([...nfts, ...nftsForOwner.ownedNfts]);
            setOwnerPageKey(nftsForOwner.pageKey ?? "");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center py-8 gap-y-3">
            <div className="flex flex-col w-full justify-center items-center gap-y-2">
                <input
                    type="text"
                    disabled={fetchforCollection}
                    className="w-2/5 bg-slate-100 mb-2 p-2 rounded-lg text-gray focus:outline-blue-300 disabled:bg-slate-50 disabled:text-gray-50 disabled:cursor-not-allowed"
                    onChange={(e) => setWalletAddress(e.target.value)}
                    placeholder="Add your wallet address"
                />
                <input
                    type="text"
                    className="w-2/5 bg-slate-100 p-2 rounded-lg text-gray focus:outline-blue-300 disabled:bg-slate-50 disabled:text-gray-50"
                    onChange={(e) => setCollectionAddress(e.target.value)}
                    placeholder="Add the collection address"
                />
                <label className="text-gray-600 my-2">
                    <input
                        type="checkbox"
                        className="mr-2"
                        onChange={(e) =>
                            setFetchforCollection(e.target.checked)
                        }
                    />
                    Fetch for collection
                </label>
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
                    onClick={() => handlerClick()}
                >
                    Let&apos;s go
                </button>
            </div>
            <div className="flex flex-wrap gap-y-12 mt-4 w-5/6 gap-x-2 justify-center">
                {nfts.map((nft, idx) => {
                    return <NFTCard nft={nft} key={idx} />;
                })}
            </div>
            {(ownerPageKey || collectionPageKey) && (
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
                    onClick={() => handlerLoad()}
                >
                    Load more
                </button>
            )}
            <ScrollToTop
                className="flex justify-center items-center hover:animate-bounce"
                smooth
                component={<BiArrowToTop className="w-16 h-16" />}
            />
        </div>
    );
};

export default Home;
