<template>
  <div :class="['icon-container', { dark }]">
    <img v-if="iconPath" :src="iconPath" :alt="name" />
    <p v-else>Icon not found</p>
  </div>
</template>

<script>
export default {
  name: "TheIcon",
  props: {
    name: {
      type: String,
      required: true,
      validator(value) {
        const icons = require.context(
          "@/assets/icons",
          false,
          /\.(png|jpe?g|svg)$/
        );
        return icons.keys().some((fileName) => fileName.includes(value));
      },
    },
    dark: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    iconPath() {
      try {
        // Dynamically resolve the icon path
        const icons = require.context(
          "@/assets/icons",
          false,
          /\.(png|jpe?g|svg)$/
        );
        const iconFile = icons
          .keys()
          .find((fileName) => fileName.includes(this.name));
        return iconFile ? icons(iconFile) : null;
      } catch (e) {
        console.error("Error loading icon:", e);
        return null;
      }
    },
  },
};
</script>

<style scoped>
.icon-container {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  background-color: #f0f0f0;
  size: 64px;
}

.icon-container img {
  max-width: 64px;
  max-height: 64px;
}
</style>
