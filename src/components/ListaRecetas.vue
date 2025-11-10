<template>
  <v-container fluid>
    <v-row class="pa-2">
      <v-col cols="12" md="8">
        <v-text-field
          v-model="buscar"
          label="Buscar recetas..."
          prepend-inner-icon="mdi-magnify"
          variant="outlined"
          density="compact"
          hide-details
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="4">
        <v-checkbox
          v-model="soloFavoritas"
          label="Mostrar solo favoritas"
          density="compact"
          hide-details
        ></v-checkbox>
      </v-col>
    </v-row>

    <v-row>
      <v-col v-if="recetasFiltradas.length === 0" cols="12">
        <p class="text-center">No hay recetas para mostrar</p>
      </v-col>

      <v-col v-for="receta in recetasFiltradas" :key="receta.id" cols="12" sm="6" lg="4">
        <v-card :class="{ 'receta-favorita': receta.favorita }" elevation="2">
          <v-img
            :src="'/recursos/' + (receta.categoria || 'almuerzo') + '.jpg'"
            height="200px"
            cover
          ></v-img>

          <v-card-title>{{ receta.nombre }}</v-card-title>

          <v-card-text>
            <p><strong>Ingredientes:</strong> {{ cortarTexto(receta.ingredientes) }}</p>
            <p><strong>Tiempo:</strong> {{ formatearTiempo(receta.tiempo) }}</p>
            <p><strong>Dificultad:</strong> {{ receta.dificultad }}</p>
            <p><strong>Categoría:</strong> {{ receta.categoria || 'almuerzo' }}</p>
          </v-card-text>

          <v-card-actions>
            <v-btn
              :icon="receta.favorita ? 'mdi-heart' : 'mdi-heart-outline'"
              :color="receta.favorita ? 'red' : 'grey'"
              variant="text"
              @click="toggleFavorita(receta.id)"
            ></v-btn>

            <v-spacer></v-spacer>
            <v-btn
              icon="mdi-pencil"
              variant="text"
              color="blue"
              :to="'/editar/' + receta.id"
            ></v-btn>

            <v-btn
              icon="mdi-delete"
              variant="text"
              color="grey"
              @click="eliminar(receta.id)"
            ></v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'ListaRecetas',
  // 1. Recibimos las recetas como 'prop' desde la vista padre
  props: {
    recetas: {
      type: Array,
      required: true,
    },
  },
  // 2. Declaramos los eventos que este componente 'emite'
  emits: ['toggle-favorita', 'eliminar-receta'],
  data() {
    return {
      // 3. Los filtros son estado local de este componente
      buscar: '',
      soloFavoritas: false,
    }
  },
  computed: {
    // 4. Lógica de filtrado
    recetasFiltradas() {
      let filtradas = this.recetas

      if (this.buscar) {
        filtradas = filtradas.filter((receta) =>
          receta.nombre.toLowerCase().includes(this.buscar.toLowerCase()),
        )
      }

      if (this.soloFavoritas) {
        filtradas = filtradas.filter((receta) => receta.favorita)
      }

      return filtradas
    },
  },
  methods: {
    // 5. Los métodos de acción AHORA EMITEN el evento al padre
    toggleFavorita(id) {
      this.$emit('toggle-favorita', id)
    },
    eliminar(id) {
      this.$emit('eliminar-receta', id)
    },

    // 6. Métodos de formato (helper)
    cortarTexto(texto) {
      return texto.length > 50 ? texto.substring(0, 50) + '...' : texto
    },
    formatearTiempo(minutos) {
      if (minutos < 60) {
        return minutos + ' min'
      } else {
        var horas = Math.floor(minutos / 60)
        var mins = minutos % 60
        return horas + 'h ' + (mins > 0 ? mins + 'min' : '')
      }
    },
  },
}
</script>

<style scoped>
/* Estilos específicos para este componente */
.receta-favorita {
  /* Le da un borde sutil a las recetas favoritas */
  border: 2px solid #ffc107;
  background-color: #fffde7;
}
</style>
