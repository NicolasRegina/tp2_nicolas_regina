<script>
export default {
  name: 'App',
  data() {
    return {
      titulo: 'Las Recetas de la Abuela',
    }
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

      <!-- <v-btn to="/" prepend-icon="mdi-format-list-bulleted"> Mis Recetas </v-btn>

      <v-btn to="/agregar" prepend-icon="mdi-plus-box-outline"> Agregar Receta </v-btn> -->

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
