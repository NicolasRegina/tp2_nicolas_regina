<template>
  <v-container>
    <h1 class="text-h4 pa-4">Editar Receta</h1>

    <v-form v-if="receta" @submit.prevent="actualizarReceta">
      <v-row>
        <v-col cols="12" md="5">
          <v-img
            v-if="receta"
            :src="obtenerImagenUrl(receta)"
            height="250px"
            cover
            class="rounded-lg elevation-2"
          >
            <template v-slot:error>
              <v-img
                :src="'/recursos/' + (receta.categoria || 'almuerzo') + '.jpg'"
                height="250px"
                cover
              ></v-img>
            </template>
          </v-img>
        </v-col>

        <v-col cols="12" md="7">
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="receta.nombre"
                label="Nombre de la Receta"
                variant="outlined"
                :error-messages="errores.nombre"
              ></v-text-field>
            </v-col>

            <v-col cols="12">
              <v-text-field
                v-model="receta.imagen"
                label="URL de la Imagen (Opcional)"
                variant="outlined"
                prepend-inner-icon="mdi-image-search-outline"
                clearable
              ></v-text-field>
            </v-col>

            <v-col cols="12">
              <v-textarea
                v-model="receta.ingredientes"
                label="Ingredientes (separados por coma)"
                variant="outlined"
                :error-messages="errores.ingredientes"
              ></v-textarea>
            </v-col>

            <v-col cols="12" md="6">
              <v-text-field
                v-model.number="receta.tiempo"
                label="Tiempo de cocción (minutos)"
                type="number"
                variant="outlined"
                :error-messages="errores.tiempo"
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="6">
              <v-select
                v-model="receta.dificultad"
                :items="dificultades"
                label="Dificultad"
                variant="outlined"
              ></v-select>
            </v-col>

            <v-col cols="12" md="6">
              <v-select
                v-model="receta.categoria"
                :items="categorias"
                label="Categoría"
                variant="outlined"
              ></v-select>
            </v-col>

            <v-col cols="12" md="6">
              <v-checkbox v-model="receta.favorita" label="Marcar como favorita"></v-checkbox>
            </v-col>
          </v-row>
        </v-col>
      </v-row>

      <v-row class="mt-4">
        <v-col cols="12" class="d-flex ga-4">
          <v-btn type="submit" color="primary" size="large">Actualizar</v-btn>
          <v-btn to="/" variant="outlined" size="large">Cancelar</v-btn>
        </v-col>
      </v-row>
    </v-form>

    <v-alert v-else type="warning"> No se encontró la receta que intentas editar. </v-alert>
  </v-container>
</template>

<script>
export default {
  name: 'EditarRecetaView',
  data() {
    return {
      receta: null,
      errores: {},
      dificultades: ['facil', 'media', 'dificil'],
      categorias: ['desayuno', 'almuerzo', 'merienda', 'cena'],
      recetas: [],
    }
  },

  mounted() {
    this.cargarRecetaParaEditar()
  },

  methods: {
    cargarRecetaParaEditar() {
      var datosGuardados = localStorage.getItem('recetas')
      this.recetas = datosGuardados ? JSON.parse(datosGuardados) : []

      const recetaId = Number(this.$route.params.id)

      const recetaAEditar = this.recetas.find((r) => r.id === recetaId)

      if (recetaAEditar) {
        // Al editar, si la receta no tiene la propiedad 'imagen', la inicializamos como ""
        this.receta = { ...recetaAEditar, imagen: recetaAEditar.imagen || '' }
      } else {
        this.$router.push('/404')
      }
    },

    actualizarReceta() {
      this.errores = {}
      if (!this.receta.nombre) this.errores.nombre = 'El nombre es obligatorio'
      if (!this.receta.ingredientes) this.errores.ingredientes = 'Los ingredientes son obligatorios'
      if (!this.receta.tiempo || this.receta.tiempo <= 0)
        this.errores.tiempo = 'El tiempo debe ser mayor a 0'

      if (Object.keys(this.errores).length > 0) {
        return
      }

      const index = this.recetas.findIndex((r) => r.id === this.receta.id)

      if (index !== -1) {
        this.recetas[index] = this.receta
        localStorage.setItem('recetas', JSON.stringify(this.recetas))
        alert('¡Receta actualizada!')
        this.$router.push('/')
      }
    },

    obtenerImagenUrl(receta) {
      if (!receta) return ''
      // Si tiene una URL cargada por el usuario (receta.imagen), la usa.
      if (receta.imagen) {
        return receta.imagen
      }
      // Si no tiene URL, usa la imagen de la categoría por defecto
      return '/recursos/' + (receta.categoria || 'almuerzo') + '.jpg'
    },
  },
}
</script>

<style scoped>
/* Estilos necesarios para los botones y la imagen */
.rounded-lg {
  border-radius: 8px;
}
.d-flex {
  display: flex;
}
.ga-4 {
  gap: 16px;
}
</style>
