let styles: HTMLStyleElement = document.createElement("style");

let meta: HTMLMetaElement = document.createElement("meta");
meta.setAttribute("name", "theme-color");

let themeSet = false;

export const INDIGO = [63,81,181] as [number, number, number];
export const LIGHT_BLUE = [3,169,244] as [number, number, number];
export const PINK = [233, 30, 99] as [number, number, number];

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


export function setTheme(primary: [number, number, number], accent: [number, number, number]) {
    while(styles.firstChild)
        styles.removeChild(styles.firstChild);

    meta.setAttribute("content", "rgb("+primary.join(',')+")");

    // FIXME
    //   this should probably be more perception based but will do for now...

    let hsv = RGBtoHSV(primary.map(x => x/255));
    let primaryLightHSV = [...hsv] as [number,number,number];
    let primaryXLightHSV = [...hsv] as [number,number,number];

    primaryLightHSV[1] = Math.min(primaryLightHSV[1]*0.4,1);
    primaryXLightHSV[1] = Math.min(primaryXLightHSV[1]*0.3,1);


    primaryLightHSV[2] = Math.min(primaryLightHSV[2]*1.5,1);
    primaryXLightHSV[2] = Math.min(primaryXLightHSV[2]*1.7,1);

    let primaryColor = `rgb(${primary.join(',')})`
    let accentColor = `rgb(${accent.join(',')})`
    let primaryLight = `rgb(${HSVtoRGB(primaryLightHSV).map(x => (x*255)|0).join(',')})`;
    let primaryXLight = `rgb(${HSVtoRGB(primaryXLightHSV).map(x => (x*255)|0).join(',')})`;

    let style =
    `.primary-border {
        border-color: ${primaryColor} !important;
    }

    .primary-buffer {
        background: radial-gradient(${primaryXLight} 0%, ${primaryXLight} 29%, rgba(0,0,0,0) 29.01%, rgba(0, 0, 0, 0) 100%);
    }

    .primary-fg {
        color: ${primaryColor} !important;
    }

    .primary-bg {
        background-color: ${primaryColor} !important;
    }

    .primary-bg-lt {
        background-color: ${primaryLight} !important;
    }

    .primary-bg-xlt {
        background-color: ${primaryXLight} !important;
    }
    
    .accent-fg {
        color: ${accentColor} !important;
    }

    .accent-bg {
        background-color: ${accentColor} !important;
    }
    `;

    let textNode = document.createTextNode(style);
    styles.insertBefore(textNode, styles.firstChild);
}

document.addEventListener("DOMContentLoaded", () => {
    if(!themeSet) {
        setTheme(INDIGO, PINK);
        themeSet = true;
    }
    document.head.appendChild(styles);
    document.head.appendChild(meta);
})