<template>
  <div class="bg-div">
    <div>
      <b-navbar toggleable="lg" type="dark">
        <b-navbar-brand href="#">Overtime</b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <!--
          <b-navbar-nav>
            <b-nav-item href="#">Link</b-nav-item>
            <b-nav-item href="#" disabled>Disabled</b-nav-item>
          </b-navbar-nav>
-->
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
            <!--
            <b-nav-item-dropdown text="Lang" right>
              <b-dropdown-item href="#">EN</b-dropdown-item>
              <b-dropdown-item href="#">ES</b-dropdown-item>
              <b-dropdown-item href="#">RU</b-dropdown-item>
              <b-dropdown-item href="#">FA</b-dropdown-item>
            </b-nav-item-dropdown>
-->
            <b-nav-item-dropdown right>
              <!-- Using 'button-content' slot -->
              <template #button-content>
                <em v-if="user">{{ user.displayName }}</em>
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
    <job-list v-if="user" :jobs="jobs" @edit-job="editJob($event)"></job-list>
    <h1 v-else style="text-align: center">Please log in ---></h1>

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
                description="Title of the movie or commercial."
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
                id="input-group-startdate"
                label="Start date:"
                label-for="input-startdate"
              >
                <b-form-datepicker
                  id="input-startdate"
                  v-model="editingJob.startDate"
                  :date-format-options="{
                    year: 'numeric',
                    month: 'short',
                    day: '2-digit',
                    weekday: 'short',
                  }"
                  start-weekday="Monday"
                  required
                ></b-form-datepicker>
              </b-form-group>
            </b-col>
            <b-col>
              <b-form-group
                id="input-group-starttime"
                label="Start time:"
                label-for="input-starttime"
              >
                <b-form-timepicker
                  id="input-starttime"
                  v-model="editingJob.startTime"
                  now-button
                  required
                ></b-form-timepicker>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <b-form-group
                id="input-group-enddate"
                label="End date:"
                label-for="input-enddate"
              >
                <b-form-datepicker
                  id="input-enddate"
                  v-model="editingJob.endDate"
                  :date-format-options="{
                    year: 'numeric',
                    month: 'short',
                    day: '2-digit',
                    weekday: 'short',
                  }"
                  start-weekday="Monday"
                  type="text"
                  required
                ></b-form-datepicker>
              </b-form-group>
            </b-col>
            <b-col>
              <b-form-group
                id="input-group-endtime"
                label="End time:"
                label-for="input-endtime"
              >
                <b-form-timepicker
                  id="input-endtime"
                  v-model="editingJob.endTime"
                  now-button
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
const dbUsers = fb.firestore().collection("users");
const auth = fb.auth();

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
  provide: {
    fb: fb,
  },
  components: {
    JobList,
  },
  data() {
    return {
      jobs: [],
      activeJobs: [],
      showEditModal: false,
      editingJob: {},
      settings: {
        defaultWorkHours: 11,
        defaultDayRate: 1000,
      },
      user: null,
      userData: null,
    };
  },
  methods: {
    fetchJobs() {
      // Fetch jobs from DB
      dbUsers
        .doc(this.user.uid)
        .collection("jobs")
        .orderBy("startDateTime", "desc")
        .get()
        .then((col) => {
          this.jobs = [];
          col.forEach((doc) => {
            const data = doc.data();
            data.startDateTime = data.startDateTime.toDate();
            data.endDateTime = data.endDateTime.toDate();
            data.id = doc.id;
            this.jobs.push(data);
          });
        });
      dbUsers
        .doc(this.user.uid)
        .collection("jobs")
        .where("endDateTime", "==", null)
        .get()
        .then((col) => {
          this.activeJobs = [];
          col.forEach((doc) => {
            const data = doc.data();
            data.startDateTime = data.startDateTime.toDate();
            data.id = doc.id;
            this.activeJobs.push(data);
          });
        });
    },
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
      if (index == -1) {
        this.jobs.push(this.editingJob);
        // New job
        dbUsers
          .doc(this.user.uid)
          .collection("jobs")
          .add({
            title: this.editingJob.title,
            description: this.editingJob.description,
            startDate: this.editingJob.startDate,
            startTime: this.editingJob.startTime,
            startDateTime: firebase.firestore.Timestamp.fromDate(
              this.editingJob.startDateTime
            ),
            endDate: this.editingJob.endDate,
            endTime: this.editingJob.endTime,
            endDateTime: firebase.firestore.Timestamp.fromDate(
              this.editingJob.endDateTime
            ),
            employer: this.editingJob.employer,
            dailyRate: this.editingJob.dailyRate,
            workdayHours: this.editingJob.workdayHours,
          })
          .then((docRef) => {
            console.log(docRef.id);
          });
      } else {
        // Update job
        dbUsers
          .doc(this.user.uid)
          .collection("jobs")
          .doc(this.editingJob.id)
          .set({
            title: this.editingJob.title,
            description: this.editingJob.description,
            startDate: this.editingJob.startDate,
            startTime: this.editingJob.startTime,
            startDateTime: firebase.firestore.Timestamp.fromDate(
              this.editingJob.startDateTime
            ),
            endDate: this.editingJob.endDate,
            endTime: this.editingJob.endTime,
            endDateTime: firebase.firestore.Timestamp.fromDate(
              this.editingJob.endDateTime
            ),
            employer: this.editingJob.employer,
            dailyRate: this.editingJob.dailyRate,
            workdayHours: this.editingJob.workdayHours,
          });
      }
    },
    signIn() {
      auth
        .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
        .then(() => {
          var provider = new firebase.auth.GoogleAuthProvider();
          // In memory persistence will be applied to the signed in Google user
          // even though the persistence was set to 'none' and a page redirect
          // occurred.
          return firebase.auth().signInWithPopup(provider);
        })
        .then((result) => {
          console.log("User logged in successfully.");
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
      auth.signOut();
    },
  },
  created() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.user = user;
        dbUsers
          .doc(user.uid)
          .get()
          .then((doc) => {
            this.userData = doc.data();
            if (!this.userData) {
              console.log("User doc does not exist. Creating...");
              dbUsers.doc(user.uid).set({
                settings: {},
              });
            } else {
              console.log("User doc found. Great success!!!");
            }
          })
          .then(() => {
            this.fetchJobs();
          });
      } else {
        this.user = null;
      }
    });
  },
};
</script>

<style lang="css">
:root {
  /* Colors: */
  --active-button-color: #7b848d;
  --inactive-button-color: #3f4b59;
  --headline-color: #031926;
  --list-color: #252d40;
  --text-color: #d2d5da;
  --buttoncolor: #0d4459;
  --background-color: #141a26;
  --navbar-color: #010d0d;

  /* Font/text values */
  --unnamed-font-family-degular-display: Degular Display;
  --unnamed-font-family-kallisto: Kallisto;
  --unnamed-font-style-normal: normal;
  --unnamed-font-weight-bold: bold;
  --unnamed-font-weight-medium: medium;
  --unnamed-font-size-24: 24px;
  --unnamed-font-size-45: 45px;
  --unnamed-font-size-52: 52px;
  --unnamed-character-spacing-0: 0px;
  --unnamed-character-spacing-0-72: 0.72px;
  --unnamed-character-spacing-5-2: 5.2px;
  --unnamed-character-spacing-2-25: 2.25px;
  --unnamed-line-spacing-29: 29px;
  --unnamed-line-spacing-32: 32px;
  --unnamed-line-spacing-54: 54px;
  --unnamed-line-spacing-69: 69px;
}
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
  min-height: 100%;
}
.bg-div {
  background-color: var(--background-color);
  height: 100vh;
}
.navbar {
  width: 100%;
  height: 88px;
  background: #010d0d 0% 0% no-repeat padding-box;
  opacity: 1;
  font-family: var(--unnamed-font-family-degular-display);
  font-style: var(--unnamed-font-style-normal);
  font-weight: var(--unnamed-font-weight-bold);
  font-size: var(--unnamed-font-size-52);
  line-height: var(--unnamed-line-spacing-69);
  letter-spacing: var(--unnamed-character-spacing-5-2);
  color: var(--unnamed-color-d2d5da);
}
.navbar-brand {
  font-family: var(--unnamed-font-family-degular-display);
  font: var(--unnamed-font-style-normal) normal var(--unnamed-font-weight-bold)
    var(--unnamed-font-size-52) / var(--unnamed-line-spacing-69)
    var(--unnamed-font-family-degular-display);
  letter-spacing: var(--unnamed-character-spacing-5-2);
  color: var(--text-color);
  text-align: left;
  font: normal normal bold 52px/69px Degular Display;
  letter-spacing: 5.2px;
  color: #d2d5da;
  opacity: 1;
}
</style>
