<script setup>
import { ref } from 'vue'

const props = defineProps({
  loading: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['crear-tarea'])

const titulo = ref('')
const descripcion = ref('')
const error = ref('')

function enviarFormulario() {
  error.value = ''

  const tituloLimpio = titulo.value.trim()
  const descripcionLimpia = descripcion.value.trim()

  if (!tituloLimpio) {
    error.value = 'El título de la tarea es obligatorio.'
    return
  }

  if (tituloLimpio.length < 3) {
    error.value = 'El título debe tener al menos 3 caracteres.'
    return
  }

  emit('crear-tarea', {
    titulo: tituloLimpio,
    descripcion: descripcionLimpia,
    completada: false,
  })
}

function limpiarFormulario() {
  titulo.value = ''
  descripcion.value = ''
  error.value = ''
}

defineExpose({
  limpiarFormulario,
})
</script>

<template>
  <form class="formulario" @submit.prevent="enviarFormulario">
    <h3>Agregar nueva tarea</h3>

    <div class="campo">
      <label for="titulo">Título de la tarea</label>

      <input
        id="titulo"
        v-model="titulo"
        type="text"
        maxlength="100"
        placeholder="Ejemplo: Estudiar Vue 3"
        :disabled="props.loading"
        :aria-invalid="Boolean(error)"
        :aria-describedby="error ? 'error-titulo' : undefined"
        required
      />
    </div>

    <div class="campo">
      <label for="descripcion">Descripción</label>

      <textarea
        id="descripcion"
        v-model="descripcion"
        rows="4"
        maxlength="500"
        placeholder="Describe la tarea que deseas realizar"
        :disabled="props.loading"
      ></textarea>
    </div>

    <p v-if="error" id="error-titulo" class="error" role="alert">
      {{ error }}
    </p>

    <button type="submit" :disabled="props.loading">
      {{ props.loading ? 'Guardando...' : 'Guardar tarea' }}
    </button>
  </form>
</template>

<style scoped>
.formulario {
  padding: 24px;
  background-color: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
}

h3 {
  margin-top: 0;
  color: #244a85;
}

.campo {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 18px;
}

label {
  font-weight: 600;
}

input,
textarea {
  width: 100%;
  padding: 12px;
  border: 1px solid #cbd5e1;
  border-radius: 8px;
  font: inherit;
}

input:focus,
textarea:focus {
  outline: 2px solid #244a85;
  outline-offset: 2px;
}

button {
  padding: 12px 20px;
  background-color: #244a85;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font: inherit;
}

button:hover:not(:disabled) {
  background-color: #163661;
}

button:disabled {
  opacity: 0.65;
  cursor: not-allowed;
}

.error {
  color: #b91c1c;
  font-weight: 500;
}
</style>
