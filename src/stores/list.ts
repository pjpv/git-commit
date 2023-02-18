import { ref } from 'vue'
import { defineStore } from 'pinia'
import { throttle } from '@/utils'

export interface GitCommitForm {
  type: string
  scope: string
  subject: string
  body: string
  footer: string
  emoji: string
}

export const useFormStore = defineStore('form', () => {
  const STORE_KEY = 'git-commit-form'
  const STORE_STYLE_KEY = 'git-commit-form-style'
  const STORE_AUTO_CLOSE_KEY = 'git-commit-form-auto-close'
  const STORE_COPY_CLEAR_KEY = 'git-commit-form-copy-clear'
  const form = ref({
    type: 'feat',
    scope: '',
    subject: '',
    body: '',
    footer: '',
    emoji: 'symbol',
  } as GitCommitForm)
  const style = ref('1')
  const autoClose = ref(true)
  const copyClear = ref(false)

  const saveToLocalStorage = throttle(() => {
    localStorage.setItem(STORE_KEY, JSON.stringify(form.value))
    localStorage.setItem(STORE_AUTO_CLOSE_KEY, autoClose.value ? '1' : '0')
    localStorage.setItem(STORE_COPY_CLEAR_KEY, copyClear.value ? '1' : '0')
    // localStorage.setItem(STORE_STYLE_KEY, style.value)
  }, 100)
  const getFromLocalStorage = () => {
    try {
      const data = localStorage.getItem(STORE_KEY)
      if (data) {
        form.value = JSON.parse(data)
      }
    } catch (e) {
      console.error(e)
    }
    try {
      const data = localStorage.getItem(STORE_STYLE_KEY)
      if (data) {
        style.value = data
      } else {
        style.value = '1'
      }
    } catch (e) {
      console.error(e)
    }
    try {
      const data = localStorage.getItem(STORE_AUTO_CLOSE_KEY)
      if (data) {
        autoClose.value = data === '1'
      } else {
        autoClose.value = true
      }
    } catch (e) {
      console.error(e)
    }
    try {
      const data = localStorage.getItem(STORE_COPY_CLEAR_KEY)
      if (data) {
        copyClear.value = data === '1'
      } else {
        copyClear.value = false
      }
    } catch (e) {
      console.error(e)
    }
  }
  const updateForm = (newForm: GitCommitForm) => {
    form.value = newForm
    saveToLocalStorage()
  }
  const clear = (resetType = true) => {
    form.value = {
      type: resetType ? 'feat' : form.value.type,
      scope: '',
      subject: '',
      body: '',
      footer: '',
      emoji: form.value.emoji || 'symbol',
    }
    saveToLocalStorage()
  }

  getFromLocalStorage()
  return {
    form,
    style,
    autoClose,
    copyClear,
    saveToLocalStorage,
    getFromLocalStorage,
    updateForm,
    clear,
  }
})
