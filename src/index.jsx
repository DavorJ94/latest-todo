import { h, render } from "preact";
import { lazy, Suspense } from "preact/compat"
import { html } from "htm/preact";
import Navigo from "navigo";
import Navbar from "./navbar/Navbar";
import Homepage from "./homepage/Homepage";

const TrashPage = lazy(() => import("./trashPage/TrashPage"))

const router = new Navigo("/");

render(html`<${Navbar} />`, document.getElementById("navbar"));

render(html`<${Homepage} />`, document.getElementById("homepage"));

router
  .on("", () => {
    document.getElementById("homepage").style.display = "";
    document.getElementById("trash").style.display = "none";
  })
  .resolve();

router
  .on("trash", () => {
    document.getElementById("homepage").style.display = "none";
    document.getElementById("trash").style.display = "";
    render(html`
    <${Suspense} fallback=${html`<div>loading outer...</div>`}>
      <${TrashPage} />
    </${Suspense}>`, document.getElementById("trash"));
  })
  .resolve();

document.querySelectorAll("a").forEach((e) => {
  e.addEventListener("click", (event) => {
    event.preventDefault();
    router.navigate(e.pathname);
  });
});
