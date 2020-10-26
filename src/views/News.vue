<template>
  <div>
    <!-- news.html 12-40 -->
    <!--面包屑导航-->
    <div class="breadcrumb">
      <div class="container">
        <h2><a href="">首页</a>&gt;<a href="">公司动态</a></h2>
      </div>
    </div>
    <!--页面主体-->
    <!-- 请求数据在使用时, 要判断存在再用 -->
    <div class="main container" v-if="data">
      <div class="news">
        <ul>
          <li v-for="(item, index) in data.data" :key="index">
            <span>{{ item.pubTime | date }}</span>
            <router-link :to="`/newsdetails/${item.nid}`">{{ item.title }}</router-link>
          </li>
          <!--<li><span>2016-02-21</span><a href="">净美仕新风净化系统　助力校园新风行动</a></li>-->
          <!--<li><span>2016-02-21</span><a href="">全国新风行动全面启动 助推净美仕战略升级</a></li>-->
          <!--<li><span>2016-02-21</span><a href="">智能空气净化器翻盘：净美仕能否领衔?</a></li>-->
        </ul>
      </div>
      <!-- 分页导航-->
      <div class="pages">
        <a @click="getData(data.pageNum - 1)" class="" v-if="data.pageNum > 1"
          >上一页</a
        >
        <a class="default" v-else>上一页</a>
        <!-- <a href="" class="cur">1</a> -->

        <!-- 动态样式:  :class="{样式类: true/false}" -->
        <a 
          @click="getData(item)"
          v-for="(item, index) in data.pageCount"
          :key="index"
          :class="{ cur: data.pageNum == item }"
        >
          {{ item }}
        </a>
        <!--<a href="">3</a>-->
        <!--<a href="">4</a>-->
        <!--<a href="">5</a>-->
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
  data() {
    return {
      data: null,
    };
  },
  mounted() {
    // 挂载周期中,应该只是调用方法, 不要写太多代码
    this.getData(1);
  },
  methods: {
    getData(pno) {
      let url =
        "http://101.96.128.94:9999/mfresh/data/news_select.php?pageNum=" + pno;

      this.axios.get(url).then((res) => {
        // console.log(res);
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
