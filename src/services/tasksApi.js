const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

async function solicitar(ruta, opciones = {}) {
  const { signal, headers, ...configuracion } = opciones

  let respuesta

  try {
    respuesta = await fetch(`${API_URL}${ruta}`, {
      ...configuracion,
      signal,
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
    })
  } catch (error) {
    if (error.name === 'AbortError') {
      throw error
    }

    throw new Error(
      'No fue posible conectar con el servidor. Verifica tu conexión y que la API esté activa.',
    )
  }

  if (!respuesta.ok) {
    throw new Error(`Error HTTP ${respuesta.status}: no se pudo completar la operación.`)
  }

  if (respuesta.status === 204) {
    return null
  }

  return respuesta.json()
}

export const tasksApi = {
  obtenerTodas(signal) {
    return solicitar('/tareas', { signal })
  },

  crear(tarea) {
    return solicitar('/tareas', {
      method: 'POST',
      body: JSON.stringify(tarea),
    })
  },

  actualizar(id, cambios) {
    return solicitar(`/tareas/${encodeURIComponent(id)}`, {
      method: 'PATCH',
      body: JSON.stringify(cambios),
    })
  },

  eliminar(id) {
    return solicitar(`/tareas/${encodeURIComponent(id)}`, {
      method: 'DELETE',
    })
  },
}
