import { createWebHistory, createRouter } from "vue-router";
// Components:
import JobList from "./components/JobList";
import ActiveJob from "./components/ActiveJob";

const routes = [
  {
    path: "/",
    name: "home",
    components: {
      default: JobList,
      activejob: ActiveJob,
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
