<template>
  <div>
    <!--面包屑导航-->
    <div class="breadcrumb">
      <div class="container">
        <h2>
          <a href="">首页</a>&gt;<a href="">产品中心</a>&gt;<a href=""
            >净美仕净化器</a
          >
        </h2>
      </div>
    </div>
    <!--页面主体-->
    <div class="main container" v-if="data">
      <div class="pd_info clearfloat">
        <div class="pdinfo_img">
          <img :src="'http://101.96.128.94:9999/mfresh/'+ data.pic" alt="" />
        </div>
        <div class="pdinfo_text">
          <h2></h2>
          <ul>
            <li>型号：{{data.model}}</li>
            <li>功能：{{data.func}}</li>
            <li>噪音：{{data.noise}}</li>
            <li>风量：{{data.wind}}</li>
            <li>适用对象：{{data.applyTo}}</li>
            <li>适用面积：{{data.size}}</li>
            <li>空气净化能效等级：{{data.level}}</li>
          </ul>
          <p>价格：<span>¥</span><strong id="price">{{data.price}}</strong></p>
          <a @click="addCart" id="addCart"><span class="icon_cart"></span>加入购物车</a>
        </div>
      </div>
      <div class="details_box">
        <h2 class="title">产品详情</h2>
        <div class="pd_details" v-html="transHTML(data.detail)">
          <!--<p>家用除甲醛静音M-8088A，带大脑的空气净化器。家用除甲醛静音M-8088A，带大脑的空气净化器。家用除甲醛静音M-8088A，带大脑的空气净化器。家用除甲醛静音M-8088A，带大脑的空气净化器。家用除甲醛静音M-8088A，带大脑的空气净化器。家用除甲醛静音M-8088A，带大脑的空气净化器。家用除甲醛静音M-8088A，带大脑的空气净化器。</p>-->
          <!-- <img src="product-imgs/m8088a/01.jpg" alt=""/>
          <img src="product-imgs/m8088a/02.jpg" alt=""/>
          <img src="product-imgs/m8088a/03.jpg" alt=""/>
          <img src="product-imgs/m8088a/04.jpg" alt=""/>
          <img src="product-imgs/m8088a/05.jpg" alt=""/>
          <img src="product-imgs/m8088a/06.jpg" alt=""/> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props:["pid"],
    data(){
        return{
            data:null
        }
    },
  mounted() {
    this.getData();
  },
  methods: {
    addCart(){
      // 如果当前的状态是登录状态则进行一下操作
      if(this.$store.state.uid){
        let url="http://101.96.128.94:9999/mfresh/data/cart_detail_add.php";
        let params=`uid=${this.$store.state.uid}&pid=${this.pid}`;
        this.axios.post(url,params).then((res)=>{
          console.log(res);
          // 解包
          let { code }=res.data;
          if(code===1){
            alert("添加成功")
          }else{
            alert("添加失败");
          }
        });
      }else{//否则没有登录则进行登录
        alert("登录后才能添加购物车, 即将跳转到登录页");
        // 如果是非登录状态 则跳转到登录页
        this.$router.push("/login");
      }
    },
       transHTML(html) {
            // src="news_imgs
            // src="http://101.96.128.94:9999/mfresh/news_imgs
            return html.replace(
            /src="product-imgs/g,
            'src="http://101.96.128.94:9999/mfresh/product-imgs/'
            );
        },
    getData() {
      // let { pid } = this.$route.params;
      let url =
        "http://101.96.128.94:9999/mfresh/data/product_detail.php?pid=" + this.pid;

      this.axios.get(url).then((res) => {
        // console.log(res);
        this.data=res.data;
      });
    },
  },
};
</script>

<style>
</style>