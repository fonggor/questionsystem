<template>
  <div class="home-container">
    <div class="image-area">
      <img src="../assets/home.jpg" alt="">
    </div>
    <p class="ready-words">准备好了吗？</p>
    <el-button type="warning" @click="start">开始答题</el-button>
  </div>
</template>

<script>
  export default {
    name: "Home",
    methods: {
      start() {
        this.$router.push('/question')
      }
    }
  }
</script>

<style scoped>
  .home-container {
    text-align: center;
  }

  .image-area {
    height: 20rem;
  }

  .image-area img {
    height: 100%;
  }

  .ready-words {
    color: #909399;
    font-size: 3.6rem;
    margin: 2rem 0;
  }
</style>