<template>
  <div class="pattern-card">
    <h2>퍼사드 (Facade) 패턴 실행 결과</h2>

    <div class="output-section">
      <h3><code>facade.watchMovie("인셉션")</code> 호출</h3>
      <div class="output-box">
        <pre v-for="(line, index) in watchResult" :key="index">{{ line }}</pre>
      </div>
    </div>

    <div class="output-section">
      <h3><code>facade.endMovie()</code> 호출</h3>
      <div class="output-box">
        <pre v-for="(line, index) in endResult" :key="index">{{ line }}</pre>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

/* * '@' 별칭 사용, Structural 폴더의 Facade.ts import
 */
import {
  Amplifier,
  DvdPlayer,
  Projector,
  HomeTheaterFacade
} from '@/patterns/Structural/Facade.ts';

// --- 퍼사드 패턴 실행 예시 ---
const watchResult = ref<string[]>([]);
const endResult = ref<string[]>([]);

console.log("--- 퍼사드 패턴 실행 ---");

// 1. 복잡한 서브시스템 객체들 생성
const amp = new Amplifier();
const dvd = new DvdPlayer();
const proj = new Projector();

// 2. 퍼사드 객체 생성 (서브시스템 주입)
const facade = new HomeTheaterFacade(amp, dvd, proj);

// 3. 클라이언트는 단순한 메서드 하나만 호출
watchResult.value = facade.watchMovie("인셉션");

// 4. 종료 메서드 호출
endResult.value = facade.endMovie();

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