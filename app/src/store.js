import Vue from 'vue';
import Vuex from 'vuex';
import firebase from "firebase";
import router from './router';


Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        email: "",
        password: "",
        name: "",
        wallet: "",
        uid: "",
        userList: [],
        userwallet: "",
        useruid: '',
        username: '',
        index: '',
        showModal1: false,
        showModal2: false,
    },
    getters: {
        email: state => state.email,
        password: state => state.password,
        name: state => state.name,
        wallet: state => state.wallet,
        userList: state => state.userList,
        userwallet: state => state.userwallet,
        useruid: state => state.useruid,
        username: state => state.username,
        showModal1: state => state.showModal1,
        showModal2: state => state.showModal2,
    },
    mutations: {
        createName(state, name) {
            state.name = name
        },
        createEmail(state, email) {
            state.email = email
        },
        createPassword(state, password) {
            state.password = password

        },

        setUser(state, { nameDate, walletDate }) {
            state.name = nameDate
            state.wallet = walletDate
        },
        setUserInfo(state, { user, index }) {
            state.username = user.name
            state.userwallet = user.wallet
            state.useruid = user.uid
            state.index = index
        },


        setWallet(state, { nowWallet, userData }) {
            state.wallet = nowWallet
            for (let i = 0; i < state.userList.length; i++) {
                if (state.userList[i].uid === userData.uid) {
                    state.userList[i].wallet = nowWallet
                }
            }
        },

        setYourWallet(state, yourwallet) {
            state.userwallet = yourwallet
            state.userList[state.index].wallet = yourwallet

        },
        openModal1(state) {
            state.showModal1 = true
        },
        openModal2(state) {
            state.showModal2 = true
        },
        closeModal1(state) {
            state.showModal1 = false
        },
        closeModal2(state) {
            state.showModal2 = false
        },
        resetUserList(state) {
            state.userList.splice(0)
        },
        createUserList(state, snap) {
            snap.forEach(doc => {
                state.userList.push(doc.data());
            });
        },



    },
    actions: {
        createUser({ commit, state }) {
            firebase.auth().createUserWithEmailAndPassword(state.email, state.password)
                .then(() => {
                    const userData = firebase.auth().currentUser
                    userData.updateProfile({
                        displayName: state.name,
                    }).then(() => {
                        const db = firebase.firestore();
                        db.collection("users").doc(userData.uid).set({
                            uid: userData.uid,
                            email: userData.email,
                            name: userData.displayName,
                            wallet: 1000,

                        })
                            .then(() => {
                                const users = db.collection('users').doc(userData.uid);
                                users.get().then((doc) => {
                                    const nameDate = doc.data().name;
                                    const walletDate = doc.data().wallet;
                                    commit("setUser", { nameDate, walletDate });
                                }).catch((error) => {
                                    console.log("Error getting document:", error);
                                });
                            }).then(() => {
                                router.push('/home')
                            })

                    })
                })
                .catch((error) => {
                    console.log(error);
                })

        },
        loginUser({ commit }, { email, password }) {
            firebase
                .auth().signInWithEmailAndPassword(email, password)
                .then(() => {
                    const userData = firebase.auth().currentUser
                    commit('createName', userData.displayName)
                    const db = firebase.firestore()
                    const users = db.collection("users").doc(userData.uid);
                    users.get().then((doc) => {
                        const nameDate = doc.data().name;
                        const walletDate = doc.data().wallet;
                        commit('setUser', { nameDate, walletDate });
                    }).catch((error) => {
                        console.log("Error getting document:", error);
                    });
                })
                .then(() => {
                    router.push('/home')
                })
                .catch((error) => {
                    console.log(error)
                    alert('エラー');
                })

        },
        async sendWallet({ commit, state }, amountMoney) {
            let nowWallet = state.wallet - amountMoney
            const userData = firebase.auth().currentUser
            const db = firebase.firestore()
            let eventDocRef = db.collection('users').doc(userData.uid);
            await db.runTransaction(async transaction => {
                await transaction.get(eventDocRef);
                transaction.update(eventDocRef, {
                    wallet: nowWallet
                })
            })
                .then(() => {
                    commit('setWallet', { nowWallet, userData });



                    const num1 = parseInt(state.userwallet)
                    const num2 = parseInt(amountMoney)
                    let yourwallet = num1 + num2

                    const db = firebase.firestore()
                    db.collection("users").doc(state.useruid).update({
                        wallet: yourwallet
                    }).then(() => {
                        commit('setYourWallet', yourwallet)
                        commit('closeModal2');
                    })
                })
        }, createUserList({ commit }) {
            const currentUser = firebase.auth().currentUser;
            this.uid = currentUser.uid;
            const db = firebase.firestore();
            db.collection('users').where("uid", "!=", currentUser.uid).get().then(snap => {
                commit('createUserList', snap)
            }).catch((error) => {
                console.log(error)
                alert('エラー');
            })
        },



        logoutUser() {
            firebase.auth().signOut()
                .then(() => {
                    router.push('/');
                })
        }
    }

});