<template>
  <strategy-example />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import StrategyExample from "@/components/StrategyExample.vue";

// [수정] '@' 별칭을 사용하여 컴포넌트들을 import 함

export default defineComponent({
  name: 'App',
  components: {
    StrategyExample
  }
});
</script>

<style>
/* 전역 스타일은 src/style.css 에서 관리함 */
</style>