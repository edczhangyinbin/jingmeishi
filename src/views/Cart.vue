<template>
  <div>
    <!--面包屑导航-->
    <div class="breadcrumb">
      <div class="container">
        <h2><a href="">首页</a>&gt;<a href="">产品中心</a></h2>
      </div>
    </div>
    <!--页面主体-->
    <div class="main container">
      <div class="cart">
        <div class="cart_header">
          <span>已选商品<em>{{checkNum}}</em>件</span>
          <span>总金额：<strong>{{total}}</strong></span>
          <button type="button">结算</button>
        </div>
        <div class="cart_con">
          <div class="cartcon_title">
            <span>
                <input 
                type="checkbox"
                v-model="checkAll"
                @change="doCheckAll"
             /> 全选</span>
            <span>商品信息</span>
            <span>单价</span>
            <span>数量</span>
            <span>金额</span>
            <span>操作</span>
          </div>
          <ul>
            <h2 v-if="products.length == 0">购物车中没有任何商品！</h2>
            <li v-for="(item, index) in products" :key="index">
              <input
                type="checkbox"
                class="cart_checkbox"
                v-model="item.checked"
                @change="doCheck"
              />
              <a href="" class="cart_img">
                <img
                  :src="'http://101.96.128.94:9999/mfresh/' + item.pic"
                  alt=""
                />
              </a>
              <a href="" class="cart_title">{{ item.title1 }}</a>
              <i>¥{{ item.price }}</i>
              <div>
                <span @click="updateCount(index,-1)">-</span>
                <input type="text" :value="item.count" />
                <span @click="updateCount(index,+1)">+</span>
              </div>
              <strong>¥{{ item.price * item.count }}</strong>
              <em @click="delProduct(index)"></em>
            </li>
            <!--<li>-->
            <!--<input type="checkbox" class="cart_checkbox"/>-->
            <!--<a href="" class="cart_img"><img src="product-imgs/jhq-m8088a.jpg" alt=""/></a>-->
            <!--<a href="" class="cart_title">家用除甲醛静音M-8088A</a>-->
            <!--<i>¥1599</i>-->
            <!--<div>-->
            <!--<span>-</span><input type="text" value="2"/><span>+</span>-->
            <!--</div>-->
            <!--<strong>¥1599.00</strong>-->
            <!--<em></em>-->
            <!--</li>-->
          </ul>
        </div>
        <div class="cart_header">
          <span
            >已选商品<em>{{ checkNum }}</em
            >件</span
          >
          <span
            >总金额：<strong>{{ total }}</strong></span
          >
          <button type="button">结算</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      products: [],
      checkNum: 0, //勾选状态
      total: 0, //总价格
      checkAll: false,
    };
  },
  methods: {
    getData() {
      let uid = this.$store.state.uid;
      let url =
        "http://101.96.128.94:9999/mfresh/data/cart_detail_select.php?uid=" +
        uid;
      this.axios.get(url).then((res) => {
        console.log(res);
        this.products = res.data.products;
      });
    },
  // 勾选状态变化时:
  doCheck() {
      this.checkNum = 0;
      this.total = 0;
        // 遍历数组中的商品数据
      this.products.forEach((item) => {
        //   如果当前的状态是选中状态
        if (item.checked == true) {
            // 那么数量就进行++
          this.checkNum++;
        //   总价节等于当前的价格*当前的数量
          this.total += item.price * item.count;
        }
      });
        // 更新vuex中的checkNum数值
      this.$store.commit("updateCheckNum", { checkNum: this.checkNum });

      // 选中数量 等于 数组总数量 就是全选
      if (this.checkNum == this.products.length) {
        this.checkAll = true;
      } else {
        this.checkAll = false;
      }
    },
     // 全选操作:
    doCheckAll() {
        // 遍历保存商品的数据
      this.products.forEach((item) => {
        // 改成和 全选按钮相同状态
        // 当前的状态都选中则打开全选按钮状态
        item.checked = this.checkAll;
      });

      this.doCheck(); //刷新内容
    },
    //    这里的index值为上方的for循环遍历的index下标  后面的delte值是传入的实参值
    updateCount(index,delte){
       let product = this.products[index];
        //console.log(product);
        //product.count是当前的数量的value值是字符串类型 *1变成数字类型  delate为上方传入的实参值
        // *1 转数字类型,  否则是字符串拼接  
      let count = product.count * 1 + delte;
      let url = "http://101.96.128.94:9999/mfresh/data/cart_detail_update.php";
      let params = `did=${product.did}&pid=${product.pid}&count=${count}`;
      this.axios.post(url,params).then((res)=>{
        //   console.log(res);
        // 更新
        // 获取点击减1后的值
        let code=res.data.code;
        if(code==1){
            // 成功, 则更新数量  更新当前的数量为-1后的数量值
            this.products[index].count=count;
        }else{
            alert("更新失败!");
        }
      })
    },
    delProduct(index){
        // this.products[index]获取当前点击的商品信息
        // did 为当前的商品的序号
        let did = this.products[index].did;
        let url="http://101.96.128.94:9999/mfresh/data/cart_detail_delete.php?did="+did;
        this.axios.get(url).then((res)=>{
            let code=res.data.code;
            if(code==1){
                // 从当前数组中删除   当前商品  删除1个
                this.products.splice(index,1);
            }else{
                alert("删除失败");
            }
        })
    }
 },
  mounted() {
    this.getData();
  },
};
</script>

<style>
</style>