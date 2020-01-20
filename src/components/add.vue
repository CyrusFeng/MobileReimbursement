<template>
    <div style="height: 100%;" id="add">
        <GoBack v-if="$store.state.UA !== 1">新增单据</GoBack>
        <div class="tab-title-wrap">
            <div class="tab-title">
                <div class="nav-item" :class="{'nav_active':index == currentIndex}" v-for="(item,index) in titlebar"
                     :key="index" @click="changeIndex(index,$event)" ref="nav_item">
                    <span>{{item.name}}</span>
                </div>
                <span class="line" ref="line"></span>
            </div>
        </div>

        <div class="parent-swiper swiper-container swiper-no-swiping" :class="{'hiddenNav':$store.state.UA===1}">
            <div class="swiper-wrapper">
                <div class="swiper-slide">
                    <div class="list-wrap travel-apply" ref="wrapper1">
                        <div class="wrap">
                            <div class="new-data">
                                <div class="head">
                                    <div class="avator">
                                        <!--<img src="../assets/add.png" alt="">-->

                                        <img :src="image" v-if="image !== 'data:image/jpeg;base64,' &&  image">
                                        <img src="../assets/defaultAvator.png" v-else>
                                    </div>
                                    <div class="name" v-if="travelApplyData.applicant">
                                        {{travelApplyData.applicant.name}}
                                    </div>
                                </div>
                                <div class="content">
                                    <div class="row">
                                        <div class="label">业务日期&nbsp;<span>*</span></div>
                                        <!--<div class="right">{{travelApplyData.applyDate}}</div>-->
                                        <div class="right" v-if="travelApplyData.applyDate">
                                            <JMInput
                                                    :defaultValue="travelApplyData.applyDate.substr(0,travelApplyData.applyDate.indexOf(' '))"
                                                    defaultType="date"
                                                    tips="请选择日期"
                                                    @update:inputValue="getTravelApplyDate($event)"></JMInput>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="label">申请部门&nbsp;<span>*</span></div>
                                        <div class="right" v-if="travelApplyData.applyDept">
                                            {{travelApplyData.applyDept.name}}
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="label">申请公司&nbsp;<span>*</span></div>
                                        <div class="right" v-if="travelApplyData.company">
                                            {{travelApplyData.company.name}}
                                        </div>
                                    </div>
                                    <div class="row peer-people">
                                        <div class="label">同行人</div>
                                        <div class="right" @click="peerPeopleVisible = true">
                                            <span>{{selectedPeerPeopleList.reduce((prev,current)=>{return prev +
                                            current.name+' | '},'').replace(/(\s*$)/g,"").replace(/(\|*$)/g,"").replace(/(\s*$)/g,"")}}</span>
                                            <i class="icon"></i>

                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="label">出差理由</div>
                                        <div class="right">
                                            <JMTextarea :defaultValue="travelApplyData.remark"
                                                        @update:inputValue="getTravelRemark"></JMTextarea>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="reimburse-info info-wrap">
                                <div class="reimburse-list">
                                    <div class="reimburse-item travelApply" v-for="(item,index) in travelList"
                                         :key="item.seq">
                                        <div class="head ">
                                            <div class="left">
                                                <i class="icon"></i>
                                                <span>出差行程</span>
                                            </div>
                                            <div class="right" @click="deleteTravel(item)">
                                                <span>删除</span>
                                            </div>
                                        </div>
                                        <div class="content">
                                            <div class="row">
                                                <div class="label">出发时间&nbsp;<span>*</span></div>
                                                <div class="right">
                                                    <JMInput defaultType="date"
                                                             tips="请选择日期"
                                                             :defaultValue="item.startTime.substr(0,item.startTime.indexOf(' '))"
                                                             @update:inputValue="item.startTime=$event"></JMInput>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="label">出发地&nbsp;<span>*</span></div>
                                                <div class="right">
                                                    <JMInput defaultType="text"
                                                             tips="请填写出发地"
                                                             :defaultValue="item.startPlace"
                                                             @update:inputValue="item.startPlace=$event"></JMInput>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="label">目的地&nbsp;<span>*</span></div>
                                                <div class="right">
                                                    <JMInput defaultType="text"
                                                             tips="请填写目的地"
                                                             :defaultValue="item.endPlace"
                                                             @update:inputValue="item.endPlace=$event"></JMInput>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="label">离开时间&nbsp;<span>*</span></div>
                                                <div class="right">
                                                    <JMInput defaultType="date"
                                                             tips="请选择日期"
                                                             :defaultValue="item.endTime.substr(0,item.endTime.indexOf(' '))"
                                                             @update:inputValue="item.endTime=$event"></JMInput>
                                                </div>
                                            </div>
                                            <div class="row peer-people">
                                                <div class="label">协议酒店</div>
                                                <div class="right" @click="item.showChooseHotel = true">
                                                    <JMSelectHotel
                                                            :chooseHotelVisible="item.showChooseHotel"
                                                            @update:chooseHotelVisible="XXX($event,item)"></JMSelectHotel>
                                                </div>
                                            </div>
                                            <!--<div class="row">-->
                                                <!--<div class="label">行程说明</div>-->
                                                <!--<div class="right">-->
                                                    <!--<JMInput defaultType="text"-->
                                                             <!--tips="请填写行程说明"-->
                                                             <!--:defaultValue="item.explain"-->
                                                             <!--@update:inputValue="item.explain=$event"></JMInput>-->
                                                <!--</div>-->
                                            <!--</div>-->
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="btns-wrap">
                                <span @click="saveTravelApply">保存</span>
                                <span @click="submitTravelApply">提交</span>
                            </div>

                        </div>
                        <PeerPeople v-if="travelApplyData.applyDept"
                                    :userId="userId"
                                    :deptId="travelApplyData.applyDept.id"
                                    @update:selectedPeerPeopleList="getPeerPeople"
                                    :selectedPeerPeopleList="selectedPeerPeopleList"
                                    @update:peerPeopleVisible="peerPeopleVisible=$event"
                                    :peerPeopleVisible="peerPeopleVisible"
                        ></PeerPeople>
                    </div>
                </div>
                <div class="swiper-slide">
                    <div class="list-wrap travel-account" ref="wrapper2">
                        <div class="wrap">
                            <div class="new-data">
                                <div class="head">
                                    <div class="avator">
                                        <img :src="image" v-if="image !== 'data:image/jpeg;base64,' &&  image">
                                        <img src="../assets/defaultAvator.png" v-else>
                                    </div>
                                    <div class="name" v-if="travelAccountData.applicant">
                                        {{travelAccountData.applicant.name}}
                                    </div>
                                </div>
                                <div class="content" :class="{folded:!travelAccountFolded}">
                                    <div class="row">
                                        <div class="label">领款人&nbsp;<span>*</span></div>
                                        <div class="right" v-if="travelAccountData.payee">
                                            <!--{{personExpenseData.payee.name}}-->
                                            <JMSelected :orgRange="personArray"
                                                        :defaultValue="travelAccountData.payee"
                                                        :defaultValueId="travelAccountData.payee.id"
                                                        @update:itemObj="getPersonInfoItemToTravelAccountData($event)"></JMSelected>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="label">申请日期&nbsp;<span>*</span></div>
                                        <div class="right" v-if="travelAccountData.applyDate">
                                            {{travelAccountData.applyDate.substr(0,travelAccountData.applyDate.indexOf(' '))}}
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="label">预算项目&nbsp;<span>*</span></div>
                                        <div class="right" v-if="travelAccountData.budget">
                                            <JMSelected :orgRange="budgetItemInfoTA"
                                                        :defaultValue="travelAccountData.budget"
                                                        :defaultValueId="travelAccountData.budget.id"
                                                        defaultkey="预算项目"
                                                        :clear="clearBudgetPer"
                                                        @update:clear="clearBudgetPer = $event"
                                                        @update:itemObj="getBudgetItemToTravelAccountData($event)"></JMSelected>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="label">费用名称&nbsp;<span>*</span></div>
                                        <div class="right" v-if="travelAccountData.accountView">
                                            <JMSelected :orgRange="accountViewList"
                                                        :defaultValue="travelAccountData.accountView"
                                                        :defaultValueId="travelAccountData.accountView.id"
                                                        defaultkey="差旅报销单费用名称"
                                                        :clear="clearAccountView"
                                                        @update:clear="clearAccountView = $event"
                                                        @update:itemObj="getAccountViewInfoToTravelAccountData($event)"></JMSelected>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="label">付款单位&nbsp;<span>*</span></div>
                                        <div class="right" v-if="travelAccountData.company">
                                            {{travelAccountData.company.name}}
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="label">申请部门&nbsp;<span>*</span></div>
                                        <div class="right" v-if="travelAccountData.applyDept">
                                            <JMSelected :orgRange="deptRange"
                                                        :defaultValue="travelAccountData.applyDept"
                                                        @update:itemObj="getApplyDeptToTravelAccountData($event)"></JMSelected>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="label">费用承担&nbsp;<span>*</span></div>
                                        <div class="right" v-if="travelAccountData.costCenter">
                                            <!--{{personExpenseData.payee.name}}-->
                                            <JMSelected :orgRange="orgRange"
                                                        :defaultValue="travelAccountData.costCenter"
                                                        @change="getCostCenterToTravelAccountDataChangeEvent($event)"
                                                        @update:itemObj="getCostCenterToTravelAccountData($event)"></JMSelected>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="label">收款银行&nbsp;<span>*</span></div>
                                        <div class="right">{{travelAccountData.bankName}}</div>
                                    </div>
                                    <div class="row">
                                        <div class="label">收款账号&nbsp;<span>*</span></div>
                                        <div class="right">{{travelAccountData.accountNum}}</div>
                                    </div>
                                </div>
                                <div class="bottom">
                                    <div @click="travelAccountFolded = !travelAccountFolded">
                                        <p v-if="travelAccountFolded">
                                            <span>展开</span>
                                            <i class="icon"></i>
                                        </p>
                                        <p v-else class="unfolded">
                                            <span>收起</span>
                                            <i class="icon"></i>
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div class="info-wrap explain">
                                <div class="head">
                                    <div class="left">
                                        <i class="icon"></i>
                                        <span>费用说明</span>
                                    </div>
                                    <div class="right">
                                        <span @click="generateTravelAccount">生成费用说明</span>
                                    </div>
                                </div>
                                <div class="text">
                                    <JMTextarea :default-value="word1"
                                                :remark="travelAccountData.remark"
                                                @update:inputValue="travelAccountData.remark = $event"></JMTextarea>
                                </div>
                            </div>
                            <div class="info-wrap">
                                <div class="reimburse-list-wrap">
                                    <div class="reimburse-list">
                                        <div class="reimburse-item">
                                            <div class="head TravelAccount">
                                                <div class="left">
                                                    <i class="icon"></i>
                                                    <span>我的行程</span>
                                                </div>
                                            </div>
                                            <div class="summary">
                                                <div class="block">
                                                    <span class="label">总行程金额（元）</span>
                                                    <span class="num">{{amount}}</span>
                                                </div>
                                                <div class="line"></div>
                                                <div class="block">
                                                    <span class="label">发票总数</span>
                                                    <span class="num">{{selectedInvoiceTravelAccount.length}}</span>
                                                </div>
                                            </div>
                                            <div class="content-wrap">
                                                <div class="content" v-for="selectedTravelApply in selectedTravelApplyList">
                                                    <div class="travelMessage" v-for="item in selectedTravelApply.entrys"
                                                         v-if="selectedTravelApply">
                                                        <div class="main">
                                                            <div class="top">
                                                                <div class="left">
                                                                    <span>费用合计：</span>
                                                                    <!--<span>{{item.amountSubsidy+-->
                                                                        <!--item.amountVeh+-->
                                                                        <!--item.amountHotel+-->
                                                                        <!--item.amountTaxi+-->
                                                                        <!--item.amountRec+-->
                                                                        <!--item.amountOther}}</span>-->
                                                                    <span>{{$accAdd(item.amountSubsidy,$accAdd(item.amountVeh,$accAdd(item.amountHotel,$accAdd(item.amountTaxi,$accAdd(item.amountRec,item.amountOther)))))}}</span>
                                                                </div>
                                                                <div class="right" @click="addInvoiceToEntry(item)">
                                                                    <span>添加发票</span>
                                                                </div>
                                                            </div>
                                                            <div class="body">
                                                                <div class="row">
                                                                    <div class="block">
                                                                        <span>{{item.startPlace}}</span>
                                                                        <span v-if="item.endTime">{{item.startTime.substr(0,item.startTime.indexOf(' '))}}</span>
                                                                    </div>
                                                                    <div class="middle">
                                                                        <div class="line-wrap">
                                                                            <div class="line"></div>
                                                                            <div class="type">
                                                                                <i class="icon"></i>
                                                                            </div>
                                                                            <div class="line"></div>
                                                                        </div>
                                                                        <div class="name" v-if="false">项目出差</div>
                                                                    </div>

                                                                    <div class="block">
                                                                        <span>{{item.endPlace}}</span>
                                                                        <span v-if="item.endTime">{{item.endTime.substr(0,item.endTime.indexOf(' '))}}</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="item-wrap">
                                                            <div class="item">
                                                                <div class="label">
                                                                    <i class="icon days"></i>
                                                                    <span>出差天数</span>
                                                                </div>
                                                                <div class="right">
                                                                    <JMInput defaultType="number"
                                                                             tips="请填写"
                                                                             :defaultValue="item.days?item.days:''"
                                                                             @update:inputValue="item.days=$event"></JMInput>
                                                                </div>
                                                            </div>
                                                            <div class="item">
                                                                <div class="label">
                                                                    <i class="icon butie"></i>
                                                                    <span>出差补贴</span>
                                                                </div>
                                                                <div class="right">
                                                                    <JMInput defaultType="number"
                                                                             tips="请填写"
                                                                             :defaultValue="item.amountSubsidy?item.amountSubsidy:''"
                                                                             @update:inputValue="amountSubsidy($event,item)"></JMInput>
                                                                </div>
                                                            </div>
                                                            <div class="item">
                                                                <div class="label">
                                                                    <i class="icon amountVeh"></i>
                                                                    <span>交通金额</span>
                                                                </div>
                                                                <div class="right">
                                                                    <JMInput defaultType="number"
                                                                             tips="请填写"
                                                                             :defaultValue="item.amountVeh?item.amountVeh:''"
                                                                             @update:inputValue="amountVeh($event,item)"></JMInput>
                                                                </div>
                                                            </div>
                                                            <div class="item vehicle">
                                                                <div class="label">
                                                                    <i class="icon vehicle"></i>
                                                                    <span>交通工具</span>
                                                                </div>
                                                                <div class="right">
                                                                    <JMSelectLittle :vehicle="item.vehicle"
                                                                                    @update:selected="vehicle($event,item)"></JMSelectLittle>
                                                                </div>
                                                            </div>
                                                            <div class="item">
                                                                <div class="label">
                                                                    <i class="icon amountHotel"></i>
                                                                    <span>住宿金额</span>
                                                                </div>
                                                                <div class="right">
                                                                    <JMInput defaultType="number"
                                                                             tips="请填写"
                                                                             :defaultValue="item.amountHotel?item.amountHotel:''"
                                                                             @update:inputValue="amountHotel($event,item)"></JMInput>
                                                                </div>
                                                            </div>
                                                            <div class="item">
                                                                <div class="label">
                                                                    <i class="icon amountTaxi"></i>
                                                                    <span>市内交通费</span>
                                                                </div>
                                                                <div class="right">
                                                                    <JMInput defaultType="number"
                                                                             tips="请填写"
                                                                             :defaultValue="item.amountTaxi?item.amountTaxi:''"
                                                                             @update:inputValue="amountTaxi($event,item)"></JMInput>
                                                                </div>
                                                            </div>
                                                            <div class="item">
                                                                <div class="label">
                                                                    <i class="icon amountRec"></i>
                                                                    <span>招待费</span>
                                                                </div>
                                                                <div class="right">
                                                                    <JMInput defaultType="number"
                                                                             tips="请填写"
                                                                             :defaultValue="item.amountRec?item.amountRec:''"
                                                                             @update:inputValue="amountRec($event,item)"></JMInput>
                                                                    <!--item.amountRec=$event-->
                                                                </div>
                                                            </div>
                                                            <div class="item">
                                                                <div class="label">
                                                                    <i class="icon amountOther"></i>
                                                                    <span>其他金额</span>
                                                                </div>
                                                                <div class="right">
                                                                    <JMInput defaultType="number"
                                                                             tips="请填写"
                                                                             :defaultValue="item.amountOther?item.amountOther:''"
                                                                             @update:inputValue="amountOther($event,item)"></JMInput>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="invoice-info info-wrap">
                                                            <div class="head">
                                                                <div class="left">
                                                                    <i class="icon"></i>
                                                                    <span>发票信息</span>
                                                                </div>
                                                            </div>
                                                            <div class="list">
                                                                <div class="tips" v-if="item.invoices.length<=0">未选择发票</div>
                                                                <div class="item" v-for="inv in item.invoices"
                                                                     :key="inv.id">
                                                                    <div class="head">
                                                                        <div class="left">
                                                                            <span>发票号码</span>
                                                                            <span>{{inv.invNumber}}</span>
                                                                        </div>
                                                                        <div class="shortname">{{inv.shortName}}</div>
                                                                        <div class="right">
                                                                            {{inv.isSpecialInv==='是'?'专':'普'}}
                                                                        </div>
                                                                    </div>
                                                                    <div class="body">
                                                                        <div class="row">
                                                                            <div class="left">
                                                                                <span>销方名称</span>
                                                                                <span>{{inv.invOutName}}</span>
                                                                            </div>
                                                                        </div>
                                                                        <div class="row">
                                                                            <div class="left">
                                                                                <span>购方名称</span>
                                                                                <span>{{inv.invInName}}</span>
                                                                            </div>
                                                                        </div>
                                                                        <div class="row">
                                                                            <div class="left">
                                                                                <span>发票金额</span>
                                                                                <span>{{inv.invAmount}}</span>
                                                                            </div>
                                                                            <div class="right" v-if="item.invDate">{{item.invDate.substr(0,item.invDate.indexOf(' '))}}</div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="btns-wrap">
                                <span @click="saveTravelAccount">保存</span>
                                <span @click="submitTravelAccount">提交</span>
                            </div>
                        </div>
                        <AddItinerary :userId="userId"
                                      :companyId="companyId"
                                      :childVisible="addItineraryVisible"
                                      @update:childVisible="addItineraryVisible=$event"
                                      @update:selectedTravelApplyList="haha"></AddItinerary>

                    </div>
                    <AddInvoice2
                            ref="AddInvoice2"
                            @update:childVisible="childVisibleTravelAccount=$event"
                            :childVisible="childVisibleTravelAccount"
                            @update:willBeSelectedList="yyyTravelAccount($event)"
                            @update:willBeRemovedList="zzzTravelAccount($event)"
                            :selectedInvoice="selectedInvoiceTravelAccount"
                            :companyId="companyId" :userId="userId"
                            :entryClicked="entryClicked"
                    ></AddInvoice2>
                </div>
                <div class="swiper-slide">
                    <div class="list-wrap person-expense" ref="wrapper3">
                        <div class="wrap" ref="wrapper4">
                            <div class="new-data">
                                <div class="head">
                                    <div class="avator">
                                        <img :src="image" v-if="image !== 'data:image/jpeg;base64,' &&  image">
                                        <img src="../assets/defaultAvator.png" v-else>
                                    </div>
                                    <div class="name" v-if="personExpenseData.applicant">
                                        {{personExpenseData.applicant.name}}
                                    </div>
                                </div>
                                <div class="content" :class="{folded:!personExpenseFolded}">
                                    <div class="row">
                                        <div class="label">领款人&nbsp;<span>*</span></div>
                                        <div class="right" v-if="personExpenseData.payee">
                                            <JMSelected :orgRange="personArray"
                                                        :defaultValue="personExpenseData.payee"
                                                        :defaultValueId="personExpenseData.payee.id"
                                                        @update:itemObj="getPersonInfoItem($event)"></JMSelected>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="label">申请日期&nbsp;<span>*</span></div>
                                        <div class="right" v-if="personExpenseData.applyDate">
                                            {{personExpenseData.applyDate.substr(0,personExpenseData.applyDate.indexOf(' '))}}
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="label">付款单位&nbsp;<span>*</span></div>
                                        <div class="right" v-if="personExpenseData.company">
                                            {{personExpenseData.company.name}}
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="label">申请部门&nbsp;<span>*</span></div>
                                        <div class="right" v-if="personExpenseData.applyDept">
                                            <JMSelected :orgRange="deptRange"
                                                        :defaultValue="personExpenseData.applyDept"
                                                        :defaultValueId="personExpenseData.applyDept.id"
                                                        @update:itemObj="getDeptRangeToPersonExpense($event)"></JMSelected>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="label">收款银行&nbsp;<span>*</span></div>
                                        <div class="right">{{personExpenseData.bankName}}</div>
                                    </div>
                                    <div class="row">
                                        <div class="label">收款账号&nbsp;<span>*</span></div>
                                        <div class="right">{{personExpenseData.accountNum}}</div>
                                    </div>
                                </div>
                                <div class="bottom">
                                    <div @click="personExpenseFolded = !personExpenseFolded">
                                        <p v-if="personExpenseFolded">
                                            <span>展开</span>
                                            <i class="icon"></i>
                                        </p>
                                        <p v-else class="unfolded">
                                            <span>收起</span>
                                            <i class="icon"></i>
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div class="desc info-wrap">
                                <div class="head">
                                    <div class="left">
                                        <i class="icon"></i>
                                        <span>费用说明</span>
                                    </div>
                                    <div class="right">
                                        <span @click="generate">生成费用说明</span>
                                    </div>
                                </div>
                                <div class="text">
                                    <JMTextarea :default-value="word2"
                                                :remark="personExpenseData.remark"
                                                @update:inputValue="personExpenseData.remark = $event"></JMTextarea>
                                </div>
                            </div>

                            <div class="reimburse-info info-wrap">
                                <div class="head">
                                    <div class="left">
                                        <i class="icon"></i>
                                        <span>报销信息</span>
                                    </div>
                                    <div class="right">
                                        <div class="add-entry" @click="addEntry">
                                            添加明细
                                        </div>
                                    </div>
                                </div>
                                <div class="summary">
                                    <div class="block">
                                        <span class="label">总金额（元）</span>
                                        <span class="num">{{(Number(selectedInvoice.reduce((prev,current)=>{return prev + current.invAmount},0))+Number(otherEntrys.reduce((prev,current)=>{return prev +current.amount},0))).toFixed(2)}}</span>
                                    </div>
                                    <div class="line"></div>
                                    <div class="block">
                                        <span class="label">发票总数</span>
                                        <JMInput defaultType="number"
                                                 tips="请填写"
                                                 :defaultValue="extraInvoice?selectedInvoice.length + extraInvoice:selectedInvoice.length"
                                                 :type="1"
                                                 @update:inputValue="personExpenseData.billCount=$event"></JMInput>
                                    </div>
                                </div>
                                <div class="reimburse-list">
                                    <div class="reimburse-item" v-for="(item,index) in otherEntrys" :key="item.id">
                                        <div class="head">
                                            <div class="left">
                                                <i class="line"></i>
                                                <span>报销信息</span>
                                            </div>
                                            <div class="right">
                                                <div class="remove-btn" @click="removeEntry(item)">
                                                    <span>删除</span>
                                                </div>
                                                <div @click="item.fold = !item.fold">
                                                    <p v-if="!item.fold">
                                                        <span>展开</span>
                                                        <i class="icon"></i>
                                                    </p>
                                                    <p v-else class="unfolded">
                                                        <span>收起</span>
                                                        <i class="icon"></i>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="content" :class="{'itemFolded':!item.fold}">
                                            <div class="row">
                                                <div class="label">预算项目&nbsp;<span>*</span></div>
                                                <div class="right" v-if="item.budgetPer">
                                                    <JMSelected :orgRange="item.budgetItemInfo"
                                                                :defaultValue="item.budgetPer"
                                                                :defaultValueId="item.budgetPer.id"
                                                                defaultkey="预算项目"
                                                                :clear="item.clearBudgetPer"
                                                                @update:clear="item.clearBudgetPer = $event"
                                                                @update:itemObj="getBudgetItemInfoItem(item,$event)"></JMSelected>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="label">预算用途</div>
                                                <div class="right">
                                                    <JMSelected :orgRange="item.purposeInfo"
                                                                :defaultValue="item.purpose"
                                                                :defaultValueId="item.purpose.id"
                                                                defaultkey="预算用途"
                                                                :clear="item.clearPurpose"
                                                                @update:clear="item.clearPurpose = $event"
                                                                @update:itemObj="getPurposeInfoItem(item,$event)"></JMSelected>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="label">含税金额&nbsp;<span>*</span></div>
                                                <div class="right">
                                                    <JMInput defaultType="number"
                                                             tips="请填写金额"
                                                             :defaultValue="item.amount"
                                                             @update:inputValue="item.amount=Number($event)"></JMInput>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="label">费用名称&nbsp;<span>*</span></div>
                                                <div class="right">
                                                    <span v-if="JSON.stringify(item.accountView) !== '{}'">{{item.accountView.name}}{{item.accountView.number}}</span>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="label">费用承担&nbsp;<span>*</span></div>
                                                <!--:defaultValue="personExpenseData.applyDept.isCostCenter===1?personExpenseData.applyDept:{}"-->
                                                <div class="right" v-if="personExpenseData.applyDept">
                                                    <JMSelected :orgRange="orgRange"
                                                                :defaultValue="additional"
                                                                defaultkey="personExpenseData.applyDept"
                                                                :defaultValueId="personExpenseData.applyDept.id"
                                                                @change="getOrgRangeItemChangeEvent(item,$event)"
                                                                @update:itemObj="getOrgRangeItem(item,$event)"></JMSelected>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="label">发票云&nbsp;<span>*</span></div>
                                                <div class="right">{{item.isInvoice===false?'否':'是'}}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="reimburse-list">
                                    <div class="reimburse-item" v-for="item in selectedInvoice" :key="item.id">
                                        <div class="head">
                                            <div class="left">
                                                <i class="line"></i>
                                                <span>报销信息</span>
                                            </div>
                                            <div class="right">
                                                <div @click="item.fold = !item.fold">
                                                    <p v-if="!item.fold">
                                                        <span>展开</span>
                                                        <i class="icon"></i>
                                                    </p>
                                                    <p v-else class="unfolded">
                                                        <span>收起</span>
                                                        <i class="icon"></i>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="content" :class="{'itemFolded':!item.fold}">
                                            <div class="row">
                                                <div class="label">预算项目&nbsp;<span>*</span></div>
                                                <div class="right" v-if="item.budgetPer">
                                                    <JMSelected :orgRange="item.budgetItemInfo"
                                                                :defaultValue="item.budgetPer"
                                                                :defaultValueId="item.budgetPer.id"
                                                                defaultkey="预算项目"
                                                                :clear="item.clearBudgetPer"
                                                                @update:clear="item.clearBudgetPer = $event"
                                                                @update:itemObj="getBudgetItemInfoItem(item,$event)"></JMSelected>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="label">预算用途</div>
                                                <div class="right">
                                                    <JMSelected :orgRange="item.purposeInfo"
                                                                :defaultValue="item.purpose"
                                                                :defaultValueId="item.purpose.id"
                                                                defaultkey="预算用途"
                                                                :clear="item.clearPurpose"
                                                                @update:clear="item.clearPurpose = $event"
                                                                @update:itemObj="getPurposeInfoItem(item,$event)"></JMSelected>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="label">含税金额&nbsp;<span>*</span></div>
                                                <div class="right">{{item.invAmount}}</div>
                                            </div>
                                            <div class="row">
                                                <div class="label">费用名称&nbsp;<span>*</span></div>
                                                <div class="right">
                                                    <span v-if="item.accountView && JSON.stringify(item.accountView) !== '{}'">{{item.accountView.name}}{{item.accountView.number}}</span>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="label">费用承担&nbsp;<span>*</span></div>
                                                <div class="right" v-if="personExpenseData.applyDept">
                                                    <!--:defaultValue="personExpenseData.applyDept.isCostCenter===1?personExpenseData.applyDept:{}"-->
                                                    <JMSelected :orgRange="orgRange"
                                                                :defaultValue="additional"
                                                                defaultkey="personExpenseData.applyDept"
                                                                :defaultValueId="personExpenseData.applyDept.id"
                                                                @change="getOrgRangeItemChangeEvent(item,$event)"
                                                                @update:itemObj="getOrgRangeItem(item,$event)"></JMSelected>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="label">发票云&nbsp;<span>*</span></div>
                                                <div class="right">是</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="invoice-info info-wrap">
                                <div class="add-invoice" @click="showPanel">添加发票</div>
                                <div class="head">
                                    <div class="left">
                                        <i class="icon"></i>
                                        <span>发票信息</span>
                                    </div>
                                </div>
                                <div class="list">
                                    <div class="tips" v-if="selectedInvoice.length<=0">未选择发票</div>
                                    <div class="item" v-for="item in selectedInvoice" :key="item.id">
                                        <div class="head">
                                            <div class="left">
                                                <span>发票号码</span>
                                                <span>{{item.invNumber}}</span>
                                            </div>
                                            <div class="shortname">{{item.shortName}}</div>
                                            <div class="right">{{item.isSpecialInv==='是'?'专':'普'}}
                                            </div>

                                        </div>
                                        <div class="body">
                                            <div class="row">
                                                <div class="left">
                                                    <span>销方名称：</span>
                                                    <span>{{item.invOutName}}</span>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="left">
                                                    <span>购方名称：</span>
                                                    <span>{{item.invInName}}</span>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="left">
                                                    <span>发票金额：</span>
                                                    <span>{{item.invAmount}}</span>
                                                </div>
                                                <div class="right" v-if="item.invDate">{{item.invDate.substr(0,item.invDate.indexOf(' '))}}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="btns-wrap">
                                <span @click="savePE">保存</span>
                                <span @click="submitPE">提交</span>
                            </div>

                        </div>
                    </div>
                    <AddInvoice
                            ref="AddInvoice"
                            @update:childVisible="xxx" :childVisible="childVisible"
                            @update:willBeSelectedList="yyy($event)"
                            @update:willBeRemovedList="zzz($event)"
                            :selectedInvoice="selectedInvoice"
                            :companyId="companyId" :userId="userId"
                    ></AddInvoice>
                </div>
            </div>
        </div>

        <FullPageLoading :loading="loading"></FullPageLoading>
        <Tips :success="success"
              :desc="tipBillDesc"
              :tipFailedDesc="tipFailedDesc"
              @update:tipVisible="tipVisible=$event"
              :tipVisible="tipVisible"
              :billStatus="tipBillStatus"
              :billType="tipBillType"></Tips>
        <Validator :source="source"
                   :validatorVisible="validatorVisible"
                   :billType="validatorType"
                   @update:validatorVisible="validatorVisible=$event"></Validator>

        <div class="add" @click="addTravel" v-if="currentIndex===0&&!peerPeopleVisible">添加行程</div>
        <div class="add tc" v-if="currentIndex===1&&!addItineraryVisible&&!childVisibleTravelAccount" @click="addItineraryVisible=true">选择出差申请单</div>
    </div>
</template>

<script>
  const titlebar = [
    {
      name: '出差申请',
    },
    {
      name: '差旅报销',
    },
    {
      name: '员工报销',
    }
  ]

  import Swiper from 'swiper'
  import 'swiper/dist/css/swiper.min.css'
  import axios from 'axios'
  import Qs from 'qs'
  import BScroll from 'better-scroll'
  import AddInvoice from '../components/StaffReimbursement/addInvoice'
  import AddInvoice2 from '../components/TravelApply/addInvoice2'
  import JMSelected from '../components/JMSelected'
  import JMSelectHotel from '../components/JMSelectHotel'
  import JMSelectLittle from '../components/JMSelectLittle'
  import JMInput from '../components/JMInput'
  import JMTextarea from '../components/JMTextarea'
  import Upload from './upload'
  import AddItinerary from './TravelApply/addItinerary'
  import PeerPeople from './TravelApply/peerPeople'
  import GoBack from './goBack'
  import FullPageLoading from './fullPageLoading'
  import Tips from './tips'
  import Validator from './validator'


  export default {
    name: "add",
    components: {
      AddInvoice,
      AddInvoice2,
      JMSelected,
      JMSelectHotel,
      JMInput,
      JMSelectLittle,
      JMTextarea,
      Upload,
      AddItinerary,
      PeerPeople,
      GoBack,
      FullPageLoading,
      Tips,
      Validator
    },
    data() {
      return {
        titlebar,
        detailSwiper: null,
        currentIndex: 0,
        date: '',
        personExpenseScroll: null,
        travelApplyScroll: null,
        travelAccountScroll: null,

        personExpenseFolded: true,
        travelAccountFolded: true,

        itemFolded: true,

        childVisible: true,
        childVisibleTravelAccount: false,

        addItineraryVisible: true,

        name: '',
        //员工报销单 领款人数据
        personExpenseData: {},
        travelApplyData: {},
        travelAccountData: {},
        source: {},

        //领款人数组
        personArray: [],
        //费用名称数组
        accountViewList: [],

        orgRange: [],//费用承担部门
        deptRange: [],//申请部门
        budgetItemInfo: [],//预算项目
        budgetItemInfoTA:[],
        purposeInfo: [],//预算用途

        orgId: '',
        userId: '',
        companyId: '',

        selectedInvoice: [],
        otherEntrys: [],
        selectedInvoiceTravelAccount: [],

        selectedTravelApplyList: [],
        //文件上传组件的数据
        fileList: [],
        travelApplyFileList: [],
        //文件数组（参数）
        TravelApplymainData: {
          data: [
            {
              together: [],
              entrys: [],
              attachments: []
            }
          ]
        },
        TravelAccountmainData: {
          data: [
            {
              // invoices: [],
              entrys: [],
              attachments: []
            }
          ]
        },
        PEmainData: {
          data: [
            {
              invoices: [],
              entrys: [],
              attachments: []
            }
          ],
        },
        peerPeopleVisible: false,
        chooseHotelVisible:false,
        selectedPeerPeopleList: [],
        travelList: [
          {
            explain: "",
            endPlace: "",
            endTime: "",
            startPlace: "",
            startTime: "",
            seq: 1,
            showChooseHotel:false
          }
        ],
        count: 1,
        image: '',
        imageBase: 'data:image/jpeg;base64,',
        loading: false,
        success: false,
        tipVisible: false,
        tipBillType: '',
        tipBillStatus: '',
        tipBillDesc: '',
        tipFailedDesc: '',

        entryClicked: {},
        detailData: {},

        deptId: '',//申请部门id 作为发票接口的参数
        TravelApplyHasDone: false,
        TravelAccountHasDone: false,
        PersonExpenseHasDone: false,

        amount: 0,
        validatorVisible: false,
        validatorType: '',
        extraInvoice:0,
        clearBudgetPer:false,
        clearAccountView:false,
        word1:'请输入费用说明',//费用说明
        word2:'请输入费用说明',//费用说明
      }
    },
    computed:{
      additional(){

        if(this.$store.getters.userId === 'AjUvzwNXSUGMj2WCoNqzwRO33n8='
          || this.$store.getters.userId === 'L+NAEAhDTDilSUI79Ty4oxO33n8='
          || this.$store.getters.userId === 'BSzafzlSSx62g7tphjz4BBO33n8='
          || this.$store.getters.userId === 'UDWnM+iER8i5cm4fIePVrhO33n8='
          || this.$store.getters.userId === 'i1NLSXCFTGq2P64oHk6oeRO33n8='){

          let obj = {
            id:'',
            number:'',
            name:''
          }
          if(this.personExpenseData.applyDept.id === 'CgQAAAAUiQvM567U'){
            obj.id = 'CgQAAACjQAPM567U'
            obj.name = '公司公共-'
            obj.number = '20083-KF-24'
          }else if(this.personExpenseData.applyDept.id === 'CgQAAAIGGOHM567U'){
            obj.id = 'CgQAAAIGGO3M567U'
            obj.name = '公司公共-'
            obj.number = '20790-KF-13'
          }

          return obj
        }else{
          if(this.personExpenseData.applyDept.isCostCenter===1){
            return this.personExpenseData.applyDept
          }else{
            return {}
          }
        }
      }

    },
    beforeRouteEnter(to, from, next) {

      next(vm => {
        vm.image = localStorage.getItem('image')
        vm.deptId = localStorage.getItem('deptId')

        if (from.path === '/' || from.name.indexOf('detail') > -1 || from.name.indexOf('Detail') > -1
          || from.name.indexOf('list') > -1 || from.name.indexOf('List') > -1) {


          vm.name = vm.$route.params.name
          vm.userId = vm.$route.params.userId
          vm.companyId = vm.$route.params.companyId

          vm.detailData = vm.$route.params.detailData
          console.log(vm.detailData)


          if (vm.name) {
            localStorage.setItem('name', vm.name)
          } else {
            vm.name = localStorage.getItem('name')
          }
          if (vm.userId) {
            localStorage.setItem('userId', vm.userId)
          } else {
            vm.userId = localStorage.getItem('userId')
          }
          if (vm.companyId) {
            localStorage.setItem('companyId', vm.companyId)
          } else {
            vm.companyId = localStorage.getItem('companyId')
          }
        } else {
          vm.name = localStorage.getItem('name')
          vm.userId = localStorage.getItem('userId')
          vm.companyId = localStorage.getItem('companyId')
        }

        vm.$nextTick(() => {
          vm.detailSwiper = new Swiper('.parent-swiper', {
            on: {
              slideChangeTransitionStart: function () {
                vm.currentIndex = vm.detailSwiper.activeIndex
              }
            }
          })

          let dom, index
          switch (vm.name) {
            case 'TravelApply': {
              dom = vm.$refs.nav_item[0]
              index = 0
              break
            }
            case 'TravelAccount': {
              dom = vm.$refs.nav_item[1]
              index = 1
              break
            }
            case 'PersonExpense': {
              dom = vm.$refs.nav_item[2]
              index = 2
              break
            }
            default: {
              dom = vm.$refs.nav_item[0]
              break
            }
          }
          vm.currentIndex = index;
          vm.detailSwiper.slideTo(vm.currentIndex);

          // let { right } = dom.getBoundingClientRect()
          // vm.$refs.line.style.left = right / 2 + 'px'
          vm.$refs.line.style.transform = 'translateX(-50%)'
          vm.$refs.line.style.visibility = 'visible'

          let { width, left } = dom.getBoundingClientRect()
          // this.$refs.line.style.width = width+'px'
          vm.$refs.line.style.left = left + width / 2 + 'px'
          vm.$refs.line.style.transition = 'all 350ms'


          // vm.loadData(vm.userId, vm.companyId, vm.name)
          vm.loadArray(vm.userId, vm.companyId)
          if (vm.name === 'TravelApply') {
            vm.loadData(vm.userId, vm.companyId, 'TravelApply')
            vm.TravelApplyHasDone = true
          }
          if (vm.name === 'TravelAccount') {
            vm.loadData(vm.userId, vm.companyId, 'TravelAccount')
            vm.TravelAccountHasDone = true
          }
          if (vm.name === 'PersonExpense') {
            vm.loadData(vm.userId, vm.companyId, 'PersonExpense')
            vm.PersonExpenseHasDone = true
          }

          vm.$nextTick(() => {
            if (!vm.personExpenseScroll) {
              vm.personExpenseScroll = new BScroll(vm.$refs.wrapper3, {
                click: true,
                pullUpLoad: {
                  threshold: -50 // 当上拉距离超过30px时触发 pullingUp 事件
                }
              })
            } else {
              vm.personExpenseScroll.refresh()
            }
            // if (!vm.travelApplyScroll) {
            //   vm.travelApplyScroll = new BScroll(vm.$refs.wrapper1, {
            //     click: true,
            //     bounce: false,
            //     pullUpLoad: {
            //       threshold: -50 // 当上拉距离超过30px时触发 pullingUp 事件
            //     }
            //   })
            // } else {
            //   vm.travelApplyScroll.refresh()
            // }
            if (!vm.travelAccountScroll) {
              vm.travelAccountScroll = new BScroll(vm.$refs.wrapper2, {
                click: true,
                pullUpLoad: {
                  threshold: -50 // 当上拉距离超过30px时触发 pullingUp 事件
                }
              })
            } else {
              vm.travelAccountScroll.refresh()
            }
          })
        })
      })
    },
    methods: {
      addInvoiceToEntry(item) {
        this.childVisibleTravelAccount = true
        this.entryClicked = item
      },
      haha($event) {
        console.log($event)
        this.selectedTravelApplyList = $event
      },
      showPanel() {
        this.childVisible = true
      },
      xxx($event) {
        console.log('xxx', $event)
        this.childVisible = $event
      },
      yyy($event) {
        if ($event && $event.length > 0) {
          $event.forEach((item) => {
            item.budgetItemInfo = this.budgetItemInfo
            item.purposeInfo = this.purposeInfo
            item.clearBudgetPer = false
            item.clearPurpose = false
            this.selectedInvoice.push(item)
          })
          this.personExpenseData.billCount = this.selectedInvoice.length
        }
      },
      zzzTravelAccount($event) {
        if ($event && $event.length > 0) {
          $event.forEach((item) => {
            this.selectedInvoiceTravelAccount.forEach((item2) => {
              if (item.id === item2.id) {
                this.selectedInvoiceTravelAccount.splice(this.selectedInvoiceTravelAccount.indexOf(item2), 1)
              }
            })
          })
        }

      },
      yyyTravelAccount($event) {
        if ($event && $event.length > 0) {
          $event.forEach((item) => {
            this.selectedInvoiceTravelAccount.push(item)
          })
        }
      },
      zzz($event) {
        if ($event && $event.length > 0) {
          $event.forEach((item) => {
            this.selectedInvoice.forEach((item2) => {
              if (item.id === item2.id) {
                this.selectedInvoice.splice(this.selectedInvoice.indexOf(item2), 1)
              }
            })
          })
          this.personExpenseData.billCount = this.selectedInvoice.length
        }

      },


      addTravel() {
        let seq = ++this.count
        this.travelList.unshift({
          explain: "",
          endPlace: "",
          endTime: "",
          startPlace: "",
          startTime: "",
          seq,
          showChooseHotel:false
        })
      },
      deleteTravel(item) {
        // this.travelList.splice(this.travelList.indexOf(item), 1)
        let copy = [...this.travelList]
        copy.splice(copy.indexOf(item), 1)
        this.travelList = [...copy]
      },
      receive($event) {
        console.log('父组件接收到的数组', JSON.stringify($event))
        console.log('父组件自己的filelist', JSON.stringify(this.fileList))
        this.fileList = $event
        console.log('父组件接收到的数组后数据变为', JSON.stringify(this.fileList))
      },
      travelApplyReceive($event) {
        console.log('父组件接收到的数组', JSON.stringify($event))
        console.log('父组件自己的filelist', JSON.stringify(this.travelApplyFileList))
        this.travelApplyFileList = $event
        console.log('父组件接收到的数组后数据变为', JSON.stringify(this.travelApplyFileList))
      },
      getOrgRangeItem(item, $event) {
        item.costCenter = $event
      },
      getOrgRangeItemChangeEvent(item,$event){
        //获取预算项目
        // axios.get(this.$url, {
        axios.get('http://rest.apizza.net/mock/c16745d80509aa726ad0a1ca0797d75f/getBudgetItemInfo', {
          params: {
            path: 'getBudgetItemInfo',
            costCenterId: $event.id,
            year: '2019'
          }
        })
          .then((response) => {
            // console.log(response.data)
            item.budgetItemInfo = response.data.data.data

            item.budgetPer = {}
            item.accountView = {}
            item.purpose = {}
            item.clearBudgetPer = true
            item.clearPurpose = true
          })
      },
      getPurposeInfoItem(item, $event) {
        item.purpose = $event
      },
      getBudgetItemInfoItem(item, $event) {
        // item.budgetItemInfoItem = $event
        if($event){
          item.budgetPer = $event
          // item.accountView = item.budgetItemInfoItem.accountView
          item.accountView = item.budgetPer.accountView

          //获取预算用途
          axios.get(this.$url, {
            params: {
              path: 'getPurposeInfo',
              costCenterId: this.personExpenseData.applyDept.id,
              budgetId: $event.id,
              // budgetId: this.budgetItemInfo[0].id,
              year: 2019
            }
          })
            .then((response) => {
              console.log(response.data)
              item.purposeInfo = response.data.data.data
            })
            .catch((error) => {

            })
        }
      },
      getPersonInfoItem($event) {
        console.log($event)
        this.personExpenseData.payee = $event
        this.personExpenseData.bankName = $event.bankName
        this.personExpenseData.accountNum = $event.accountNum
      },

      getDeptRangeToPersonExpense($event) {
        this.personExpenseData.applyDept = $event
      },
      getPersonInfoItemToTravelAccountData($event) {
        this.travelAccountData.payee = $event
        this.travelAccountData.bankName = $event.bankName
        this.travelAccountData.accountNum = $event.accountNum
      },
      getAccountViewInfoToTravelAccountData($event) {
        this.travelAccountData.accountView = $event
      },
      getBudgetItemToTravelAccountData($event) {

        if($event){
          this.travelAccountData.accountView.id = $event.accountView.id
          this.travelAccountData.accountView.name = $event.accountView.name
          this.travelAccountData.accountView.number = $event.accountView.number
          this.travelAccountData.budget = $event
          console.log('$event', $event)
          console.log('this.travelAccountData.accountView', this.travelAccountData.accountView)
        }

      },
      getApplyDeptToTravelAccountData($event) {
        this.travelAccountData.applyDept = $event
      },
      getCostCenterToTravelAccountData($event) {
        this.travelAccountData.costCenter = $event
      },
      getCostCenterToTravelAccountDataChangeEvent($event){
        //获取预算项目
        // axios.get(this.$url, {
        axios.get('http://rest.apizza.net/mock/c16745d80509aa726ad0a1ca0797d75f/getBudgetItemInfo', {
          params: {
            path: 'getBudgetItemInfo',
            costCenterId: $event.id,
            year: '2019'
          }
        })
          .then((response) => {
            // console.log(response.data)
            this.budgetItemInfoTA = response.data.data.data
            this.travelAccountData.budget = {}
            this.travelAccountData.accountView = {}
            this.clearBudgetPer = true
            this.clearAccountView = true
          })
      },
      getTravelApplyDate($event) {
        this.travelApplyData.applyDate = $event
      },
      getPeerPeople($event) {
        this.selectedPeerPeopleList = $event
        this.travelApplyData.together = [...$event]
      },
      getTravelRemark($event) {
        this.travelApplyData.remark = $event
      },
      changeIndex(index, $event) {
        this.currentIndex = index;
        this.detailSwiper.slideTo(this.currentIndex);

        console.log($event.target)
        let { width, left } = $event.target.getBoundingClientRect()
        this.$refs.line.style.left = left + width / 2 + 'px'
        this.$refs.line.style.transition = 'all 350ms'

      },
      saveTravelApplyData() {
        //清空数据
        this.TravelApplymainData = {
          data: [
            {
              together: [],
              entrys: [],
              attachments: []
            }
          ],
        }

        this.TravelApplymainData.data[0].applicant = this.travelApplyData.applicant
        this.TravelApplymainData.data[0].applyDate = this.travelApplyData.applyDate
        this.TravelApplymainData.data[0].applyDept = this.travelApplyData.applyDept
        this.TravelApplymainData.data[0].bankName = this.travelApplyData.bankName
        this.TravelApplymainData.data[0].company = this.travelApplyData.company
        this.TravelApplymainData.data[0].id = this.travelApplyData.id
        // this.TravelApplymainData.data[0].payee = this.travelApplyData.payee
        this.TravelApplymainData.data[0].remark = this.travelApplyData.remark
        this.TravelApplymainData.data[0].together = this.travelApplyData.together

        let travelListCopy = JSON.parse(JSON.parse(this.travelList))
        travelListCopy.forEach((item)=>{
          delete item.showChooseHotel
        })
        // this.TravelApplymainData.data[0].entrys = JSON.parse(JSON.stringify(this.travelList))
        this.TravelApplymainData.data[0].entrys = JSON.parse(JSON.stringify(travelListCopy))

        this.travelApplyFileList.forEach((item, index) => {
          console.log(item)
          let obj = {}
          obj.file = item.file
          // obj.file = '/M2015050513567489_20150505120101.jpg'
          obj.fileName = item.fileName
          obj.fileType = item.fileType
          obj.fileSize = item.fileSize
          obj.id = item.id

          console.log('this.TravelApplymainData.data[0].attachments', this.TravelApplymainData.data[0].attachments)
          this.TravelApplymainData.data[0].attachments.push(obj)
        })

        //保存数据时验证
        this.source = JSON.parse(JSON.stringify(this.TravelApplymainData.data[0]))
        this.validatorType = 'TravelApply'
        console.log(JSON.stringify(this.TravelApplymainData))

        // return true
      },
      saveTravelApply() {
        this.saveTravelApplyData()
        setTimeout(() => {
          if (!this.validatorVisible) {
            this.loading = true
            axios({
              method: 'post',
              url: this.$url,
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
              },
              data: Qs.stringify({
                path: 'saveBillInfo',
                billType: 'TravelApply',
                opType: 'SAVE',
                data: JSON.stringify(this.TravelApplymainData)
              })
            }).then((response) => {
              this.loading = false
              console.log('保存成功', response.data)
              this.TravelApplymainData.data[0].attachments.length = 0
              this.TravelApplymainData.data[0].entrys.length = 0
              this.TravelApplymainData.data[0].together.length = 0

              //控制提示页面显示
              this.tipVisible = true
              this.tipBillType = 'TravelApply'
              this.tipBillStatus = 'SAVE'


              if (response.data.data.result == 'success') {
                this.success = true
                this.tipBillDesc = '保存成功'
              } else {
                this.success = false
                this.tipBillDesc = '保存失败'
                this.tipFailedDesc = response.data.data.detail
              }
            })
              .catch((error) => {

              })

            let xhr = new XMLHttpRequest()
            xhr.open('POST', 'http://10.189.99.43:3000/save')
            xhr.onload = () => {

            }
            xhr.send(JSON.stringify(this.TravelApplymainData.data[0].attachments))
          }
        }, 0)

      },
      submitTravelApply() {
        this.saveTravelApplyData()
        setTimeout(() => {
          if (!this.validatorVisible) {
            this.loading = true
            axios({
              method: 'post',
              url: this.$url,
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
              },
              // headers: {
              //   'Content-Type': 'application/json; charset=UTF-8'
              // },
              data: Qs.stringify({
                path: 'saveBillInfo',
                billType: 'TravelApply',
                opType: 'SUBMIT',
                data: JSON.stringify(this.TravelApplymainData)
              })
            }).then((response) => {
              this.loading = false
              console.log('保存成功', response.data)
              this.TravelApplymainData.data[0].attachments.length = 0
              this.TravelApplymainData.data[0].entrys.length = 0
              this.TravelApplymainData.data[0].together.length = 0

              //控制提示页面显示
              this.tipVisible = true
              this.tipBillType = 'TravelApply'
              this.tipBillStatus = 'SUBMIT'


              if (response.data.data.result == 'success') {
                this.success = true
                this.tipBillDesc = '提交成功'
              } else {
                this.success = false
                this.tipBillDesc = '提交失败'
                this.tipFailedDesc = response.data.data.detail
              }
            })
              .catch((error) => {

              })

            let xhr = new XMLHttpRequest()
            xhr.open('POST', 'http://10.189.99.43:3000/save')
            xhr.onload = () => {

            }
            xhr.send(JSON.stringify(this.TravelApplymainData.data[0].attachments))
          }
        }, 0)

      },
      saveTravelAccountData() {

        //清空数据
        this.TravelAccountmainData = {
          data: [
            {
              entrys: [],
              attachments: []
            }
          ],
        }

        this.TravelAccountmainData.data[0].applicant = this.travelAccountData.applicant
        this.TravelAccountmainData.data[0].payee = this.travelAccountData.payee
        this.TravelAccountmainData.data[0].accountView = this.travelAccountData.accountView
        this.TravelAccountmainData.data[0].budget = this.travelAccountData.budget
        this.TravelAccountmainData.data[0].applyDept = this.travelAccountData.applyDept
        this.TravelAccountmainData.data[0].costCenter = this.travelAccountData.costCenter
        this.TravelAccountmainData.data[0].applyDate = this.travelAccountData.applyDate
        this.TravelAccountmainData.data[0].company = this.travelAccountData.company
        this.TravelAccountmainData.data[0].accountNum = this.travelAccountData.accountNum
        this.TravelAccountmainData.data[0].bankName = this.travelAccountData.bankName
        this.TravelAccountmainData.data[0].remark = this.travelAccountData.remark

        this.TravelAccountmainData.data[0].id = this.travelAccountData.id
        // this.TravelAccountmainData.data[0].entrys = this.selectedTravelApplyList

        let newList = []

        // let idString = ""
        let idArr = []
        this.selectedTravelApplyList.forEach((item) => {
          item.entrys.forEach((entry) => {
            let entryObj = {}
            entryObj.seq = entry.seq
            entryObj.startTime = entry.startTime
            entryObj.startPlace = entry.startPlace
            entryObj.endPlace = entry.endPlace
            entryObj.endTime = entry.endTime
            // entryObj.amountVeh = (entry.amountVeh * 1).toFixed(2)
            // entryObj.amountTaxi = (entry.amountTaxi * 1).toFixed(2)
            // entryObj.amountOther = (entry.amountOther * 1).toFixed(2)
            // entryObj.amountRec = (entry.amountRec * 1).toFixed(2)
            // entryObj.vehicle = (entry.vehicle * 1).toFixed(2)
            // console.log('NumberNumberNumber', typeof Number(Number(entry.amountVeh).toFixed(2)))
            entryObj.amountVeh = Number(Number(entry.amountVeh).toFixed(2))

            entryObj.amountTaxi = Number(Number(entry.amountTaxi).toFixed(2))
            entryObj.amountOther = Number(Number(entry.amountOther).toFixed(2))
            entryObj.amountRec = Number(Number(entry.amountRec).toFixed(2))
            entryObj.amountHotel = Number(Number(entry.amountHotel).toFixed(2))
            entryObj.days = Number(Number(entry.days).toFixed(2))
            entryObj.amountSubsidy = Number(Number(entry.amountSubsidy).toFixed(2))
            entryObj.vehicle = entry.vehicle
            entryObj.invoices = []
            // console.log(entryObj)

            newList.push(entryObj)
            entry.invoices.forEach((invoice) => {
              let invoiceObj = {}
              invoiceObj.invNumber = invoice.invNumber
              invoiceObj.invOutName = invoice.invOutName
              invoiceObj.invInName = invoice.invInName
              // invoiceObj.invAmount = (invoice.invAmount * 1).toFixed(2)
              invoiceObj.invAmount = Number(Number(invoice.invAmount).toFixed(2))
              invoiceObj.invDate = invoice.invDate
              invoiceObj.shortName = invoice.shortName
              invoiceObj.longName = invoice.longName
              invoiceObj.invType = invoice.invType
              invoiceObj.isSpecialInv = invoice.isSpecialInv
              invoiceObj.id = invoice.id
              entryObj.invoices.push(invoiceObj)
            })
          })
          console.log(newList)

          idArr.push(item.id)
          // idString += item.id
          //行程单数组中只有一个对象，id赋值只会执行一次
          // this.TravelAccountmainData.data[0].applyBill = { id: item.id }

          // this.TravelAccountmainData.data[0].entrys.push(entry)
        })
        if (this.travelAccountData.applyBill&&this.travelAccountData.applyBill.id){
          this.TravelAccountmainData.data[0].applyBill = this.travelAccountData.applyBill
        } else{
          this.TravelAccountmainData.data[0].applyBill = { id: idArr.join(',') }
        }

        newList.forEach((item) => {
          console.log(item)
          this.TravelAccountmainData.data[0].entrys.push(item)
        })
        // this.selectedTravelApplyList.forEach((item, index) => {
        //   console.log(item)
        //   let obj = {}
        //   obj.file = item.file
        //   // obj.file = '/M2015050513567489_20150505120101.jpg'
        //   obj.fileName = item.fileName
        //   obj.fileType = item.fileType
        //   obj.fileSize = item.fileSize
        //   obj.id = item.id
        //
        //   console.log('this.TravelApplymainData.data[0].attachments', this.TravelApplymainData.data[0].attachments)
        //   this.TravelApplymainData.data[0].attachments.push(obj)
        // })
        console.log(JSON.stringify(this.TravelAccountmainData))
      },
      submitTravelAccount() {
        this.saveTravelAccountData()
        //保存数据时验证
        this.source = JSON.parse(JSON.stringify(this.TravelAccountmainData.data[0]))
        this.validatorType = 'TravelAccount'
        setTimeout(() => {
          if (!this.validatorVisible) {
            this.loading = true

            axios({
              method: 'post',
              url: this.$url,
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
              },
              // headers: {
              //   'Content-Type': 'application/json; charset=UTF-8'
              // },
              data: Qs.stringify({
                path: 'saveBillInfo',
                billType: 'TravelAccount',
                opType: 'SUBMIT',
                data: JSON.stringify(this.TravelAccountmainData)
              })
            }).then((response) => {
              this.loading = false
              console.log('保存成功', response.data)
              this.TravelAccountmainData.data[0].attachments.length = 0
              this.TravelAccountmainData.data[0].entrys.length = 0
              // this.TravelAccountmainData.data[0].invoices.length = 0

              //控制提示页面显示
              this.tipVisible = true
              this.tipBillType = 'TravelAccount'
              this.tipBillStatus = 'SUBMIT'


              if (response.data.data.result == 'success') {
                this.success = true
                this.tipBillDesc = '提交成功'
              } else {
                this.success = false
                this.tipBillDesc = '提交失败'
                this.tipFailedDesc = response.data.data.detail
              }
            })
              .catch((error) => {

              })

            // let xhr = new XMLHttpRequest()
            // xhr.open('POST', 'http://10.189.99.43:3000/save')
            // xhr.onload = () => {
            //
            // }
            // xhr.send(JSON.stringify(this.TravelAccountmainData.data[0].attachments))
          }
        }, 0)

      },
      saveTravelAccount() {
        this.saveTravelAccountData()
        //保存数据时验证
        this.source = JSON.parse(JSON.stringify(this.TravelAccountmainData.data[0]))
        this.validatorType = 'TravelAccount'
        setTimeout(() => {
          if (!this.validatorVisible) {
            this.loading = true
            axios({
              method: 'post',
              url: this.$url,
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
              },
              // headers: {
              //   'Content-Type': 'application/json; charset=UTF-8'
              // },
              data: Qs.stringify({
                path: 'saveBillInfo',
                billType: 'TravelAccount',
                opType: 'SAVE',
                data: JSON.stringify(this.TravelAccountmainData)
              })
            }).then((response) => {
              this.loading = false
              console.log('保存成功', response.data)
              this.TravelAccountmainData.data[0].attachments.length = 0
              this.TravelAccountmainData.data[0].entrys.length = 0
              // this.TravelAccountmainData.data[0].invoices.length = 0

              //控制提示页面显示
              this.tipVisible = true
              this.tipBillType = 'TravelAccount'
              this.tipBillStatus = 'SAVE'


              if (response.data.data.result == 'success') {
                this.success = true
                this.tipBillDesc = '保存成功'
              } else {
                this.success = false
                this.tipBillDesc = '保存失败'
                this.tipFailedDesc = response.data.data.detail
              }
            })
              .catch((error) => {

              })

            let xhr = new XMLHttpRequest()
            xhr.open('POST', 'http://10.189.99.43:3000/save')
            xhr.onload = () => {

            }
            xhr.send(JSON.stringify(this.TravelAccountmainData.data[0].attachments))
          }
        }, 0)

        //保存
        // axios.post(this.$url, {
        //   params: {
        //     path: 'saveBillInfo',
        //     billType:'PersonExpense',
        //     opType:'SAVE',
        //     data:this.PEmainData
        //   }
        // })
        //   .then((response) => {
        //     console.log('保存成功',response.data)
        //   })
        //   .catch((error) => {
        //
        //   })
      },
      addEntry() {
        let obj = {
          costCenter: {},
          budgetPer: {},
          purpose: '',
          accountView: {},
          isInvoice: false,
          amount: '',
          id: '',
          fold: true,
          clearBudgetPer:false,
          clearPurpose:false,
          budgetItemInfo:this.budgetItemInfo,
          // budgetItemInfo:{},
          purposeInfo:this.purposeInfo
          // purposeInfo:{}
        }
        obj.id = 'customized_' + Date.now()
        this.otherEntrys.forEach((item) => {
          if (obj.id === item.id) {
            obj.id += ((Math.random() * 100000).toFixed(0))
          }
        })
        this.otherEntrys.unshift(obj)
        // this.otherEntrys.push(obj)

        console.log('this.otherEntrys',this.otherEntrys)
      },
      removeEntry(item) {
        this.otherEntrys.forEach((entry, index) => {
          if (entry.id === item.id) {
            this.otherEntrys.splice(index, 1)
          }
        })
      },
      savePEData() {
        //清空数据
        this.PEmainData = {
          data: [
            {
              invoices: [],
              entrys: [],
              attachments: []
            }
          ],
        }

        this.selectedInvoice.forEach((item, index) => {
          let obj = {}
          obj.invNumber = item.invNumber
          obj.invOutName = item.invOutName
          obj.invInName = item.invInName
          obj.invAmount = item.invAmount
          obj.invDate = item.invDate
          obj.id = item.id
          this.PEmainData.data[0].invoices.push(obj)

          let obj2 = {}
          obj2.seq = index + 1
          //费用承担部门
          obj2.costCenter = item.costCenter
          console.log('item.budgetItemInfoItem', item.budgetItemInfoItem)
          // obj2.budgetItem = item.budgetItemInfoItem
          obj2.budgetItem = item.budgetPer
          obj2.purpose = item.purpose || {}
          obj2.accountView = item.accountView
          obj2.isInvoice = '是'
          obj2.amount = item.invAmount
          this.PEmainData.data[0].entrys.push(obj2)
        })
        this.otherEntrys.forEach((entry, index) => {
          let obj = {}
          obj.seq = this.PEmainData.data[0].entrys.length + index + 1
          //费用承担部门
          obj.costCenter = entry.costCenter
          console.log('item.budgetItemInfoItem', entry.budgetItemInfoItem)
          // obj2.budgetItem = item.budgetItemInfoItem
          obj.budgetItem = entry.budgetPer
          obj.purpose = entry.purpose || {}
          obj.accountView = entry.accountView
          obj.isInvoice = '否'
          obj.amount = entry.amount
          this.PEmainData.data[0].entrys.push(obj)
        })

        this.PEmainData.data[0].accountNum = this.personExpenseData.accountNum
        this.PEmainData.data[0].applicant = this.personExpenseData.applicant
        this.PEmainData.data[0].applyDate = this.personExpenseData.applyDate
        this.PEmainData.data[0].applyDept = this.personExpenseData.applyDept
        this.PEmainData.data[0].bankName = this.personExpenseData.bankName
        this.PEmainData.data[0].company = this.personExpenseData.company
        this.PEmainData.data[0].id = this.personExpenseData.id
        this.PEmainData.data[0].payee = this.personExpenseData.payee
        this.PEmainData.data[0].remark = this.personExpenseData.remark
        this.PEmainData.data[0].billCount = Number(this.personExpenseData.billCount)
        // this.PEmainData.data[0].attachments = this.fileList

        this.fileList.forEach((item, index) => {
          console.log(item)
          let obj = {}
          // obj.file = item.file
          obj.file = '/M2015050513567489_20150505120101.jpg'
          obj.fileName = item.fileName
          obj.fileType = item.fileType
          obj.fileSize = item.fileSize
          obj.id = item.id

          this.PEmainData.data[0].attachments.push(obj)
        })

        console.log(JSON.stringify(this.PEmainData))
      },
      submitPE() {
        this.savePEData()
        //保存数据时验证
        this.source = JSON.parse(JSON.stringify(this.PEmainData.data[0]))
        this.validatorType = 'PersonExpense'
        setTimeout(() => {
          if (!this.validatorVisible) {
            this.loading = true
            axios({
              method: 'post',
              url: this.$url,
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
              },
              // headers: {
              //   'Content-Type': 'application/json; charset=UTF-8'
              // },
              data: Qs.stringify({
                path: 'saveBillInfo',
                billType: 'PersonExpense',
                opType: 'SUBMIT',
                data: JSON.stringify(this.PEmainData)
              })
            }).then((response) => {
              this.loading = false
              console.log('保存成功', response.data)
              this.PEmainData.data[0].attachments.length = 0
              this.PEmainData.data[0].entrys.length = 0
              this.PEmainData.data[0].invoices.length = 0

              //控制提示页面显示
              this.tipVisible = true
              this.tipBillType = 'PersonExpense'
              this.tipBillStatus = 'SUBMIT'


              if (response.data.data.result == 'success') {
                this.success = true
                this.tipBillDesc = '提交成功'

              } else {
                this.success = false
                this.tipBillDesc = '提交失败'
                this.tipFailedDesc = response.data.data.detail
              }
            })
              .catch((error) => {

              })

            // let xhr = new XMLHttpRequest()
            // xhr.open('POST', 'http://10.189.99.43:3000/save')
            // xhr.onload = () => {
            //
            // }
            // xhr.send(JSON.stringify(this.PEmainData.data[0].attachments))
          }
        }, 0)

      },
      savePE() {
        this.savePEData()
        //保存数据时验证
        this.source = JSON.parse(JSON.stringify(this.PEmainData.data[0]))
        this.validatorType = 'PersonExpense'
        setTimeout(() => {
          if (!this.validatorVisible) {
            this.loading = true
            axios({
              method: 'post',
              url: this.$url,
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
              },
              // headers: {
              //   'Content-Type': 'application/json; charset=UTF-8'
              // },
              data: Qs.stringify({
                path: 'saveBillInfo',
                billType: 'PersonExpense',
                opType: 'SAVE',
                data: JSON.stringify(this.PEmainData)
              })
            }).then((response) => {
              this.loading = false
              console.log('保存成功', response.data)
              this.PEmainData.data[0].attachments.length = 0
              this.PEmainData.data[0].entrys.length = 0
              this.PEmainData.data[0].invoices.length = 0

              //控制提示页面显示
              this.tipVisible = true
              this.tipBillType = 'PersonExpense'
              this.tipBillStatus = 'SAVE'


              if (response.data.data.result == 'success') {
                this.success = true
                this.tipBillDesc = '保存成功'
              } else {
                this.success = false
                this.tipBillDesc = '保存失败'
                this.tipFailedDesc = response.data.data.detail
              }
            })
              .catch((error) => {

              })

            // let xhr = new XMLHttpRequest()
            // xhr.open('POST', 'http://10.189.99.43:3000/save')
            // xhr.onload = () => {
            //
            // }
            // xhr.send(JSON.stringify(this.PEmainData.data[0].attachments))
          }
        }, 0)
        //保存
        // axios.post(this.$url, {
        //   params: {
        //     path: 'saveBillInfo',
        //     billType:'PersonExpense',
        //     opType:'SAVE',
        //     data:this.PEmainData
        //   }
        // })
        //   .then((response) => {
        //     console.log('保存成功',response.data)
        //   })
        //   .catch((error) => {
        //
        //   })
      },
      loadArray(userId, companyId) {
        //获取领款人
        // axios.get(this.$url, {
        axios.get('http://rest.apizza.net/mock/c16745d80509aa726ad0a1ca0797d75f/getPayeeInfoNew', {
          params: {
            path: 'getPayeeInfo',
            userId
          }
        })
          .then((response) => {
            console.log(response.data)
            this.personArray = response.data.data.data
          })
          .catch((error) => {

          })
        //获取费用名称
        // axios.get(this.$url, {
        axios.get('http://rest.apizza.net/mock/c16745d80509aa726ad0a1ca0797d75f/getAccountViewInfoNew', {
          params: {
            path: 'getAccountViewInfo',
            companyId
          }
        })
          .then((response) => {
            console.log(response.data)
            this.accountViewList = response.data.data.data
          })
          .catch((error) => {

          })
        //获取申请部门
        // axios.get(this.$url, {
        axios.get('http://rest.apizza.net/mock/c16745d80509aa726ad0a1ca0797d75f/getOrgRangeDEPTNew', {
          params: {
            path: 'getOrgRange',
            orgType: 'DEPT',
            dataType: 'ID',
            data: userId,
            companyId
          }
        })
          .then((response) => {
            console.log(response.data)
            this.deptRange = response.data.data.data
          }).catch((error) => {

        })

        //获取费用承担部门
        // axios.get('http://www.doclever.cn:8090/mock/5ca56bd7c273b90cd8215ed9/getOrgRange', {
        //   params: {}
        // })
        // axios.get(this.$url, {
        axios.get('http://rest.apizza.net/mock/c16745d80509aa726ad0a1ca0797d75f/getOrgRangeCOSTCENTERNew', {
          params: {
            path: 'getOrgRange',
            orgType: 'COSTCENTER',
            dataType: 'ID',
            data: userId,
            companyId
          }
        })
          .then((response) => {
            console.log(response.data)
            this.orgRange = response.data.data.data


          })
          .catch((error) => {

          })
      },
      loadData(userId, companyId, billType) {
        if (billType === 'PersonExpense') {

          this.loading = true
          // axios.get('http://rest.apizza.net/mock/21c5cf3ed4022de252a80d8e8366c6f7/createNewDataTravelAccount', {
          // axios.get(this.$url, {
          axios.get('http://rest.apizza.net/mock/c16745d80509aa726ad0a1ca0797d75f/createNewDataPersonExpenseNew', {
            params: {
              path: 'createNewData',
              userId,
              companyId,
              billType,
            }
          })
            .then((response) => {
              this.loading = false

              console.log(response.data)
              this.personExpenseData = response.data.data.data[0]
              this.personExpenseData.remark = ''

              this.deptId = this.personExpenseData.applyDept.id

              localStorage.setItem('deptId', this.deptId)

              this.$refs.AddInvoice.getPersonExpenseInvoice(this.deptId)

              //获取预算项目
              // axios.get(this.$url, {
              axios.get('http://rest.apizza.net/mock/c16745d80509aa726ad0a1ca0797d75f/getBudgetItemInfo', {
                params: {
                  path: 'getBudgetItemInfo',
                  // costCenterId: this.orgRange[0].id,
                  costCenterId: this.personExpenseData.applyDept.id,
                  year: '2019'
                }
              })
                .then((response) => {
                  // console.log(response.data)
                  this.budgetItemInfo = response.data.data.data

                  //获取预算用途
                  axios.get(this.$url, {
                    params: {
                      path: 'getPurposeInfo',
                      costCenterId: this.personExpenseData.applyDept.id,
                      budgetId: this.budgetItemInfo[0].id,
                      year: 2019
                    }
                  })
                    .then((response) => {
                      console.log(response.data)
                      this.purposeInfo = response.data.data.data

                      if (JSON.stringify(this.detailData) !== '{}') {
                        if (this.name === 'PersonExpense') {
                          this.personExpenseData.accountNum = this.detailData.accountNum
                          this.personExpenseData.applicant = this.detailData.applicant
                          this.personExpenseData.applyDate = this.detailData.applyDate
                          this.personExpenseData.applyDept = this.detailData.applyDept
                          this.personExpenseData.bankName = this.detailData.bankName
                          this.personExpenseData.company = this.detailData.company
                          this.personExpenseData.id = this.detailData.id
                          this.personExpenseData.payee = this.detailData.payee
                          this.personExpenseData.remark = this.detailData.remark
                          this.personExpenseData.billCount = this.detailData.billCount
                          //
                          // console.log()
                          // if(this.detailData.invoices.length>0){
                          //   this.detailData.invoices.forEach((item1)=>{
                          //     this.detailData.entrys.forEach((item2)=>{
                          //
                          //     })
                          //   })
                          // }
                          for (let i = 0; i < this.detailData.entrys.length; i++) {
                            if (this.detailData.entrys[i].isInvoice === '否') {

                              let entryObj = {}
                              entryObj.accountView = JSON.parse(JSON.stringify(this.detailData.entrys[i])).accountView
                              entryObj.amount = JSON.parse(JSON.stringify(this.detailData.entrys[i])).amount
                              entryObj.budgetPer = JSON.parse(JSON.stringify(this.detailData.entrys[i])).budgetItem
                              entryObj.costCenter = JSON.parse(JSON.stringify(this.detailData.entrys[i])).costCenter
                              entryObj.isInvoice = JSON.parse(JSON.stringify(this.detailData.entrys[i])).isInvoice
                              entryObj.seq = JSON.parse(JSON.stringify(this.detailData.entrys[i])).seq
                              entryObj.purpose = JSON.parse(JSON.stringify(this.detailData.entrys[i])).purpose
                              console.log(this.budgetItemInfo)
                              entryObj.purposeInfo = this.purposeInfo
                              entryObj.budgetItemInfo = this.budgetItemInfo
                              entryObj.fold = false

                              this.otherEntrys.push(entryObj)
                              console.log('i', i)
                              this.detailData.entrys.splice(i, 1)
                            }
                          }
                          for (let i = 0; i < this.detailData.invoices.length; i++) {
                            let obj = {}

                            let entryObj = {}
                            entryObj.accountView = JSON.parse(JSON.stringify(this.detailData.entrys[i])).accountView
                            entryObj.amount = JSON.parse(JSON.stringify(this.detailData.entrys[i])).amount
                            entryObj.budgetPer = JSON.parse(JSON.stringify(this.detailData.entrys[i])).budgetItem
                            entryObj.costCenter = JSON.parse(JSON.stringify(this.detailData.entrys[i])).costCenter
                            entryObj.isInvoice = JSON.parse(JSON.stringify(this.detailData.entrys[i])).isInvoice
                            entryObj.seq = JSON.parse(JSON.stringify(this.detailData.entrys[i])).seq
                            entryObj.purpose = JSON.parse(JSON.stringify(this.detailData.entrys[i])).purpose
                            entryObj.purposeInfo = this.purposeInfo
                            entryObj.budgetItemInfo = this.budgetItemInfo

                            let invoice = JSON.parse(JSON.stringify(this.detailData.invoices[i]))
                            // let entry = JSON.parse(JSON.stringify(this.detailData.entrys[i]))
                            obj = Object.assign(invoice, entryObj)
                            obj.fold = false
                            this.selectedInvoice.push(obj)
                            // if(this.detailData.entrys[i].isInvoice === '是'){
                            //
                            // }else{
                            //   let entryObj = {}
                            //   entryObj.accountView = JSON.parse(JSON.stringify(this.detailData.entrys[i])).accountView
                            //   entryObj.amount = JSON.parse(JSON.stringify(this.detailData.entrys[i])).amount
                            //   entryObj.budgetPer = JSON.parse(JSON.stringify(this.detailData.entrys[i])).budgetItem
                            //   entryObj.costCenter = JSON.parse(JSON.stringify(this.detailData.entrys[i])).costCenter
                            //   entryObj.isInvoice = JSON.parse(JSON.stringify(this.detailData.entrys[i])).isInvoice
                            //   entryObj.seq = JSON.parse(JSON.stringify(this.detailData.entrys[i])).seq
                            //   entryObj.purpose = JSON.parse(JSON.stringify(this.detailData.entrys[i])).purpose
                            //   this.otherEntrys.push(obj)
                            // }

                            this.extraInvoice = this.personExpenseData.billCount-this.selectedInvoice.length
                          }
                          // vm.selectedInvoice = vm.detailData.invoices


                        }
                      }

                    })
                    .catch((error) => {
                    })
                })
                .catch((error) => {

                })
            })
            .catch((error) => {

            })
        }
        else if (billType === 'TravelApply') {
          this.loading = true

          // axios.get('http://rest.apizza.net/mock/21c5cf3ed4022de252a80d8e8366c6f7/createNewDataTravelAccount', {
          // axios.get(this.$url, {
          axios.get('http://rest.apizza.net/mock/c16745d80509aa726ad0a1ca0797d75f/createNewDataTravelApplyNew', {
            params: {
              path: 'createNewData',
              userId,
              companyId,
              billType,
            }
          })
            .then((response) => {
              this.loading = false

              this.travelApplyData = response.data.data.data[0]

              this.deptId = this.travelApplyData.applyDept.id

              localStorage.setItem('deptId', this.deptId)

              if (!this.travelApplyData.together || this.travelApplyData.together.length === 0) {
                this.travelApplyData.together = []
              }
              if (!this.travelApplyData.remark) {
                this.travelApplyData.remark = ''
              }
              if (!this.travelApplyData.attachments || this.travelApplyData.attachments.length === 0) {
                this.travelApplyData.attachments = []
              }
              if (!this.travelApplyData.travelList || this.travelApplyData.travelList.length === 0) {
                this.travelApplyData.travelList = []
              }
              // this.travelApplyData.remark = ''
              // this.travelApplyData.attachments = []
              // this.travelApplyData.travelList = []

              if (JSON.stringify(this.detailData) !== '{}') {
                if (this.name === 'TravelApply') {
                  // this.travelApplyData.accountNum = this.detailData.accountNum
                  this.travelApplyData.applicant = this.detailData.applicant
                  this.travelApplyData.applyDate = this.detailData.applyDate
                  this.travelApplyData.applyDept = this.detailData.applyDept
                  this.travelApplyData.bankName = this.detailData.bankName
                  this.travelApplyData.company = this.detailData.company
                  this.travelApplyData.id = this.detailData.id
                  this.travelApplyData.together = this.detailData.together
                  this.selectedPeerPeopleList = JSON.parse(JSON.stringify(this.detailData.together))
                  // this.selectedPeerPeopleList.forEach((item)=>{
                  //   item.selected = true
                  // })
                  this.travelApplyData.remark = this.detailData.remark
                  this.travelList = this.detailData.entrys
                  //
                  // console.log()
                  // if(this.detailData.invoices.length>0){
                  //   this.detailData.invoices.forEach((item1)=>{
                  //     this.detailData.entrys.forEach((item2)=>{
                  //
                  //     })
                  //   })
                  // }
                  // for(let i=0;i<this.detailData.invoices.length;i++){
                  //   let obj = {}
                  //
                  //   let invoice = JSON.parse(JSON.stringify(this.detailData.invoices[i]))
                  //   let entry = JSON.parse(JSON.stringify(this.detailData.entrys[i]))
                  //
                  //   obj = Object.assign(invoice,entry)
                  //   this.selectedInvoice.push(obj)
                  // }


                  // vm.selectedInvoice = vm.detailData.invoices
                }
              }
            })
            .catch((error) => {
            })

        }
        else if (billType === 'TravelAccount') {
          this.loading = true

          axios.get('http://rest.apizza.net/mock/c16745d80509aa726ad0a1ca0797d75f/createNewDataTravelAccountNew', {
          // axios.get(this.$url, {
            params: {
              path: 'createNewData',
              userId,
              companyId,
              billType,
            }
          })
            .then((response) => {
              this.loading = false

              this.travelAccountData = response.data.data.data[0]

              this.deptId = this.travelAccountData.applyDept.id

              localStorage.setItem('deptId', this.deptId)

              this.$refs.AddInvoice2.getPersonExpenseInvoice(this.deptId)

              //获取预算项目
              // axios.get(this.$url, {
              axios.get('http://rest.apizza.net/mock/c16745d80509aa726ad0a1ca0797d75f/getBudgetItemInfo', {
                params: {
                  path: 'getBudgetItemInfo',
                  // costCenterId: this.orgRange[0].id,
                  costCenterId: this.travelAccountData.applyDept.id,
                  year: '2019'
                }
              })
                .then((response) => {
                  // console.log(response.data)
                  this.budgetItemInfoTA = response.data.data.data
                })
                .catch((error) => {

                })
              // if(!this.travelApplyData.together || this.travelApplyData.together.length === 0 ){
              //   this.travelApplyData.together = []
              // }
              // if(!this.travelApplyData.remark){
              //   this.travelApplyData.remark = ''
              // }
              // if(!this.travelApplyData.attachments || this.travelApplyData.attachments.length === 0 ){
              //   this.travelApplyData.attachments = []
              // }
              // if(!this.travelApplyData.travelList || this.travelApplyData.travelList.length === 0 ){
              //   this.travelApplyData.travelList = []
              // }

              if (JSON.stringify(this.detailData) !== '{}') {
                if (this.name === 'TravelAccount') {
                  this.travelAccountData.accountNum = this.detailData.accountNum
                  this.travelAccountData.applicant = this.detailData.applicant
                  this.travelAccountData.applyDate = this.detailData.applyDate
                  this.travelAccountData.applyDept = this.detailData.applyDept
                  this.travelAccountData.bankName = this.detailData.bankName
                  this.travelAccountData.company = this.detailData.company
                  this.travelAccountData.id = this.detailData.id
                  this.travelAccountData.payee = this.detailData.payee

                  this.travelAccountData.applyBill = JSON.parse(JSON.stringify(this.detailData.applyBill));
                  this.travelAccountData.budget = this.detailData.budget
                  this.travelAccountData.costCenter = this.detailData.costCenter
                  this.travelAccountData.remark = this.detailData.remark
                  this.selectedTravelApplyList.push({})
                  this.selectedTravelApplyList[0].entrys = this.detailData.entrys //[{invoices[]},{invoices[]}]
                  //                                                      [{invoices[]},{invoices[]}]
                  // console.log()
                  // if(this.detailData.invoices.length>0){
                  //   this.detailData.invoices.forEach((item1)=>{
                  //     this.detailData.entrys.forEach((item2)=>{
                  //
                  //     })
                  //   })
                  // }
                  if (this.detailData.entrys[0]) {
                    for (let i = 0; i < this.detailData.entrys.length; i++) {
                      let entryObj = {}
                      let entry = JSON.parse(JSON.stringify(this.detailData.entrys[i]))
                      entryObj.budgetItemInfoItem = entry.budgetItemInfoItem
                      entryObj.fold = entry.fold
                      entryObj.longName = entry.longName
                      entryObj.orgRangeItem = entry.orgRangeItem
                      entryObj.purposeInfoItem = entry.purposeInfoItem
                      entryObj.selectedFormChosenList = entry.selectedFormChosenList
                      entryObj.selectedFormCloud = entry.selectedFormCloud
                      for (let j = 0; j < this.detailData.entrys[i].invoices.length; j++) {
                        let obj = {}
                        let invoice = JSON.parse(JSON.stringify(this.detailData.entrys[i].invoices[j]))
                        obj = Object.assign(invoice, entryObj)
                        this.selectedInvoiceTravelAccount.push(obj)
                      }
                    }
                    // budgetItemInfoItem
                    // fold
                    // longName
                    // orgRangeItem
                    // purposeInfoItem
                    // selectedFormChosenList
                    // selectedFormCloud
                    // for (let i = 0; i < this.detailData.entrys[0].invoices.length; i++) {
                    //   let obj = {}
                    //
                    //   let invoice = JSON.parse(JSON.stringify(this.detailData.invoices[i])) JSON.parse(JSON.stringify(this.detailData.invoices[i]))
                    //   let entry = JSON.parse(JSON.stringify(this.detailData.entrys[i]))
                    //
                    //   obj = Object.assign(invoice, entry)
                    //   console.log('selectedInvoiceTravelAccount',obj)
                    //   this.selectedInvoiceTravelAccount.push(obj)
                    // }
                  }


                  // vm.selectedInvoice = vm.detailData.invoices
                }
              }
            })
            .catch((error) => {
            })
        }
      },
      // getTotal(list, attribute) {
      //   return list.reduce((prev, current) => {
      //     let x = 0
      //     if (current[attribute] && current[attribute] !== 'undefined' && current[attribute] !== 'null') {
      //       x = Number(current[attribute])
      //     }
      //     return prev + x
      //   }, 0)
      // },
      getTotal() {
        this.amount = 0
        if (this.selectedTravelApplyList.length > 0) {
          this.selectedTravelApplyList.forEach((x,index)=>{
            if (this.selectedTravelApplyList[index].entrys.length > 0) {
              this.selectedTravelApplyList[index].entrys.forEach((item) => {
                this.amount += (item.amountVeh + item.amountHotel + item.amountTaxi + item.amountRec + item.amountOther + item.amountSubsidy)
              })
            }
          })

        }
        let a = this.amount
        this.amount = a.toFixed(2)
      },
      days($event, item) {
        this.$set(item, 'days', Number($event))
      },
      amountSubsidy($event, item) {
        this.$set(item, 'amountSubsidy', Number($event))
        console.log(item.amountSubsidy)
        this.getTotal()

      },
      amountVeh($event, item) {
        this.$set(item, 'amountVeh', Number($event))
        this.getTotal()
        // item.amountVeh = $event.target.value
        console.log(item.amountVeh)
      },
      amountHotel($event, item) {
        this.$set(item, 'amountHotel', Number($event))
        this.getTotal()
        // item.amountHotel = $event.target.value
        console.log(item.amountHotel)
      },
      amountTaxi($event, item) {
        this.$set(item, 'amountTaxi', Number($event))
        this.getTotal()
        // item.amountTaxi = $event.target.value
        console.log(item.amountTaxi)
      },
      amountRec($event, item) {
        this.$set(item, 'amountRec', Number($event))
        this.getTotal()
        // item.amountRec = $event.target.value
        console.log(item.amountRec)
      },
      amountOther($event, item) {
        this.$set(item, 'amountOther', Number($event))
        this.getTotal()
        // item.amountOther = $event.target.value
        console.log(item.amountOther)
      },
      vehicle($event, item) {
        // this.$set(item,'vehicle',$event.target.value)
        console.log('vehicle', $event)
        //触发js事件时$event为事件对象 触发vue事件时$event为value
        if ($event.target) {
          item.vehicle = $event.target.value
        } else {
          item.vehicle = $event
        }
        console.log(item.vehicle)
      },
      generate(){
        this.savePEData()
        console.log(this.PEmainData.data[0].entrys)
        let obj = {}
        this.PEmainData.data[0].entrys.forEach((entry)=>{
          if(entry.budgetItem.name){
            if(!obj[entry.budgetItem.name]){
              obj[entry.budgetItem.name] = []
              obj[entry.budgetItem.name].push({amount:entry.amount})
            }else{
              obj[entry.budgetItem.name].push({amount:entry.amount})
            }
          }
        })
        console.log(obj)
        let detail = ''
        this.word2 = ''
        let allAmount = 0
        Object.keys(obj).forEach((key)=>{
          let amount = 0
          console.log(key,obj[key]);
          obj[key].forEach((o)=>{
            // amount += o.amount
            amount = this.$accAdd(amount,o.amount)
          })
          detail += (key +'：' + amount+'元；')
          // allAmount += amount
          // allAmount = allAmount+amount
          allAmount = this.$accAdd(allAmount,amount)
        });
        this.word2 = '本次报销：'+detail+'总计：'+allAmount.toFixed(2)+'元。'+'妥否，请批示。'

        // if(this.selectedInvoice.length>1){
        //   this.word2 = '本次报销：'+detail+'总计：'+allAmount+'元。'+'妥否，请批示。'
        // }else{
        //   this.word2 = '本次报销：'+detail+'妥否，请批示。'
        // }
        this.personExpenseData.remark = this.word2
        console.log(this.word2)
        // this.PEmainData.data[0].remark = this.word2
      },
      generateTravelAccount(){
        this.saveTravelAccountData()
        console.log(this.TravelAccountmainData.data[0])
        this.word1 = '本次报销：'
        let money = 0
        this.TravelAccountmainData.data[0].entrys.forEach((entry)=>{
          // let amount = entry.amountSubsidy+
          //   entry.amountVeh+
          //   entry.amountHotel+
          //   entry.amountTaxi+
          //   entry.amountRec+
          //   entry.amountOther

          let amount = this.$accAdd(entry.amountSubsidy,this.$accAdd(entry.amountVeh,this.$accAdd(entry.amountHotel,this.$accAdd(entry.amountTaxi,this.$accAdd(entry.amountRec,entry.amountOther)))))

          // let xingcheng = entry.startPlace+'-'+entry.endPlace+',共'+(isNaN(entry.days)===true?0:entry.days)+'天'+',费用:'+amount+'元;'
          let xingcheng = entry.startPlace+'-'+entry.endPlace+'，共'+(isNaN(entry.days)===true?0:entry.days)+'天，'
            + (entry.amountSubsidy===0?'':('出差补贴'+entry.amountSubsidy+'元，'))
            + (entry.amountVeh===0?'':('交通费'+entry.amountVeh+'元，'))
            + (entry.amountHotel===0?'':('住宿费'+entry.amountHotel+'元，'))
            + (entry.amountTaxi===0?'':('市内交通费'+entry.amountTaxi+'元，'))
            + (entry.amountRec===0?'':('招待费'+entry.amountRec+'元，'))
            + (entry.amountOther==0?'':('其他费用'+entry.amountOther+'元，'))
            let copy = ''
          console.log("xingcheng.lastIndexOf('；')",xingcheng.lastIndexOf('；'))
          if(xingcheng.lastIndexOf('，') === xingcheng.length-1){
            copy = xingcheng.substring(0,xingcheng.length-1)
            // console.log(xingcheng)
            copy += '。'
            console.log(copy)
          }else{
            copy = xingcheng
          }
          this.word1 += copy
          // money+=amount
          money = this.$accAdd(money,amount)
        })
        // if(this.selectedTravelApplyList.length>1){
        //   this.word1 += '总计'+money+'元。'
        // }
        this.word1 += '总计'+money.toFixed(2)+'元。'
        this.word1 += '妥否，请批示。'
        console.log(this.word1)
        // this.TravelAccountmainData.data[0].remark = this.word1
        this.travelAccountData.remark = this.word1
      },
      XXX($event,item){
        item.showChooseHotel = $event
      }
    },
    watch: {
      currentIndex() {
        if (this.currentIndex === 2) {
          if (JSON.stringify(this.personExpenseData) === '{}' && this.PersonExpenseHasDone === false) {
            this.loadData(this.userId, this.companyId, 'PersonExpense')
            this.name = 'PersonExpense'
          }
        } else if (this.currentIndex === 1) {
          if (JSON.stringify(this.travelAccountData) === '{}' && this.TravelAccountHasDone === false) {
            this.loadData(this.userId, this.companyId, 'TravelAccount')
            this.name = 'TravelAccount'
          }
        } else if (this.currentIndex === 0) {
          if (JSON.stringify(this.travelApplyData) === '{}' && this.TravelApplyHasDone === false) {
            this.loadData(this.userId, this.companyId, 'TravelApply')
            this.name = 'TravelApply'
          }
        }
        localStorage.setItem('name', this.name)
      },
      selectedInvoiceTravelAccount: {
        handler(newValue, oldValue) {
          this.amount = 0
          if (this.selectedTravelApplyList.length > 0) {
            if (this.selectedTravelApplyList[0].entrys.length > 0) {
              console.log(this.selectedTravelApplyList[0].entrys.length)
              this.selectedTravelApplyList[0].entrys.forEach((item) => {
                console.log(item)
                this.amount += (item.amountVeh + item.amountHotel + item.amountTaxi + item.amountRec + item.amountOther)
                // debugger
              })
            }
          }
        },
        immediate: true,
        deep: true,
      }
    }
  }
</script>

<style scoped lang="scss">
    .swiper-container {
        height: calc(100% - 0.88rem);
        /*height: calc(100% - 0.44rem);*/
        &.hiddenNav{
            height: calc(100% - 0.44rem);
        }
        .swiper-wrapper {
            height: 100%;
            .swiper-slide {
                height: 100%;
            }
        }
    }

    .tab-title-wrap {
        padding: 0.05rem 0;
        background-color: #367be7;
    }

    .tab-title {
        background-color: #367be7;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        position: relative;
        .line {
            background: #fff;
            border-radius: 0.015rem;
            width: 0.21rem;
            height: 0.03rem;
            position: absolute;
            visibility: hidden;
            bottom: 0;
        }
        .nav-item {
            padding: 0 0.14rem;
            width: auto !important;
            font-size: 0.16rem;
            flex: 1;
            span {
                display: inline-block;
                line-height: 0.32rem;
                border-bottom: 0.02rem solid rgba(237, 91, 0, 0);
                color: #fff;
                opacity: 0.4;
                width: 100%;
                text-align: center;
            }
            &.nav_active {
                span {
                    color: #fff;
                    opacity: 1;
                }
            }
        }
    }

    .list-wrap {
        &.person-expense {
            .new-data {
                > .content {
                    height: 0;
                    overflow: hidden;
                }
            }
            .invoice-info{
                margin-right: 0 !important;
                .head{
                    .left{
                        .icon{
                            display: inline-block;
                            width: 0.14rem;
                            height: 0.1rem;
                            background: url("../assets/fapiao.png") no-repeat !important;
                            background-size: contain !important;
                        }
                    }
                }
            }
            .desc{
                .head{
                    padding: 0.08rem 0 0.08rem 0 !important;
                    display: flex;
                    justify-content: space-between !important;
                    align-items: center !important;
                    .left{
                        .icon{
                            display: inline-block;
                            width: 0.14rem;
                            height: 0.1rem;
                            background: url("../assets/explain.png") no-repeat !important;
                            background-size: contain !important;
                        }
                    }
                    .right{
                        padding-right: 0.1rem;
                        span{
                            padding: 0.08rem;
                            display: inline-flex;
                            justify-content: center;
                            align-items: center;
                            font-size: 0.12rem;
                            color: #fff;
                            background-color: #599bff;
                            border-radius: 0.02rem;
                        }
                    }
                }
            }
        }

        &.travel-account {
            .new-data {
                > .content {
                    height: 0;
                    overflow: hidden;
                    &.folded {
                        height: 4.23rem !important;
                    }
                }
            }
            .info-wrap{
                .reimburse-list-wrap{
                    .content-wrap{
                        .invoice-info{
                            > .head{
                                .icon{
                                    display: inline-block;
                                    width: 0.2rem;
                                    height: 0.16rem;
                                    background: url("../assets/fapiao.png") no-repeat !important;
                                    background-size: contain !important;
                                }
                            }
                        }

                    }
                }
            }
            .explain{
                .head{
                    padding: 0.08rem 0 0.08rem 0 !important;
                    display: flex;
                    justify-content: space-between !important;
                    align-items: center !important;
                    .left{
                        .icon{
                            display: inline-block;
                            width: 0.14rem;
                            height: 0.1rem;
                            background: url("../assets/explain.png") no-repeat !important;
                            background-size: contain !important;
                        }
                    }
                    .right{
                        padding-right: 0.1rem;
                        span{
                            padding: 0.08rem;
                            display: inline-flex;
                            justify-content: center;
                            align-items: center;
                            font-size: 0.12rem;
                            color: #fff;
                            background-color: #599bff;
                            border-radius: 0.02rem;
                        }
                    }
                }
            }
        }
        &.travel-apply {
            overflow: scroll;
            -webkit-overflow-scrolling:touch;

            .peer-people {
                .right {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    .icon {
                        margin-right: 0.12rem;
                        display: inline-block;
                        width: 0.14rem;
                        height: 0.1rem;
                        background: url("../assets/xia.png") no-repeat;
                        background-size: contain;
                    }
                }
            }
            > .wrap{
                height: calc(100% + 1px);
            }
        }
    }

    .list-wrap {
        /*height: calc(100% - 0.34rem);*/
        height: 100%;
        overflow: hidden;
        background-color: #F1F5F8;
        > .wrap {
            /*height: calc(100% + 1px);*/
            .new-data {
                background-color: #fff;
                > .head {
                    margin-left: 0.12rem;
                    padding: 0.1rem 0;
                    display: flex;
                    justify-content: flex-start;
                    align-items: center;
                    border-bottom: 1px solid #f0f0f0;
                    > .avator {
                        margin-right: 0.12rem;
                        width: 0.43rem;
                        height: 0.43rem;
                        border-radius: 50%;
                        img {
                            width: 100%;
                            height: 100%;
                            border-radius: 50%;
                        }
                    }
                    .name {
                        font-size: 0.14rem;
                        color: #000000;
                        flex: 1;
                    }
                }
                > .content {
                    margin-left: 0.12rem;
                    .row {
                        display: flex;
                        justify-content: flex-start;
                        align-items: center;
                        .label {
                            padding: 0.16rem 0;
                            padding-right: 0.3rem;
                            display: inline-flex;
                            justify-content: flex-start;
                            align-items: center;
                            font-size: 0.14rem;
                            color: #000000;
                            border-bottom: 1px solid #fff;
                            width: 5em;
                            span {
                                color: red;
                            }
                        }
                        .right {
                            padding: 0.16rem 0;
                            font-size: 0.14rem;
                            color: #6e6e6e;
                            border-bottom: 1px solid #f0f0f0;
                            flex: 1;
                            .active {
                                color: #b4b4b4;
                            }
                        }
                    }
                    &.folded {
                        height: 2.82rem;
                    }
                }
                .bottom {
                    text-align: right;
                    div {
                        > p {
                            margin-left: auto;
                            padding: 0.07rem 0.1rem 0.11rem;
                            display: inline-flex;
                            justify-content: flex-end;
                            align-items: center;
                            span {
                                font-size: 0.10rem;
                                color: #007aff;
                            }
                            .icon {
                                margin-left: 0.04rem;
                                display: inline-block;
                                width: 0.14rem;
                                height: 0.1rem;
                                background: url("../assets/xia.png") no-repeat;
                                background-size: contain;
                            }

                            &.unfolded {
                                .icon {
                                    margin-left: 0.04rem;
                                    display: inline-block;
                                    width: 0.14rem;
                                    height: 0.1rem;
                                    background: url("../assets/shang.png") no-repeat;
                                    background-size: contain;
                                }
                            }
                        }
                    }

                }
            }
            .info-wrap {
                margin-top: 0.1rem;
                background-color: #fff;
                overflow: hidden;
                /*.add {*/
                    /*margin-top: 0.1rem;*/
                    /*margin-left: auto;*/
                    /*display: flex;*/
                    /*justify-content: center;*/
                    /*align-items: center;*/
                    /*background: #599bff;*/
                    /*border-top-left-radius: 0.34rem;*/
                    /*border-bottom-left-radius: 0.34rem;*/
                    /*width: 1rem;*/
                    /*height: 0.45rem;*/
                    /*font-size: 0.14rem;*/
                    /*color: #ffffff;*/
                /*}*/
                &.reimburse-info {
                    > .head {
                        padding: 0.04rem 0 !important;
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        border: 0;
                        background-color: #fff;
                        .right {
                            /*padding-right: 0.12rem;*/
                            .add-entry {
                                /*span{*/
                                /*padding: 0 0.1rem;*/
                                /*display: inline-flex;*/
                                /*justify-content: center;*/
                                /*align-items: center;*/
                                /*border:1px solid #057dff;*/
                                /*border-radius:2px;*/
                                /*!*width:0.46rem;*!*/
                                /*height:0.18rem;*/
                                /*color: #057dff !important;*/
                                /*font-size: 0.1rem;*/
                                /*}*/
                                /*padding: 0 0.1rem;*/
                                display: flex;
                                justify-content: center;
                                align-items: center;
                                /*position: absolute;*/
                                /*right: 0;*/
                                /*top: 0.01rem;*/
                                background: #599bff;
                                border-top-left-radius: 0.34rem;
                                border-bottom-left-radius: 0.34rem;
                                width: 1rem;
                                height: 0.45rem;
                                font-size: 0.14rem;
                                color: #ffffff;
                            }
                        }
                    }
                    .select-wrap {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        .select-block {
                            margin-right: 0.12rem;
                            position: relative;
                            select {
                                height: 0.2rem;
                                position: absolute;
                                top: 50%;
                                transform: translateY(-50%);
                                right: 0;
                                opacity: 0;
                            }
                            .triangle-down {
                                display: inline-block;
                                width: 0.12rem;
                                height: 0.07rem;
                                background: url("../assets/triangle-down.png") no-repeat;
                                background-size: contain;
                            }
                        }
                    }
                }
                &.invoice-info {
                    position: relative;
                    margin-right: 0.12rem;
                    box-shadow:0.01rem 0.01rem 0.08rem 0 #e4ebf1;
                    border-radius:0.04rem;
                    .add-invoice {
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        position: absolute;
                        right: 0;
                        top: 0.01rem;
                        background: #599bff;
                        border-top-left-radius: 0.34rem;
                        border-bottom-left-radius: 0.34rem;
                        width: 1rem;
                        height: 0.45rem;
                        font-size: 0.14rem;
                        color: #ffffff;
                    }
                    /*>.head{*/
                    /*margin-left: 0.12rem;*/
                    /*padding: 0.16rem 0 0.16rem 0;*/
                    /*display: flex;*/
                    /*justify-content: flex-start;*/
                    /*align-items: center;*/
                    /*border-bottom: 1px solid #f0f0f0;*/
                    /*> .icon {*/
                    /*display: inline-block;*/
                    /*width: 0.2rem;*/
                    /*height: 0.16rem;*/
                    /*background: url("../assets/chucha-otherTransport.png") no-repeat;*/
                    /*background-size: contain;*/
                    /*}*/
                    /*span {*/
                    /*font-size: 0.14rem;*/
                    /*color: #000000;*/
                    /*}*/
                    /*}*/
                    .tips{
                        padding: 0.2rem 0;
                        text-align: center;
                        font-size:0.10rem;
                        color:#bcc7d2;
                    }
                    .list {
                        .item {
                            /*padding: 0.1rem 0.14rem 0.064rem 0.14rem;*/
                            padding: 0.1rem 0.14rem 0 0.14rem;
                            margin: 0.12rem;
                            background: url(../assets/invoice-small.png) no-repeat;
                            background-size: contain;
                            > .head {
                                height: 0.34rem;
                                display: flex;
                                justify-content: space-between;
                                align-items: center;
                                .left {
                                    font-size: 0.14rem;
                                    color: #000000;
                                }
                                .shortname {
                                    font-size: 0.14rem;
                                    color: #000000;
                                }
                                .right {
                                    display: flex;
                                    justify-content: center;
                                    align-items: center;
                                    background: #ff832f;
                                    width: 0.21rem;
                                    height: 0.21rem;
                                    border-radius: 50%;
                                    color: #fff;
                                    font-size: 0.14rem;
                                }
                            }
                            > .body {
                                display: flex;
                                flex-direction: column;
                                justify-content: flex-start;
                                height: 0.954rem;
                                > .row {
                                    padding-bottom: 0.04rem;
                                    padding-top: 0.08rem;
                                    display: flex;
                                    justify-content: space-between;
                                    align-items: center;
                                    /*height: 0.22rem;*/
                                    .left {
                                        display: flex;
                                        justify-content: flex-start;
                                        align-items: flex-start;
                                        span:first-child {
                                            font-size: 0.13rem;
                                            color: #808081;
                                            min-width: 5em;
                                        }
                                        span:last-child {
                                            font-size: 0.13rem;
                                            color: #181818;
                                            text-align: left;
                                        }
                                    }
                                    .right {
                                        font-size: 0.13rem;
                                        color: #9b9b9b;
                                    }
                                }
                            }
                        }
                    }
                }
                &.desc {
                    .text {
                        /*margin-top: 0.1rem;*/
                        /*margin-bottom: 0.2rem;*/
                        /*margin-left: 0.12rem;*/
                        /*position: relative;*/
                        /*span {*/

                        /*font-size: 0.14rem;*/
                        /*color: #b3b3b3;*/
                        /*}*/
                        /*textarea {*/
                        /*position: absolute;*/
                        /*top: 0;*/
                        /*left: 0;*/
                        /*z-index: 1;*/
                        /*font-size: 0.12rem;*/
                        /*opacity: 0;*/
                        /*}*/
                    }
                }
                > .head {
                    margin-left: 0.12rem;
                    padding: 0.16rem 0 0.16rem 0;
                    display: flex;
                    justify-content: flex-start;
                    align-items: center;
                    border-bottom: 1px solid #f0f0f0;
                    .left {
                        display: flex;
                        justify-content: flex-start;
                        align-items: center;
                        .icon {
                            display: inline-block;
                            width: 0.2rem;
                            height: 0.16rem;
                            background: url("../assets/chucha-2.png") no-repeat;
                            background-size: contain;
                        }
                        span {
                            font-size: 0.14rem;
                            color: #000000;
                        }
                    }
                }
                .TravelAccount {
                    padding: 0.16rem 0 0.16rem 0;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    > .left {
                        display: flex;
                        justify-content: flex-start;
                        align-items: center;
                        > .icon {
                            display: inline-block;
                            width: 0.2rem;
                            height: 0.16rem;
                            background: url("../assets/chucha-2.png") no-repeat;
                            background-size: contain;
                        }
                        span {
                            font-size: 0.14rem;
                            color: #000000;
                        }
                    }
                    > .right {
                        margin-right: 0.12rem;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        border: 1px solid #c4c4c4;
                        border-radius: 2px;
                        width: 0.46rem;
                        height: 0.18rem;
                        font-size: 0.12rem;
                        color: #6e6e6e;
                    }
                }
                .summary {
                    margin: 0 0.1rem 0.1rem 0.1rem;
                    /*padding: 0.11rem 0.65rem 0.13rem 0.65rem;*/
                    padding: 0.11rem 0 0.13rem 0;
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-start;
                    background: #f2f6f9;
                    box-shadow: 0 2px 4px 0 #e3eef5;
                    border-radius: 4px;
                    .block {
                        display: flex;
                        justify-content: flex-start;
                        align-items: center;
                        flex-direction: column;
                        width: 50%;
                        .label {
                            font-size: 0.12rem;
                            color: #6e6e6e;
                        }
                        .num {
                            font-size: 0.26rem;
                            line-height: 1.46;
                            color: #333333;
                            word-break: break-all;
                            max-width: 1.5rem;
                        }
                    }
                    .line {
                        width: 0.01rem;
                        height: 0.3rem;
                        background-color: #e3dede;
                    }
                }

                .reimburse-list {
                    /*padding-left: 0.12rem;*/
                    .reimburse-item {
                        margin-top: 0.1rem;
                        > .head {
                            padding-left: 0.12rem;
                            padding-top: 0.1rem;
                            display: flex;
                            justify-content: space-between;
                            align-items: center;

                            .left {
                                display: flex;
                                justify-content: flex-start;
                                align-items: center;
                                .line {
                                    margin-right: 0.05rem;
                                    background: #228cff;
                                    width: 0.03rem;
                                    height: 0.13rem;
                                    display: inline-block;
                                }
                                span {
                                    font-size: 0.14rem;
                                    color: #000000;
                                }
                            }
                            .right {
                                display: inline-flex;
                                justify-content: center;
                                align-items: center;
                                .remove-btn {
                                    span {
                                        display: inline-flex;
                                        justify-content: center;
                                        align-items: center;
                                        border: 1px solid #007aff;
                                        border-radius: 2px;
                                        width: 0.46rem;
                                        height: 0.18rem;
                                        color: #007aff !important;
                                        font-size: 0.12rem;
                                    }
                                }
                                div {
                                    > p {
                                        margin-left: auto;
                                        padding: 0.07rem 0.1rem 0.07rem;
                                        display: inline-flex;
                                        justify-content: flex-end;
                                        align-items: center;
                                        span {
                                            font-size: 0.10rem;
                                            color: #007aff;
                                        }
                                        .icon {
                                            display: inline-block;
                                            width: 0.14rem;
                                            height: 0.1rem;
                                            background: url("../assets/xia.png") no-repeat;
                                            background-size: contain;
                                        }

                                        &.unfolded {
                                            .icon {
                                                margin-left: 0.04rem;
                                                display: inline-block;
                                                width: 0.14rem;
                                                height: 0.1rem;
                                                background: url("../assets/shang.png") no-repeat;
                                                background-size: contain;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        > .summary {
                            margin: 0 0.1rem 0.1rem 0;
                            margin-left: 0.12rem;
                        }
                        > .content-wrap {
                            background-color: #f2f6f9;
                            overflow: hidden;
                            > .content {
                                margin-left: 0.12rem;
                                > .row {
                                    display: flex;
                                    justify-content: flex-start;
                                    align-items: center;
                                    .label {
                                        padding: 0.16rem 0;
                                        padding-right: 0.3rem;
                                        display: flex;
                                        justify-content: flex-start;
                                        align-items: center;
                                        font-size: 0.14rem;
                                        color: #000000;
                                        border-bottom: 1px solid #fff;
                                        width: 5em;
                                        span {
                                            color: red;
                                        }
                                    }
                                    .right {
                                        padding: 0.16rem 0;
                                        font-size: 0.14rem;
                                        color: #6e6e6e;
                                        border-bottom: 1px solid #f0f0f0;
                                        flex: 1;
                                        .active {
                                            color: #b4b4b4;
                                        }
                                    }
                                }
                                &.itemFolded {
                                    height: 0.47rem;
                                    overflow: hidden;
                                }
                                .travelMessage {
                                    margin-bottom: 0.22rem;
                                    .main {
                                        margin-right: 0.12rem;
                                        padding-left: 0.2rem;
                                        padding-right: 0.2rem;
                                        padding-bottom: 0.2rem;
                                        /*background: #fff8ec;*/
                                        /*border-bottom: 1px dashed #e1e1e1;*/

                                        border-top-left-radius: 0.04rem;
                                        border-top-right-radius: 0.04rem;
                                        background-image:linear-gradient(-100deg, #75acff 0%, #377ce8 100%);
                                        box-shadow:1px 1px 8px 0 #e4ebf1;
                                        > .top {
                                            padding-top: 0.16rem;
                                            display: flex;
                                            justify-content: space-between;
                                            align-items: center;
                                            .left {
                                                display: inline-flex;
                                                justify-content: center;
                                                align-items: center;
                                                font-size: 0;
                                                span{
                                                    font-size:0.14rem;
                                                    color:#ffffff;
                                                }
                                            }
                                            .right {
                                                /*padding-right: 0.2rem;*/
                                                /*font-size: 0.14rem;*/
                                                /*color: #007aff;*/
                                                padding: 0.06rem 0.14rem;
                                                background:#ffffff;
                                                border-radius: 0.14rem;
                                                span{
                                                    font-size:0.12rem;
                                                    color:#4889ee;
                                                }
                                            }
                                        }
                                        > .body {
                                            padding-top: 0.12rem;
                                            .top {
                                                display: flex;
                                                justify-content: space-between;
                                                align-items: flex-start;
                                                flex-direction: column;
                                                .left {
                                                    span {
                                                        font-size: 0.16rem;
                                                        color: #fff;
                                                    }
                                                }
                                                .right {
                                                    padding-top: 0.06rem;
                                                    span {
                                                        font-size: 0.16rem;
                                                        color: #333333;
                                                    }
                                                }
                                            }
                                            > .row {
                                                display: flex;
                                                justify-content: space-between;
                                                align-items: flex-start;
                                                > .block {
                                                    width: 1rem;
                                                    display: flex;
                                                    flex-direction: column;
                                                    justify-content: space-around;
                                                    align-items: flex-start;
                                                    span:first-child {
                                                        margin-bottom: 0.08rem;
                                                        font-size: 0.16rem;
                                                        color: #fff;
                                                    }
                                                    span:last-child {
                                                        font-size: 0.12rem;
                                                        color: #fff;
                                                        word-break: break-all;
                                                    }
                                                    &:last-child{
                                                        align-items: flex-end;
                                                    }
                                                }
                                                > .middle{
                                                    display: flex;
                                                    justify-content: center;
                                                    align-items: center;
                                                    flex-direction: column;
                                                    .line-wrap{
                                                        margin-bottom: 0.05rem;
                                                        display: flex;
                                                        justify-content: center;
                                                        align-items: center;
                                                        .line {
                                                            /*margin: 0 0.06rem;*/
                                                            margin: 0;
                                                            height: 1px;
                                                            width: 0.43rem;
                                                            background-color: #fff;
                                                        }
                                                        .type {
                                                            .icon {
                                                                display: inline-block;
                                                                width: 0.2rem;
                                                                height: 0.2rem;
                                                                background: url("../assets/arrow.png") no-repeat;
                                                                background-size: contain;
                                                            }
                                                        }
                                                    }
                                                    .name{
                                                        font-size:0.12rem;
                                                        color:#ffffff;
                                                    }
                                                }
                                            }
                                            /*.line {*/
                                                /*padding-top: 0.06rem;*/
                                                /*span {*/
                                                    /*padding-right: 0.1rem;*/
                                                    /*font-size: 0.13rem;*/
                                                    /*color: #707072;*/
                                                /*}*/
                                            /*}*/
                                        }
                                    }
                                    .item-wrap {
                                        margin-right: 0.12rem;
                                        box-shadow:0.01rem 0.01rem 0.08rem 0 #e4ebf1;
                                        border-radius:0.04rem;
                                        .item {
                                            display: flex;
                                            justify-content: flex-start;
                                            align-items: center;
                                            font-size: 0.14rem;
                                            color: #373737;
                                            background-color: #fff;
                                            > .label{
                                                margin-left: 0.14rem;
                                                margin-right: 0.16rem;
                                                display: inline-flex;
                                                justify-content: flex-start;
                                                align-items: center;
                                                > span {
                                                    display: inline-flex;
                                                    min-width: 5em;
                                                    font-size: 0.14rem;
                                                    color: #373737;
                                                }
                                                .icon{
                                                    margin-right: 0.06rem;
                                                    display: inline-block;
                                                    width: 0.2rem;
                                                    height: 0.2rem;
                                                    background: url("../assets/defaultAvator.png") no-repeat;
                                                    background-size: contain;
                                                    &.days{
                                                        background: url("../assets/Group 3.png") no-repeat;
                                                        background-size: contain;
                                                    }
                                                    &.butie{
                                                        background: url("../assets/Group 10.png") no-repeat;
                                                        background-size: contain;
                                                    }
                                                    &.amountVeh{
                                                        background: url("../assets/Group 9.png") no-repeat;
                                                        background-size: contain;
                                                    }
                                                    &.vehicle{
                                                        background: url("../assets/Group 8.png") no-repeat;
                                                        background-size: contain;
                                                    }
                                                    &.amountHotel{
                                                        background: url("../assets/Group 11.png") no-repeat;
                                                        background-size: contain;
                                                    }
                                                    &.amountTaxi{
                                                        background: url("../assets/Group 13.png") no-repeat;
                                                        background-size: contain;
                                                    }
                                                    &.amountRec{
                                                        background: url("../assets/Group 14.png") no-repeat;
                                                        background-size: contain;
                                                    }
                                                    &.amountOther{
                                                        background: url("../assets/Group 15.png") no-repeat;
                                                        background-size: contain;
                                                    }
                                                }
                                            }
                                            .right{
                                                margin-right: 0.1rem;
                                                padding: 0.2rem 0;
                                                flex: 1;
                                                border-bottom: 1px solid #dadada;
                                            }
                                            &:last-child{
                                                border-bottom-left-radius:0.04rem;
                                                border-bottom-right-radius:0.04rem;
                                            }
                                        }
                                    }
                                    /*.transportation-fee {*/
                                        /*border-bottom: 1px dashed #e1e1e1;*/
                                        /*.head {*/
                                            /*padding: 0.06rem 0.14rem;*/
                                            /*font-size: 0.12rem;*/
                                            /*color: #515151;*/
                                        /*}*/
                                        /*.table {*/
                                            /*padding: 0.14rem 0.14rem 0.08rem 0.14rem;*/
                                            /*display: flex;*/
                                            /*justify-content: flex-start;*/
                                            /*align-items: center;*/
                                            /*flex-wrap: wrap;*/
                                            /*background: #fff8ec;*/
                                            /*.item {*/
                                                /*padding-right: 0.08rem;*/
                                                /*padding-bottom: 0.06rem;*/
                                                /*display: inline-flex;*/
                                                /*justify-content: flex-start;*/
                                                /*align-items: center;*/
                                                /*width: calc(80% / 2);*/
                                                /*> span {*/
                                                    /*padding-bottom: 0.08rem;*/
                                                    /*display: inline-flex;*/
                                                    /*justify-content: flex-start;*/
                                                    /*align-items: flex-end;*/
                                                    /*min-width: 5em;*/
                                                    /*height: 0.2rem;*/
                                                    /*padding-right: 0.04rem;*/
                                                    /*font-size: 0.14rem;*/
                                                    /*color: #333333;*/
                                                /*}*/
                                                /*.input-wrap {*/
                                                    /*!*padding-bottom: 0.08rem;*!*/
                                                    /*height: 0.2rem;*/
                                                    /*position: relative;*/
                                                    /*display: flex;*/
                                                    /*justify-content: space-between;*/
                                                    /*align-items: center;*/
                                                    /*border-bottom: 1px solid #ccc;*/
                                                    /*.input-block {*/
                                                        /*height: 100%;*/
                                                        /*span {*/
                                                            /*display: inline-block;*/
                                                            /*min-width: 3.5em;*/
                                                            /*!*height: 100%;*!*/
                                                            /*padding-right: 0.08rem;*/
                                                            /*font-size: 0.14rem;*/
                                                            /*color: #333333;*/
                                                        /*}*/
                                                        /*input {*/
                                                            /*width: 0.5rem;*/
                                                            /*!*position: absolute;*!*/
                                                            /*!*top: 50%;*!*/
                                                            /*!*transform: translateY(-50%);*!*/
                                                            /*!*left: 0;*!*/
                                                            /*height: 100%;*/
                                                            /*z-index: 11;*/
                                                            /*border: 0;*/
                                                            /*font-size: 0.14rem;*/
                                                            /*background-color: #fff8ec;*/
                                                        /*}*/
                                                    /*}*/
                                                /*}*/

                                            /*}*/
                                        /*}*/
                                    /*}*/
                                    /*.other-fee, .travel-fee {*/
                                        /*.head {*/
                                            /*padding: 0.06rem 0.14rem;*/
                                            /*font-size: 0.12rem;*/
                                            /*color: #515151;*/
                                        /*}*/
                                        /*.table {*/
                                            /*padding: 0.14rem 0.14rem 0 0.14rem;*/
                                            /*display: flex;*/
                                            /*justify-content: flex-start;*/
                                            /*align-items: center;*/
                                            /*flex-wrap: wrap;*/
                                            /*background: #fff8ec;*/
                                            /*.item {*/
                                                /*padding-right: 0.08rem;*/
                                                /*padding-bottom: 0.06rem;*/
                                                /*display: inline-flex;*/
                                                /*justify-content: flex-start;*/
                                                /*align-items: center;*/
                                                /*!*padding-bottom: 0.12rem;*!*/
                                                /*width: calc(80% / 2);*/
                                                /*span {*/
                                                    /*!*padding-bottom: 0.08rem;*!*/
                                                    /*display: inline-flex;*/
                                                    /*justify-content: flex-start;*/
                                                    /*align-items: center;*/
                                                    /*min-width: 5em;*/
                                                    /*height: 100%;*/
                                                    /*padding-right: 0.08rem;*/
                                                    /*font-size: 0.14rem;*/
                                                    /*color: #333333;*/
                                                /*}*/
                                                /*.input-wrap {*/
                                                    /*!*padding-bottom: 0.08rem;*!*/
                                                    /*height: 0.2rem;*/
                                                    /*position: relative;*/
                                                    /*display: inline-flex;*/
                                                    /*justify-content: space-between;*/
                                                    /*align-items: center;*/
                                                    /*border-bottom: 1px solid #ccc;*/
                                                    /*.input-block {*/
                                                        /*height: 100%;*/
                                                        /*input {*/
                                                            /*!*width: 0.3rem;*!*/
                                                            /*width: 4em;*/
                                                            /*!*position: absolute;*!*/
                                                            /*!*top: 50%;*!*/
                                                            /*!*transform: translateY(-50%);*!*/
                                                            /*!*left: 0;*!*/
                                                            /*height: calc(100%);*/
                                                            /*z-index: 11;*/
                                                            /*border: 0;*/
                                                            /*font-size: 0.14rem;*/
                                                            /*background-color: #fff8ec;*/
                                                            /*!*opacity: 0;*!*/
                                                        /*}*/
                                                    /*}*/
                                                /*}*/
                                            /*}*/
                                        /*}*/
                                    /*}*/
                                }
                            }
                        }
                        > .content {
                            margin-left: 0.12rem;
                            > .row {
                                display: flex;
                                justify-content: flex-start;
                                align-items: center;
                                .label {
                                    padding: 0.16rem 0;
                                    padding-right: 0.3rem;
                                    display: flex;
                                    justify-content: flex-start;
                                    align-items: center;
                                    font-size: 0.14rem;
                                    color: #000000;
                                    border-bottom: 1px solid #fff;
                                    width: 5em;
                                    span {
                                        color: red;
                                    }
                                }
                                .right {
                                    padding: 0.16rem 0;
                                    font-size: 0.14rem;
                                    color: #6e6e6e;
                                    border-bottom: 1px solid #f0f0f0;
                                    flex: 1;
                                    .active {
                                        color: #b4b4b4;
                                    }
                                }
                            }
                            &.itemFolded {
                                height: 0.47rem;
                                overflow: hidden;
                            }

                        }
                        &.travelApply {
                            > .head {
                                margin-left: 0.12rem;
                                padding: 0.16rem 0 0.16rem 0;
                                display: flex;
                                justify-content: space-between;
                                align-items: center;
                                border-bottom: 1px solid #f0f0f0;
                                .left {
                                    display: flex;
                                    justify-content: flex-start;
                                    align-items: center;
                                    .icon {
                                        display: inline-block;
                                        width: 0.2rem;
                                        height: 0.16rem;
                                        background: url("../assets/chucha-2.png") no-repeat;
                                        background-size: contain;
                                    }
                                    span {
                                        font-size: 0.14rem;
                                        color: #000000;
                                    }
                                }
                                .right {
                                    margin-right: 0.12rem;
                                    display: flex;
                                    justify-content: center;
                                    align-items: center;
                                    border: 1px solid #c4c4c4;
                                    border-radius: 2px;
                                    width: 46px;
                                    height: 18px;
                                    font-size: 0.12rem;
                                    color: #ccc;
                                    span {

                                    }
                                }
                            }
                            > .content{
                                margin-left: 0.12rem;
                                > .row {
                                    display: flex;
                                    justify-content: flex-start;
                                    align-items: center;
                                    .label {
                                        padding: 0.16rem 0;
                                        padding-right: 0.3rem;
                                        display: flex;
                                        justify-content: flex-start;
                                        align-items: center;
                                        font-size: 0.14rem;
                                        color: #000000;
                                        border-bottom: 1px solid #fff;
                                        width: 5em;
                                        span {
                                            color: red;
                                        }
                                    }
                                    .right {
                                        padding: 0.16rem 0;
                                        font-size: 0.14rem;
                                        color: #6e6e6e;
                                        border-bottom: 1px solid #f0f0f0;
                                        flex: 1;
                                        .active {
                                            color: #b4b4b4;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            .btns-wrap {
                font-size: 0;
                span {
                    width: 50%;
                    height: 0.5rem;
                    display: inline-flex;
                    justify-content: center;
                    align-items: center;
                    font-size: 0.16rem;
                    color: #ffffff;
                    background-image: linear-gradient(-130deg, #488cf8 0%, #367be7 100%);
                }
            }
        }

    }
    .add {
        display: flex;
        justify-content: center;
        align-items: center;
        background: #599bff;
        border-top-left-radius: 0.34rem;
        border-bottom-left-radius: 0.34rem;
        width: 1.2rem;
        height: 0.45rem;
        font-size: 0.14rem;
        color: #ffffff;
        position: fixed;
        right: 0;
        top: 0.96rem;
        z-index: 10;
        &.tc{
            position: fixed;
            right: 0;
            top: 2rem;
        }
    }

    /*.body{*/
        /*position: fixed;*/
        /*top: 0;*/
        /*left: 0;*/
        /*!*bottom: 0;*!*/
        /*z-index: 1111;*/
        /*width: 100%;*/
        /*background: #fff;*/
        /*!*height: 100%;*!*/
        /*.placeholder{*/
            /*height: 0.88rem;*/
            /*&.hiddenNav{*/
                /*height: 0.44rem;*/
            /*}*/
        /*}*/
        /*!*&.hiddenNav{*!*/
        /*!*top: 0.44rem;*!*/
        /*!*}*!*/
        /*.title {*/
            /*margin-left: 0.1rem;*/
            /*padding-top: 0.1rem;*/
            /*padding-bottom: 0.16rem;*/
            /*font-size: 0.15rem;*/
            /*color: #000000;*/
        /*}*/
        /*.list-wrap{*/
            /*height: calc(100% - 0.88rem);*/
            /*overflow: hidden;*/
            /*&.hiddenNav{*/
                /*height: calc(100% - 0.44rem);*/
            /*}*/
            /*.item {*/
                /*padding-top: 0.08rem;*/
                /*padding-bottom: 0.12rem;*/
                /*margin-right: 0.1rem;*/
                /*margin-left: 0.1rem;*/
                /*display: flex;*/
                /*justify-content: flex-start;*/
                /*align-items: center;*/
                /*border-bottom: 1px solid #f0f0f0;*/
                /*.left {*/
                    /*margin-right: 0.1rem;*/
                    /*width: 0.2rem;*/
                    /*height: 0.2rem;*/
                    /*border: 1px solid #367be7;*/
                    /*border-radius: 50%;*/
                    /*.icon {*/
                        /*display: inline-block;*/
                        /*width: 0.2rem;*/
                        /*height: 0.2rem;*/
                        /*background: none;*/

                    /*}*/
                    /*&.active {*/
                        /*border: 0;*/
                        /*.icon {*/
                            /*background: url("../assets/selected.png") no-repeat;*/
                            /*background-size: contain;*/
                        /*}*/
                    /*}*/
                /*}*/
                /*.right {*/
                    /*flex: 1;*/
                    /*.top {*/
                        /*padding-bottom: 0.06rem;*/
                        /*span:first-child {*/
                            /*padding-right: 0.04rem;*/
                            /*font-size: 0.15rem;*/
                            /*color: #000000;*/
                        /*}*/
                        /*span:last-child {*/
                            /*font-size: 0.13rem;*/
                            /*color: #6e6e6e;*/
                        /*}*/
                    /*}*/
                    /*.bottom {*/
                        /*span {*/
                            /*font-size: 0.13rem;*/
                            /*color: #6e6e6e;*/
                        /*}*/
                    /*}*/
                /*}*/
            /*}*/
        /*}*/
    /*}*/
</style>