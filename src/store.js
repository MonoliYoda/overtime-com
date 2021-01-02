import { createStore } from "vuex";
import fb from "./firebase/firebaseInit";

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
      state.userData = userData
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
      return state.userData
    }
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
          context.commit('resetJobs')
          col.forEach((doc) => {
            const data = doc.data();
            data.startDateTime = data.startDateTime.toDate();
            data.endDateTime = data.endDateTime.toDate();
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
          context.commit('resetActiveJobs')
          col.forEach((doc) => {
            const data = doc.data();
            data.startDateTime = data.startDateTime.toDate();
            data.id = doc.id;
            context.commit("pushActiveJob", data);
          });
        });
    },
    editJob(context, job) {
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
      //if (job.startDateTime) {
      //  job.startDate = strDate(job.startDateTime);
      //  job.startTime = strTime(job.startDateTime);
      //}
      //if (job.endDateTime) {
      //  job.endDate = strDate(job.endDateTime);
      //  job.endTime = strTime(job.endDateTime);
      //}
      this.editingJob = job;
      //this.$bvModal.show("edit-modal");
    },
  },
});

export default store;
