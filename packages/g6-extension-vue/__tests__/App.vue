<template>
  <Flex vertical>
    <Select :value="match || Object.keys(demos)[0]" :options="options" style="width: 100 "
      @change="onRouterChange"></Select>
    <RouterView />
  </Flex>
</template>

<script setup>
import { Flex, Select } from 'ant-design-vue';
import { computed } from 'vue-demi';
import { useRouter, useRoute } from 'vue-router';
import * as demos from './demos';

const navigate = useRouter();
const route = useRoute()
const match = computed(() => {
  return route.path
});
const options = computed(() => {
  return Object.keys(demos).map((label) => ({
    label, value: `/${label}`
  }))
})
function onRouterChange(value) {
  navigate.push(value);
}
</script>
