/* --- 1. Product (생성할 복잡한 객체) ---
 * User 객체 인터페이스 정의
 */
export interface User {
    name: string; // 필수
    age?: number; // 선택
    email?: string; // 선택
    permissions?: string[]; // 선택
}

/* --- 2. ConcreteBuilder (구체적인 빌더) ---
 * User 객체의 생성 과정을 단계별로 구현
 */
export class UserBuilder {
    // 생성 중인 객체를 Partial<User> (부분) 타입으로 관리
    private user: Partial<User> = {};

    // 필수 값(name)은 생성자에서 받음
    constructor(name: string) {
        this.user.name = name;
    }

    // --- 3. 객체 조립 메서드 (Fluent Interface) ---

    // 'this'를 반환하여 메서드 체이닝(chaining)이 가능하도록 함
    setAge(age: number): this {
        this.user.age = age;
        return this; // 'this'를 반환
    }

    setEmail(email: string): this {
        this.user.email = email;
        return this; // 'this'를 반환
    }

    setPermissions(permissions: string[]): this {
        this.user.permissions = permissions;
        return this; // 'this'를 반환
    }

    // --- 4. 최종 객체 반환 ---
    build(): User {
        // build() 시점에 완성된 User 객체 반환
        // (필요시 이 시점에 유효성 검사 로직 추가 가능)
        return this.user as User;
    }
}