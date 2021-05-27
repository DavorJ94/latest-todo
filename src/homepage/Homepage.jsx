import { h } from "preact";
import { useEffect } from "preact/hooks";
import { html } from "htm/preact";
import freezer from "../store";
import styles from "./homepage.module.css";
import Column from "./components/Column";
import emitter from "../eventEmitter";
import { idGenerator } from "../utils/utilFunctions";

function Homepage() {
  useEffect(() => {
    const lexicalThis = this;
    freezer.on("update", function () {
      lexicalThis.forceUpdate();
    });
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", handleSubmit);
    return () => {
      document.removeEventListener("keydown", handleSubmit);
    };
  }, [handleSubmit]);

  function handleChange(e) {
    freezer.get().set("warningMessage", "").now();
    freezer.get().set("toDoText", e.target.value).now();
  }

  function handleSubmit(e) {
    if (freezer.get().toDoText === "") {
      if (e.keyCode === 13 || e.target.getAttribute("data-clicked")) {
        freezer
          .get()
          .set("warningMessage", "You cannot add an empty to do item.")
          .now();
      }
      return;
    }
    if (e.keyCode === 13 || e.target.getAttribute("data-clicked")) {
      const id = idGenerator();
      emitter.emit("Added to do item", {
        text: freezer.get().toDoText,
        status: "todo",
        id: id,
      });
      freezer.get().set("toDoText", "").now();
    }
  }

  return html`<div>
      <div className=${styles.addTodo}>
        <input
          value=${freezer.get().toDoText}
          onInput=${handleChange}
          className=${styles.inputTodo}
        ></input>
        <button
          className=${styles.btnAddTodo}
          data-clicked=true
          onClick=${handleSubmit}
        >
          Add to do item
        </button>
      </div>
      ${
        freezer.get().warningMessage &&
        html`<div className=${styles.warningMessage}>
          ${freezer.get().warningMessage}
        </div>`
      }
      <div className=${styles.columnContainer}>
        <${Column}
          title="To do"
          type="todo"
          items=${freezer.get().toDoItems}
        />
        <${Column}
          title="In progress"
          type="in-progress"
          items=${freezer.get().toDoItems}
        />
        <${Column}
          title="Completed"
          type="completed"
          items=${freezer.get().toDoItems}
        />
      </div>
    </div>`;
}

export default Homepage;
