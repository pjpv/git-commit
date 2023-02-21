<template>
  <div class="v-content">
    <div class="v-content-wrapper">
      <!-- type & scope -->
      <div class="v-content-wrapper-row">
        <div class="v-content-wrapper-row-left">
          <t-select
            v-model="store.form.type"
            filterable
            size="large"
            showArrow
            class="input"
            @change="onChangeType"
          >
            <t-option
              v-for="item in TypeKeys"
              :key="item.value"
              :label="`${item.emoji} ${item.value} (${item.description})`"
              :value="item.value"
            />
          </t-select>
        </div>
        <div class="v-content-wrapper-row-right">
          <!--<t-input-->
          <!--  v-model="store.form.scope"-->
          <!--  placeholder="影響範圍（可選）"-->
          <!--  :clearable="true"-->
          <!--  size="large"-->
          <!--  class="input"-->
          <!--&gt;-->
          <!--</t-input>-->
          <t-auto-complete
            v-model="store.form.scope"
            :options="scopeOptions"
            :popup-props="{ overlayClassName: 't-scope-autocomplete-option-list' }"
            clearable
            size="large"
            placeholder="影響範圍（可選）"
          >
            <template #option="{ option }">
              <div class="form-scope-option">
                <small class="form-scope-option-text">{{ option.text }}</small>
                <CloseCircleFilledIcon class="form-scope-option-btn" name="close" @click="(e) => onDelete(e, option)" />
              </div>
            </template>
            <template v-if="scopeOptions.length" #panelBottomContent>
              <t-button variant="text" style="width: 100%;margin: 4px 0;" @click="onClearScopeHistory">清空</t-button>
            </template>
          </t-auto-complete>
        </div>
      </div>
      <!-- subject -->
      <div class="v-content-wrapper-row">
        <!--<div class="v-content-wrapper-row-left">-->
        <!--  <t-select-->
        <!--    v-model="store.form.emoji"-->
        <!--    size="large"-->
        <!--    showArrow-->
        <!--    class="input"-->
        <!--  >-->
        <!--    <t-option label="Emoji类型：文字" value="text" />-->
        <!--    <t-option label="Emoji类型：符号" value="symbol" />-->
        <!--  </t-select>-->
        <!--</div>-->
        <div class="v-content-wrapper-row-right">
          <t-input
            ref="subjectInput"
            v-model="store.form.subject"
            :clearable="true"
            :placeholder="`簡短描述（必填）\t\t` + subjectPlaceholder"
            size="large"
            class="input"
          >
          </t-input>
        </div>
      </div>
      <!-- body -->
      <div class="v-content-wrapper-row">
        <t-textarea
          v-model="store.form.body"
          :autosize="{ minRows: 4, maxRows: 4 }"
          :clearable="true"
          placeholder="詳細描述（可選）"
          size="large"
          class="input"
        />
      </div>
      <!-- footer -->
      <div class="v-content-wrapper-row">
        <t-textarea
          v-model="store.form.footer"
          :autosize="{ minRows: 3, maxRows: 3 }"
          :clearable="true"
          placeholder="禪道 #1234（可選）"
          size="large"
          class="input"
        />
      </div>
      <div
        class="v-content-wrapper-row"
        style="justify-content: space-between; align-items: center"
      >
        <t-space>
          <!--<t-radio-group v-model="store.style" variant="primary-filled">-->
          <!--  <t-radio-button value="1">样式一</t-radio-button>-->
          <!--  <t-radio-button value="2">样式二</t-radio-button>-->
          <!--  <t-radio-button value="3">样式三</t-radio-button>-->
          <!--  <t-radio-button value="4">样式四</t-radio-button>-->
          <!--</t-radio-group>-->
          <t-checkbox
            v-if="inExtension"
            v-model="store.autoClose"
            label="複製後關閉"
            class="checkbox"
          />
          <t-checkbox
            v-model="store.copyClear"
            label="複製後清空"
            class="checkbox"
          />
          <t-input
            ref="keyboardInput"
            :value="shortcutKey.text"
            :clearable="false"
            :disabled="!editShortcutKey"
            readonly
            auto-width
            placeholder="自定义快捷键"
            size="small"
            class="input keyboardInput"
            style="max-width: 190px;"
          >
            <template #suffix>
              <t-button :class="{ editShortcutBtn: true, hide: !editShortcutKey }" variant="text" @click="onClickShortcutKey">{{ editShortcutKey ? '保存' : '修改' }}</t-button>
            </template>
          </t-input>
        </t-space>

        <t-space style="float: right">
          <t-button theme="warning" @click="onReset">重置</t-button>
          <t-button theme="success" @click="copy">複製</t-button>
        </t-space>
      </div>
    </div>
    <!-- Preview -->
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
import { ref, toRefs, createVNode, nextTick, computed, onMounted } from 'vue'
import { MessagePlugin } from 'tdesign-vue-next'
import { CloseCircleFilledIcon, HelpCircleFilledIcon } from 'tdesign-icons-vue-next';
import { useFormStore } from '@/stores/list'
import {HistoryItem, useHistoryStore} from '@/stores/history'
// const TypeKeys = ['feat', 'fix', 'docs', 'style', 'refactor', 'perf', 'test', 'build', 'ci', 'chore', 'revert']
const TypeKeys = [
  { label: 'fix', value: 'fix', emoji: '🐛', description: '修復 bug', emojiText: ':bug:', default: '修復', placeholder: '修復模塊A-功能B的問題' },
  { label: 'feat',value: 'feat', emoji: '✨', description: '新功能/新特性', emojiText: ':sparkles:', default: '新增', placeholder: '新增模塊A 功能B' },
  { label: 'style', value: 'style', emoji: '💄', description: '樣式相關', emojiText: ':lipstick:', default: '調整', placeholder: '調整頁面A的樣式' },
  { label: 'docs', value: 'docs', emoji: '📝', description: '文檔變更', emojiText: ':memo:', default: '', placeholder: '更新模塊A-功能B的文檔' },
  { label: 'chore', value: 'chore', emoji: '🔧', description: '不影響代碼的其他變動', emojiText: ':wrench:', default: '', placeholder: '格式化代碼、删除未使用的代碼或文件' },
  { label: 'build', value: 'build', emoji: '🚀', description: '构建系統或外部依賴更改', emojiText: ':rocket:', default: '', placeholder: '修復某個構建步驟出現的錯誤' },
  { label: 'refactor', value: 'refactor', emoji: '♻️', description: '重構代碼/代码格式化', emojiText: ':recycle:', default: '重構', placeholder: '重構某些代碼邏輯，提升了效能' },
  { label: 'perf', value: 'perf', emoji: '⚡️', description: '優化性能', emojiText: ':zap:', default: '優化', placeholder: '優化功能模塊3的效能表現' },
  { label: 'test', value: 'test', emoji: '✅', description: '增加或更新測試', emojiText: ':white_check_mark:', default: '', placeholder: '添加功能模塊2的自動化測試用例' },
  { label: 'ci', value: 'ci', emoji: '👷', description: 'CI配置或腳本變動', emojiText: ':construction_worker:', default: '', placeholder: '更新 CI/CD 流程' },
  { label: 'revert', value: 'revert', emoji: '⏪️', description: '回退之前的版本', emojiText: ':rewind:', default: '回滾', placeholder: '撤銷上一次提交，恢復了功能模塊4的狀態' },
]
const subjectInput: any = ref(null)
const keyboardInput: any = ref(null)
const editShortcutKey = ref(false)
const subjectPlaceholder = computed(() => {
  const { type, emoji: emojiType } = store.form
  let { placeholder } = TypeKeys.find((item) => item.value === type) || {
    placeholder: '',
  }
  return placeholder && '(e.g.) ' + placeholder || ''
})

onMounted(() => {
  keyboardInput.value?.$el?.querySelector('input').classList.add('shortcut-input')
})

const inExtension = ref(location.protocol === 'chrome-extension:')
const store = useFormStore()
store.$subscribe(() => {
  store.saveToLocalStorage()
})

const scopeHistories = useHistoryStore()
const scopeOptions = computed(() => {
  const { histories } = scopeHistories
  const text = store.form.scope?.toLowerCase() || ''
  return histories.filter(i => i.text.toLowerCase().includes(text)).sort((a, b) => b.count - a.count)
})
// for (let i = 0; i < 10; i++) {
//   scopeHistories.addItem(`scope${i}`)
// }

const shortcutKey = ref(JSON.parse(JSON.stringify(store.shortcutKey)))

const preview = computed(() => {
  const { type, scope, emoji: emojiType, subject, body, footer } = store.form
  let typeItem = TypeKeys.find((item) => item.value === type) || {
    emoji: '',
    emojiText: '',
  }
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
  return `${header} ${subject}${body ? '\n\n' + body : ''}${
    footer ? '\n\n' + footer : ''
  }`
})
const onReset = () => {
  store.clear()
}
const onChangeType = (type: string) => {
  subjectInput.value && subjectInput.value.focus()
}
const onClickShortcutKey = () => {
  if (editShortcutKey.value) {
    store.shortcutKey = shortcutKey.value
    editShortcutKey.value = false
  } else {
    editShortcutKey.value = true
    setTimeout(() => {
      keyboardInput.value.$el.querySelector('input').focus()
    }, 0)
  }
}
const onDelete = (e: any, option: HistoryItem) => {
  e.e.preventDefault()
  e.e.stopPropagation()
  scopeHistories.removeItem(option.text)
}
const onClearScopeHistory = () => {
  scopeHistories.clear()
}

const copy = () => {
  const { subject } = store.form
  if (!subject) {
    MessagePlugin.closeAll()
    MessagePlugin.error('請填寫簡短描述')
    subjectInput.value.focus()
    return
  }
  // 创建一个新的textarea元素，设置文本并添加到页面中
  const textArea = document.createElement('textarea')
  textArea.className = 'copy-textarea'
  textArea.value = preview.value
  document.body.appendChild(textArea)
  // 选中textarea中的文本
  textArea.select()
  // 将文本复制到剪贴板
  document.execCommand('copy')
  // 删除textarea元素
  document.body.removeChild(textArea)

  MessagePlugin.success('複製成功')
  // 保存歷史記錄
  store.form.scope && scopeHistories.addItem(store.form.scope)
  if (store.copyClear) {
    store.clear(false)
    subjectInput.value.focus()
  }
  if (inExtension.value) {
    if (store.autoClose) {
      setTimeout(() => {
        window.close()
      }, 110)
    }
  }
}
let waitKeyUp = false
window.addEventListener('keydown', function (e: any) {
  // 获取用户按下的键码和修饰键
  const { shiftKey, ctrlKey, altKey, metaKey } = e
  const keyCode = e.keyCode || e.which
  console.log('keydown', keyCode, ctrlKey, altKey, shiftKey, metaKey)
  if (e.target.classList.contains('shortcut-input') && e.target.tagName === 'INPUT') {
    console.log(e)
    e.preventDefault()
    if ([8, 46].includes(keyCode)) {
      // 清除快捷键
      shortcutKey.value.ctrlKey = false
      shortcutKey.value.shiftKey = false
      shortcutKey.value.altKey = false
      shortcutKey.value.metaKey = false
      shortcutKey.value.keyCode = 0
      shortcutKey.value.text = ''
      return
    }

    // 将键码和修饰键组合成快捷键字符串
    let shortcut = ''
    if (ctrlKey) shortcut += 'Ctrl+'
    if (altKey) shortcut += 'Alt+'
    if (shiftKey) shortcut += 'Shift+'
    if (metaKey) shortcut += 'Meta+'
    if (![16, 17, 18, 91].includes(keyCode)) {
      shortcut += e.key.toUpperCase()
    }

    if (keyCode > 0 && ![16, 17, 18, 91].includes(keyCode)) {
      shortcutKey.value.ctrlKey = ctrlKey
      shortcutKey.value.shiftKey = shiftKey
      shortcutKey.value.altKey = altKey
      shortcutKey.value.metaKey = metaKey
      shortcutKey.value.keyCode = keyCode
    } else {
      shortcutKey.value.ctrlKey = false
      shortcutKey.value.shiftKey = false
      shortcutKey.value.altKey = false
      shortcutKey.value.metaKey = false
      shortcutKey.value.keyCode = 0
      shortcut = ''
    }
    // 在输入框中显示快捷键字符串
    shortcutKey.value.text = shortcut
    return
  }
  if (store.shortcutKey.keyCode > 0) {
    if (!waitKeyUp && ctrlKey === store.shortcutKey.ctrlKey
      && shiftKey === store.shortcutKey.shiftKey
      && altKey === store.shortcutKey.altKey
      && metaKey === store.shortcutKey.metaKey
      && keyCode === store.shortcutKey.keyCode) {

      if (/Macintosh|MacIntel|MacPPC/.test(navigator.userAgent)) {
        if (keyCode == 67 && metaKey) {
          if (isInput()) return console.log('正在複製輸入框內容1'), true
        }
      } else {
        if (keyCode == 67 && ctrlKey) {
          if (isInput()) return console.log('正在複製輸入框內容2'), true
        }
      }
      waitKeyUp = true
      console.log('触发快捷键')
      copy()
      e.preventDefault()
    }
  }
  // 如果按下Ctrl+C键
  // if (e.ctrlKey && e.keyCode == 67) {
  //   copy()
  // }
})
const isInput = () => {
  const dom: any = document.activeElement
  if (!dom) return false
  const tag = dom.tagName.toLowerCase()
  if (tag !== 'input' && tag !== 'textarea') return false
  return dom.selectionStart !== dom.selectionEnd
}
window.addEventListener('keyup', function (e: any) {
  // 获取用户按下的键码和修饰键
  const { shiftKey, ctrlKey, altKey, metaKey } = e
  const keyCode = e.keyCode || e.which
  console.log('keyup', keyCode, ctrlKey, altKey, shiftKey, metaKey)
  if (waitKeyUp && store.shortcutKey.keyCode === keyCode) {
    waitKeyUp = false
  }
})
document.addEventListener('copy', (event: any) => {
  if (
    event &&
    event.target &&
    event.target.classList.contains('copy-textarea')
  ) {
    return
  }
  if (isInput()) return console.log('正在複製輸入框內容3'), true
  event.preventDefault()
})
</script>

<style scoped lang="less">
.v-content {
  //height: calc(100vh - 100px);

  &-wrapper {
    display: block;
    background: rgba(245, 245, 245, 0.1);
    padding: 20px;
    box-shadow: 1px 2px 7px #0000006b;
    border-radius: 6px;

    &.preview {
      margin-top: 20px;
    }

    &-row {
      display: flex;
      vertical-align: top;
      margin-bottom: 10px;

      &:last-of-type {
        margin-bottom: 0;
      }

      &-left {
        //width: 42%;
        width: 320px;
        display: inline-block;
        vertical-align: top;
        margin-right: 6px;
      }

      &-right {
        flex: 1;
        display: inline-block;
        vertical-align: top;
      }

      .checkbox {
        color: #ffffff;
      }
      .keyboardInput {
        .editShortcutBtn {
          transition: all 0.3s;
          width: 30px;
          &.hide {
            width: 0;
            opacity: 0;
            padding: 0;
          }
        }
        &:hover {
          .editShortcutBtn {
            width: 30px;
            opacity: unset;
            padding: unset;
            padding-left: calc(var(--td-comp-paddingLR-l) - 1px);
            padding-right: calc(var(--td-comp-paddingLR-l) - 1px);
          }
        }
      }
    }
  }
}

.form-scope-option {
  width: 100%;
  &-text {
    font-size: 16px;
    vertical-align: middle;
    line-height: 26px;
  }
  &-btn {
    font-size: 20px;
    float: right;
    vertical-align: middle;
    line-height: 26px;
    height: 22px;
    width: 22px;
    cursor: pointer;
    color: rgba(0, 0, 0, 0.4);
    transition: color 0.3s;
    &:hover {
      //opacity: 0.7;
      color: rgba(0, 0, 0, 0.6);
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
        margin-top: 10px;
      }

      &-row {
        margin-bottom: 10px;

        &:last-of-type {
          margin-bottom: 0;
        }
        &-left {
          //width: 320px;
        }
      }
    }
  }
}
/* 盡量顯示全部type */
.t-select__dropdown .t-popup__content {
  max-height: 440px;
}
// 不需要顯示太多
.t-scope-autocomplete-option-list {
  .t-popup__content {
    max-height: 180px;
  }
}
// 清除按鈕放大
.t-input.t-input--suffix:hover > span.t-input__clear {
  font-size: 20px;
}
</style>
