import { PolymerElement } from "@polymer/polymer/polymer-element.js";
import { mixinBehaviors } from "@polymer/polymer/lib/legacy/class.js";

import { clDefaultTemplate } from "cl-polymer-element-helpers/cl-default-template.js";
import { clDefaultStyle } from "cl-polymer-element-helpers/cl-default-style.js";

import "@polymer/paper-tabs/paper-tabs.js";
import "@polymer/paper-tabs/paper-tab.js";

import { __decorate } from "cl-polymer-element-helpers/cl-helpers.js";
import { property, observe } from "@polymer/decorators";

import "cl-polymer-element-helpers/ct-element-style.js";

let clPolymerModeSwitcherTemplate;
let clPolymerModeSwitcherTemplateDefault;
let clPolymerModeSwitcherBase = mixinBehaviors([], PolymerElement);
class clPolymerModeSwitcher extends clPolymerModeSwitcherBase {
    constructor () {
        super();
        this.selectedTabIndex = 0;
        this.scrollable = false;
        this.customStyle = false;
    }

	onCurrentSelectedTabChanged ( selectedTab ) {
        this.async(function() {
            selectedTab && this.get("tabs") && (this.selectedTabIndex = this.tabs.findIndex(function( item ) {
                return item.switchModeTabRenderer.name == selectedTab
            }))
        })
    };

    onTabActivate ( event ) {
        this.debounce("onTabActivate", function() {
            let command = this.get("tabs." + event.detail.selected + ".switchModeTabRenderer.command");
            command && this.fire("cl-current-mode-switcher-changed", { command })
        }, 200)
    };

  	static get template() {
    	if ( void 0 === clPolymerModeSwitcherTemplate || null === clPolymerModeSwitcherTemplate ) {

            let template = document.createElement("template");
            template.innerHTML = `
            <style>
                :host{
                    color: var(--cl-primary-text-color);
                    display: var(--cl-polymer-mode-switcher-display, inline-block);
                    flex: none;
                    box-sizing: border-box;
                    height: var(--cl-polymer-mode-switcher-height, 48px);
                }

                .container {
                    display: flex;
                    justify-content: space-between;
                    flex: 1;
                    max-width: calc(var(--cl-polymer-mode-switcher-capped-max-width, initial) - 48px);
                }

                .primary {
                    display: flex;
                    align-self: flex-end;
                    flex: 1;
                    min-width: 0;
                }

                paper-tabs[scrollable] {
                    flex: 1;
                }

                :host:not([custom-style]) paper-tab paper-tab{
                    text-transform: uppercase;
                    padding: 0 var(--cl-large-container-spacing);
                }

                :host([custom-style]) paper-tabs{
                    --paper-tabs-selection-bar: {
                        border-width: 0;
                        background-color: var(--cl-polymer-mode-switcher-paper-tabs-color, var(--cl-call-to-action));
                        border-radius: var(--cl-polymer-mode-switcher-paper-tabs-border-radius, 3px 3px 0 0);
                        height: var(--cl-polymer-mode-switcher-paper-tabs-height, 3px);
                    };

                    --paper-tab: {
                        margin-left: var(--cl-polymer-mode-switcher-paper-tab-margin-left, 8px);
                        margin-right: var(--cl-polymer-mode-switcher-paper-tab-margin-right, 32px);
                        padding: var(--cl-polymer-mode-switcher-paper-tab-padding, 0px);
                        text-transform: capitalize;
                    };

                    --paper-tab-content: {
                        white-space: nowrap;
                        overflow: visible;
                        text-overflow: ellipsis;
                        font-family: var(--cl-primary-font-family);
                        -webkit-font-smoothing: var(--cl-primary-font-smoothing);
                        font-weight: 600;
                        font-size: var(--cl-polymer-mode-switcher-paper-tab-content-font-size, 15px);
                        line-height: 18px;
                        color: var(--cl-polymer-mode-switcher-paper-tab-content-color, var(--cl-call-to-action));
                        min-width: 48px;
                    };

                    --paper-tab-content-unselected: {
                        opacity: 1;
                        color: var(--cl-polymer-mode-switcher-paper-tab-content-unselected-color, var(--cl-secondary-text-color));
                    };

                    --paper-icon-button: {
                        height: 40px!important;
                        width: 40px!important;
                        padding: 8px!important;
                        margin: 0!important;
                        color: var(--cl-secondary-text-color);
                    };
                    --paper-icon-button-hover-color: var(--cl-primary-text-color);
                }

                paper-tab.iron-selected{
                    border: var(--cl-polymer-mode-switcher-paper-tab-iron-selected-border, 0);
                    border-radius: var(--cl-polymer-mode-switcher-paper-tab-iron-selected-border-radius, 0);
                    background-color: var(--cl-polymer-mode-switcher-paper-tab-iron-selected-background-color, transparent);
                }

                #secondary {}
                [slot=secondary] {
                    align-self: center;
                    min-width: 0;
                }
            </style>
            <div class="container">
                <div class="primary">
                    <paper-tabs id="tab" selected="[[selectedTabIndex]]" on-iron-activate="onTabActivate" scrollable$="[[scrollable]]">
                        <template id="tab-repeat" is="dom-repeat" items="[[tabs]]">
                            <paper-tab name="[[item.switchModeTabRenderer.name]]">[[item.switchModeTabRenderer.label]]</paper-tab>
                        </template>
                    </paper-tabs> 
                </div>
                <slot name="secondary"></slot> 
            </div>
            `;
            template.content.insertBefore(clDefaultStyle().content.cloneNode(true), template.content.firstChild);
            let templateContent = template.content;
            let templateInsertBefore = templateContent.insertBefore;
            let defaultTemplate;
            if (void 0 === clPolymerModeSwitcherTemplateDefault || null === clPolymerModeSwitcherTemplateDefault) {
                defaultTemplate = clDefaultTemplate();
                clPolymerModeSwitcherTemplateDefault = defaultTemplate
            }
            defaultTemplate = clPolymerModeSwitcherTemplateDefault;
            templateInsertBefore.call(templateContent, defaultTemplate.content.cloneNode(true), template.content.firstChild);

            return clPolymerModeSwitcherTemplate = template;
        }

        return clPolymerModeSwitcherTemplate;
  	}
}

__decorate(
    [
        property({ type: Array })
    ], 
    clPolymerModeSwitcher.prototype, 
    "tabs", 
    void 0
);

__decorate(
    [
        property({ type: String })
    ], 
    clPolymerModeSwitcher.prototype, 
    "selectedTab", 
    void 0
);


__decorate(
    [
        property({ type: Function, }),
        observe("selectedTab")
    ], 
    clPolymerModeSwitcher.prototype, 
    "onCurrentSelectedTabChanged", 
    null
);

__decorate(
    [
        property({ type: Number })
    ], 
    clPolymerModeSwitcher.prototype, 
    "selectedTabIndex", 
    void 0
);

__decorate(
    [
        property({ type: Boolean, reflectToAttribute: true })
    ], 
    clPolymerModeSwitcher.prototype, 
    "scrollable", 
    void 0
);

__decorate(
    [
        property({ type: Boolean, reflectToAttribute: true })
    ], 
    clPolymerModeSwitcher.prototype, 
    "customStyle", 
    void 0
);

clPolymerModeSwitcher = __decorate([
    customElement("cl-polymer-mode-switcher")
], clPolymerModeSwitcher);

export { clPolymerModeSwitcher };