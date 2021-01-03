<template>
    <nav>
    <ul class="menu">
        <li class="logo"><a>Overtime</a></li>
        <li class="item"><input type="text"></li>
        <li class="item"><a>Search</a></li>
        <li class="item"><a>Settings</a></li>
        <li class="item button secondary"><a @click="onLogin">Login</a></li>
        <li class="toggle"><span class="bars"></span></li>
    </ul>

    </nav>
</template>

<script>
import firebase from 'firebase'
// @click="onLogin"

export default {
    methods: {
        onLogin() {
            var provider = new firebase.auth.GoogleAuthProvider();
            firebase.auth().signInWithPopup(provider).then(() => {
                console.log('Signin Success!')
            })
        }
    }
}
</script>