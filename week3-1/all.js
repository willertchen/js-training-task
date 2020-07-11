new Vue({
  el: '#app',
  data: {
    products: [
      {
        id: "5vP85YBTjIh0WA0ttxWp2nZCSuyHbWuSnOKIprw0wByc7kKMlwYw7mJjF2PmvXLJ",
        title: "碰瓷殲 1234 號",
        category: "Aircraft",
        description: "搭載 10 顆最新型「不愛國者」發彈，可以在 10000 英呎的高空，進行無差別攻擊。",
        content: "碰瓷國最新航太飛行船殲 4 號",
        imageUrl: [
          "https://cdn.pixabay.com/photo/2012/09/17/21/24/landscape-57073_1280.png"
        ],
        enabled: true,
        origin_price: 1500000,
        price: 1500000,
        unit: "台"
      },
      {
        id: "p20hqOIX4JLocXC0dzJPdnQ70Bjiu61ySsGAEkmxJUloJYgRk17jZpmjqkkClzE4",
        title: "經典款 PUSH 911 超跑",
        category: "Car",
        content: "經典不敗款 911 等你開回家",
        imageUrl: [
          "https://cdn.pixabay.com/photo/2020/06/22/19/30/automobile-5330343_1280.jpg"
        ],
        enabled: true,
        origin_price: 7890000,
        price: 6000000,
        unit: "台"
      },
      {
        id: "QVHWQv85pegfhmPeMJoYBpWMOM9ojUJpxnOqQ84yVfFPMu3pga3YEUtDfLXRJovA",
        title: "無肩帶小禮服",
        category: "Dress",
        content: "無肩帶小禮服、粉色",
        imageUrl: [
          "https://image.freepik.com/free-photo/portrait-young-beautiful-smiling-girl-trendy-summer-light-pink-dress-sexy-carefree-woman-posing-positive-model-having-fun-dancing-round-sunglasses_158538-5151.jpg"
        ],
        enabled: true,
        origin_price: 1980,
        price: 1820,
        unit: "件"
      },
      {
        id: "MxmD0BwK2e1YgHEXHnt6SgZ5wS9lbSwbaUAoYZ63hnAuugSBjOjdFHVhAWYg49J8",
        title: "[尢尢得阿門]2021年喬哥限量AR21新款球鞋",
        category: "籃球鞋",
        content: "尢尢得阿門牌新出，AR21新款球鞋",
        imageUrl: [
          "https://bpic.588ku.com/art_origin_min_pic/19/03/17/887220b3cb455928ba5ce2a811e055e2.jpg"
        ],
        enabled: true,
        origin_price: 3200,
        price: 2900,
        unit: "雙"
      }
    ],
    tempProduct: {},
  },
  methods: {
    openModal(type, item) {
      switch (type) {
        case 'new':
          this.tempProduct = {}
          $('#productModal').modal('show');
          break;
        case 'edit':
          this.tempProduct = item;
          $('#productModal').modal('show');
          break;
        case 'delete':
          this.tempProduct = item
          $('#deleteModal').modal('show');
          break;
        default:
          break;
      }
    },
    updateProduct() {
      if (this.tempProduct.id) {
        const id = this.tempProduct.id;
        this.products.forEach((product, index) => {
          if (product.id === id) {
            this.products[index] = this.tempProduct;
          }
        });
      } else {
        const id = Math.floor(Date.now());
        this.tempProduct.id = id;
        this.products.push(this.tempProduct);
      }

      this.tempProduct = {};  // 清空 tempProduct，避免下次打開 Modal 時，發生資料不正確的問題
      $('#productModal').modal('hide');
    },
    deleteProduct() {
      if (this.tempProduct.id) {
        const id = this.tempProduct.id;
        this.products.forEach((product, index) => {
          if (product.id === id) {
            this.products.splice(index, 1);
            this.tempProduct = {};
          }
        });
      }
      $('#deleteModal').modal('hide');
    }
  }
});