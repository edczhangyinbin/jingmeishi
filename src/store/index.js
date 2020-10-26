import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 用sessionStorage来长期存储数据  直到关闭浏览器或者手动清除
    // getItem()方法返回指定的Storage Object项的值
    // setItem()方法设置指定的存储对象项的值
    uid:sessionStorage.getItem('uid'),
    uname:sessionStorage.getItem('uname'),
    checkNum:0
    
  },
   // 操作 state的相关方法, state 只有通过这里的方法才能进行修改
  mutations: {
    updateCheckNum(state, args) {
      state.checkNum = args.checkNum;
    },
    updateUser(state,args){
      state.uid = args.uid;
      state.uname = args.uname;

      // 数据持久化, 防止刷新时数据消失
      // null 会转为 'null', 则会出现错误!
        // setItem()方法设置指定的存储对象项的值
      sessionStorage.setItem("uid", args.uid === null ? "" : args.uid);
      sessionStorage.setItem("uname", args.uname === null ? "" : args.uname);
    }
  },
  actions: {
  },
  modules: {
  }
})
