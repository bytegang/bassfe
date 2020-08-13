<template>
    <v-container>
        <app-alert></app-alert>

        <v-layout row>
            <v-flex offset-sm3 sm6 xs12>
                <v-card>
                    <v-card-text>
                        <v-container>
                            <form @submit.prevent="onSignup">
                                <v-layout row>
                                    <v-flex xs12>
                                        <v-text-field
                                                id="email"
                                                label="E-mail"
                                                name="email"
                                                required
                                                type="email"
                                                v-model="email"></v-text-field>
                                    </v-flex>
                                </v-layout>
                                <v-layout row>
                                    <v-flex xs12>
                                        <v-text-field
                                                id="username"
                                                label="Username"
                                                name="username"
                                                required
                                                type="text"
                                                v-model="username"></v-text-field>
                                    </v-flex>
                                </v-layout>
                                <v-layout row>
                                    <v-flex xs12>
                                        <v-text-field
                                                id="password"
                                                label="Password"
                                                name="password"
                                                required
                                                type="password"
                                                v-model="password"></v-text-field>
                                    </v-flex>
                                </v-layout>
                                <v-layout row>
                                    <v-flex xs12>
                                        <v-text-field
                                                :rules="[comparePasswords]"
                                                id="confirmPassword"
                                                label="Validate Password"
                                                name="confirmPassword"
                                                type="password"
                                                v-model="confirmPassword"></v-text-field>
                                    </v-flex>
                                </v-layout>
                                <v-layout>
                                    <v-flex xs12>
                                        <v-btn :loading="loading" type="submit">Register</v-btn>
                                    </v-flex>
                                </v-layout>
                            </form>
                        </v-container>
                    </v-card-text>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    export default {
        data() {
            return {
                email: 'neochau@gmail.com',
                username: 'FelixZhou',
                password: '123456',
                confirmPassword: '123456'
            }
        },
        computed: {
            comparePasswords() {
                return this.password !== this.confirmPassword ? 'Passwords do not match.' : true
            },
            user() {
                return this.$store.getters.user
            },

            loading() {
                return this.$store.getters.loading
            }
        },
        watch: {
            user(value) {
                if (value !== null && value !== undefined) {
                    this.$router.push('/')
                }
            }
        },
        methods: {
            onSignup() {
                this.$store.dispatch('doSignUp', {email: this.email, password: this.password, name: this.username})
            }
        }
    }
</script>
