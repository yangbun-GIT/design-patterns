<template>
  <div class="pattern-card">
    <h2>빌더 (Builder) 패턴 실행 결과</h2>

    <div class="output-section">
      <h3>기본 사용자 (필수 값만 사용)</h3>
      <div class="output-box">
        <pre>{{ user1Result }}</pre>
      </div>
    </div>

    <div class="output-section">
      <h3>복합 사용자 (선택적 메서드 체이닝)</h3>
      <div class="output-box">
        <pre>{{ user2Result }}</pre>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

/* * '@' 별칭 사용, Creational 폴더의 Builder.ts import
 */
import { UserBuilder } from '@/patterns/Creational/Builder.ts';

// --- 빌더 패턴 실행 예시 ---

const user1Result = ref('');
const user2Result = ref('');

console.log("--- 빌더 패턴 실행 ---");

// 1. 필수 값(name)만으로 객체 생성
// new UserBuilder("...").build()
const user1 = new UserBuilder("기본 유저").build();
// (참고) JSON.stringify(obj, null, 2)는 객체를 예쁘게 출력함
user1Result.value = JSON.stringify(user1, null, 2);

// 2. 메서드 체이닝으로 복잡한 객체 생성
// new UserBuilder("...").setAge(...).setEmail(...).build()
const user2 = new UserBuilder("관리자 유저")
    .setAge(30)
    .setEmail("admin@example.com")
    .setPermissions(['read', 'write', 'delete'])
    .build();
user2Result.value = JSON.stringify(user2, null, 2);

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