/* --- 1. Observer Interface (PDF 예제 1) ---
 * (수정) Vue 화면 출력을 위해, 로그가 있을 시 string, 없으면 null 반환.
 */
export interface Observer {
    update(price: number): string | null;
}

/* --- 2. Subject Interface (PDF 예제 1) ---
 * 옵저버 등록(register), 해제(unregister), 알림(notify) 메서드 정의.
 */
export interface Subject {
    register(observer: Observer): void;
    unregister(observer: Observer): void;
    notify(): string[]; // (수정) 알림 결과를 string 배열로 수집.
}

/* --- 3. ConcreteSubject (PDF 예제 2: Stock) ---
 * 실제 상태(price) 소유, 상태 변경 시 옵저버에게 알림.
 */
export class Stock implements Subject {
    private observers: Observer[] = [];
    private price: number = 0;

    register(observer: Observer): void {
        this.observers.push(observer);
        console.log('옵저버 등록됨', observer);
    }

    unregister(observer: Observer): void {
        const index = this.observers.indexOf(observer);
        if (index > -1) {
            this.observers.splice(index, 1);
            console.log('옵저버 해제됨', observer);
        }
    }

    /* * PDF 예제 코드 반영 (notify)
     * 등록된 모든 옵저버의 update 호출, 결과(로그) 수집.
     */
    notify(): string[] {
        const logs: string[] = [];
        for (const observer of this.observers) {
            const log = observer.update(this.price); // 각 옵저버의 update 실행
            if (log) {
                logs.push(log); // 로그가 있는 경우만 수집
            }
        }
        return logs;
    }

    // (수정) setPrice가 로그 배열을 반환하도록 변경
    setPrice(newPrice: number): string[] {
        this.price = newPrice;
        console.log(`--- 주가 변경: ${this.price} ---`);
        return this.notify(); // 상태 변경 후 알림
    }
}

/* --- 4. ConcreteObserver (PDF 예제 2: PriceDisplay) ---
 * 가격을 항상 화면에 표시.
 */
export class PriceDisplay implements Observer {
    update(price: number): string {
        const msg = `화면에 표시: 현재 주가 ${price}`;
        console.log(msg);
        return msg;
    }
}

/* --- 5. ConcreteObserver (PDF 예제 2: PriceAlert) ---
 * 가격이 100을 초과할 때만 알림 전송.
 */
export class PriceAlert implements Observer {
    /* * PDF 예제 코드 반영 (update)
     * 100 초과 조건(if), 조건 미충족 시 null 반환.
     */
    update(price: number): string | null {
        if (price > 100) {
            const msg = `🚨 [알림 발생]: 주가 ${price} 초과!`;
            console.log(msg);
            return msg;
        }
        return null; // 100 이하면 반환(출력) 없음
    }
}