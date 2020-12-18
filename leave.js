import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {LocalStore, DateFormat, Prototype} from '../../../npm/utils/utils'
import Dialog from '../../../npm/dialog/dialog'
import {withRouter} from 'react-router-dom'
import TipsDialog from "../../../npm/tipsDialog/index";
import {
    ifTransfer,
    getSecondOrgId,
    getWorkLength,
    getScheduleInfo,
    getAnnualLeBalance,
    getTransferLeBalance,
    getIsAllowAfter,
    getLastMonth,
    getLeaveDay,
    getScheduleDay,
    getProject,
    getConfigLeaveVersion,
    getConfigLeaveList,
    getLeaveInfo,
    getSubmitType,
    submitLeave,
    resSubmitLeave,
    submitFile,
    getpersontype
} from '../../../fetch/application/leave'
import {contentStyle, bodyStyle, leTypeF, leTypeM, tipData, tipData1, leaveConfig} from './subpage/data'
// import Loading from '../../../npm/loading/loading_old'
import Button from '../../../npm/button/buttonField'

import {randerForm} from './subpage/renderForm'
// import {randerLactation} from './subpage/renderLactation'
import {uploadFile} from './subpage/uploadFile'
// import {Context} from '../../../util/globalVariable'

import './leave.less'

Prototype.setArray();

let permission;


const timeList = {
    "赛意默认班次": [
        {text: "08:30", value: "8.5"},//"08:30" "18:00"
        {text: "09:00", value: "9.0"},
        {text: "09:30", value: "9.5"},
        {text: "10:00", value: "10.0"},
      
        {text: "16:00", value: "16.0"},
        {text: "16:30", value: "16.5"},
        {text: "17:00", value: "17.0"},
		  {text: "12:00", value: "12.0"},
        {text: "12:30", value: "12.5"},
        {text: "13:00", value: "13.0"},
        {text: "13:30", value: "13.5"},
        {text: "14:00", value: "14.0"},
        {text: "14:30", value: "14.5"},
        {text: "17:30", value: "17.5"},
        {text: "18:00", value: "18.0"},
    ],
    "景同默认班次": [
        {text: "09:00", value: "9.0"},//"09:00" "17:30"
        {text: "09:30", value: "9.5"},
        {text: "10:00", value: "10.0"},
        {text: "10:30", value: "10.5"},
        {text: "11:00", value: "11.0"},
        {text: "11:30", value: "11.5"},
        {text: "12:00", value: "12.0"},
        {text: "12:30", value: "12.5"},
        {text: "13:00", value: "13.0"},
        {text: "13:30", value: "13.5"},
        {text: "14:00", value: "14.0"},
        {text: "14:30", value: "14.5"},
        {text: "15:00", value: "15.0"},
        {text: "15:30", value: "15.5"},
        {text: "16:00", value: "16.0"},
        {text: "16:30", value: "16.5"},
        {text: "17:00", value: "17.0"},
        {text: "17:30", value: "17.5"},
    ],
    "深圳早班": [
        {text: "08:30", value: "8.5"},//"08:30" "18:00"
        {text: "09:00", value: "9.0"},
        {text: "09:30", value: "9.5"},
        {text: "10:00", value: "10.0"},
        {text: "10:30", value: "10.5"},
        {text: "11:00", value: "11.0"},
        {text: "11:30", value: "11.5"},
        {text: "12:00", value: "12.0"},
        {text: "12:30", value: "12.5"},
        {text: "13:00", value: "13.0"},
        {text: "13:30", value: "13.5"},
        {text: "14:00", value: "14.0"},
        {text: "14:30", value: "14.5"},
        {text: "15:00", value: "15.0"},
        {text: "15:30", value: "15.5"},
        {text: "16:00", value: "16.0"},
        {text: "16:30", value: "16.5"},
        {text: "17:00", value: "17.0"},
        {text: "17:30", value: "17.5"},
        {text: "18:00", value: "18.0"},
    ],
    "深圳午班": [
        {text: "14:00", value: "14.0"},//"14:00" "23:00"
        {text: "14:30", value: "14.5"},
        {text: "15:00", value: "15.0"},
        {text: "15:30", value: "15.5"},
        {text: "16:00", value: "16.0"},
        {text: "16:30", value: "16.5"},
        {text: "17:00", value: "17.0"},
        {text: "17:30", value: "17.5"},
        {text: "18:00", value: "18.0"},
        {text: "18:30", value: "18.5"},
        {text: "19:00", value: "19.0"},
        {text: "19:30", value: "19.5"},
        {text: "20:00", value: "20.0"},
        {text: "20:30", value: "20.5"},
        {text: "21:00", value: "21.0"},
        {text: "21:30", value: "21.5"},
        {text: "22:00", value: "22.0"},
        {text: "22:30", value: "22.5"},
        {text: "23:00", value: "23.0"},
    ],
    "深圳夜班": [
        {text: "00:00", value: "0.0"},//"23:00" "08:30"
        {text: "00:30", value: "0.5"},
        {text: "01:00", value: "1.0"},
        {text: "01:30", value: "1.5"},
        {text: "02:00", value: "2.0"},
        {text: "02:30", value: "2.5"},
        {text: "03:00", value: "3.0"},
        {text: "03:30", value: "3.5"},
        {text: "04:00", value: "4.0"},
        {text: "04:30", value: "4.5"},
        {text: "05:00", value: "5.0"},
        {text: "05:30", value: "5.5"},
        {text: "06:00", value: "6.0"},
        {text: "06:30", value: "6.5"},
        {text: "07:00", value: "7.0"},
        {text: "07:30", value: "7.5"},
        {text: "08:00", value: "8.0"},
        {text: "08:30", value: "8.5"},
        {text: "23:00", value: "23.0"},
        {text: "23:30", value: "23.5"},
        {text: "23:59", value: "23.59"},
    ],
    "深圳夜班前": [
        {text: "23:00", value: "23.0"},//"23:00" "08:30"
        {text: "23:30", value: "23.5"},
    ],
    "深圳夜班后": [
        {text: "00:00", value: "0.0"},//"23:00" "08:30"
        {text: "01:30", value: "1.5"},
        {text: "02:00", value: "2.0"},
        {text: "02:30", value: "2.5"},
        {text: "03:00", value: "3.0"},
        {text: "03:30", value: "3.5"},
        {text: "04:00", value: "4.0"},
        {text: "04:30", value: "4.5"},
        {text: "05:00", value: "5.0"},
        {text: "05:30", value: "5.5"},
        {text: "06:00", value: "6.0"},
        {text: "06:30", value: "6.5"},
        {text: "07:00", value: "7.0"},
        {text: "07:30", value: "7.5"},
        {text: "08:00", value: "8.0"},
        {text: "08:30", value: "8.5"},
    ],
}

class Leave extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {

            //产假类型
            fetalType: [
                {text: "一胎", value: "fetus_1"},
                {text: "多胎", value: "fetus_2"}
            ],
            //哺乳假类型
            lactationType: [
                {text: "早", value: "Y"},
                {text: "晚", value: "N"}
            ],
            isPoData: [
                {text: "是", value: "Y",},
                {text: "否", value: "N",}
            ],

            dataObj: {
                required: false,
                isPo: "是",
                isPoValue: "Y",
                fetalType: "一胎",
                fetalTypeVal: "fetus_1"
            },

            leType: [],

            //项目下拉
            project: [],
            shouldUpdate: false,
            requestFlag: true,
            requestPending: false,
            pageSize: 10,
            pageNumber: 0,

            //附件上传
            fileDisabled: true,
            files: [],
            leAttach: [],
            attachment: {},


            disBeginDate: true,
            disEndDate: true,
            disBeginTime: true,
            beginTimeData: [],
            disEndTime: true,
            endTimeData: [],

            workingSeniority: 0,//工时工龄
            sieWorkingSeniority: 0,//实际工龄
            configLeave: [],

            lactationData: [],
            lacShouldUpdate: true,


            fileFlag: 0,
            leAttachArr: [],
            submitLeAttachArr: [],

            ifJTPerson: false,
            checkSubmit: true,
            personType: "",

            tipsOpen: false,//tipsDialog的open
            tipsType: 'submitting',//tipsDialog的type  submitting/loading hint fail success
            tipsTitle: 'loading...',//tipsDialog的title
            tipsContent: '',//tipsDialog的Content
            btnText: '',//tipsDialog的btnText
        };
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    //查询人员排班信息
    getScheduleInfoFn = () => {
        let _this = this;
        getScheduleInfo(function (res) {
            _this.setState({
                scheduleInfo: res.errorCode == "0" ? res.data || [] : []
            })
        });
    };
    //查询是否可见调休假
    getIfTransfer = () => {
        let _this = this;
        setTimeout(function (res) {
            const isPunch = _this.state.permission.isPunch;
            const isTs = _this.state.permission.isTs;
            _this.setState({
                ifTransfer: isPunch == "Y" && isTs != "SZ" ? "Y" : "N",
            })
        }, 100);
        // ifTransfer(function (res) {
        //     _this.setState({
        //         ifTransfer: res.errorCode == "0" ? res.data : 'N',
        //     })
        // });
    };
    //初始化查询实际工龄、公司工龄-服务
    getWorkLengthFn = () => {
        let _this = this;
        getWorkLength(function (res) {
            _this.setState({
                workingSeniority: res.errorCode == "0" ? res.data.workingSeniority : 0,
                sieWorkingSeniority: res.errorCode == "0" ? res.data.sieWorkingSeniority : 0
            })
        });
    };
    //初始化年假余额、调休假余额-服务
    getLeaveOverFn = () => {
        let _this = this;
        let beginDate = DateFormat.yyyy_MM_dd(new Date());
        getAnnualLeBalance(beginDate, beginDate, function (res) {
            _this.setState({
                annualLeBalance: res.errorCode == "0" ? res.data : 0,
            })
        });
        getTransferLeBalance(permission.userId, beginDate, function (res) {
            _this.setState({
                transferLeBalance: res.errorCode == "0" ? res.data : 0
            })
        });
    };

    //年假余额-服务
    getAnnualLeBalanceFn = (beginDate, endDate) => {
        let _this = this;
        // let beginDate = DateFormat.yyyy_MM_dd(new Date());
        if (beginDate && endDate) {
            getAnnualLeBalance(beginDate, endDate, function (res) {
                _this.setState({
                    annualLeBalance: res.errorCode == "0" ? `${res.data}` : "0"
                })
            });
        }
    };

    //调休假余额-服务
    getTransferLeBalanceFn = (endDate) => {
        let _this = this;
        // let beginDate = DateFormat.yyyy_MM_dd(new Date());
        if (endDate) {
            getTransferLeBalance(permission.userId, endDate, function (res) {
                _this.setState({
                    transferLeBalance: res.errorCode == "0" ? `${res.data}` : "0"
                })
            });
        }
    };

    //查询是否允许事后休假
    getIsAllowAfterFn = () => {
        let _this = this;
        getIsAllowAfter(function (res1) {
            _this.setState({
                isAllowAfter: res1.errorCode == "0" ? res1.data : "N",
                minDate: res1.errorCode == "0" && res1.data == "Y" ? "" : DateFormat.yyyy_MM_dd(new Date()),
            });
            if (res1.data == "Y") {
                const yearMonthMaxDay = (year) => {
                    const isLeap = (year) => year % 100 == 0 ? (year % 400 == 0 ? 1 : 0) : (year % 4 == 0 ? 1 : 0);
                    return [31, 28 + isLeap(year), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
                };
                let formatTen = (num) => {
                    return num > 9 ? (num + "") : ("0" + num);
                };
                let date = new Date(),
                    year = date.getFullYear(),//年份 2018
                    month = date.getMonth() + 1;//月份 0,1,2,....11
                // lastMonthMaxDay = yearMonthMaxDay(year)[month-1],//上个月的最大天数   注意后面这里还得优化
                // maxDate = year + "-" + formatTen(month-1) + "-" + formatTen(lastMonthMaxDay);


                let maxDate = "";
                if (month == 1) { //这个月为一月 上个月就是去年十二月
                    let lastMonthMaxDay = new Date(year - 1, 12, 0).getDate();
                    maxDate = year - 1 + "-" + 12 + "-" + formatTen(lastMonthMaxDay);
                } else {
                    let lastMonthMaxDay = new Date(year, month - 1, 0).getDate();
                    maxDate = year + "-" + formatTen(month - 1) + "-" + formatTen(lastMonthMaxDay);
                }


                //查询是否签核
                getLastMonth(permission.userId, maxDate, function (res2) {
                    let minDate = "";
                    //如果上个月最后一天已签核，最小日期在这个月一号，
                    if (res2.data == "Y") {
                        minDate = year + "-" + formatTen(month) + "-01";
                    } else { //如果上个月最后一天未签核，最小日期在上个月一号，
                        // minDate = year + "-" + formatTen(month-1) + "-01";
                        if (month == 1) { //这个月为一月 上个月就是去年十二月一号
                            minDate = (year - 1) + "-12-01";
                        } else {
                            minDate = year + "-" + formatTen(month - 1) + "-01";
                        }
                    }
                    _this.setState({
                        minDate
                    });
                })
            }
        })
    };

    getSecondOrgIdFn = () => {
        const _this = this
        getSecondOrgId(function (res) {
            const data = res.data || "";
            if (data == "1930") {
                _this.setState({
                    ifJTPerson: true
                })
            }
        })
    }

    //休假配置查询-服务
    getConfigLeaveFn = () => {
        let _this = this;
        getConfigLeaveList(function (res) {

            LocalStore.setItem("configLeave", res.errorCode == "0" ? JSON.stringify(res.data) : "[]");
            let leType = [];
            if (res.errorCode == "0") {
                let data = res.data;
                for (let i = 0; i < data.length; i++) {
                    if (data[i].gender.indexOf(permission.sex) >= 0) {
                        if (!data[i].name.includes("产假")) {
                            leType.push({text: data[i].name, value: data[i].name})
                        }
                    }
                }
            }

            if (permission.sex == "F") {
                const ifJTPerson = _this.state.ifJTPerson
                if (ifJTPerson) {
                    leType.push({text: "产假", value: "景同产假"}, {text: "难产假", value: "景同难产假"})
                } else {
                    leType.push({text: "产假", value: "产假"}, {text: "难产假", value: "难产假"})
                }
            } else if (permission.sex == "M") {
                leType.push({text: "陪产假", value: "陪产假"})
            }

            _this.setState({
                leType,
                configLeave: res.errorCode == "0" ? res.data : []
            });


            if (_this.props.type == "edit") {
                _this.getLeaveInfoFn(_this.props.bpmInfo.businessKey.split('.')[1])
            }
            //_this.getLeaveInfoFn(4)
        })
    };
    //查询休假提交流程类型
    getSubmitTypeFn = () => {
        let _this = this;
        getSubmitType('leave', permission.empAttribute || "null", function (res) {
            _this.setState({
                submitType: res.errorCode == "0" ? res.data : ""
            });
        })
    };
    //根据流程id查询休假信息
    getLeaveInfoFn = (businessKey) => {
        let _this = this;
        getLeaveInfo(businessKey, function (res) {
            if (res.errorCode == "0") {
                let data = res.data;
                let dataObj = {
                    fetalType: "一胎",
                    fetalTypeValue: "fetus_1"
                };
                let setTimeText = (time) => {
                    let t = time.split('.');
                    let m = t[1] == 0 ? "00" : "30";
                    return t[0] + ":" + m
                };
                let setName = (value, data) => {
                    for (let d = 0; d < data.length; d++) {
                        if (data[d].value == value) {
                            return data[d].text
                        }
                    }
                };

                dataObj.userId = data.userId;
                dataObj.zhName = data.zhName;

                dataObj.beginDate = data.beginDate;
                dataObj.beginTime = setTimeText(data.beginTime);
                dataObj.beginTimeValue = data.beginTime;

                dataObj.leType = data.leType;
                dataObj.leTypeValue = data.leType;

                dataObj.endDate = data.endDate;
                dataObj.endTime = setTimeText(data.endTime);
                dataObj.endTimeValue = data.endTime;

                if (data.poId) {
                    dataObj.poId = data.poId;
                    dataObj.poName = data.poName;
                    // dataObj.poNameValue = {};

                    dataObj.isPo = "是";
                    dataObj.isPoValue = "Y";
                } else {
                    dataObj.isPo = "否";
                    dataObj.isPoValue = "N";
                }

                //休假时长
                let hour = data.leDays || 0;
                let leDays = '';
                if (data.leType == "哺乳假") {
                    leDays = hour + "天";
                } else {
                    if (hour > 40) {
                        leDays = hour / 8 + "天";
                    } else {
                        leDays = hour + "小时";
                    }
                }
                dataObj.leDays = leDays;

                //产假类型
                dataObj.fetalType = setName(data.isMuBirths, _this.state.fetalType) || "一胎";
                dataObj.fetalTypeValue = data.isMuBirths || "fetus_1";
                //哺乳假类型
                dataObj.lactationType = setName(data.isMorning, _this.state.lactationType);
                dataObj.lactationTypeValue = data.isMorning;

                dataObj.leReason = data.leReason;

                let leAttach = data.leAttach ? data.leAttach.split(';') : [];

                let leTypeData = _this.state.configLeave.filter((item) => item.name == data.leType)[0];
                let max = _this.maxDate(leTypeData, data.leType, dataObj);


                //最小休假单位为0.5小时,设置可选时间
                if (leTypeData.minunit == "0.5") {
                    _this.setBeginTimeData(dataObj.beginDate);
                    _this.setEndTimeData("", data.beginTime, dataObj.beginDate)
                }
                // else {
                //     dataObj.beginTime = "";
                //     dataObj.endTime = "";
                //     _this.setState({
                //         disBeginTime: true,
                //         disEndTime: true
                //     })
                // }
                _this.setState({
                    hour,
                    leAttach,
                    dataObj,
                    attachment: leTypeData.attachment,
                    disBeginDate: false,
                    disEndDate: leTypeData.once,//一次性假  禁用  带出值
                    maxDate: dataObj.leType == "事假" || dataObj.leType == "病假" ||
                    dataObj.leType == "哺乳假" || dataObj.leType == "年假" ? "" : max
                });

                //如果项目名称存在  请求项目数据
                // if ((_this.state.submitType == "AttendanceLeave_Z_PS" || _this.state.submitType == "AttendanceLeave_SZ_P") ||
                //     dataObj.poId) {
                if (_this.state.submitType == "AttendanceLeave_Z_PS" ||
                    _this.state.submitType == "AttendanceLeave_SZ_P" ||
                    _this.state.submitType == "AttendanceLeave_JT") {
                    _this.getProjectFn(dataObj.beginDate, dataObj.endDate);
                }

                dataObj.leType == "年假" && _this.getAnnualLeBalanceFn(dataObj.beginDate, dataObj.endDate);//查询年假余额
                dataObj.leType == "调休假" && _this.getTransferLeBalanceFn(dataObj.beginDate);//查询调休假余额

            }

        })
    };
    //查询休假天数
    getLeaveDayFn = (dataObj) => {
        let _this = this;
        this.setState({
            checkSubmit: false
        })
        if (dataObj.userId && dataObj.leType && dataObj.beginDate && dataObj.endDate && dataObj.beginTimeValue && dataObj.endTimeValue) {
            let subdata = {
                userId: dataObj.userId,
                leType: dataObj.leType,
                beginDate: dataObj.beginDate,
                endDate: dataObj.endDate,
                beginTime: dataObj.beginTimeValue,
                endTime: dataObj.endTimeValue,
            };
            getLeaveDay(subdata, function (res) {
                if (res.errorCode == "0") {
                    let s_dataObj = eval('(' + JSON.stringify(_this.state.dataObj) + ')');
                    let hour = res.data || 0;
                    let leDays = '';
                    if (s_dataObj.leType == "哺乳假") {
                        leDays = hour + "小时";
                    } else {
                        if (hour > 40) {
                            leDays = hour / 8 + "天";
                        } else {
                            leDays = hour + "小时";
                        }
                    }
                    s_dataObj.leDays = leDays.slice(0, 1) == '-' ? '' : leDays;

                    _this.setState({
                        hour,
                        dataObj: s_dataObj,
                        checkSubmit: true
                    })
                }
            });
        }
    };
    //获取当天的排班信息  设置时间数据
    getScheduleDayFn = (beginDate) => {
        let _this = this;
        getScheduleDay(permission.userId, beginDate, function (res) {
            debugger
            if (res.errorCode == "0") {
                let dataObj = eval('(' + JSON.stringify(_this.state.dataObj) + ')');
                dataObj.beginTime = res.data.startTime;
                dataObj.endTime = res.data.endTime;
                // if (res.data.startTime == "08:30") {
                //     dataObj.beginTimeValue = '8.5';
                //     dataObj.endTimeValue = '18.0';
                // }
                // if (res.data.startTime == "09:00") {
                //     dataObj.beginTimeValue = '9.0';
                //     dataObj.endTimeValue = '18.0';
                // }
                dataObj.beginTimeValue = _this.changeTime(res.data.startTime).toFixed(1);
                dataObj.endTimeValue = _this.changeTime(res.data.endTime).toFixed(1);
                _this.setState({
                    dataObj,
                    scheduleDay: res.data
                });
                _this.getLeaveDayFn(dataObj);
            } else {
                alert("请求排班失败")
            }

        })
    };

    //请求项目名称-服务
    getProjectFn = (beginDate, endDate) => {
        let _this = this;
        getProject(permission.userId, 10, 0, beginDate, endDate, "-null-", function (res) {
            _this.setState({
                project: res.errorCode == "0" ? res.data : [],
                pageNumber: 0
            })
        });
    };
    //输入input触发的方法 就是onchange的方法
    onUpdateInput = (name, value) => {
        let _this = this;
        let dataObj = eval('(' + JSON.stringify(_this.state.dataObj) + ')');
        dataObj[name] = value;
        _this.setState({
            dataObj: dataObj,
            requestFlag: false,
            shouldUpdate: false,
            requestPending: true
        });
        getProject(permission.userId, 10, 0, dataObj.beginDate, dataObj.endDate, value || "-null-", function (res) {
            let d = res.errorCode == "0" ? res.data : [];
            // let d = [
            //     {text: '刘一', value: '刘一'},
            //     {text: '关二', value: '关二'},
            //     {text: '张三', value: '张三'},
            //     {text: '李四', value: '李四'},
            //     {text: '王五', value: '王五'},
            //     {text: '马六', value: '马六'},
            //     {text: '孙七', value: '孙七'},
            //     {text: '王八', value: '王八'},
            //     {text: '鲁九', value: '鲁九'},
            //     {text: '曹十', value: '曹十'},
            // ];
            _this.setState({
                project: res.errorCode == "0" ? d : [],
                shouldUpdate: res.errorCode == "0" && res.data.length ? true : false,
                requestFlag: res.errorCode == "0" && res.data.length ? true : false,
                requestPending: false,
                pageNumber: 0
            });
        });
    };
    //滚动分页触发方法
    requestDataBack = (name, value) => {
        this.setState({
            requestFlag: false,//是否需要滚动加载数据  true 调用requestDataBack
            shouldUpdate: false,//true 重先渲染滚动条 fasle
            requestPending: true
        });
        let _this = this;
        let project = eval('(' + JSON.stringify(this.state.project) + ')');
        let dataObj = _this.state.dataObj;
        getProject(permission.userId, 10, this.state.pageNumber + 1, dataObj.beginDate, dataObj.endDate, value || "-null-", function (res) {
            let d = res.errorCode == "0" ? res.data : [];
            // let d = [
            //     {text: '刘一', value: '刘一'},
            //     {text: '关二', value: '关二'},
            //     {text: '张三', value: '张三'},
            //     {text: '李四', value: '李四'},
            //     {text: '王五', value: '王五'},
            //     {text: '马六', value: '马六'},
            //     {text: '孙七', value: '孙七'},
            //     {text: '王八', value: '王八'},
            //     {text: '鲁九', value: '鲁九'},
            //     {text: '曹十', value: '曹十'},
            // ];
            project = project.concat(d);
            _this.setState({
                project: project,
                shouldUpdate: true,
                requestFlag: true,
                requestPending: false,
                pageNumber: res.errorCode == "0" ? res.pageNumber : 0
            });
        });
    };

    //哺乳假滚动方法
    lacInitScroll = () => {
        this.setState({
            lacShouldUpdate: false
        });
    };
    //设置哺乳假渲染对象
    setLactationData = (beginDate, endDate) => {
        if (beginDate == "") {
            this.setState({
                lactationData: []
            });
            return false;
        }
        let arr = [];
        let begin = new Date(beginDate).getTime();
        let end = new Date(endDate).getTime();
        for (let d = begin; d <= end; d = d + 1 * 24 * 60 * 60 * 1000) {
            let date = DateFormat.yyyy_MM_dd(new Date(d))
            var weeks = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
            let week = weeks[new Date(d).getDay()];
            arr.push({
                key: d,
                date: date,
                week: week,
                early: false, // early 早  late 晚
                late: false,
            })
        }
        console.log(arr);
        this.setState({
            lactationData: arr
        })
    };
    //哺乳假全开关
    swichLac = (flag, e) => {
        let lactationData = eval('(' + JSON.stringify(this.state.lactationData) + ')');
        for (let i = 0; i < lactationData.length; i++) {
            lactationData[i].early = false;
            lactationData[i].late = false;
            lactationData[i][flag] = true;
        }
        this.setState({
            lacSwichVal: flag,
            lactationData: lactationData
        })
    };
    //哺乳假单点item
    swichLacItem = (item, flag, e) => {
        let lactationData = eval('(' + JSON.stringify(this.state.lactationData) + ')');
        for (let i = 0; i < lactationData.length; i++) {
            if (lactationData[i].key == item.key) {
                lactationData[i].early = false;
                lactationData[i].late = false;
                lactationData[i][flag] = true;
            }
        }
        this.setState({
            lactationData: lactationData
        })
    };

    //上传图片
    fileChange = (e) => {

        let files = e.target.files, _this = this;
        for (let i = 0; i < files.length; i++) {
            files[i].url = URL.createObjectURL(files[i]);
        }
        //转换为真正的数组
        files = Array.prototype.slice.call(files, 0);

        /*files = files.filter(file=>{
         return /image/i.test(file.type);
         });*/

        console.log('files', files);
        files = _this.state.files.concat(files);

        _this.setState({
            files: files,
            fileDisabled: true,
        });
    };
    fileClick = () => {
        let _this = this;
        this.setState({
            fileDisabled: false,
        });
        setTimeout(function () {
            _this.setState({
                fileDisabled: true,
            })
        }, 8000);
    };
    //删除图片
    deleteFile = (item, e) => {
        let files = this.state.files.concat();
        for (let i = 0; i < files.length; i++) {
            if (files[i].url == item.url) {
                files.splice(i, 1);
                continue
            }
        }
        console.log('files', files);
        this.setState({
            files: files
        });
    };
    //编辑删除src
    deleteFileSrc = (src) => {

        let leAttach = eval('(' + JSON.stringify(this.state.leAttach) + ')');
        leAttach.removeByValue(src);
        this.setState({
            leAttach: leAttach
        })
    };

    //操作form方法
    getValue = (type, name, text, value, obj) => {
        let _this = this;
        let dataObj = eval('(' + JSON.stringify(this.state.dataObj) + ')');
        dataObj[name] = text;

        if (name == "poName") {
            dataObj.poId = value;
        }

        if (type == "selectField" || type == "radio") {
            dataObj[name + "Value"] = value;
        }

        if (name == "leType") {
            if (value == "婚假" || value == "陪产假") {
                if (_this.state.personType !== "正式员工") {
                    _this.setState({
                        tipsOpen: true,//tipsDialog的open
                        tipsType: 'fail',//tipsDialog的type  submitting/loading hint fail success
                        tipsTitle: '提示',//tipsDialog的title
                        tipsContent: '完成并通过试用期员工，方可享受，谢谢！',//tipsDialog的Content
                        btnText: '',//tipsDialog的btnText
                    })
                    return;
                }
            }
            console.log("--------------------------lcl------------")
            let leTypeData = this.state.configLeave.filter((item) => item.name == value)[0];
            if (!Object.keys(leTypeData).length) return;
            //清空数据
            dataObj.beginDate = "";
            dataObj.endDate = "";
            dataObj.beginTime = "";
            dataObj.endTime = "";
            dataObj.leDays = "";

            this.setState({
                attachment: leTypeData.attachment,
                disBeginDate: false,
                //清空状态
                disEndDate: true,
                disBeginTime: true,
                disEndTime: true,
            });
        }
        if (name == "beginDate") {
            debugger

            let leTypeData = this.state.configLeave.filter((item) => item.name == dataObj.leTypeValue)[0];
            let max = this.maxDate(leTypeData, dataObj.leTypeValue, dataObj);


            let flag = dataObj.leType == "事假" || dataObj.leType == "病假" || dataObj.leType == "哺乳假" ||
                dataObj.leType == "调休假" || dataObj.leType == "年假" || dataObj.leType == "产检假" ||
                dataObj.leType == "工伤假" || dataObj.leType == "计生假";

            if (!flag) {
                dataObj.endDate = max;
            } else {
                dataObj.endDate = dataObj.beginDate;
            }

            this.setState({
                disEndDate: leTypeData.once,//一次性假  禁用结束日期  带出值默认值
                maxDate: flag ? "" : max,
            });

            // if (leTypeData.once) {
            //     this.getProjectFn(dataObj.beginDate, dataObj.endDate);
            //     this.getLeaveDayFn(dataObj);
            // }


            // if (permission.empAttribute == "P") {
            if (this.state.submitType == "AttendanceLeave_Z_PS" ||
                this.state.submitType == "AttendanceLeave_SZ_P" ||
                this.state.submitType == "AttendanceLeave_JT") {
                this.getProjectFn(dataObj.beginDate, dataObj.endDate);
            }

            //最小休假单位为0.5小时,设置可选时间
            if (leTypeData.minunit == "0.5") {
                this.setBeginTimeData(dataObj.beginDate)
            } else {
                dataObj.beginTime = "";
                dataObj.endTime = "";
                this.setState({
                    disBeginTime: true,
                    disEndTime: true
                });
                this.getScheduleDayFn(dataObj.beginDate)
            }

            this.getLeaveDayFn(dataObj);

            // //请求单天的排班，并设置开始日期
            // _this.getScheduleDayFn(dataObj.userId, dataObj.beginDate, leTypeData.minunit);
            dataObj.leType == "年假" && this.getAnnualLeBalanceFn(dataObj.beginDate, dataObj.endDate);//查询年假余额
            dataObj.leType == "调休假" && this.getTransferLeBalanceFn(dataObj.endDate);//查询调休假余额

        }
        if (name == "endDate") {
            //this.setLactationData(dataObj.beginDate, text);
            if (this.state.submitType == "AttendanceLeave_Z_PS" ||
                this.state.submitType == "AttendanceLeave_SZ_P" ||
                this.state.submitType == "AttendanceLeave_JT") {
                this.getProjectFn(dataObj.beginDate, dataObj.endDate);//查询查询项目
            }
            dataObj.leType == "年假" && this.getAnnualLeBalanceFn(dataObj.beginDate, dataObj.endDate);//查询年假余额
            this.getLeaveDayFn(dataObj);//查询休假天数

            dataObj.leType == "调休假" && this.getTransferLeBalanceFn(dataObj.endDate);//查询调休假余额

            if (_this.state.dataObj.beginTime) {
                setTimeout(function () {
                    _this.setEndTimeData(_this.state.dataObj.beginTime, _this.state.dataObj.beginTimeValue);
                }, 100)
            }


        }
        if (name == "beginTime") {
            dataObj.endTime = "";
            this.setEndTimeData(text, value);
            this.getLeaveDayFn(dataObj);
        }
        if (name == "endTime") {
            this.getLeaveDayFn(dataObj);
        }

        if (name == "fetalType") {
            // dataObj.fetalTypeVal = value;
            let leTypeData = this.state.configLeave.filter((item) => item.name == dataObj.leTypeValue)[0];
            let max = this.maxDate(leTypeData, dataObj.leTypeValue, dataObj);
            dataObj.endDate = max;
            this.setState({
                maxDate: max //value == "annual" ? "" : max
            });
            this.getLeaveDayFn(dataObj)
        }

        if (name == "isPo") {
            dataObj.poName = "";
            this.getProjectFn(dataObj.beginDate, dataObj.endDate);//查询查询项目
        }

        if (name == "lactationType") {
            // _this2.state.scheduleDay.startTime
            // _this2.state.scheduleDay.endTime
            if (this.state.scheduleDay && this.state.scheduleDay.startTime) {
                if (this.state.scheduleDay.startTime == "08:30") {
                    if (text == "早") {
                        dataObj.lactationHour = "08:30 - 09:30"
                    } else {
                        dataObj.lactationHour = "17:00 - 18:00"
                    }
                } else if (this.state.scheduleDay.startTime == "09:00") {
                    if (text == "早") {
                        dataObj.lactationHour = "09:00 - 10:00"
                    } else {
                        dataObj.lactationHour = "17:00 - 18:00"
                    }
                }
            }

        }
        console.log(dataObj);
        this.setState({
            dataObj: dataObj
        });
    };
    //转换时间格式
    changeTime = (time) => {
        const arr = time.split(":");
        const hour = arr[0] * 1;
        const minute = arr[1] == "30" ? 0.5 : 0
        return hour + minute;
    }
    //设置开始时间的下拉数据
    setBeginTimeData = (beginDate) => {
        debugger
        let _this = this;

        getScheduleDay(permission.userId, beginDate, function (res) {
            debugger
            if (res.errorCode == "0") {
                // let i = _this.changeTime(res.data.startTime);
                // let e = _this.changeTime(res.data.endTime);
                // const timeArr = [];
                // let t = "";
                // for (i; i <= e; i = i + 0.5) {
                //     t = (i + "").split(".");
                //     if (t.length == 1) {
                //         timeArr.push(
                //             {text: `${t[0]}:00`, value: `${i}.0`},
                //         )
                //     } else {
                //         timeArr.push(
                //             {text: `${t[0]}:30`, value: `${i}`},
                //         )
                //     }
                // }

                const startTime = res.data.startTime;
                const endTime = res.data.endTime;
                let timeArr = [];
                if (startTime == "08:30" && endTime == "18:00") {
                    timeArr = timeList["赛意默认班次"];//深圳早班 一样
                }
                if (startTime == "09:00" && endTime == "17:30") {
                    timeArr = timeList["景同默认班次"];
                }
                if (startTime == "14:00" && endTime == "23:00") {
                    timeArr = timeList["深圳午班"];
                }
                if (startTime == "23:00" && endTime == "08:30") {
                    timeArr = timeList["深圳夜班"];
                }
                _this.setState({
                    scheduleDay: res.data,
                    disBeginTime: false,
                    beginTimeData: timeArr,
                })
            } else {
                console.log(res)
            }
        });
    };
    //设置结束时间的下拉数据
    setEndTimeData = (text, value, beginDate) => {
        debugger
        let _this = this;
        const setEnd = (_this, scheduleDay) => {
            // let i = _this.changeTime(scheduleDay.startTime);
            // let e = _this.changeTime(scheduleDay.endTime);
            // const timeArr = [];
            // let t = "";
            // for (i; i <= e; i = i + 0.5) {
            //     t = (i + "").split(".");
            //     if (t.length == 1) {
            //         timeArr.push(
            //             {text: `${t[0]}:00`, value: `${i}.0`},
            //         )
            //     } else {
            //         timeArr.push(
            //             {text: `${t[0]}:30`, value: `${i}`},
            //         )
            //     }
            // }

            const startTime = scheduleDay.startTime;
            const endTime = scheduleDay.endTime;
            let timeArr = [];
            if (startTime == "08:30" && endTime == "18:00") {
                timeArr = timeList["赛意默认班次"];//深圳早班 一样
            }
            if (startTime == "09:00" && endTime == "17:30") {
                timeArr = timeList["景同默认班次"];
            }
            if (startTime == "14:00" && endTime == "23:00") {
                timeArr = timeList["深圳午班"];
            }
            if (startTime == "23:00" && endTime == "08:30") {

                timeArr = timeList["深圳夜班"];
            }

            _this.setState({
                disEndTime: false,
                endTimeData: timeArr
            })
        };
        if (_this.state.scheduleDay && _this.state.scheduleDay.startTime) {
            setEnd(_this, _this.state.scheduleDay);
        } else {
            debugger
            getScheduleDay(permission.userId, beginDate, function (res) {
                    if (res.errorCode == "0") {
                        setEnd(_this, res.data);
                        _this.setState({
                            scheduleDay: res.data,
                        })
                    }
                }
            )
        }
    };
    //获取配置参数方法
    maxDate = (leTypeData, type, _dataObj) => {
        let dataObj = _dataObj;
        let workingSeniority = this.state.workingSeniority;//个人实际工龄
        let sieWorkingSeniority = this.state.sieWorkingSeniority;//个人公司工龄
        let contractBase = this.state.contractBase;//合同地
        let socialBase = this.state.socialBase;//社保地

        // {guangzhou: "178"}
        // 1: {shenzhen: "178"}
        // 2: {shunde: "178"}
        // 3: {wuhan: "128"}
        // 4: {shanghai: "128"}
        // 5: {beijing: "128"}
        // 6: {qita: "178"}

        if (socialBase != "guangzhou" &&
            socialBase != "shenzhen" &&
            socialBase != "shunde" &&
            socialBase != "wuhan" &&
            socialBase != "shanghai" &&
            socialBase != "beijing") {
            socialBase = "qita"
        }
        let sex = this.state.sex;//性别
        let annualLeBalance = this.state.annualLeBalance;//年假余额
        let transferLeBalance = this.state.transferLeBalance;//调休假余额

        let maxDays = 0, beginDate;
        beginDate = dataObj.beginDate ?
            new Date(dataObj.beginDate + " 00:00:00") :
            new Date(DateFormat.yyyy_MM_dd(new Date()) + " 00:00:00");

        if (type == "年假") {
            console.log("年假:" + annualLeBalance);
            return DateFormat.yyyy_MM_dd(new Date(beginDate.getTime() + (parseInt(annualLeBalance) - 1) * 24 * 60 * 60 * 1000));
        }
        if (type == "调休假") {
            console.log("调休假:" + transferLeBalance);
            return DateFormat.yyyy_MM_dd(new Date(beginDate.getTime() + (parseInt(transferLeBalance) - 1) * 24 * 60 * 60 * 1000));
        }

        for (let o in leTypeData.ismaxdays) {
            if (leTypeData.ismaxdays[o].length) {
                switch (o) {
                    case "contract"://根据合同
                        if (type == "景同产假" || type == "景同难产假") {
                            let fetalTypeValue = dataObj.fetalTypeValue || "fetus_1";
                            let flag = type == "景同产假" ? fetalTypeValue : "fetus_0";
                            let flagData = leTypeData.ismaxdays[o].filter((item) => Object.keys(item)[0] == flag);
                            maxDays = flagData[0][flag].filter((item) => Object.keys(item)[0] == contractBase);
                        } else {
                            maxDays = leTypeData.ismaxdays[o].filter((item) => Object.keys(item)[0] == contractBase);

                        }
                        console.log("根据合同:" + type);
                        console.log(maxDays);
                        return DateFormat.yyyy_MM_dd(new Date(beginDate.getTime() + (parseInt(maxDays[0][contractBase]) - 1) * 24 * 60 * 60 * 1000));
                        break;
                    case "social"://社保地
                        //产假  是否选择胎数
                        let fetalTypeValue = dataObj.fetalTypeValue || "fetus_1";
                        let flag = type == "产假" ? fetalTypeValue : "fetus_0";
                        let flagData = leTypeData.ismaxdays[o].filter((item) => Object.keys(item)[0] == flag);
                        maxDays = flagData[0][flag].filter((item) => Object.keys(item)[0] == socialBase);
                        console.log("根据社保地:" + type);
                        console.log(maxDays);
                        return DateFormat.yyyy_MM_dd(new Date(beginDate.getTime() + (parseInt(maxDays[0][socialBase]) - 1) * 24 * 60 * 60 * 1000));
                        break;
                    case "workage"://工龄
                        let content = leTypeData.ismaxdays[o];
                        let getDays = (content) => {
                            for (let o of content) {
                                let k1 = Object.keys(o)[0];
                                let kNum = k1.split('_');
                                if (parseInt(kNum[0]) <= parseInt(workingSeniority) && parseInt(workingSeniority) <= parseInt(kNum[1])) {
                                    for (let o2 of o[k1]) {
                                        let k2 = Object.keys(o2)[0];
                                        if (k2 == "none") {
                                            return o2[k2]
                                        } else {
                                            let kNum = k2.split('_');
                                            if (parseInt(kNum[0]) <= parseInt(sieWorkingSeniority) && parseInt(sieWorkingSeniority) <= parseInt(kNum[1])) {
                                                return o2[k2]
                                            }
                                        }
                                    }
                                }
                            }
                        };
                        let days = getDays(content);
                        console.log("根据工龄:" + type);
                        console.log(days);
                        return DateFormat.yyyy_MM_dd(new Date(beginDate.getTime() + (parseInt(days) - 1) * 24 * 60 * 60 * 1000));
                        break;
                    case "sex"://性别
                        maxDays = leTypeData.ismaxdays[o].filter((item) => Object.keys(item)[0] == sex);
                        console.log("根据性别:" + type);
                        console.log(maxDays);
                        return DateFormat.yyyy_MM_dd(new Date(beginDate.getTime() + (parseInt(maxDays[0][sex]) - 1) * 24 * 60 * 60 * 1000));
                        break;
                    case "other"://其他
                        maxDays = leTypeData.ismaxdays[o][0].default;
                        console.log("其他:" + type);
                        console.log(maxDays);
                        return DateFormat.yyyy_MM_dd(new Date(beginDate.getTime() + (parseInt(maxDays) - 1) * 24 * 60 * 60 * 1000));
                        break;
                }
            }
        }
        return dataObj.beginDate
    };
    handleFn = () => {
        this.setState({tipsOpen: false});
        let tipsType = this.state.tipsType;
        if (tipsType == 'success') {
            this.props.handleClose();
            this.props.history.push(`/apply/page/-null-`);
        }
    };
    submitFn = () => {
        let _this = this;
        let dataObj = eval('(' + JSON.stringify(this.state.dataObj) + ')');
        dataObj.required = true;
        this.setState({
            dataObj: dataObj,
            fileFlag: 0,
            leAttachArr: [],
        });

        //现在这里校验时间
        let scheduleDay = _this.state.scheduleDay;
        let beginDate = _this.state.dataObj.beginDate;
        let endDate = _this.state.dataObj.endDate;
        let beginTime = _this.state.dataObj.beginTime;
        let endTime = _this.state.dataObj.endTime;
        beginTime = beginTime.length < 5 ? "0" + beginTime : beginTime;
        endTime = endTime.length < 5 ? "0" + endTime : endTime;

        let bt = parseFloat(beginTime.replace(":", "."));
        let et = parseFloat(endTime.replace(":", "."));


        //同一天 比较时间的大小 校验是否是休息期间的时间
        if (beginDate == endDate) {
            if (bt >= et) {//开始时间大于结束时间
                _this.setState({
                    tipsOpen: true,
                    tipsType: 'fail',
                    tipsTitle: '时间选择错误',
                    tipsContent: '结束时间须大于开始时间，请重选结束时间再提交！',
                    btnText: '',
                });
                return false
            }
        }

        if (scheduleDay && scheduleDay.startTime == "08:30") {
            //8:30 12:00   13:30 - 18:00
            if (beginTime == "12:00" || beginTime == "12:30" || beginTime == "13:00") {
                _this.setState({
                    tipsOpen: true,
                    tipsType: 'fail',
                    tipsTitle: '开始时间选择错误',
                    tipsContent: '开始时间不能选12:00-13:00（休息时间内），请重选时间再提交！',
                    // tipsContent: '排班为08:30开始上班的，开始时间不能选择休息时间结束点（"12:00"、"18:00"）和休息期间（"12:30"、"13:00"）,请点击“返回”并重选开始时间。',
                    btnText: '',
                });
                return false
            }
            if (beginTime == "18:00") {
                _this.setState({
                    tipsOpen: true,
                    tipsType: 'fail',
                    tipsTitle: '开始时间选择错误',
                    tipsContent: '开始时间不能选18:00(下班时间点），请重选时间再提交！',
                    btnText: '',
                });
                return false
            }
            if (endTime == "12:30" || endTime == "13:00" || endTime == "13:30") {
                _this.setState({
                    tipsOpen: true,
                    tipsType: 'fail',
                    tipsTitle: '结束时间选择错误',
                    tipsContent: '结束时间不能选12:30-13:30（休息时间内），请重选时间再提交！',
                    //tipsContent: '排班为08:30开始上班的，结束时间不能选择休息时间开始点（"08:30"、"13:30"）和休息期间（"12:30"、"13:00"）,请点击“返回”并重选结束时间。',
                    btnText: '',
                });
                return false
            }
            if (endTime == "08:30") {
                _this.setState({
                    tipsOpen: true,
                    tipsType: 'fail',
                    tipsTitle: '结束时间选择错误',
                    tipsContent: '结束时间不能选08:30(上班时间点），请重选时间再提交！',
                    btnText: '',
                });
                return false
            }
        } else if (scheduleDay && scheduleDay.startTime == "09:00") {
            //9:00 12:00   13:00 - 18:00
            if (beginTime == "12:00" || beginTime == "12:30") {
                _this.setState({
                    tipsOpen: true,
                    tipsType: 'fail',
                    tipsTitle: '开始时间选择错误',
                    tipsContent: '开始时间不能选12:00-12:30（休息时间内），请重选时间再提交！',
                    //tipsContent: '排班为09:00开始上班的，开始时间不能选择休息时间结束点（"12:00"、"18:00"）和休息期间（"12:30"）,请点击“返回”并重选开始时间。',
                    btnText: '',
                });
                return false
            }
            if (beginTime == "18:00") {
                _this.setState({
                    tipsOpen: true,
                    tipsType: 'fail',
                    tipsTitle: '开始时间选择错误',
                    tipsContent: '开始时间不能选18:00(下班时间点），请重选时间再提交！',
                    //tipsContent: '排班为09:00开始上班的，开始时间不能选择休息时间结束点（"12:00"、"18:00"）和休息期间（"12:30"）,请点击“返回”并重选开始时间。',
                    btnText: '',
                });
                return false
            }
            if (endTime == "12:30" || endTime == "13:00") {
                _this.setState({
                    tipsOpen: true,
                    tipsType: 'fail',
                    tipsTitle: '结束时间选择错误',
                    tipsContent: '结束时间不能选12:30-13:00（休息时间内），请重选时间再提交！',
                    //tipsContent: '排班为09:00开始上班的，结束时间不能选择休息时间开始点（"09:00"、"13:00"）和休息期间（"12:30"）,请点击“返回”并重选结束时间。',
                    btnText: '',
                });
                return false
            }
            if (endTime == "09:00") {
                _this.setState({
                    tipsOpen: true,
                    tipsType: 'fail',
                    tipsTitle: '结束时间选择错误',
                    tipsContent: '结束时间不能选09:00(上班时间点），请重选时间再提交！',
                    //tipsContent: '排班为09:00开始上班的，结束时间不能选择休息时间开始点（"09:00"、"13:00"）和休息期间（"12:30"）,请点击“返回”并重选结束时间。',
                    btnText: '',
                });
                return false
            }
        }


        setTimeout(function () {
            if (document.getElementsByClassName('errorTipBox').length == 0 &&
                document.getElementsByClassName('errorFileSize').length == 0 &&
                document.getElementsByClassName('fileErrorLength').length == 0) {

                let submitFn = (_this) => {
                    let formData = {};

                    formData["appName"] = "考勤工时管理中心";
                    formData["instanceFormType"] = dataObj.leType;//调休假

                    formData["type"] = _this.state.submitType;//
                    formData["flag"] = "";
                    formData["leId"] = _this.props.type == "edit" ? _this.props.bpmInfo.businessKey.split('.')[1] : "";
                    formData["instanceId"] = _this.props.type == "edit" ? _this.props.bpmInfo.instanceId : "";

                    formData["userId"] = permission.userId;
                    formData["zhName"] = permission.zhName;

                    formData["orgName"] = permission.orgName;
                    formData["telephone"] = permission.telephone;
                    formData["costCenter"] = permission.costCenter;
                    formData["socialBase"] = permission.socialBase;
                    formData["contractBase"] = permission.contractBase;

                    formData["annualLeBalance"] = _this.state.annualLeBalance;
                    formData["transferLeBalance"] = _this.state.transferLeBalance;

                    formData["leType"] = dataObj.leType;
                    formData["leReason"] = dataObj.leReason;
                    formData["leDays"] = _this.state.hour;

                    if (dataObj.isPo == "是") {
                        formData["poId"] = dataObj.poId || "";
                        formData["poName"] = dataObj.poName || "";
                    } else {
                        formData["poId"] = "";
                        formData["poName"] = "";
                    }


                    formData["isMuBirths"] = dataObj.fetalTypeValue || "";
                    formData["isMorning"] = dataObj.lactationTypeValue || "Y";

                    formData["beginDate"] = dataObj.beginDate;
                    formData["endDate"] = dataObj.endDate;
                    if (dataObj.leTypeValue == "哺乳假") {

                        let lBegin = dataObj.lactationHour.split('-')[0].trim();
                        let lEnd = dataObj.lactationHour.split('-')[1].trim();
                        lBegin = lBegin.split(':');
                        lEnd = lEnd.split(':');
                        lBegin = parseInt(lBegin[0]) + "." + (parseInt(lBegin[1]) == "00" ? "0" : "5");
                        lEnd = parseInt(lEnd[0]) + "." + (parseInt(lEnd[1]) == "00" ? "0" : "5");

                        formData["beginTime"] = lBegin;
                        formData["endTime"] = lEnd;

                    } else {
                        formData["beginTime"] = dataObj.beginTimeValue || "8.5";
                        formData["endTime"] = dataObj.endTimeValue || "18.0";
                    }
                    if (_this.state.leAttach.length > 0 || _this.state.leAttachArr.length > 0) {
                        let leAttach = _this.state.leAttach || [];
                        let leAttachArr = _this.state.leAttachArr || [];
                        let leAttachSum = leAttach.concat(leAttachArr);
                        formData["leAttach"] = leAttachSum.join(';');
                    }

                    // let files = _this.state.files;
                    // for (let f of files) {
                    //     formData.append("leAttachList", f);
                    // }

                    // if (files.length == 0) {
                    //     formData.append("leAttachList", {});
                    // }

                    // _this.setState({
                    //     loading: true
                    // });
                    console.log("formData:提交的数据：");
                    console.log(formData);

                    _this.setState({
                        tipsOpen: true,
                        tipsType: 'submitting',
                        tipsTitle: '正在提交中...',
                        tipsContent: '',
                        btnText: '',
                    });

                    if (_this.props.type == "edit") {
                        resSubmitLeave(formData, function (res) {
                            // _this.setState({
                            //     loading: false,
                            //     submitFlag: res.errorCode == "0" ? "success" : "failure",
                            //     submitFlagText: res.errorMsg
                            // });
                            _this.setState({
                                tipsOpen: true,
                                tipsType: res.errorCode == "0" ? "success" : "fail",
                                tipsTitle: res.errorCode == "0" ? "提交成功" : "提交失败",
                                tipsContent: res.errorCode == "0" ? "点击即将跳转我的申请" : res.errorMsg || "请联系IT管理部",
                                btnText: res.errorCode == "0" ? "跳转" : "返回",
                            });
                        })
                    } else {
                        submitLeave(formData, function (res) {

                            // _this.setState({
                            //     loading: false,
                            //     submitFlag: res.errorCode == "0" ? "success" : "failure",
                            //     submitFlagText: res.errorMsg
                            // });
                            _this.setState({
                                tipsOpen: true,
                                tipsType: res.errorCode == "0" ? "success" : "fail",
                                tipsTitle: res.errorCode == "0" ? "提交成功" : "提交失败",
                                tipsContent: res.errorCode == "0" ? "点击即将跳转我的申请" : res.errorMsg || "请联系IT管理部",
                                btnText: res.errorCode == "0" ? "跳转" : "返回",
                            });
                        })
                    }
                };

                let files = _this.state.files;

                if (files.length > 0) {
                    _this.setState({
                        tipsOpen: true,
                        tipsType: 'submitting',
                        tipsTitle: '图片上传中',
                        tipsContent: '',
                        btnText: '',
                    });
                }

                for (let i = 0; i < files.length; i++) {
                    let formDataFile = new FormData();
                    formDataFile.append("multipartFile", files[i]);

                    submitFile(formDataFile, function (res) {
                        if (res.errorCode == "0") {
                            let fileFlag = _this.state.fileFlag + 1;
                            let leAttachArr = _this.state.leAttachArr;
                            leAttachArr.push(res.data);
                            _this.setState({
                                fileFlag,
                                leAttachArr,
                            });
                            if (fileFlag == (_this.state.files.length)) {
                                submitFn(_this);
                            }
                        } else {
                            _this.setState({
                                tipsOpen: true,
                                tipsType: 'fail',
                                tipsTitle: '图片上传失败',
                                tipsContent: res.errorMsg || "请联系数字及流程IT部！",
                                btnText: '',
                            });
                        }
                    }, function (res) {
                        _this.setState({
                            tipsOpen: true,
                            tipsType: 'fail',
                            tipsTitle: '图片上传失败',
                            tipsContent: res.errorMsg || "请联系数字及流程IT部！",
                            btnText: '',
                        });
                    });
                }

                if (files.length == 0) {
                    submitFn(_this);
                }


            } else if (document.getElementsByClassName('errorFileSize').length > 0) {
                _this.setState({
                    tipsOpen: true,
                    tipsType: 'fail',
                    tipsTitle: '须上传不能大于5M的图片',
                    tipsContent: '',
                    btnText: '',
                });
            } else if (document.getElementsByClassName('fileErrorLength').length > 0) {
                _this.setState({
                    tipsOpen: true,
                    tipsType: 'fail',
                    tipsTitle: '附件数量不对',
                    tipsContent: '上传的附件数量不符合要求，请按要求相同数量的附件！',
                    btnText: '',
                });
            } else {
                console.log("false")
            }
        }, 100);
    };
    submitCallBack = (type) => {
        this.setState({
            submitFlag: ""
        });
        if (type == "success") {
            this.props.handleClose();
            this.props.history.push(`/apply/page/-null-`);
        }
    };

    handleBouer = () => {
        this.props.history.push(`/task/email/9251`);
    };
    handleBouer2 = () => {
        this.props.history.push(`/apply/page/-null-`);
    };
    getPersonTypeFn = () => {
        const _this = this
        getpersontype(permission.userId, function (res) {
            if (res.errorCode == "0") {
                _this.setState({
                    personType: res.data
                })
            }
        })
    }


    componentWillMount() {
        permission = eval('(' + LocalStore.getItem("permission") + ')');
        let dataObj = eval("(" + JSON.stringify(this.state.dataObj) + ")");
        dataObj.userId = permission.userId;
        dataObj.zhName = permission.zhName + "|" + permission.orgName;
        this.getSecondOrgIdFn();
        this.setState({
            dataObj: dataObj,
            sex: permission.sex || "F",
            socialBase: permission.socialBasePy || "",
            contractBase: permission.contractBasePy || "",
            permission,
        });
    }

    componentDidMount() {
        this.getIfTransfer();
        this.getScheduleInfoFn();

        this.getWorkLengthFn();
        // this.getLeaveOverFn();
        this.getIsAllowAfterFn();

        // this.getProjectFn();
        this.getSubmitTypeFn();
        // 在这里判断请求标识位是否更新
        // getConfigLeaveVersion(function (res) {
        // })
        this.getConfigLeaveFn();

        this.getPersonTypeFn()
        // let beginDate = DateFormat.yyyy_MM_dd(new Date());
        // //请求单天的排班，并设置开始日期
        // this.getScheduleDayFn(permission.userId, beginDate);

    }

    render() {
        const tipDataSource = this.state.ifJTPerson ? tipData1 : tipData;
        const checkSubmit = this.state.checkSubmit
        return (
            <Dialog contentStyle={contentStyle}
                    bodyStyle={bodyStyle}
                    open={this.props.open}>
                <div id="leave">
                    {/*<div onClick={this.handleBouer}>邮件</div>*/}
                    {/*<div onClick={this.handleBouer2}>跳转</div>*/}
                    <div className="formTit">
                        <span className="titSpan"> </span>
                        <p className="titText">休假申请</p>
                    </div>

                    {this.props.bpmInfo && this.props.bpmInfo['opinion'] ?
                        <div className="opinion"><span>驳回原因:</span><span>{this.props.bpmInfo.opinion}</span>
                        </div> : null}

                    {randerForm(this)}
                    {/*哺乳假模块-先用简单的*/}
                    {/*{this.state.dataObj.leType == "哺乳假" && this.state.lactationData.length > 0 ?
                     randerLactation(this) : null
                     }*/}
                    {this.state.attachment.enable ? uploadFile(this) : null}
                    {
                        this.state.dataObj.required && //提交的事后校验
                        this.state.attachment.enable &&//附件必填
                        this.state.dataObj.leType && //已选择休假类型
                        (this.state.files.length + this.state.leAttach.length) == 0 //
                            ?
                            <div className="fileErrorLength">
                                附件不能为空，{this.state.dataObj.leType}必须上传{this.state.attachment.amount}附件图片。
                            </div>
                            : null
                    }
                    {(this.state.files.length + this.state.leAttach.length) > 0 ?
                        this.state.attachment.amount == (this.state.files.length + this.state.leAttach.length) ?
                            null :
                            this.state.attachment.amount ? <div className="fileErrorLength">
                                请按要求上传附件数量，{this.state.dataObj.leType}必须上传{this.state.attachment.amount}附件图片。
                            </div> : null
                        : null
                    }

                    {/*休假提示模块*/}


                    {tipDataSource.map((item, index) => {
                        let text = this.state.dataObj.leType && item.key == this.state.dataObj.leType ?
                            item.text : "";
                        if (text) {
                            return <div className="tipBoxType"><p>{text}</p></div>
                        }
                    })}

                    <div className="tipBox">
                        <p>1.除事假、调休假、年假、短病假、工伤假外，其余假均含周末及法定节假日。</p>
                        <p>
                            2.除特殊情况及特殊假期（病假、丧假）外，所有假期应提前3天申请；如超过一个星期的，应提前15天申请，否则公司有权不予以批准；特殊情况的可事先请示部门负责人，并于假期结束后一周内补齐休假手续。</p>
                        <p>3.项目休假：选“是”则本次休假流程会经过所选项目的项目经理和项目总监审批，选“否”则直接是部门领导审批。</p>
                    </div>

                    {/*提交按钮模块*/}
                    <div className="btnBox">
                        <div className="btnCont">
                            <Button scenesType={checkSubmit ? "submit" : "disabled"} btnText="确认"
                                    handleBtn={checkSubmit ? this.submitFn : null}/>
                            <Button scenesType="back" btnText="返回" handleBtn={this.props.handleClose}/>
                        </div>
                    </div>

                    {/*提交休假返回值弹框*/}
                    {/* <Dialog
                     open={this.state.submitFlag == "success" || this.state.submitFlag == "failure" ? true : false}>
                     {this.state.submitFlag == "success" ?
                     <div className="callBackBox">
                     <p>提交成功</p>
                     <Button scenesType="submit" btnText="确认"
                     handleBtn={this.submitCallBack.bind(this, "success")}/>
                     </div>
                     : null
                     }
                     {this.state.submitFlag == "failure" ?
                     <div className="callBackBox">
                     <p>提交失败,{this.state.submitFlagText}</p>
                     <Button scenesType="submit" btnText="返回"
                     handleBtn={this.submitCallBack.bind(this, "failure")}/>
                     </div>
                     : null
                     }
                     </Dialog>*/}

                    {/*{this.state.loading ? <Loading/> : null}*/}
                    <TipsDialog open={this.state.tipsOpen}
                                type={this.state.tipsType}
                                title={this.state.tipsTitle}
                                content={this.state.tipsContent}
                                handleFn={this.handleFn}
                    />


                </div>
            </Dialog>
        )
    }
}

export default withRouter(Leave);



