<template>
  <div class="v-content">
    <div class="v-content-wrapper">
      <div class="v-content-wrapper-row">
        <div class="v-content-wrapper-row-left">
          <t-select
            v-model="store.form.type"
            size="large"
            showArrow
            class="input"
          >
            <t-option
              v-for="item in TypeKeys"
              :key="item.value" :label="`${item.emoji} ${item.value} (${item.description})`" :value="item.value" />
          </t-select>
        </div>
        <div class="v-content-wrapper-row-right">
          <t-input
            v-model="store.form.scope"
            placeholder="影响范围（可选）"
            :clearable="true"
            size="large"
            class="input"
          >
          </t-input>
        </div>
      </div>
      <div class="v-content-wrapper-row">
        <div class="v-content-wrapper-row-left">
          <t-select
            v-model="store.form.emoji"
            size="large"
            showArrow
            class="input"
          >
            <t-option label="Emoji类型：文字" value="text" />
            <t-option label="Emoji类型：符号" value="symbol" />
          </t-select>
        </div>
        <div class="v-content-wrapper-row-right">
          <t-input
            ref="subjectInput"
            v-model="store.form.subject"
            :clearable="true"
            placeholder="简短描述（必填）"
            size="large"
            class="input"
          >
          </t-input>
        </div>
      </div>
      <div class="v-content-wrapper-row">
        <t-textarea
          v-model="store.form.body"
          :autosize="{ minRows: 4, maxRows: 4 }"
          :clearable="true"
          placeholder="详细描述（可选）"
          size="large"
          class="input"
        />
      </div>
      <div class="v-content-wrapper-row">
        <t-textarea
          v-model="store.form.footer"
          :autosize="{ minRows: 3, maxRows: 3 }"
          :clearable="true"
          placeholder="关联issue or 不兼容变动（可选）"
          size="large"
          class="input"
        />
      </div>
      <div class="v-content-wrapper-row" style="justify-content: space-between;align-items: center;">
        <t-space>
          <t-radio-group v-model="store.style" variant="primary-filled">
            <t-radio-button value="1">样式一</t-radio-button>
            <t-radio-button value="2">样式二</t-radio-button>
            <t-radio-button value="3">样式三</t-radio-button>
            <t-radio-button value="4">样式四</t-radio-button>
          </t-radio-group>
        </t-space>

        <t-space style="float: right;">
          <t-button theme="warning" @click="onReset">重置</t-button>
          <t-button theme="success" @click="copy">复制</t-button>
        </t-space>
      </div>
    </div>
    <div class="v-content-wrapper preview" style="">
      <div class="v-content-wrapper-row">
        <t-textarea
          v-model="preview"
          :autosize="{ minRows: 6, maxRows: 6 }"
          :readonly="true"
          size="large"
          class="input"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref, createVNode, nextTick, computed} from 'vue'
import { MessagePlugin } from 'tdesign-vue-next'
import { useFormStore } from '@/stores/list'
// const TypeKeys = ['feat', 'fix', 'docs', 'style', 'refactor', 'perf', 'test', 'build', 'ci', 'chore', 'revert']
const TypeKeys = [
  { label: 'feat', value: 'feat', emoji: '✨', description: '新增功能', emojiText: ':sparkles:' },
  { label: 'fix', value: 'fix', emoji: '🐛', description: '修复 bug', emojiText: ':bug:' },
  { label: 'docs', value: 'docs', emoji: '📝', description: '文档变更', emojiText: ':memo:' },
  { label: 'style', value: 'style', emoji: '🎨', description: '代码格式', emojiText: ':art:' },
  { label: 'refactor', value: 'refactor', emoji: '♻️', description: '重构代码', emojiText: ':recycle:' },
  { label: 'perf', value: 'perf', emoji: '⚡️', description: '性能优化', emojiText: ':zap:' },
  { label: 'test', value: 'test', emoji: '✅', description: '测试', emojiText: ':white_check_mark:' },
  { label: 'build', value: 'build', emoji: '🚀', description: '构建', emojiText: ':rocket:' },
  { label: 'ci', value: 'ci', emoji: '👷', description: '持续集成', emojiText: ':construction_worker:' },
  { label: 'chore', value: 'chore', emoji: '🗯', description: '其他', emojiText: ':speech_balloon:' },
  { label: 'revert', value: 'revert', emoji: '⏪️', description: '回滚', emojiText: ':rewind:' },
]
const subjectInput: any = ref(null)

const store = useFormStore()
store.$subscribe(() => {
  store.saveToLocalStorage()
})
const preview = computed(() => {
  const { type, scope, emoji: emojiType, subject, body, footer } = store.form
  let typeItem = TypeKeys.find((item) => item.value === type) || { emoji: '', emojiText: '' }
  const emoji =
    (typeItem &&
      (emojiType === 'symbol' ? typeItem.emoji : `${typeItem.emojiText}`)) ||
    ''
  let header = ''
  switch (store.style) {
    case '1':
    default:
      header = `${emoji} ${type}${scope ? '(' + scope + ')' : ''}:`
      break
    case '2':
      header = `${type}${scope ? '(' + scope + ')' : ''}:`
      break
    case '3':
      header =
        emojiType === 'symbol'
          ? `${emoji}${scope ? '(' + scope + '):' : ''}`
          : `${emoji}${scope ? ' (' + scope + '):' : ''}`
      break
    case '4':
      header = `${type}${scope ? '(' + scope + ')' : ''}: ${emoji}`
      break
  }
  return `${header} ${subject}${body ? '\n\n' + body : '' }${footer ? '\n\n' + footer : ''}`
})
const onReset = () => {
  store.clear()
}

const copy = () => {
  const { subject } = store.form
  if (!subject) {
    MessagePlugin.closeAll()
    MessagePlugin.error('请填写简短描述')
    subjectInput.value.focus()
    return
  }
  // 创建一个新的textarea元素，设置文本并添加到页面中
  var textArea = document.createElement('textarea')
  textArea.value = preview.value
  document.body.appendChild(textArea)
  // 选中textarea中的文本
  textArea.select()
  // 将文本复制到剪贴板
  document.execCommand('copy')
  // 删除textarea元素
  document.body.removeChild(textArea)

  MessagePlugin.success('复制成功')
  store.clear(false)
  subjectInput.value.focus()
  if (location.protocol === 'chrome-extension:') {
    setTimeout(() => {
      window.close()
    }, 110)
  }
}
// 监听Ctrl+C键
document.addEventListener('keydown', function (event) {
  // 如果按下Ctrl+C键
  if (event.ctrlKey && event.keyCode == 67) {
    copy()
  }
})

</script>

<style scoped lang="less">
.v-content {
  //height: calc(100vh - 100px);

  &-wrapper {
    display: block;
    background: rgba(245,245,245,.1);
    padding: 20px;
    box-shadow: 1px 2px 7px #0000006b;
    border-radius: 6px;
    &.preview {
      margin-top: 20px
    }
    &-row {
      display: flex;
      vertical-align: top;
      margin-bottom: 10px;
      &:last-of-type {
        margin-bottom: 0;
      }
      &-left {
        width: 32%;
        display: inline-block;
        vertical-align: top;
        margin-right: 6px;
      }
      &-right {
        flex: 1;
        display: inline-block;
        vertical-align: top;
      }
    }
  }
}
</style>

<style lang="less">
.home.chrome-extension {
  .v-content {
    &-wrapper {
      padding: 10px;
      border-radius: 0 0 6px 6px;

      &:last-of-type {
        border-radius: 6px 6px 0 0;
      }

      &.preview {
        margin-top: 10px
      }
      &-row {
        margin-bottom: 10px;
        &:last-of-type {
          margin-bottom: 0;
        }
      }
    }
  }
}
</style>
