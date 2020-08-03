import httpClient from "./request";

const AuthModule = {
    state: {
        user: null,
        captchaId: "",
        captchaImg: ""
    },
    mutations: {
        setUser(state, payload) {
            state.user = payload
        },
        setCaptchaImg(state, img) {
            state.captchaImg = img
        },
        setCaptchaId(state, id) {
            state.captchaId = id
        }
    },
    actions: {
        signUserUp({commit}, payload) {
            httpClient.post("register", payload).then(res => {
                commit('setLoading', false)
                const newUser = {
                    id: res.id,
                    username: res.name
                }
                commit('setUser', newUser)
            })

        },
        signUserIn({commit}, payload) {
            httpClient.post(`login`, payload,{params:{ci:payload.ci,cv:payload.cv}}).then(res => {
                if (res){
                    const newUser = {
                        id: res.id,
                        username: res.name
                    }
                    commit('setUser', newUser)
                }

            })
        },
        getCaptcha({commit}) {
            httpClient.get("captcha").then(res => {
                commit('setCaptchaId', res.id)
                commit('setCaptchaImg', res.image)
            })
        }
    },
    getters: {
        user(state) {
            return state.user
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
