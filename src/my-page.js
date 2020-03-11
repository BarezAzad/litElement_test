import { LitElement, html } from 'lit-element';

import './my-header.js';
import './my-content.js';
import './my-footer.js';

class MyPage extends LitElement {
  render() {
    return html`
      <my-header></my-header>
      <my-content></my-content>
      <my-footer></my-footer>
    `;
  }
}
customElements.define('my-page', MyPage);