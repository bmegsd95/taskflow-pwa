<script setup>
defineProps({
  tarea: {
    type: Object,
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
  <li class="tarea">
    <div class="informacion">
      <h4 :class="{ completada: tarea.completada }">
        {{ tarea.titulo }}
      </h4>

      <p v-if="tarea.descripcion">
        {{ tarea.descripcion }}
      </p>

      <span class="estado" :class="{ finalizada: tarea.completada }">
        {{ tarea.completada ? 'Completada' : 'Pendiente' }}
      </span>
    </div>

    <div class="acciones">
      <button
        v-if="!tarea.completada"
        type="button"
        :disabled="loading"
        class="boton-completar"
        @click="emit('completar', tarea.id)"
      >
        Completar
      </button>

      <button
        type="button"
        class="boton-eliminar"
        :disabled="loading"
        @click="emit('eliminar', tarea.id)"
      >
        Eliminar
      </button>
    </div>
  </li>
</template>

<style scoped>
.tarea {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
  padding: 20px;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  background-color: white;
  button:disabled {
    opacity: 0.55;
    cursor: not-allowed;
  }
}

.informacion {
  flex: 1;
  min-width: 180px;
}

h4 {
  margin: 0 0 8px;
  color: #244a85;
}

p {
  margin: 0 0 12px;
  color: #475569;
}

.completada {
  text-decoration: line-through;
  color: #64748b;
}

.estado {
  display: inline-block;
  padding: 5px 10px;
  border-radius: 6px;
  background-color: #fef3c7;
  color: #92400e;
  font-size: 13px;
}

.estado.finalizada {
  background-color: #dcfce7;
  color: #166534;
}

.acciones {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

button {
  padding: 9px 14px;
  border: none;
  border-radius: 7px;
  color: white;
  cursor: pointer;
}

.boton-completar {
  background-color: #15803d;
}

.boton-eliminar {
  background-color: #b91c1c;
}

button:focus-visible {
  outline: 3px solid #244a85;
  outline-offset: 3px;
}

@media (max-width: 600px) {
  .acciones {
    width: 100%;
  }
}
</style>
