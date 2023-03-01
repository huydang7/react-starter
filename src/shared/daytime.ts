import dayjs from "dayjs";

// plugins: https://day.js.org/docs/en/plugin/plugin
import customParseFormat from "dayjs/plugin/customParseFormat";
import localizedFormat from "dayjs/plugin/localizedFormat";
import localeData from "dayjs/plugin/localeData";

dayjs.extend(customParseFormat);
dayjs.extend(localizedFormat);
dayjs.extend(localeData);

require("dayjs/locale/vi");
dayjs.locale("vi");
