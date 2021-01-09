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

