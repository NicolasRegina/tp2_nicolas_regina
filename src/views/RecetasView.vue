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
    ListaRecetas, // Registramos el componente
  },
  data() {
    return {
      recetas: [],
    }
  },
  mounted() {
    //Init
    this.cargarRecetas()
  },
  methods: {
    // Método para cargar las recetas desde LocalStorage
    cargarRecetas() {
      var datosGuardados = localStorage.getItem('recetas')
      this.recetas = datosGuardados
        ? JSON.parse(datosGuardados)
        : [
            // Datos iniciales por si LocalStorage está vacío
            {
              id: 1,
              nombre: 'Milanesas de la Abuela Ilda',
              ingredientes: 'Carne de nalga, pan rallado, huevo, sal, perejil, ajo',
              tiempo: 45,
              dificultad: 'facil',
              categoria: 'almuerzo',
              favorita: true,
            },
            {
              id: 2,
              nombre: 'Empanadas de Carne',
              ingredientes: 'Tapas Rotiseras, carne picada, cebolla, huevo, aceitunas',
              tiempo: 60,
              dificultad: 'media',
              categoria: 'almuerzo',
              favorita: false,
            },
            {
              id: 3,
              nombre: 'Pastafrola de Membrillo',
              ingredientes:
                'harina, azúcar, huevo, manteca, dulce de membrillo, ralladura de limón, esencia de vainilla',
              tiempo: 50,
              dificultad: 'dificil',
              categoria: 'merienda',
              favorita: false,
            },
            {
              id: 4,
              nombre: 'Pastel de Papas',
              ingredientes:
                'Papas, carne picada, cebolla, huevo, leche, manteca, queso rallado, queso fresco',
              tiempo: 90,
              dificultad: 'media',
              categoria: 'cena',
              favorita: true,
            },
          ]

      let necesitaGuardar = false
      this.recetas.forEach((receta) => {
        if (!receta.categoria) {
          receta.categoria = 'almuerzo'
          necesitaGuardar = true
        }
      })

      if (necesitaGuardar) {
        localStorage.setItem('recetas', JSON.stringify(this.recetas))
      }
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
