<template>
  <div class="pattern-card">
    <h2>싱글톤 패턴 (Singleton Pattern) 실행 결과</h2>

    <div class="output-section">
      <h3>Eager Initialization (즉시 초기화)</h3>
      <pre>{{ eagerResult }}</pre>
    </div>

    <div class="output-section">
      <h3>Static Block Initialization (정적 블록 초기화)</h3>
      <pre>{{ staticResult }}</pre>
    </div>

    <div class="output-section">
      <h3>Lazy Initialization (지연 초기화)</h3>
      <pre>{{ lazyResult }}</pre>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

/* * PDF 예제 코드 반영
 * [수정] '@' 별칭 및 'Creational' 폴더 경로 사용
 */
import { EagerSingleton, StaticBlockSingleton, LazySingleton } from '@/patterns/Creational/Singleton.ts';

// --- Eager 예제 실행 ---
const eagerMessages = [];
console.log("--- Eager 테스트 시작 ---");
const eager1 = EagerSingleton.getInstance();
const eager2 = EagerSingleton.getInstance();
eagerMessages.push(`메시지: ${eager1.sayHello()}`);
eagerMessages.push(`eager1 === eager2 : ${eager1 === eager2}`);
const eagerResult = ref(eagerMessages.join('\n'));

// --- Static Block 예제 실행 ---
const staticMessages = [];
console.log("--- Static Block 테스트 시작 ---");
const static1 = StaticBlockSingleton.getInstance();
const static2 = StaticBlockSingleton.getInstance();
staticMessages.push(`메시지: ${static1.greet()}`);
staticMessages.push(`static1 === static2 : ${static1 === static2}`);
const staticResult = ref(staticMessages.join('\n'));

// --- Lazy 예제 실행 ---
const lazyMessages = [];
console.log("--- Lazy 테스트 시작 ---");
const lazy1 = LazySingleton.getInstance(); // 첫 생성 로그
const lazy2 = LazySingleton.getInstance(); // 생성 로그 없음
lazyMessages.push(`메시지: ${lazy1.say()}`);
lazyMessages.push(`lazy1 === lazy2 : ${lazy1 === lazy2}`);
const lazyResult = ref(lazyMessages.join('\n'));

</script>

<style scoped>
/* 이 컴포넌트에만 적용 (깔끔한 UI용) */
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