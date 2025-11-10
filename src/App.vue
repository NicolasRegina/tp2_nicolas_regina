<script>
export default {
  name: 'App',
  data() {
    return {
      titulo: 'Las Recetas de la Abuela',
    }
  },
  // Hook 'created' para inicializar LocalStorage
  created() {
    this.inicializarRecetasDefault()
  },
  methods: {
    // Este método se asegura de que LocalStorage tenga datos
    inicializarRecetasDefault() {
      const datosGuardados = localStorage.getItem('recetas')

      // Si no hay NADA en localStorage, guardamos los defaults
      if (!datosGuardados) {
        const recetasDefault = [
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

        // Guardamos los defaults en LocalStorage
        localStorage.setItem('recetas', JSON.stringify(recetasDefault))
      }
    },
  },
}
</script>

<template>
  <v-app>
    <v-app-bar app color="brown-darken-3" density="compact">
      <v-app-bar-title>
        <v-icon icon="mdi-notebook-heart-outline" class="mr-2"></v-icon>
        {{ titulo }}
      </v-app-bar-title>

      <v-spacer></v-spacer>

      <v-btn :to="{ name: 'home' }" prepend-icon="mdi-format-list-bulleted"> Mis Recetas </v-btn>
      <v-btn :to="{ name: 'agregar' }" prepend-icon="mdi-plus-box-outline"> Agregar Receta </v-btn>
    </v-app-bar>

    <v-main>
      <router-view v-slot="{ Component }">
        <transition
          mode="out-in"
          enter-active-class="animate__animated animate__fadeIn"
          leave-active-class="animate__animated animate__fadeOut"
        >
          <component :is="Component" />
        </transition>
      </router-view>
    </v-main>
  </v-app>
</template>

<style scoped>
/* Estilos para que el título se vea bien */
.v-app-bar-title {
  font-weight: bold;
  font-size: 1.25rem;
}
.mr-2 {
  margin-right: 8px;
}
</style>
