<template>
  <div class="pattern-card">
    <h2>방문자 (Visitor) 패턴 실행 결과</h2>

    <div class="output-section">
      <h3><code>SizeCalculator</code> (크기 계산 Visitor) 실행</h3>
      <div class="output-box">
        <pre>총 크기: {{ sizeResult }}</pre>
      </div>
    </div>

    <div class="output-section">
      <h3><code>NamePrinter</code> (이름 출력 Visitor) 실행</h3>
      <div class="output-box">
        <pre v-for="(line, index) in nameResult" :key="index">{{ line }}</pre>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

/* * PDF 예제 코드 반영 (1~5)
 * '@' 별칭 사용, Behavioral 폴더의 Visitor.ts import
 */
import {
  FileElement,
  FolderElement,
  SizeCalculator,
  NamePrinter
} from '@/patterns/Behavioral/Visitor.ts';

// --- PDF 예제 5. 실행 예시 ---

const sizeResult = ref(0);
const nameResult = ref<string[]>([]);

console.log("--- 방문자 패턴 실행 ---");

// 1. 파일 시스템 구성 (PDF 예제 5)
const file1 = new FileElement("a.txt", 10);
// (참고) PDF 총합 30을 맞추기 위해 b.txt 크기 20으로 설정
const file2 = new FileElement("b.txt", 20);
const folder = new FolderElement("docs", [file1, file2]);

// 2. SizeVisitor 사용 (데이터 구조는 그대로, 연산1 주입)
const sizeVisitor = new SizeCalculator();
folder.accept(sizeVisitor); // Element에 Visitor 전달
sizeResult.value = sizeVisitor.getTotalSize(); // 결과 수집 (30)

// 3. NamePrinter 사용 (데이터 구조는 그대로, 연산2 주입)
const nameVisitor = new NamePrinter();
folder.accept(nameVisitor); // 동일 Element에 다른 Visitor 전달
nameResult.value = nameVisitor.getLogs(); // 결과 수집

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