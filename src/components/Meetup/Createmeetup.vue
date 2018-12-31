<template>
    <v-container>
        <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
                <h2  class="red--text lighten-1">Create a new Meetup</h2>
            </v-flex>
        </v-layout>
        <v-layout row>
            <v-flex xs12>
                <form @submit.prevent="onCreateMeetup">
                    <v-layout>
                        <v-flex xs12 sm6 offset-sm3>
                            <v-text-field
                                color="red lighten-1"
                                name="title"
                                label="Title"
                                id="title"
                                v-model="title"
                                required></v-text-field>
                        </v-flex>
                    </v-layout>
                    <v-layout>
                        <v-flex xs12 sm6 offset-sm3>
                            <v-text-field
                                color="red lighten-1"
                                name="location"
                                label="Location"
                                id="location"
                                v-model="location"
                                required></v-text-field>
                        </v-flex>
                    </v-layout>
                    <v-layout>
                        <v-flex xs12 sm6 offset-sm3>
                            <v-btn color="red" dark @click="onPickFile">Upload Image</v-btn>
                            <input type="file"
                                multiple
                                style="display: none;"
                                ref="fileInput"
                                accept="image/*"
                                @change="onFilePicked">
                        </v-flex>
                    </v-layout>
                    <v-layout>
                        <v-flex xs12 sm6 offset-sm3>
                            <img :src="imageUrl" height="150">
                        </v-flex>
                    </v-layout>
                    <v-layout>
                        <v-flex xs12 sm6 offset-sm3>
                            <v-textarea
                                color="red lighten-1"
                                name="description"
                                label="Description"
                                id="description"
                                v-model="description"
                                required></v-textarea>
                        </v-flex>
                    </v-layout>
                    <v-layout row>
                        <v-flex  xs12 sm6 offset-sm3>
                            <v-btn
                                color="red lighten-1 white--text"
                                :disabled="!formIsValid"
                                type="submit">Create Meetup</v-btn>
                        </v-flex>
                    </v-layout>
                </form>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
export default {

  data () {
    return {
      title: '',
      location: '',
      imageUrl: '',
      description: '',
      image: null 
    }
  },

  computed: {
    formIsValid () {
      return (
        this.title !== '' &&
        this.location !== '' &&
        this.imageUrl !== '' &&
        this.description !== ''
      )
    }
  },

  methods: {
    onCreateMeetup () {

      if (!this.formIsValid) {          
          return
      }
      if (!this.image) {
          console.log('mesmo erro')          
          return
      }

      const meetupData = {
        title: this.title,
        location: this.location,
        image: this.image,
        description: this.description,
        date: new Date()
      }
      this.$store.dispatch('createMeetup', meetupData)
      this.$router.push('/meetups')
    },

    onPickFile () {
        this.$refs.fileInput.click()
    },

    onFilePicked (event) {
        const file = event.target.files
        let filename = file[0].name

        if (filename.lastIndexOf('.') <= 0) {
            alert('Please Add a valid file.')
        }

        let fileReader = new FileReader()
        fileReader.addEventListener('load', () => { 
            this.imageUrl = fileReader.result
        })
        fileReader.readAsDataURL(file[0])
        this.image = file[0]

    }
  }
}
</script>
