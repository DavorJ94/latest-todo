import { h } from "preact";
import { html } from "htm/preact";
import styles from "./Card.module.css";
import emitter from "../../eventEmitter";

export default function Card({ text, id }) {
  return html`<div className=${styles.cardComponent}>
    <div
      className=${styles.trashCan}
      onClick=${() => {
        emitter.emit("itemDeletedFromTrash", id);
      }}
    ></div>
    <p className=${styles.cardText}>${text}</p>
  </div>`;
}
