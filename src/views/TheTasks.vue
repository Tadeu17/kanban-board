<template>
  <div class="tasks-container">
    <!-- TO DO Column -->
    <div class="tasks-column" @dragover.prevent @drop="onDrop('to-do')">
      <h2 class="heading-2">TO DO</h2>
      <TheTask
        v-for="task in todoTasks"
        :key="task.id"
        :task="task"
        draggable="true"
        @dragstart="onDragStart(task)"
      />
    </div>

    <!-- IN PROGRESS Column -->
    <div class="tasks-column" @dragover.prevent @drop="onDrop('in-progress')">
      <h2 class="heading-2">IN PROGRESS</h2>
      <TheTask
        v-for="task in inProgressTasks"
        :key="task.id"
        :task="task"
        draggable="true"
        @dragstart="onDragStart(task)"
      />
    </div>

    <!-- DONE Column -->
    <div class="tasks-column" @dragover.prevent @drop="onDrop('done')">
      <h2 class="heading-2">DONE</h2>
      <TheTask
        v-for="task in doneTasks"
        :key="task.id"
        :task="task"
        draggable="true"
        @dragstart="onDragStart(task)"
      />
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
      draggedTask: null,
    };
  },
  computed: {
    todoTasks() {
      return this.tasks.filter((task) => task.status === "to-do");
    },
    inProgressTasks() {
      return this.tasks.filter((task) => task.status === "in-progress");
    },
    doneTasks() {
      return this.tasks.filter((task) => task.status === "done");
    },
  },
  mounted() {
    fetch("https://q1z3telex7a9metry.denaliops.com/data.json")
      .then((response) => {
        if (!response.ok) throw new Error("Network response was not ok");
        return response.json();
      })
      .then((data) => {
        this.tasks = data;
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  },
  methods: {
    onDragStart(task) {
      this.draggedTask = task;
    },
    onDrop(newStatus) {
      if (this.draggedTask && this.draggedTask.status !== newStatus) {
        const taskIndex = this.tasks.findIndex(
          (t) => t.id === this.draggedTask.id
        );
        if (taskIndex !== -1) {
          const [task] = this.tasks.splice(taskIndex, 1);
          task.status = newStatus;
          this.tasks.unshift(task); // 👈 Insert at the top of the array
        }
        this.draggedTask = null;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
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
  border: 4px solid black;
  border-radius: 4px;
  padding: 16px;
  background-color: #f9f9f9;
  min-height: 300px;
}
</style>
