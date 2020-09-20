<template>
  <div class="container">
    <!-- loading 套件 start -->
    <loading :active.sync="isLoading"></loading>
    <!-- loading 套件 end -->

    <!-- 產品列表 start -->
    <div class="row mt-4">
      <div v-for="(item) in products" :key="item.id" class="col-md-4 mb-4">
        <div class="card border-0 shadow-sm">
          <div style="height: 150px; background-size: cover; background-position: center"
            :style="{backgroundImage: `url(${item.imageUrl})`}"></div>
          <div class="card-body">
            <span class="badge badge-secondary float-right ml-2">{{ item.category }}</span>
            <h5 class="card-title">
              <a href="#" class="text-dark">{{ item.title }}</a>
            </h5>
            <p class="card-text" v-html="item.content">
              {{ item.content }}
            </p>
            <div class="d-flex justify-content-between align-items-baseline">
              <!-- price 是選填，如果沒有，就顯只顯示 origin_price
                  如果有，就顯示 price 並且 origin_price 帶 <del> -->
              <div v-if="!item.price" class="h5">
                {{ item.origin_price }} 元
              </div>
              <div v-else>
                <del class="h6">原價 {{ item.origin_price }} 元</del>
                <div class="h5">
                  特價 {{ item.price }} 元
                </div>
              </div>
            </div>
          </div>
          <div class="card-footer d-flex">
            <button type="button" class="btn btn-outline-secondary btn-sm"
              :disabled="status.loadingItem === item.id"
              @click="getProductDetail(item.id)">
              <i v-if="status.loadingItem === item.id" class="spinner-grow spinner-grow-sm"></i>
              <!-- v-if 點選該按鈕時，會產生「旋轉效果」表示等待中 -->
              查看更多
            </button>
            <button type="button" class="btn btn-outline-danger btn-sm ml-auto"
              :disabled="status.loadingItem === item.id" @click="addToCart(item)">
              <i v-if="status.loadingItem === item.id" class="spinner-grow spinner-grow-sm"></i>
              加到購物車
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- 產品列表 end -->

    <!-- 產品細節 Modal start -->
    <div id="productModal" class="modal fade"
      tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 id="exampleModalLabel" class="modal-title">
              {{ tempProduct.title }}
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <img :src="tempProduct.imageUrl" class="img-fluid" alt>
            <blockquote class="blockquote mt-3">
              <p class="mb-0" v-html="tempProduct.content"></p>
              <footer class="blockquote-footer text-right">
                {{ tempProduct.description }}
              </footer>
            </blockquote>
            <div class="d-flex justify-content-between align-items-baseline">
              <div v-if="!tempProduct.price" class="h4">
                {{ tempProduct.origin_price }} 元
              </div>
              <del v-if="tempProduct.price" class="h6">原價 {{ tempProduct.origin_price }} 元</del>
              <div v-if="tempProduct.price" class="h4">
                特價 {{ tempProduct.price }} 元
              </div>
            </div>
            <select v-model="tempProduct.num" name class="form-control mt-3">
              <option value="0" disabled selected>
                請選擇數量
              </option>
              <option v-for="num in 10" :key="num" :value="num">
                選購 {{ num }} {{ tempProduct.unit }}
              </option>
            </select>
          </div>
          <div class="modal-footer">
            <div v-if="tempProduct.num" class="text-muted text-nowrap mr-3">
              小計
              <strong>{{ tempProduct.num * tempProduct.price }}</strong> 元
            </div>
            <button type="button" class="btn btn-primary"
              @click="addToCart(tempProduct, tempProduct.num)">
              <i v-if="tempProduct.id === status.loadingItem" class="fas fa-spinner fa-spin"></i>
              加到購物車
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- 產品細節 end -->
  </div>
</template>

<script>
/* global $ */
export default {
  name: 'Products',
  data() {
    return {
      products: [],
      tempProduct: {
        num: 0,
      },
      form: {
        name: '',
        email: '',
        tel: '',
        address: '',
        payment: '',
        message: '',
      },
      status: {
        loadingItem: '', // 透過此屬性，可以綁定單一個產品的 Btn，取資料時，Btn 則會帶有「旋轉效果」
      },
      cart: {},
      cartTotal: 0,
      isLoading: false,
    };
  },
  created() {
    this.getProducts();
  },
  methods: {
    getProducts() {
      this.isLoading = true;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/ec/products?sort=asc`;
      this.$http.get(api).then((response) => {
        this.products = response.data.data;
        this.isLoading = false;
      });
    },
    getProductDetail(id) {
      this.status.loadingItem = id;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/ec/product/${id}`;
      this.$http.get(api).then((response) => {
        this.tempProduct = response.data.data;

        // 使用 $set 在 tempProdct 裡面，新增屬性 num，供 option 選定數量時能存起來
        // 因 tempProduct 沒有 num 的預設值
        // 如果直接用物件新增屬性則會雙向綁定失敗
        this.$set(this.tempProduct, 'num', 0);
        $('#productModal').modal('show');
        this.status.loadingItem = ''; // 結束 btn 的等待效果
      });
    },
    addToCart(item, quantity = 1) {
      this.status.loadingItem = item.id;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/ec/shopping`;
      const cart = {
        product: item.id,
        quantity,
      };
      this.$http.post(api, cart).then(() => {
        this.status.loadingItem = '';
        $('#productModal').modal('hide');
      }).catch((err) => {
        this.status.loadingItem = '';
        // eslint-disable-next-line no-console
        console.log(err.response.data.errors);
        $('#productModal').modal('hide');
      });
    },
  },
};
</script>
