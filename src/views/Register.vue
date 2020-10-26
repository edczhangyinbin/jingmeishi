<template>
  <div>
    <!--页面主体-->
    <div class="register">
      <h2>新用户注册</h2>
      <ul>
        <li>
          <span>邮箱：</span>
          <input
            type="text"
            id="uname"
            placeholder="请输入邮箱名"
            v-model="uname"
            @blur="doCheckUname"
          />
          <em
            class="icon_error"
            style="display: inline"
            v-if="nameStatus == 1 || nameStatus == 2 || nameStatus == 3"
          ></em>
          <em
            class="icon_ok"
            style="display: inline"
            v-if="nameStatus == 4"
          ></em>
          <i style="display: block" v-if="nameStatus == 1">请填写您的邮箱</i>
          <i style="display: block" v-if="nameStatus == 2">请输入正确的邮箱</i>
          <i style="display: block" v-if="nameStatus == 3">此邮箱已注册!</i>
        </li>
        <li>
          <span>密码：</span>
          <input
            type="password"
            id="upwd"
            placeholder="请输入密码"
            v-model="upwd1"
            @blur="doCheckPwd1"
          />
          <em
            class="icon_error"
            style="display: inline"
            v-if="upwd1Status == 1 || upwd1Status == 2"
          ></em>
          <em
            class="icon_ok"
            style="display: inline"
            v-if="upwd1Status == 3"
          ></em>
          <i style="display: block" v-if="upwd1Status == 1">请输入您的密码</i>
          <i style="display: block" v-if="upwd1Status == 2"
            >密码长度应为6~12个字符之间</i
          >
        </li>
        <li>
          <span>重复密码：</span>
          <input
            type="password"
            id="upwd2"
            placeholder="请重复输入密码"
            v-model="upwd2"
            @blur="doCheckPwd2"
          />
          <em
            class="icon_error"
            style="display: inline"
            v-if="upwd2Status2 == 1"
          ></em>
          <em
            class="icon_ok"
            style="display: inline"
            v-if="upwd2Status2 == 2"
          ></em>
          <i style="display: block" v-if="upwd2Status2 == 1"
            >两次输入的密码不一致</i
          >
        </li>
        <li>
          <span>手机号：</span>
          <input
            type="text"
            id="phone"
            placeholder="请输入手机号"
            v-model="phone"
            @blur="doCheckPhone"
          />
          <em
            class="icon_error"
            style="display: inline"
            v-if="phoneStatus == 1 || phoneStatus == 2 || phoneStatus == 3"
          ></em>
          <em
            class="icon_ok"
            style="display: inline"
            v-if="phoneStatus == 4"
          ></em>
          <i style="display: block" v-if="phoneStatus == 1">手机号不能为空</i>
          <i style="display: block" v-if="phoneStatus == 2">手机号格式不正确</i>
          <i style="display: block" v-if="phoneStatus == 3">该手机号已被占用</i>
        </li>
        <li>
          <span>验证码：</span>
          <input
            type="text"
            class="inp_yzm"
            placeholder="请输入验证码"
            v-model="code"
          />
          <img src="../assets/images/yzm.png" alt="" />
          <strong class="icon_refresh"></strong>
        </li>
        <li class="li_checkbox">
          <label>
            <input type="checkbox" v-model="agres" />
            <span>我已阅读并同意用户注册协议</span>
          </label>
        </li>
        <li class="li_btn">
          <button type="button" @click="doCheckPwd" v-if="agres">
            提交注册
          </button>
          <button type="button" class="disabled" disabled="" v-else>
            提交注册
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      uname: "",
      upwd1: "",
      upwd2: "",
      phone: "",
      code: "",
      agres: true,
      upwd1Status: 0, //人为规定 0普通 1空 2长度 3正确
      upwd2Status2: 0,
      phoneStatus: 0, //0.正确 1.空 2.格式错误 3.已注册 4.正确
      nameStatus: 0, //0正确 1空  2格式错误 3注册过 4正确
    };
  },
  methods: {
    doCheckPwd() {
      let uname = this.uname.trim();
      let upwd1 = this.upwd1.trim();
      let phone = this.phone.trim();

      // post请求特点:  参数 与 路径分离
      let url = "http://101.96.128.94:9999/mfresh/data/user_register.php";
      let params = `uname=${uname}&upwd=${upwd1}&phone=${phone}`;

      this.axios.post(url, params).then((res) => {
        console.log(res);

        let { code, uid, uname } = res.data;

        if (code == 1) {
          alert("恭喜您，注册成功！即将为您跳转到刚才的页面。");
          // 编码方式的路由跳转
          // -1代表上一页
          // https://router.vuejs.org/zh/guide/essentials/navigation.html
          // 更新vuex
          this.$store.commit("updateUser", { uid, uname });
          this.$router.go(-1);

          // 未完待续...
          // 需要使用vuex保存用户信息, 然后联动 头部组件 的右侧: 变更用户的登录状态
        } else {
          alert("很遗憾, 注册失败! 请稍后再试...");
        }
      });
    },
    doCheckPwd1() {
      let upwd = this.upwd1.trim();
      if (upwd == "") return (this.upwd1Status = 1);
      if (upwd.length < 6 || upwd.length > 12) return (this.upwd1Status = 2);
      this.upwd1Status = 3;
    },
    doCheckPwd2() {
      let upwd1 = this.upwd1.trim();
      let upwd2 = this.upwd2.trim();
      //1. 错误
      if (upwd1 != upwd2) return (this.upwd2Status2 = 1);
      // 2正确
      this.upwd2Status2 = 2;
    },
    async doCheckPhone() {
      //0.正确 1.空 2.格式错误 3.已注册 4.正确
      let phone = this.phone.trim();
      if (phone == "") return (this.phoneStatus = 1);

      //  格式判断  正则
      var myreg = /^1[3-9]\d{9}$/;
      // 如果不符合正则的格式
      if (!myreg.test(phone)) return (this.phoneStatus = 2);

      // 15555555555 手机号是已注册的
      let url =
        "http://101.96.128.94:9999/mfresh/data/user_check_phone.php?phone=" +
        phone;
      let res = await this.axios.get(url);
      console.log(res);
      // 解包里边的内容
      let { code } = res.data;
      if (code == 1) return (this.phoneStatus = 3);
      // 正确的格式方法
      this.phoneStatus = 4;
    },
    async doCheckUname() {
      //0正确 1空  2格式错误 3注册过 4正确
      let email = this.uname.trim();
      if (email == "") return (this.nameStatus = 1);

      var reg = /^[a-zA-Z0-9](\w|\-)+@[a-zA-Z0-9]+(\.[a-zA-Z]{2,4})+$/;
      if (!reg.test(email)) return (this.nameStatus = 2);

      //注册过的邮箱 xiaoxin@qq.com
      let url =
        "http://101.96.128.94:9999/mfresh/data/user_check_uname.php?uname=" +
        email;
      let res = await this.axios.get(url);

      let { code } = res.data;
      if (code == 1) return (this.nameStatus = 3);

      this.nameStatus = 4;
    },
  },
};
</script>

<style>
</style>