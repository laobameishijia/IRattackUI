<template>
  <div class="justify-left">
    <Breadcrumb :home="home" :model="items">
      <template #item="{ item, props }">
        <router-link v-if="item.route" v-slot="{ href, navigate }" :to="item.route" custom>
          <a :href="href" v-bind="props.action" @click="navigate">
            <span :class="[item.icon, 'text-color']" />
            <span :class="index === items.length - 1 ? 'text-primary font-semibold' : 'text-primary font-semibold'">{{
              item.label }}</span>
          </a>
        </router-link>
        <a v-else-if="item.goBack" @click="goBack" v-bind="props.action">
          <span :class="[item.icon, 'text-color']" />
          <span :class="index === items.length - 1 ? 'text-primary font-semibold' : 'text-primary font-semibold'">{{ item.label }}</span>
        </a>
        <a v-else :href="item.url" :target="item.target" v-bind="props.action">
          <span
            :class="index === items.length - 1 ? 'text-surface-700 dark:text-surface-0' : 'text-primary font-semibold'">{{
              item.label }}</span>
        </a>
      </template>
    </Breadcrumb>
  </div>
</template>
  
<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  home: Object,
  items: Array
});

import { useRouter } from 'vue-router';
const router = useRouter();

const goBack = () => {
  router.go(-1);
};
  
</script>

<style scoped>/* 添加你需要的样式 */</style>
  