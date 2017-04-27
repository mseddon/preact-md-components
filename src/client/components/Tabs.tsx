import {h, Component, VNode, cloneElement} from "preact";
import * as preact from "preact";

import {globalRect} from "../domutil"
import "./styles.less";
import {RippleBox} from "./RippleBox";

export class TabStrip extends Component<{tabs: {id: string, title: VNode, component: VNode}[], onActiveTabChange?: (id: string) => void, active: string, scrollable?: boolean, homogeneous?: boolean, extraClasses?: string, style?: "white" | "accent"},{active: string, iLeft: number, iWidth: number}> {
    elem: HTMLElement;
    tabElements: { [id: string]: HTMLElement } = {};
    tabComponents: { [id: string]: VNode } = {}

    private iLeft: number;
    private iWidth: number;

    constructor(props) {
        super();
        this.state = { active: props.active, iLeft: 0, iWidth: 0 };
    }

    update() {
        let thisRect = globalRect(this.elem);
        let tabRect = globalRect(this.tabElements[this.state.active]);

        let left = tabRect.x-thisRect.x;
        if(Math.abs(left - this.iLeft) > 0.001 || Math.abs(tabRect.width - this.iWidth) > 0.001) {
            this.iLeft = left;
            this.iWidth = tabRect.width;
            this.setState({...this.state, iLeft: left, iWidth: tabRect.width})
        }

    }

    componentDidMount() {
        this.update();
    }

    componentDidUpdate() {
        this.update();
    }

    selectTab = (id: string) => (event: MouseEvent | TouchEvent ) => {
        this.setState({...this.state, active: id});
        if(this.props.onActiveTabChange)this.props.onActiveTabChange(id)
    }

    activePageIndex() {
        for(let i=0; i<this.props.tabs.length; i++) {
            if(this.props.tabs[i].id == this.state.active)
                return i;
        }
    }

    render() {
        return <div className={"md-tab-pane" + (this.props.extraClasses ? " "+this.props.extraClasses : "")}>
                  <div ref={x => this.elem = x as HTMLDivElement} className={"md-tab-strip " + (this.props.style == "white" ? " white-bg" : " primary-bg") + (this.props.scrollable ? " scrollable" : "")}>
                    <i className="material-icons left-scroll">chevron_left</i>
                    <i className="material-icons right-scroll">chevron_right</i>
                    {this.props.tabs.map(child => 
                        <div ref={x => this.tabElements[child.id] = x as HTMLDivElement}
                            className={"md-tab" + (child.id == this.state.active ? (" is-active" + (this.props.style == "white" ? " accent-fg" : "")) : "")}
                            style={this.props.homogeneous ? "width: "+(100/this.props.tabs.length)+"%; text-align: center" : ""}
                            onMouseDown={this.selectTab(child.id)}
                            onTouchStart={this.selectTab(child.id)}>
                            <RippleBox rippleClass={this.props.style == "white" ? "dark-ripple" : ""}/>
                            {child.title}</div>
                    )}<div className="indicator accent-bg" style={{left: this.state.iLeft+"px", width: this.state.iWidth+"px"}}/></div>
                  <div className="md-tab-content-area">
                    <div className="md-tab-scroller" style={{left: -this.activePageIndex()*100+"%"}}>
                        {this.props.tabs.map((tab, i) => {                           
                            return <div className="md-tab-content" style={{left: (i*100)+"%"}}>{tab.component}</div>
                        })}
                    </div>
                  </div>
               </div>
    }
}