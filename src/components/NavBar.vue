<template>
    <nav class="navbar">
        <div class="logo">Logo</div>
        <div class="search">Search</div>
        <div class="logout" @click="onLogin">Logout</div>

    </nav>
</template>

<script>
import firebase from 'firebase'

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