import "@/styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";

import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { polygonMumbai } from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";

const { chains, provider } = configureChains(
	[polygonMumbai],
	[
		alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMY_ID }),
		publicProvider(),
	]
);

const { connectors } = getDefaultWallets({
	appName: "Reflow",
	chains,
});

const wagmiClient = createClient({
	autoConnect: true,
	connectors,
	provider,
});

const App = ({ Component, pageProps }) => {
	return (
		<WagmiConfig client={wagmiClient}>
			<RainbowKitProvider chains={chains}>
				<Component {...pageProps} />
			</RainbowKitProvider>
		</WagmiConfig>
	);
};

export default App;
