<template>
  <div class="pattern-card">
    <h2>어댑터 (Adapter) 패턴 실행 결과</h2>

    <div class="output-section">
      <h3>예제 실행 (<code>processPayment</code> 호출)</h3>
      <div class="output-box">
        <pre>{{ result }}</pre>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

/* * PDF 예제 코드 반영 (1~5)
 * '@' 별칭 사용, Structural 폴더의 Adapter.ts import
 */
import {
  NewPaymentGateway,
  PaymentAdapter,
  processPayment
} from '@/patterns/Structural/Adapter.ts';

// --- PDF 예제 5. 실행 예시 ---

const result = ref('');

console.log("--- 어댑터 패턴 실행 ---");

// 1. Adaptee(새 게이트웨이) 생성
const newGateway = new NewPaymentGateway();

// 2. Adapter 생성 (Adaptee 주입)
const adapter = new PaymentAdapter(newGateway);

// 3. Client(processPayment)는 Target(OldPaymentProcessor)을
//    구현한 Adapter를 문제 없이 사용 가능.
result.value = processPayment(adapter, 5000);

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