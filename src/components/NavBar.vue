<template>
    <nav>
    <ul class="menu">
        <li class="logo"><a>OVERTIME</a></li>
        <li class="item" :class="{active: menuActive}"><input type="text"></li>
        <li class="item" :class="{active: menuActive}"><a>Search</a></li>
        <li class="item" :class="{active: menuActive}"><a>Settings</a></li>
        <li class="item job-edit-button" :class="{active: menuActive}"><a @click="onLogin">Login</a></li>
        <li class="toggle" @click="toggleMenu"><span class="bars"></span></li>
    </ul>

    </nav>
</template>

<script>
import firebase from 'firebase'
// @click="onLogin"

export default {
    data() {
        return {
            menuActive: false
        }
    },
    methods: {
        onLogin() {
            var provider = new firebase.auth.GoogleAuthProvider();
            firebase.auth().signInWithPopup(provider).then(() => {
                console.log('Signin Success!')
            })
        },
        toggleMenu() {
            this.menuActive = !this.menuActive
        }
    }
}
</script>