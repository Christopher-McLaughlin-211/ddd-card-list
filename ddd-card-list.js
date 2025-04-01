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
    this.url = "";
    this.loading = false;
  }

  static get properties() {
    return {
      ...super.properties,
      title: { type: String },
      image: { type: String },
      description: { type: String },
      url: { type: String },
      loading: { type: Boolean, reflect: true },
    };
  }

  static get styles() {
    return [super.styles,
      css`
        :host {
          display: block;
          color: var(--ddd-theme-primary);
          background-color: var(--ddd-theme-accent);
          font-family: var(--ddd-font-navigation);
        }
        .card {
          width: 350px;
          border-radius: var(--ddd-radius-sm);
          margin: 20px auto;
          box-shadow: var(--ddd-boxShadow-sm);
          text-align: center;
          padding: var(--ddd-spacing-4);
          background-color: var(--ddd-theme-default-coalyGray);
          margin: var(--ddd-spacing-0);
        }
        .title {
          font-size: var(--ddd-font-size-s);
          font-weight: var(--ddd-font-weight-bold);
          margin-bottom: var(--ddd-spacing-2);
          margin-top: var(--ddd-spacing-2);
          color: var(--ddd-theme-default-white);
        }
        .card img {
          max-width: 200px;
          max-height: 150px;
          height: auto;
          border-radius: var(--ddd-radius-sm);
          border: var(--ddd-border-sm);
          border-color: var(--ddd-border-color-white);
          margin: var(--ddd-spacing-2) 0;
        }
        button {
          background-color: var(--ddd-theme-default-white);
          color: var(--ddd-theme-default-coalyGray);
          padding: var(--ddd-spacing-2);
          border: var(--ddd-border-sm);
          border-radius: var(--ddd-radius-sm);
          cursor: pointer;
          transition: background-color 0.4s;
        }
        button:hover {
          background-color: var(--ddd-theme-default-coalyGray);
          color: var(--ddd-theme-default-white);
        }
        .description {
          font-size: var(--ddd-font-size-xs);
          color: var(--ddd-theme-default-white);
          height: 70px;
          overflow: auto;
          margin-bottom: var(--ddd-spacing-4);
        }
      `];
  }

  async getData(link) {
    const url = `https://open-apis.hax.cloud/api/services/website/metadata?q=${link}`;
    try {
      this.loading = true;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      const json = await response.json();
      console.log(json.data);
      this.title = json.data["og:title"] || json.data["title"] || "No title available";
      this.image = json.data["og:image"] || json.data["logo"] || "";
      this.description = json.data["og:description"] || "No description available";
      this.url = json.data["og:url"] || link;
      console.log(this.title);

      if (json.data['cool:card']) {
      }
      } catch (error) {
         console.error("Error fetching metadata:", error.message);
      } finally {
        this.loading = false;
      }
    }

  updated(changedProperties) {
    if (changedProperties.has("url") && this.url) {
      this.getData(this.url);
    }
  }

  render() {
    return html`
      <div class="card">
        <h1 class="title">${this.title}</h1>
        <img src=${this.image} alt=${this.title} />
        <div class="description">
          <slot>${this.description}</slot>
        </div>
        <a href=${this.url} target="_blank">
          <button class="btn"><em>Go to Website</em></button>
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
