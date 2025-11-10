<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="5" class="py-0">
        <h1 class="text-h4 pa-4 mb-2">Agregar Nueva Receta</h1>

        <v-img
          src="/recursos/merienda.jpg"
          height="250px"
          cover
          class="rounded-lg elevation-2 mb-4"
        ></v-img>

        <p class="text-caption text-center text-brown-darken-1">
          ¡El sabor de la tradición familiar!
        </p>
      </v-col>

      <v-col cols="12" md="7" class="py-0">
        <form-receta @receta-guardada="onRecetaGuardada"></form-receta>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// Importamos el componente de formulario que creamos
import FormReceta from '@/components/FormReceta.vue'

export default {
  name: 'AgregarRecetaView',
  components: {
    FormReceta,
  },
  methods: {
    // Cuando el componente hijo ($emit) nos avisa que guardó
    onRecetaGuardada() {
      // redirigimos al usuario al home.
      this.$router.push('/')
    },
  },
}
</script>

<style scoped>
.rounded-lg {
  border-radius: 8px;
}
</style>
