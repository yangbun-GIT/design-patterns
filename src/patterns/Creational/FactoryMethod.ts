/* --- 1. Product 인터페이스 (Notion 예제 1) ---
 * 버튼의 공통 인터페이스 정의.
 * (수정) Vue 화면 출력을 위해 string 반환.
 */
export interface Button {
    render(): string;
    onClick(): string;
}

/* --- 2. 구체적인 Product 클래스들 (Notion 예제 2) ---
 * 각 OS에 맞는 실제 버튼 구현.
 */
export class WindowsButton implements Button {
    render(): string {
        const msg = "윈도우 스타일 버튼 렌더링";
        console.log(msg); // 콘솔 출력
        return msg;
    }
    onClick(): string {
        const msg = "윈도우 버튼 클릭 이벤트 처리";
        console.log(msg); // 콘솔 출력
        return msg;
    }
}

export class MacButton implements Button {
    render(): string {
        const msg = "맥 스타일 버튼 렌더링";
        console.log(msg); // 콘솔 출력
        return msg;
    }
    onClick(): string {
        const msg = "맥 버튼 클릭 이벤트 처리";
        console.log(msg); // 콘솔 출력
        return msg;
    }
}

/* --- 3. Creator 추상 클래스 (Notion 예제 3) ---
 * 팩토리 메서드(createButton) 정의.
 */
export abstract class Dialog {
    // 팩토리 메서드: 서브클래스가 구현
    abstract createButton(): Button;

    // 비즈니스 로직 (Notion 예제의 renderDialog)
    // (수정) Vue 화면 출력을 위해 string 배열 반환
    public renderDialog(): string[] {
        // **핵심**: 팩토리 메서드 호출로 실제 객체 생성
        const button = this.createButton();

        const steps: string[] = [];
        // Product의 공통 인터페이스 사용
        steps.push(button.render());
        steps.push(button.onClick());

        return steps;
    }
}

/* --- 4. 구체적인 Creator 클래스들 (Notion 예제 4) ---
 * 팩토리 메서드(createButton) 실제 구현
 */
export class WindowsDialog extends Dialog {
    createButton(): Button {
        // WindowsDialog는 WindowsButton 생성
        return new WindowsButton();
    }
}

export class MacDialog extends Dialog {
    createButton(): Button {
        // MacDialog는 MacButton 생성
        return new MacButton();
    }
}