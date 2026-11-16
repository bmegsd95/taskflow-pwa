<script setup>
import TaskItem from './TaskItem.vue'

defineProps({
  tareas: {
    type: Array,
    required: true,
  },

  loading: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['completar', 'eliminar'])
</script>

<template>
  <section class="contenedor-lista" aria-labelledby="titulo-lista">
    <h3 id="titulo-lista">Listado de tareas</h3>

    <p v-if="tareas.length === 0" class="vacio" role="status">No existen tareas registradas.</p>

    <ul v-else class="lista">
      <TaskItem
        v-for="tarea in tareas"
        :key="tarea.id"
        :tarea="tarea"
        :loading="loading"
        @completar="emit('completar', $event)"
        @eliminar="emit('eliminar', $event)"
      />
    </ul>
  </section>
</template>

<style scoped>
.contenedor-lista {
  margin-top: 30px;
}

h3 {
  color: #244a85;
}

.lista {
  display: grid;
  gap: 14px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.vacio {
  padding: 24px;
  background-color: #f8fafc;
  border: 1px dashed #94a3b8;
  border-radius: 10px;
  color: #475569;
  text-align: center;
}
</style>
