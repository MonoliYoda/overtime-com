import { createStore } from "vuex";
import fb from "./firebase/firebaseInit";
import firebase from "firebase";


const dbUsers = fb.firestore().collection("users");

const store = createStore({
  state() {
    return {
      fb: fb,
      filters: {title: null, employer: null},
      jobs: [],
      activeJobs: [],
      filteredJobs: [],
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
    setJobs(state, jobs){
      state.jobs = jobs
    },
    resetActiveJobs(state) {
      state.activeJobs = [];
    },
    pushActiveJob(state, job) {
      state.activeJobs.push(job);
    },
    setActiveJobs(state, jobs) {
      state.activeJobs = jobs
    },
    setFilteredJobs(state, jobs) {
      state.filteredJobs = jobs
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
      state.editingJob = {...job}
      try {
        state.editJob.startDate = job.startDate.toISOString().substring(0, 16)
        state.editJob.endDate = job.endDate.toISOString().substring(0, 16)
      } catch (err) {
        return
      }
    },
    setFilter(state, filter) {
      state.filters[filter.type] = filter.value
    },
    // For editing form
    editTitle(state, title) {
      state.editingJob.title = title;
    },
    editEmployer(state, employer) {
      state.editingJob.employer = employer;
    },
    editDescription(state, desc) {
      state.editingJob.description = desc;
    },
    editStartDate(state, date) {
      state.editingJob.startDate = date;
    },
    editEndDate(state, date) {
      state.editingJob.endDate = date;
    },
    editRate(state, rate) {
      state.editingJob.dailyRate = rate;
    },
    editHours(state, hours) {
      state.editingJob.workdayHours = hours;
    },
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
    filteredJobs(state) {
      return state.filteredJobs;
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
    filters(state) {
      return state.filters
    }
  },
  actions: {
    fetchJobs(context) {
      // Fetch finished jobs from DB
      dbUsers
        .doc(context.getters.user.uid)
        .collection("jobs")
        .orderBy("startDate", "desc")
        .get()
        .then((col) => {
          context.commit("resetJobs");
          col.forEach((doc) => {
            const data = doc.data();
            data.startDate = data.startDate.toDate();
            data.id = doc.id;
            if (data.endDate == null) {
              context.commit("pushActiveJob", data);
            } else {
              data.endDate = data.endDate.toDate();
              context.commit("pushJob", data);
            }
          });
        }).then(() => context.commit('setFilteredJobs', context.getters.jobs));
        
    },
    editJob(context) {
      const job = this.getters.editingJob
      job.startDate = firebase.firestore.Timestamp.fromDate(new Date(job.startDate));
      job.endDate = firebase.firestore.Timestamp.fromDate(new Date(job.endDate));
      if (isNaN(job.endDate.seconds)) {
        // Active job
        delete job.endDate
      }
      if ("id" in job) {
        // Update job
        const jobID = job.id;
        delete job.id;
        dbUsers
        .doc(context.getters.user.uid)
        .collection("jobs")
        .doc(jobID)
        .set(job).then(() => {
          job.id = jobID
          job.startDate = job.startDate.toDate();
          if (job.endDate) {
            job.endDate = job.endDate.toDate();
          }
          const jobs = [...context.getters.jobs]
          const idx = jobs.findIndex((job) => job.id == jobID)
          if (idx == -1) {
            // Not in completed jobs, need to check in active..
            const jobs2 = [...context.getters.activeJobs]
            const idx2 = jobs2.findIndex((job) => job.id == jobID)
            // Delete from active jobs
            jobs2.splice(idx2, 1)
            context.commit('setActiveJobs', jobs2)
            // Add to completed jobs
            context.commit('pushJob', job)
          } else {
            // Found in completed, just need to update
            jobs[idx] = job
            context.commit('setJobs', jobs)
          }
        });
      } else {
        // New job
        dbUsers
        .doc(context.getters.user.uid)
        .collection("jobs")
        .add(job).then(docRef => {
          console.log('Added wtih docRef:', docRef)
          job.startDate = job.startDate.toDate();
          job.id = docRef.id
          if (job.endDate) {
            job.endDate = job.endDate.toDate();
            context.commit('pushJob', job)
          } else {
            context.commit('pushActiveJob', job)
          }
        });
      }
      console.log('Job submitted');
      context.commit('setEditingJob', {})
      context.dispatch('fetchJobs')
      //this.$bvModal.show("edit-modal");
    },
    deleteJob(context, id) {
      dbUsers
      .doc(context.getters.user.uid)
      .collection("jobs")
      .doc(id)
      .delete().then(() => {
        const jobs = [...context.getters.jobs]
        const idx = jobs.findIndex((job) => job.id == id)
        jobs.splice(idx, 1)
        context.commit('setJobs', jobs)
      });
      context.dispatch('fetchJobs')
    },
    setFilter(context, filter) {
      context.commit('setFilter', filter)
      context.dispatch('filterJobs')
    },
    filterJobs(context) {
      var joblist = [...context.getters.jobs]
      const filters = context.getters.filters
      if (filters.title) {
        joblist = joblist.filter(job => {
          return job.title === filters.title ? true : false
        })
      }
      if (filters.employer) {
        joblist = joblist.filter(job => {
          return job.employer === filters.employer ? true : false
        })
      }
      context.commit('setFilteredJobs', joblist)
    }
  },
});

export default store;
