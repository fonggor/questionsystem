<template>
  <div class="score-container">
    <div class="image-area">
      <img src="../assets/fullscore.gif" alt="" v-show="fullFlag">
      <img src="../assets/halfscore.png" alt="" v-show="halfFlag">
      <img src="../assets/cryscore.png" alt="" v-show="cryFlag">
    </div>
    <p class="score-show" ref="score">得分：{{score}}</p>
    <el-button type="primary" @click="backToHome">重新答题</el-button>
  </div>
</template>

<script>
  export default {
    name: "Score",
    data() {
      return {
        score: this.$store.state.score,
        fullFlag: false,
        halfFlag: false,
        cryFlag: false,
      }
    },
    methods: {
      backToHome() {
        this.$store.commit('resetStore')
        this.$router.push('/')
      }
    },
    mounted() {
      if (this.score === 100) {
        this.fullFlag = true
        this.halfFlag = false
        this.cryFlag = false
        this.$refs.score.className = 'score-show green'
      } else if (this.score < 100 && this.score >= 50) {
        this.fullFlag = false
        this.halfFlag = true
        this.cryFlag = false
        this.$refs.score.className = 'score-show yellow'
      } else {
        this.fullFlag = false
        this.halfFlag = false
        this.cryFlag = true
        this.$refs.score.className = 'score-show red'
      }
    }
  }
</script>

<style scoped>
  .score-container {
    text-align: center;
  }

  .image-area {
    height: 20rem;
  }

  .image-area img {
    height: 100%;
  }

  .score-show {
    font-size: 3.6rem;
    margin: 2rem 0;
  }

  .red {
    color: #F56C6C;
  }

  .yellow {
    color: #E6A23C
  }

  .green {
    color: #67C23A;
  }
</style>