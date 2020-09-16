import httpClient from "./request";

const AuthModule = {
    state: {
        userAuthed:null,
        user: null,
        captchaId: "",
        captchaImg: "",
        friends: [],
    },
    mutations: {
        setUser(state, payload) {
            localStorage.setItem('user', payload)
            localStorage.setItem('token', payload ? payload.token : null)
            state.user = payload
        },
        setUserAuthed(state, payload) {
            state.userAuthed = payload
        },
        setCaptchaImg(state, img) {
            state.captchaImg = img
        },
        setCaptchaId(state, id) {
            state.captchaId = id
        },

    },
    actions: {
        doSignUp({commit}, payload) {
            httpClient.post("register", payload).then(res => {
                commit('setLoading', false)
                const newUser = {
                    id: res.id,
                    username: res.name
                }
                commit('setUser', newUser)
            })

        },
        doSignOut({commit}) {
            commit('setUser', null)
        },
        doSignIn({commit,dispatch}, payload) {
            httpClient.post(`login`, payload, {params: {ci: payload.ci, cv: payload.cv}}).then(res => {
                if (res) {
                    const newUser = {
                        id: res.id,
                        username: res.name,
                        token: res.token,
                    }
                    commit('setUser', newUser)

                    dispatch('fetchAuthedUser')
                }

            })
        },
        fetchAuthedUser({commit}){
            httpClient.get(`user/authed`, null, null).then(res => {
                if (res) {
                    debugger
                    commit('setUserAuthed', res)
                }
            })
        },
        doFetchCaptcha({commit}) {
            httpClient.get("captcha").then(res => {
                commit('setCaptchaId', res.id)
                commit('setCaptchaImg', res.image)
            })
        },

    },
    getters: {
        user(state) {
            return state.user
        },
        token() {
            return localStorage.getItem('token')
        },

        isTokenExpire(state, getters) {
            let token = getters.token
            if (token) {
                let base64Url = token.split('.')[1];
                let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
                let jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
                    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
                }).join(''));
                let user = JSON.parse(jsonPayload);
                //console.log(user)
                return Date.now() > Date.parse(user.exp)

            } else {
                return true
            }
        },
        authedUser(state, getters) {
            let token = getters.token
            if (token) {
                let base64Url = token.split('.')[1];
                let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
                let jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
                    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
                }).join(''));
                return JSON.parse(jsonPayload)
            } else {
                return null
            }
        },
        captchaId(state) {
            return state.captchaId
        },
        captchaImg(state) {
            return state.captchaImg
        }
    }
}

export default AuthModule
