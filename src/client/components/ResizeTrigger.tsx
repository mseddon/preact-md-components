import {h, Component } from "preact";
import { globalRect } from "../domutil";

/**
 * Triggers an onResize method every time it's parent component resizes.
 * 
 * This hack is INSANE, but robust as hell.
 */
export class ResizeTrigger extends Component<{onResize: (globalRect: {x: number, y: number, width: number, height: number}) => void}, {expandChildHeight: number, expandChildWidth: number, expandScrollLeft: number, expandScrollTop: number, contractScrollTop: number, contractScrollLeft: number, lastWidth: number, lastHeight: number}> {
    myElem: HTMLElement;
    expand: HTMLElement;
    expandChild: HTMLElement;
    contract: HTMLElement;

    constructor() {
        super();
        createStyles();
        this.setState({expandChildWidth: 0, expandChildHeight: 0, expandScrollLeft: 0, expandScrollTop: 0, contractScrollTop: 0, contractScrollLeft: 0, lastWidth: 0, lastHeight: 0})
    }

    componentWillMount() {
        this["forceUpdate"]()
    }

    componentDidMount() {
        let [width, height] = this.containerSize();
        this.reset(width, height);
    }

    shouldComponentUpdate(newProps) {
        return this.props !== newProps;
    }

    reset(width: number, height: number) {
        if(typeof window === "undefined")
            return; // in node.
        const parent = this.myElem.parentElement;

        this.setState({ ...this.state,
            expandChildHeight: this.expand.offsetHeight+10,
            expandChildWidth: this.expand.offsetWidth+10,
            lastWidth: width,
            lastHeight: height
        })
    }

    componentDidUpdate() {
        this.expand.scrollLeft = this.expand.scrollWidth;
        this.expand.scrollTop = this.expand.scrollHeight;

        this.contract.scrollLeft = this.contract.scrollWidth;
        this.contract.scrollTop = this.contract.scrollHeight;
    }

    containerSize() {
        if(this.myElem)
            return [this.myElem.parentElement.offsetWidth, this.myElem.parentElement.offsetHeight]
        return [0, 0]
    }

    handleScroll = () => {
        if(typeof window === undefined || !this.myElem)
            return;

        const [width, height] = this.containerSize();
        if(Math.abs(width - this.state.lastWidth) > 0.001 || Math.abs(height - this.state.lastHeight) > 0.001) {
            let rect = globalRect(this.myElem);
            rect.x |= 0; rect.y |= 0; rect.width |= 0; rect.height |= 0;
            requestAnimationFrame(() => this.props.onResize(rect)); // defer to avoid massive loop hell
        }
        this.reset(width, height);
    }

    render() {
        return <div className="resize-triggers" ref={x => this.myElem = x as HTMLElement}>
                  <div ref={x => this.expand = x as HTMLElement} onScroll={this.handleScroll}  class="expand-trigger">
                    <div ref={x => this.expandChild = x as HTMLElement} style={{width: this.state.expandChildWidth+"px", height: this.state.expandChildHeight+"px"}}/>
                  </div>
                  <div ref={x => this.contract = x as HTMLElement} onScroll={this.handleScroll} className="contract-trigger">
                    <div/>
                  </div>
               </div>
    }
}

let stylesCreated = false

let createStyles = () => {
	if (!stylesCreated) {
		//opacity:0 works around a chrome bug https://code.google.com/p/chromium/issues/detail?id=286360
		let css = 
				'.resize-triggers { visibility: hidden; opacity: 0; } ' +
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
