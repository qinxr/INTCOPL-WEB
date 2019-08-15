<template>
	<Row>
		<Card>
			<p slot="title" style="height: 25px;">PVC配料记录表（一） 
				<Button type="success" size="small" style="margin-left: 20px; float: right;" @click="this.reload"><Icon type="md-refresh" />清空数据</Button>
				<Button type="primary" size="small" style="margin-left: 15px; float: right;" @click="addpl()">保存提交</Button>
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
					<TimePicker :value="data.stirStartTime" format="HH:mm" @on-change="data.stirStartTime=$event" placeholder="Select time" style="width: 100%"></TimePicker>
					</Col>
					<Col span="3" offset="1" class="intro">结束搅拌时间:</Col>
					<Col span="4">
					<TimePicker :value="data.stirEndTime" format="HH:mm" @on-change="data.stirEndTime=$event" placeholder="Select time" style="width: 100%"></TimePicker>
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
					<Col span="2" offset="1"  class="intro">细度（μm）:</Col>
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
									<TimePicker confirm  :value="item.dettime" format="HH:mm" @on-change="item.dettime=$event" @on-ok='autoTime(item.dettime)' placeholder="Select time" style="width: 100%"></TimePicker>
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
						<TimePicker :value="data.restStartTime" @on-change="data.restStartTime=$event" format="HH:mm" placeholder="Select time" style="width: 100%"></TimePicker>
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
						<TimePicker :value="data.restEndTime" @on-change="data.restEndTime=$event" format="HH:mm" placeholder="Select time" style="width: 100%"></TimePicker>
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
							<i-option v-for="item in operator" :value="item.value" :key="item.value">{{ item.label }}</i-option>
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
		
		name: 'level_2_2_1',
		inject: ['reload'],
		data() {
			return {

				data: {
					formDate: '', //日期
					shift: '', //班次
					factory: '', //厂区
					stirStartTime: '', //搅拌开始时间
					stirEndTime: '', //搅拌结束时间
					lotNumber: '', //批号
					mixerNumber: '', //一次搅拌机号
					rotateSpeed: 1100, //搅拌机转速
					totalCount: '', //投放总量
					totalTime: '', //搅拌总时长
					visDegree: '', //粘度
					finDegree: '', //细度
					inspectors: '', //检验员
					ylData: [{
						rawName: '5',
						lotNumber: '',
						startTime: '',
						endTime: '',
						deliveryCount: '',
						formulator: '',
						reviewer: '',
					}, {
						rawName: '',
						lotNumber: '',
						startTime: '',
						endTime: '',
						deliveryCount: '',
						formulator: '',
						reviewer: '',
					}, {
						rawName: '',
						lotNumber: '',
						startTime: '',
						endTime: '',
						deliveryCount: '',
						formulator: '',
						reviewer: '',
					}, {
						rawName: '',
						lotNumber: '',
						startTime: '',
						endTime: '',
						deliveryCount: '',
						formulator: '',
						reviewer: '',
					}, {
						rawName: '',
						lotNumber: '',
						startTime: '',
						endTime: '',
						deliveryCount: '',
						formulator: '',
						reviewer: '',
					}, {
						rawName: '',
						lotNumber: '',
						startTime: '',
						endTime: '',
						deliveryCount: '',
						formulator: '',
						reviewer: '',
					}, {
						rawName: '',
						lotNumber: '',
						startTime: '',
						endTime: '',
						deliveryCount: '',
						formulator: '',
						reviewer: '',
					}, ],
					detTime: [{ //检测时间和检测温度
						dettime: '',
						detTemperature: ''
					}, {
						dettime: '',
						detTemperature: ''
					}, {
						dettime: '',
						detTemperature: ''
					}, {
						dettime: '',
						detTemperature: ''
					}, {
						dettime: '',
						detTemperature: ''
					}, {
						dettime: '',
						detTemperature: ''
					}, {
						dettime: '',
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
								}, 'PVC 粉（沈化）'),
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
										value: ''
									}
								}, '审核人1 '),
								h('Option', {
									props: {
										value: '2'
									}
								}, '审核人2 '),
								h('Option', {
									props: {
										value: '3'
									}
								}, '审核人3'),

							]);
						}

					}
				],
				classes: [{
						value: '1',
						label: 'A班'
					},
					{
						value: '2',
						label: 'B班'
					},
					{
						value: '3',
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
						label: '检验员1'
					},
					{
						value: '2',
						label: '检验员2'
					},

				],
				operator: [{
						value: '1',
						label: '操作员1'
					},
					{
						value: '2',
						label: '操作员2'
					},

				],

			}
		},

		watch: {
			'data.shift': {
				handler(newVal, oldVal) {
					console.log('深度监听', newVal, oldVal)
				},
				deep: true
			}

		},
		mounted() {
				var copy = this;
				axios.get(copy.pub.url + '/pladmin/getPlInfos')
					.then(function(response) {

						console.log(response)

					})
					.catch(function(error) {
						console.log(error);
					});
		},
		methods: {
			addpl(){
				var that = this;
				axios.post(that.pub.url + '/pladmin/addPlInfo', that.data)
					.then(function(response) {
						if(response.data.head == 200) {
							that.$Message.success(response.data.message);
						} else {
							that.$Message.error(response.data.message);
						}
					})
					.catch(function(error) {});
			},
			conso() {
				console.log(this.data)
			},
			autoTime(event){
				console.log(event);
				console.log(event+30)
			}
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