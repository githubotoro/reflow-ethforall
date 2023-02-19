import { ConnectButton } from "@rainbow-me/rainbowkit";

export const CustomConnectWalletButton = () => {
	return (
		<ConnectButton.Custom>
			{({
				account,
				chain,
				openAccountModal,
				openChainModal,
				openConnectModal,
				authenticationStatus,
				mounted,
			}) => {
				// Note: If your app doesn't use authentication, you
				// can remove all 'authenticationStatus' checks
				const ready = mounted && authenticationStatus !== "loading";
				const connected =
					ready &&
					account &&
					chain &&
					(!authenticationStatus ||
						authenticationStatus === "authenticated");

				return (
					<div
						{...(!ready && {
							"aria-hidden": true,
							style: {
								opacity: 0,
								pointerEvents: "none",
								userSelect: "none",
							},
						})}
					>
						{(() => {
							if (!connected) {
								return (
									<button
										onClick={openConnectModal}
										type="button"
										className="flex flex-col items-center font-bold text-xl 
						bg-isBlueDark text-isWhite shadow-sm py-[4px] px-[12px] 
						rounded-xl hover:bg-isBlueDarkEmphasis transition delay-50 duration-300 "
									>
										Connect Wallet
									</button>
								);
							}

							if (chain.unsupported) {
								return (
									<button
										onClick={openChainModal}
										type="button"
									>
										Wrong network
									</button>
								);
							}

							return (
								<div className="flex flex-row items-center">
									<button
										onClick={openChainModal}
										style={{
											display: "flex",
											alignItems: "center",
										}}
										type="button"
										className="flex flex-row items-center font-bold text-xl 
								bg-isPurpleDark text-isWhite shadow-sm py-[4px] px-[12px]
								rounded-xl hover:bg-isPurpleDarkEmphasis transition delay-50 duration-300 "
									>
										{chain.name}
									</button>

									<button
										onClick={openAccountModal}
										type="button"
										className="flex flex-row items-center font-bold text-xl 
								bg-isBlueDark text-isWhite shadow-sm py-[4px] px-[12px] 
								rounded-xl hover:bg-isBlueDarkEmphasis transition delay-50 duration-300 ml-[6px]"
									>
										{account.displayName}
										{account.displayBalance
											? ` (${account.displayBalance})`
											: ""}
									</button>
								</div>
							);
						})()}
					</div>
				);
			}}
		</ConnectButton.Custom>
	);
};
