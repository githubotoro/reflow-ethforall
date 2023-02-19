import "@/styles/globals.css";
import { AuthProvider } from "@arcana/auth";

import { getAuth } from "../arcana-backup/auth/getArcanaAuth";
import { ProvideAuth } from "../arcana-backup/auth/useArcanaAuth";

import { configureChains, createClient, WagmiConfig } from "wagmi";
import { polygonMumbai } from "@wagmi/core/chains";
import { publicProvider } from "wagmi/providers/public";
import { ArcanaConnector } from "@arcana/auth-wagmi";

const auth = getAuth();

const connector = new ArcanaConnector({
	chains: [polygonMumbai],
	options: {
		appId: `${process.env.NEXT_PUBLIC_ARCANA_APP_ID}`,
		theme: "dark",
		alwaysVisible: true,
		position: "right",
	},
});

const { chains, provider } = configureChains(
	[polygonMumbai],
	[publicProvider()]
);

const wagmiClient = createClient({
	autoConnect: true,
	connectors: connector.chains,
	provider,
});

const App = ({ Component, pageProps }) => {
	return (
		<ProvideAuth provider={auth}>
			<WagmiConfig client={wagmiClient}>
				<Component {...pageProps} />
			</WagmiConfig>
		</ProvideAuth>
	);
};

export default App;
