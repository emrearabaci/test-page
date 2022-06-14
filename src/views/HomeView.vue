<template>
  <div>
    <div>
      <Stories />
    </div>

    <div class="row d-flex align-items-start justify-content-center">
      <div class="col-sm-8 col-12 align-self-start order-1 order-sm-0">
        <div class="d-flex flex-wrap justify-content-center align-items-center">
          <div :class="[$style.container]" class="m-2" v-for="item in campaignsList" :key="item.$id">
            <img :src="item.url" alt="..." :class="[$style.image]" class="img-fluid rounded" />
            <div :class="[$style.overlay]" class="d-flex align-items-center justify-content-center rounded">
              <span class="appHeaderText text-white">
                {{ item.name }}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div class="col-sm-4 col-12 order-0 order-sm-1">
        <Navigation />
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

import Navigation from '@/components/Navigation';
import Stories from '@/components/Stories';
export default {
  name: 'HomeView',
  components: { Stories, Navigation },
  data() {
    const campaignsList = [];
    return {
      campaignsList
    };
  },
  beforeCreate() {
    axios
      .get('GetCampaigns')
      .then((res) => {
        this.campaignsList = res.data.$values;
      })
      .catch((err) => {
        console.log(err);
      });
  }
};
</script>

<style lang="scss" module>
.container {
  position: relative;
  cursor: pointer;
  transition: 0.125s ease;
  &:hover {
    transition: 0.125s ease;
    transform: scale(1.05);
    .overlay {
      opacity: 1;
    }
  }
  img {
    width: 220px;
    height: 200px;
    object-fit: cover;
    box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
  }
  .overlay {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    opacity: 0;
    transition: 0.125s ease;
    background-color: #008cba;
  }
}
</style>
