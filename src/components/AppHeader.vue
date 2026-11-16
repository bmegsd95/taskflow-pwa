<template>
  <header class="encabezado">
    <div class="marca">
      <h1>TaskFlow</h1>
      <p>Gestor de tareas</p>
    </div>

    <nav aria-label="Navegación principal">
      <RouterLink to="/">Inicio</RouterLink>
      <RouterLink to="/tareas">Mis tareas</RouterLink>
      <RouterLink to="/acerca">Acerca de</RouterLink>
    </nav>
  </header>
</template>

<style scoped>
.encabezado {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;
  padding: 24px;
  background-color: #244a85;
  color: white;
}

.marca h1 {
  margin: 0;
  font-size: 28px;
}

.marca p {
  margin: 5px 0 0;
  font-size: 14px;
}

nav {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

nav a {
  color: white;
  text-decoration: none;
  padding: 8px;
  border-radius: 6px;
}

nav a:hover,
nav a.router-link-exact-active {
  background-color: #4168a0;
}

nav a:focus-visible {
  outline: 3px solid white;
  outline-offset: 3px;
}

@media (max-width: 600px) {
  .encabezado {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
