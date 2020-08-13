<template>
    <v-layout row v-if="error">
        <v-flex offset-sm3 sm6 xs12>
            <v-alert :type="error.type || 'info'" :value="!!error" @input="onDismissed" dismissible
                     v-text="error.msg || 'null'"></v-alert>
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
