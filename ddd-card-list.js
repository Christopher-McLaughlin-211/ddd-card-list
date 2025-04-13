/**
 * Copyright 2025 Christopher-McLaughlin-211
 * @license Apache-2.0, see LICENSE for full text.
 */
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";

/**
 * `ddd-card-list`
 *
 * @demo index.html
 * @element ddd-card-list
 */
export class DddCardList extends DDDSuper(I18NMixin(LitElement)) {

  static get tag() {
    return "ddd-card-list";
  }

  constructor() {
    super();
    this.title = "";
    this.image = "";
    this.description = "";
    this.href = "";
  }

  static get properties() {
    return {
      ...super.properties,
      title: { type: String },
      image: { type: String },
      description: { type: String },
      href: { type: String },
    };
  }

  static get styles() {
    return [super.styles,
      css`
        :host {
          display: inline-block;
          color: var(--ddd-theme-primary);
          background-color: var(--ddd-theme-accent);
          font-family: var(--ddd-font-navigation);
        }
        .card {
          width: 310px;
          border-radius: var(--ddd-radius-sm);
          text-align: left;
          background-color: var(--ddd-theme-default-white);
        }
        .card img {
          width: 310px;
          height: 220px;
          border-radius: var(--ddd-radius-sm);
          border-bottom-left-radius: var(--ddd-bottom-left-radius-xs);
          border-bottom-right-radius: var(--ddd-bottom-right-radius-xs);
          border-bottom: 12px solid var(--ddd-theme-default-nittanyNavy);
        }
        .title {
          font-size: var(--ddd-font-size-lg);
          font-weight: var(--ddd-font-weight-bold);
          margin: var(--ddd-spacing-3) var(--ddd-spacing-4) var(--ddd-spacing-2);
          color: var(--ddd-theme-default-nittanyNavy);
        }
        .description {
          font-size: var(--ddd-font-size-sm);
          color: var(--ddd-theme-default-potential75);
          height: 180px;
          margin: 0 var(--ddd-spacing-4) var(--ddd-spacing-4);
        }
        button {
          background-color: var(--ddd-theme-default-link);
          color: var(--ddd-theme-default-roarMaxlight);
          margin-bottom: var(--ddd-spacing-4);
          margin-left: var(--ddd-spacing-3);
          padding: var(--ddd-spacing-2);
          border-radius: var(--ddd-radius-sm);
          border: var(--ddd-border-width-xs) solid var(--ddd-theme-default-nittanyNavy);
          width: 280px;
          height: 50px;
          cursor: pointer;
          transition: background-color 0.4s;
        }
        button em {
          font-style: normal;
          font-weight: var(--ddd-font-weight-bold);
          font-size: var(--ddd-font-size-lg);
        }
        button:hover {
          background-color: var(--ddd-theme-default-nittanyNavy);
          color: var(--ddd-theme-default-roarMaxlight);
        }
      `];
  }

  render() {
    return html`
      <div class="card">
        <img src=${this.image} alt=${this.title} />
        <h1 class="title">${this.title}</h1>
        <div class="description">
          <slot>${this.description}</slot>
        </div>
        <a href=${this.href} target="_blank">
          <button class="btn"><em>Explore ></em></button>
        </a>
      </div>
    `;
  }


  /**
   * haxProperties integration via file reference
   */
  static get haxProperties() {
    return new URL(`./lib/${this.tag}.haxProperties.json`, import.meta.url)
      .href;
  }
}

globalThis.customElements.define(DddCardList.tag, DddCardList);
