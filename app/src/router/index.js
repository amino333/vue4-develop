import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import SignUp from '../views/SignUp.vue'
import Home from '../views/Home.vue'
import firebase from "firebase";

Vue.use(VueRouter)

const routes = [
    { path: '/', name: 'Login', component: Login },
    { path: '/sign-up', name: 'SignUp', component: SignUp },
    { path: '/home', name: 'Home', component: Home, meta: { requiresAuth: true } },
]



const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})
router.beforeEach((to, from, next) => {
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
    if (requiresAuth) {
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                next()
            } else {
                next({
                    path: '/',
                    query: { redirect: to.fullPath }
                })
            }
        })
    } else {
        next()
    }
})
export default router