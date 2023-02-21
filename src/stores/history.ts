import { ref } from 'vue'
import { defineStore } from 'pinia'
import { throttle } from '@/utils'
import localforage from 'localforage'

export interface HistoryItem {
  text: string
  count: number
}

export const useHistoryStore = defineStore('history', () => {
  const storeKey = 'history'
  const histories = ref<HistoryItem[]>([])
  localforage.config({
    name: 'git-commit-history',
    storeName: 'history',
    driver: [localforage.INDEXEDDB, localforage.LOCALSTORAGE],
    version: 1.0,
  })

  const save = throttle(() => {
    localforage.setItem(
      storeKey,
      histories.value.map((i) => ({ ...i }))
    )
  }, 100)
  const load = async () => {
    const data = await localforage.getItem<HistoryItem[]>(storeKey)
    if (data) {
      histories.value = data
    }
    return histories
  }

  const addItem = (text: string) => {
    const index = histories.value.findIndex((item) => item.text === text)
    if (index === -1) {
      histories.value.push({
        text,
        count: 1,
      })
    } else {
      histories.value[index].count++
    }
    save()
  }
  const removeItem = (text: string) => {
    const index = histories.value.findIndex((item) => item.text === text)
    if (index !== -1) {
      histories.value.splice(index, 1)
    }
    save()
  }
  const clear = () => {
    histories.value = []
    save()
  }

  load() // 加载历史记录
  return {
    histories,
    save,
    addItem,
    removeItem,
    clear,
  }
})
