export interface IHeaderConfigInLevel {
	[key: string]: IHeaderConfig;
}

export interface IHeaderConfig {
	mode: 'key' | 'single' | 'image' | 'key_image';
	modeConfig: IHeaderMode[keyof IHeaderConfig['mode']];
}

export interface IHeaderMode {
	key: {
		splitGroup: {
			position: number[];
			style: IHeaderFontStyle & IStyle;
			borderStyle: IHeaderFontStyle & IStyle; // 整体样式
		}, // 分组
		defaultStyle: IHeaderFontStyle & IStyle; // 整体样式
	},
	single: {
		style: IHeaderFontStyle & IStyle;
		borderStyle: IHeaderFontStyle & IStyle; // 整体样式
	},
	image: { // 这是替文的形式
		style: IHeaderFontStyle & IStyle;
		borderStyle: IHeaderFontStyle & IStyle; // 整体样式
	},
}

export interface IHeaderFontStyle {
	className?: string;
	styleString?: string;
}

export interface IStyle {
	fontSize: number;
	fontFamily: string;
	fontWeight: number;
	color: string;
}
