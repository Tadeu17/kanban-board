<template>
  <nav :class="['sidebar', { open: isOpen }]">
    <!-- Toggle Button -->
    <button class="nav-item toggle-button" @click="toggleSidebar">
      <TheIcon name="Menu-White" />
    </button>

    <!-- Navigation Links -->
    <router-link
      v-for="item in navItems"
      :key="item.route"
      :to="item.route"
      class="nav-item"
      :class="{ active: isActive(item.route) }"
    >
      <div class="nav-content">
        <TheIcon :name="getIconName(item)" />
        <p
          v-if="isOpen"
          :class="[
            'nav-labels',
            isActive(item.route) ? 'text-lapis' : 'text-white',
          ]"
        >
          {{ item.name }}
        </p>
      </div>
    </router-link>
  </nav>
</template>

<script>
import TheIcon from "@/components/TheIcon.vue"; // adjust path as needed

export default {
  name: "TheSidebar",
  components: { TheIcon },
  props: {
    isOpen: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      navItems: [
        {
          name: "Tasks",
          lapis: "Tasks-Lapis",
          white: "Tasks-White",
          route: "/tasks",
        },
        {
          name: "Notifications",
          lapis: "Notifications-Lapis",
          white: "Notifications-White",
          route: "/notifications",
        },
        {
          name: "Settings",
          lapis: "Settings-Lapis",
          white: "Settings-White",
          route: "/settings",
        },
      ],
    };
  },
  methods: {
    toggleSidebar() {
      this.$emit("toggleSidebar");
    },
    isActive(path) {
      return this.$route.path === path;
    },
    getIconName(item) {
      return !this.isActive(item.route) ? item.white : item.lapis;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/styles/colors.scss";

.sidebar {
  width: 72px;
  background-color: #066d92;
  height: 100vh;
  transition: width 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0;
  overflow: hidden;
}

.sidebar.open {
  width: 240px;
  align-items: flex-start;
}

.nav-item {
  width: 100%;
  height: 68px;
  background-color: transparent;
  border: none;
  cursor: pointer;
  margin-top: 48px;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s ease;
  text-decoration: none;
}

.sidebar.open .nav-item {
  width: 100%;
  justify-content: flex-start;
  padding-left: 12px;
}

.nav-item:hover {
  background-color: $pastel-aqua;
}

.nav-item.active {
  background-color: white;
}

.nav-content {
  display: flex;
  align-items: center;
  gap: 12px;
}
</style>
