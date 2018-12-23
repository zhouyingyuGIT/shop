<template>
  <el-container>
    <el-header>
      <el-row :gutter="20">
        <el-col :span="12">
          IBS
        </el-col>
        <el-col :span="12">
          <div style="text-align: right">
            <span style="font-size: 20px;cursor: pointer" @click="handlePos()">Point of Sale</span>
          </div>

        </el-col>
      </el-row>
    </el-header>
    <el-main>
      <router-view/>
    </el-main>
  </el-container>
</template>

<script>
export default {
  name: 'shop',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods:{
    handlePos(){
      this.$router.push('/pos')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    font-size: 28px;
    font-weight: 700;
    padding-left: 60px;
    line-height: 60px;
  }

  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
  }

  .el-main {
    background-color: #E9EEF3;
    color: #333;
    height: 100%;
  }

  body > .el-container {
    margin-bottom: 40px;
    height: 100%;
  }

  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }

  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
</style>
