import dayjs from 'dayjs';
// plugins: https://day.js.org/docs/en/plugin/plugin
import customParseFormat from 'dayjs/plugin/customParseFormat';
import localeData from 'dayjs/plugin/localeData';
import localizedFormat from 'dayjs/plugin/localizedFormat';

import 'dayjs/locale/vi';

dayjs.extend(customParseFormat);
dayjs.extend(localizedFormat);
dayjs.extend(localeData);

dayjs.locale('vi');
