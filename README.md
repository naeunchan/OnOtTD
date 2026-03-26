# 온옷티디

앱인토스 React Native + Granite + SDK 2.x 기준의 미니앱 MVP 스캐폴드입니다.

## 포함 범위

- 온보딩
- 아바타 설정
- 홈
- 설정
- 실날씨 + 실패 시 mock 폴백 추천 로직
- 앱인토스 `Storage` 기반 사용자 설정 저장

## 실행 전 확인

- 이 프로젝트는 Expo 앱이 아닙니다.
- `@apps-in-toss/framework`와 `@toss/tds-react-native`를 설치할 수 있는 환경이 필요합니다.
- 샌드박스 앱에서 `intoss://onottd` 스킴으로 테스트하는 전제를 가집니다.

## 주요 스크립트

```bash
npm install
npm run dev
npm run typecheck
npm run build
npm run test
```

## 샌드박스 로컬 테스트

1. `npm run dev`로 개발 서버를 실행합니다.
2. 샌드박스 앱에서 `intoss://onottd`를 엽니다.
3. Android는 `adb reverse tcp:8081 tcp:8081`와 `adb reverse tcp:5173 tcp:5173`를 연결합니다.
4. iOS 실기기는 같은 Wi-Fi와 로컬 네트워크 권한이 필요합니다.
5. 위치 권한 허용/거부 각각에서 홈 진입과 폴백 문구를 확인합니다.

## 샌드박스 실기기 점검 시나리오

1. 연결 확인
   `npm run dev` 실행 후 샌드박스 앱에서 `intoss://onottd`를 열고, Android는 `adb reverse` 8081/5173이 연결되어야 합니다.
2. 위치 허용
   홈 상단에 `현재 위치 실황` 배지와 `현재 위치` 텍스트가 보여야 합니다.
3. 위치 거부
   홈 상단에 `기본 지역 실황` 배지와 권한 허용 시 현재 위치 기준으로 바뀐다는 안내 문구가 보여야 합니다.
4. 실날씨 실패
   `mock 폴백` 배지와 `실시간 날씨 다시 시도` 버튼이 보여야 합니다.
5. 설정 테스트 모드
   설정의 `샌드박스 날씨 모드`에서 `실시간 날씨 강제`, `기본 지역 실황 강제`, `mock 데이터 강제`를 저장해 홈 재현이 되는지 확인합니다.

## 현재 데이터 소스

- 기본값은 `src/features/weather/liveWeatherRepository.ts`입니다.
- 위치 권한이 있으면 현재 위치 날씨를 사용합니다.
- 위치 권한이 없으면 기본 좌표의 실날씨를 사용합니다.
- 외부 API 실패 시 `src/features/weather/mockWeatherRepository.ts`로 폴백합니다.

## 빌드 시점 환경 변수

필수는 아니고, 기본값으로도 동작합니다. 로컬 시작 시에는 `.env.example`를 참고해 필요한 값만 셸 환경 변수로 주입하면 됩니다.

```bash
ONOTTD_WEATHER_MODE=live
ONOTTD_DEFAULT_LATITUDE=37.5447
ONOTTD_DEFAULT_LONGITUDE=127.0561
ONOTTD_DEFAULT_LOCATION_NAME=서울 성수동
ONOTTD_OPEN_METEO_WEATHER_URL=https://api.open-meteo.com/v1/forecast
ONOTTD_OPEN_METEO_AIR_QUALITY_URL=https://air-quality-api.open-meteo.com/v1/air-quality
```

## 릴리즈 전 최소 체크리스트

1. `npm run typecheck`
2. `npm test -- --watch=false`
3. `npm run build`
4. 생성된 `onottd.ait`를 샌드박스 앱과 콘솔 업로드 전 점검합니다.
5. `granite.config.ts`의 브랜드 아이콘은 현재 개발용 기본 URL이므로, 실제 배포 전에는 서비스 전용 아이콘 URL로 교체합니다.
