<template>
  <div class="pattern-card">
    <h2>팩토리 메서드 패턴 (Factory Method Pattern) 실행 결과</h2>

    <div class="output-section">
      <h3><code>clientApp("Windows")</code> 실행</h3>
      <div class="output-box">
        <pre v-for="(line, index) in windowsResult" :key="index">{{ line }}</pre>
      </div>
    </div>

    <div class="output-section">
      <h3><code>clientApp("Mac")</code> 실행</h3>
      <div class="output-box">
        <pre v-for="(line, index) in macResult" :key="index">{{ line }}</pre>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

/* * Notion 예제 코드 반영 (1~4)
 * [수정] '@' 별칭 및 'Creational' 폴더 경로 사용
 */
import { Dialog, WindowsDialog, MacDialog } from '@/patterns/Creational/FactoryMethod.ts';

// --- Notion 예제 5. 클라이언트 코드(clientApp) 실행 ---

const windowsResult = ref<string[]>([]);
const macResult = ref<string[]>([]);

// 1. osType === "Windows" 실행
console.log("--- Windows Dialog 실행 ---");
let dialogWindows: Dialog = new WindowsDialog();
// renderDialog()가 [render결과, onClick결과] 배열 반환
windowsResult.value = dialogWindows.renderDialog();

// 2. osType === "Mac" 실행
console.log("--- Mac Dialog 실행 ---");
let dialogMac: Dialog = new MacDialog();
macResult.value = dialogMac.renderDialog();

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