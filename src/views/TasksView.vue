<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import TaskForm from '../components/TaskForm.vue'
import TaskList from '../components/TaskList.vue'
import { tasksApi } from '../services/tasksApi.js'

const formulario = ref(null)
const tareas = ref([])
const cargando = ref(false)
const procesando = ref(false)
const error = ref('')
const exito = ref('')

let controlador = null
let numeroConsulta = 0
let componenteActivo = true

async function cargarTareas() {
  if (procesando.value) return

  controlador?.abort()

  const consultaActual = ++numeroConsulta
  controlador = new AbortController()

  cargando.value = true
  error.value = ''

  try {
    const datos = await tasksApi.obtenerTodas(controlador.signal)

    if (consultaActual === numeroConsulta) {
      if (!Array.isArray(datos)) {
        throw new Error('La API no devolvió una lista válida.')
      }

      tareas.value = datos
    }
  } catch (e) {
    if (e.name !== 'AbortError' && consultaActual === numeroConsulta) {
      error.value = e.message
    }
  } finally {
    if (consultaActual === numeroConsulta) {
      cargando.value = false
      controlador = null
    }
  }
}

async function ejecutarOperacion(operacion, mensaje) {
  if (procesando.value || cargando.value) return false

  procesando.value = true
  error.value = ''
  exito.value = ''

  try {
    const resultado = await operacion()

    if (componenteActivo) {
      exito.value = mensaje
    }

    return resultado
  } catch (e) {
    if (componenteActivo) {
      error.value = e.message
    }

    return false
  } finally {
    if (componenteActivo) {
      procesando.value = false
    }
  }
}

async function recibirTarea(nuevaTarea) {
  const creada = await ejecutarOperacion(
    () => tasksApi.crear(nuevaTarea),
    'La tarea se guardó correctamente.',
  )

  if (creada && componenteActivo) {
    tareas.value.push(creada)
    formulario.value?.limpiarFormulario()
  }
}

async function completarTarea(id) {
  const actualizada = await ejecutarOperacion(
    () => tasksApi.actualizar(id, { completada: true }),
    'La tarea se completó correctamente.',
  )

  if (actualizada && componenteActivo) {
    tareas.value = tareas.value.map((tarea) => (tarea.id === id ? actualizada : tarea))
  }
}

async function eliminarTarea(id) {
  const eliminada = await ejecutarOperacion(
    () => tasksApi.eliminar(id),
    'La tarea se eliminó correctamente.',
  )

  if (eliminada !== false && componenteActivo) {
    tareas.value = tareas.value.filter((tarea) => tarea.id !== id)
  }
}

onMounted(cargarTareas)

onUnmounted(() => {
  componenteActivo = false
  numeroConsulta++
  controlador?.abort()
})
</script>

<template>
  <section class="pagina">
    <h2>Mis tareas</h2>

    <p>Administra tus tareas mediante nuestra API REST.</p>

    <TaskForm ref="formulario" :loading="procesando || cargando" @crear-tarea="recibirTarea" />

    <div class="mensajes" aria-live="polite">
      <p v-if="cargando" role="status">Cargando tareas...</p>

      <p v-if="procesando" role="status">Procesando operación...</p>

      <p v-if="error" class="error" role="alert">
        {{ error }}
      </p>

      <p v-if="exito" class="exito" role="status">
        {{ exito }}
      </p>
    </div>

    <button
      class="actualizar"
      v-if="!error"
      type="button"
      :disabled="cargando || procesando"
      @click="cargarTareas"
    >
      Actualizar listado
    </button>

    <TaskList
      v-if="!cargando && !error"
      :tareas="tareas"
      :loading="procesando || cargando"
      @completar="completarTarea"
      @eliminar="eliminarTarea"
    />

    <button
      v-if="error && !cargando"
      class="actualizar"
      type="button"
      :disabled="procesando"
      @click="cargarTareas"
    >
      Reintentar consulta
    </button>
  </section>
</template>

<style scoped>
.mensajes {
  margin-top: 16px;
}

.error {
  padding: 12px;
  border-radius: 8px;
  background-color: #fee2e2;
  color: #991b1b;
}

.exito {
  padding: 12px;
  border-radius: 8px;
  background-color: #dcfce7;
  color: #166534;
}

.actualizar {
  margin-top: 12px;
  padding: 10px 16px;
  border: none;
  border-radius: 8px;
  background-color: #244a85;
  color: white;
  cursor: pointer;
}

.actualizar:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.actualizar:focus-visible {
  outline: 3px solid #244a85;
  outline-offset: 3px;
}
</style>
