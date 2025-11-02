/* --- 1. Component Interface (PDF 예제 1: Notifier) ---
 * 원본 객체와 데코레이터가 공통으로 구현할 인터페이스.
 * (수정) Vue 화면 출력을 위해 string[] (로그 배열) 반환.
 */
export interface Notifier {
    send(message: string): string[];
}

/* --- 2. ConcreteComponent (PDF 예제 2: BaseNotifier) ---
 * 기능을 추가할 원본 객체.
 * (수정) PDF 예제 출력("기본 알림:") 반영.
 */
export class BaseNotifier implements Notifier {
    send(message: string): string[] {
        const msg = `기본 알림: ${message}`;
        console.log(msg); // 콘솔 출력
        return [msg]; // 배열로 반환
    }
}

/* --- 3. Base Decorator (PDF 예제 3: NotifierDecorator) ---
 * Component 인터페이스 구현, 원본 객체(Component)를 래핑(wrap).
 */
export abstract class NotifierDecorator implements Notifier {
    protected wrappedNotifier: Notifier;

    constructor(notifier: Notifier) {
        this.wrappedNotifier = notifier;
    }

    // 래핑된 객체의 send 호출 및 하위 데코레이터로 결과 전달.
    send(message: string): string[] {
        return this.wrappedNotifier.send(message);
    }
}

/* --- 4. ConcreteDecorators (PDF 예제 4) ---
 * 래핑된 객체에 동적으로 기능 추가.
 */
export class EmailNotifier extends NotifierDecorator {
    /* * PDF 예제 코드 반영.
     * [수정] PDF 예제 출력("이메일 발송:") 반영.
     */
    send(message: string): string[] {
        const results = super.send(message); // 1. 이전 단계(원본) 결과
        const msg = `이메일 발송: ${message}`;   // 2. 자신만의 기능 추가 (PDF 예제대로 수정)
        console.log(msg);
        return [...results, msg];            // 3. 누적 결과 반환
    }
}

export class SMSNotifier extends NotifierDecorator {
    /* * [수정] PDF 예제 출력("SMS 발송:") 반영. */
    send(message: string): string[] {
        const results = super.send(message); // 1. 이전 단계 결과
        const msg = `SMS 발송: ${message}`;     // 2. 자신만의 기능 추가 (PDF 예제대로 수정)
        console.log(msg);
        return [...results, msg];            // 3. 누적된 결과 반환
    }
}

export class SlackNotifier extends NotifierDecorator {
    /* * [수정] PDF 예제 출력("Slack 발송:") 반영. */
    send(message: string): string[] {
        const results = super.send(message); // 1. 이전 단계 결과
        const msg = `Slack 발송: ${message}`;    // 2. 자신만의 기능 추가 (PDF 예제대로 수정)
        console.log(msg);
        return [...results, msg];            // 3. 누적된 결과 반환
    }
}