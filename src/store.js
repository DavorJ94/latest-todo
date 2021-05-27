import emitter from "./eventEmitter";
import Freezer from "freezer-js";
import { indexOfDeletedItem, indexOfToDoItem } from "./utils/utilFunctions";

if (!localStorage.getItem("deletedItems"))
  localStorage.setItem("deletedItems", "[]");

if (!localStorage.getItem("toDoItems")) localStorage.setItem("toDoItems", "[]");

let freezer = new Freezer({
  deletedItems: JSON.parse(localStorage.getItem("deletedItems")),
  toDoText: "",
  toDoItems: JSON.parse(localStorage.getItem("toDoItems")),
  warningMessage: "",
});
export let initialState = freezer.get();

// ! Trash page //

emitter.addListener("itemDeletedFromTrash", function (input) {
  freezer.get().deletedItems.splice(indexOfDeletedItem(input), 1);
  localStorage.setItem(
    "deletedItems",
    JSON.stringify(freezer.get().deletedItems)
  );
});

// ! Trash page //

// ! Homepage //

emitter.addListener("Added to do item", function (input) {
  freezer.get().toDoItems.push(input);
  localStorage.setItem("toDoItems", JSON.stringify(freezer.get().toDoItems));
});

emitter.addListener("Deleted item", function (input) {
  const currentItemIndex = indexOfToDoItem(input);
  freezer.get().deletedItems.push(freezer.get().toDoItems[currentItemIndex]);
  freezer.get().toDoItems.splice(currentItemIndex, 1);
  localStorage.setItem("toDoItems", JSON.stringify(freezer.get().toDoItems));
  localStorage.setItem(
    "deletedItems",
    JSON.stringify(freezer.get().deletedItems)
  );
});

emitter.addListener("Change task status", function (input, arrowType) {
  const currentItemIndex = indexOfToDoItem(input);
  const currentStatus = freezer.get().toDoItems[currentItemIndex].status;
  let nextStatus;
  arrowType === "right"
    ? (nextStatus = currentStatus === "todo" ? "in-progress" : "completed")
    : (nextStatus = currentStatus === "completed" ? "in-progress" : "todo");
  freezer.get().toDoItems.set(currentItemIndex, {
    ...freezer.get().toDoItems[currentItemIndex],
    status: nextStatus,
  });
  localStorage.setItem("toDoItems", JSON.stringify(freezer.get().toDoItems));
});

// ! Homepage //

export default freezer;
