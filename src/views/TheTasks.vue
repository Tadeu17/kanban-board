<template>
  <div class="tasks-container">
    <!-- Columns -->
    <div
      v-for="column in columns"
      :key="column.status"
      class="tasks-column"
      @dragover.prevent
      @drop="onDrop(column.status)"
      :class="column.status"
    >
      <h2 class="heading-2">{{ column.label }}</h2>
      <TheTask
        v-for="task in filteredTasks(column.status)"
        :key="task.id"
        :task="task"
        draggable="true"
        @dragstart="onDragStart(task)"
      />
    </div>

    <!-- Modal Dialog -->
    <div v-if="showDialog" class="dialog-overlay" @click.self="closeDialog">
      <div class="dialog-box">
        <button class="close-btn" @click="closeDialog">Close</button>
        <h3>Tasks in "{{ activeColumnLabel }}"</h3>
        <pre>{{ formattedJson }}</pre>
      </div>
    </div>
  </div>
</template>

<script>
import TheTask from "../components/TheTask.vue";

export default {
  name: "TheTasks",
  components: { TheTask },
  data() {
    return {
      tasks: [],
      draggedTaskId: null,
      showDialog: false,
      dialogTasks: [],
      activeColumnLabel: "",
      columns: [
        { label: "TO DO", status: "to-do" },
        { label: "IN PROGRESS", status: "in-progress" },
        { label: "DONE", status: "done" },
      ],
    };
  },
  computed: {
    formattedJson() {
      return JSON.stringify(this.dialogTasks, null, 2);
    },
  },
  mounted() {
    fetch("https://q1z3telex7a9metry.denaliops.com/data.json")
      .then((res) => res.json())
      .then((data) => {
        this.tasks = data;
      })
      .catch((err) => console.error("Fetch error:", err));
  },
  methods: {
    onDragStart(task) {
      this.draggedTaskId = task.id;
    },
    onDrop(newStatus) {
      const task = this.tasks.find((t) => t.id === this.draggedTaskId);
      if (task) {
        task.status = newStatus;

        const column = this.columns.find((c) => c.status === newStatus);
        this.dialogTasks = this.tasks.filter((t) => t.status === newStatus);
        this.activeColumnLabel = column ? column.label : newStatus;
        this.showDialog = true;
      }

      this.draggedTaskId = null;
    },
    filteredTasks(status) {
      return this.tasks.filter((task) => task.status === status);
    },
    closeDialog() {
      this.showDialog = false;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/colors.scss";

.heading-2 {
  text-align: left;
  font-weight: bold;
  font-size: 18px;
  margin-bottom: 12px;
}

.tasks-container {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 36px;

  @media (orientation: landscape) {
    padding: 24px;
    flex-direction: row;
    height: 100%;
  }
}

.tasks-column {
  display: flex;
  flex-direction: column;
  gap: 16px;
  flex: 1;
  border: 4px solid $black;
  border-radius: 4px;
  padding: 16px;
  min-height: 300px;
}

/* Dialog styles */
.dialog-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.dialog-box {
  background: $white;
  padding: 24px;
  border-radius: 8px;
  width: 80%;
  max-width: 600px;
  max-height: 80vh;
  overflow: auto;
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.2);
  position: relative;
}

.dialog-box h3 {
  margin-top: 0;
}

.dialog-box pre {
  white-space: pre-wrap;
  word-wrap: break-word;
  background: $pastel-mint;
  padding: 12px;
  border-radius: 4px;
  margin-top: 12px;
}

.close-btn {
  position: absolute;
  top: 12px;
  right: 12px;
  background: $lapis;
  color: $white;
  border: none;
  border-radius: 4px;
  padding: 6px 12px;
  cursor: pointer;
}
</style>
