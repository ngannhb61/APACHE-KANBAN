/* eslint-disable prettier/prettier */
import { scmpost, ResultParameter } from '@/api/scmapi';

export interface orgData {
  org_code: string;
  org_name: string;
}
export interface factoryareaData {
  code: string;
  org: string;
}
export interface maintenanceData {
  KEY: string;
  ADDRESS: string;
  SNID: string;
  DEVICE_NAME: string;
  BODY_PART: string;
  ITEM: string;
  PLAN_FINISHDATE: string;
}
export interface repairData {
  KEY: string;
  ADDRESS: string;
  SNID: string;
  DEVICE_NAME: string;
  BZ_REMARK: string;
  BZ_USER: string;
  BZ_DATE: string;
}
export interface DevicestatusData {
  RATE: number;
  DEVICE_STATUS: string;
  NAME: string;
}
export interface MaintenanceRateData {
  ONERATE: number;
  TWORATE: number;
}
export interface RepairRateData {
  REPAIRINGRATE: number;
  FINISHDATA: number;
  WAITRATE: number;
}
export interface PolicyListRes {
  list: any[];
}
export async function Getorg() {
  const result: PolicyListRes = { list: [] };
  const data: ResultParameter = await scmpost(
    'KZ_WMSAPI',
    'KZ_WMSAPI.Controllers.F_WMS_Miscellaneous_Server',
    'LoadOrg',
    {},
    'auto-scheduling'
  );
  if (!data.IsSuccess) {
    throw new Error(data.ErrMsg);
  } else {
    result.list = JSON.parse(data.RetData) as orgData[];
    return result;
  }
}
export async function Getfactory() {
  const result: PolicyListRes = { list: [] };
  const data: ResultParameter = await scmpost(
    'KZ_SFCAPI',
    'KZ_SFCAPI.Controllers.ProductionDashBoardServer',
    'LoadPlant',
    {},
    'auto-scheduling'
  );
  if (!data.IsSuccess) {
    throw new Error(data.ErrMsg);
  } else {
    if (data.RetData !== '') {
      result.list = JSON.parse(data.RetData) as factoryareaData[];
    }
    return result;
  }
}
export async function GetMaintenanceList(param: any) {
  const result: PolicyListRes = { list: [] };
  const data: ResultParameter = await scmpost(
    'KZ_EPMAPI',
    'KZ_EPMAPI.Controllers.MachineKanBanServer',
    'GetMaintenanceList',
    {
      org_id: param.selectorg,
    },
    'auto-scheduling'
  );
  if (!data.IsSuccess) {
    // console.log(data.ErrMsg);
    throw new Error(`${data.ErrMsg}(GetMaintenanceList)`);
  } else {
    if (data.RetData !== '') {
      result.list = JSON.parse(data.RetData) as maintenanceData[];
    }

    return result;
  }
}
export async function RepairList(param: any) {
  const result: PolicyListRes = { list: [] };
  const data: ResultParameter = await scmpost(
    'KZ_EPMAPI',
    'KZ_EPMAPI.Controllers.MachineKanBanServer',
    'GetRepairList',
    {
      org_id: param.selectorg,
    },
    'auto-scheduling'
  );
  if (!data.IsSuccess) {
    // console.log(data.ErrMsg);
    throw new Error(`${data.ErrMsg}(GetRepairList)`);
  } else {
    if (data.RetData !== '') {
      result.list = JSON.parse(data.RetData) as repairData[];
    }

    return result;
  }
}
export async function DevicestatusRate(param: any) {
  const result: PolicyListRes = { list: [] };
  const data: ResultParameter = await scmpost(
    'KZ_EPMAPI',
    'KZ_EPMAPI.Controllers.MachineKanBanServer',
    'DevicestatusRate',
    {
      org_id: param.selectorg,
    },
    'auto-scheduling'
  );
  if (!data.IsSuccess) {
    // console.log(data.ErrMsg);
    throw new Error(`${data.ErrMsg}(DevicestatusRate)`);
  } else {
    if (data.RetData !== '') {
      result.list = JSON.parse(data.RetData) as DevicestatusData[];
    }
    return result;
  }
}
export async function MaintenanceCompletionRate(param: any) {
  const result: PolicyListRes = { list: [] };
  const data: ResultParameter = await scmpost(
    'KZ_EPMAPI',
    'KZ_EPMAPI.Controllers.MachineKanBanServer',
    'MaintenanceCompletionRate',
    {
      org_id: param.selectorg,
      date_begin: param.selectdate[0],
      date_end: param.selectdate[1],
    },
    'auto-scheduling'
  );
  if (!data.IsSuccess) {
    // console.log(data.ErrMsg);
    throw new Error(`${data.ErrMsg}(MaintenanceCompletionRate)`);
  } else {
    if (data.RetData !== '') {
      result.list = JSON.parse(data.RetData) as MaintenanceRateData[];
    }

    return result;
  }
}
export async function RepairCompletionRate(param: any) {
  const result: PolicyListRes = { list: [] };
  const data: ResultParameter = await scmpost(
    'KZ_EPMAPI',
    'KZ_EPMAPI.Controllers.MachineKanBanServer',
    'RepairCompletionRate',
    {
      org_id: param.selectorg,
      date_begin: param.selectdate[0],
      date_end: param.selectdate[1],
    },
    'auto-scheduling'
  );
  if (!data.IsSuccess) {
    // console.log(data.ErrMsg);
    throw new Error(`${data.ErrMsg}(RepairCompletionRate)`);
  } else {
    if (data.RetData !== '') {
      result.list = JSON.parse(data.RetData) as RepairRateData[];
    }

    return result;
  }
}
export async function GetMaintenanceDetail01(param: any) {
  const result: PolicyListRes = { list: [] };
  const data: ResultParameter = await scmpost(
    'KZ_EPMAPI',
    'KZ_EPMAPI.Controllers.MachineKanBanServer',
    'GetMaintenanceDetail_01',
    {
      org_id: param.selectorg,
      date_begin: param.selectdate[0],
      date_end: param.selectdate[1],
      udf05: param.factory_area,
    },
    'auto-scheduling'
  );
  if (!data.IsSuccess) {
    // (data.ErrMsg);
    throw new Error(`${data.ErrMsg}(GetMaintenanceDetail_01)`);
  } else {
    if (data.RetData !== '') {
      result.list = JSON.parse(data.RetData) as any;
    }

    return result;
  }
}
export async function GetMaintenanceDetail02(param: any) {
  const result: PolicyListRes = { list: [] };
  const data: ResultParameter = await scmpost(
    'KZ_EPMAPI',
    'KZ_EPMAPI.Controllers.MachineKanBanServer',
    'GetMaintenanceDetail_02',
    {
      org_id: param.selectorg,
      date_begin: param.selectdate[0],
      date_end: param.selectdate[1],
      udf05: param.factory_area,
    },
    'auto-scheduling'
  );
  if (!data.IsSuccess) {
    // console.log(data.ErrMsg);
    throw new Error(`${data.ErrMsg}(GetMaintenanceDetail_02)`);
  } else {
    if (data.RetData !== '') {
      result.list = JSON.parse(data.RetData) as any;
    }

    return result;
  }
}
export async function GetRepairDetail(param: any) {
  const result: PolicyListRes = { list: [] };
  const data: ResultParameter = await scmpost(
    'KZ_EPMAPI',
    'KZ_EPMAPI.Controllers.MachineKanBanServer',
    'GetRepairDetail',
    {
      org_id: param.selectorg,
      date_begin: param.selectdate[0],
      date_end: param.selectdate[1],
      udf05: param.factory_area,
    },
    'auto-scheduling'
  );
  if (!data.IsSuccess) {
    // console.log(data.ErrMsg);
    throw new Error(`${data.ErrMsg}(GetRepairDetail)`);
  } else {
    if (data.RetData !== '') {
      result.list = JSON.parse(data.RetData) as any;
    }

    return result;
  }
}
export async function GetToplist() {
  const result: PolicyListRes = { list: [] };
  const data: ResultParameter = await scmpost(
    'KZ_EPMAPI',
    'KZ_EPMAPI.Controllers.MachineKanBanServer',
    'GetToplist',
    {},
    'auto-scheduling'
  );
  if (!data.IsSuccess) {
    // console.log(data.ErrMsg);
    throw new Error(`${data.ErrMsg}(GetToplist)`);
  } else {
    if (data.RetData !== '') {
      result.list = JSON.parse(data.RetData) as any;
    }

    return result;
  }
}
