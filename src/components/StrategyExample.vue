<template>
  <div class="pattern-card">
    <h2>전략 (Strategy) 패턴 실행 결과</h2>

    <div class="output-section">
      <h3><code>cart.setStrategy(new CreditCardStrategy())</code> 실행</h3>
      <div class="output-box">
        <pre v-for="(line, index) in creditCardResult" :key="index">{{ line }}</pre>
      </div>
    </div>

    <div class="output-section">
      <h3><code>cart.setStrategy(new PayPalStrategy())</code> 실행</h3>
      <div class="output-box">
        <pre v-for="(line, index) in payPalResult" :key="index">{{ line }}</pre>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

/* * '@' 별칭 사용, Behavioral 폴더의 Strategy.ts import
 */
import {
  ShoppingCart,
  CreditCardStrategy,
  PayPalStrategy
} from '@/patterns/Behavioral/Strategy.ts';

// --- 전략 패턴 실행 예시 ---

const creditCardResult = ref<string[]>([]);
const payPalResult = ref<string[]>([]);

console.log("--- 전략 패턴 실행 ---");

// 1. Context(ShoppingCart) 생성
const cart = new ShoppingCart();

// 2. 첫 번째 전략(신용카드) 실행
cart.setStrategy(new CreditCardStrategy());
creditCardResult.value = cart.checkout(15000); // 15000원 결제

// 3. 두 번째 전략(페이팔)으로 런타임 변경 후 실행
cart.setStrategy(new PayPalStrategy());
payPalResult.value = cart.checkout(8000); // 8000원 결제

</script>

<style scoped>
/* 이전 예제들과 동일한 스타일 */
.pattern-card {
  background-color: #ffffff;
  border-radius: 8px;
  padding: 24px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  border: 1px solid #e0e0e0;
}
h2 {
  margin-top: 0;
  color: #2c3e50;
  border-bottom: 2px solid #42b983; /* Vue 색상 */
  padding-bottom: 10px;
}
.output-section {
  margin-bottom: 1.5rem;
}
h3 {
  color: #333;
  font-weight: 500;
  margin-bottom: 0.5rem;
  font-family: 'Consolas', 'Monaco', monospace;
}
pre {
  background-color: #282c34; /* 어두운 콘솔 배경 */
  color: #abb2bf; /* 콘솔 텍스트 색상 */
  padding: 16px;
  border-radius: 6px;
  overflow-x: auto;
  font-family: 'Consolas', 'Monaco', monospace;
  font-size: 0.9rem;
  line-height: 1.5;
  margin: 0;
}
</style>