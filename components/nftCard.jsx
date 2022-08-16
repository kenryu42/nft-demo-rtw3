/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { FiCopy } from "react-icons/fi";
import { toast } from "react-toastify";
import { LazyLoadImage } from "react-lazy-load-image-component";

export const NFTCard = ({ nft }) => {
    const shortAddress = (address) =>
        address.substr(0, 4) + "..." + address.substr(address.length - 4);

    return (
        <div className="w-1/4 flex flex-col">
            <div className="rounded-md">
                <LazyLoadImage
                    alt={nft.title}
                    src={nft.media[0]?.gateway}
                    className="object-cover w-full h-128 rounded-t-md"
                />
            </div>
            <div className="flex flex-col y-gap-2 px-2 py-3 bg-slate-100 rounded-b-md">
                <div>
                    <h2 className="font-medium text-center text-lg text-gray-800 my-1">
                        {nft.title || `#${nft.tokenId}`}
                    </h2>
                    <p className="text-gray-600 my-2 px-1">
                        Token Id: {nft.tokenId.substr(0, 10)}
                    </p>
                    <p className="text-gray-600 my-2 px-1">
                        {shortAddress(nft.contract.address)}
                        <CopyToClipboard
                            title="Copy"
                            text={nft.contract.address}
                            onCopy={() => toast.info("Copied!")}
                        >
                            <FiCopy className="inline ml-2 hover:stroke-blue-500 cursor-pointer" />
                        </CopyToClipboard>
                    </p>
                </div>
                <div className="flex-grow px-1 mt-1">
                    <p>{nft.description?.substr(0, 150)}</p>
                </div>
                <div className="flex justify-center mb-1">
                    <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href={`https://etherscan.io/token/${nft.contract.address}`}
                        className="shadow-md shadow-slate-800 m-2 px-2 pt-2 rounded-lg text-blue-500 bg-white"
                    >
                        <Image
                            src="/etherscan-logo.svg"
                            alt="etherscan-logo"
                            width={80}
                            height={25}
                        />
                    </a>
                </div>
            </div>
        </div>
    );
};
