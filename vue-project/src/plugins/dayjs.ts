// import dayjs from 'dayjs';

// export default {
//   install(app) {
//     app.config.globalProperties.$dayjs = dayjs;
//   }
// };

import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn'; // 导入中文本地化
import 'dayjs/locale/es'; // 导入西班牙语本地化
import updateLocale from 'dayjs/plugin/updateLocale';

dayjs.extend(updateLocale);

export default {
  install(app:any, options:any) {
    // 设置默认本地化
    dayjs.locale(options.locale);

    // 添加全局方法
    app.config.globalProperties.$dayjs = dayjs;
  }
};