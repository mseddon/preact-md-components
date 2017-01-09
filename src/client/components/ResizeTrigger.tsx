import {h, Component } from "preact";

/**
 * Triggers an onResize method every time it's parent component resizes.
 * 
 * This hack is INSANE, but robust as hell.
 */
export class ResizeTrigger extends Component<{onResize: () => void}, any> {
    myElem: HTMLElement;
    parent: HTMLElement;
    expand: HTMLElement;
    expandChild: HTMLElement;
    contract: HTMLElement;
    lastWidth: number = 0;
    lastHeight: number = 0;
    resizeRAF: number;

    constructor() {
        super();
        createStyles();
    }

    resize = () => {
        this.resetTriggers();
        if(this.resizeRAF)
            cancelAnimationFrame(this.resizeRAF);
        this.resizeRAF = requestAnimationFrame(() => {
            if(this.checkTriggers()) {
                this.lastWidth = this.myElem.offsetWidth;
                this.lastHeight = this.myElem.offsetHeight;
                this.props.onResize();
            }
        })
    }

    checkTriggers() {
        return this.myElem.offsetWidth != this.lastWidth || this.myElem.offsetHeight != this.lastHeight;
    }

    componentDidMount() {
        if(this.parent)
            this.parent.removeEventListener("scroll", this.resize);
        this.parent = this.myElem.parentElement;
        if(getComputedStyle(this.parent).position == "static") {
            // gnarly
            this.parent.style.position = "relative";
        }
        this.resetTriggers();
        this.parent.addEventListener("scroll", this.resize, true);
    }

    componentDidUnmount() {
        if(this.parent)
            this.parent.removeEventListener("scroll", this.resize);
        this.parent = null;
    }

    resetTriggers() {
        this.contract.scrollLeft = this.contract.scrollWidth;
	    this.contract.scrollTop = this.contract.scrollHeight;
	    this.expandChild.style.width = this.expand.offsetWidth + 1 + 'px';
	    this.expandChild.style.height = this.expand.offsetHeight + 1 + 'px';
	    this.expand.scrollLeft = this.expand.scrollWidth;
	    this.expand.scrollTop = this.expand.scrollHeight;
    }

    render() {
        return <div className="resize-triggers" ref={x => this.myElem = x as HTMLElement}>
                  <div ref={x => this.expand = x as HTMLElement} class="expand-trigger"><div ref={x => this.expandChild = x as HTMLElement}/></div>
                  <div ref={x => this.contract = x as HTMLElement} className="contract-trigger"/>
               </div>
    }
}





let animation = false,
	animationstring = 'animation',
	keyframeprefix = '',
	animationstartevent = 'animationstart',
	domPrefixes = 'Webkit Moz O ms'.split(' '),
	startEvents = 'webkitAnimationStart animationstart oAnimationStart MSAnimationStart'.split(' '),
	pfx  = '';

	var elm = document.createElement('fakeelement');
	if(elm.style.animationName !== undefined) { animation = true; }    
		
	if(animation === false) {
		for(let i = 0; i < domPrefixes.length; i++ ) {
			if(elm.style[ domPrefixes[i] + 'AnimationName'] !== undefined) {
				pfx = domPrefixes[i];
				animationstring = pfx + 'Animation';
				keyframeprefix = '-' + pfx.toLowerCase() + '-';
				animationstartevent = startEvents[ i ];
				animation = true;
				break;
			}
		}
	}


// TODO - we don't use the animation DOM attach event hack in this verison, either remove it or implement it.
let stylesCreated = false
let animationName = 'resizeanim';
let animationKeyframes = '@' + keyframeprefix + 'keyframes ' + animationName + ' { from { opacity: 0; } to { opacity: 0; } } ';
let animationStyle = keyframeprefix + 'animation: 1ms ' + animationName + '; ';

let createStyles = () => {
	if (!stylesCreated) {
		//opacity:0 works around a chrome bug https://code.google.com/p/chromium/issues/detail?id=286360
		let css = (animationKeyframes ? animationKeyframes : '') +
				'.resize-triggers { ' + (animationStyle ? animationStyle : '') + 'visibility: hidden; opacity: 0; } ' +
				'.resize-triggers, .resize-triggers > div, .contract-trigger:before { content: \" \"; display: block; position: absolute; top: 0; left: 0; height: 100%; width: 100%; overflow: hidden; } .resize-triggers > div { background: #eee; overflow: auto; } .contract-trigger:before { width: 200%; height: 200%; }',
			head = document.head || document.getElementsByTagName('head')[0],
			style = document.createElement('style') as HTMLStyleElement;
		
		style.type = 'text/css';
		if(style["styleSheet"])
			style["styleSheet"].cssText = css;
		else
			style.appendChild(document.createTextNode(css));

		head.appendChild(style);
		stylesCreated = true;
	}		
}
