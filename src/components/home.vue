<template>
  <div id="app">
    <!--头部表格-->
    <el-row :gutter="12">
      <el-col :span="8">
        <el-card shadow="always">
          <div slot="header">
            <span>订单总数</span>
          </div>
          <div>
            <span>{{ tableData.length }}</span>
          </div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card shadow="always">
          <div slot="header">
            <span>总收入</span>
          </div>
          <div>
            <span>¥{{ total_prices.pice__sum }}</span>
          </div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card shadow="always">
          <div slot="header">
            <span>未打印单数</span>
          </div>
          <div>
            <span>{{ num_untreated }}</span>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <div style="height: 60px"></div>
    <!--搜索框-->
    <el-input placeholder="请输入内容" class="input-with-select" v-model="search" clearable size="mini">
      <el-button slot="append" @click="Search" icon="el-icon-search"></el-button>
    </el-input>
    <!--内容表格-->
    <!--搜索后-->
    <el-table
        v-if="searchData.length>0"
        :data="searchData"
        border
        :header-cell-style="{background:'#000', color:'#fff'}"
        style="width: 95%;margin: 40px;">
      <el-table-column
          prop="id"
          label="订单"
          width="180">
      </el-table-column>
      <el-table-column
          prop="time"
          label="时间"
          width="180">
      </el-table-column>
      <el-table-column
          prop="pice"
          label="价格"
          width="180">
      </el-table-column>
      <el-table-column
          prop="phone"
          label="手机号">
      </el-table-column>
      <el-table-column
          prop="random"
          label="订单号">
      </el-table-column>
      <el-table-column
          prop="status"
          label="状态"
          width="180"
          filter-placement="bottom-end">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.status === '未打印'" :type="'danger'" disable-transitions>{{ scope.row.status }}</el-tag>
          <el-tag v-if="scope.row.status === '已打印'" :type="'success'" disable-transitions>{{ scope.row.status }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column
          fixed="right"
          label="操作"
          width="180">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope)" type="text" size="small">查看</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--搜索前-->
    <el-table
        v-else
        :data="tableData"
        border
        :header-cell-style="{background:'#000', color:'#fff'}"
        style="width: 95%;margin: 40px;">
      <el-table-column
          prop="id"
          label="#"
          width="180">
      </el-table-column>
      <el-table-column
          prop="time"
          label="时间"
          width="180">
      </el-table-column>
      <el-table-column
          prop="pice"
          label="价格"
          width="180">
      </el-table-column>
      <el-table-column
          prop="phone"
          label="手机号">
      </el-table-column>
      <el-table-column
          prop="random"
          label="订单号">
      </el-table-column>
      <el-table-column
          prop="status"
          label="状态"
          width="180"
          filter-placement="bottom-end">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.status === '未打印'" :type="'danger'" disable-transitions>{{ scope.row.status }}</el-tag>
          <el-tag v-if="scope.row.status === '已打印'" :type="'success'" disable-transitions>{{
              scope.row.status
            }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column
          fixed="right"
          label="操作"
          width="180">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope)" type="text" size="small">查看</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--弹窗界面-->
    <el-dialog @close="handleClose" title="订单详情" :visible.sync="dialogTableVisible">
      <el-table :data="gridData">
        <el-table-column property="filename" label="文件名"></el-table-column>
        <el-table-column property="num" label="份数"></el-table-column>
        <el-table-column property="face" label="单双面">
        </el-table-column>
        <el-table-column property="color" label="颜色">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.color === '黑白'" :type="'info'">{{ scope.row.color }}</el-tag>
            <el-tag v-if="scope.row.color === '彩印'" :type="'warning'">{{ scope.row.color }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column property="dir" label="打印方向"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="printf(scope)">打印</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>

export default {
  name: "home",
  data() {
    return {
      /*搜索框数据*/
      search: "",
      searchData: [],  /*搜索数据*/
      tableData: [],  // 原本展示数据
      /*弹窗信息*/
      gridData: [],
      /*当前弹窗的id*/
      new_id: '',
      /*弹窗对应的订单id信息*/
      ordeid: "",
      dialogTableVisible: false,
      /*总价*/
      total_prices: "0",
      /*未打印单数*/
      num_untreated: '0',
    }
  },
  //生命周期函数
  created() {
    //获取数据库数据
       this.axios.get('http://127.0.0.1:8000/win/').then((response) => {
        this.tableData = response.data.data //订单数据
        this.total_prices = response.data.total_prices  //总价
        this.num_untreated = response.data.num_untreated //未打印单数
      })
      console.log(this.tableData)
  },
  methods: {
    //打开弹窗:查看按钮
    handleClick(res) {
      console.log(res)
      this.dialogTableVisible = true
      this.gridData = JSON.parse(res.row.data.replaceAll("'", '"'))
      this.new_id = res.$index
      this.ordeid = res.row.id
    },
    //关闭弹窗回调
    handleClose() {
      let a = 0
      for (let i = 0; i < this.gridData.length; i++) {
        if (this.gridData[i].download !== 'true') {
          let id = i + 1
          this.$notify({
            title: '警告',
            message: "第" + id + "个没有打印",
            type: 'warning'
          });
        } else {
          a = a + 1
        }
      }
      if (a === this.gridData.length) {
        console.log('全部打印')
        this.$notify({
          title: '成功',
          message: "已经全部打印",
          type: 'success'
        });
        let id = this.ordeid
        this.axios.post('http://127.0.0.1:8000/changestatus/', {
          id: id
        })
      } else {
        console.log('失败', this.gridData)
      }
      this.tableData[this.new_id].status = '已打印'
    },
    //打印操作
    printf(res) {
      window.open(res.row.downloudPath)
      console.log("gridData:", this.gridData)
      this.gridData[res.$index].download = "true"
      let id = res.$index + 1
      /*打印成功弹窗*/
      this.$notify({
        title: '成功',
        message: "打印第" + id + "个文件",
        type: 'success'
      });
    },
    //搜索按钮
    Search() {
      const search = this.search;
      if (search) {
        this.searchData = this.tableData.filter(function (product) {
          console.log(product)
          return Object.keys(product).some(function (key) {
            console.log(key)
            return String(product[key]).toLowerCase().indexOf(search) > -1
          })
        })
      }
    },
  },
}
</script>

<style scoped>
.el-input {
  width: 300px;
  position: absolute;
  right: 40px;
}

.el-col {
  height: 160px;
}

.el-card {
  height: 100%;
  background-color: #0A97BB;
  margin: 40px;
  text-align: center;
  font-size: 25px;
}

.el-card__header {
  height: 50px;
  width: auto;
}

.el-card__body {
  height: 100%;
  width: auto;
}

</style>