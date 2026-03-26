import { appsInToss } from '@apps-in-toss/framework/plugins';
import { env } from '@granite-js/plugin-env';
import { router } from '@granite-js/plugin-router';
import { defineConfig } from '@granite-js/react-native/config';

export default defineConfig({
  scheme: 'intoss',
  appName: 'onottd',
  plugins: [
    appsInToss({
      brand: {
        displayName: '온옷티디',
        primaryColor: '#2274F5',
        icon: '',
      },
      permissions: [
        {
          name: 'geolocation',
          access: 'access',
        },
      ],
    }),
    env({
      ONOTTD_WEATHER_MODE: process.env.ONOTTD_WEATHER_MODE ?? 'live',
      ONOTTD_DEFAULT_LATITUDE: process.env.ONOTTD_DEFAULT_LATITUDE ?? '37.5447',
      ONOTTD_DEFAULT_LONGITUDE: process.env.ONOTTD_DEFAULT_LONGITUDE ?? '127.0561',
      ONOTTD_DEFAULT_LOCATION_NAME: process.env.ONOTTD_DEFAULT_LOCATION_NAME ?? '서울 성수동',
      ONOTTD_OPEN_METEO_WEATHER_URL: process.env.ONOTTD_OPEN_METEO_WEATHER_URL ?? 'https://api.open-meteo.com/v1/forecast',
      ONOTTD_OPEN_METEO_AIR_QUALITY_URL:
        process.env.ONOTTD_OPEN_METEO_AIR_QUALITY_URL ?? 'https://air-quality-api.open-meteo.com/v1/air-quality',
    }),
    router(),
  ],
});
