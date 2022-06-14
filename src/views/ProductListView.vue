<template>
  <div>
    <div
      class="d-flex align-items-center align-items-sm-end flex-sm-row flex-column justify-content-sm-between justify-content-center"
    >
      <div class="mx-2">
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

      <div class="flex-fill mx-2 mt-4">
        <div class="d-flex flex-column align-items-start">
          <div :class="[$style['input-group-text']]" class="input-group">
            <input type="text" class="form-control" v-model="searchItem" placeholder="Marka veya Ürün Adı" />
            <button class="btn btn-light" type="button" id="button-addon2">
              <i class="bi bi-search"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
    <hr />

    <div class="row d-flex align-items-start justify-content-center">
      <div class="col-sm-8 col-12 align-self-start order-1 order-sm-0">
        <div>
          <div v-if="searchItem.length >= 1 && productList.length === 0" class="spinner-border" role="status">
            <span class="visually-hidden">Aranıyor...</span>
          </div>
        </div>

        <div class="d-flex flex-wrap align-items-baseline justify-content-center">
          <div
            :class="[$style.card]"
            class="rounded m-2 d-flex flex-column"
            v-for="(item, index) in productList"
            :key="item.index"
          >
            <img class="img-fluid rounded m-3" :src="item.url" alt="..." />
            <span class="mx-3 my-1 align-self-start appSubHeaderText">{{ item.name }}</span>
            <span class="mx-3 my-1 align-self-start appHelperText">{{ item.brand }}</span>
            <span class="mx-3 my-1 align-self-start appSubHeaderText text-start">{{ item.description }}</span>
            <div class="d-flex flex-nowrap align-items-center justify-content-between">
              <span class="m-3 pt-2 align-self-center appSubHeaderText text-start text-nowrap"
                >{{ item.price }} Puan</span
              >
              <div class="input-group ps-5 pe-2">
                <button class="btn btn-light" type="button" @click="decrement(index)" :disabled="item.amount === 0">
                  <i :class="{ 'text-danger': item.amount === 0 }" class="bi bi-dash-lg"></i>
                </button>
                <input type="number" :value="item.amount" class="form-control" disabled />
                <button class="btn btn-light" type="button" @click="increment(index)">
                  <i class="bi bi-plus-lg"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-sm-4 col-12 order-0 order-sm-1">
        <div :class="[$style['checkout']]" class="m-2">
          <div class="d-flex align-items-center justify-content-center flex-nowrap w-100">
            <span :class="[$style['left-side']]" class="py-1 px-2 rounded text-white flex-fill text-nowrap text-start"
              >BEK Puanınız</span
            >
            <span :class="[$style['right-side']]" class="bg-white border p-2">{{ availablePoints }}</span>
          </div>

          <div class="my-4 border rounded">
            <button
              class="btn btn-light w-100 d-flex justify-content-between"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseCarts"
              aria-expanded="true"
              aria-controls="collapseCarts"
            >
              <span>Sepetiniz</span>
              <i class="bi bi-cart2"></i>
            </button>

            <div class="collapse show" id="collapseCarts">
              <div class="my-2 p-2 d-flex flex-column flex-wrap">
                <div class="d-flex align-items-center justify-content-start my-1">
                  <span class="appText">Toplam Sepet Puanı: {{ sumOfSelected }}</span>
                </div>
                <hr class="d-block d-md-none" />
                <div class="d-flex align-items-center justify-content-start my-1">
                  <span class="appText"
                    >Kalan Sepet Puanı:
                    <span :class="{ 'text-danger': remainedPoints < 0 }">{{ remainedPoints }}</span></span
                  >
                </div>

                <hr />

                <div v-for="selected in selectedProducts" :key="selected.$id" class="d-flex flex-column">
                  <div class="d-flex flex-column">
                    <span class="appHelperText"
                      >Adı: <span class="appSubHeaderText">{{ selected.name }}</span></span
                    >
                    <span class="appHelperText"
                      >Markası: <span class="appSubHeaderText">{{ selected.brand }}</span></span
                    >
                    <span class="appHelperText"
                      >Miktar: <span class="appSubHeaderText">{{ selected.amount }}</span></span
                    >
                    <hr />
                  </div>
                </div>

                <button
                  class="btn btn-warning btn-outline-warning w-100"
                  @click="confirm"
                  :disabled="selectedProducts.length < 1"
                >
                  <i class="bi bi-cart-check"></i> Siparişi Tamamla
                </button>
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
  name: 'ProductListView',
  components: {},
  data() {
    const products = [];
    const productList = [];
    let searchItem = '';

    let availablePoints = 4500;
    let remainedPoints = 4500;
    let sumOfSelected = 0;
    let selectedProducts = [];

    return {
      products,
      productList,
      searchItem,

      availablePoints,
      remainedPoints,
      sumOfSelected,
      selectedProducts
    };
  },
  beforeCreate() {
    axios
      .get('/GetProducts')
      .then((res) => {
        // this.productList = res.data.$values;
        // add amount and total for calculation
        this.products = res.data.$values.map((newItem) => Object.assign({}, newItem, { amount: 0 }, { total: 0 }));
        this.productList = this.products;
      })
      .catch((err) => {
        console.log(err);
      });
  },
  methods: {
    increment(index) {
      this.productList[index].amount += 1;
      const item = {
        $id: this.productList[index].$id,
        name: this.productList[index].name,
        brand: this.productList[index].brand,
        price: this.productList[index].price,
        amount: this.productList[index].amount,
        get total() {
          return this.price * this.amount;
        }
      };

      this.selectedProducts = this.selectedProducts.filter((obj) => {
        return obj.$id !== item.$id && obj.amount !== 0;
      });

      this.selectedProducts.push(item);

      this.sumOfSelected = this.selectedProducts
        .map((o) => o.total)
        .reduce((a, c) => {
          return a + c;
        });

      this.remainedPoints = this.availablePoints - this.sumOfSelected;
    },
    decrement(index) {
      this.productList[index].amount -= 1;

      const item = {
        $id: this.productList[index].$id,
        name: this.productList[index].name,
        brand: this.productList[index].brand,
        price: this.productList[index].price,
        amount: this.productList[index].amount,
        get total() {
          return this.price * this.amount;
        }
      };

      this.selectedProducts = this.selectedProducts.filter((obj) => {
        return obj.$id !== item.$id && obj.amount !== 0;
      });

      this.selectedProducts.push(item);

      // if amount = 0
      const searchAmountValue = this.selectedProducts.find((o) => o.amount === 0);
      if (searchAmountValue) {
        this.selectedProducts.pop(searchAmountValue);
      }

      try {
        this.sumOfSelected = this.selectedProducts
          .map((o) => o.total)
          .reduce((a, b) => {
            return a + b;
          });
      } catch {
        console.log('Hesaplama için sepete ürün eklenmelidir.');
      }

      if (this.selectedProducts.length === 0) {
        this.remainedPoints = this.availablePoints;
        this.sumOfSelected = 0;
      }

      this.remainedPoints = this.availablePoints - this.sumOfSelected;
    },

    confirm() {
      if (this.remainedPoints < 0) {
        alert('Kullanılabilir puan miktarı aşıldı.');
      } else {
        alert(JSON.stringify(this.selectedProducts));
      }
    }
  },
  watch: {
    searchItem(userInput) {
      console.log(userInput);
      if (userInput.length > 0) {
        // search only selected key of object
        //let x = this.productList.find((brand) => brand.brand === userInput);

        // with "indexOf"
        // let x = this.productList.filter((x) => !Object.values(x).indexOf(`${userInput}`) > 1);

        // with "includes"
        this.productList = this.products.filter((x) => !Object.values(x).includes(`${userInput}`) !== true);

        if (this.productList.length === 0) {
          console.log('Ürün bulunamadı.');
        }
      } else {
        this.productList = this.products;
      }
    }
  }
};
</script>

<style lang="scss" module>
.input-group-text {
  input {
    border: none;
  }
  border: 1px solid #ced4da;
  border-radius: 5px;
}

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

  input {
    border: none;
    background-color: #f8f9fa;

    // for text-align: center
    text-align: right;
  }
}

.checkout {
  .left-side {
    margin-right: -10px;
    width: 100%;
    background-color: #008cba;
  }
  .right-side {
    border-color: #008cba !important;
    border-width: 0.2em !important;
    border-radius: 0.8em;
    color: #008cba;
  }
}
</style>
