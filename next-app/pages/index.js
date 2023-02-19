import Head from "next/head";
import Image from "next/image";

import React, { useEffect, useState } from "react";
import abi from "../helpers/Reflow/Reflow.json";
import { ethers } from "ethers";

import { useContractRead } from "wagmi";
import { useAccount, useSigner } from "wagmi";
import { chain, chainId, useNetwork } from "wagmi";
import { CustomConnectWalletButton } from "@/components/CustomConnectWalletButton";

import * as PushAPI from "@pushprotocol/restapi";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Home = () => {
	const REFLOW_ADDRESS = "0x78958e8057C457E10351Fd38ff8b9aC0645556C8";
	const REFLOW_ABI = abi.abi;
	const FDAIX = "0x5D8B4C2554aeB7e86F387B4d6c00Ac33499Ed01f";

	const [prevNotifications, setPrevNotifications] = useState(0);

	const {
		data: currFlowRate,
		isError,
		isLoading,
	} = useContractRead({
		address: REFLOW_ADDRESS,
		abi: REFLOW_ABI,
		functionName: "currFlowRate",
		watch: true,
		cacheOnBlock: true,
	});

	const [currRate, setCurrRate] = useState({
		_hex: 0x0,
	});

	const [event, setEvent] = useState(false);
	const [isInitial, setIsInitial] = useState(true);

	const { address, isConnected } = useAccount();
	const { data: signer } = useSigner();

	const [flowRate, setFlowRate] = useState(0);

	const [toAddress, setToAddress] = useState("");

	const startStream = async () => {
		try {
			const Reflow = new ethers.Contract(
				REFLOW_ADDRESS,
				REFLOW_ABI,
				signer
			);

			const txn = await Reflow.createFlowFromContract(
				FDAIX,
				toAddress,
				flowRate
			);

			await txn.wait();

			setEvent(!event);
		} catch (err) {
			console.log(err);
		}
	};

	const endStream = async () => {
		try {
			const Reflow = new ethers.Contract(
				REFLOW_ADDRESS,
				REFLOW_ABI,
				signer
			);

			const txn = await Reflow.deleteFlowFromContract(FDAIX, toAddress);

			await tx.wait();

			setEvent(!event);
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		if (currFlowRate !== undefined && currRate._hex !== currFlowRate._hex) {
			setCurrRate(currFlowRate);
		}
	}, [currFlowRate]);

	useEffect(() => {
		const getNotifications = async () => {
			try {
				const notifications = await PushAPI.user.getFeeds({
					user: "eip155:80001:0x20136F73c536Db9D061b078146D7694cd4Bd0aEA",
					spam: true,
					env: "staging",
				});

				if (!isInitial) {
					if (
						notifications !== undefined &&
						prevNotifications !== notifications.length
					) {
						toast.success(notifications[0].title, {
							position: "top-right",
							autoClose: 2000,
							hideProgressBar: false,
							closeOnClick: true,
							pauseOnHover: true,
							draggable: true,
							progress: undefined,
							theme: "light",
							className: "rounded-xl",
						});

						setPrevNotifications(notifications.length);
					}
				}

				setPrevNotifications(notifications.length);

				if (isInitial) {
					setIsInitial(false);
				}
			} catch (err) {
				console.log(err);
			}
		};

		if (isConnected) {
			getNotifications();
		}
	}, [address, event, currRate]);

	return (
		<>
			<Head>
				<title>Reflow</title>
				<meta
					name="description"
					content="Generated by create next app"
				/>
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1"
				/>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<div
				className="flex flex-row sticky top-0 w-full items-center place-content-center bg-isGrayLightEmphasis6
			text-isGrayDarkEmphasis6 "
			>
				<div
					className="flex fle-row max-w-4xl w-full justify-between bg-isWhite mt-[12px] rounded-2xl
				py-[6px] px-[8px] items-center shadow-sm
				"
				>
					<button
						className="flex flex-col items-center font-bold text-xl 
						bg-isPinkDark text-isWhite shadow-sm py-[4px] px-[12px]
						rounded-xl  transition delay-50 duration-300 hover:bg-isPinkDarkEmphasis"
					>
						Reflow
					</button>

					<CustomConnectWalletButton />
				</div>
			</div>

			<main
				className="flex flex-col items-center place-content-center -mt-[25px]
			p-[12px] bg-isGrayLightEmphasis6 w-full min-h-screen text-isGrayDarkEmphasis6"
			>
				<div className="text-7xl font-bold drop-shadow-sm">
					Self-Mutating{" "}
					<span
						className="text-isWhite bg-gradient-to-br from-isBlueLight to-isBlueDark py-[2px] px-[12px] 
					rounded-xl "
					>
						Reward Streams
					</span>
				</div>
				<div className="mt-[6px] mb-[12px] text-xl font-semibold text-isGrayLight2">
					Create automated reward flows in real-time which stream +
					update themselves.
				</div>

				<div className="flex flex-row items-center text-xl font-bold mt-[25px]">
					<button
						className="flex flex-col items-center font-bold text-xl 
						bg-isBlueDark text-isWhite shadow-sm py-[4px] px-[12px] m-[12px]
						rounded-xl hover:bg-isBlueDarkEmphasis transition delay-50 duration-300 "
					>
						Flow Rate
					</button>
					<input
						value={flowRate}
						onChange={(e) => {
							setFlowRate(e.target.value);
						}}
						className="flex flex-col items-center font-bold text-xl 
						bg-isGrayLight5 text-isGrayDarkEmphasis3 shadow-sm py-[4px] px-[12px] ml-[0px] m-[12px]
						rounded-xl  transition delay-50 duration-300 outline-none"
						placeholder="Per Sec Rate in Number"
						type="number"
					/>
				</div>

				<div className="flex flex-row items-center text-xl font-bold -mt-[12px]">
					<button
						className="flex flex-col items-center font-bold text-xl 
						bg-isBlueDark text-isWhite shadow-sm py-[4px] px-[12px] m-[12px]
						rounded-xl hover:bg-isBlueDarkEmphasis transition delay-50 duration-300 "
					>
						To Address
					</button>
					<input
						value={toAddress}
						onChange={(e) => {
							setToAddress(e.target.value);
						}}
						className="flex flex-col items-center font-bold text-xl w-[450px]
						bg-isGrayLight5 text-isGrayDarkEmphasis3 shadow-sm py-[4px] px-[12px] ml-[0px] m-[12px]
						rounded-xl  transition delay-50 duration-300 outline-none"
						placeholder="Receiver Address"
						type="text"
					/>
				</div>

				<div className="flex flex-row items-center -mt-[12px]">
					<button
						className="flex flex-col items-center font-bold text-xl 
						bg-isGreenDark text-isWhite shadow-sm py-[4px] px-[12px] m-[12px]
						rounded-xl hover:bg-isGreenDarkEmphasis transition delay-50 duration-300 "
						onClick={() => {
							startStream();
						}}
					>
						Start Reward Stream
					</button>

					<button
						className="flex flex-col items-center font-bold text-xl 
						bg-isRedDark text-isWhite shadow-sm py-[4px] px-[12px] ml-[0px] m-[12px]
						rounded-xl hover:bg-isRedDarkEmphasis transition delay-50 duration-300"
						onClick={() => {
							endStream();
						}}
					>
						Cancel Reward Stream
					</button>
				</div>

				<div className="flex flex-row items-center mt-[25px]">
					<button
						className="flex flex-col items-center font-bold text-xl 
						bg-isBlueDark text-isWhite shadow-sm py-[4px] px-[12px] m-[12px]
						rounded-xl hover:bg-isBlueDarkEmphasis transition delay-50 duration-300 "
					>
						Current Flow Rate
					</button>

					<button
						className="flex flex-col items-center font-bold text-xl 
						bg-isGrayLight text-isWhite shadow-sm py-[4px] px-[12px] ml-[0px] m-[12px]
						rounded-xl hover:bg-isGrayLight2 transition delay-50 duration-300
						animate-pulse ease-in-out"
					>
						{parseInt(currRate._hex, 16)} fDAIx / sec
					</button>
				</div>
			</main>
			<ToastContainer />
		</>
	);
};

export default Home;