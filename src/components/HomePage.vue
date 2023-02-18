<template>
  <div :class="className">
    <VContent></VContent>
  </div>
</template>

<script setup lang="ts">
import VContent from '@/components/VContent.vue'

let className = 'home'
if (location.protocol === 'chrome-extension:') {
  className += ' chrome-extension'
}
</script>

<style lang="less" scoped>
.home {
  filter: none !important;
  width: 800px;
  margin: 0 auto;
  padding: 10px 6px;
  font-weight: normal;
  height: inherit;
  color: #e8e8e8;
  font-size: 14px;
  &.chrome-extension {
    max-width: 600px;
    padding: 0;
  }
}
</style>
