<template>
    <v-container>
        <v-layout row wrap>
            <v-flex xs12 sm6 class="text-xs-center text-sm-right">
                <v-btn large to="/meetups" class="info">Explore Meetups</v-btn>
            </v-flex>
            <v-flex xs12 sm6 class="text-xs-center text-sm-left">
                <v-btn large to="/meetup/new" class="info">Organize Meetup</v-btn>
            </v-flex>
        </v-layout>
        <v-layout row wrap v-if="loading">
            <v-flex xs12 class="text-xs-center">
                <v-progress-circular
                    indeterminate
                    color="red"
                    :width="7"
                    :size="70"
                ></v-progress-circular>
            </v-flex>
        </v-layout>
        <v-layout row wrap class="mt-2" v-if="!loading">
            <v-flex xs12>
                <v-carousel style="cursor: pointer;">
                    <v-carousel-item
                    v-for="item in meetupUrls"
                    :src="item.imageUrl"
                    :key="item.id"
                    @click.native="onLoadMeetup(item.id)">
                    <div class="carousel-title">{{item.title}}</div>
                    </v-carousel-item>
                </v-carousel>
            </v-flex>
        </v-layout>
        <v-layout row wrap class="mt-3">
            <v-flex xs12 class="text-xs-center">
                <p>Join our awesome meetups!</p>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
export default {
  computed: {
    meetupUrls () {
      return this.$store.getters.featuredMeetups
    },
    loading () {
        return this.$store.getters.loading
    }
  },
  methods: {
    onLoadMeetup (id) {
      this.$router.push(`/meetup/${id}`)
    }
  }
}
</script>

<style scoped>
    .carousel-title {
        color: white;
        background-color: rgba(0, 0, 0, 0.5);
        margin-bottom: 50px;
        position: absolute;
        bottom: 0;
        text-align: center;
        width: 100%;
        font-size: 1.5rem;
    }
</style>
