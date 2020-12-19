<template>
  <div class="col d-flex justify-content-center">
    <b-card class="mb-6 item-list">
      <b-container>
        <b-button @click="editJob" class="add-job-button">Add job</b-button>
        <b-button @click="exportPDF">Export PDF</b-button>
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
import { jsPDF } from "jspdf";
import "jspdf-autotable";

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
  components: {
    JobItem,
  },
  props: ["jobs"],
  emits: ["edit-job"],
  data() {
    return {
      jobList: this.jobs,
    };
  },
  computed: {

  },
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
        this.$emit("edit-job", job);
      } else {
        this.$emit("edit-job", job);
      }
    },
    exportPDF() {
      var doc = new jsPDF("p", "pt");
      doc.text("Time report", 40, 0);
      var data = [];
      this.jobs.forEach(job => {
          const startDate = job.startDateTime.toISOString().slice(0, 16).replace("T", " ");
          const endDate = job.endDateTime.toISOString().slice(0,16).replace("T", " ");
          data.push([
              job.title + " - " + job.employer,
              startDate,
              endDate,
              this.overTime(job),
              "" + this.ovtPct(job) + "% / " + this.ovtPay(job)])
      });
      doc.autoTable({
        head: [["Project", "Start", "End", "Overtime", "Overtime Pay"]],
        body: data,
      });

      //doc.autoTable(columns, vm.jobs, {
      //  margin: {top: 60},
      //});
      doc.save("report.pdf");
    },
    workTime(job) {
      const millisec = job.endDateTime - job.startDateTime;
      return "Work time: " + getHumanTime(millisec);
    },
    overTime(job) {
      if (this.ovtMillisec(job) < 60 * 1000) {
        return "No overtime.";
      } else {
        return "Overtime: " + getHumanTime(this.ovtMillisec(job));
      }
    },
    ovtMillisec(job) {
      return (
        job.endDateTime -
        job.startDateTime -
        job.workdayHours * 60 * 60 * 1000
      );
    },
    ovtMinutes(job) {
      const minutes = Math.floor((this.ovtMillisec(job) / 1000).toFixed(0) / 60);
      return minutes - this.ovtHours(job) * 60;
    },
    ovtHours(job) {
      const minutes = Math.floor((this.ovtMillisec(job) / 1000).toFixed(0) / 60);
      if (minutes > 59) {
        return Math.floor(minutes / 60);
      } else {
        return 0;
      }
    },
    ovtPct(job) {
      var pct = 0;
      const overtimeArray = [15, 15, 20, 20, 30, 50];
      var hours = this.ovtHours(job);
      if (this.ovtMinutes(job) >= 15) {
        hours += 1;
      }
      for (let step = 0; step < hours; step++) {
        if (step > 5) {
          pct += 50;
        } else {
          pct += overtimeArray[step];
        }
      }
      console.log(pct);
      return pct;
    },
    ovtPay(job) {
      return new Intl.NumberFormat('pl-PL', {style: 'currency', currency: 'PLN'}).format(job.dailyRate * (this.ovtPct(job) / 100));
    },
  },
};
</script>

<style scoped>
.item-list {
  max-width: 50rem;
  min-width: 20rem;
  background-color: var(--background-color);
}
.button-group {
  width: 50rem;
}
.add-job-button {
  background: var(--buttoncolor) 0% 0% no-repeat padding-box;
  background: #0d4459 0% 0% no-repeat padding-box;
  box-shadow: 16px 16px 15px #00000066;
  border-radius: 10px;
  opacity: 1;
  width: 275px;
  height: 50px;
  margin: 0 10% 0;
}
</style>