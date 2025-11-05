/* --- 1. 복잡한 서브시스템 (Subsystem Classes) ---
 * 클라이언트가 직접 제어하기 번거로운 하위 클래스들
 */

// 1-1. 앰프 시스템
export class Amplifier {
    turnOn = (): string => "앰프 켜짐";
    setVolume = (level: number): string => `앰프 볼륨 ${level}로 설정`;
    setSource = (source: string): string => `앰프 입력 ${source}로 변경`;
    turnOff = (): string => "앰프 꺼짐";
}

// 1-2. DVD 플레이어
export class DvdPlayer {
    turnOn = (): string => "DVD 플레이어 켜짐";
    play = (movie: string): string => `DVD 플레이어 '${movie}' 재생 시작`;
    turnOff = (): string => "DVD 플레이어 꺼짐";
}

// 1-3. 프로젝터
export class Projector {
    turnOn = (): string => "프로젝터 켜짐";
    setInput = (source: string): string => `프로젝터 입력 ${source}로 설정`;
    turnOff = (): string => "프로젝터 꺼짐";
}


/* --- 2. 퍼사드 (Facade) ---
 * 클라이언트가 사용할 단일 창구.
 * 서브시스템의 제어를 대신 수행.
 */
export class HomeTheaterFacade {
    // 서브시스템의 인스턴스를 참조
    private amp: Amplifier;
    private dvd: DvdPlayer;
    private proj: Projector;

    constructor(amp: Amplifier, dvd: DvdPlayer, proj: Projector) {
        this.amp = amp;
        this.dvd = dvd;
        this.proj = proj;
    }

    /* *
     * 퍼사드의 핵심 메서드 (1).
     * 클라이언트는 이 메서드 하나만 호출.
     * (수정) Vue 화면 출력을 위해 string[] 로그 반환
     */
    watchMovie(movie: string): string[] {
        const logs: string[] = [];
        logs.push("--- 영화 볼 준비 시작 ---");
        logs.push(this.amp.turnOn());
        logs.push(this.amp.setSource("DVD"));
        logs.push(this.amp.setVolume(10));
        logs.push(this.dvd.turnOn());
        logs.push(this.proj.turnOn());
        logs.push(this.proj.setInput("DVD"));
        logs.push(this.dvd.play(movie));
        logs.push("--- 영화 재생 ---");
        return logs;
    }

    /* *
     * 퍼사드의 핵심 메서드 (2).
     */
    endMovie(): string[] {
        const logs: string[] = [];
        logs.push("--- 영화 관람 종료 ---");
        logs.push(this.amp.turnOff());
        logs.push(this.dvd.turnOff());
        logs.push(this.proj.turnOff());
        return logs;
    }
}