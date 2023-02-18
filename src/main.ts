import { createApp } from 'vue'
import { createPinia } from 'pinia'
// import TDesign from 'tdesign-vue-next'
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
import App from './App.vue'

import './assets/main.css'
import 'tdesign-vue-next/es/style/index.css'

const app = createApp(App)

app.use(createPinia())
app.use(TButton)
app.use(TDialog)
app.use(TInput)
app.use(TTextarea)
app.use(TRadio)
app.use(TRadioGroup)
app.use(TRadioButton)
app.use(TCheckbox)
app.use(TSpace)
app.use(TSwitch)
app.use(TForm)
app.use(TFormItem)
app.use(TSelect)
app.use(TOption)
// app.use(TDesign)

app.mount('#app')
