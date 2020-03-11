import { LitElement, html,css } from 'lit-element';

class MyHeader extends LitElement {

  static get styles(){
    return css `
    header {
      margin : 0;
      background-color:  rgb(8, 61, 104);
      padding:10px;
    }
    h1 {
      margin: 0;
      color: white;
    }
     `;
  }

  render() {
    return html`
       <header>
      <h1>ToDo App</h1>
      </header>
    `;
  }
}
customElements.define('my-header', MyHeader);