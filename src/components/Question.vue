<template>
  <div class="question-container">
    <!--<p>question + {{questionID}}</p>-->
    <!-- 题目目录 -->
    <div class="tag-group" ref="tags">
      <el-tag type="primary" effect="plain" v-for="index in subjects.length" style="cursor: pointer"
              @click="goToQues(index)">
        {{index}}
      </el-tag>
    </div>
    <!--答题内容区域-->
    <el-card class="box-card" v-for="(subject,questionIndex) in subjects" :key="subject.id"
             v-show="questionIndex===questionID">
      <!-- 题目内容 -->
      <div slot="header" class="clearfix">
        <span class="ques-head">题目{{questionIndex + 1}}：{{subject.question}}</span>
      </div>
      <!-- 题目选项 -->
      <div v-for="(answer,choiceIndex) in subject.answer" :key="choiceIndex" class="input-text"
           @click="getChoice(questionIndex,choiceIndex)">
        <input type="radio" :id="questionIndex" :name="'ques'+questionIndex" :checked="checkedID === choiceIndex">
        <span>{{choiceIndex | numToChoice}}&nbsp;{{answer}}</span>
      </div>

    </el-card>
    <!-- 答题进度条 -->
    <div class="progress-area">
      <el-progress :text-inside="true" :stroke-width="14" :percentage="progressPercent"
                   :status="progressStyle"></el-progress>
    </div>


    <!-- 功能按钮 -->
    <div class="buttons-group">
      <el-button type="primary" @click="prevSubject">上一题</el-button>
      <el-button type="primary" @click="nextSubject">下一题</el-button>
      <el-button type="primary" @click="submitAll">提交</el-button>
    </div>


  </div>
</template>

<script>
  export default {
    name: "Question",
    data() {
      return {
        questionID: 0,  //问题的索引值，默认显示第一题
        checkedID: -1,  //选项的索引值，未选择时为-1
        progressPercent: 0,
        progressStyle: 'warning',
        subjects: [
          {
            id: 0,
            question: '江苏的省会城市是哪个？',
            answer: ['南京', '广州', '杭州'],
            rightAnswer: '南京'
          },
          {
            id: 1,
            question: '南瓜和菠萝砸头，哪个疼些？',
            answer: ['南瓜', '菠萝', '头'],
            rightAnswer: '头'
          },
          {
            id: 2,
            question: '什么瓜不能吃？',
            answer: ['地瓜', '香瓜', '冬瓜', '傻瓜'],
            rightAnswer: '傻瓜'
          },
          {
            id: 3,
            question: '中国程序员日是几月几日？',
            answer: ['1月24日', '10月24日', '4月4日'],
            rightAnswer: '10月24日'
          },
        ]
      }
    },
    methods: {
      //点击下一题触发
      nextSubject() {
        //判断是否是最后一题
        if (this.questionID === this.subjects.length - 1) {
          this.questionID = this.subjects.length - 1
          this.$message({
            message: '已经是最后一题，确认无误可以点击提交',
            center: true,
            type: 'warning',
            showClose: true,
            duration: 1000
          })
        } else {
          this.questionID += 1
        }
        this.checkedID = -1
        this.showChoice(this.questionID)
      },
      //点击上一题触发
      prevSubject() {
        //判断是否是第一题
        if (this.questionID === 0) {
          this.questionID = 0
          this.$message({
            message: '已经是第一题',
            center: true,
            type: 'warning',
            showClose: true,
            duration: 1000
          })
        } else {
          this.questionID -= 1
        }
        this.checkedID = -1
        this.showChoice(this.questionID)
      },
      //每次点击选项都触发，获取题号和选项，并放到store中保存
      getChoice(quesIndex, choiceIndex) {
        var correctness = false
        this.subjects.forEach(item => {
          if (item.id === quesIndex) {
            if (item.answer[choiceIndex] === item.rightAnswer) {
              correctness = true
            }
          }
        })
        var choice = {
          quesIndex: quesIndex,
          choiceIndex: choiceIndex,
          correctness: correctness
        }
        this.checkedID = choiceIndex
        this.$refs.tags.children[quesIndex].className = 'el-tag el-tag--primary el-tag--dark'
        this.$store.commit('updateRecord', choice)
        this.changeProgress()
      },
      //每次显示题目的同时获取该题目已选择哪一项并显示
      showChoice(id) {
        var choices = this.$store.state.choices
        var choice = -1
        choices.forEach(item => {
          if (item.quesIndex === id) {
            choice = item.choiceIndex
          }
        })
        this.checkedID = choice
      },
      //更新进度条长度
      changeProgress() {
        var storeLen = this.$store.state.choices.length
        var subjectsLen = this.subjects.length
        this.progressPercent = Math.floor(storeLen / subjectsLen * 100)
        if (this.progressPercent === 100) {
          this.progressStyle = 'success'
        }
      },
      goToQues(index) {
        this.questionID = index - 1
        this.showChoice(this.questionID)
      },
      //提交并评分
      submitAll() {
        //判断是否还有未选择的题目
        var storeLen = this.$store.state.choices.length
        var subjectsLen = this.subjects.length
        if (storeLen < subjectsLen) {
          this.$message({
            message: '提交失败，请完成所有题目再提交',
            center: true,
            type: 'error',
            showClose: true,
            duration: 2000
          })
        } else {
          this.$message({
            message: '提交成功',
            center: true,
            type: 'success',
            showClose: true,
            duration: 1500
          })
          this.$store.commit('getScore')
          this.$router.push('/score')
        }
      },
    },
    mounted() {
      this.$store.state.scorePerQues = Math.floor(100 / this.subjects.length)
      this.showChoice(this.questionID)
      var choices = this.$store.state.choices
      choices.forEach(item => {
        this.$refs.tags.children[item.quesIndex].className = 'el-tag el-tag--primary el-tag--dark'
      })
      this.changeProgress()
    },
    filters: {
      //将选项的索引值转化为ABCD...的选项
      numToChoice(num) {
        return String.fromCharCode(num + 65)
      }
    }
  }
</script>

<style scoped>
  .tag-group {
    margin: 1rem 0;
    display: flex;
    justify-content: left;
    flex-wrap: wrap;
  }

  .el-tag {
    width: 3rem;
    margin: 0 .8rem .8rem 0;
  }

  .el-card {
    min-height: 30rem;
  }

  .ques-head {
    font-size: 1.6rem;
  }

  .input-text {
    height: 3rem;
    line-height: 3rem;
    font-size: 1.4rem;
    margin: 1rem 0;
  }


  .input-text input {
    margin-right: 1rem;
  }

  /*自定义单选框样式*/
  input[type="radio"] {
    opacity: 0;
  }

  input[type="radio"] + span {
    position: relative;
  }

  input[type="radio"] + span::before {
    content: '';
    position: absolute;
    left: -2.4rem;
    top: .1rem;
    border-radius: 50%;
    width: 1.6rem;
    height: 1.6rem;
    border: .1rem solid #999;
  }

  input[type="radio"] + span::after {
    content: '';
    position: absolute;
    left: -2rem;
    top: .5rem;
    border-radius: 50%;
    width: 1rem;
    height: 1rem;
  }

  input[type="radio"]:checked + span::before {
    border: .1rem solid #409EFF;
  }

  input[type="radio"]:checked + span::after {
    background: #409EFF;
  }

  /*自定义单选框样式结束*/

  .progress-area {
    margin: 1rem 0;
  }

  .buttons-group {
    text-align: right;
  }

  .buttons-group button {
    width: 9rem;
  }

</style>