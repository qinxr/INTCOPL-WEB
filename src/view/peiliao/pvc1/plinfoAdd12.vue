<template>
	<Row>
		<Card>
			<p slot="title" style="height: 25px;">配料流程记录表（二）
				<Button type="success" size="small" style="margin-left: 20px; float: right;" @click="this.reload"><Icon type="md-refresh" />清空数据</Button>
				<Button type="primary" size="small" style="margin-left: 15px; float: right;" @click="addpl('data')">保存提交</Button>
				<Select v-model="data.recipe" size="small" style="width:100px; float: right;">
					<i-option v-for="item in recipe" :value="item.value" :key="item.value">{{ item.label }}</i-option>
				</Select>
				<Select v-model="data.shift" size="small" style="width:100px; float: right;">
					<i-option v-for="item in classes" :value="item.value" :key="item.value">{{ item.label }}</i-option>
				</Select>
        <span  class="intro" style="float: right;" >班次:&nbsp;&nbsp;&nbsp;</span>
			</p>
			<Form ref="data" :model="data" :rules="ruleValidate">
				<Row>
					<Col span="2" class="intro">日期:</Col>
					<Col span="3">
					<FormItem prop="formDate">
						<DatePicker type="date" @on-change="data.formDate=$event" :value="data.formDate" placeholder="日期" style="width: 100%"></DatePicker>
					</FormItem>
					</Col>
					<Col span="2" offset="1" class="intro">批号:</Col>
					<Col span="3">
					<Input v-model="data.lotNumber" disabled="" style="width: 100%" />
					</Col>
					<Col span="2" offset="1" class="intro">搅拌机号:</Col>
					<Col span="3">
					<FormItem prop="mixerNumber">
						<Input v-model="data.mixerNumber" style="width: 100%" />
					</FormItem>
					</Col>
					<Col span="2" offset="1" class="intro">检验员:</Col>
					<Col span="3">
					<FormItem prop="formulator">
						<Select v-model="data.formulator" style="width:100%">
							<i-option v-for="item in inspectors" :value="item.value" :key="item.value">{{ item.label }}</i-option>
						</Select>
					</FormItem>
					</Col>
				</Row>
				<Row class="top">

					<Col span="2" class="intro">投放总量（kg):</Col>
					<Col span="5">
					<Input v-model="data.totalCount" style="width: 100%" />
					</Col>
					<Col span="5" offset="1" class="intro">搅拌机转速（转/分钟）:</Col>
					<Col span="2">
					<FormItem prop="rotateSpeed">
						<Input v-model="data.rotateSpeed" style="width: 100%" />
					</FormItem>
					</Col>
					<Col span="2" class="intro" offset="1">合计静置时间:</Col>
					<Col span="5">
					<Input v-model="data.totalTime" style="width: 100%" />
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
					<Col span="4" class="intro" offset="1">调整前混合料粘度:</Col>
					<Col span="3">
					<Input v-model="data.startCps" style="width: 100%" />
					</Col>

				</Row>

				<Row class="top">
					<Table :columns="columns" :data="data.ylData" style="overflow: inherit;"></Table>
				</Row>
				<Row class="top">
					<Col span="2" class="intro">调整后粘度:</Col>
					<Col span="2">
					<Input v-model="data.endCps" style="width: 100%" />
					</Col>
					<Col span="2" offset="1" class="intro">{{data.cpsFlag}}</Col>
					<Col span="2" offset="1" class="intro">检验员:</Col>
					<Col span="4">
					<Select v-model="data.cpsInspector" style="width:100%">
						<i-option v-for="item in inspectors" :value="item.value" :key="item.value">{{ item.label }}</i-option>
					</Select>
					</Col>
					<Col span="2" offset="1" class="intro">带班长:</Col>
					<Col span="4">
					<Select v-model="data.cpsReviewer" style="width:100%">
						<i-option v-for="item in operator" :value="item.value" :key="item.value">{{ item.label }}</i-option>
					</Select>
					</Col>
					<Col span="2" offset="1" class="intro">
					<Button type="primary" size="small" @click="addRow('data')"><Icon type="md-add" />新增行</Button>
					</Col>
				</Row>
			</Form>

			<Card>
				<p slot="title">过滤</p>
				<Row>
					<Col span="2" class="intro">过滤网目数:</Col>

					<Col span="2" offset="2" class="intro">一层:</Col>
					<Col span="3">
					<Select v-model="data.filtration1" style="width:100%">
						<i-option v-for="item in filtration" :value="item.value" :key="item.value">{{ item.label }}</i-option>
					</Select>
					</Col>
					<Col span="2" offset="2" class="intro">二层:</Col>
					<Col span="3">
					<Select v-model="data.filtration2" style="width:100%">
						<i-option v-for="item in filtration" :value="item.value" :key="item.value">{{ item.label }}</i-option>
					</Select>
					</Col>
					<Col span="2" offset="2" class="intro">三层:</Col>
					<Col span="3">
					<Select v-model="data.filtration3" style="width:100%">
						<i-option v-for="item in filtration" :value="item.value" :key="item.value">{{ item.label }}</i-option>
					</Select>
					</Col>
				</Row>
				<Row class="top">
					<Col span="2" class="intro">过滤开始时间:</Col>
					<Col span="3">
					<DatePicker :value="data.filStartTime" type="datetime" format="yyyy-MM-dd HH:mm" @on-change="data.filStartTime=$event" placeholder="Select time" style="width: 100%"></DatePicker>
					</Col>
					<Col span="2" offset="1" class="intro">过滤结束时间:</Col>
					<Col span="3">
					<DatePicker :value="data.filEndTime" type="datetime" format="yyyy-MM-dd HH:mm" @on-change="data.filEndTime=$event" placeholder="Select time" style="width: 100%"></DatePicker>
					</Col>
					<Col span="2" offset="1" class="intro">操作人员:</Col>
					<Col span="3">
					<Select v-model="data.filOperator" style="width:100%">
						<i-option v-for="item in inspectors" :value="item.value" :key="item.value">{{ item.label }}</i-option>
					</Select>
					</Col>
					<Col span="2" offset="1" class="intro">检查人员:</Col>
					<Col span="3">
					<Select v-model="data.filInspector" style="width:100%">
						<i-option v-for="item in operator" :value="item.value" :key="item.value">{{ item.label }}</i-option>
					</Select>
					</Col>

				</Row>

			</Card>
			<Card>
				<p slot="title">真空脱泡
					<!--<Button type="primary" size="small" style="margin-left: 15px; float: right;" @click="addRow('data')"><Icon type="md-add" />新增行</Button>-->
				</p>
				<Row class="top">
					<Table :columns="columns2" :data="data.vacData" style="overflow: inherit;"></Table>
				</Row>
				<Row class="top">
					<Col span="2" class="intro">入料时间:</Col>
					<Col span="3">
					<DatePicker :value="data.inputTime" type="datetime" format="yyyy-MM-dd HH:mm" @on-change="data.inputTime=$event" placeholder="Select time" style="width: 100%"></DatePicker>
					</Col>
					<Col span="2" offset="1" class="intro">带班长:</Col>
					<Col span="4">
					<Select v-model="data.vacReviewer" style="width:100%">
						<i-option v-for="item in operator" :value="item.value" :key="item.value">{{ item.label }}</i-option>
					</Select>
					</Col>
				</Row>

			</Card>
			<Card>
				<p slot="title">放料

				</p>
				<Row>
					<Col span="2" class="intro">放料罐号:</Col>
					<Col span="3">
					<Input v-model="data.outputNumber" style="width: 100%" />
					</Col>
					<Col span="2" offset="1" class="intro">输入生产线:</Col>
					<Col span="3">
					<Input v-model="data.outputLine" style="width: 100%" />
					</Col>
					<!-- <Col span="2" offset="1" class="intro">排污人员:</Col>
					<Col span="3">
					<Select v-model="data.polOperator" style="width:100%">
						<i-option v-for="item in inspectors" :value="item.value" :key="item.value">{{ item.label }}</i-option>
					</Select>
					</Col>
					<Col span="2" offset="1" class="intro">排污时间:</Col>
					<Col span="3">
					<DatePicker :value="data.polTime" type="datetime" format="yyyy-MM-dd HH:mm" @on-change="data.polTime=$event" placeholder="Select time" style="width: 100%"></DatePicker>
					</Col> -->
          <Col span="2" offset="1" class="intro">高低料:</Col>
          <Col span="2" offset="1" class="intro">{{data.cpsFlag}}</Col>
          <Col span="2" offset="1" class="intro">带班长:</Col>
          <Col span="4">
          <Select v-model="data.outputReviewer" style="width:100%">
          	<i-option v-for="item in operator" :value="item.value" :key="item.value">{{ item.label }}</i-option>
          </Select>
          </Col>
				</Row>
				<Row class="top">
					<Col span="2" class="intro">输入开始时间:</Col>
					<Col span="3">
					<DatePicker :value="data.outputStartTime" type="datetime" format="yyyy-MM-dd HH:mm" @on-change="data.outputStartTime=$event" placeholder="Select time" style="width: 100%"></DatePicker>
					</Col>
					<Col span="2" offset="1" class="intro">放料员:</Col>
					<Col span="3">
					<Select v-model="data.startOperator" style="width:100%">
						<i-option v-for="item in inspectors" :value="item.value" :key="item.value">{{ item.label }}</i-option>
					</Select>
					</Col>
					<Col span="2" offset="1" class="intro">输入结束时间:</Col>
					<Col span="3">
					<DatePicker :value="data.outputEndTime" type="datetime" format="yyyy-MM-dd HH:mm" @on-change="data.outputEndTime=$event" placeholder="Select time" style="width: 100%"></DatePicker>
					</Col>
					<Col span="2" offset="1" class="intro">放料员:</Col>
					<Col span="3">
					<Select v-model="data.endOperator" style="width:100%">
						<i-option v-for="item in inspectors" :value="item.value" :key="item.value">{{ item.label }}</i-option>
					</Select>
					</Col>
				</Row>
				<!-- <Row class="top">
					<Col span="2" class="intro">检验员:</Col>
					<Col span="3">
					<Select v-model="data.outputInspector" style="width:100%">
						<i-option v-for="item in inspectors" :value="item.value" :key="item.value">{{ item.label }}</i-option>
					</Select>
					</Col>
					<Col span="2" offset="1" class="intro">
					<Select v-model="data.outputFlag" style="width:100%" placeholder="高低料">
						<i-option v-for="item in flag" :value="item.value" :key="item.value">{{ item.label }}</i-option>
					</Select>
					</Col>
          <Col span="2" offset="1" class="intro">{{data.cpsFlag}}</Col>
					<Col span="2" offset="2" class="intro">带班长:</Col>
					<Col span="4">
					<Select v-model="data.outputReviewer" style="width:100%">
						<i-option v-for="item in operator" :value="item.value" :key="item.value">{{ item.label }}</i-option>
					</Select>
					</Col>
				</Row> -->

			</Card>
		</Card>
	</Row>
</template>
<script>
	import axios from "axios";

	export default {

		name: 'plinfoAdd1',
		inject: ['reload'],
		data() {
			return {

				data: {
          uuid:'',
					recipe: '01',
					shift: '', //班次
					factory: '1', //厂区
					formDate: '', //日期
					lotNumber: '', //批号
					mixerNumber: '', //搅拌机号
					formulator: '', //配料员
					totalCount: '', //混合料重量
					rotateSpeed: '900', //搅拌机转速
					totalTime: '', //新料静置时间
					stirStartTime: '', //搅拌开始时间
					stirEndTime: '', //搅拌结束时间
					startCps: '', //调整前粘度
					ylData: [{
							rawName: '一次料',
							lotNumber: '',
							deliveryCount: '',
							startTime: '',
							endTime: '',
							description: '',
						},
						{
							rawName: '一次料',
							lotNumber: '',
							deliveryCount: '',
							startTime: '',
							endTime: '',
							description: '',
						},
						{
							rawName: '回收料',
							lotNumber: '',
							deliveryCount: '',
							startTime: '',
							endTime: '',
							description: '',
						},
						{
							rawName: '降粘剂',
							lotNumber: '',
							deliveryCount: '',
							startTime: '',
							endTime: '',
							description: '',
						},
						{
							rawName: '降粘剂',
							lotNumber: '',
							deliveryCount: '',
							startTime: '',
							endTime: '',
							description: '',
						},
					],
					endCps: '', //调整后粘度
					cpsFlag: '', //高低料
					cpsInspector: '', //检验员
					cpsReviewer: '', //带班长
					yllist: '',
					filtration1: '150', //过滤网一层
					filtration2: '180', //过滤网二层
					filtration3: '200', //过滤网三层
					filStartTime: '', //开始过滤时间
					filEndTime: '', //结束过滤时间
					filOperator: '', //操作员
					filInspector: '', //检查人员
					tolCount: '', //暂存数量
					bufferNumber: '', //缓冲罐号
					secFilNumber: '', //俄日此过滤罐号
					secFiltration1: '150', //二次过滤一层
					secFiltration2: '180', //二次过滤二层
					secFiltration3: '200', //二次过滤三层
					secFilStartTime: '', //二次过滤开始时间
					secFilEndTime: '', //二次过滤结束时间
					vacData: [{
						vacuumNumber: '',
						vacuumCount: '1',
						vacStartTime: '',
						vacEndTime: '',
						vacuumMpa: '90',
						vacOperator: '',
					}, ],
					inputTime: '', //入料时间
					vacReviewer: '', //带班长
					outputNumber: '', //放料罐号
					polOperator: '', //排污人员
					polTime: '', //排污时间
					outputLine: '', //输入生产线
					outputStartTime: '', //输入开始时间
					startOperator: '', //开始放料员
					outputEndTime: '', //输入结束时间
					endOperator: '', //结束放料员
					outputInspector: '', //检验员
					outputFlag: '', //高低料
					outputReviewer: '', //带班长

				},
				flag: [{
						value: '高料',
						label: '高料'
					},
					{
						value: '低料',
						label: '低料'
					},
				],
				filtration: [{
						value: '150',
						label: '150'
					},
					{
						value: '180',
						label: '180'
					},
					{
						value: '200',
						label: '200'
					},
					{
						value: '220',
						label: '220'
					},
				],
				ruleValidate: {
					formDate: [{
						required: true,
						message: '日期不能为空',
						trigger: 'change'
					}],
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
					//					rotateSpeed: [{
					//						required: true,
					//						trigger: 'blur'
					//					}],

				},
				columns2: [{
						title: '真空罐号',
						key: 'vacuumNumber',
						width: 150,
						render: (h, params) => {
							return h('Input', {
								props: {
									align: 'center',
									value: this.data.vacData[params.row._index].vacuumNumber
								},
								on: {
									input: (event) => {
										this.data.vacData[params.row._index].vacuumNumber = event
									}
								},
							}, );
						}
					},
					{
						title: '抽真空次数',
						key: 'vacuumCount',
						width: 150,
						render: (h, params) => {
							return h('Input', {
								props: {
									value: this.data.vacData[params.row._index].vacuumCount
								},
								on: {
									input: (event) => {
										this.data.vacData[params.row._index].vacuumCount = event
									}
								},
							}, );
						}
					},

					{
						title: '加料开始时间',
						key: 'vacStartTime',
						render: (h, params) => {
							return h('Date-picker', {
								props: {
									type: 'datetime',
									format: "yyyy-MM-dd HH:mm",
									placeholder: '投放时间',
									value: this.data.vacData[params.row._index].vacStartTime
								},
								on: {
									'on-change': (event) => {
										this.data.vacData[params.row._index].vacStartTime = event
									}
								},
							}, );
						}
					},
					{
						title: '加料结束时间',
						key: 'vacEndTime',
						render: (h, params) => {
							return h('Date-picker', {
								props: {
									type: 'datetime',
									format: "yyyy-MM-dd HH:mm",
									placeholder: '结束时间',
									value: this.data.vacData[params.row._index].vacEndTime
								},
								on: {
									'on-change': (event) => {
										this.data.vacData[params.row._index].vacEndTime = event
                    this.data.inputTime= event
									}
								},
							}, );
						}
					},
					{
						title: '真空度',
						key: 'vacuumMpa',
						width: 150,
						render: (h, params) => {
							return h('Input', {
								props: {
									value: this.data.vacData[params.row._index].vacuumMpa
								},
								on: {
									input: (event) => {
										this.data.vacData[params.row._index].vacuumMpa = event;
									},

								},
							}, );
						}

					},
					{
						title: '配料员',
						key: 'vacOperator',
						render: (h, params) => {
									return h('Select', {
										props: {
											placeholder: '配料员',
											value: this.data.vacData[params.row._index].vacOperator
										},
										on: {
											'on-change': (event) => {
												this.data.vacData[params.row._index].vacOperator = event
											}
										},
									}, [
										h('Option', {
										  props: {
										    value: '关庆森 '
										  }
										}, '关庆森 '),
										h('Option', {
										  props: {
										    value: '李海亮'
										  }
										}, '李海亮'),
										h('Option', {
										  props: {
										    value: '孟祥东'
										  }
										}, '孟祥东'),
										h('Option', {
										  props: {
										    value: '王明川'
										  }
										}, '王明川'),
										h('Option', {
										  props: {
										    value: '杜浩哲'
										  }
										}, '杜浩哲'),
										h('Option', {
										  props: {
										    value: '李全禄'
										  }
										}, '李全禄'),
										h('Option', {
										  props: {
										    value: '徐云山'
										  }
										}, '徐云山'),
										h('Option', {
										  props: {
										    value: '孟庆寅'
										  }
										}, '孟庆寅'),
										h('Option', {
										  props: {
										    value: '张立亮'
										  }
										}, '张立亮'),
										h('Option', {
										  props: {
										    value: '马际安'
										  }
										}, '马际安'),
									]);
							}

					},
				],
				columns: [{
						title: '原料名称',
						key: 'rawName',
						width: 150,
						render: (h, params) => {
							return h('Input', {
								props: {
									//									disabled:true,
									align: 'center',
									value: this.data.ylData[params.row._index].rawName
								},
								on: {
									input: (event) => {
										this.data.ylData[params.row._index].rawName = event
									}
								},
							}, );
						}
					},
					{
						title: '批号',
						key: 'lotNumber',
						width: 150,
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
						title: '加入量',
						key: 'deliveryCount',
						width: 150,
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
						title: '加料开始时间',
						key: 'startTime',
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
						title: '加料结束时间',
						key: 'endTime',
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
						title: '备注',
						key: 'description',
						render: (h, params) => {
							return h('Input', {
								props: {
									value: this.data.ylData[params.row._index].description
								},
								on: {
									input: (event) => {
										this.data.ylData[params.row._index].description = event
									}
								},
							}, );
						}
					},
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
					},
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
				    value: '关庆森',
				    label: '关庆森'
				  },
				  {
				    value: '李海亮',
				    label: '李海亮'
				  },
				  {
				    value: '孟祥东',
				    label: '孟祥东'
				  },
				  {
				    value: '王明川',
				    label: '王明川'
				  },{
				    value: '杜浩哲',
				    label: '杜浩哲'
				  },{
				    value: '李全禄',
				    label: '李全禄'
				  },{
				    value: '徐云山',
				    label: '徐云山'
				  },{
				    value: '孟庆寅',
				    label: '孟庆寅'
				  },{
				    value: '张立亮',
				    label: '张立亮'
				  },{
				    value: '马际安',
				    label: '马际安'
				  }

				],
				operator: [{
				    value: '关庆森',
				    label: '关庆森'
				  },
				  {
				    value: '王明川',
				    label: '王明川'
				  },
				  {
				    value: '徐云山',
				    label: '徐云山'
				  },

				],
				// operator2: [{
				// 		value: '1',
				// 		label: ''
				// 	},
				// 	{
				// 		value: '2',
				// 		label: ''
				// 	},
				// 	{
				// 		value: '3',
				// 		label: ''
				// 	},

				// ],
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
						if(this.data.ylData[i].deliveryCount !='') {

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
			//监测浓度显示高低料
			'data.endCps': {
				handler(newVal, oldVal) {
					var cpsnum = parseInt(this.data.endCps)
					if(cpsnum < 80) {
						this.data.cpsFlag = '低料'
					} else if(cpsnum > 150) {
						this.data.cpsFlag = '高料'
					} else {
						this.data.cpsFlag = '请输入正确数值';
					}
				},
				deep: true
			},
			//监测时间计算时间差
			//			'data.stirEndTime': {
			//				handler(newVal, oldVal) {
			//					this.data.totalTime = this.gettime(this.data.stirStartTime, this.data.stirEndTime);
			//				},
			//				deep: true
			//			},
			//			'data.restEndTime': {
			//				handler(newVal, oldVal) {
			//					this.data.restTotalTime = this.gettime(this.data.restStartTime, this.data.restEndTime);
			//				},
			//				deep: true
			//			},
			//监测日期，配方，班次
			'data.recipe': {
				handler(newVal, oldVal) {
					this.getNumber()
				},
				deep: true
			},
			'data.mixerNumber': {
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
			'data.vacData': {
				handler(newVal, oldVal) {
					this.getNumber()
				},
				deep: true
			},
			'data.shift': {
				handler(newVal, oldVal) {
					this.getNumber();

				},
				deep: true
			},

		},
		mounted() {
      this.data.uuid=(Math.random().toString().substr(3,5) + Date.now()).toString(36);
      console.log(this.data.uuid)
			if(this.$route.params.id) {

				let index = parseInt(this.$route.params.id.toString());
				var copy = this;
				axios.post(copy.pub.url + '/pladmin/getPlAsId/' + index)
					.then(function(response) {

						copy.data.totalTime = response.data.data[0].restTotalTime;
						copy.data.outputNumber = response.data.data[0].restTankNumber;

					})
					.catch(function(error) {
						console.log(error);
					});
			}
		},
		methods: {
			addpl(data) {
				this.$refs[data].validate((valid) => {
					if(valid) {
						var that = this;
						axios.post(that.pub.url + '/pladminSec/addPlInfo', that.data)
							.then(function(response) {
								if(response.data.head == 200) {
									that.$Message.success(response.data.message);
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
			changePeople(data, arr) {
				for(var i = 0; i < data.length; i++) {
					data[i].value = arr[i];
					data[i].label = arr[i];
				}
			},
			getNumber() {
				if(this.data.formDate != '' && this.data.shift != '' && this.data.mixerNumber != '' && this.data.vacData[0].vacuumNumber != '') {
					var attDate = this.data.formDate.split("-")
					var aa = attDate[0].slice(2, 4)
					var a = parseInt(this.data.vacData[0].vacuumNumber)
					if(a > 1 && a < 10) {
						this.data.lotNumber = 'C01' + aa + attDate[1] + attDate[2] + this.data.mixerNumber + this.data.shift + '00' + this.data.vacData[0].vacuumNumber;
					} else if(a >= 10 && a < 100) {
						this.data.lotNumber = 'C01' + aa + attDate[1] + attDate[2] + this.data.mixerNumber + this.data.shift + '0' + this.data.vacData[0].vacuumNumber;
					} else {
						this.data.lotNumber = 'C01' + aa + attDate[1] + attDate[2] + this.data.mixerNumber + this.data.shift + this.data.vacData[0].vacuumNumber;
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
					deliveryCount: '',
					startTime: '',
					endTime: '',
					description: '',
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
