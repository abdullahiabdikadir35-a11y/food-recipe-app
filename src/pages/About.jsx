import "./About.css";

export default function About() {
  return (
    <section className="about">
      <h1 className="about__title">About</h1>

      {/* Kitchen / cooking vibe image */}
      <img
        className="about__image"
        src="https://images.pexels.com/photos/7653646/pexels-photo-7653646.jpeg"
        alt="Kitchen cooking scene"
      />

      <p className="about__text">
        This is a Food Recipe Management application built using Vite and React
        as a single-page application (SPA). The app allows users to view, add,
        update, and delete food recipes in a simple and user-friendly way.
      </p>

      {/* Recipe preparation image */}
      <img
        className="about__image"
        src="https://images.pexels.com/photos/5674152/pexels-photo-5674152.jpeg"
        alt="Recipe ingredients on a table"
      />

      <p className="about__text">
        The frontend is built with React and uses React Router to handle
        client-side routing, allowing smooth navigation between pages such as
        Home, Add Recipe, and About without reloading the page.
      </p>

      <p className="about__text">
        For the backend, we use a mock REST API powered by json-server. This API
        handles all data operations and supports GET, POST, PATCH, and DELETE
        requests, which enables full CRUD functionality for managing recipes.
      </p>

      {/* Finished food image */}
      <img
        className="about__image"
        src="https://images.pexels.com/photos/28935535/pexels-photo-28935535.jpeg"
        alt="Finished food dish"
      />

      <p className="about__text">
        This project was developed as part of the SDF-FT16 Module 3 Group
        Capstone Project to demonstrate core React concepts including
        components, state management, controlled forms, routing, and API
        integration.
      </p>
    </section>
  );
}
