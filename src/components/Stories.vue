<template>
  <div>
    <div class="d-flex flex-wrap justify-content-center align-items-center">
      <div v-for="(item, index) in stories" :key="index">
        <div class="mx-2" :class="[$style.story]" data-bs-toggle="modal" :data-bs-target="'#exampleModal' + index">
          <img :src="item.url" alt="..." />
          <p class="my-2">{{ item.$id }}</p>
        </div>

        <!-- Modal -->
        <div class="modal fade" ref="myModal" :id="'exampleModal' + index" tabindex="-1" aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered modal-sm">
            <div class="modal-content border-0">
              <div :class="[$style.openStory]">
                <div class="d-flex flex-column justify-content-center align-items-center">
                  <img :src="item.url" class="rounded" alt="..." />
                  <span class="appHeaderText my-2">{{ item.title }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Stories',
  components: {},
  data() {
    const stories = [];
    return {
      stories
    };
  },
  beforeCreate() {
    axios
      .get('/GetStories')
      .then((res) => {
        this.stories = res.data.$values;
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }
};
</script>

<style lang="scss" module>
.story {
  img {
    width: 60px;
    height: 60px;
    object-fit: cover;
    border-radius: 50%;
    cursor: pointer;
    transition: 125ms;
    padding: 2px;
    box-shadow: rgba(0, 140, 186, 100) 0px 0px 0px 3px;

    &:hover {
      transition: 125ms;
      transform: scale(1.2);
      box-shadow: rgba(131, 58, 180) 0px 0px 0px 3px;
    }
  }
}

.openStory {
  img {
    position: relative;
    max-width: 350px;
    width: 350px;
    max-height: 450px;
    height: 450px;
    object-fit: cover;
  }
}
</style>
