<template>
    <v-layout row v-if="error">
        <v-flex xs12 sm6 offset-sm3>
            <v-alert  dismissible @input="onDismissed" :value="!!error" :type="error.type || 'info'" v-text="error.msg || 'null'"></v-alert>
        </v-flex>
    </v-layout>
</template>

<script>
    export default {
        computed: {
            error() {
                return this.$store.getters.error
            },
        },

        methods: {
            onDismissed() {
                this.$store.dispatch('clearError')
            }
        }

    }
</script>
