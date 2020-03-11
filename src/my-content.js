import { LitElement, html,css } from 'lit-element';
import "@vaadin/vaadin-text-field";
import "@vaadin/vaadin-button";
import "@vaadin/vaadin-checkbox";
import "@vaadin/vaadin-radio-button/vaadin-radio-button";
import "@vaadin/vaadin-radio-button/vaadin-radio-group";

const VisibilityFilters = {
  show_all: "all",
  show_active: "active",
  show_completed: "completed"
};

class MyContent extends LitElement {
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

  static get properties() {
    return {
      todos: { type: Array },
      filter: { type: String },
      task: { type: String }
    };
  }
  constructor() {
    super();
    this.todos = [];
    this.filter = VisibilityFilters.show_all;
    this.task = "";
  }

  render() {
    return html`
       <content align="center">
        <div class="input-layout" @keyup="${this.shortcutListener}">
          <vaadin-text-field
            placeholder="Task"
            value="${this.task}"
            @change="${this.updateTask}"
          >
          </vaadin-text-field>
          <vaadin-button theme="primary" @click="${this.addTodo}">
            Add Task
          </vaadin-button>
        </div>
        <div class="todos-list" >
        ${this.applyFilter(this.todos).map(
            todo => html`
              <div class="todo-item" align="left">
                <vaadin-checkbox
                  ?checked="${todo.complete}"
                  @change="${e =>
                    this.updateTodoStatus(todo, e.target.checked)}">
                  ${todo.task}
                </vaadin-checkbox>
              </div>
            `
          )}
        </div>

        <vaadin-radio-group
          class="visibility-filters"
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
      this.todos = [
        ...this.todos,
        {
          task: this.task,
          complate: false
        }
      ];
      this.task = "";
    }
  }

  updateTodoStatus(updatedTodo, complete) {
    this.todos = this.todos.map(todo =>
      updatedTodo === todo ? { ...updatedTodo, complete } : todo
    );
  }

  filterChanged(e) { 
    this.filter = e.target.value;
  }

  clearCompleted() { 
    this.todos = this.todos.filter(todo => !todo.complete);
  }
  applyFilter(todos) { 
    switch (this.filter) {
      case VisibilityFilters.show_active:
        return todos.filter(todo => !todo.complete);
      case VisibilityFilters.show_completed:
        return todos.filter(todo => todo.complete);
      default:
        return todos;
    }
  }

}
customElements.define('my-content', MyContent);