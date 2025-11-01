<template>
  <div class="chat-container">
    <div class="chat-header">
      <h3>问答窗口</h3>
    </div>
    <div class="chat-messages" ref="messagesContainer" @scroll="handleScroll">
      <div
        v-for="(item, index) in conversationHistory"
        :key="index"
        :class="[
          'message-item',
          item.type === 'question' ? 'question' : 'answer'
        ]"
      >
        <div class="message-content">
          <template v-if="item.type === 'question'">
            {{ item.text }}
            <div class="options" v-if="!item.answered">
              <button @click="handleAnswer(true, index)" class="btn btn-yes">是</button>
              <button @click="handleAnswer(false, index)" class="btn btn-no">否</button>
            </div>
          </template>
          <template v-else>
            {{ item.text }}
          </template>
        </div>
      </div>
      
      <!-- 结果按钮 -->
      <div v-if="showResultButtons" class="result-buttons">
        <button v-if="hasAnyYes" @click="handleFinish" class="btn btn-finish">结束</button>
        <button v-else @click="handleRetry" class="btn btn-retry">重答</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'QAApp',
  data() {
    return {
      questions: [
        '您是否喜欢编程？',
        '您是否使用过Vue框架？',
        '您是否想继续学习前端开发？'
      ],
      conversationHistory: [],
      currentQuestionIndex: 0,
      showResultButtons: false,
      hasAnyYes: false,
      autoScroll: true // 控制是否自动滚动到最新消息
    }
  },
  mounted() {
    this.startNewSession()
  },
  methods: {
    startNewSession() {
      // 重置状态
      this.currentQuestionIndex = 0
      this.showResultButtons = false
      
      // 添加第一个问题
      this.addQuestion()
    },
    
    addQuestion() {
      if (this.currentQuestionIndex < this.questions.length) {
        const question = this.questions[this.currentQuestionIndex]
        this.conversationHistory.push({
          type: 'question',
          text: question,
          answered: false,
          answer: null
        })
        
        // 自动滚动到底部
        this.$nextTick(() => {
          this.scrollToBottom()
        })
      }
    },
    
    handleAnswer(answer, questionIndex) {
      // 更新问题状态
      const question = this.conversationHistory[questionIndex]
      question.answered = true
      question.answer = answer
      
      // 添加回答到历史记录
      this.conversationHistory.push({
        type: 'answer',
        text: answer ? '是' : '否'
      })
      
      // 检查是否有任意一个回答是"是"
      if (answer) {
        this.hasAnyYes = true
      }
      
      // 继续下一个问题
      this.currentQuestionIndex++
      
      if (this.currentQuestionIndex < this.questions.length) {
        // 延迟添加下一个问题，让用户有时间看到当前回答
        setTimeout(() => {
          this.addQuestion()
        }, 300)
      } else {
        // 所有问题都已回答，显示结果按钮
        this.showResultButtons = true
        this.$nextTick(() => {
          this.scrollToBottom()
        })
      }
    },
    
    handleFinish() {
      // 结束问答
      this.showResultButtons = false
    },
    
    handleRetry() {
      // 重答，不清除历史数据
      this.currentQuestionIndex = 0
      this.showResultButtons = false
      
      // 添加新的问题
      setTimeout(() => {
        this.addQuestion()
      }, 300)
    },
    
    scrollToBottom() {
      if (this.autoScroll && this.$refs.messagesContainer) {
        const container = this.$refs.messagesContainer
        container.scrollTop = container.scrollHeight
      }
    },
    
    handleScroll() {
      if (!this.$refs.messagesContainer) return
      
      const container = this.$refs.messagesContainer
      const { scrollTop, scrollHeight, clientHeight } = container
      
      // 如果用户手动滚动到了顶部，停止自动滚动
      this.autoScroll = scrollHeight - scrollTop - clientHeight < 100
    }
  }
}
</script>

<style scoped>
.chat-container {
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  border-radius: 8px;
  box-shadow: 0 2px 10px var(--shadow);
  overflow: hidden;
  font-family: Arial, sans-serif;
  background-color: var(--chat-container-bg);
  transition: background-color 0.3s ease;
}

.chat-header {
  background-color: var(--header-bg);
  color: var(--header-text);
  padding: 15px 20px;
  text-align: center;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.chat-header h3 {
  margin: 0;
  font-size: 18px;
}

.chat-messages {
  height: 400px;
  overflow-y: auto;
  padding: 20px;
  background-color: var(--chat-bg);
  display: flex;
  flex-direction: column;
  gap: 15px;
  transition: background-color 0.3s ease;
}

.message-item {
  display: flex;
  margin-bottom: 15px;
}

.message-item.question {
  justify-content: flex-start;
}

.message-item.answer {
  justify-content: flex-end;
}

.message-content {
  max-width: 70%;
  padding: 12px 16px;
  border-radius: 18px;
  word-wrap: break-word;
  position: relative;
  color: var(--text-color);
  transition: background-color 0.3s ease, color 0.3s ease;
}

.message-item.question .message-content {
  background-color: var(--question-bg);
  border-bottom-left-radius: 4px;
}

.message-item.answer .message-content {
  background-color: var(--answer-bg);
  border-bottom-right-radius: 4px;
}

.options {
  display: flex;
  gap: 10px;
  margin-top: 10px;
}

.btn {
  padding: 8px 16px;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s ease;
}

.btn-yes {
  background-color: var(--button-yes);
  color: white;
}

.btn-yes:hover {
  background-color: rgb(56, 142, 60);
}

.btn-no {
  background-color: var(--button-no);
  color: white;
}

.btn-no:hover {
  background-color: rgb(211, 47, 47);
}

.result-buttons {
  display: flex;
  justify-content: center;
  margin-top: 20px;
  gap: 20px;
}

.btn-finish {
  background-color: var(--button-finish);
  color: white;
}

.btn-finish:hover {
  background-color: rgb(21, 101, 192);
}

.btn-retry {
  background-color: var(--button-retry);
  color: white;
}

.btn-retry:hover {
  background-color: rgb(245, 124, 0);
}

/* 滚动条样式 */
.chat-messages::-webkit-scrollbar {
  width: 6px;
}

.chat-messages::-webkit-scrollbar-track {
  background: var(--chat-bg);
  border-radius: 3px;
}

.chat-messages::-webkit-scrollbar-thumb {
  background: var(--shadow);
  border-radius: 3px;
}

.chat-messages::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.2);
}
</style>