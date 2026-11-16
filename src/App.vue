<script setup>
import AppHeader from './components/AppHeader.vue'
</script>

<template>
  <div class="aplicacion">
    <AppHeader />

    <main id="contenido-principal" class="contenido">
      <RouterView />
    </main>
  </div>
</template>

<style>
* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: Arial, Helvetica, sans-serif;
  background-color: #f4f6fa;
  color: #1e293b;
}

.aplicacion {
  min-height: 100vh;
}

.contenido {
  width: min(1100px, 100%);
  margin: 0 auto;
  padding: 32px 20px;
}

.pagina {
  background-color: white;
  padding: 32px;
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
}

.pagina h2 {
  color: #244a85;
}
</style>
