<template>
    <v-container>
        <v-layout row wrap v-if="error">
            <v-flex x12 sm6 offset-sm3>
                <app-lert @dismissed="onDismissed" :text="error.message"></app-lert>
            </v-flex>
        </v-layout>
        <v-layout row wrap>
            <v-flex xs12 sm6 offset-sm3>
                <v-card>
                    <v-card-text>
                        <v-container>
                            <form @submit.prevent="onSignup">
                                <v-layout row>
                                    <v-flex xs12>
                                        <v-text-field
                                        color="red"
                                        name="email"
                                        label="Email"
                                        id="email"
                                        v-model="email"
                                        type="email"
                                        required></v-text-field>
                                    </v-flex>
                                </v-layout>
                                <v-layout row>
                                    <v-flex xs12>
                                        <v-text-field
                                        color="red"
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
                                        color="red"
                                        name="confirmPassword"
                                        label="Confirm Password"
                                        id="confirmPassword"
                                        v-model="confirmPassword"
                                        type="password"
                                        :rules="[comparePasswords]"></v-text-field>
                                    </v-flex>
                                </v-layout>
                                <v-layout row>
                                    <v-flex xs12>
                                        <v-btn type="submit">Sign up</v-btn>
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
      email: '',
      password: '',
      confirmPassword: ''
    }
  },
  computed: {
      comparePasswords () {
          return this.password !== this.confirmPassword ? 'The password must be equal!' : ''
      },
      user () {
          return this.$store.getters.user
      },
      error () {
          return this.$store.getters.error
      }
  },
  watch: {
      user (value) {
          if(value !== null && value !== undefined){
              this.$router.push('/')
          }
      }
  },
  methods: {
    onSignup () {
        if(this.comparePasswords){
            return
        }        
        this.$store.dispatch('signUserUp', {email: this.email, password: this.password})
    },
    onDismissed () {
        console.log('dis!');
        this.$store.dispatch('clearError')
    }
  }
}
</script>
