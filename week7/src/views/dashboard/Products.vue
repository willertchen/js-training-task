<template>
  <div>
    <Loading :active.sync="isLoading" />
    <div class="text-right">
      <button class="btn btn-primary" @click="openModal('new')">
        建立新的產品
      </button>
    </div>
    <table class="table mt-3">
      <thead>
        <tr>
          <th>分類</th>
          <th>產品名稱</th>
          <th>原價</th>
          <th>售價</th>
          <th>是否啟用</th>
          <th>編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item) in products" :key="item.id">
          <td>{{ item.category }}</td>
          <td>{{ item.title }}</td>
          <td>{{ item.origin_price }}</td>
          <td>{{ item.price }}</td>
          <td>
            <span v-if="item.enabled" class="text-success">啟用</span>
            <span v-else>未啟用</span>
          </td>
          <td>
            <button class="btn btn-outline-success btn-sm"
              @click="openModal('edit', item)">編輯</button>
            <button class="btn btn-outline-danger btn-sm"
              @click="openModal('delete', item)">刪除</button>
          </td>
        </tr>
      </tbody>
    </table>
    <pagination :pages='pagination' @emit-pages='getProducts'></pagination>

    <!-- Update Modal Start -->
    <div class="modal fade"
      id="productModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true">
      <div class="modal-dialog modal-xl" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-dark text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>產品</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-sm-4">
                <div class="form-group">
                  <label for="imageUrl">輸入圖片網址</label>
                  <input id="imageUrl"
                    v-model="tempProduct.imageUrl[0]"
                    type="text" class="form-control"
                    placeholder="請輸入圖片連結">
                </div>
                <img class="img-fluid" :src="tempProduct.imageUrl[0]" :alt="tempProduct.title">
              </div>
              <div class="col-sm-8">
                <div class="form-group">
                  <label for="title">標題</label>
                  <input id="title"
                    v-model="tempProduct.title"
                    type="text" class="form-control" placeholder="請輸入標題">
                </div>

                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="category">分類</label>
                    <input id="category"
                      v-model="tempProduct.category"
                      type="text" class="form-control"
                      placeholder="請輸入分類" >
                  </div>
                  <div class="form-group col-md-6">
                    <label for="price">單位</label>
                    <input id="unit" v-model="tempProduct.unit" type="unit" class="form-control"
                      placeholder="請輸入單位">
                  </div>
                </div>

                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="origin_price">原價</label>
                    <input id="origin_price"
                      v-model="tempProduct.origin_price"
                      type="number" class="form-control"
                      placeholder="請輸入原價">
                  </div>
                  <div class="form-group col-md-6">
                    <label for="price">售價</label>
                    <input id="price" v-model="tempProduct.price" type="number" class="form-control"
                      placeholder="請輸入售價">
                  </div>
                </div>
                <hr>

                <div class="form-group">
                  <label for="description">產品描述</label>
                  <textarea id="description"
                    v-model="tempProduct.description"
                    type="text" class="form-control"
                    placeholder="請輸入產品描述" >
                  </textarea>
                </div>
                <div class="form-group">
                  <label for="content">說明內容</label>
                  <textarea id="description"
                    v-model="tempProduct.content"
                    type="text" class="form-control"
                    placeholder="請輸入說明內容" >
                  </textarea>
                </div>
                <div class="form-group">
                  <div class="form-check">
                    <input id="enabled"
                      v-model="tempProduct.enabled"
                      class="form-check-input" type="checkbox"
                      :true-value="true" :false-value="false">
                    <label class="form-check-label" for="enabled">是否啟用</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-primary" @click="updateProduct">確認</button>
          </div>
        </div>
      </div>
    </div>
    <!-- Update Modal End -->

    <!-- Delete Modal Start -->
    <div class="modal fade"
      id="deleteModal"
      tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>刪除產品</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            是否要刪除
            <strong class="text-danger"> {{ tempProduct.title }} </strong> 商品(刪除後無法恢復)
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-primary" @click="deleteProduct">確認刪除</button>
          </div>
        </div>
      </div>
    </div>
    <!-- Delete Modal End -->
  </div>
</template>

<script>
/* global $ */
import Pagination from '@/components/Pagination.vue';

export default {
  name: 'Products',
  components: {
    Pagination,
  },
  data() {
    return {
      products: [],
      pagination: {},
      tempProduct: {
        imageUrl: [],
      },
      isNew: false,
      isLoading: false,
    };
  },
  props: ['token'],
  created() {
    this.isLoading = true;
    this.getProducts();
  },
  methods: {
    getProducts(page = 1) {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/admin/ec/products?page=${page}`;

      this.$http.get(api).then((response) => {
        this.products = response.data.data;
        this.pagination = response.data.meta.pagination;
        this.isLoading = false;
      });
    },
    openModal(type, item) {
      switch (type) {
        case 'new':
          // 新增前先清空 tempProduct，避免下次打開 Modal 時，發生資料不正確的問題
          this.tempProduct = {
            imageUrl: [],
          };
          // 切換狀態，true 表示新增產品
          this.isNew = true;
          $('#productModal').modal('show');
          break;
        case 'edit':
          // 先取得單一產品的詳細資訊，再打開 Modal
          this.getProduct(item.id);
          // 切換狀態，fals 表示編輯產品
          this.isNew = false;
          break;
        case 'delete':
          this.tempProduct = { ...item };
          $('#deleteModal').modal('show');
          break;
        default:
          break;
      }
    },
    getProduct(id) {
      this.isLoading = true;

      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/ec/product/${id}`;
      this.$http.get(api).then((res) => {
        //  成功取得資料，丟到 tempProduct
        this.tempProduct = res.data.data;

        this.isLoading = false;

        // 資料成功寫入 tempProduct，打開 Modal
        $('#productModal').modal('show');
      }).catch((error) => {
        // eslint-disable-next-line no-console
        console.log(error); // 如果出現錯誤，就打印在 log
      });
    },
    updateProduct() {
      // 編輯產品的 api
      let api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/admin/ec/product/${this.tempProduct.id}`;
      let httpMethod = 'patch';

      if (this.isNew) {
        api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/admin/ec/product`;
        httpMethod = 'post';
      }

      this.isLoading = true;
      this.$http[httpMethod](api, this.tempProduct).then(() => {
        $('#productModal').modal('hide'); // AJAX 編輯 or 新增成功後，關閉 Modal
        this.getProducts(); // 重新取得全部資料
      }).catch((error) => {
        // eslint-disable-next-line no-console
        console.log(error); // 如果出現錯誤，就打印在 log
      });
    },
    deleteProduct() {
      this.isLoading = true;

      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/admin/ec/product/${this.tempProduct.id}`;

      this.$http.delete(url).then(() => {
        $('#deleteModal').modal('hide'); // 刪除成功，關閉 Modal
        this.isLoading = false;
        this.getProducts(); // 重新取得全部資料
      });
    },
  },
};
</script>
