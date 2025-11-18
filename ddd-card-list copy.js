/**
 * Copyright 2025 Christopher-McLaughlin-211
 * @license Apache-2.0, see LICENSE for full text.
 */
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";

/**
 * `ddd-card-list`
 * A reusable card component for textbook listings
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
    this.classCode = "";
    this.price = "";
  }

  static get properties() {
    return {
      ...super.properties,
      title: { type: String },
      image: { type: String },
      description: { type: String },
      href: { type: String },
      classCode: { type: String },
      price: { type: String },
    };
  }

  static get styles() {
    return [super.styles,
      css`
        :host {
          display: inline-block;
          font-family: var(--ddd-font-navigation);
        }
        .card {
          max-width: 320px;
          border-radius: var(--ddd-radius-sm);
          background-color: var(--ddd-theme-default-white);
          box-shadow: var(--ddd-boxShadow-md);
          overflow: hidden;
          transition: transform 0.2s ease-in-out;
        }
        .card:hover {
          transform: translateY(-4px);
        }
        .card img {
          width: 100%;
          height: auto;
          display: block;
          border-bottom: 4px solid var(--ddd-theme-default-nittanyNavy);
        }
        .content {
          padding: var(--ddd-spacing-3);
        }
        .title {
          font-size: var(--ddd-font-size-lg);
          font-weight: var(--ddd-font-weight-bold);
          margin: 0 0 var(--ddd-spacing-2);
          color: var(--ddd-theme-default-nittanyNavy);
        }
        .meta {
          font-size: var(--ddd-font-size-sm);
          color: var(--ddd-theme-default-potential75);
          margin-bottom: var(--ddd-spacing-2);
        }
        .description {
          font-size: var(--ddd-font-size-sm);
          color: var(--ddd-theme-default-potential75);
          margin-bottom: var(--ddd-spacing-3);
        }
        button {
          background-color: var(--ddd-theme-default-link);
          color: var(--ddd-theme-default-roarMaxlight);
          padding: var(--ddd-spacing-2) var(--ddd-spacing-3);
          border-radius: var(--ddd-radius-sm);
          border: none;
          width: 100%;
          cursor: pointer;
          transition: background-color 0.3s;
        }
        button em {
          font-style: normal;
          font-weight: var(--ddd-font-weight-bold);
          font-size: var(--ddd-font-size-md);
        }
        button:hover {
          background-color: var(--ddd-theme-default-nittanyNavy);
        }
      `];
  }

  render() {
    return html`
      <div class="card">
        <img src=${this.image} alt=${this.title || "Textbook image"} />
        <div class="content">
          <h2 class="title">${this.title}</h2>
          ${this.classCode ? html`<div class="meta">Class: ${this.classCode}</div>` : ""}
          ${this.price ? html`<div class="meta">Price: ${this.price}</div>` : ""}
          <div class="description">
            <slot>${this.description}</slot>
          </div>
          <a href=${this.href} target="_blank" rel="noopener">
            <button><em>Message Seller ></em></button>
          </a>
        </div>
      </div>
    `;
  }

  static get haxProperties() {
    return new URL(`./lib/${this.tag}.haxProperties.json`, import.meta.url).href;
  }
}

globalThis.customElements.define(DddCardList.tag, DddCardList);
