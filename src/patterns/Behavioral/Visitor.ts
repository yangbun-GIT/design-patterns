// --- PDF 예제 1, 2, 3: Element와 Visitor 인터페이스 ---

// 1. Visitor 인터페이스 (방문자)
// (참고) Visitor는 FileElement/FolderElement를 알아야 함
export interface Visitor {
    visitFile(file: FileElement): void;
    visitFolder(folder: FolderElement): void;
}

// 2. Element 인터페이스 (방문 대상)
// (참고) Element는 Visitor를 알아야 함
export interface Element {
    accept(visitor: Visitor): void;
}

// 3. ConcreteElement A (FileElement - 구체적인 방문 대상 1)
// Element 인터페이스 구현
export class FileElement implements Element {
    constructor(public name: string, public size: number) {}

    /* * PDF 예제 코드 반영 (accept)
     * Element가 Visitor를 "받아들임" (accept)
     * 자신에게 맞는 visitFile 메서드 호출
     */
    accept(visitor: Visitor): void {
        visitor.visitFile(this);
    }
}

// 4. ConcreteElement B (FolderElement - 구체적인 방문 대상 2)
// Element 인터페이스 구현
export class FolderElement implements Element {
    constructor(public name: string, public children: Element[]) {}

    accept(visitor: Visitor): void {
        visitor.visitFolder(this);
    }
}


// --- PDF 예제 4: ConcreteVisitor (구체적인 방문자/연산) ---

// 5. ConcreteVisitor A (SizeCalculator)
// Visitor 인터페이스 구현
export class SizeCalculator implements Visitor {
    private totalSize = 0;

    // 파일: 크기 누적
    visitFile(file: FileElement): void {
        this.totalSize += file.size;
    }

    // 폴더: 자식 순회 및 방문 위임
    visitFolder(folder: FolderElement): void {
        folder.children.forEach(child => child.accept(this));
    }

    // PDF 실행 예시용 결과 반환
    getTotalSize(): number {
        return this.totalSize;
    }
}

// 6. ConcreteVisitor B (NamePrinter)
// Visitor 인터페이스 구현
export class NamePrinter implements Visitor {
    // Vue 화면 출력을 위한 로그 저장
    private logs: string[] = [];

    // 파일: 이름 출력
    visitFile(file: FileElement): void {
        const msg = `파일: ${file.name}`;
        console.log(msg);
        this.logs.push(msg);
    }

    // 폴더: 이름 출력 후, 자식 순회
    visitFolder(folder: FolderElement): void {
        const msg = `폴더: ${folder.name}`;
        console.log(msg);
        this.logs.push(msg);
        folder.children.forEach(child => child.accept(this));
    }

    // Vue 컴포넌트용 로그 반환
    getLogs(): string[] {
        return this.logs;
    }
}