import localeMessageBox from '@/components/message-box/locale/en-US';
import localeLogin from '@/views/login/locale/en-US';

import localeWorkplace from '@/views/dashboard/workplace/locale/en-US';
import DailyProduction from '@/views/report/F_SCM_DailyProduction_Output/locale/en-US';
import F_PERMISSION_MANGE from '@/views/permission/F_PERMISSION_MANGE/locale/en-US';

import localbaoyangdetail from '@/views/device_management/maintenanceDetails/locale/en-US';
import localDeviceMain from '@/views/device_management/Kanban_device_A/locale/en-US';
import localrepairdetail from '@/views/device_management/repairDetails/locale/en-US';
import localeSettings from './en-US/settings';

export default {
  'APP.Platform.Name': 'Kanban Production Management',
  'menu.dashboard': 'Dashboard',
  'menu.server.dashboard': 'Dashboard-Server',
  'menu.server.workplace': 'Workplace-Server',
  'menu.server.monitor': 'Monitor-Server',
  'menu.list': 'List',
  'menu.result': 'Result',
  'menu.exception': 'Exception',
  'menu.form': 'Form',
  'menu.profile': 'Profile',
  'menu.visualization': 'Data Visualization',
  'menu.user': 'User Center',
  'menu.arcoWebsite': 'Arco Design',
  'menu.faq': 'FAQ',
  'navbar.docs': 'Docs',
  'navbar.action.locale': 'Switch to English',
  'menu.manufact_mange': 'Production management',
  'menu.manufact_report': 'Production report',
  'menu.permission_mange': 'Rights Management',
  'menu.manufact_report.F_SCM_DailyProduction_Output':
    'Daily production report',
  'menu.permission_mange.F_PERMISSION_MANGE': 'Permission settings',
  'menu.device_manage': 'Equipment management',
  'menu.device_manage.Kanban_device_A': 'Digital Device Management Dashboard',
  'menu.device_manage.maintenanceDetails': 'Maintenance status details page',
  'menu.device_manage.repairDetails': 'Maintenance Status Details Page',
  ...localeSettings,
  ...localeMessageBox,
  ...localeLogin,
  ...localeWorkplace,
  ...DailyProduction,
  ...F_PERMISSION_MANGE,
  ...localbaoyangdetail,
  ...localDeviceMain,
  ...localrepairdetail,
};
