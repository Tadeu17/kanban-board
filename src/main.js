import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import "./assets/styles/main.scss";
import TheIcon from "./components/TheIcon.vue";

const app = createApp(App);

app.use(router);

app.component("TheIcon", TheIcon);

app.mount("#app");
