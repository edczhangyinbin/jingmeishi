<template>
  <div>
    <Header class="header_box"/>
    <!--特使的  配合路由使用的标签  实际运行时  会根据路由替换成对应的组件  -->
    <router-view />
    <Footer class="footer"/>
  </div>
</template>
<script>
import Header from "./components/Header"
import Footer from './components/Footer'
export default {
  // 
  components:{
    Header,
    Footer,
  }
}
</script>

<style>
  @import './assets/css/common.css';
  @import './assets/css/mycss.css';
</style>
