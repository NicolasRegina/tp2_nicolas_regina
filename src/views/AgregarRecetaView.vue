<template>
  <v-container>
    <h1 class="text-h4 pa-4">Agregar Nueva Receta</h1>

    <form-receta @receta-guardada="onRecetaGuardada"></form-receta>
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
