<template>
  <transition name="fade">
    <div class="modal-backdrop">
      <div
        class="modal"
        role="dialog"
        aria-labelledby="modalTitle"
        aria-describedby="modalDescription"
      >
        
        <section class="modal-body" id="modalDescription">
          <slot name="body">
            <form  class="form" action="">
              <div class="form-labels">
                <label for="name">Project:</label>
                <label for="employer">Producer:</label>
                <label for="notes">Notes:</label>
                <label for="rate">Daily rate:</label>
                <label for="hours">Day hours:</label>
                <label for="startdate">Start date:</label>
                <label for="enddate">End date:</label>
              </div>
              <div class="form-inputs">
                <input id="name" name="name" type="text" v-model="title" />
                <input
                  id="employer"
                  name="employer"
                  type="text"
                  v-model="employer"
                />
                <input
                  id="notes"
                  name="notes"
                  type="text"
                  v-model="description"
                />
                <input
                  id="rate"
                  name="rate"
                  type="number"
                  v-model="dailyRate"
                />
                <input
                  id="hours"
                  name="hours"
                  type="number"
                  v-model="workdayHours"
                />
                <input
                  id="startdate"
                  name="startdate"
                  type="datetime-local"
                  v-model="startDate"
                />
                <input
                  id="enddate"
                  name="enddate"
                  type="datetime-local"
                  v-model="endDate"
                />
              </div>
            </form>
          </slot>
        </section>
        <footer class="modal-footer">
          <slot name="footer">
            <button
              type="button"
              class="button"
              @click="close"
              aria-label="Close modal"
            >
              Cancel
            </button>
            <button
              type="button"
              class="button"
              @click="submit"
              aria-label="Close modal"
            >
              OK
            </button>
          </slot>
        </footer>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "modal",
  computed: {
    ...mapGetters(["editingJob"]),
    title: {
      get() {
        try {
          return this.$store.state.editingJob.title;
        } catch {
          return "";
        }
      },
      set(val) {
        this.$store.commit("editTitle", val);
      },
    },
    employer: {
      get() {
        try {
          return this.$store.state.editingJob.employer;
        } catch (err) {
          return "";
        }
      },
      set(val) {
        this.$store.commit("editEmployer", val);
      },
    },
    description: {
      get() {
        try {
          return this.$store.state.editingJob.description;
        } catch (err) {
          return "";
        }
      },
      set(val) {
        this.$store.commit("editDescription", val);
      },
    },
    startDate: {
      get() {
        try {
          return this.$store.state.editingJob.startDate;
        } catch {
          return "";
        }
      },
      set(val) {
        this.$store.commit("editStartDate", val);
      },
    },
    endDate: {
      get() {
        try {
          return this.$store.state.editingJob.endDate;
        } catch {
          return "";
        }
      },
      set(val) {
        this.$store.commit("editEndDate", val);
      },
    },
    dailyRate: {
      get() {
        try {
          return this.$store.state.editingJob.dailyRate;
        } catch (err) {
          return "";
        }
      },
      set(val) {
        this.$store.commit("editRate", val);
      },
    },
    workdayHours: {
      get() {
        try {
          return this.$store.state.editingJob.workdayHours;
        } catch (err) {
          return "";
        }
      },
      set(val) {
        this.$store.commit("editHours", val);
      },
    },
  },
  methods: {
    close() {
      this.$store.commit("hideEditModal");
      this.$store.commit("setEditingJob", {});
    },
    submit() {
      this.$store.commit("hideEditModal");
      // Validation
      this.$store.dispatch("editJob");
    },
    strfyDateTime(datetime) {
      try {
        return datetime.toISOString().substring(0, 16);
      } catch {
        return "";
      }
    },
  },
};
</script>

<style>

@import url('https://fonts.googleapis.com/css2?family=Poppins&display=swap');

.modal-backdrop {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.425);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  background:  #141a26;
  color: #D2D5DA;
  box-shadow: 2px 2px 20px 20px #00000066;
  min-width: 300px;
  font-family: 'Poppins', sans-serif;
}

.modal-header,
.modal-footer {
  display: flex;
  justify-content: flex-end;
}



.modal-body {
  padding: 20px 10px 10px 10px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

}

.form {
  display: flex;
}

.form-labels {
  display: flex;
  flex-direction:column;
  padding-right: 3px;
}

.form-labels label {
  height: 24px;
  margin: 2px 0px 2px 0px;
  text-align: right;
}

.form-inputs {
  display: flex;
  flex-direction: column;
}

.form-inputs input {
  height: 24px;
  margin: 2px 0px 2px 0px;
  background-color: rgb(71, 71, 71);
  color: #D2D5DA;
}

/* Modal animations */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.8s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
