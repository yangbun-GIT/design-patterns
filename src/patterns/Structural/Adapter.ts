/* --- 1. Target Interface (PDF 예제 1: OldPaymentProcessor) ---
 * 클라이언트(processPayment)가 기대하는 인터페이스.
 * (수정) Vue 화면 출력을 위해 string 반환.
 */
export interface OldPaymentProcessor {
    pay(amount: number): string;
}

/* --- 2. Adaptee (PDF 예제 2: NewPaymentGateway) ---
 * 사용해야 할, 호환되지 않는 새로운 클래스.
 * (수정) Vue 화면 출력을 위해 string 반환.
 */
export class NewPaymentGateway {
    // 메서드 이름(makePayment)과 파라미터(value)가 Target과 다름.
    makePayment(value: number): string {
        const msg = `${value}원을 새 결제 게이트웨이로 처리함`;
        console.log(msg); // 콘솔 출력
        return msg;
    }
}

/* --- 3. Client (PDF 예제 3: processPayment) ---
 * 클라이언트는 오직 Target(OldPaymentProcessor) 인터페이스에만 의존.
 * (수정) Vue 화면 출력을 위해 string 반환.
 */
export function processPayment(processor: OldPaymentProcessor, amount: number): string {
    // 클라이언트는 OldPaymentProcessor를 호출한다고 생각.
    return processor.pay(amount);
}

/* --- 4. Adapter (PDF 예제 4: PaymentAdapter) ---
 * Target(OldPaymentProcessor) 인터페이스 구현.
 * Adaptee(NewPaymentGateway)의 인스턴스를 가짐.
 */
export class PaymentAdapter implements OldPaymentProcessor {
    // Adaptee를 내부에 저장.
    private gateway: NewPaymentGateway;

    constructor(gateway: NewPaymentGateway) {
        this.gateway = gateway;
    }

    /* * PDF 예제 코드 반영.
     * Target의 'pay' 메서드 호출을 Adaptee의 'makePayment' 메서드로 변환(어댑트).
     */
    pay(amount: number): string {
        return this.gateway.makePayment(amount);
    }
}