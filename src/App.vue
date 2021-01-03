<template>
  <div>
    <!-- NavBar -->
    <NavBar />
    <!-- AddJobButton -->
    <div class="content">
      <div class="add-job-space">
        <button class="add-job-button" @click="showModal">Add Job</button>
      </div>

      <!-- Opt: ActiveJob -->
      <router-view name="activejob"></router-view>
      <!-- JobList -->
      <router-view></router-view>
    </div>
    <modal v-show="showEditModal" />
  </div>
</template>

<script>
import NavBar from "./components/NavBar";
import modal from "./components/EditItemModal";
import { mapGetters } from "vuex";
import fb from "./firebase/firebaseInit";
const dbUsers = fb.firestore().collection("users");
const auth = fb.auth();

export default {
  name: "App",
  components: { NavBar, modal },
  data() {
    return {
      isModalVisible: false,
    };
  },
  computed: {
    ...mapGetters(["showEditModal"]),
  },
  methods: {
    // Move modal control to vuex
    showModal() {
      this.$store.commit('showEditModal')
    },
  },
  created() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.$store.commit("setUser", user);
        dbUsers
          .doc(user.uid)
          .get()
          .then((doc) => {
            this.$store.commit("setUserData", doc.data());
            if (!doc.data()) {
              console.log("User doc does not exist. Creating...");
              dbUsers.doc(user.uid).set({
                settings: {},
              });
            } else {
              console.log("User doc found. Great success!!!");
            }
          })
          .then(() => {
            this.$store.dispatch("fetchJobs");
          });
      } else {
        this.$store.commit("setUser", null);
      }
    });
  },
};
</script>

<style></style>
