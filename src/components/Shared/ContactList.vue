<template>
    <v-list
    >
        <v-subheader>FRIENDS</v-subheader>
        <v-list-item-group color="primary" v-model="friendCount">
            <v-list-item
                    :key="item.id"
                    v-for="item in friends"
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
        <v-list-item-group color="primary" v-model="groupCount">
            <v-list-item
                    :key="item.id"
                    v-for="item in groups"
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
            friendCount() {
                return this.$store.getters.friends.length
            },
            friends() {
                return this.$store.getters.friends
            },
            groupCount() {
                return this.$store.getters.groups.length
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
        }
    }
</script>

<style scoped>

</style>