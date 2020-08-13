<template>
    <v-list
    >
        <v-subheader>FRIENDS</v-subheader>
        <v-list-item-group color="primary">
            <v-list-item
                    :key="item.id"
                    v-for="item in friends"
                    @click="doSelectFriend(item)"
            >
                <v-list-item-avatar>
                    <v-img :src="item.profile.avatar"></v-img>
                </v-list-item-avatar>
                <v-list-item-content>
                    <v-list-item-title v-html="item.name"></v-list-item-title>
                    <v-list-item-subtitle v-html="item.profile.bio"></v-list-item-subtitle>
                </v-list-item-content>

            </v-list-item>
        </v-list-item-group>
        <v-subheader>Group</v-subheader>
        <v-list-item-group color="primary" >
            <v-list-item
                    :key="item.id"
                    v-for="item in groups"
                    @click="doSelectGroup(item)"
            >
                <v-list-item-avatar>
                    <v-img :src="item.avatar"></v-img>
                </v-list-item-avatar>
                <v-list-item-content>
                    <v-list-item-title v-html="item.name"></v-list-item-title>
                    <v-list-item-subtitle v-html="item.bio"></v-list-item-subtitle>
                </v-list-item-content>

            </v-list-item>
        </v-list-item-group>
    </v-list>
</template>

<script>
    export default {
        name: "ContactList",
        data: () => ({}),
        mounted() {
        },
        computed: {

            friends() {
                return this.$store.getters.friends
            },
            groups() {
                return this.$store.getters.groups
            },
        },

        methods: {
            fetchFriends() {
                this.$store.dispatch('fetchFriends')
            },
            fetchGroups() {
                this.$store.dispatch('fetchGroups')
            },
            doSelectFriend(friend){
                this.$store.dispatch('doSelectFriend',friend)

            },
            doSelectGroup(group){
                this.$store.dispatch('doSelectGroup',group)
            },
        }
    }
</script>

<style scoped>

</style>