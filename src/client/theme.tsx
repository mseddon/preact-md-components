let styles: HTMLStyleElement = document.createElement("style");

let meta: HTMLMetaElement = document.createElement("meta");
meta.setAttribute("name", "theme-color");

let themeSet = false;

export type SwatchValue = "50" | "100" | "200" | "300" | "400" | "500" | "600" | "700" | "800" | "900" | "A100" | "A200" | "A400" | "A700"
export type SwatchEntry = "Red" | "Pink" | "Purple" | "Deep Purple" | "Indigo" | "Blue" | "Light Blue" | "Cyan" | "Teal" | "Green" | "Light Green" | "Lime" | "Yellow" | "Amber" | "Orange" | "Deep Orange" | "Brown" | "Grey" | "Blue Grey";

const SWATCH_INDICES = {
    "50": 0, "100": 1, "200": 2, "300": 3, "400": 4,
    "500": 5, "600": 6, "700": 7, "800": 8, "900": 9,
    "A100": 10, "A200": 11, "A400": 12, "A700": 13,
}

const FG_COMPLEMENT = {
    "Red": [4, 1],
    "Pink": [3, 1],
    "Purple": [3, 1],
    "Deep Purple": [3, 1],
    "Indigo": [3, 1],
    "Blue": [4, 1],
    "Light Blue": [6, 3],
    "Cyan": [7, 4],
    "Teal": [5, 4],
    "Green": [6, 4],
    "Light Green": [7, 4],
    "Lime": [9, 4],
    "Yellow": [10, 4],
    "Amber": [10, 4],
    "Orange": [8, 4],
    "Deep Orange": [5, 2],
    "Brown": [3],
    "Grey": [6],
    "Blue Grey": [4]
}

const SWATCH = {
    "Red": [0xFFEBEE, 0xFFCDD2, 0xEF9A9A, 0xE57373, 0xEF5350,
            0xF44336, 0xE53935, 0xD32F2F, 0xC62828, 0xB71C1C,
            0xFF8A80, 0xFF5252, 0xFF1744, 0xD50000],

    "Pink": [0xFCE4EC, 0xF8BBD0, 0xF48FB1, 0xF06292, 0xEC407A,
             0xE91E63, 0xD81B60, 0xC2185B, 0xAD1457, 0x880E4F, 
             0xFF80AB, 0xFF4081, 0xFF4081, 0xC51162],

    "Purple": [0xF3E5F5, 0xE1BEE7, 0xCE93D8, 0xBA68C8, 0xAB47BC,
               0x9C27B0, 0x8E24AA, 0x7B1FA2, 0x6A1B9A, 0x4A148C,
               0xEA80FC, 0xE040FB, 0xD500F9, 0xAA00FF],

    "Deep Purple": [0xEDE7F6, 0xD1C4E9, 0xB39DDB, 0x9575CD, 0x7E57C2,
                    0x673AB7, 0x5E35B1, 0x512DA8, 0x512DA8, 0x311B92,
                    0xB388FF, 0x7C4DFF, 0x651FFF, 0x6200EA],

    "Indigo": [0xE8EAF6, 0xC5CAE9, 0x9FA8DA, 0x7986CB, 0x5C6BC0,
               0x3F51B5, 0x3949AB, 0x303F9F, 0x283593, 0x1A237E,
               0x8C9EFF, 0x536DFE, 0x3D5AFE, 0x304FFE],

    "Blue": [0xE3F2FD, 0xBBDEFB, 0x90CAF9, 0x64B5F6, 0x42A5F5,
             0x2196F3, 0x1E88E5, 0x1976D2, 0x1565C0, 0x0D47A1,
             0x82B1FF, 0x448AFF, 0x2979FF, 0x2962FF],
    
    "Light Blue": [0xE1F5FE, 0xB3E5FC, 0x81D4FA, 0x4FC3F7, 0x29B6F6,
                   0x03A9F4, 0x039BE5, 0x0288D1, 0x0277BD, 0x01579B,
                   0x80D8FF, 0x40C4FF, 0x00B0FF, 0x0091EA],

    "Teal": [0xE0F2F1, 0xB2DFDB, 0x80CBC4, 0x4DB6AC, 0x26A69A,
             0x009688, 0x00897B, 0x00796B, 0x00695C, 0x004D40,
             0xA7FFEB, 0x64FFDA, 0x1DE9B6, 0x00BFA5],

    "Green": [0xE8F5E9, 0xC8E6C9, 0xA5D6A7, 0x81C784, 0x66BB6A,
              0x4CAF50, 0x43A047, 0x388E3C, 0x2E7D32, 0x1B5E20,
              0xB9F6CA, 0x69F0AE, 0x00E676, 0x00C853],

    "Light Green": [0xF1F8E9, 0xDCEDC8, 0xC5E1A5, 0xAED581, 0x9CCC65,
                    0x8BC34A, 0x7CB342, 0x689F38, 0x558B2F, 0x33691E,
                    0xCCFF90, 0xB2FF59, 0x76FF03, 0x64DD17],

    "Lime": [0xF9FBE7, 0xF0F4C3, 0xE6EE9C, 0xDCE775, 0xD4E157,
             0xCDDC39, 0xC0CA33, 0xAFB42B, 0x9E9D24, 0x827717,
             0xF4FF81, 0xEEFF41, 0xC6FF00, 0xAEEA00],

    "Yellow": [0xFFFDE7, 0xFFF9C4, 0xFFF59D, 0xFFF176, 0xFFEE58,
               0xFFEB3B, 0xFDD835, 0xFBC02D, 0xF9A825, 0xF57F17,
               0xFFFF8D, 0xFFFF00, 0xFFEA00, 0xFFD600],

    "Amber": [0xFFF8E1, 0xFFECB3, 0xFFE082, 0xFFD54F, 0xFFCA28,
              0xFFC107, 0xFFB300, 0xFFA000, 0xFF8F00, 0xFF6F00,
              0xFFE57F, 0xFFD740, 0xFFC400, 0xFFAB00],

    "Orange": [0xFFF3E0, 0xFFE0B2, 0xFFCC80, 0xFFB74D, 0xFFA726,
               0xFF9800, 0xFB8C00, 0xF57C00, 0xEF6C00, 0xE65100,
               0xFFD180, 0xFFAB40, 0xFF9100, 0xFF6D00],

    "Deep Orange": [0xFBE9E7, 0xFFCCBC, 0xFFAB91, 0xFF8A65, 0xFF7043,
                    0xFF5722, 0xF4511E, 0xE64A19, 0xD84315, 0xBF360C,
                    0xFF9E80, 0xFF6E40, 0xFF3D00, 0xDD2C00],

    "Brown": [0xEFEBE9, 0xD7CCC8, 0xBCAAA4, 0xA1887F, 0x8D6E63,
              0x795548, 0x6D4C41, 0x5D4037, 0x4E342E, 0x3E2723],

    "Grey": [0xFAFAFA, 0xF5F5F5, 0xEEEEEE, 0xE0E0E0, 0xBDBDBD,
             0x9E9E9E, 0x757575, 0x616161, 0x424242, 0x212121],

    "Blue Grey": [0xECEFF1, 0xCFD8DC, 0xB0BEC5, 0x90A4AE, 0x78909C,
                  0x607D8B, 0x546E7A, 0x455A64, 0x37474F, 0x263238]
}

const intToRGB = (c: number): [number, number, number] => [(c >> 16) & 0xFF, (c >> 8) & 0xFF, c & 0xFF];

export const getColor = (name: string, entry: SwatchValue): [number, number, number] =>
    intToRGB(SWATCH[name][SWATCH_INDICES[entry]])

export const getForeground = (name: string, entry: SwatchValue): [number, number, number] => {
    let index = SWATCH_INDICES[entry];
    if(index > 10) {
        index -= 10;
        return index < FG_COMPLEMENT[name][1] ? [0, 0, 0] : [255, 255, 255];
    } else {
        return index < FG_COMPLEMENT[name][0] ? [0, 0, 0] : [255, 255, 255];
    }
}

export const PINK = [233, 30, 99] as [number, number, number];
export const PURPLE = [156, 39, 176] as [number, number, number];
export const DEEP_PURPLE = [103, 58, 183] as [number, number, number];
export const INDIGO = getColor("Indigo", "500");
export const BLUE = [33,150,243] as [number, number, number];
export const LIGHT_BLUE = [3,169,244] as [number, number, number];

/** Convert a red/green/blue colour to a hue/saturation/brightness colour. */
export function RGBtoHSV([r,g,b]): [number, number, number] {
	let Cmax = Math.max(r, g, b);
	let Cmin = Math.min(r, g, b);
	let delta = Cmax-Cmin;
	let h;
	if(delta == 0)
		h = 0;
	else if(Cmax == r)
		h = 60*((g-b)/delta % 6);
	else if(Cmax == g)
		h = 60*((b-r)/delta + 2);
	else
		h = 60*((r-g)/delta + 4);

	let s = Cmax == 0 ? 0 : delta/Cmax;
	while(h < 0)
		h += 360;
	h %= 360;
	return [h, s, Cmax];
}

/** Convert a hue/saturation/value colour to a red/green/blue colour. */
export function HSVtoRGB([h,s,v]): [number, number, number] {
	let C = v * s;
	let X = C * (1-Math.abs((h/60) % 2 - 1));
	let m = v - C;
	if(h >= 0 && h < 60)
		return [C+m, X+m, m]
	else if (h >= 60 && h < 120)
		return [X+m, C+m, m]
	else if (h >= 120 && h < 180)
		return [m, C+m, X+m]
	else if (h >= 180 && h < 240)
		return [m, X+m, C+m]
	else if (h >= 240 && h < 300)
		return [X+m, m, C+m]
	return [C+m, m, X+m];
}

export interface Theme {
    primary: [SwatchEntry, SwatchValue];
    accent: [SwatchEntry, SwatchValue];
    background: [SwatchEntry, SwatchValue];
    dark: boolean;
}

export function setTheme(theme: Theme) {
    let primary = getColor(theme.primary[0], theme.primary[1]);
    let primaryForeground = getForeground(theme.primary[0], theme.primary[1]);
    let accent = getColor(theme.accent[0], theme.accent[1]);
    let accentForeground = getForeground(theme.accent[0], theme.accent[1]);
    let pageBackground = getColor(theme.background[0], theme.background[1])
    let pageForeground = getForeground(theme.background[0], theme.background[1]);

    while(styles.firstChild)
        styles.removeChild(styles.firstChild);

    meta.setAttribute("content", "rgb("+primary.join(',')+")");

    // FIXME
    //   this should probably be more perception based but will do for now...

    let hsv = RGBtoHSV(primary.map(x => x/255));
    let primaryLightHSV = [...hsv] as [number,number,number];
    let primaryXLightHSV = [...hsv] as [number,number,number];
    hsv = RGBtoHSV(accent.map(x => x/255));
    let accentLightHSV = [...hsv] as [number,number,number];
    let accentXLightHSV = [...hsv] as [number,number,number];

    primaryLightHSV[1] = Math.min(primaryLightHSV[1]*0.4,1);
    primaryXLightHSV[1] = Math.min(primaryXLightHSV[1]*0.3,1);
    primaryLightHSV[2] = Math.min(primaryLightHSV[2]*1.5,1);
    primaryXLightHSV[2] = Math.min(primaryXLightHSV[2]*1.7,1);

    accentLightHSV[1] = Math.min(accentLightHSV[1]*0.4,1);
    accentXLightHSV[1] = Math.min(accentXLightHSV[1]*0.3,1);
    accentLightHSV[2] = Math.min(accentLightHSV[2]*1.5,1);
    accentXLightHSV[2] = Math.min(accentXLightHSV[2]*1.7,1);

    let primaryColor = `rgb(${primary.join(',')})`
    let accentColor = `rgb(${accent.join(',')})`
    let accentFGColor = `rgb(${accentForeground.join(',')})`
    let foreColor = `rgb(${primaryForeground.join(',')})`
    let pageBGColor = `rgb(${pageBackground.join(',')})`
    let pageFGColor = `rgb(${pageForeground.join(',')})`
    let primaryLight = `rgb(${HSVtoRGB(primaryLightHSV).map(x => (x*255)|0).join(',')})`;
    let primaryXLight = `rgb(${HSVtoRGB(primaryXLightHSV).map(x => (x*255)|0).join(',')})`;
    let accentLight = `rgb(${HSVtoRGB(accentLightHSV).map(x => (x*255)|0).join(',')})`;
    let accentXLight = `rgb(${HSVtoRGB(accentXLightHSV).map(x => (x*255)|0).join(',')})`;

    let style =
    `.primary-border {
        border-color: ${primaryColor} !important;
    }

    .check-radio-border {
        border-color: ${theme.dark ? "#fff" : "#000"} !important;
        opacity: ${theme.dark ? 0.7 : 0.54};
    }

    .switch-track-off {
        background-color: ${theme.dark ? "#fff" : "#000" };
        opacity: ${theme.dark ? 0.3 : 0.38 }
    }

    .switch-thumb-off {
        background-color: ${theme.dark ? "#bdbdbd" : "#fafafa" }
    }

    .accent-buffer {
        background: radial-gradient(${accentXLight} 0%, ${accentXLight} 29%, rgba(0,0,0,0) 29.01%, rgba(0, 0, 0, 0) 100%);
    }

    .background-fg-border {
        border-color: ${pageFGColor} !important;
    }

    .primary-text {
        color: ${theme.dark ? "#fff" : "#000" };
        opacity: ${theme.dark ? 1 : 0.87 };
    }

    .secondary-text {
        color: ${theme.dark ? "#fff" : "000" } !important;
        opacity: ${theme.dark ? 0.7 : 0.54 };
    }

    .hint-text {
        color: ${theme.dark ? "#fff" : "000" } !important;
        opacity: ${theme.dark ? 0.5 : 0.38 };
    }
    
    html {
        background-color: ${pageBGColor}
    }

    .primary-fg {
        color: ${primaryColor} !important;
    }

    .primary-bg {
        background-color: ${primaryColor} !important;
        color: ${foreColor}
    }

    .primary-bg-lt {
        background-color: ${primaryLight} !important;
    }

    .primary-bg-xlt {
        background-color: ${primaryXLight} !important;
    }

    .slider-track {
        background-color: ${theme.dark ? "#fff" : "000"};
        opacity: ${theme.dark ? 0.3 : 0.26 }
    }
    
    .accent-fg {
        color: ${accentColor} !important;
    }

    .accent-bg {
        background-color: ${accentColor} !important;
        color: ${accentFGColor};
    }

    .accent-border {
        border-color: ${accentColor} !important;
    }
    .accent-bg-lt {
        background-color: ${accentLight} !important;
    }

    .accent-bg-xlt {
        background-color: ${accentXLight} !important;
    }
    `;

    let textNode = document.createTextNode(style);
    styles.insertBefore(textNode, styles.firstChild);
}

document.addEventListener("DOMContentLoaded", () => {
    if(!themeSet) {
        setTheme({
            primary: ["Indigo", "500"],
            accent: ["Pink", "500"],
            background: ["Grey", "50"],
            dark: false
        });
        themeSet = true;
    }
    document.head.appendChild(styles);
    document.head.appendChild(meta);
})