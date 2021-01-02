<template>
  <div>
    <!-- Buttons -->
    <JobItem v-for="job in jobs" :key="job.id" :job="job" />
  </div>
</template>

<script>
import JobItem from "./JobItem";
import { mapGetters } from "vuex";

export default {
  components: { JobItem },
  computed: {
    ...mapGetters(["jobs"]),
  },
};
</script>
