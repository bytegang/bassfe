import httpClient from "./request";

const ContactModule = {
    state: {
        friends: [],
        groups: [],
    },
    mutations: {
        setFriends(state, friends) {
            state.friends = friends
        },
        setGroups(state, groups) {
            state.groups = groups
        },
    },
    actions: {
        fetchFriends({commit}) {
            httpClient.get("my/friends").then(res => {
                commit('setFriends', res)
            })
        },
        fetchGroups({commit}) {
            httpClient.get("my/groups").then(res => {
                commit('setGroups', res)
            })
        },
    },
    getters: {
        friends(state) {
            return state.friends
        },
        groups(state) {
            return state.groups
        },
    }
}

export default ContactModule
