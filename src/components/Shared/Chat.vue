<template>
    <v-container fluid>
        <v-data-iterator
                :items="items"
                :items-per-page.sync="itemsPerPage"
                hide-default-footer
        >
            <template v-slot:header>
                <v-toolbar
                        class="mb-2"
                        color="indigo darken-5"
                        dark
                        flat
                >
                    <v-toolbar-title>聊天</v-toolbar-title>
                </v-toolbar>
            </template>

            <template v-slot:default="props">
                <v-row>
                    <chat-msg></chat-msg>
                </v-row>
            </template>

        </v-data-iterator>

        <v-form>
            <chat-msg-input></chat-msg-input>
        </v-form>
    </v-container>

</template>

<script>
    import ChatMsg from "./ChatMsg";
    import ChatMsgInput from "./ChatMsgInput";

    export default {
        components: {ChatMsg,ChatMsgInput},
        data: () => ({
            itemsPerPage: 1,
            items: [
                {
                    name: 'Frozen Yogurt',
                    calories: 159,
                    fat: 6.0,
                    carbs: 24,
                    protein: 4.0,
                    sodium: 87,
                    calcium: '14%',
                    iron: '1%',
                },
                {
                    name: 'Ice cream sandwich',
                    calories: 237,
                    fat: 9.0,
                    carbs: 37,
                    protein: 4.3,
                    sodium: 129,
                    calcium: '8%',
                    iron: '1%',
                },
                {
                    name: 'Eclair',
                    calories: 262,
                    fat: 16.0,
                    carbs: 23,
                    protein: 6.0,
                    sodium: 337,
                    calcium: '6%',
                    iron: '7%',
                },
                {
                    name: 'Cupcake',
                    calories: 305,
                    fat: 3.7,
                    carbs: 67,
                    protein: 4.3,
                    sodium: 413,
                    calcium: '3%',
                    iron: '8%',
                },
            ],
        }),
    }
</script>

<style scoped>


</style>