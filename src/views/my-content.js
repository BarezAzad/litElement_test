import { LitElement, html, css } from "lit-element";
import "@vaadin/vaadin-text-field";
import "@vaadin/vaadin-button";
import "@vaadin/vaadin-checkbox";
import "@vaadin/vaadin-radio-button/vaadin-radio-button";
import "@vaadin/vaadin-radio-button/vaadin-radio-group";
import "@vaadin/vaadin-list-box";
import "@vaadin/vaadin-item";
import {
  VisibilityFilters,
  getVisibleTodosSelector
} from "../redux/reducer.js";
import { connect } from "pwa-helpers";
import { store } from "../redux/store.js";
import {
  addTodo,
  updateTodoStatus,
  updateFilter,
  clearCompleted
} from "../redux/actions.js";

class MyContent extends connect(store)(LitElement) {
  static get properties() {
    return {
      // tasks
      todos: { type: Array },
      filter: { type: String },
      task: { type: String },

      // program language list
      list: { type: Array },
      subject: { type: Object }
    };
  }

  constructor() {
    super();
    this.list = ["Golang", "Node.Js", "Python"];
    this.subject = { hardwer: "Hardwer List", ProgramLang: "Program Language" };
  }

  static get styles() {
    return css`
      content {
        margin: 0;
      }
      .input-layout {
        padding-top: 20px;
      }
    `;
  }

  stateChanged(state) {
    this.todos = getVisibleTodosSelector(state);
    this.filter = state.filter;
  }

  render() {
    return html`
       <content align="center">
        <div class="input-layout" @keyup="${this.shortcutListener}">
          <vaadin-text-field
            placeholder="Task"
            value="${this.task || ""}"
            @change="${this.updateTask}"
          >
          </vaadin-text-field>
          <vaadin-button theme="primary" @click="${this.addTodo}">
            Add Task
          </vaadin-button>
        </div>
        <div >
        ${this.todos.map(
          todo => html`
            <div class="todo-item" align="left">
              <vaadin-checkbox
                ?checked="${todo.complete}"
                @change="${e => this.updateTodoStatus(todo, e.target.checked)}"
              >
                ${todo.task}
              </vaadin-checkbox>
            </div>
          `
        )}
        </div>

        <vaadin-radio-group
          value="${this.filter}"
          @value-changed="${this.filterChanged}"
        >
          ${Object.values(VisibilityFilters).map(
            filter => html`
              <vaadin-radio-button value="${filter}">
                ${filter}
              </vaadin-radio-button>
            `
          )}
        </vaadin-radio-group>
        <vaadin-button @click="${this.clearCompleted}">
          Clear completed
        </vaadin-button>

        <br/><br/>
        <vaadin-list-box>
          <h2><b>${this.subject.ProgramLang}</b><br/></h2>
          ${this.list.map(
            (item, index) =>
              html`
                <vaadin-item>
                  ${index}- ${item}
                </vaadin-item>
              `
          )}
          <vaadin-list-box>

      </content>
    `;
  }

  shortcutListener(e) {
    if (e.key == "Enter") {
      this.addTodo();
    }
  }

  updateTask(e) {
    this.task = e.target.value;
  }

  addTodo() {
    if (this.task) {
      store.dispatch(addTodo(this.task));
      this.task = "";
    }
  }

  updateTodoStatus(updatedTodo, complete) {
    store.dispatch(updateTodoStatus(updatedTodo, complete));
  }

  filterChanged(e) {
    this.filter = e.target.value;
    store.dispatch(updateFilter(e.detail.value));
  }

  clearCompleted() {
    store.dispatch(clearCompleted());
  }
}
customElements.define("my-content", MyContent);
