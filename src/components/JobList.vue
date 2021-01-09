<template>
  <div class="subsection">
    <div class="tag">
      <p>PREVIOUS JOBS</p>
    </div>
    <!-- Buttons -->
    <div v-if="filters.title || filters.employer" class="filter-tag-space">
      <div v-if="filters.title" class="filter tag">{{filters.title}}<i style="padding:10px;" @click="this.$store.dispatch('setFilter', {type: 'title', value: null})">X</i></div>
      <div v-if="filters.employer" class="filter tag">{{filters.employer}}<i style="padding:10px;" @click="this.$store.dispatch('setFilter', {type: 'employer', value: null})">X</i></div>
    </div>
    <JobItem v-for="job in filteredJobs" :key="job.id" :job="job" />
  </div>
</template>

<script>
import JobItem from "./JobItem";
import { mapGetters } from "vuex";

export default {
  components: { JobItem },
  computed: {
    ...mapGetters(["jobs", "filters", "filteredJobs"]),
  },
};
</script>
