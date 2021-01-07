<template>
  <div class="active-jobs">
    <div v-if="activeJobs.length != 0">
      <JobItem v-for="job in activeJobs" :key="job.id" :job="job" />
    </div>
    <div v-else>
      <h1>No Active Jobs.</h1>
    </div>
  </div>
</template>

<script>
import JobItem from "./JobItem";
import { mapGetters } from "vuex";

export default {
  components: { JobItem },
  computed: {
    ...mapGetters(["activeJobs"]),
  },
};
</script>
