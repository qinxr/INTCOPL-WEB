<template>
	<Row>
		<Card>
			<p slot="title" style="height: 25px;">PVC配料记录表（一）
				<Button type="success" size="small" style="margin-left: 20px; float: right;" @click="this.reload"><Icon type="md-refresh" />清空数据</Button>
				<Button type="primary" size="small" style="margin-left: 15px; float: right;" @click="addpl('data')">保存提交</Button>
				<Select v-model="data.recipe" size="small" style="width:100px; float: right;">
					<i-option v-for="item in recipe" :value="item.value" :key="item.value">{{ item.label }}</i-option>
				</Select>
			</p>
			<Card>
				<Form ref="data" :model="data" :rules="ruleValidate">
					<Row>
						<Col span="2" class="intro">日期:</Col>
						<Col span="5">
						<FormItem prop="formDate">
							<DatePicker type="date" @on-change="data.formDate=$event" :value="data.formDate" placeholder="日期" style="width: 100%"></DatePicker>
						</FormItem>
						</Col>
						<Col span="2" offset="1" class="intro">班次:</Col>
						<Col span="5">
						<FormItem prop="shift">
							<Select v-model="data.shift" :value="data.shift" style="width:100%">
								<i-option v-for="item in classes" :value="item.value" :key="item.value">{{ item.label }}</i-option>
							</Select>
						</FormItem>
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
						<FormItem prop="stirStartTime">
							<DatePicker :value="data.stirStartTime" type="datetime" format="yyyy-MM-dd HH:mm" @on-change="data.stirStartTime=$event" placeholder="Select time" style="width: 100%"></DatePicker>
						</FormItem>
						</Col>
						<Col span="3" offset="1" class="intro">结束搅拌时间:</Col>
						<Col span="4">
						<FormItem prop="stirEndTime">
							<DatePicker :value="data.stirEndTime" type="datetime" format="yyyy-MM-dd HH:mm" @on-change="data.stirEndTime=$event" placeholder="Select time" style="width: 100%"></DatePicker>
						</FormItem>
						</Col>
						<Col span="2" offset="1" class="intro">批号:</Col>
						<Col span="5">
						<Input v-model="data.lotNumber" disabled="" style="width: 100%" />
						</Col>
					</Row>
					<Row class="top">
						<Col span="3" class="intro">一次搅拌机号:</Col>
						<Col span="4">
						<FormItem prop="mixerNumber">
							<Select v-model="data.mixerNumber" style="width:100%">
								<i-option v-for="item in mixerNumber" :value="item.value" :key="item.value">{{ item.label }}</i-option>
							</Select>
						</FormItem>
						</Col>
						<Col span="5" offset="1" class="intro">搅拌机转速（转/分钟）:</Col>
						<Col span="2">
						<FormItem prop="rotateSpeed">
							<Input v-model="data.rotateSpeed" style="width: 100%" />
						</FormItem>
						</Col>
						<Col span="2" offset="1">
						<Select placeholder='配方选择' style="width:100%" v-model="data.yllist" @on-change="nameChange(data.yllist)">
							<i-option v-for="item in ylnamelist" :value="item.id" :key="item.id">{{ item.ylname }}</i-option>
						</Select>
						</Col>
						<Col span="2" offset="1">
						<Input v-model="data.ylname" style="width: 100%" />
						</Col>
						<Col span="2" class="intro">
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
						<FormItem prop="visDegree">
							<Input v-model="data.visDegree" style="width: 100%" />
						</FormItem>
						</Col>
						<Col span="2" offset="1" class="intro">细度（μm）:</Col>
						<Col span="2">
						<FormItem prop="finDegree">
							<Input v-model="data.finDegree" style="width: 100%" />
						</FormItem>
						</Col>
						<Col span="2" offset="1" class="intro">检验员:</Col>
						<Col span="2">
						<FormItem prop="inspectors">
							<Select v-model="data.inspectors" style="width:100%">
								<i-option v-for="item in inspectors" :value="item.value" :key="item.value">{{ item.label }}</i-option>
							</Select>
						</FormItem>
						</Col>
					</Row>
				</Form>
				<Card>
					<p slot="title">搅拌温度记录（1次/30分钟）</p>

					<Row class="top">
						<table style="width:100%;text-align: center;" border="1" cellpadding="0" cellspacing="0">
							<tr>
								<td style="width:13%;">检测时间:</td>
								<td v-for='item in data.detTime'>
									<TimePicker confirm :value="item.dettime" format="HH:mm" @on-change="item.dettime=$event" placeholder="Select time" style="width: 100%"></TimePicker>
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
						<DatePicker type="datetime" format="yyyy-MM-dd HH:mm" :value="data.restStartTime" @on-change="data.restStartTime=$event" placeholder="Select time" style="width: 100%"></DatePicker>
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
						<DatePicker type="datetime" format="yyyy-MM-dd HH:mm" :value="data.restEndTime" @on-change="data.restEndTime=$event" placeholder="结束静置时间" style="width: 100%"></DatePicker>
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
	import axios from "axios";

	export default {

		name: 'plinfoAdd3',
		inject: ['reload'],
		data() {
			return {

				data: {
					recipe: '01',
					formDate: '', //日期
					shift: '', //班次
					factory: '3', //厂区
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
					ylname: '', //配料配方名称
					yllist: '',
					ylData: [{
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
					},  {
						dettime: '',
						detTemperature: ''
					},],
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
					tolCount: [], //暂存投放数量
					reviewman: '', //用于更改审核人信息
				},
				ruleValidate: {
					formDate: [{
						required: true,
						message: '日期不能为空',
						trigger: 'change'
					}],
					shift: [{
						required: true,
						message: '班次不能为空',
						trigger: 'change'
					}, ],
					stirStartTime: [{
						required: true,
						trigger: 'change'
					}],
					stirEndTime: [{
						required: true,
						trigger: 'change'
					}],
					mixerNumber: [{
						required: true,
						trigger: 'change'
					}],
					rotateSpeed: [{
						required: true,
						trigger: 'blur'
					}],
					visDegree: [{
						required: true,
						message: '粘度不能为空',
						trigger: 'blur'
					}],
					finDegree: [{
						required: true,
						message: '细度不能为空',
						trigger: 'blur'
					}]
				},
				columns: [{
						title: '原料名称',
						key: 'rawName',
						width: 150,
						render: (h, params) => {
							return h('Select', {
								props: {
									value: this.data.ylData[params.row._index].rawName
								},
								on: {
									'on-change': (event) => {
										this.data.ylData[params.row._index].rawName = event;

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
						width: 150,
						render: (h, params) => {
							return h('Date-picker', {
								props: {
									type: 'datetime',
									format: "yyyy-MM-dd HH:mm",
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
						width: 150,
						render: (h, params) => {
							return h('Date-picker', {
								props: {
									type: 'datetime',
									format: "yyyy-MM-dd HH:mm",
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
										this.data.ylData[params.row._index].deliveryCount = event;
									},

								},
							}, );
						}

					},
					{
						title: '配料员',
						key: 'formulator',
						render: (h, params) => {
							if(parseInt(this.data.ylData[params.row._index].rawName) >= 9) {
								switch(this.data.shift) {
									case 'A':
										return h('Select', {
											props: {
												placeholder: '投粉工',
												value: this.data.ylData[params.row._index].formulator
											},
											on: {
												'on-change': (event) => {
													this.data.ylData[params.row._index].formulator = event
												}
											},
										}, [
											h('Option', {
												props: {
													value: '刁强德'
												}
											}, '刁强德'),
											h('Option', {
												props: {
													value: '翟乃田'
												}
											}, '翟乃田'),
                      h('Option', {
                      	props: {
                      		value: '姜兴海'
                      	}
                      }, '姜兴海'),
										]);
										break;
									case 'B':
										return h('Select', {
											props: {
												placeholder: '投粉工',
												value: this.data.ylData[params.row._index].formulator
											},
											on: {
												'on-change': (event) => {
													this.data.ylData[params.row._index].formulator = event
												}
											},
										}, [
											h('Option', {
												props: {
													value: '李勤文'
												}
											}, '李勤文'),
											h('Option', {
												props: {
													value: '姜兴海'
												}
											}, '姜兴海'),
											h('Option', {
												props: {
													value: '杨德彬'
												}
											}, '杨德彬'),
										]);
										break;
									case 'C':
										return h('Select', {
											props: {
												placeholder: '投粉工',
												value: this.data.ylData[params.row._index].formulator
											},
											on: {
												'on-change': (event) => {
													this.data.ylData[params.row._index].formulator = event
												}
											},
										}, [
											h('Option', {
												props: {
													value: '陈淑斌'
												}
											}, '陈淑斌'),
											h('Option', {
												props: {
													value: '李孝明'
												}
											}, '李孝明'),
                      h('Option', {
                      	props: {
                      		value: '姜兴海'
                      	}
                      }, '姜兴海'),
										]);
										break;
									default:
										break;
								}
							} else {
								switch(this.data.shift) {
									case 'A':
										return h('Select', {
											props: {
												placeholder: '配料员',
												value: this.data.ylData[params.row._index].formulator
											},
											on: {
												'on-change': (event) => {
													this.data.ylData[params.row._index].formulator = event
												}
											},
										}, [
											h('Option', {
												props: {
													value: '马文桂'
												}
											}, '马文桂'),
											h('Option', {
												props: {
													value: '刘长涛'
												}
											}, '刘长涛'),
											h('Option', {
												props: {
													value: '马超'
												}
											}, '马超'),
											h('Option', {
												props: {
													value: '聂培珍'
												}
											}, '聂培珍'),
										]);
										break;
									case 'B':
										return h('Select', {
											props: {
												placeholder: '配料员',
												value: this.data.ylData[params.row._index].formulator
											},
											on: {
												'on-change': (event) => {
													this.data.ylData[params.row._index].formulator = event
												}
											},
										}, [
											h('Option', {
												props: {
													value: '马华亭'
												}
											}, '马华亭'),
											h('Option', {
												props: {
													value: '张志昊'
												}
											}, '张志昊'),
											h('Option', {
												props: {
													value: '武浩'
												}
											}, '武浩'),
											h('Option', {
												props: {
													value: '杨远森'
												}
											}, '杨远森'),
										]);
										break;
									case 'C':
										return h('Select', {
											props: {
												placeholder: '配料员',
												value: this.data.ylData[params.row._index].formulator
											},
											on: {
												'on-change': (event) => {
													this.data.ylData[params.row._index].formulator = event
												}
											},
										}, [
											h('Option', {
												props: {
													value: '李星晓'
												}
											}, '李星晓'),
											h('Option', {
												props: {
													value: '刁玉朕'
												}
											}, '刁玉朕'),
											h('Option', {
												props: {
													value: '任永涛'
												}
											}, '任永涛'),
											h('Option', {
												props: {
													value: '武毅'
												}
											}, '武毅'),
										]);
										break;
									default:
									return h('Select', {
											props: {
												placeholder: '未选择班次',
												value: this.data.ylData[params.row._index].formulator
											},
											on: {
												'on-change': (event) => {
													this.data.ylData[params.row._index].formulator = event
												}
											},
										}, [
										]);
										break;
								}
							}

						},
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
				factory: [
					{
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
          {
          	value: '4',
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
					{
						value: '4',
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
					{
						value: '4',
						label: ''
					},

				],
				ylnamelist: [],
			}
		},

		watch: {
			//监测原料数据计算投放总量
			'data.ylData': {
				handler(newVal, oldVal) {

					var a = this.data.ylData.length;
					this.data.tolCount = [];
					for(var i = 0; i < a; i++) {
						if(this.data.ylData[i].deliveryCount != '') {

							this.data.tolCount.push(parseFloat(this.data.ylData[i].deliveryCount))
						}
					}
					console.log(this.data.tolCount)
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
					this.changeTime(this.data.detTime[0].dettime);
          this.data.restStartTime = this.data.formDate + ' ' + this.data.detTime[7].detTime;
          this.data.restTemperature =  this.data.detTime[7].detTemperature;
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
							this.data.reviewman = '马文桂';
							var a = ['马文桂','刘长涛', '马超', '聂培珍'];
							this.changePeople(this.operator, a);
							this.changePeople(this.inspectors, a);
							break;
						case 'B':
							this.data.reviewman = '马华亭';
							var b = ['马华亭','张志昊', '武浩', '杨远森'];
							this.changePeople(this.operator, b);
							this.changePeople(this.inspectors, b);
							break;
						case 'C':
							this.data.reviewman = '李星晓';
							var c = ['李星晓','刁玉朕', '任永涛', '武毅'];
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
							var a = ['马文桂','刘长涛', '马超', '聂培珍'];
							this.changePeople(this.operator2, a);
							break;
						case 'B':
							var b = ['马华亭','张志昊', '武浩', '杨远森'];
							this.changePeople(this.operator2, b);
							break;
						case 'C':
							var c = ['李星晓','刁玉朕', '任永涛', '武毅'];
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
					this.getNumber()
				},
				deep: true
			},

		},
		mounted() {
			var copy = this;
			axios.get(copy.pub.url + '/pladmin/getPlnames/3')
				.then(function(response) {
					if(response.data.head == 200) {
						copy.ylnamelist = response.data.data;
						//									console.log(response.data.data);

					} else {
						that.$Message.error(response.data.message);
					}
				})
				.catch(function(error) {});
		},
		methods: {
			addpl(data) {
				this.$refs[data].validate((valid) => {
					if(valid) {
						var that = this;
						axios.post(that.pub.url + '/pladmin/addPlInfo', that.data)
							.then(function(response) {
								if(response.data.head == 200) {
									that.$Message.success(response.data.message);
                  // that.data.formDate= '';
                  // that.data.shift= '';
                  // that.data.stirStartTime= '';
                  // that.data.stirEndTime= '';
                  // that.data.mixerNumber= '';
                  // that.data.totalTime= '';
                  // that.data.visDegree= '';
                  // that.data.finDegree= '';
                  // that.data.inspectors= '';
                  that.reload();
								} else {
									that.$Message.error(response.data.message);
								}
							})
							.catch(function(error) {});
					} else {
						this.$Message.error('请填写必要信息!');
					}
				})

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
					this.data.detTime[i + 1].dettime = newhour + ':' + newMinute;
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
					if(this.data.restTankNumber != '') {
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
				console.log(index)
				var copy = this;
				axios.post(copy.pub.url + '/pladmin/getPlAsName/' + index)
					.then(function(response) {
						copy.data.ylData = response.data.data;
						console.log(response.data)
					})
					.catch(function(error) {});
			},
			addRow() {
				this.data.ylData.push({
						rawName: '',
						lotNumber: '',
						startTime: '',
						endTime: '',
						deliveryCount: '',
						formulator: '',
						reviewer: '',
					});
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
