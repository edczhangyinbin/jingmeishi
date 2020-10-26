<template>
  <div>
    <!--面包屑导航-->
    <div class="breadcrumb">
      <div class="container">
        <h2><a href="">首页</a>&gt;<a href="">产品中心</a></h2>
      </div>
    </div>
    <!--页面主体-->
    <div class="main container" v-if="data">
      <div class="pl_header">
       <router-link to="/product/1" :class="{ cur: $route.params.type == 1 }"
          >净美仕净化器</router-link
        >
        <router-link to="/product/2" :class="{ cur: $route.params.type == 2 }"
          >净美仕滤网</router-link
        >
      </div>
      <!-- 产品列表-->
      <ul class="product_list clearfloat">
        <li v-for="(item, index) in data.data" :key="index">
          <a href=""
            ><img :src="'http://101.96.128.94:9999/mfresh/' + item.pic" alt=""
          /></a>
          <div class="pdlist_text clearfloat">
            <h3>
              <p>{{ item.model }}</p>
              <span>{{ item.title2 }}</span>
            </h3>
            <router-link :to="`/product_details/${item.pid}`">查看详情</router-link>
          </div>
        </li>
        <!--<li>-->
        <!--<a href=""><img src="product-imgs/jhq-m8088a.jpg" alt=""/></a>-->
        <!--<div class="pdlist_text clearfloat">-->
        <!--<h3>-->
        <!--<p>M-8088A</p>-->
        <!--<span>带“大脑”的空气净化器</span>-->
        <!--</h3>-->
        <!--<a href="">查看详情</a>-->
        <!--</div>-->
        <!--</li>-->
        <!--<li>-->
        <!--<a href=""><img src="product-imgs/jhq-m8088a.jpg" alt=""/></a>-->
        <!--<div class="pdlist_text clearfloat">-->
        <!--<h3>-->
        <!--<p>M-8088A</p>-->
        <!--<span>带“大脑”的空气净化器</span>-->
        <!--</h3>-->
        <!--<a href="">查看详情</a>-->
        <!--</div>-->
        <!--</li>-->
        <!--<li>-->
        <!--<a href=""><img src="product-imgs/jhq-m8088a.jpg" alt=""/></a>-->
        <!--<div class="pdlist_text clearfloat">-->
        <!--<h3>-->
        <!--<p>M-8088A</p>-->
        <!--<span>带“大脑”的空气净化器</span>-->
        <!--</h3>-->
        <!--<a href="">查看详情</a>-->
        <!--</div>-->
        <!--</li>-->
        <!--<li>-->
        <!--<a href=""><img src="product-imgs/jhq-m8088a.jpg" alt=""/></a>-->
        <!--<div class="pdlist_text clearfloat">-->
        <!--<h3>-->
        <!--<p>M-8088A</p>-->
        <!--<span>带“大脑”的空气净化器</span>-->
        <!--</h3>-->
        <!--<a href="">查看详情</a>-->
        <!--</div>-->
        <!--</li>-->
        <!--<li>-->
        <!--<a href=""><img src="product-imgs/jhq-m8088a.jpg" alt=""/></a>-->
        <!--<div class="pdlist_text clearfloat">-->
        <!--<h3>-->
        <!--<p>M-8088A</p>-->
        <!--<span>带“大脑”的空气净化器的空气净化器的空气净化器</span>-->
        <!--</h3>-->
        <!--<a href="">查看详情</a>-->
        <!--</div>-->
        <!--</li>-->
      </ul>
      <!-- 分页导航-->
      <div class="pages">
        <a @click="getData(data.pageNum - 1)" v-if="data.pageNum > 1">上一页</a>
        <a class="default" v-else>上一页</a>
        <!-- <a href="">1</a> -->
        <router-link to=""
          @click="getData(item)"
          :class="{ cur: item == data.pageNum }"
          v-for="(item, index) in data.pageCount"
          :key="index"
          >{{ item }}</router-link
        >
        <a
          @click="getData(data.pageNum + 1)"
          v-if="data.pageNum < data.pageCount"
          >下一页</a
        >
        <a class="default" v-else>下一页</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
     beforeRouteUpdate (to, from, next) {
    // 在当前路由改变，但是该组件被复用时调用
    // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
    // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
    // 可以访问组件实例 `this`
    next();
    this.getData(1);
    },
  data() {
    return {
      data: null,
    };
  },
  mounted() {
    this.getData(1);
  },
  methods: {
    getData(pno) {
      let { type } = this.$route.params;
      let url = `http://101.96.128.94:9999/mfresh/data/product_select.php?type=${type}&pageNum=${pno}`;
    //   let url = `http://101.96.128.94:9999/mfresh/data/product_select.php?type=${type}&pageNum=${pno}`;
      this.axios.get(url).then((res) => {
        console.log(res);
        this.data = res.data;
      });
    },
  },
};
</script>

<style>
.pages {
  -moz-user-select: none; /*火狐*/
  -webkit-user-select: none; /*webkit浏览器*/
  -ms-user-select: none; /*IE10*/
  -khtml-user-select: none; /*早期浏览器*/
  -o-user-select: none; /* Opera*/
  user-select: none;
}
</style>