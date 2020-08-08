<template>
    <v-list
            :disabled="disabled"
            :dense="dense"
            :two-line="twoLine"
            :three-line="threeLine"
            :shaped="shaped"
            :flat="flat"
            :subheader="subheader"
            :sub-group="subGroup"
            :nav="nav"
            :avatar="avatar"
            :rounded="rounded"
    >
        <v-subheader>FRIENDS</v-subheader>
        <v-list-item-group v-model="friendCount" color="primary">
            <v-list-item
                    v-for="(item, i) in friends"
                    :key="i"
                    :inactive="inactive"
            >
                <v-list-item-content>
                    <v-list-item-title v-html="item.name"></v-list-item-title>
                    <v-list-item-subtitle v-html="item.profile.bio"></v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-avatar >
                    <v-img :src="item.profile.avatar"></v-img>
                </v-list-item-avatar>
            </v-list-item>
        </v-list-item-group>
        <v-subheader>Group</v-subheader>
        <v-list-item-group v-model="groupCount" color="primary">
            <v-list-item
                    v-for="(item, i) in groups"
                    :key="i"
                    :inactive="inactive"
            >
                <v-list-item-content>
                    <v-list-item-title v-html="item.name"></v-list-item-title>
                    <v-list-item-subtitle v-html="item.bio"></v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-avatar >
                    <v-img :src="item.avatar"></v-img>
                </v-list-item-avatar>
            </v-list-item>
        </v-list-item-group>
    </v-list>
</template>

<script>
    export default {
        name: "FriendList",
        data: () => ({
            disabled: false,
            dense: false,
            twoLine: false,
            threeLine: true,
            shaped: false,
            flat: false,
            subheader: false,
            inactive: false,
            subGroup: false,
            nav: false,
            avatar: true,
            rounded: false,
        }),
        mounted(){
        },
        computed: {
            friendCount(){return this.$store.getters.friends.length},
            friends(){ return this.$store.getters.friends},
            groupCount(){return this.$store.getters.groups.length},
            groups(){ return this.$store.getters.groups},
        },

        methods: {
            fetchFriends(){
                this.$store.dispatch('fetchFriends')
            },
            fetchGroups(){
                this.$store.dispatch('fetchGroups')
            },
        }
    }
</script>

<style scoped>

</style>