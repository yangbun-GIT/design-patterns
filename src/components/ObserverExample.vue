<template>
  <div class="pattern-card">
    <h2>옵저버 (Observer) 패턴 실행 결과</h2>

    <div class="output-section">
      <h3><code>stock.setPrice(90)</code> 호출 결과</h3>
      <div class="output-box">
        <pre v-for="(line, index) in results90" :key="index">{{ line }}</pre>
      </div>
    </div>

    <div class="output-section">
      <h3><code>stock.setPrice(120)</code> 호출 결과</h3>
      <div class="output-box">
        <pre v-for="(line, index) in results120" :key="index">{{ line }}</pre>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

/* * PDF 예제 코드 반영 (1~3)
 * '@' 별칭 사용, Behavioral 폴더의 Observer.ts import
 */
import {
  Stock,
  PriceDisplay,
  PriceAlert
} from '@/patterns/Behavioral/Observer.ts';

// --- PDF 예제 3. 사용 예시 ---

const results90 = ref<string[]>([]);
const results120 = ref<string[]>([]);

console.log("--- 옵저버 패턴 실행 ---");

// 1. Subject(Stock)와 Observers(Display, Alert) 생성
const stock = new Stock();
const display = new PriceDisplay();
const alert = new PriceAlert();

// 2. Subject에 Observer 등록
stock.register(display);
stock.register(alert);

// 3. 첫 번째 가격 변경 (90): PriceDisplay만 반응
results90.value = stock.setPrice(90);

// 4. 두 번째 가격 변경 (120): PriceDisplay와 PriceAlert 모두 반응
results120.value = stock.setPrice(120);

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