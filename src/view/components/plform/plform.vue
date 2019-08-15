<template>


	<tr span="23"	>
		<td style="width:20%;">
			<Select v-model="data.classes" style="width:100%">
				<i-option v-for="item in classes" :value="item.value" :key="item.value">{{ item.label }}</i-option>
			</Select>
		</td>
		<td style="width:20%;">
			<Input v-model="data.rotate_speed" style="width: 100%" />
		</td>
		<td style="width:15%;">
			<TimePicker :value="data.date1" format="HH点mm分ss秒" placeholder="请选择开始时间" style="width: 100%"></TimePicker>
		</td>
		<td style="width:15%;">
			<TimePicker :value="data.date2" format="HH点mm分ss秒" placeholder="请选择结束时间" style="width: 100%"></TimePicker>
		</td>
		<td style="width:10%;">
			<Input v-model="data.rotate_speed" style="width: 100%" />
		</td>
		<td style="width:10%;">
			<Select v-model="data.classes" style="width:100%">
				<i-option v-for="item in classes" :value="item.value" :key="item.value">{{ item.label }}</i-option>
			</Select>
		</td>
		<td style="width:10%;">
			<!--<Select v-model="data.classes" style="width:100%">
				<i-option v-for="item in classes" :value="item.value" :key="item.value">{{ item.label }}</i-option>
			</Select>-->
			<button @click="dede()">输出</button>
		</td>
	</tr>


</template>
<script>
	export default {
		name: 'Plform',
		props:{
			index:'0'
		},
		data() {
			return {
				data: {
					date1: '',
					date2: '',
					num: '',
					classes: '',
					description: '',
					rotate_speed: 1100,
				},
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

			}
		},
		methods: {
			dede(){
//				console.log(this.data.date1)
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