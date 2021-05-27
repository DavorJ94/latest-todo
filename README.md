# Central store and emitter/listener implementation on a simple to do app

- For central store data management freezer.js is used;

- For emitter/listener fbemitter is used;

- Preact for view components;

- Htm for JSX markup section;

- Navigo for routing.

The goal was to have separate components for each page (multiple components have their divs in public html file), which will have central store/data management and which will communicate using emitters.

For example, the trash page is lazy loaded and takes up the data from the central store once the user visits that page.

Also, small implementation of storybook pattern is added for better component understanding.
