<template>
    <v-container>
        <app-alert></app-alert>

        <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
                <v-card>
                    <v-card-text>
                        <v-container>
                            <form @submit.prevent="onSignup">
                                <v-layout row>
                                    <v-flex xs12>
                                        <v-text-field
                                                name="email"
                                                label="E-mail"
                                                id="email"
                                                v-model="email"
                                                type="email"
                                                required></v-text-field>
                                    </v-flex>
                                </v-layout>
                                <v-layout row>
                                    <v-flex xs12>
                                        <v-text-field
                                                name="username"
                                                label="Username"
                                                id="username"
                                                v-model="username"
                                                type="text"
                                                required></v-text-field>
                                    </v-flex>
                                </v-layout>
                                <v-layout row>
                                    <v-flex xs12>
                                        <v-text-field
                                                name="password"
                                                label="Password"
                                                id="password"
                                                v-model="password"
                                                type="password"
                                                required></v-text-field>
                                    </v-flex>
                                </v-layout>
                                <v-layout row>
                                    <v-flex xs12>
                                        <v-text-field
                                                name="confirmPassword"
                                                label="Validate Password"
                                                id="confirmPassword"
                                                v-model="confirmPassword"
                                                type="password"
                                                :rules="[comparePasswords]"></v-text-field>
                                    </v-flex>
                                </v-layout>
                                <v-layout>
                                    <v-flex xs12>
                                        <v-btn type="submit" :loading="loading">Register</v-btn>
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
