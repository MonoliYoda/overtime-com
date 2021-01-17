<template>
    <nav>
    <ul class="menu">
        <li class="logo"><a>OVERTIME</a></li>
        <li class="item" :class="{active: menuActive}"><input type="text"></li>
        <li class="item" :class="{active: menuActive}"><a>Search</a></li>
        <li class="item" :class="{active: menuActive}"><a>Settings</a></li>
        <li class="item button" :class="{active: menuActive}" style="margin: 0;" v-if="user"><a @click="onLogout">Logout</a></li>
        <li class="item button" :class="{active: menuActive}" style="margin: 0;" v-else><a @click="onLogin">Login</a></li>
        <li class="toggle" @click="toggleMenu"><span class="bars"></span></li>
    </ul>

    </nav>
</template>

<script>
import firebase from 'firebase'
import { mapGetters } from "vuex";
// @click="onLogin"

export default {
    data() {
        return {
            menuActive: false
        }
    },
    computed: {
        ...mapGetters(["user"]),
    },
    methods: {
        onLogin() {
            var provider = new firebase.auth.GoogleAuthProvider();
            firebase.auth().signInWithPopup(provider).then(() => {
                console.log('Signin Success!')
            })
        },
        onLogout() {
            firebase.auth().signOut().then(() => {
                console.log('Signout Success!')
            })
        },
        toggleMenu() {
            this.menuActive = !this.menuActive
        }
    }
}
</script>