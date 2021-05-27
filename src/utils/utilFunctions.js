import freezer from "../store";

export const indexOfDeletedItem = (input) => {
  let deletedItemIndex = -1;
  freezer.get().deletedItems.forEach((item, index) => {
    if (item.id === input) deletedItemIndex = index;
  });
  return deletedItemIndex;
};

export const indexOfToDoItem = (input) => {
  let toDoItemIndex = -1;
  freezer.get().toDoItems.forEach((item, index) => {
    if (item.id === input) toDoItemIndex = index;
  });
  return toDoItemIndex;
};

export const idGenerator = () => {
  const deletedItems = JSON.parse(localStorage.getItem("deletedItems"));
  const toDoItems = JSON.parse(localStorage.getItem("toDoItems"));

  const allItemsInLocalStorage = [...deletedItems, ...toDoItems];

  const parsedArray = allItemsInLocalStorage.map((x) => +x.id);

  let i = 1;
  while (true) {
    if (parsedArray.includes(i)) i++;
    else break;
  }
  return i;
};
