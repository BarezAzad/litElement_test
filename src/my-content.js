import { LitElement, html } from 'lit-element';

class MyContent extends LitElement {
  render() {
    return html`
      <content>content</content>
    `;
  }
}
customElements.define('my-content', MyContent);