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
  const form = ref({
    type: 'feat',
    scope: '',
    subject: '',
    body: '',
    footer: '',
    emoji: 'symbol',
  } as GitCommitForm)
  const style = ref('1')

  const saveToLocalStorage = throttle(() => {
    localStorage.setItem(STORE_KEY, JSON.stringify(form.value))
    localStorage.setItem(STORE_STYLE_KEY, style.value)
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
    saveToLocalStorage,
    getFromLocalStorage,
    updateForm,
    clear,
  }
})
