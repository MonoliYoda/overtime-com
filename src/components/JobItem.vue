<template>
  <div class=job-card-space @click="toggleLower">
    <div class="job-card-up">
      <div class="job-title">
        <h4>{{ job.title }}</h4>
      </div>
      <div class="job-employer">
        <h4>{{ job.employer }}</h4>
      </div >
      <div class="job-date">
      <h4>{{ jobDate }}</h4>
      </div >
      <div class="job-arrow">
        <p> <i class="arrow"></i></p>
      </div>
    </div>

    <div class=job-card-down :class="{open: lowerOpen}">  
      <div class="job-description">
        <p>{{ job.description }}</p>
      </div>
      <div class="job-time">
        <p>{{ workTime }}</p>
        </div>
        <div class="overtime">
        <p>{{ overTime }}</p>
      </div>
      <div class="overtime-pct">
        <p>Overtime pct: {{ ovtPct }}%</p>
        </div>
        <div class="overtime-pay">
        <p>Overtime pay: {{ ovtPay }}</p>
      </div>
      <div class="job-edit">
        <button class="job-edit-button" @click="createEditModal">Edit</button>
        <button class="job-edit-button" @click="cdeleteJob">Delete</button>
      </div>
    </div>
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
  data() {
    return {
      lowerOpen: true, // default state
    };
  },
  computed: {
    jobDate() {
      const options = {
        weekday: "long",
        year: "numeric",
        month: "numeric",
        day: "numeric",
      };
      try {
        return this.job.startDate.toLocaleDateString(
          navigator.languages[0],
          options
        );
      } catch (err) {
        console.log('Error converting startDate to localeDateString', this.job)
        return 'error...'
      }
    },
    workTime() {
      const millisec = this.job.endDate - this.job.startDate;
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
        this.job.endDate -
        this.job.startDate -
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
      return new Intl.NumberFormat("pl-PL", {
        style: "currency",
        currency: "PLN",
      }).format(this.job.dailyRate * (this.ovtPct / 100));
    },
  },
  methods: {
    createEditModal() {
      this.$store.commit("setEditingJob", this.job);
      this.$store.commit("showEditModal");
    },
    toggleLower() {
      this.lowerOpen = !this.lowerOpen;
    },
    deleteJob() {
      this.$store.dispatch("deleteJob", this.job.id)
    }
  },
};
</script>
