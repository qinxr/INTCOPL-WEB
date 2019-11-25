<template>
	<Row>
		<Card>
			<p slot="title" style="height: 25px;">PVC配料记录表（一）-PVC一厂
				<Button type="primary" size="small" style="margin-left: 15px; float: right;" @click="addpl()">保存修改</Button>
				<Select v-model="data.recipe" size="small" style="width:100px; float: right;">
					<i-option v-for="item in recipe" :value="item.value" :key="item.value">{{ item.label }}</i-option>
				</Select>
			</p>
			<Card>
				<Row>
					<Col span="2" class="intro">日期:</Col>
					<Col span="5">
					<DatePicker type="date" @on-change="data.formDate=$event" :value="data.formDate" placeholder="日期" style="width: 100%"></DatePicker>
					</Col>
					<Col span="2" offset="1" class="intro">班次:</Col>
					<Col span="5">
					<Select v-model="data.shift" :value="data.shift" style="width:100%">
						<i-option v-for="item in classes" :value="item.value" :key="item.value">{{ item.label }}</i-option>
					</Select>
					</Col>
					<Col span="2" offset="1" class="intro">分厂:</Col>
					<Col span="5">
					<Select v-model="data.factory" style="width:100%">
						<i-option v-for="item in factory" :value="item.value" :key="item.value">{{ item.label }}</i-option>
					</Select>
					</Col>
				</Row>
				<Row class="top">
					<Col span="3" class="intro">开始搅拌时间:</Col>
					<Col span="4">
							<DatePicker  :value='data.stirStartTime' type="datetime" format="yyyy-MM-dd HH:mm" @on-change="data.stirStartTime=$event" placeholder="Select time" style="width: 100%"></DatePicker>

					</Col>
					<Col span="3" offset="1" class="intro">结束搅拌时间:</Col>
					<Col span="4">
							<DatePicker  :value='data.stirEndTime' type="datetime" format="yyyy-MM-dd HH:mm" @on-change="data.stirEndTime=$event" placeholder="Select time" style="width: 100%"></DatePicker>

					</Col>
					<Col span="2" offset="1" class="intro">批号:</Col>
					<Col span="5">
					<Input v-model="data.lotNumber" style="width: 100%" />
					</Col>
				</Row>
				<Row class="top">
					<Col span="3" class="intro">一次搅拌机号:</Col>
					<Col span="4">
					<Select v-model="data.mixerNumber" style="width:100%">
						<i-option v-for="item in mixerNumber" :value="item.value" :key="item.value">{{ item.label }}</i-option>
					</Select>
					</Col>
					<Col span="5" offset="1" class="intro">搅拌机转速（转/分钟）:</Col>
					<Col span="2">
					<Input v-model="data.rotateSpeed" style="width: 100%" />
					</Col>
					<Col span="2" offset="6" class="intro">
					<Button type="primary" size="small" style=" float: right;" @click="addRow()"><Icon type="md-add" />新增行</Button>
					</Col>
				</Row>
				<Row class="top">

					<Table :columns="columns" :data="data.ylData" style="overflow: inherit;"></Table>
				</Row>
				<Row class="top">
					<Col span="2" class="intro">投放总量（kg):</Col>
					<Col span="2">
					<Input v-model="data.totalCount" style="width: 100%" />
					</Col>
					<Col span="2" offset="1" class="intro">搅拌总时长:</Col>
					<Col span="2">
					<Input v-model="data.totalTime" style="width: 100%" />
					</Col>
					<Col span="2" offset="1" class="intro">粘度（cps）:</Col>
					<Col span="2">
					<Input v-model="data.visDegree" style="width: 100%" />
					</Col>
					<Col span="2" offset="1" class="intro">细度（μm）:</Col>
					<Col span="2">
					<Input v-model="data.finDegree" style="width: 100%" />
					</Col>
					<Col span="2" offset="1" class="intro">检验员:</Col>
					<Col span="2">
					<Select v-model="data.inspectors" style="width:100%">
						<i-option v-for="item in inspectors" :value="item.value" :key="item.value">{{ item.label }}</i-option>
					</Select>
					</Col>
				</Row>
				<Card>
					<p slot="title">搅拌温度记录（1次/30分钟）</p>

					<Row class="top">
						<table style="width:100%;text-align: center;" border="1" cellpadding="0" cellspacing="0">
							<tr>
								<td style="width:13%;">检测时间:</td>
								<td v-for='item in data.detTime'>
									<TimePicker :value="item.detTime"  format="HH:mm" @on-change="item.detTime=$event" placeholder="Select time" style="width: 100%"></TimePicker>
								</td>
							</tr>
							<tr>
								<td>检测温度（℃）</td>
								<td v-for='item in data.detTime'>
									<Input v-model="item.detTemperature" style="width: 100%" />
								</td>

							</tr>
						</table>
					</Row>
				</Card>
				<Card>
					<p slot="title">静置</p>
					<Row>
						<Col span="2" class="intro">开始静置时间:</Col>
						<Col span="5">
						<DatePicker type="datetime"  format="yyyy-MM-dd HH:mm" :value="data.restStartTime" @on-change="data.restStartTime=$event" placeholder="Select time" style="width: 100%"></DatePicker>
						</Col>
						<Col span="2" offset="1" class="intro">开始静置温度:</Col>
						<Col span="5">
						<Input v-model="data.restTemperature" style="width: 100%" />
						</Col>
						<Col span="2" offset="1" class="intro">操作员:</Col>
						<Col span="5">
						<Select v-model="data.restStartOperator" style="width:100%">
							<i-option v-for="item in operator" :value="item.value" :key="item.value">{{ item.label }}</i-option>
						</Select>
						</Col>
					</Row>
					<Row class="top">
						<Col span="2" class="intro">结束静置时间:</Col>
						<Col span="5">
						<DatePicker type="datetime"  format="yyyy-MM-dd HH:mm" :value="data.restEndTime" @on-change="data.restEndTime=$event" placeholder="结束静置时间" style="width: 100%"></DatePicker>
						</Col>
						<Col span="2" offset="1" class="intro">班次:</Col>
						<Col span="5">
						<Select v-model="data.restShift" style="width:100%">
							<i-option v-for="item in classes" :value="item.value" :key="item.value">{{ item.label }}</i-option>
						</Select>
						</Col>
						<Col span="2" offset="1" class="intro">操作员:</Col>
						<Col span="5">
						<Select v-model="data.restEndOperator" style="width:100%">
							<i-option v-for="item in operator2" :value="item.value" :key="item.value">{{ item.label }}</i-option>
						</Select>
						</Col>
					</Row>
					<Row class="top">
						<Col span="2" class="intro">合计静置时间:</Col>
						<Col span="5">
						<Input v-model="data.restTotalTime" style="width: 100%" />
						</Col>
						<Col span="2" offset="1" class="intro">静置罐号:</Col>
						<Col span="5">
						<Input v-model="data.restTankNumber" style="width: 100%" />
						</Col>
						<Col span="5" offset="1" class="intro">静置后放入二次搅拌机号:</Col>
						<Col span="2">
						<Input v-model="data.mixNumber2" style="width: 100%" />
						</Col>
					</Row>
				</Card>
			</Card>
		</Card>
	</Row>
</template>
<script>
	import axios from 'axios';

	export default {

		name: 'plinfoEdit',
		inject: ['reload'],
		data() {
			return {

				data: {
					recipe: '',
					formDate: '', //日期
					shift: '', //班次
					factory: '', //厂区
					stirStartTime: '', //搅拌开始时间
					stirEndTime: '', //搅拌结束时间
					lotNumber: '', //批号
					mixerNumber: '', //一次搅拌机号
					rotateSpeed: '1100', //搅拌机转速
					totalCount: '', //投放总量
					totalTime: '', //搅拌总时长
					visDegree: '', //粘度
					finDegree: '', //细度
					inspectors: '', //检验员
					ylData: [],
					rowData: {
						rawName: '',
						lotNumber: '',
						startTime: '',
						endTime: '',
						deliveryCount: '',
						formulator: '',
						reviewer: '',
					},
					detTime: [{ //检测时间和检测温度
						detTime: '',
						detTemperature: ''
					}, {
						detTime: '',
						detTemperature: ''
					}, {
						detTime: '',
						detTemperature: ''
					}, {
						detTime: '',
						detTemperature: ''
					}, {
						detTime: '',
						detTemperature: ''
					}, {
						detTime: '',
						detTemperature: ''
					}, {
						detTime: '',
						detTemperature: ''
					}, ],
					restStartTime: '', //开始静置时间
					restTemperature: '', //开始静置温度
					restStartOperator: '', //开始静置操作员
					restEndTime: '', //结束静置时间
					restEndOperator: '', //结束静置操作员
					restShift: '', //静置班次
					restTotalTime: '', //合计静置时间
					restTankNumber: '', //静置罐号
					mixNumber2: '', //二次搅拌机号
					finalAuditor: '', //审核人
					tolCount: [],//暂存投放数量
					reviewman: '', //用于更改审核人信息
				},
				differ: {
					start1: '',
					start2: '',
					end1: '',
					end2: '',
				},
				columns: [{
						title: '原料名称',
						key: 'rawName',
						width: 200,
						render: (h, params) => {
							return h('Select', {
								props: {
									value: this.data.ylData[params.row._index].rawName
								},
								on: {
									'on-change': (event) => {
										this.data.ylData[params.row._index].rawName = event
									}
								},
							}, [
								h('Option', {
									props: {
										value: '1',

									}
								}, 'DINP '),
								h('Option', {
									props: {
										value: '2'
									}
								}, 'DOTP '),
								h('Option', {
									props: {
										value: '3'
									}
								}, '沿海增塑剂'),
								h('Option', {
									props: {
										value: '4'
									}
								}, '粗对苯'),
								h('Option', {
									props: {
										value: '5'
									}
								}, '降粘剂'),
								h('Option', {
									props: {
										value: '6'
									}
								}, '钙锌（传化）'),
								h('Option', {
									props: {
										value: '7'
									}
								}, '钙锌（南亚）'),
								h('Option', {
									props: {
										value: '8'
									}
								}, '钙锌（原塑）'),
								h('Option', {
									props: {
										value: '9'
									}
								}, 'PVC粉（沈化）'),
								h('Option', {
									props: {
										value: '10'
									}
								}, 'PVC粉（三友）'),
								h('Option', {
									props: {
										value: '11'
									}
								}, 'PVC粉（郎辉）'),
								h('Option', {
									props: {
										value: '12'
									}
								}, 'PVC粉（台塑F）'),
								h('Option', {
									props: {
										value: '13'
									}
								}, 'PVC粉（台塑G)'),
								h('Option', {
									props: {
										value: '14'
									}
								}, 'PVC粉（其他）'),
							]);
						}
					},
					{
						title: '批号',
						key: 'lotNumber',
						render: (h, params) => {
							return h('Input', {
								props: {
									value: this.data.ylData[params.row._index].lotNumber
								},
								on: {
									input: (event) => {
										this.data.ylData[params.row._index].lotNumber = event
									}
								},
							}, );
						}
					},
					{
						title: '投放时间',
						key: 'startTime',
						render: (h, params) => {
							return h('TimePicker', {
								props: {
									format: "HH:mm",
									placeholder: '投放时间',
									value: this.data.ylData[params.row._index].startTime
								},
								on: {
									'on-change': (event) => {
										this.data.ylData[params.row._index].startTime = event
									}
								},
							}, );
						}
					},
					{
						title: '结束时间',
						key: 'endTime',
						render: (h, params) => {
							return h('TimePicker', {
								props: {
									format: "HH:mm",
									placeholder: '结束时间',
									value: this.data.ylData[params.row._index].endTime
								},
								on: {
									'on-change': (event) => {
										this.data.ylData[params.row._index].endTime = event
									}
								},
							}, );
						}
					},
					{
						title: '投放数量',
						key: 'deliveryCount',
						render: (h, params) => {
							return h('Input', {
								props: {
									value: this.data.ylData[params.row._index].deliveryCount
								},
								on: {
									input: (event) => {
										this.data.ylData[params.row._index].deliveryCount = event
									}
								},
							}, );
						}

					},
					{
						title: '配料员',
						key: 'formulator',
						render: (h, params) => {
							return h('Input', {
								props: {
									placeholder: '配料员',
									value: this.data.ylData[params.row._index].formulator
								},
								on: {
									input: (event) => {
										console.log(event)
										this.data.ylData[params.row._index].formulator = event
									}
								},
							}, );
						}
					},
					{
						title: '复核人',
						key: 'reviewer',
						width: 150,
						render: (h, params) => {
							return h('Select', {
								props: {
									placeholder: '复核人',
									value: this.data.ylData[params.row._index].reviewer
								},
								on: {
									'on-change': (event) => {
										this.data.ylData[params.row._index].reviewer = event
									}
								},
							}, [
								h('Option', {
									props: {
										value: this.data.reviewman
									}
								}, this.data.reviewman),

							]);
						}

					}
				],
				recipe: [{
						value: '01',
						label: '配方一'
					},
					{
						value: '02',
						label: '配方二'
					},
				],
				classes: [{
						value: 'A',
						label: 'A班'
					},
					{
						value: 'B',
						label: 'B班'
					},
					{
						value: 'C',
						label: 'C班'
					},
				],
				factory: [{
						value: '1',
						label: 'PVC一厂'
					},
					{
						value: '2',
						label: 'PVC二厂'
					},{
						value: '3',
						label: 'PVC三厂'
					},

				],
				mixerNumber: [{
						value: '1',
						label: '1号'
					},
					{
						value: '2',
						label: '2号'
					}, {
						value: '3',
						label: '3号'
					},
					{
						value: '4',
						label: '4号'
					},
					{
						value: '5',
						label: '5号'
					},

				],
				inspectors: [{
						value: '1',
						label: ''
					},
					{
						value: '2',
						label: ''
					},
					{
						value: '3',
						label: ''
					},

				],
				operator: [{
						value: '1',
						label: ''
					},
					{
						value: '2',
						label: ''
					},
					{
						value: '3',
						label: ''
					},

				],
				operator2: [{
						value: '1',
						label: ''
					},
					{
						value: '2',
						label: ''
					},
					{
						value: '3',
						label: ''
					},

				],

			}
		},

		watch: {

			'data.ylData': {
				handler(newVal, oldVal) {
					var a = this.data.ylData.length;
					this.data.tolCount = [];
					for(var i = 0; i < a; i++) {
						if(this.data.ylData[i].deliveryCount != '') {

							this.data.tolCount.push(parseInt(this.data.ylData[i].deliveryCount))
						}
					}
					var result = 0;
					for(var i = 0; i < this.data.tolCount.length; i++) {
						result += this.data.tolCount[i];
					}
					this.data.totalCount = result;
				},
				deep: true
			},
			//监测检测数据变化自动生成时间
			'data.detTime': {
				handler(newVal, oldVal) {

					this.changeTime(this.data.detTime[0].detTime);
				},
				deep: true
			},
			//监测时间计算时间差
			'data.stirEndTime': {
				handler(newVal, oldVal) {
					this.data.totalTime = this.gettime(this.data.stirStartTime, this.data.stirEndTime);
				},
				deep: true
			},
			'data.restEndTime': {
				handler(newVal, oldVal) {
					this.data.restTotalTime = this.gettime(this.data.restStartTime, this.data.restEndTime);
				},
				deep: true
			},
			//监测日期，配方，班次，厂区
			'data.recipe': {
				handler(newVal, oldVal) {
					this.getNumber()
				},
				deep: true
			},
			'data.formDate': {
				handler(newVal, oldVal) {
					this.getNumber()
				},
				deep: true
			},
			'data.shift': {
				handler(newVal, oldVal) {
					this.getNumber();
					switch(newVal) {
						case 'A':
							this.data.reviewman = '关庆森';
							var a = ['李海亮', '关庆森', '孟祥东', '杜浩哲', '马际安'];
							this.changePeople(this.operator, a);
							this.changePeople(this.inspectors, a);
							break;
						case 'B':
							this.data.reviewman = '王明川';
							var b = ['刘彬', '李全禄', '王明川', '杜浩哲', '马际安'];
							this.changePeople(this.operator, b);
							this.changePeople(this.inspectors, b);
							break;
						case 'C':
							this.data.reviewman = '徐云山';
							var c = ['孟庆寅', '张立亮', '徐云山', '杜浩哲', '马际安'];
							this.changePeople(this.operator, c);
							this.changePeople(this.inspectors, c);
							break;
						default:
							break;
					}
				},
				deep: true
			},
			'data.restShift': {
				handler(newVal, oldVal) {
					this.getNumber();
					switch(newVal) {
						case 'A':
							var a = ['李海亮', '关庆森', '杜浩哲'];
							this.changePeople(this.operator2, a);
							break;
						case 'B':
							var b = ['刘彬', '王明川', '杜浩哲'];
							this.changePeople(this.operator2, b);
							break;
						case 'C':
							var c = ['孟庆寅', '徐云山', '杜浩哲'];
							this.changePeople(this.operator2, c);
							break;
						default:
							break;
					}
				},
				deep: true
			},
			'data.factory': {
				handler(newVal, oldVal) {
					this.getNumber()
				},
				deep: true
			},
			'data.restTankNumber': {
				handler(newVal, oldVal) {
					//					this.data.lotNumber=this.data.lotNumber.slice(0,9);
					if(this.data.restTankNumber) {
						var a = parseInt(this.data.restTankNumber);
						if(a > 1 && a < 10) {
							this.data.lotNumber = this.data.lotNumber.slice(0, 10) + this.data.restTankNumber;
						} else {
							this.data.lotNumber = this.data.lotNumber.slice(0, 9) + this.data.restTankNumber;
						}
					} else {
						this.data.lotNumber = this.data.lotNumber.slice(0, 9) + '00'
					}
				},
				deep: true
			},

		},
		mounted() {
			let index = parseInt(this.$route.params.id.toString());
			var copy = this;
			axios.post(copy.pub.url + '/pladmin/getPlAsId/' + index)
				.then(function(response) {

//					copy.data = response.data.data[0];
//					copy.data.ylData = response.data.data[1];
//					copy.data.detTime = response.data.data[2];
//					copy.data.recipe = copy.data.lotNumber.slice(0, 2);

					var allData='';
					allData = response.data.data[0];
					allData.ylData = response.data.data[1];
					allData.detTime = response.data.data[2];
					allData.recipe = allData.lotNumber.slice(0, 2);
					copy.data=allData;

				})
				.catch(function(error) {
					console.log(error);
				});
		},
		methods: {
			addpl() {
				let index = parseInt(this.$route.params.id.toString());
				var that = this;
				axios.post(that.pub.url + '/pladmin/editpl/'+index, that.data)
					.then(function(response) {
						if(response.data.head == 200) {
							that.$Message.success(response.data.message);
						} else {
							that.$Message.error(response.data.message);
						}
					})
					.catch(function(error) {});
			},
			changeTime(time) {
				var hour = parseInt(time.slice(0, 2)) * 60;
				var minute = parseInt(time.slice(3, 5));
				var all = hour + minute;
				for(var i = 0; i < this.data.detTime.length - 1; i++) {
					all = all + 30;
					var newhour = (Math.floor(all / 60)).toString().length < 2 ? "0" + (Math.floor(all / 60)).toString() : (Math.floor(all / 60)).toString();
					var newMinute = (all % 60).toString().length < 2 ? "0" + (all % 60).toString() : (all % 60).toString();
					if(newhour >= 24) {
						newhour = newhour - 24;
					} else {

					}
          console.log(newhour + ':' + newMinute)
					this.data.detTime[i + 1].detTime = newhour + ':' + newMinute;
				}
			},
			changePeople(data, arr) {
				for(var i = 0; i < data.length; i++) {
					data[i].value = arr[i];
					data[i].label = arr[i];
				}
			},
			getNumber() {
				if(this.data.formDate != '' && this.data.shift != '' && this.data.factory != '') {
					var attDate = this.data.formDate.split("-")
					var aa = attDate[0].slice(2, 4)
					if(this.data.restTankNumber != null) {
						var a = parseInt(this.data.restTankNumber)
						if(a > 1 && a < 10) {
							this.data.lotNumber = this.data.recipe + aa + attDate[1] + attDate[2] + this.data.shift + '0' + this.data.restTankNumber;
						} else {
							this.data.lotNumber = this.data.recipe + aa + attDate[1] + attDate[2] + this.data.shift + this.data.restTankNumber;
						}
					} else {
						this.data.lotNumber = this.data.recipe + aa + attDate[1] + attDate[2] + this.data.shift + '00';
					}
				}
			},
			gettime(begin, end) {
				var str = Date.parse(end) - Date.parse(begin);
				if(str !== "0" && str !== "" && str !== null) {

					//计算出相差天数
					var days = Math.floor(str / (24 * 3600 * 1000))

					//计算出小时数

					var leave1 = str % (24 * 3600 * 1000) //计算天数后剩余的毫秒数
					var hours = Math.floor(leave1 / (3600 * 1000))
					//计算相差分钟数
					var leave2 = leave1 % (3600 * 1000) //计算小时数后剩余的毫秒数
					var minutes = Math.floor(leave2 / (60 * 1000))
					return(days + "天 " + hours + "小时 " + minutes + " 分钟")

				}

			},
			nameChange(index) {
				var copy = this;
				axios.post(copy.pub.url + '/pladmin/getPlAsName/' + index)
					.then(function(response) {
						copy.data.ylData = response.data.data;
					})
					.catch(function(error) {});
			},
			addRow() {
				var row = this.data.rowData;
				this.data.ylData.push(row)
			},
		}

	}
</script>
<style>
	.intro {
		padding-top: 5px;
		font-size: 14px;
		font-weight: 600;
	}

	.top {
		margin: 15px 0;
	}
</style>
