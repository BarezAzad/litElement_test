import { LitElement, html,css } from 'lit-element';

class MyFooter extends LitElement {

  static get styles () {
    return css `
    footer{
      color: darkgreen;
      background-color: rgb(198, 204, 207);
      text-align:center;
      position: fixed;
      width: 100%;
      font-size: 20px;
      bottom: 0;
    }
    `;
  }

  render() {
    return html`
       <footer>
      <small>©2020 Barez Hawrami</small>
      </footer>
    `;
  }
}
customElements.define('my-footer', MyFooter);