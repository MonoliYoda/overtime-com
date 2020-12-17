<template>
  <div>
    <b-card class="job-card">
      <b-container>
        <b-row>
          <b-col>
            <h4 class="card-title">{{ job.title }} - {{ job.employer }}</h4>
            <h6 class="card-subtitle text-muted mb-2">{{ jobDate }}</h6>
            <b-card-text>{{ job.description }} </b-card-text>
          </b-col>
          <b-col>
            <b-card-text>{{ workTime }} </b-card-text>
            <b-card-text>{{ overTime }} </b-card-text>
            <b-button @click="editJob(job)">Edit</b-button>
          </b-col>
        </b-row>
      </b-container>
    </b-card>
  </div>
</template>

<script>
function getHumanTime(millisec) {
  var seconds = (millisec / 1000).toFixed(0);
  var minutes = Math.floor(seconds / 60);
  var hours = "";
  if (minutes > 59) {
    hours = Math.floor(minutes / 60);
    hours = hours >= 10 ? hours : "0" + hours;
    minutes = minutes - hours * 60;
    minutes = minutes >= 10 ? minutes : "0" + minutes;
  }
  return hours + ":" + minutes;
}

export default {
  props: ["job"],
  emits: ["edit-job"],
  computed: {
    jobDate() {
      const options = {
        weekday: "long",
        year: "numeric",
        month: "numeric",
        day: "numeric",
      };
      return this.job.startDateTime.toLocaleDateString(undefined, options);
    },
    workTime() {
      const millisec = this.job.endDateTime - this.job.startDateTime;
      return "Work time: " + getHumanTime(millisec);
    },
    overTime() {
      const overMillisec =
        this.job.endDateTime - this.job.startDateTime - 11 * 60 * 60 * 1000;
      return "Overtime: " + getHumanTime(overMillisec);
    },
  },
  methods: {
    editJob(job) {
      this.$emit("edit-job", job);
    },
  },
};
</script>

<style scoped>
.job-card {
  background: rgb(252, 239, 221);
  margin: 1rem;
}
.card-title {
  background: rgb(238, 222, 199);
}
</style>