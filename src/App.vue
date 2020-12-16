<template>
  <div>
    <job-list :jobs="jobs" @edit-job="editJob($event)"></job-list>
    <b-modal id="edit-modal">
      <b-form @submit.prevent="onSubmit" @reset="onReset">
        <b-container>
          <!---->
          <b-row>
            <b-col>
              <b-form-group
                id="input-group-1"
                label="Project name:"
                label-for="input-1"
                description="Title of the movie of commercial."
              >
                <b-form-input
                  id="input-1"
                  v-model="editingJob.title"
                  type="text"
                  required
                ></b-form-input>
              </b-form-group>
            </b-col>
            <b-col>
              <b-form-group
                id="input-group-2"
                label="Producer:"
                label-for="input-2"
                description="Company producing this project."
              >
                <b-form-input
                  id="input-2"
                  v-model="editingJob.employer"
                  type="text"
                  required
                ></b-form-input>
              </b-form-group>
            </b-col>
          </b-row>
          <!---->
          <b-row>
            <b-col>
              <b-form-group
                id="input-group-1"
                label="Notes:"
                label-for="input-1"
              >
                <b-form-input
                  id="input-1"
                  v-model="editingJob.description"
                  type="text"
                ></b-form-input>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <b-form-group
                id="asd"
                label="Daily rate:"
                label-for="asdi1"
                type="number"
              >
                <b-form-input
                  id="asdi1"
                  v-model="editingJob.dailyRate"
                  type="number"
                >
                </b-form-input>
              </b-form-group>
            </b-col>
            <b-col>
              <b-form-group
                id="asd"
                label="Day hours:"
                label-for="asdi1"
                type="number"
              >
                <b-form-input
                  id="asdi1"
                  v-model="editingJob.workdayHours"
                  type="number"
                >
                </b-form-input>
              </b-form-group>
            </b-col>
          </b-row>
          <!---->
          <b-row>
            <b-col>
              <b-form-group
                id="input-group-2"
                label="Start date:"
                label-for="input-2"
              >
                <b-form-datepicker
                  id="input-2"
                  v-model="editingJob.startDate"
                  :date-format-options="{
                    year: 'numeric',
                    month: 'short',
                    day: '2-digit',
                    weekday: 'short',
                  }"
                  required
                ></b-form-datepicker>
              </b-form-group>
            </b-col>
            <b-col>
              <b-form-group
                id="input-group-2"
                label="Start time:"
                label-for="input-2"
              >
                <b-form-timepicker
                  id="input-2"
                  v-model="editingJob.startTime"
                  type="text"
                  required
                ></b-form-timepicker>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <b-form-group
                id="input-group-2"
                label="End date:"
                label-for="input-2"
              >
                <b-form-datepicker
                  id="input-2"
                  v-model="editingJob.endDate"
                  type="text"
                  required
                ></b-form-datepicker>
              </b-form-group>
            </b-col>
            <b-col>
              <b-form-group
                id="input-group-2"
                label="End time:"
                label-for="input-2"
              >
                <b-form-timepicker
                  id="input-2"
                  v-model="editingJob.endTime"
                  type="text"
                  required
                ></b-form-timepicker>
              </b-form-group>
            </b-col>
          </b-row>
        </b-container>
      </b-form>
      {{ editingJob }}
    </b-modal>
  </div>
</template>

<script>
import JobList from "./components/JobList.vue";

function updateJob(id, jobList, job) {
  for (var i in jobList) {
     if (jobList[i].id == id) {
        jobList[i] = job;
        return true; //Stop this loop, we found it!
     }
   }
   return false;
}

export default {
  name: "App",
  components: {
    JobList,
  },
  data() {
    return {
      jobs: [
        {
          title: "Vinted",
          description: "",
          startDate: "",
          startTime: "",
          startDateTime: new Date(2020, 11, 14, 7, 0, 0, 0),
          endDate: "",
          endTime: "",
          endDateTime: new Date(2020, 11, 14, 20, 30, 0, 0),
          employer: "Dobro",
          dailyRate: 1000,
          workdayHours: 11,
          id: 738264,
        },
        {
          title: "Samsung",
          description: "Dzien 1 z 4",
          startDate: "",
          startTime: "",
          startDateTime: new Date(2020, 11, 15, 8, 0, 0, 0),
          endDate: "",
          endTime: "",
          endDateTime: new Date(2020, 11, 15, 22, 25, 0, 0),
          employer: "ONE Production",
          dailyRate: 1000,
          workdayHours: 11,
          id: 873263,
        },
      ],
      showEditModal: false,
      editingJob: {},
    };
  },
  methods: {
    editJob(job) {
      this.editingJob = job;
      this.$bvModal.show("edit-modal");
    },
    onReset() {
      return false;
    },
    onSubmit() {
      // Set start & end datetimes based on datepicker and timepicker strings
      if (!updateJob(this.editingJob.id, this.jobs, this.editingjob)) {
        this.jobs.push(this.editingJob);
      }
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
body {
  min-height: 100%;
  background-color: rgb(40, 40, 40);
}
html {
  height: 100%;
}
</style>
