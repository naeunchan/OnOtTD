export interface SandboxChecklistSection {
  title: string;
  description: string;
  tone?: 'default' | 'warning';
}

export const sandboxChecklistSections: SandboxChecklistSection[] = [
  {
    title: '연결 확인',
    description: '`npm run dev` 실행 후 샌드박스 앱에서 `intoss://onottd`를 열고, Android는 `adb reverse` 8081/5173을 확인합니다.',
  },
  {
    title: '위치 허용 시',
    description: '홈 상단에 `현재 위치 실황`이 보이고 위치명이 `현재 위치`로 바뀌는지 확인합니다.',
  },
  {
    title: '위치 거부 시',
    description: '홈 상단에 `기본 지역 실황`이 보이고, 설정에서 권한을 허용하면 현재 위치 기준으로 바뀐다는 안내 문구를 확인합니다.',
    tone: 'warning',
  },
  {
    title: '실날씨 실패 시',
    description: '`mock 폴백` 배지와 `실시간 날씨 다시 시도` 버튼이 보이는지 확인합니다.',
    tone: 'warning',
  },
];
