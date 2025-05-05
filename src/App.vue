<template>
  <TheNavigation
    class="navigation"
    :class="isOpen ? 'open' : 'closed'"
    :is-open="isOpen"
    @toggleSidebar="isOpen = !isOpen"
  />

  <section class="main-content" :class="isOpen ? 'open' : 'closed'">
    <Router-View />
  </section>
</template>

<script>
import TheNavigation from "./components/TheNavigation.vue";
export default {
  name: "App",
  components: {
    TheNavigation,
  },
  data() {
    return {
      isOpen: false,
    };
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

$navigation-width-closed: 72px;
$navigation-width-open: 240px;

.navigation {
  position: fixed;
  top: 0;
  left: 0;
  width: $navigation-width-closed;
  height: 100%;
  background-color: #333;
  transition: transform 0.3s ease;

  &.open {
    width: 240px;
  }
}

.main-content {
  margin-left: $navigation-width-closed;
  transition: margin-left 0.3s ease;

  &.open {
    margin-left: $navigation-width-open;
  }
}
</style>
