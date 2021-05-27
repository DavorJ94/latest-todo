import { h } from "preact";
import { useEffect } from "preact/hooks";
import { html } from "htm/preact";
import freezer from "../store";
import styles from "./trashpage.module.css";
import Column from "./components/Column";

function TrashPage() {
  useEffect(() => {
    const lexicalThis = this;
    freezer.on("update", function () {
      lexicalThis.forceUpdate();
    });
  }, []);

  return html`<div>
    <div className=${styles.columnContainer}>
      <${Column} title="Deleted items" items=${freezer.get().deletedItems} />
    </div>
  </div>`;
}

export default TrashPage;
