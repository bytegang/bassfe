<template>
  <v-container>
    <app-alert ></app-alert>
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <v-card>
          <v-card-text>
            <v-container>
              <form @submit.prevent="onSignin">
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
                      name="password"
                      label="Password"
                      id="password"
                      v-model="password"
                      type="password"
                      required></v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex xs6>
                    <v-text-field
                            name="captcha"
                            label="Captcha"
                            id="captcha"
                            v-model="cv"
                            required></v-text-field>
                  </v-flex>
                  <v-flex xs6>
                    <img :src="captchaImg" @click="getCaptcha">

                  </v-flex>
                </v-layout>
                <v-layout>
                  <v-flex xs12>
                    <v-btn type="submit" :loading="loading">Login</v-btn>
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
    data () {
      return {
        cv:'',
        email: 'neochau@gmail.com',
        password: '123456'
      }
    },
    computed: {
      captchaId(){ return this.$store.getters.captchaId},
      captchaImg(){ return this.$store.getters.captchaImg},
      user () {
        return this.$store.getters.user
      },
      loading () {
        return this.$store.getters.loading
      }
    },
    watch: {
      user (value) {
        if (value !== null && value !== undefined) {
          this.$router.push('/main')
        }
      }
    },
    mounted(){
      this.getCaptcha()
    },
    methods: {
      getCaptcha(){
        this.cv = ''
        this.$store.dispatch('doFetchCaptcha')
      },
      onSignin () {
        this.$store.dispatch('doSignIn', {email: this.email, password: this.password,ci:this.captchaId,cv:this.cv})
      },

    }
  }
</script>
