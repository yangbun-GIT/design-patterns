// --- PDF [3.A] Eager Initialization (즉시 초기화) 예제 ---
export class EagerSingleton {
    // 클래스 로드 시점에 인스턴스 미리 생성
    private static readonly instance: EagerSingleton = new EagerSingleton();

    // private 생성자로 외부 생성 방지
    private constructor() {
        console.log("EagerSingleton: 인스턴스 생성됨");
    }

    // static 메서드로 유일한 인스턴스 접근
    public static getInstance(): EagerSingleton {
        console.log("EagerSingleton: getInstance() 호출");
        return EagerSingleton.instance;
    }

    public sayHello(): string {
        return "안녕하세요! 저는 싱글톤 인스턴스입니다 👋";
    }
}

// --- PDF [3.B] Static Block Initialization (정적 블록 초기화) 예제 ---
export class StaticBlockSingleton {
    private static instance: StaticBlockSingleton;

    private constructor() {
        console.log("StaticBlockSingleton: 인스턴스 생성됨");
    }

    // static 블록 내에서 생성 (TS 4.4+)
    static {
        try {
            StaticBlockSingleton.instance = new StaticBlockSingleton();
            console.log("✔️ StaticBlockSingleton: 인스턴스 생성 완료.");
        } catch (error) {
            console.error("StaticBlockSingleton: 생성 오류", error);
        }
    }

    public static getInstance(): StaticBlockSingleton {
        console.log("StaticBlockSingleton: getInstance() 호출");
        return StaticBlockSingleton.instance;
    }

    public greet(): string {
        return "안녕하세요! 저는 static block으로 생성된 싱글톤입니다 👋";
    }
}

// --- PDF [3.C] Lazy Initialization (지연 초기화) 예제 ---
export class LazySingleton {
    private static instance: LazySingleton | null = null;

    private constructor() {
        console.log("LazySingleton: 인스턴스 생성됨");
    }

    public static getInstance(): LazySingleton {
        console.log("LazySingleton: getInstance() 호출");
        // 최초 호출 시에만 인스턴스 생성
        if (LazySingleton.instance === null) {
            console.log("LazySingleton: 인스턴스 신규 생성.");
            LazySingleton.instance = new LazySingleton();
        }
        return LazySingleton.instance;
    }

    public say(): string {
        return "lazy로 생성된 싱글톤입니다 👋";
    }
}
