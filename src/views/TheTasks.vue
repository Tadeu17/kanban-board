<template>
  <div class="tasks-container">
    <!-- TO DO Column -->
    <div class="tasks-column">
      <h2 class="heading-2">TO DO</h2>
      <TheTask
        v-for="task in tasks.filter((task) => task.status === 'to-do')"
        :key="task.id"
        :task="task"
      />
    </div>

    <!-- IN PROGRESS Column -->
    <div class="tasks-column">
      <h2 class="heading-2">IN PROGRESS</h2>
      <TheTask
        v-for="task in tasks.filter((task) => task.status === 'in-progress')"
        :key="task.id"
        :task="task"
      />
    </div>

    <!-- DONE Column -->
    <div class="tasks-column">
      <h2 class="heading-2">DONE</h2>
      <TheTask
        v-for="task in tasks.filter((task) => task.status === 'done')"
        :key="task.id"
        :task="task"
      />
    </div>
  </div>
</template>

<script>
import TheTask from "../components/TheTask.vue";

export default {
  name: "TheTasks",
  components: {
    TheTask,
  },
  data() {
    return {
      tasks: [],
    };
  },
  mounted() {
    // Fetch data from the endpoint
    fetch("https://q1z3telex7a9metry.denaliops.com/data.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        this.tasks = data; // Store the fetched data in the tasks variable
        console.log("Fetched tasks:", this.tasks); // Log the data for debugging
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  },
};
</script>

<style lang="scss" scoped>
.heading-2 {
  text-align: left;
}

.tasks-container {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
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

  @media (orientation: landscape) {
    flex-direction: column;
  }
}
</style>
