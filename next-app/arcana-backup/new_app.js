import "@/styles/globals.css";
import { AuthProvider } from "@arcana/auth";

import { getAuth } from "../arcana-backup/auth/getArcanaAuth";
import { ProvideAuth } from "../arcana-backup/auth/useArcanaAuth";

import { connectorsForWallets } from "@rainbow-me/rainbowkit";
import { metaMaskWallet } from "@rainbow-me/rainbowkit/wallets";
import { ArcanaConnector } from "@arcana/auth-wagmi";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { polygonMumbai } from "@wagmi/core/chains";
import { publicProvider } from "wagmi/providers/public";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";

export const ArcanaRainbowConnector = ({ chains }) => {
	return {
		id: "arcana-auth",
		name: "Arcana Wallet",
		iconUrl: "",
		iconBackground: "#101010",
		createConnector: () => {
			const connector = new ArcanaConnector({
				chains,
				options: {
					appId: process.env.NEXT_PUBLIC_ARCANA_APP_ID,
				},
			});
			return {
				connector,
			};
		},
	};
};

const connectors = (chains) =>
	connectorsForWallets([
		{
			groupName: "Recommended",
			wallets: [
				ArcanaRainbowConnector({ chains }),
				metaMaskWallet({ chains }),
			],
		},
	]);

const { chains, provider } = configureChains(
	[polygonMumbai],
	[publicProvider()]
);

const wagmiClient = createClient({
	autoConnect: true,
	connectors: connectors(chains),
	provider,
});

const auth = getAuth();

const App = ({ Component, pageProps }) => {
	return (
		<ProvideAuth provider={auth}>
			<Component {...pageProps} />
		</ProvideAuth>
	);
};

export default App;
