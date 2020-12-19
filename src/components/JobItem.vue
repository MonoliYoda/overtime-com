<template>
  <div>
    <b-card class="job-card">
      <b-container>
        <b-row
          ><h4 class="card-title">
            {{ job.title }} - {{ job.employer }}
          </h4></b-row
        >
        <b-row>
          <b-col cols="3">
            <h6 class="card-subtitle text-muted mb-2">{{ jobDate }}</h6>
            <b-card-text>{{ job.description }} </b-card-text>
          </b-col>
          <b-col cols="4">
            <p>{{ workTime }}</p>
            <p>{{ overTime }}</p>
          </b-col>
          <b-col cols="3">
            <p>Overtime pct: {{ ovtPct }}%</p>
            <p>Overtime pay: {{ ovtPay }}</p>
          </b-col>
          <b-col cols="2"
            ><b-button @click="editJob(job)">Edit</b-button></b-col
          >
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
      if (this.ovtMillisec < 60 * 1000) {
        return "No overtime.";
      } else {
        return "Overtime: " + getHumanTime(this.ovtMillisec);
      }
    },
    ovtMillisec() {
      return (
        this.job.endDateTime -
        this.job.startDateTime -
        this.job.workdayHours * 60 * 60 * 1000
      );
    },
    ovtMinutes() {
      const minutes = Math.floor((this.ovtMillisec / 1000).toFixed(0) / 60);
      return minutes - this.ovtHours * 60;
    },
    ovtHours() {
      const minutes = Math.floor((this.ovtMillisec / 1000).toFixed(0) / 60);
      if (minutes > 59) {
        return Math.floor(minutes / 60);
      } else {
        return 0;
      }
    },
    ovtPct() {
      var pct = 0;
      const overtimeArray = [15, 15, 20, 20, 30, 50];
      var hours = this.ovtHours;
      if (this.ovtMinutes >= 15) {
        hours += 1;
      }
      for (let step = 0; step < hours; step++) {
        if (step > 5) {
          pct += 50;
        } else {
          pct += overtimeArray[step];
        }
      }
      return pct;
    },
    ovtPay() {
      return new Intl.NumberFormat('pl-PL', {style: 'currency', currency: 'PLN'}).format(this.job.dailyRate * (this.ovtPct / 100));
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
  background: var(--list-color) 0% 0% no-repeat padding-box;
  margin: 1rem;
  font: var(--unnamed-font-style-normal) normal var(--unnamed-font-weight-medium) var(--unnamed-font-size-24)/var(--unnamed-line-spacing-29) var(--unnamed-font-family-kallisto);
letter-spacing: var(--unnamed-character-spacing-0);
color: var(--text-color);
text-align: left;
font: normal normal medium 24px/29px Kallisto;
letter-spacing: 0px;
color: #D2D5DA;
opacity: 1;
}
.card-title {
  padding: 1rem;
  width: 100%;
  text-align: center;
}

</style>