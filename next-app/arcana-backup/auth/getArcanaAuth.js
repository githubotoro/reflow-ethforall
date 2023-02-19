import { AuthProvider } from "@arcana/auth";
import { CHAIN } from "@arcana/auth";

const auth = new AuthProvider(process.env.NEXT_PUBLIC_ARCANA_APP_ID, {
	theme: "dark",
	network: "testnet",
	position: "right",
	alwaysVisible: true,
	chainConfig: {
		chainId: CHAIN.POLYGON_MUMBAI_TESTNET,
		rpcUrl: "https://rpc.ankr.com/polygon_mumbai",
	},
});

const getAuth = () => {
	return auth;
};

export { getAuth };
