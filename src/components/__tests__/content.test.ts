import { mount, flushPromises } from '@vue/test-utils'
import { test, expect } from 'vitest'
import {
  Button as TButton,
  Dialog as TDialog,
  Input as TInput,
  Textarea as TTextarea,
  Radio as TRadio,
  RadioGroup as TRadioGroup,
  RadioButton as TRadioButton,
  Checkbox as TCheckbox,
  Space as TSpace,
  Switch as TSwitch,
  Form as TForm,
  FormItem as TFormItem,
  Select as TSelect,
  Option as TOption,
} from 'tdesign-vue-next'
import VContent from '../VContent.vue'
import { createPinia } from 'pinia'
const pinia = createPinia()

const sleep = (time: number) => new Promise((resolve) => setTimeout(resolve, time))

test('VContent', async () => {
  // expect(VContent).toBeTruthy()
  const wrapper = mount(VContent, {
    global: {
      plugins: [pinia],
      components: { TButton, TDialog, TInput, TTextarea, TRadio, TRadioGroup, TRadioButton, TCheckbox, TSpace, TSwitch, TForm, TFormItem, TSelect, TOption },
    }
  })
  const type = (selector: string, text: string) => {
    const el = wrapper.find(selector).element as HTMLInputElement
    el.value = text
    el.dispatchEvent(new Event('input'))
  }
  await flushPromises()
  // console.log(wrapper.html())
  type('.v-content-wrapper .v-content-wrapper-row:nth-child(2) .t-input input', '测试Scope')
  await flushPromises()
  // console.log('s', wrapper.vm.store.form)
  // @ts-ignore
  const previewText = () => wrapper.find('.v-content-wrapper.preview .t-textarea textarea').element.value
  console.log(previewText())
  // expect(wrapper.html()).toMatchSnapshot()
})
