<template>
  <div>
    <div>
      <b-navbar toggleable="lg" type="dark" variant="info">
        <b-navbar-brand href="#">NavBar</b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <b-nav-item href="#">Link</b-nav-item>
            <b-nav-item href="#" disabled>Disabled</b-nav-item>
          </b-navbar-nav>

          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto">
            <b-nav-form>
              <b-form-input
                size="sm"
                class="mr-sm-2"
                placeholder="Search"
              ></b-form-input>
              <b-button size="sm" class="my-2 my-sm-0" type="submit"
                >Search</b-button
              >
            </b-nav-form>

            <b-nav-item-dropdown text="Lang" right>
              <b-dropdown-item href="#">EN</b-dropdown-item>
              <b-dropdown-item href="#">ES</b-dropdown-item>
              <b-dropdown-item href="#">RU</b-dropdown-item>
              <b-dropdown-item href="#">FA</b-dropdown-item>
            </b-nav-item-dropdown>

            <b-nav-item-dropdown right>
              <!-- Using 'button-content' slot -->
              <template #button-content>
                <em v-if="user">{{user.displayName}}</em>
                <em v-else>User</em>
              </template>
              <b-dropdown-item href="#" v-if="user">Profile</b-dropdown-item>
              <b-dropdown-item href="#" v-if="user" @click="signOut"
                >Sign Out</b-dropdown-item
              >
              <b-dropdown-item href="#" v-else @click="signIn"
                >Sign In</b-dropdown-item
              >
            </b-nav-item-dropdown>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>
    <job-list :jobs="jobs" @edit-job="editJob($event)"></job-list>

    <b-modal id="edit-modal" @ok="onSubmit">
      <b-form @submit="onSubmit" @reset="onReset">
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
                  :date-format-options="{
                    year: 'numeric',
                    month: 'short',
                    day: '2-digit',
                    weekday: 'short',
                  }"
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
    </b-modal>
  </div>
</template>

<script>
import JobList from "./components/JobList.vue";
import fb from "./firebase/firebaseInit";
import firebase from "firebase";

function strDate(date) {
  return (
    date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()
  );
}
function strTime(date) {
  return date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
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
      settings: {
        defaultWorkHours: 11,
        defaultDayRate: 1000,
      },
      user: null,
    };
  },
  methods: {
    editJob(job) {
      if (!job.startDateTime) {
        console.log("Not valid object, need to initialize new job.");
        job = {
          title: "",
          description: "",
          startDate: "",
          startTime: "",
          startDateTime: new Date(),
          endDate: "",
          endTime: "",
          endDateTime: new Date(),
          employer: "",
          dailyRate: this.settings.defaultDayRate,
          workdayHours: this.settings.defaultWorkHours,
          id: Math.floor(Math.random() * 9999999),
        };
      }
      console.log(job);
      if (job.startDateTime) {
        job.startDate = strDate(job.startDateTime);
        job.startTime = strTime(job.startDateTime);
      }
      if (job.endDateTime) {
        job.endDate = strDate(job.endDateTime);
        job.endTime = strTime(job.endDateTime);
      }
      this.editingJob = job;
      this.$bvModal.show("edit-modal");
    },
    onReset() {
      return false;
    },
    onSubmit() {
      console.log("ONSUBMIT");
      event.preventDefault();
      // 2020-12-16 20:56:00
      // Set start & end datetimes based on datepicker and timepicker strings
      if (this.editingJob.startDate != "" && this.editingJob.startTime != "") {
        this.editingJob.startDateTime = new Date(
          this.editingJob.startDate + " " + this.editingJob.startTime
        );
      }
      if (this.editingJob.endDate != "" && this.editingJob.endTime != "") {
        this.editingJob.endDateTime = new Date(
          this.editingJob.endDate + " " + this.editingJob.endTime
        );
      }
      const index = this.jobs.findIndex((x) => x.id === this.editingJob.id);
      console.log("INDEX", index);
      if (index == -1) {
        this.jobs.push(this.editingJob);
      }
    },
    signIn() {
      fb.auth()
        .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
        .then((a) => {
          console.log(a);
          var provider = new firebase.auth.GoogleAuthProvider();
          // In memory persistence will be applied to the signed in Google user
          // even though the persistence was set to 'none' and a page redirect
          // occurred.
          return firebase.auth().signInWithPopup(provider);
        })
        .then((result) => {
          console.log("User logged in successfully.");
          console.log(result.user);
          this.user = result.user;
        })
        .catch((error) => {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // ...
          console.log(errorCode);
          console.log(errorMessage);
        });
    },
    signOut() {
      console.log("Signing out...");
      fb.auth().signOut();
    },
  },
  created() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        this.user = user;
        // ...
      } else {
        // User is signed out
        this.user = null;
        // ...
      }
    });
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
