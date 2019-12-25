<template>

  <Row>
    <Card dis-hover>
      <p slot="title" style="height: auto;">一次配料记录表概览
        <Button type="primary" size="small" style="margin-left: 15px;" @click="link()">新增记录表</Button>
        <Button type="success" size="small" style="margin-left: 20px; float: right;" @click="this.reload">
          <Icon type="md-refresh" />刷新</Button>
        <Button type="primary" size="small" style="margin-left: 20px; float: right;" @click="this.getData">倒序排列
          <Icon type="md-arrow-round-down" /></Button>
        <Button type="primary" size="small" style="margin-left: 20px; float: right;" @click="this.getDataAsc">正序排列
          <Icon type="md-arrow-round-up" /></Button>
      </p>

      <div class="edittable-table-height-con">
        <Row>
          <!--<span style="float: left;"><Button type="primary" size="large" @click="exportExcel()"><Icon type="md-download" />导出表格</Button></span>-->
          <span style="float: right;"><Input v-model="searchConName1" icon="search" @on-change="handleSearch1"
              placeholder="请输入批号搜索..." style="width: 200px" /></span>
        </Row>
        <Row>
          &nbsp;
        </Row>
        <Table border stripe :columns="columns" v-model="plData" :data="plData"></Table>
      </div>
      <div style="padding: 20px;overflow: hidden">
        <div style="float: right;">
          <Page :page-size="pageSize" :total="dataCount" :current="1" @on-change="changePage" show-elevator></Page>
        </div>
      </div>
      <Modal v-model="ModalBool" width="360">
        <p slot="header" style="color:#f60;text-align:center">
          <Icon type="information-circled"></Icon>
          <span>删除确认</span>
        </p>
        <div style="text-align:center">
          <p>
            <h1>确定删除?</h1>
          </p>
        </div>
        <div slot="footer">
          <Button type="error" size="large" long @click="remove()">删除</Button>
        </div>
      </Modal>
    </Card>
  </Row>

</template>
<script>
  import axios from 'axios'
  import excel from '@/libs/excel'

  export default {
    name: 'plinfo2',
    inject: ['reload'],
    data() {
      return {
        pageSize: 10, // 每页显示的数据量
        dataCount: 0, // 初始化总数据量
        historyData: [], // 存所有数据
        plData: [],
        plId: '',
        ModalBool: false,
        searchConName1: '',
        columns: [{
            title: 'ID',
            key: 'id',
            width: 100
          },
          {
            title: '厂区',
            key: 'factory',
            render: (h, params) => {
              return h('div', [
                params.row.factory == 2 ? 'PVC二厂' : ' '
              ])
            }
          },
          {
            title: '日期',
            key: 'formDate',
            sortable: true
          },
          {
            title: '班次',
            key: 'shift'
            // render: (h, params) => {
            // 	return h('div', [
            // 		params.row.shift == 1 ? "A班" :params.row.shift == 2 ?"B班" :'C班'
            // 	]);
            // }
          },
          {
            title: '搅拌开始时间',
            key: 'stirStartTime',
            sortable: true
          },
          {
            title: '搅拌结束时间',
            key: 'stirEndTime',
            sortable: true
          },
          {
            title: '批号',
            key: '',
            render: (h, params) => {
              return h('div', [
                h('span', {
                  style: {
                    color: params.row.restTankNumber?'green':'blue'
                  }
                }, params.row.lotNumber),
              ]);
            }
          },
          {
            title: '操作',
            key: 'action',
            width: 150,
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      let argu = {
                        id: params.row.id
                      }
                      this.$router.push({
                        name: 'plinfoEdit2',
                        params: argu
                      })
                    }
                  }
                }, '更改'),
                h('Button', {
                  props: {
                    type: params.row.restEndTime == null ? 'success' : 'error',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      let argu = {
                        id: params.row.id
                      }
                      this.$router.push({
                        name: 'plinfoAdd22',
                        params: argu
                      })
                    }
                  }
                }, '二次配料')
              ])
            }
          }
        ],
        data: [

        ]
      }
    },
    mounted() {
      sessionStorage.setItem('page', '1')
      this.getData()
    },
    methods: {
      getData() {
        var copy = this
        axios.get(copy.pub.url + '/pladmin/getPlInfos/2')
          .then(function(response) {
            copy.historyData = response.data.data

            copy.dataCount = copy.historyData.length
            // 初始化显示，小于每页显示条数，全显，大于每页显示条数，取前每页条数显示
            if (copy.historyData.length < copy.pageSize) {
              copy.plData = copy.historyData
            } else {
              copy.plData = copy.historyData.slice(0, copy.pageSize)
            }
            if (sessionStorage.getItem('page')) {
              var a = sessionStorage.getItem('page')
              copy.changePage(a)
            } else {

            }
          })
          .catch(function(error) {
            console.log(error)
          })
      },
      getDataAsc() {
        var copy = this
        axios.get(copy.pub.url + '/pladmin/getPlInfosAsc/2')
          .then(function(response) {
            copy.historyData = response.data.data

            copy.dataCount = copy.historyData.length
            // 初始化显示，小于每页显示条数，全显，大于每页显示条数，取前每页条数显示
            if (copy.historyData.length < copy.pageSize) {
              copy.plData = copy.historyData
            } else {
              copy.plData = copy.historyData.slice(0, copy.pageSize)
            }
            if (sessionStorage.getItem('page')) {
              var a = sessionStorage.getItem('page')
              copy.changePage(a)
            } else {

            }
          })
          .catch(function(error) {
            console.log(error)
          })
      },
      link() {
        this.$router.push({
          name: 'plinfoAdd2'
        })
      },
      // 导出数据xls格式
      exportExcel() {
        if (this.historyData.length) {
          this.exportLoading = true
          const params = {
            title: ['ID', '编号', '型号', '参数', '序列号', '状态', '备注'],
            key: ['id', 'num', 'pad_type', 'pad_detail', 'pad_num', 'pad_state', 'description'],
            data: this.historyData,
            autoWidth: true,
            filename: 'IPAD库存明细'
          }
          excel.export_array_to_excel(params)
          this.exportLoading = false
        } else {
          this.$Message.info('表格数据不能为空！')
        }
      },
      remove() {
        var copy = this
        axios.post(copy.pub.url + '/pad/deletePad', {
            delete_id: copy.plId
          })
          .then(function(response) {
            if (response.data.head == 200) {
              copy.getData()
              copy.$Message.success(response.data.message)
              copy.ModalBool = false
              copy.plId = ''
            } else {
              copy.$Message.error(response.data.message)
            }
          })
          .catch(function(error) {})
      },
      // 搜索触发函数
      handleSearch1() {
        if (this.searchConName1 == '') {
          this.plData = this.historyData.slice(0, this.pageSize)
        } else {
          this.plData = this.historyData
          this.plData = this.search(this.plData, {
            lotNumber: this.searchConName1
          })
        }
      },
      // 搜索功能函数
      search(data, argumentObj) {
        let res = data
        let dataClone = data
        for (let argu in argumentObj) {
          if (argumentObj[argu].length > 0) {
            res = dataClone.filter(d => {
              return d[argu].indexOf(argumentObj[argu]) > -1
            })
            dataClone = res
          }
        }
        return res
      },
      // 分页功能
      changePage(index) {
        sessionStorage.setItem('page', index)
        // The simulated data is changed directly here, and the actual usage scenario should fetch the data from the server
        var _start = (index - 1) * this.pageSize
        var _end = index * this.pageSize
        this.plData = this.historyData.slice(_start, _end)
      }
    }
  }
</script>
<style lang="less">
  .ivu-table .color-red {
    color: 'red';
  }
</style>
