<template>
  <v-container>
    <v-form @submit.prevent="guardarReceta">
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

        <v-col cols="12" class="d-flex ga-4">
          <v-btn type="submit" color="primary" size="large">Guardar</v-btn>
          <v-btn @click="limpiar" variant="outlined" size="large">Limpiar</v-btn>

          <v-btn to="/" variant="tonal" size="large" class="ml-auto"> Ver Recetas </v-btn>
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>

<script>
export default {
  name: 'FormReceta',
  emits: ['receta-guardada'],

  data() {
    return {
      receta: {
        nombre: '',
        ingredientes: '',
        tiempo: '',
        dificultad: 'facil',
        categoria: 'almuerzo',
        favorita: false,
        imagen: '',
      },
      errores: {},
      dificultades: ['facil', 'media', 'dificil'],
      categorias: ['desayuno', 'almuerzo', 'merienda', 'cena'],
    }
  },
  methods: {
    guardarReceta() {
      this.errores = {} // Resetea los errores

      //  Validaciónes
      if (!this.receta.nombre) {
        this.errores.nombre = 'El nombre es obligatorio'
      }
      if (!this.receta.ingredientes) {
        this.errores.ingredientes = 'Los ingredientes son obligatorios'
      }
      if (!this.receta.tiempo || this.receta.tiempo <= 0) {
        this.errores.tiempo = 'El tiempo debe ser mayor a 0'
      }

      // Si hay errores, no continúa
      if (Object.keys(this.errores).length > 0) {
        return
      }

      // Lógica de LocalStorage
      // 1. Carga las recetas existentes
      var datosGuardados = localStorage.getItem('recetas')
      var recetas = datosGuardados ? JSON.parse(datosGuardados) : []

      // 2. Crea la nueva receta
      var nuevaReceta = {
        id: Date.now(), // ID único
        nombre: this.receta.nombre,
        ingredientes: this.receta.ingredientes,
        tiempo: parseInt(this.receta.tiempo),
        dificultad: this.receta.dificultad,
        categoria: this.receta.categoria,
        favorita: this.receta.favorita,
        imagen: this.receta.imagen,
      }

      // 3. Agrega la nueva receta al array
      recetas.push(nuevaReceta)

      // 4. Guarda el array actualizado en LocalStorage
      localStorage.setItem('recetas', JSON.stringify(recetas))

      // 5. Limpia el formulario
      this.limpiar()

      // 6. Avisa al componente padre (AgregarRecetaView) que se guardó
      this.$emit('receta-guardada')

      alert('¡Receta guardada!')
    },

    // Lógica de limpiar
    limpiar() {
      this.receta = {
        nombre: '',
        ingredientes: '',
        tiempo: '',
        dificultad: 'facil',
        categoria: 'almuerzo',
        favorita: false,
        imagen: '',
      }
      this.errores = {}
    },
  },
}
</script>

<style scoped>
.d-flex {
  display: flex;
}
.ga-4 {
  gap: 16px;
}
.ml-auto {
  margin-left: auto;
}
</style>
