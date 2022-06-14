<template>
  <div>
    <button
      class="btn btn-light w-100 d-flex justify-content-between"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#collapseMenu"
      aria-expanded="true"
      aria-controls="collapseMenu"
    >
      <span>Menü</span>
      <i class="bi bi-list"></i>
    </button>

    <div class="collapse show" id="collapseMenu">
      <div class="card card-body my-2">
        <router-link v-for="item in menuItems" :key="item.$id" :to="item.url">
          <button class="btn btn-light my-1 w-100">
            {{ item.name }}
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'Navigation',
  components: {},
  data() {
    const menuItems = [];
    return {
      menuItems
    };
  },
  beforeCreate() {
    axios
      .get('/GetMenus')
      .then((res) => {
        this.menuItems = res.data.$values;

        // for not exist menus
        this.menuItems.push(
          { $id: 0, name: 'Hediye Listesi', url: '/gifts' },
          { $id: 1, name: 'Ürün Listesi', url: '/products' }
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }
};
</script>
