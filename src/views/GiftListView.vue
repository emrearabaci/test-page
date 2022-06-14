<template>
  <div>
    <div
      class="d-flex align-items-center align-items-sm-end flex-sm-row flex-column justify-content-sm-between justify-content-center"
    >
      <div>
        <div class="d-flex flex-column align-items-sm-start align-items-center">
          <span class="appHelperText">Lorem Ipsum</span>
          <span class="appHeaderText">Satış Etkinliği</span>
          <router-link class="mt-2" to="/">
            <button type="button" class="btn btn-light">
              <i class="bi bi-house"></i>
              Anasayfaya Dön
            </button>
          </router-link>
        </div>
      </div>

      <div>
        <div class="d-flex flex-column align-items-start">
          <span class="appHelperText mt-4">Sponsorlar Ürün Listesi</span>
        </div>
      </div>
    </div>

    <hr class="col-6 mx-auto" />

    <div class="d-flex flex-wrap align-items-baseline justify-content-center">
      <div :class="[$style.card]" class="rounded m-2 d-flex flex-column" v-for="item in giftList" :key="item.$id">
        <img class="img-fluid rounded m-3" :src="item.url" alt="..." />
        <span class="mx-3 my-1 align-self-start appSubHeaderText">{{ item.name }}</span>
        <span class="mx-3 my-1 align-self-start appHelperText">{{ item.brand }}</span>
        <span class="m-3 pt-2 align-self-start appSubHeaderText text-start">{{ item.description }}</span>
      </div>
    </div>

    <hr class="col-6 mx-auto" />

    <div :class="[$style.footer]" class="my-4 rounded">
      <span class="appHelperText my-4">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua. Sed libero enim sed faucibus. Porttitor eget dolor morbi non arcu risus quis. Urna condimentum
        mattis pellentesque id nibh. Donec ultrices tincidunt arcu non. Est ante in nibh mauris cursus mattis molestie a
        iaculis. Elementum nibh tellus molestie nunc non blandit.
      </span>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'GiftListView',
  components: {},
  data() {
    const giftList = [];
    return {
      giftList
    };
  },
  beforeCreate() {
    axios
      .get('/GetGifts')
      .then((res) => {
        this.giftList = res.data.$values;
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }
};
</script>

<style lang="scss" module>
.card {
  width: 300px;
  height: auto;
  cursor: pointer;
  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
  transition: 125ms ease;

  &:hover {
    transition: 125ms ease;
    box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 0px 1px;
  }
  img {
    height: 200px;
    position: relative;
    object-fit: cover;
  }
}

.footer {
  padding: 1em;
  background-color: #f2f2f2;
}
</style>
