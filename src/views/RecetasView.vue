<template>
  <div>
    <h1 class="text-h4 pa-4">Las Recetas de la Abuela</h1>

    <lista-recetas
      :recetas="recetas"
      @toggle-favorita="onToggleFavorita"
      @eliminar-receta="onEliminarReceta"
    >
    </lista-recetas>
  </div>
</template>

<script>
import ListaRecetas from '@/components/ListaRecetas.vue'

export default {
  name: 'RecetasView',
  components: {
    ListaRecetas,
  },
  data() {
    return {
      recetas: [],
    }
  },

  mounted() {
    this.cargarRecetas()
  },
  methods: {
    cargarRecetas() {
      // leemos de LocalStorage.
      var datosGuardados = localStorage.getItem('recetas')
      this.recetas = datosGuardados ? JSON.parse(datosGuardados) : []
    },

    // Método para guardar los cambios en LocalStorage
    guardarRecetasEnStorage() {
      localStorage.setItem('recetas', JSON.stringify(this.recetas))
    },

    // Manejador para el evento 'toggle-favorita'
    onToggleFavorita(recetaId) {
      const receta = this.recetas.find((r) => r.id === recetaId)
      if (receta) {
        receta.favorita = !receta.favorita
        this.guardarRecetasEnStorage()
      }
    },

    // Manejador para el evento 'eliminar-receta'
    onEliminarReceta(recetaId) {
      if (confirm('¿Eliminar receta?')) {
        this.recetas = this.recetas.filter((r) => r.id !== recetaId)
        this.guardarRecetasEnStorage()
      }
    },
  },
}
</script>
