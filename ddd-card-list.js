import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";

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
      price: { type: String }
    };
  }

  static get styles() {
    return [
      super.styles,
      css`
        :host {
          display: block;
        }

        .card {
          background: white;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 4px 20px rgba(0,0,0,0.08);
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }

        .card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 30px rgba(0,0,0,0.12);
        }

        .image-wrapper img {
          width: 100%;
          height: auto;
          display: block;
        }

        .content {
          padding: 20px;
        }

        h2 {
          font-size: 1.2rem;
          margin: 0 0 10px;
          font-weight: 600;
          color: #1a3a6b;
        }

        .meta {
          font-size: 0.9rem;
          color: #555;
          margin-bottom: 6px;
        }

        .description {
          font-size: 0.95rem;
          color: #444;
          margin: 12px 0 20px;
          line-height: 1.4rem;
        }

        a {
          text-decoration: none;
        }

        button {
          width: 100%;
          padding: 12px;
          border: none;
          border-radius: 8px;
          background: #1a3a6b;
          color: white;
          font-weight: 600;
          cursor: pointer;
          font-size: 1rem;
          transition: background 0.25s ease;
        }

        button:hover {
          background: #10294f;
        }
      `
    ];
  }

  render() {
    return html`
      <div class="card">
        <div class="image-wrapper">
          <img src=${this.image} alt=${this.title || "Textbook image"} />
        </div>

        <div class="content">
          <h2>${this.title}</h2>

          ${this.classCode
            ? html`<div class="meta">Class: ${this.classCode}</div>`
            : ""}

          ${this.price
            ? html`<div class="meta">Price: ${this.price}</div>`
            : ""}

          <div class="description">
            <slot>${this.description}</slot>
          </div>

          <a href=${this.href} target="_blank">
            <button>Message Seller →</button>
          </a>
        </div>
      </div>
    `;
  }
}

customElements.define(DddCardList.tag, DddCardList);
