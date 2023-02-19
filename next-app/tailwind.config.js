/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./app/**/*.{js,ts,jsx,tsx}",
		"./pages/**/*.{js,ts,jsx,tsx}",
		"./components/**/*.{js,ts,jsx,tsx}",
		"./src/**/*.{js,ts,jsx,tsx}",
	],
	variants: {
		extend: {
			display: ["group-hover"],
		},
	},
	theme: {
		extend: {
			fontSize: {
				"2xs": "10px",
				xs: "12px",
				sm: "14px",
				md: "16px",
				lg: "18px",
				xl: "20px",
				"2xl": "24px",
				"3xl": "28px",
				"4xl": "32px",
				"5xl": "36px",
				"6xl": "40px",
				"7xl": "48px",
				"8xl": "56px",
				"9xl": "64px",
				"10xl": "72px",
				"11xl": "80px",
				"12xl": "96px",
			},
			fontWeight: {
				ultralight: "100",
				extralight: "200",
				light: "300",
				normal: "400",
				medium: "500",
				semibold: "600",
				bold: "700",
				extrabold: "800",
				black: "900",
			},
			letterSpacing: {
				tighest: "-0.08em",
				tighter: "-0.04em",
				tight: "-0.02em",
				normal: "0",
				wide: "0.02em",
				wider: "0.04em",
				widest: "0.08em",
			},
			lineHeight: {
				1: "1",
				2: "1.1",
				3: "1.2",
				4: "1.3",
				5: "1.4",
				6: "1.5",
				7: "1.6",
				8: "1.7",
				9: "1.8",
				10: "1.9",
				11: "2",
				12: "2.1",
				13: "2.2",
				14: "2.3",
				15: "2.4",
				16: "2.5",
				none: "1",
				tighest: "1.125",
				tighter: "1.25",
				tight: "1.375",
				normal: "1.5",
				loose: "1.625",
				looser: "1.75",
				loosest: "1.875",
			},
			colors: {
				// == Main Colors ==
				isBlack: "rgb(0, 0, 0)",
				isWhite: "rgb(255, 255, 255)",

				isGolden: "rgb(255, 170, 0)",
				isMagenta: "rgb(255, 0, 238)",
				isAzure: "rgb(0, 153, 255)",
				isWater: "rgb(0, 204, 255)",

				isRedDark: "rgb(255, 59, 48)",
				isOrangeDark: "rgb(255, 149, 0)",
				isYellowDark: "rgb(255, 204, 0)",
				isGreenDark: "rgb(52, 199, 89)",
				isMintDark: "rgb(0, 199, 190)",
				isTealDark: "rgb(48, 176, 199)",
				isCyanDark: "rgb(50, 173, 230)",
				isBlueDark: "rgb(0, 122, 255)",
				isIndgioDark: "rgb(88, 66, 214)",
				isPurpleDark: "rgb(175, 82, 222)",
				isPinkDark: "rgb(255, 45, 85)",
				isBrownDark: "rgb(162, 132, 94)",

				isRedDarkEmphasis: "rgb(215, 0, 21)",
				isOrangeDarkEmphasis: "rgb(201, 52, 0)",
				isYellowDarkEmphasis: "rgb(178, 80, 0)",
				isGreenDarkEmphasis: "rgb(36, 138, 61)",
				isMintDarkEmphasis: "rgb(12, 129, 123)",
				isTealDarkEmphasis: "rgb(0, 130, 153)",
				isCyanDarkEmphasis: "rgb(0, 113, 164)",
				isBlueDarkEmphasis: "rgb(0, 64, 221)",
				isIndgioDarkEmphasis: "rgb(54, 52, 163)",
				isPurpleDarkEmphasis: "rgb(137, 68, 171)",
				isPinkDarkEmphasis: "rgb(211, 15, 69)",
				isBrownDarkEmphasis: "rgb(127, 101, 69)",

				isRedLight: "rgb(255, 69, 58)",
				isOrangeLight: "rgb(255, 159, 10)",
				isYellowLight: "rgb(255, 214, 10)",
				isGreenLight: "rgb(52, 209, 88)",
				isMintLight: "rgb(99, 230, 226)",
				isTealLight: "rgb(64, 200, 224)",
				isCyanLight: "rgb(100, 210, 255)",
				isBlueLight: "rgb(10, 132, 256)",
				isIndgioLight: "rgb(94, 92, 230)",
				isPurpleLight: "rgb(191, 90, 242)",
				isPinkLight: "rgb(255, 55, 95)",
				isBrownLight: "rgb(172, 142, 103)",

				isRedLightEmphasis: "rgb(215, 105, 97)",
				isOrangeLightEmphasis: "rgb(255, 179, 64)",
				isYellowLightEmphasis: "rgb(255, 212, 38)",
				isGreenLightEmphasis: "rgb(48, 219, 91)",
				isMintLightEmphasis: "rgb(102, 212, 207)",
				isTealLightEmphasis: "rgb(93, 230, 255)",
				isCyanLightEmphasis: "rgb(112, 215, 255)",
				isBlueLightEmphasis: "rgb(64, 156, 255)",
				isIndgioLightEmphasis: "rgb(125, 122, 255)",
				isPurpleLightEmphasis: "rgb(218, 143, 255)",
				isPinkLightEmphasis: "rgb(255, 100, 130)",
				isBrownLightEmphasis: "rgb(181, 148, 105)",

				isGrayLight: "rgb(108, 108, 112)",
				isGrayLight2: "rgb(142, 142, 147)",
				isGrayLight3: "rgb(174, 174, 178)",
				isGrayLight4: "rgb(188, 188, 192)",
				isGrayLight5: "rgb(216, 216, 220)",
				isGrayLight6: "rgb(235, 235, 240)",

				isGrayLightEmphasis: "rgb(142, 142, 147)",
				isGrayLightEmphasis2: "rgb(174, 174, 178)",
				isGrayLightEmphasis3: "rgb(199, 199, 204)",
				isGrayLightEmphasis4: "rgb(209, 209, 214)",
				isGrayLightEmphasis5: "rgb(229, 229, 234)",
				isGrayLightEmphasis6: "rgb(242, 242, 247)",

				isGrayDark: "rgb(174, 174, 178)",
				isGrayDark2: "rgb(124, 124, 128)",
				isGrayDark3: "rgb(84, 84, 86)",
				isGrayDark4: "rgb(68, 68, 70)",
				isGrayDark5: "rgb(54, 54, 56)",
				isGrayDark6: "rgb(36, 36, 38)",

				isGrayDarkEmphasis: "rgb(142, 142, 147)",
				isGrayDarkEmphasis2: "rgb(99, 99, 102)",
				isGrayDarkEmphasis3: "rgb(72, 72, 74)",
				isGrayDarkEmphasis4: "rgb(58, 58, 60)",
				isGrayDarkEmphasis5: "rgb(44, 44, 46)",
				isGrayDarkEmphasis6: "rgb(28, 28, 30)",
				// == Main Colors ==

				// monokai
				monokai: "#272822",
				monoBlack: "#272822",
				monoZeus: "#34352f",
				monoPale: "#414339",
				monoCoffee: "#75715e",
				monoGrey: "#b2b3ad",
				monoLight: "#f8f8f2",
				monoCyan: "#66d9ef",
				monoBlue: "#179fff",
				monoPink: "#f92672",
				monoPurple: "#da70d6",
				monoViolet: "#9a74de",
				monoGreen: "#a6e22e",
				monoYellow: "#ffd700",
				monoOcur: "#e6db74",
				monoOrange: "#fd8921",
				monoRed: "#f14c4c",
			},
		},
	},
	plugins: [],
};
