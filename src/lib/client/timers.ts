export const validateTimer = (name: string, workTime: number, breakTime: number): boolean => {
    if (name.length === 0) {alert("타이머 이름을 입력해주세요!"); return false;}
    if (workTime < 1 || workTime > 60) {alert("공부 시간은 1분 이상 60분 이하로 설정해주세요!"); return false;}
    if (breakTime < 1 || breakTime > 60) {alert("휴식 시간은 1분 이상 60분 이하로 설정해주세요!"); return false;}
    return true;
}

export const createTimer = async (name: string, workTime: number, breakTime: number): Promise<boolean> => {
    const response = await fetch('/api/timers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, workTime, breakTime }),
    });
    if (!response.ok) return false;
    const data = await response.json();
    return (data.timer !== null);
}
