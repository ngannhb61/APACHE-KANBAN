import localeMessageBox from '@/components/message-box/locale/yn-VN';
import localeLogin from '@/views/login/locale/yn-VN';
import F_PERMISSION_MANGE from '@/views/permission/F_PERMISSION_MANGE/locale/yn-VN';

import localbaoyangdetail from '@/views/device_management/maintenanceDetails/locale/yn-VN';
import localProcessLineVN from '@/views/dashboard/ProcessLineDashboard/locale/yn-VN';
import localDeviceMain from '@/views/device_management/Kanban_device_A/locale/yn-VN';
import localrepairdetail from '@/views/device_management/repairDetails/locale/yn-VN';
import localeSettings from './yn-VN/settings';

export default {
  'APP.Platform.Name': 'Kanban quản lý sản xuất',
  'menu.dashboard': 'Bảng điều khiển',
  'menu.server.dashboard': 'Bảng điều khiển - cuối máy chủ',
  'menu.server.workplace': 'Nơi làm việc - Dịch vụ',
  'menu.server.monitor': 'Giám sát thời gian thực - máy chủ',
  'menu.list': 'Danh sách',
  'menu.result': 'Kết quả',
  'menu.exception': 'Ngoại lệ',
  'menu.form': 'Trang mẫu',
  'menu.profile': 'Thông tin',
  'menu.visualization': 'Trực quan hóa dữ liệu',
  'menu.user': 'Người dùng',
  'menu.arcoWebsite': 'Arco Design',
  'menu.faq': 'Vấn đề thường gặp',
  'navbar.docs': 'Tài liệu',
  'navbar.action.locale': 'Chuyển sang tiếng Việt',
  'menu.list.searchTable': 'Bảng tìm kiếm',
  'menu.manufact_mange': 'Quản lý sản xuất',
  'menu.manufact_report': 'Quản lý báo cáo',
  'menu.permission_mange': 'Quản lý thẩm quyền',
  'menu.manufact_report.F_SCM_DailyProduction_Output': 'Báo cáo sản xuất hàng ngày',
  'menu.permission_mange.F_PERMISSION_MANGE': 'Cài đặt trình đơn',
  'menu.device_manage': 'Quản lý thiết bị',
  'menu.device_manage.Kanban_device_A': 'Quản lý thiết bị kỹ thuật số Kanban',
  'menu.device_manage.maintenanceDetails': 'Trang chi tiết tình trạng bảo trì',
  'menu.device_manage.repairDetails': 'Trang chi tiết tình trạng sửa chữa',
  ...localeSettings,
  ...localeMessageBox,
  ...localeLogin,
  ...F_PERMISSION_MANGE,
  ...localbaoyangdetail,
  ...localProcessLineVN,
  ...localDeviceMain,
  ...localrepairdetail,
};
