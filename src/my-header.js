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
    nav {
        list-style-type: none;
        margin: 0;
        padding: 5px;
        overflow: hidden;
        background-color: #e2e2e2;
      }
      a {
        /* display: block; */
        font-size: 25px;
        color: black;
        font-weight:bold;
        text-align: center;
        padding: 10px 10px;
        text-decoration: none;
      }
      a:hover {
        background-color: #b3b3b3;
      }
     `;
  }

  render() {
    return html`
       <header>
      <h1>ToDo App</h1>
      </header>
      <nav>
        <a href="/">Todos</a>
        <a href="/users">Users</a>
      </nav>
    `;
  }
}
customElements.define('my-header', MyHeader);