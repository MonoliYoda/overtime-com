<template>
  <div class="col d-flex justify-content-center">
    <b-card style="max-width: 50rem; min-width: 20rem" class="mb-6">
      <b-container>
        <b-button-group>
          <b-button @click="editJob">Add job</b-button>
        </b-button-group>
        <job-item
          v-for="job in jobs"
          :job="job"
          :key="job.id"
          @edit-job="editJob($event)"
        ></job-item>
      </b-container>
    </b-card>
  </div>
</template>

<script>
import JobItem from "./JobItem.vue";

export default {
  components: {
    JobItem,
  },
  props: ["jobs"],
  emits: ["edit-job"],
  methods: {
    editJob(job) {
      if (!job) {
        const job = {
          title: "",
          description: "",
          startDate: "",
          startTime: "",
          startDateTime: Date.now(),
          endDate: "",
          endTime: "",
          endDateTime: null,
          employer: "Dobro",
          dailyRate: 1000,
          workdayHours: 11,
          id: 738264,
        };
        this.$emit('edit-job', job);
      } else {
          this.$emit("edit-job", job);
      }
    },
  },
};
</script>