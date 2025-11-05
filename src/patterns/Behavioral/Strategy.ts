/* --- 1. Strategy (전략 인터페이스) ---
 * 모든 결제 전략이 구현해야 할 공통 인터페이스
 */
export interface PaymentStrategy {
    pay(amount: number): string; // 결제 로직, Vue 출력을 위해 string 반환
}

/* --- 2. ConcreteStrategy A (구체적인 전략 1) ---
 * 신용카드 결제 전략
 */
export class CreditCardStrategy implements PaymentStrategy {
    pay(amount: number): string {
        const msg = `신용카드: ${amount}원 결제 처리`;
        console.log(msg);
        return msg;
    }
}

/* --- 3. ConcreteStrategy B (구체적인 전략 2) ---
 * 페이팔 결제 전략
 */
export class PayPalStrategy implements PaymentStrategy {
    pay(amount: number): string {
        const msg = `페이팔: ${amount}원 결제 처리`;
        console.log(msg);
        return msg;
    }
}

/* --- 4. Context (컨텍스트) ---
 * 전략을 사용하는 주체 (예: 장바구니)
 */
export class ShoppingCart {
    // 현재 설정된 전략을 저장
    private strategy: PaymentStrategy | null = null;
    // Vue 출력을 위한 로그 누적용
    private logs: string[] = [];

    // 런타임에 전략을 동적으로 설정(교체)
    setStrategy(strategy: PaymentStrategy): void {
        this.strategy = strategy;
        console.log(`결제 전략 변경: ${strategy.constructor.name}`);
    }

    // Context의 비즈니스 로직
    checkout(amount: number): string[] {
        this.logs = []; // 로그 초기화

        if (!this.strategy) {
            const msg = "오류: 결제 전략이 선택되지 않음.";
            console.error(msg);
            this.logs.push(msg);
            return this.logs;
        }

        // **핵심**: 실제 행동(pay)을 현재의 전략 객체에 위임
        const result = this.strategy.pay(amount);
        this.logs.push(result);

        return this.logs;
    }
}