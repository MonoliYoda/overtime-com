import { createStore } from "vuex";
import fb from "./firebase/firebaseInit";
import firebase from 'firebase'

const dbUsers = fb.firestore().collection("users");

const store = createStore({
  state() {
    return {
      fb: fb,
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
  mutations: {
    pushJob(state, job) {
      state.jobs.push(job);
    },
    resetJobs(state) {
      state.jobs = [];
    },
    resetActiveJobs(state) {
      state.activeJobs = [];
    },
    pushActiveJob(state, job) {
      state.activeJobs.push(job);
    },
    setUser(state, user) {
      state.user = user;
    },
    setUserData(state, userData) {
      state.userData = userData;
    },
    showEditModal(state) {
      state.showEditModal = true;
    },
    hideEditModal(state) {
      state.showEditModal = false;
    },
    setEditingJob(state, job) {
      state.editingJob = job;
    },
    // For editing form
    editTitle(state, title) {
      state.editingJob.title = title
    },
    editEmployer(state, employer) {
      state.editingJob.employer = employer
    },
    editDescription(state, desc) {
      state.editingJob.description = desc
    },
    editStartDate(state, date) {
      state.editingJob.startDate = date
    },
    editEndDate(state, date) {
      state.editingJob.endDate = date
    },
    editRate(state, rate) {
      state.editingJob.dailyRate = rate
    },
    editHours(state, hours) {
      state.editingJob.workdayHours = hours
    }
  },
  getters: {
    jobStartDate(job) {
      console.log(job);
    },
    jobs(state) {
      return state.jobs;
    },
    activeJobs(state) {
      return state.activeJobs;
    },
    user(state) {
      return state.user;
    },
    userData(state) {
      return state.userData;
    },
    showEditModal(state) {
      return state.showEditModal;
    },
    editingJob(state) {
      return state.editingJob;
    },
  },
  actions: {
    fetchJobs(context) {
      // Fetch finished jobs from DB
      dbUsers
        .doc(context.getters.user.uid)
        .collection("jobs")
        .orderBy("startDateTime", "desc")
        .get()
        .then((col) => {
          context.commit("resetJobs");
          col.forEach((doc) => {
            const data = doc.data();
            data.startDate = data.startDate.toDate();
            data.endDate = data.endDate.toDate();
            data.id = doc.id;
            context.commit("pushJob", data);
          });
        });
      // Fetch unfinished jobs from DB
      dbUsers
        .doc(context.getters.user.uid)
        .collection("jobs")
        .where("endDateTime", "==", null)
        .get()
        .then((col) => {
          context.commit("resetActiveJobs");
          col.forEach((doc) => {
            const data = doc.data();
            data.startDateTime = data.startDateTime.toDate();
            data.id = doc.id;
            context.commit("pushActiveJob", data);
          });
        });
    },
    editJob(context, job) {
      console.log(job);
      job.startDate = firebase.firestore.Timestamp.fromDate(job.startDate);
      job.endDate = firebase.firestore.Timestamp.fromDate(job.endDate);
      if ("id" in job.keys()) {
        // Update job
        const jobID = job.id;
        delete job.id;
        dbUsers
          .doc(context.getters.user.uid)
          .collection("jobs")
          .doc(jobID)
          .set(job);
      } else {
        // New job
        dbUsers
          .doc(this.user.uid)
          .collection("jobs")
          .add(job);
      }

      dbUsers
        .doc(context.getters.user.uid)
        .collection("jobs")
        .doc();
      this.editingJob = job;
      //this.$bvModal.show("edit-modal");
    },
  },
});

export default store;
