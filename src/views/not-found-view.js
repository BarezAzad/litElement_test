import { html, LitElement } from "lit-element";

class NotFoundView extends LitElement {
  render() {
    return html`
      <h1>View Not Found!</h1>
      <p>
          please check your url.
      </p>
    `;
  }
}

customElements.define('not-found-view',NotFoundView);