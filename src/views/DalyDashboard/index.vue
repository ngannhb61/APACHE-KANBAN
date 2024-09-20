<template>
    <dv-full-screen-container class="full">
      <VScaleScreen width="1920" height="1080" :full-screen="true">
        <Header
            :title="'INFORMATION LINE'"
            line-color="rgba(14,228,249, 1)"
            :center-style="{ color: '#0EE4F9', fontSize: '40px' }"
            :right-style="{ color: 'white' }"
        ></Header>
        <div class="container parent-column">
          <a-row class="max-height" :gutter="24">
            <!-- 左边 -->
            <!-- 中间 -->
            <a-col class="max-height max-width" :span="24">
              <div class="max-height flex-column">
                <div class="selector-title"
                  >{{ $t('ProcessLineDashboard.center.title1') }}：
                  <a-select
                    v-model="productionGroup"
                    size="large"
                    :style="{ width: '250px' }"
                    @change="handleChangeProGroup"
                  >
                  <a-option
                    v-for="item in productionGroupOptions"
                    :key="item.value"
                    :value="item.value"
                    style="font-size: 20px"
                    >{{ item.name }}
                  </a-option>
                  </a-select>
                  <span
                    style="margin-left: 15px; color: #fd2104; font-size: 20px"
                    >{{ errorMsg }}</span
                  >
                </div>
                <div style="padding-bottom: 12px; flex: 1.4">
                    <dv-border-box-12 :color="['#2E6099', '#0EE4F9']">
                      <div class="max-height max-width padding-15">
                          <div class="vertical-line">
                            {{$t('ProcessLineDashboard.left.title1')}}
                          </div>
                      
                        <div class="production-box" style="margin-top: 20px">
                          <div class="sub">
                              <a-statistic
                                  title="DAILY TARGET"
                                  :value="productionInfo.workQty"
                                  :value-from="0"
                                  :value-style="{ color: '#fe7007' }"
                                  style="margin-top: 50px;"
                                  class="production-info"
                                  animation
                                  show-group-separator
                              >
                              </a-statistic>
                            <div class="mark"></div>
                          </div>
    
                          <div class="sub" style="margin-right: 0">
                            <a-statistic
                              title="ACTUAL OUTPUT"
                              :value="productionInfo.labelQty"
                              :value-from="0"
                              :value-style="{ color: '#0AF60A' }"
                              style="margin-top: 50px;"
                              class="production-info"
                              animation
                              show-group-separator
                            >
                            </a-statistic>
                            <div class="mark"></div>
                          </div>
                        </div>
                        <div class="production-box">
                          <div class="sub">
                            <a-statistic
                              title="DAILY RATE"
                              :value="productionInfo.percentRate"
                              :value-from="0"
                              :precision="1"
                              :value-style="{
                                color: productionAchievementRateColor,
                              }"
                              style="margin-top: 50px;"
                              class="production-info"
                              animation
                            >
                              <template #suffix>%</template>
                            </a-statistic>
                            <div class="mark"></div>
                          </div>
    
                          <div class="sub" style="margin-right: 0">
                            <a-statistic
                              title="% RFT"
                              :value="productionInfo.rft"
                              :value-from="0"
                              :precision="1"
                              :value-style="{ color: dayRFTColor }"
                              style="margin-top: 50px;"
                              class="production-info"
                              animation
                            >
                              <template #suffix>%</template>
                            </a-statistic>
                            <div class="mark"></div>
                          </div>
                      </div>
                    </div>
                  </dv-border-box-12>
                </div>
              </div>
            </a-col>
            <!-- 右边 -->
          </a-row>

          <!-- --------------- -->

          <a-row class="max-height" :gutter="24">
            <!-- 左边 -->
            <!-- 中间 -->
            <a-col class="max-height max-width" :span="24">
              <div class="max-height flex-column">
                <div class="selector-title"
                  >{{ $t('ProcessLineDashboard.center.title1') }}：
                  <a-select
                    v-model="productionGroup2"
                    size="large"
                    :style="{ width: '250px' }"
                    @change="handleChangeProGroup2"
                  >
                  <a-option
                    v-for="item in productionGroupOptions2"
                    :key="item.value"
                    :value="item.value"
                    style="font-size: 20px"
                    >{{ item.name }}
                  </a-option>
                  </a-select>
                  <span
                    style="margin-left: 15px; color: #fd2104; font-size: 20px"
                    >{{ errorMsg }}</span
                  >
                </div>
                <div style="padding-bottom: 12px; flex: 1.4">
                    <dv-border-box-12 :color="['#2E6099', '#0EE4F9']">
                      <div class="max-height max-width padding-15">
                          <div class="vertical-line">
                            {{$t('ProcessLineDashboard.left.title1')}}
                          </div>
                      
                        <div class="production-box" style="margin-top: 20px">
                          <div class="sub">
                              <a-statistic
                                  title="DAILY TARGET"
                                  :value="productionInfo2.workQty"
                                  :value-from="0"
                                  :value-style="{ color: '#fe7007' }"
                                  style="margin-top: 50px;"
                                  class="production-info"
                                  animation
                                  show-group-separator
                              >
                              </a-statistic>
                            <div class="mark"></div>
                          </div>
    
                          <div class="sub" style="margin-right: 0">
                            <a-statistic
                              title="ACTUAL OUTPUT"
                              :value="productionInfo2.labelQty"
                              :value-from="0"
                              :value-style="{ color: '#0AF60A' }"
                              style="margin-top: 50px;"
                              class="production-info"
                              animation
                              show-group-separator
                            >
                            </a-statistic>
                            <div class="mark"></div>
                          </div>
                        </div>
                        <div class="production-box">
                          <div class="sub">
                            <a-statistic
                              title="DAILY RATE"
                              :value="productionInfo2.percentRate"
                              :value-from="0"
                              :precision="1"
                              :value-style="{
                                color: productionAchievementRateColor2,
                              }"
                              style="margin-top: 50px;"
                              class="production-info"
                              animation
                            >
                              <template #suffix>%</template>
                            </a-statistic>
                            <div class="mark"></div>
                          </div>
    
                          <div class="sub" style="margin-right: 0">
                            <a-statistic
                              title="% RFT"
                              :value="productionInfo2.rft"
                              :value-from="0"
                              :precision="1"
                              :value-style="{ color: dayRFTColor2 }"
                              style="margin-top: 50px;"
                              class="production-info"
                              animation
                            >
                              <template #suffix>%</template>
                            </a-statistic>
                            <div class="mark"></div>
                          </div>
                      </div>
                    </div>
                  </dv-border-box-12>
                </div>
              </div>
            </a-col>
            <!-- 右边 -->
          </a-row>
        </div>
      </VScaleScreen>
    </dv-full-screen-container>
  </template>
  
  <script lang="ts" setup>
    import Header from '@/components/header/index.vue';
    import { ref, onMounted, reactive, onBeforeUnmount } from 'vue';
    import VCharts from 'vue-echarts';
    import VScaleScreen from 'v-scale-screen';
    import {
      LoadDepartment,
      LoadDepartment2,
      LoadDeptGroup,
      LoadDeptGroup2,
      getEmployeeLeader,
      getProductionLineInfo,
      getProductionLineInfo2,
      getHourProductionInfo,
      getCompletionRate,
      getGroupMembers,
      getPPH,
      getEquipmentManagement,
      getProblemTracking,
      getShoesModelYield,
      getQualityManagement,
    } from '@/api/ProcessLineDashboard';
    import title from '@arco-design/web-vue/es/typography/title';
  
    // 左边-部门领导信息
    const leaderInfo = ref<any>({});
    // 左边-产量信息
    const productionInfo = ref<any>({});
    const productionInfo2 = ref<any>({});

    const productionAchievementRateColor = ref<any>('#FD2104');
      const productionAchievementRateColor2 = ref<any>('#FD2104');

    const dayRFTColor = ref<any>('#FD2104');
      const dayRFTColor2 = ref<any>('#FD2104');
    // 左边-月达成率
    const monthAchievementRateOption = ref<any>({});
    // 左边-当日达成率
    const dayAchievementRateOption = ref<any>({});
    // 左边-PPH
    const dayAndMonthPPHOption = ref<any>({ monthPPH: 0, dayPPH: 0 });
    // 左边-鞋型日产量
    const shoeTypeOption = ref<any>({});
    const shoeTypePageSize = 5;
    let shoeTypeSum: any = [];
    let shoeTypePercent: any = [];
    let shoeTypeName: any = [];
    let shoeTypeValue: any = [];
    let shoeTypeData: any = [];
    let shoeTypePageIndex = 1;
    const pageTitle = ref<any>('INFORMATION LINE');
    // 中间-生产组别
    const productionGroupOptions = ref<any>([]);
    const productionGroup = ref<any>('');

    const productionGroupOptions2 = ref<any>([]);
    const productionGroup2 = ref<any>('');

    const errorMsg = ref<any>('');
    // 中间-每小时生产达成率
    const productionRate = ref<any>({});
    // 中间-当日前五大不良原因
    const qualityManagement = ref<any>({});
    // 中间-品质异常
    const abnormalQuality = ref<any>({});
    // 中间-问题追踪
    const questionTracking = ref<any>({});
    // 中间-未完成度
    const incompleteOption = ref<any>({});
    // 右边-设备管理
    const deviceOption = ref<any>({});
    let devicePercent: any = [];
    let deviceColor: any = [];
    // 右边-组别人员
    const groupMembers = ref<any>({});
    // 右边-面底配套
    const bottomMatching = ref<any>({});
    // 右边-当日未配套订单信息
    const orderInfo = ref<any>({});
    // 刷新数据定时器
    let shoeTypePartTimer: any = 0;
    let kanbanTimer: any = 0;
    // let scrollTimer: any = 0;
    
    const kanbanInterval = 30 * 1000; // 30 seconds in milliseconds
    // 查询参数
    const queryParam = { departmentCode: '' };
    const queryParam2 = { departmentCodee: '' };
  
    // 公共-停止定时器
    function stopInterval() {
      clearInterval(kanbanTimer);
      kanbanTimer = 0;
    }
  
    // 左边-获取生产线基本信息
    // 左边-获取部门领导信息
    const getLeaderInfo = async () => {
      leaderInfo.value = reactive({
        zz: '',
        bz: '',
        fl: '',
      });
      const result = await getEmployeeLeader(queryParam);
      // console.log(result.data);
      if (result.data && result.data.length > 0) {
        const leader = result.data[0];
        const zzName = leader.ZZ_NAME === null ? '' : leader.ZZ_NAME;
        const bzName = leader.BZ_NAME === null ? '' : leader.BZ_NAME;
        const flName = leader.FL_NAME === null ? '' : leader.FL_NAME;
        const zzPhone = leader.ZZ_PHONE === null ? '' : leader.ZZ_PHONE;
        const bzPhone = leader.BZ_PHONE === null ? '' : leader.BZ_PHONE;
        const flPhone = leader.FL_PHONE === null ? '' : leader.FL_PHONE;
        leaderInfo.value.zz = zzName && zzPhone ? `${zzName} ${zzPhone}` : "No data";
        leaderInfo.value.bz = `${bzName} ${bzPhone}`;
        leaderInfo.value.fl = `${flName} ${flPhone}`;
      }
    };
  
    // 左边-获取产量信息
    const getProductionInfo = async () => {
      productionInfo.value = reactive({
        workQty: 0,
        labelQty: 0,
        percentRate: 0,
        rft: 0,
      });
      const result = await getProductionLineInfo(queryParam);
      // console.log(result);
      if (result.data) {
        // 产量日目标:
        productionInfo.value.workQty = result.data.workQty;
        // 实际日产量
        productionInfo.value.labelQty = result.data.labelQty;
        // 产量达成率
        productionInfo.value.percentRate = result.data.percentRate;
        // 日rft
        productionInfo.value.rft = result.data.rft;
        productionAchievementRateColor.value =
          result.data.percentRate >= 100 ? '#0AF60A' : '#FD2104';
        dayRFTColor.value = result.data.rft >= 100 ? '#0AF60A' : '#FD2104';
      }
      // if (!result.status) {
      //   errorMsg.value = result.msg;
      // }
    };


    const getProductionInfo2 = async () => {
      productionInfo2.value = reactive({
        workQty: 0,
        labelQty: 0,
        percentRate: 0,
        rft: 0,
      });
      const result = await getProductionLineInfo2(queryParam2);
      // console.log(result);
      if (result.data) {
        // 产量日目标:
        productionInfo2.value.workQty = result.data.workQty;
        // 实际日产量
        productionInfo2.value.labelQty = result.data.labelQty;
        // 产量达成率
        productionInfo2.value.percentRate = result.data.percentRate;
        // 日rft
        productionInfo2.value.rft = result.data.rft;
        productionAchievementRateColor2.value =
          result.data.percentRate >= 100 ? '#0AF60A' : '#FD2104';
        dayRFTColor2.value = result.data.rft >= 100 ? '#0AF60A' : '#FD2104';
      }
      // if (!result.status) {
      //   errorMsg.value = result.msg;
      // }
    };

    
  
    // 左边-获取IE达成率
    monthAchievementRateOption.value = reactive({
      color: ['#0BC0C4', '#E9E9E9'],
      title: [
        {
          text: '',
          top: '38%',
          textAlign: 'center',
          left: '50%',
          textStyle: {
            color: '#FFFFFF',
            fontSize: 28,
          },
        },
        {
          text: '月达成率',
          top: '53%',
          textAlign: 'center',
          left: '50%',
          textStyle: {
            color: '#FFFFFF',
            fontSize: 18,
          },
        },
      ],
      series: [
        {
          type: 'pie',
          radius: ['65%', '85%'],
          center: ['50%', '50%'],
          label: {
            show: false,
            position: 'center',
          },
          labelLine: {
            show: false,
          },
          selectedMode: 'single',
          selectedOffset: 5,
          data: [],
        },
      ],
    });
  
    dayAchievementRateOption.value = reactive({
      color: ['#CC6600', '#E9E9E9'],
      title: [
        {
          text: '',
          top: '38%',
          textAlign: 'center',
          left: '50%',
          textStyle: {
            color: '#FFFFFF',
            fontSize: 28,
          },
        },
        {
          text: '当日达成率',
          top: '53%',
          textAlign: 'center',
          left: '50%',
          textStyle: {
            color: '#FFFFFF',
            fontSize: 18,
          },
        },
      ],
      series: [
        {
          type: 'pie',
          radius: ['65%', '85%'],
          center: ['50%', '50%'],
          label: {
            show: false,
            position: 'center',
          },
          labelLine: {
            show: false,
          },
          selectedMode: 'single',
          selectedOffset: 5,
          data: [],
        },
      ],
    });
  
    const getIEAchievementRate = async () => {
      monthAchievementRateOption.value.title[0].text = '';
      monthAchievementRateOption.value.series[0].data = [];
      dayAchievementRateOption.value.title[0].text = '';
      dayAchievementRateOption.value.series[0].data = [];
      const result = await getCompletionRate(queryParam);
      if (result.data) {
        const monthData: any = [];
        const dayData: any = [];
        monthData.push({ name: '已完成', value: result.data.monthlyRate });
        monthData.push({ name: '未完成', value: 100 - result.data.monthlyRate });
        monthAchievementRateOption.value.title[0].text = `${result.data.monthlyRate}%`;
        monthAchievementRateOption.value.series[0].data = monthData;
        dayData.push({ name: '已完成', value: result.data.dailyRate });
        dayData.push({ name: '未完成', value: 100 - result.data.dailyRate });
        dayAchievementRateOption.value.title[0].text = `${result.data.dailyRate}%`;
        dayAchievementRateOption.value.series[0].data = dayData;
      }
    };
  
    const getDayAndMonthPPH = async () => {
      const result = await getPPH(queryParam);
      // console.log(result);
      if (result.data) {
        dayAndMonthPPHOption.value.dayPPH = result.data.day_pph;
        dayAndMonthPPHOption.value.monthPPH = result.data.month_pph;
      }
    };
  
    // 左边-获取鞋型日产量
    // 左边-鞋型日产量图形初始化
    shoeTypeOption.value = reactive({
      grid: {
        top: '2%',
        bottom: '2%',
        right: '11%',
        left: '0',
        containLabel: true,
      },
      xAxis: {
        type: 'value',
        axisLabel: {
          show: false,
        },
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        splitLine: {
          show: false,
        },
      },
      yAxis: {
        type: 'category',
        data: [],
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          color: '#ffffff',
          fontSize: 15,
        },
        splitLine: {
          lineStyle: {
            color: '#353A46',
          },
        },
      },
      series: [
        {
          data: [],
          type: 'bar',
          emphasis: {
            focus: 'series',
          },
          barWidth: '35%',
          barGap: '-100%',
          silent: true,
          itemStyle: {
            normal: {
              color: 'rgb(38,57,73)',
              barBorderRadius: 20,
            },
          },
          label: {
            show: true,
            position: 'right',
            color: '#ffffff',
            fontSize: 15,
            formatter: (a: any) => {
              return `${shoeTypePercent[a.dataIndex]}%`;
            },
          },
        },
        {
          data: [],
          type: 'bar',
          barWidth: '35%',
          emphasis: {
            disabled: true,
            focus: 'none',
          },
          itemStyle: {
            normal: {
              color: 'rgb(2,114,252)',
              barBorderRadius: 20,
            },
          },
          label: {
            show: true,
            fontSize: 15,
            color: '#ffffff',
            position: 'inside',
          },
        },
      ],
    });
  
    // 左边-清空鞋型日产量数据
    function clearShoeData() {
      shoeTypeName = [];
      shoeTypeSum = [];
      shoeTypeValue = [];
      shoeTypePercent = [];
    }
  
    // 左边-获取某页鞋型数据
    function getShoePartData() {
      clearShoeData();
      const maxPage =
        shoeTypeData.length % shoeTypePageSize === 0
          ? shoeTypeData.length / shoeTypePageSize
          : shoeTypeData.length / shoeTypePageSize + 1;
      if (shoeTypePageIndex > maxPage) {
        shoeTypePageIndex = 1;
      }
      const len = shoeTypePageIndex * shoeTypePageSize;
      const start = (shoeTypePageIndex - 1) * shoeTypePageSize;
      const end = len > shoeTypeData.length ? shoeTypeData.length : len;
      const data: any = [];
      for (let i = start; i < end; i += 1) {
        data.push(shoeTypeData[i]);
      }
      data.reverse();
      data.forEach((item: any) => {
        shoeTypeName.push(item.NAME_T);
        shoeTypeValue.push(item.LABEL_QTY);
        shoeTypePercent.push(item.RATE);
        shoeTypeSum.push(item.TOTAL);
      });
      shoeTypeOption.value.yAxis.data = shoeTypeName;
      shoeTypeOption.value.series[0].data = shoeTypeSum;
      shoeTypeOption.value.series[1].data = shoeTypeValue;
      shoeTypePageIndex += 1;
    }
  
    // 左边-获取鞋型数据
    const getShoeTypeProduction = async () => {
      clearInterval(shoeTypePartTimer);
      clearShoeData();
      shoeTypePageIndex = 1;
      shoeTypeData = [];
      const result = await getShoesModelYield(queryParam);
      // console.log(result);
      if (result.data && result.data.length > 0) {
        shoeTypeData = result.data;
      }
      getShoePartData();
      if (shoeTypeData.length > shoeTypePageSize) {
        shoeTypePartTimer = setInterval(() => {
          getShoePartData();
        }, 3000);
      }
    };
  
    // 中间-生产组别
    const getProductionGroup = async () => {
      productionGroupOptions.value = [];
      const userDept = await LoadDepartment();
      if (!userDept.status) {
        errorMsg.value = userDept.msg;
        return;
      }
      // console.log(userDept);
      const result = await LoadDeptGroup();
      if (result.data) {
        let groupVal = '';
        result.data.forEach((item: any) => {
          if (!groupVal) {
            groupVal = item.DEPARTMENT_CODE;
          }
          productionGroupOptions.value.push({
            value: item.DEPARTMENT_CODE,
            name: item.DEPARTMENT_NAME,
          });
        });
        productionGroup.value = userDept.data;
        queryParam.departmentCode = userDept.data;
        loadData();
      }
    };

    const getProductionGroup2 = async () => {
      productionGroupOptions2.value = [];
      const userDept = await LoadDepartment2();
      if (!userDept.status) {
        errorMsg.value = userDept.msg;
        return;
      }
      // console.log(userDept);
      const result = await LoadDeptGroup2();
      if (result.data) {
        let groupVal = '';
        result.data.forEach((item: any) => {
          if (!groupVal) {
            groupVal = item.DEPARTMENT_CODE;
          }
          productionGroupOptions2.value.push({
            value: item.DEPARTMENT_CODE,
            name: item.DEPARTMENT_NAME,
          });
        });
        productionGroup2.value = userDept.data;
        queryParam2.departmentCodee = userDept.data;
        loadData();
      }
    };
  
    // 中间-获取每小时生产达成率
    productionRate.value = reactive({
      header: [
        'Time',
        'Target',
        'Actual',
        'Defect',
        'Product %',
        'RFT%',
        'Working hour',
        'PPH',
        'Line time',
      ],
      data: [],
      index: false,
      columnWidth: [109, 100, 95, 100, 105, 95, 150, 95, 90],
      align: [
        'center',
        'center',
        'center',
        'center',
        'center',
        'center',
        'center',
        'center',
        'center',
      ],
      rowNum: [10],
      indexHeader: ['序号'],
      waitTime: 3000000000,
      hoverPause: false,
      headerBGC: '#0C244D',
    });
  
    const getHourProductionRate = async () => {
      productionRate.value.data = [];
      const result = await getHourProductionInfo(queryParam);
      const data: any = [];
      if (result.data && result.data.length > 0) {
        result.data.forEach((item: any) => {
          const targetOutput = `<span style="color:#fe7007">${item.target_output}</span>`;
          const actualOutput = `<span style="color:#0AF60A">${item.actual_output}</span>`;
          const doneColor = item.completion_percentage >= 100 ? '#0AF60A' : '#FD2104';
          const doneRate = `<span style="color:${doneColor}">${item.completion_percentage}</span>`;
          const rftColor = item.rft >= 100 ? '#0AF60A' : '#FD2104';
          const rft = `<span style="color:${rftColor}">${item.rft}</span>`;
          data.push([
            `${item.start}~${item.end}`,
            targetOutput,
            actualOutput,
            item.defective_qty,
            doneRate,
            rft,
            item.operator_person_hour,
            item.pph,
            item.stop_line_minutes,
          ]);
        });
      }
      productionRate.value.data = data;
  
      // console.log(data);
      
    };
  
    // 中间-获取品质管理-当日前五大不良原因
    qualityManagement.value = reactive({
      header: ['Inspection item', 'Defect No.', 'Defect rate'],
      data: [],
      index: false,
      columnWidth: [244, 100, 105],
      align: ['center', 'center', 'center'],
      rowNum: [5],
      indexHeader: ['序号'],
      waitTime: 3000,
      hoverPause: false,
      headerBGC: '#0C244D',
    });
  
    // 中间-获取品质异常
    abnormalQuality.value = reactive({
      header: [
        'Month',
        '<div><div>Internal</div><div>Batch</div></div>',
        '<div><div>Internal</div><div>Abnormal</div></div>',
        '<div><div>Internal</div><div>Major</div></div>',
        '<div style="color:#32C5E9"><div>External</div><div>Batch</div></div>',
        '<div style="color:#32C5E9"><div>External</div><div>Abnormal</div></div>',
        '<div style="color:#32C5E9"><div>External</div><div>Major</div></div>',
      ],
      data: [],
      index: false,
      // columnWidth: [230, 109, 110],
      align: [
        'center',
        'center',
        'center',
        'center',
        'center',
        'center',
        'center',
      ],
      rowNum: [5],
      indexHeader: ['序号'],
      waitTime: 3000,
      hoverPause: false,
      headerBGC: '#0C244D',
      headerHeight: 40,
    });
  
    const getQualityManagements = async () => {
      qualityManagement.value.data = [];
      abnormalQuality.value.data = [];
      const fiveReasonData: any = [];
      const abnormalData: any = [];
      const result = await getQualityManagement(queryParam);
      // console.log(result);
      if (result.data) {
        const abnormanQty = result.data.abnormal_qty;
        const fiveReasonsDefects = result.data.five_reasons_defects;
        if (abnormanQty && abnormanQty.length > 0) {
          const colors = ['#FAC858', '#FE7007', '#FD2104'];
          abnormanQty.forEach((item: any) => {
            const insideBatchQty =
              item.batch_qty_inside === 0
                ? ''
                : `<span style="color:${colors[0]}">${item.batch_qty_inside}</span>`;
            const insideBoxesQty =
              item.boxes_qty_inside === 0
                ? ''
                : `<span style="color:${colors[1]}">${item.boxes_qty_inside}</span>`;
            const insideHugeQty =
              item.huge_qty_inside === 0
                ? ''
                : `<span style="color:${colors[2]}">${item.huge_qty_inside}</span>`;
            const outsideBatchQty =
              item.batch_qty_outside === 0
                ? ''
                : `<span style="color:${colors[0]}">${item.batch_qty_outside}</span>`;
            const ousideBoxesQty =
              item.boxes_qty_outside === 0
                ? ''
                : `<span style="color:${colors[1]}">${item.boxes_qty_outside}</span>`;
            const ousideHugeQty =
              item.huge_qty_outside === 0
                ? ''
                : `<span style="color:${colors[2]}">${item.huge_qty_outside}</span>`;
            abnormalData.push([
              item.month,
              insideBatchQty,
              insideBoxesQty,
              insideHugeQty,
              outsideBatchQty,
              ousideBoxesQty,
              ousideHugeQty,
            ]);
          });
        }
        if (fiveReasonsDefects && fiveReasonsDefects.length > 0) {
          fiveReasonsDefects.forEach((item: any) => {
            fiveReasonData.push([item.INSPECTION_NAME, item.NUM, item.RATE]);
          });
        }
      }
      qualityManagement.value.data = fiveReasonData;
      abnormalQuality.value.data = abnormalData;
    };
  
    // 中间-获取问题追踪
    questionTracking.value = reactive({
      header: ['Question No.', 'Question item', 'Responsible', 'Person charge', 'Issue report date'],
      data: [],
      index: false,
      columnWidth: [125, 150, 100, 115, 130],
      align: ['center', 'center', 'center', 'center', 'center'],
      rowNum: [5],
      indexHeader: ['序号'],
      waitTime: 3000,
      hoverPause: false,
      headerBGC: '#0C244D',
    });
  
    // 中间-获取未完成度
    incompleteOption.value = reactive({
      color: ['#FAC858', '#E9E9E9'],
      title: [
        {
          text: '',
          top: '40%',
          textAlign: 'center',
          left: '50%',
          textStyle: {
            color: '#FFFFFF',
            fontSize: 28,
          },
        },
        {
          text: 'Incomplete',
          top: '53%',
          textAlign: 'center',
          left: '50%',
          textStyle: {
            color: '#FFFFFF',
            fontSize: 18,
          },
        },
      ],
      series: [
        {
          type: 'pie',
          radius: ['65%', '85%'],
          center: ['50%', '50%'],
          label: {
            show: false,
            position: 'center',
          },
          labelLine: {
            show: false,
          },
          selectedMode: 'single',
          selectedOffset: 5,
          data: [],
        },
      ],
    });
  
    function getIncompleteData(dayRate: any) {
      const data: any = [];
      data.push({ name: '已完成', value: dayRate });
      data.push({ name: '未完成', value: 100 - dayRate });
      incompleteOption.value.title[0].text = `${dayRate}%`;
      incompleteOption.value.series[0].data = data;
    }
  
    const getQuestionTracking = async () => {
      questionTracking.value.data = [];
      const data: any = [];
      const result = await getProblemTracking(queryParam);
      // console.log(result);
      if (result.data) {
        const questionData = result.data.dt;
        if (questionData && questionData.length > 0) {
          questionData.forEach((item: any) => {
            data.push([
              item.QID,
              item.TXT,
              item.PLANT_NAME,
              item.UNIT_OWNER_NAME,
              item.ASK_DATE,
            ]);
          });
        }
        if (result.data.rate != null) {
          getIncompleteData(result.data.rate);
        }
      }
      questionTracking.value.data = data;
    };
  
    // 右边-获取组别人员
    groupMembers.value = reactive({
      radius: '85%',
      activeRadius: '90%',
      showOriginValue: true,
      data: [],
    });
  
    const getGroupMemberInfo = async () => {
      groupMembers.value.data = [];
      const result = await getGroupMembers(queryParam);
      // console.log(result);
      if (result.data) {
        const skillWorkers = result.data.skill_workers;
        const jockeyWorks = result.data.jockey_works;
        const waterSpider = result.data.water_spider;
        if (skillWorkers >= 0 && jockeyWorks >= 0 && waterSpider >= 0) {
          const data: any = [];
          data.push({ name: 'Skill Worker : ', value: result.data.skill_workers });
          data.push({ name: 'Worker : ', value: result.data.jockey_works });
          data.push({ name: 'Material : ', value: result.data.water_spider }); // 水蜘蛛
          groupMembers.value.data = data;
        }
      }
    };
  
    // 右边-获取设备管理
    deviceOption.value = reactive({
      grid: {
        top: '2%',
        bottom: '2%',
        right: '11%',
        left: '0',
        containLabel: true,
      },
      xAxis: {
        type: 'value',
        axisLabel: {
          show: false,
        },
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        splitLine: {
          show: false,
        },
      },
      yAxis: {
        type: 'category',
        data: [],
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          color: '#ffffff',
          fontSize: 15,
        },
        splitLine: {
          lineStyle: {
            color: '#353A46',
          },
        },
      },
      series: [
        {
          data: [],
          type: 'bar',
          emphasis: {
            focus: 'series',
          },
          barWidth: '45%',
          barGap: '-100%',
          silent: true,
          itemStyle: {
            normal: {
              color: 'rgb(38,57,73)',
              barBorderRadius: 20,
            },
          },
          label: {
            show: true,
            position: 'right',
            fontSize: 15,
            color: '#ffffff',
            formatter: (a: any) => {
              return `${devicePercent[a.dataIndex]}%`;
            },
          },
        },
        {
          data: [],
          type: 'bar',
          barWidth: '45%',
          emphasis: {
            disabled: true,
            focus: 'none',
          },
          itemStyle: {
            normal: {
              barBorderRadius: 20,
              color(params: any) {
                return deviceColor[params.dataIndex];
              },
            },
          },
          label: {
            show: true,
            fontSize: 15,
            color: '#ffffff',
            position: 'inside',
          },
        },
      ],
    });
  
    const getDevices = async () => {
      devicePercent = [];
      deviceColor = [];
      deviceOption.value.yAxis.data = [];
      deviceOption.value.series[0].data = [];
      deviceOption.value.series[1].data = [];
      const result = await getEquipmentManagement(queryParam);
      // console.log(result);
      if (result.data && result.data.length > 0) {
        const deviceName: any = [];
        const deviceSum: any = [];
        const deviceValue: any = [];
        let data: any = [];
        data = result.data;
        data.reverse();
        data.forEach((item: any) => {
          deviceName.push(item.DEVICE_NAME);
          deviceValue.push(item.NUM);
          deviceSum.push(item.TOTAL);
          devicePercent.push(item.RATE);
          switch (item.DEVICE_NAME) {
            case '使用中':
            case '借出':
              deviceColor.push('#0272FC');
              break;
            case '维修中':
            case '待维修':
              deviceColor.push('#EC808D');
              break;
            case '闲置':
              deviceColor.push('#7F7F7F');
              break;
            case '报废':
              deviceColor.push('#B50B24');
              break;
            default:
              deviceColor.push('#0272FC');
              break;
          }
        });
        deviceOption.value.yAxis.data = deviceName;
        deviceOption.value.series[0].data = deviceSum;
        deviceOption.value.series[1].data = deviceValue;
      }
    };
    // 右边-获取面底配套
    bottomMatching.value = reactive({
      header: ['日期', '面库存', '底库存', '面底配套数'],
      data: [],
      index: false,
      columnWidth: [100, 100, 100, 140],
      align: ['center', 'center', 'center', 'center'],
      rowNum: [3],
      indexHeader: ['序号'],
      waitTime: 3000,
      hoverPause: false,
      headerBGC: '#0C244D',
    });
  
    const getBottomMatching = async () => {
      const data = [
        ['7/21', '1238', '856', '856'],
        ['7/22', '1892', '1782', '1782'],
        ['7/23', '2172', '3281', '2172'],
        ['7/24', '1123', '1025', '1025'],
        ['7/25', '1420', '1130', '1420'],
        ['7/26', '1820', '1314', '1314'],
        ['7/27', '1545', '775', '1145'],
        ['7/24', '1123', '1025', '1025'],
        ['7/25', '1420', '1130', '1420'],
        ['7/26', '1820', '1314', '1314'],
        ['7/27', '1545', '775', '1145'],
      ];
      bottomMatching.value.data = data;
    };
  
    // 右边-获取当日未配套订单信息
    orderInfo.value = reactive({
      header: ['PO', '尺码', '计划数', '未配套数', '鞋面欠数', '本底欠数'],
      data: [],
      index: false,
      columnWidth: [90, 80, 80, 80, 80, 80],
      align: ['center', 'center', 'center', 'center', 'center', 'center'],
      rowNum: [2],
      indexHeader: ['序号'],
      waitTime: 3000,
      hoverPause: false,
      headerBGC: '#0C244D',
    });
  
    const getOrderInfo = async () => {
      const data = [
        ['013503947', '1238', '856', '856', '856', '856'],
        ['013503948', '1892', '1782', '1782', '856', '856'],
        ['013503949', '2172', '3281', '2172', '856', '856'],
        ['013503950', '1123', '1025', '1025', '856', '856'],
        ['013503951', '1420', '1130', '1420', '856', '856'],
        ['013503952', '1820', '1314', '1314', '856', '856'],
        ['013503953', '1545', '775', '1145', '856', '856'],
        ['013503954', '1123', '1025', '1025', '856', '856'],
        ['013503955', '1420', '1130', '1420', '856', '856'],
        ['013503956', '1820', '1314', '1314', '856', '856'],
        ['013503957', '1545', '775', '1145', '856', '856'],
      ];
      orderInfo.value.data = data;
    };
  
    // 加载数据
    function loadData() {
      getLeaderInfo();
      getProductionInfo();
      getProductionInfo2();
      getDayAndMonthPPH();
      getShoeTypeProduction();
      getHourProductionRate();
      getQualityManagements();
      getQuestionTracking();
      getGroupMemberInfo();
      getDevices();
      // getBottomMatching();
      // getOrderInfo();
      kanbanTimer = setInterval(() => {
        // getLeaderInfo();
        getProductionInfo();
        getProductionInfo2();
        getDayAndMonthPPH();
        getShoeTypeProduction();
        getHourProductionRate();
        getQualityManagements();
        getQuestionTracking();
        getGroupMemberInfo();
        getDevices();
        // getBottomMatching();
        // getOrderInfo();
      }, kanbanInterval);
    }
  
    // 组件事件
    // 中间-生产组别选择事件
    function handleChangeProGroup(val: any) {
        queryParam.departmentCode = productionGroup.value;

        stopInterval();
        loadData();
    }

    function handleChangeProGroup2(val: any) {
        queryParam2.departmentCodee = productionGroup2.value;

        stopInterval();
        loadData();
    }
  
    onMounted(() => {
      getProductionGroup();
      getProductionGroup2();
    });
  
    onBeforeUnmount(() => {
      stopInterval();
    });
  </script>
  
  <style lang="less" scoped>
    .full {
      background-color: black;
      background-size: cover;
      width: 100vw; 
      height: 100vh; 
      margin: 0;     
      padding: 0;    
      overflow: hidden;
    }

  
    .container {
      margin: 5px 20px;
      position: fixed;
      top: 85px;
      width: calc(100% - 40px);
      height: calc(100% - 90px);
    }
  
    .max-height {
      height: 100%;
    }
  
    .max-width {
      width: 100%;
    }
  
    .flex-column {
      display: flex;
      flex-direction: column;
    }

    .parent-column {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      grid-template-rows: repeat(1, 1fr);
      gap: 10px;
    }
  
    .flex-1 {
      flex: 1;
    }
  
    .flex-2 {
      flex: 2;
    }
  
    .vertical-line {
      position: relative;
      padding-left: 12px;
      margin-bottom: 10px;
      color: #0ee4f9;
      font-size: 20px;
      font-weight: bold;
    }
  
    .vertical-line:before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      width: 5px;
      background-color: #0ee4f9;
      border-radius: 5px;
    }
  
    .padding-15 {
      padding: 15px;
    }
  
    .flex-row {
      display: flex;
      flex-direction: row;
      width: 100%;
      height: 100%;
    }
  
    .border-1 {
      width: 200px;
      height: 200px;
      background: url(@/assets/images/circle1.png) no-repeat;
      background-size: 100% 100%;
    }
  
    .flex-row {
      display: flex;
      flex-direction: row;
    }
  
    .flex-center {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  
    .flex-item {
      margin-left: 10px;
      margin-right: 10px;
    }
  
    .border-title {
      color: #0efff8;
      font-size: 18px;
      margin-bottom: 10px;
    }
  
    .border-value {
      font-size: 36px;
      color: white;
      text-align: center;
      font-weight: bold;
    }
  
    .selector-title {
      color: white;
      font-size: 18px;
      padding-left: 5px;
    }
  
    .person-box {
      display: flex;
      flex-direction: row;
      width: 100%;
      color: white;
      text-align: center;
      height: 45px;
      line-height: 45px;
  
      div {
        flex: 1;
        background-color: #0c244d;
      }
    }
  
    .production-box {
      display: flex;
      flex-direction: row;
      width: 100%;
      height: 46.5%;
      color: white;
      margin-top: 15px;
      .sub {
        flex: 1;
        text-align: center;
        background-color: #0d2742;
        margin-right: 20px;
        overflow: hidden;
        position: relative;
        border: 1px solid #0e94eb;
      }
    }
  
    .production-info {
        line-height: 2;

        :deep(.arco-statistic-title) {
            color: #0efff8;
            font-size: 50px; 
            margin-bottom: 2px;
        }
        
        :deep(.arco-statistic-value-integer),
        :deep(.arco-statistic-value-decimal),
        :deep(.arco-statistic-suffix) {
            font-size: 100px;
        }
    }
  
    .pph-info {
      :deep(.arco-statistic-title) {
        color: #0efff8;
        font-size: 18px;
        margin-top: 5px;
        margin-bottom: 0;
      }
  
      :deep(.arco-statistic-value) {
        text-align: center;
        font-weight: bold;
        color: #ffffff;
      }
  
      :deep(.arco-statistic-value-integer),
      :deep(.arco-statistic-value-decimal) {
        font-size: 90px;
      }
    }

    .mark {
      background: #f2f2f2;
      width: 3.5rem;
      height: 3rem;
      display: flex;
      align-items: flex-end;
      justify-content: center;
      line-height: 1.1;
      text-align: center;
      position: absolute;
      top: -1.85rem;
      right: -2.1rem;
      transform: rotate(45deg);
    }
  
    .quality-info {
      :deep(.header-item) {
        padding: 0 2px;
        font-size: 14px;
        line-height: 15px !important;
        display: flex;
        align-items: center;
        justify-content: center;
      }
  
      :deep(.ceil) {
        padding: 0 2px;
        font-size: 14px;
      }
    }
  
    .quality-info2 {
      :deep(.header-item) {
        padding: 0 2px;
        font-size: 14px;
        line-height: 15px !important;
        display: flex;
        align-items: center;
        justify-content: center;
      }
  
      :deep(.ceil) {
        padding: 0 2px;
        font-size: 16px;
      }
    }
  
    .abnormal-quality {
      height: 205px;
      overflow-y: hidden;
      :deep(.arco-table-th) {
        font-size: 13px;
      }
  
      :deep(.arco-table-cell) {
        padding: 1px 2px;
      }
    }
  
    .tracking-info {
      :deep(.header-item) {
        padding: 0 2px;
      }
  
      :deep(.ceil) {
        padding: 0 2px;
      }
    }
  
    .order-info {
      :deep(.header-item) {
        padding: 0 2px;
      }
  
      :deep(.ceil) {
        padding: 0 2px;
        color: red;
      }
    }
  </style>
  