<template>
  <div id="app">
    <div class="page-container">
      <!-- 顶部 -->
      <div class="header">
        <!-- 欢迎界面 -->
        <div class="welcome-area" v-show="homeFlag">
          <span class="el-icon-star-on"></span>
          <span class="el-icon-star-on"></span>
          <span>欢迎使用答题demo</span>
          <span class="el-icon-star-on"></span>
          <span class="el-icon-star-on"></span>
        </div>

        <!-- 退出按钮 -->
        <div class="back-area" v-show="backFlag" @click="backToHome">
          &nbsp;<span class="el-icon-back"></span>&nbsp;
          <span>退出答题</span>
        </div>

        <!-- 评分界面 -->
        <div class="score-area" v-show="scoreFlag">
          <span class="el-icon-star-on"></span>
          <span class="el-icon-star-on"></span>
          <span>答题完毕，欢迎再次使用</span>
          <span class="el-icon-star-on"></span>
          <span class="el-icon-star-on"></span>
        </div>

      </div>
      <!-- 中间答题区域 -->
      <div class="question-area">
        <transition name="el-fade-in-linear" mode="out-in">
          <router-view></router-view>
        </transition>
      </div>

      <div class="footer"></div>
    </div>
  </div>
</template>

<script>

  export default {
    name: 'app',
    data() {
      return {
        homeFlag: true,
        backFlag: false,
        scoreFlag: false
      }
    },
    methods: {
      backToHome() {
        this.$store.commit('resetStore')
        this.$router.push('/')
      },
    },
    created() {
      //在页面加载时读取sessionStorage里的状态信息
      if (sessionStorage.getItem("store")) {
        this.$store.replaceState(Object.assign({}, this.$store.state, JSON.parse(sessionStorage.getItem("store"))))
      }
      //在页面刷新时将vuex里的信息保存到sessionStorage里
      window.addEventListener("beforeunload", () => {
        sessionStorage.setItem("store", JSON.stringify(this.$store.state))
      })
    },
    mounted() {
      if (this.$route.path === '/') {
        this.homeFlag = true
        this.backFlag = false
        this.scoreFlag = false
      } else if (this.$route.path === '/question') {
        this.homeFlag = false
        this.backFlag = true
        this.scoreFlag = false
      } else if (this.$route.path === '/score') {
        this.homeFlag = false
        this.backFlag = false
        this.scoreFlag = true
      }
    },
    watch: {
      $route: {
        handler: function (val, oldVal) {
          if (val.fullPath === '/') {
            this.homeFlag = true
            this.backFlag = false
            this.scoreFlag = false
          } else if (val.fullPath === '/question') {
            this.homeFlag = false
            this.backFlag = true
            this.scoreFlag = false
          } else if (val.fullPath === '/score') {
            this.homeFlag = false
            this.backFlag = false
            this.scoreFlag = true
          }

        },
        // 深度观察监听
        deep: true
      }
    }

  }
</script>

<style>
  [v-cloak] { /*解决第一次进入页面时出现代码等待渲染的情况*/
    display: none !important;
  }

  * {
    margin: 0;
    padding: 0;
  }

  body {
    overflow-y: auto;
    overflow-x: hidden;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none
  }

  html, body {
    font-size: 62.5%;
    max-width: 720px;
    height: 100%;
    margin: 0 auto;
  }

  #app, .page-container {
    height: 100%;
    width: 100%;
  }

  .page-container {
    display: flex;
    flex-direction: column;
  }

  .question-area {
    padding: 0 1rem;
    flex: 1;
  }

  .header {
    height: 5.0rem;
    line-height: 5.0rem;
    background-color: #3D444C;
    color: #ffffff;
    font-size: 1.6rem;
  }

  .welcome-area, .score-area {
    text-align: center;
  }

  .back-area {
    width: 10rem;
    cursor: pointer;
  }

  .footer {
    height: 5rem;
    line-height: 5rem;
    background-color: #3D444C;
  }
</style>
