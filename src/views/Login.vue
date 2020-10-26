<template>
  <div>
    <!--页面主体-->
    <div class="login_box">
      <div class="container">
        <div class="login">
          <h2>用户登录</h2>
          <dl class="clearfloat">
            <dt>
              <span
                class="tips"
                id="uname_prompt_text"
                style="display: block"
                v-if="nameStatus == 1"
                >用户名不能为空</span
              >
              <span
                class="tips"
                id="uname_prompt_text"
                style="display: block"
                v-if="loginStatus == 1"
                >用户名或密码不正确</span
              >
              用户名：
            </dt>
            <dd>
              <input
                type="text"
                id="uname"
                placeholder="邮箱/手机号"
                @blur="doCheckName"
                v-model="uname"
              />
              <em class="icon_user"></em>
              <i
                class="icon_error"
                id="uname_prompt_icon"
                style="display: block"
                v-if="nameStatus == 1"
              ></i>
            </dd>
          </dl>
          <dl>
            <dt>
              <span class="tips" id="pwd_prompt_text">请输入密码</span>密码：
            </dt>
            <dd>
              <input
                type="password"
                id="pwd"
                placeholder="密码"
                @blur="doCheckPwd"
                v-model="upwd"
              />
              <em class="icon_user"></em>
              <i
                class="icon_error"
                id="uname_prompt_icon"
                style="display: block"
                v-if="upwdStatus == 1"
              ></i>
            </dd>
          </dl>
          <p>
            <label>
              <input type="checkbox" />
              <span>自动登录</span>
            </label>
          </p>
          <button type="button" id="login" @click="doLogin">立 即 登 录</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      uname: "",
      upwd: "",
      nameStatus: 0,
      upwdStatus: 0,
      loginStatus: 0, //0普通 1错误
    };
  },
  methods: {
    doCheckName() {
      let uname = this.uname.trim();
      if (uname == "") {
        this.nameStatus = 1;
      } else {
        this.nameStatus = 0;
      }
    },
    doCheckPwd() {
      let upwd = this.upwd.trim();
      if (upwd == "") {
        this.upwdStatus = 1;
      } else {
        this.upwdStatus = 0;
      }
    },
    doLogin() {
      let uname = this.uname.trim();
      let upwd = this.upwd.trim();

      let url = "http://101.96.128.94:9999/mfresh/data/user_login.php";
      let params = `unameOrPhone=${uname}&upwd=${upwd}`;

      this.axios.post(url, params).then((res) => {
        console.log(res);
        let { code } = res.data;
        if (code == 400) {
          this.loginSatus = 1;
        } else {
          // 更新vuex 中的数据:  commit(方法名, 值)
          // 其中方法名是在 store/index.js  的 mutations 中声明
          this.$store.commit("updateUser", {
            uid: res.data.uid,
            uname: res.data.uname,
          });
          this.$router.replace("/");
        }
      });
    },
  },
};
</script>

<style>
</style>