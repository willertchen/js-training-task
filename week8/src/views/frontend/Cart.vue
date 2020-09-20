<template>
  <div class="container">
    <!-- loading 套件 start -->
    <loading :active.sync="isLoading"></loading>
    <!-- loading 套件 end -->

    <!-- 購物車頁面 start -->
    <div class="my-5 row justify-content-center">
      <div class="col-md-6">
        <div class="text-right mb-3">
          <button type="button" class="btn btn-outline-danger btn-sm" @click="removeCartAllItem()">
            <i class="far fa-trash-alt"> 刪除所有品項</i>
          </button>
        </div>
        <table class="table">
          <thead>
            <th>刪除</th>
            <th>品名</th>
            <th width="150px">
              數量
            </th>
            <th>單位</th>
            <th>單價</th>
          </thead>
          <tbody v-if="cart.length">
            <tr v-for="item in cart" :key="item.id">
              <td class="align-middle">
                <button type="button" class="btn btn-outline-danger btn-sm"
                @click="removeCartItem(item.product.id)">
                  <i class="far fa-trash-alt"></i>
                </button>
              </td>
              <td class="align-middle">
                {{ item.product.title }}
              </td>
              <td class="align-middle">
                <div class="input-group">
                  <div class="input-group-prepend">
                    <button class="btn btn-outline-primary"
                      type="button"
                      @click="quantityUpdata(item.product.id, item.quantity + 1)">
                      +
                    </button>
                  </div>
                  <input type="text" class="form-control text-center"
                    :value="item.quantity"
                    @keyup.enter="quantityUpdata(item.product.id, $event.target.value)">
                  <div class="input-group-append">
                    <button class="btn btn-outline-primary"
                      type="button"
                      @click="quantityUpdata(item.product.id, item.quantity - 1)"
                      :disabled="item.quantity === 1">
                      -
                    </button>
                  </div>
                </div>
              </td>
              <td class="align-middle">
                {{ item.product.unit }}
              </td>
              <td class="align-middle text-right">
                {{ item.product.price }}
              </td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td colspan="4" class="text-right">
                總計
              </td>
              <td class="text-right">
                {{ cartTotal }}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
    <!-- 購物車頁面 end -->

    <!-- 訂單 start -->
    <div class="my-5 row justify-content-center">
      <!-- validation-observer v-slot 回饋表單有沒有通過驗證 -->
      <validation-observer v-slot="{ invalid }" class="col-md-6">
        <!-- form 不帶 action，用 submit 取消預設，並載入自定義方法 -->
        <form @submit.prevent="createOrder">
          <div class="form-group">
            <!-- v-slot 的 errors 是錯誤的回饋訊息，classes 則是樣式的回饋訊息 -->
            <validation-provider v-slot="{ errors, classes }" rules="required">
              <label for="username">收件人姓名</label>
              <!-- classes 的回饋訊息綁定動態 class，就會出現 is-invalid 的樣式-->
              <input id="username" name="收件人姓名"
                v-model="form.name" type="text" class="form-control" :class="classes">
              <!-- errors 錯誤回饋訊息，用 v-if 判別，如果存在就顯示錯誤訊息，不存在就不顯示任何訊息 -->
              <span v-if="errors[0]" class="text-danger">{{ errors[0] }}</span>
            </validation-provider>
          </div>
          <div class="form-group">
            <validation-provider v-slot="{ errors, classes }" rules="required|email">
              <label for="email">Email</label>
              <input id="email" name="信箱"
                v-model="form.email" type="email" class="form-control" :class="classes">
              <span v-if="errors[0]" class="text-danger">{{ errors[0] }}</span>
            </validation-provider>
          </div>
          <div class="form-group">
            <validation-provider v-slot="{ errors, classes }" rules="required|min:8">
              <label for="tel">電話</label>
              <input id="tel" name="電話"
                v-model="form.tel" type="tel" class="form-control" :class="classes">
              <span v-if="errors[0]" class="text-danger">{{ errors[0] }}</span>
            </validation-provider>
          </div>
          <div class="form-group">
            <validation-provider v-slot="{ errors, classes }" rules="required">
              <label for="address">地址</label>
              <input id="address" name="地址"
                v-model="form.address" type="text" class="form-control" :class="classes">
              <span v-if="errors[0]" class="text-danger">{{ errors[0] }}</span>
            </validation-provider>
          </div>
          <div class="form-group">
            <!-- select 也要使用 validation-provider，否則沒有選任何項目時，buttom 會是 enabled -->
            <validation-provider v-slot="{ errors, classes }" rules="required">
              <label for="payment">購買方式</label>
              <select v-model="form.payment" class="form-control" :class="classes" required>
                <option value="" disabled>請選擇付款方式</option>
                <option value="WebATM">WebATM</option>
                <option value="ATM">ATM</option>
                <option value="Barcode">Barcode</option>
                <option value="Credit">Credit</option>
                <option value="ApplePay">ApplePay</option>
                <option value="GooglePay">GooglePay</option>
                <option value="CVS">CVS</option>
              </select>
              <span v-if="errors[0]" class="text-danger">{{ errors[0] }}</span>
            </validation-provider>
          </div>
          <div class="form-group">
            <label for="message">留言</label>
            <textarea id="message" v-model="form.message"
              class="form-control" cols="30" rows="3">
            </textarea>
          </div>

          <div class="text-right">
            <!-- 透過表單 v-slot invalid 回饋訊息決定按鈕能不能使用 -->
            <button type="submit" class="btn btn-primary" :disabled="invalid">送出表單</button>
          </div>
        </form>
      </validation-observer>
    </div>
    <!-- 訂單 end -->

    <!-- 完成訂單 Modal start -->
    <div class="modal fade" id="orderModal"
      tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
      aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">完成訂單</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <p>恭喜你已完成訂單。</p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">關閉</button>
        </div>
      </div>
    </div>
  </div>
  <!-- 完成訂單 Modal end -->
  </div>
</template>

<script>
/* global $ */
export default {
  name: 'Cart',
  data() {
    return {
      form: {
        name: '',
        email: '',
        tel: '',
        address: '',
        payment: '',
        message: '',
      },
      cart: {},
      cartTotal: 0,
      isLoading: false,
    };
  },
  created() {
    this.getCart();
  },
  methods: {
    getCart() {
      this.isLoading = true;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/ec/shopping`;
      this.$http.get(api).then((response) => {
        this.cart = response.data.data;
        // 重新計算購物車價格時，要先歸 0，避免把上次的金額一並加上去
        this.cartTotal = 0;
        // 購物車累加金額
        this.cart.forEach((item) => {
          this.cartTotal += (item.product.price * item.quantity);
        });
        this.isLoading = false;
      });
    },
    quantityUpdata(id, num) {
      // 避免新增的數量是 0
      if (num <= 0) return;

      this.isLoading = true;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/ec/shopping`;
      const data = {
        product: id,
        quantity: num,
      };

      this.$http.patch(api, data).then(() => {
        this.isLoading = false;
        this.getCart();
      });
    },
    removeCartItem(id) {
      this.isLoading = true;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/ec/shopping/${id}`;
      this.$http.delete(api).then(() => {
        this.isLoading = false;
        this.getCart();
      });
    },
    removeCartAllItem() {
      this.isLoading = true;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/ec/shopping/all/product`;
      this.$http.delete(api).then(() => {
        this.isLoading = false;
        this.getCart();
      });
    },
    createOrder() {
      this.isLoading = true;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/ec/orders`;
      this.$http.post(api, this.form).then((response) => {
        // 如果回應成功，會有 id，表示訂單已經建立
        if (response.data.data.id) {
          this.isLoading = false;
          $('#orderModal').modal('show');
        }
      }).catch((err) => {
        this.isLoading = false;
        // eslint-disable-next-line no-console
        console.log(err.methods);
      });
    },
  },
};
</script>
