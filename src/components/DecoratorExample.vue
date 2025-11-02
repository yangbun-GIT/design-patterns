<template>
  <div class="pattern-card">
    <h2>데코레이터 (Decorator) 패턴 실행 결과</h2>

    <div class="output-section">
      <h3>예제 실행 (동적 기능 조합)</h3>
      <div class="output-box">
        <pre v-for="(line, index) in result" :key="index">{{ line }}</pre>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

/* * PDF 예제 코드 반영 (1~5)
 * '@' 별칭 사용, Structural 폴더의 Decorator.ts import
 */
import {
  Notifier,
  BaseNotifier,
  EmailNotifier,
  SMSNotifier,
  SlackNotifier
} from '@/patterns/Structural/Decorator.ts';

// --- PDF 예제 5. 실행 예시 ---

const result = ref<string[]>([]);

/* * [수정]
 * message 변수를 PDF 예제와 동일하게 설정
 */
const message = "긴급 서버 장애 발생!";

console.log("--- 데코레이터 패턴 실행 ---");

// 1. 원본 객체(BaseNotifier) 생성
let notifier: Notifier = new BaseNotifier();

// 2. 원본 객체를 EmailNotifier로 감싸기 (기능 추가)
notifier = new EmailNotifier(notifier);

// 3. Email로 감싸진 객체를 SMSNotifier로 감싸기 (기능 추가)
notifier = new SMSNotifier(notifier);

// 4. SMS로 감싸진 객체를 SlackNotifier로 감싸기 (기능 추가)
notifier = new SlackNotifier(notifier);

// 5. 최종적으로 감싸진 객체의 send 호출
//    (모든 기능(Base -> Email -> SMS -> Slack) 연쇄 실행)
result.value = notifier.send(message);

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