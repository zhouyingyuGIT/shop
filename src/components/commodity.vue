<template>
    <div>
      <el-row :gutter="20">
        <el-col :span="18">
          <div class="grid-content bg-purple">
            <el-row :gutter="20">
              <el-col :span="8" v-for="item in items" :key="item.id" style="margin-bottom: 16px">
                <el-card :body-style="{ padding: '0px' }">
                  <div style="text-align: center">
                    <img v-bind:src="item.imgURL" class="image" style="width: 100%">
                  </div>
                  <div style="padding: 14px;">
                    <div style="margin: 10px 0px">{{item.name}}</div>
                    <div style="color: #219fd1;margin: 10px 0px">{{item.amount}} {{item.currency}}</div>
                    <div class="bottom clearfix" style="border-top: 2px solid #eee;text-align: center">
                      <el-button @click="add(item)" type="text" class="button" icon="el-icon-sold-out">Add to cart</el-button>
                    </div>
                  </div>
                </el-card>
              </el-col>
            </el-row>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <div style="color: #333333;background-color: whitesmoke;border-color: #dddddd;padding: 10px 15px;">Cart</div>
            <div style="background-color: #fff;padding: 15px">
              <div v-if=ist>Your shopping cart is empty</div>
              <div v-else>

                <div class="clearfloat" style="margin: 8px 0px" v-for="cart in carts">
                  <div style="float: left">{{cart.num}}x{{cart.name}}</div>
                  <div style="color: #219fd1;float: right">{{cart.amount}}&nbsp;&nbsp;{{cart.currency}}</div>
                </div>
                <div style="border-top: 2px solid #eee;margin-top: 20px;padding: 16px 0px">
                  <div class="clearfloat">
                    <div style="float: right">Total: {{Total.amount}}&nbsp;&nbsp;{{Total.currency}}</div>
                  </div>
                  <div class="clearfloat" style="margin-top: 16px">
                    <el-button style="float: left" @click="handleDelete()" class="button" size="small" icon="el-icon-delete">Empty Cart</el-button>
                    <el-button style="float: right" @click="handleCart(carts,Total)" type="success" size="small" class="button">Checkout</el-button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
</template>

<script>
    export default {
        name: "commodity",
        data(){
          return{
            items:[
            ],
            carts:[

            ],
            ist:true,
            Total:{
              amount:0,
              currency:"USD"
            }
          }
        },
      created() {
        this.getData();
      },
      methods:{
        getData() {
          this.$axios.get("../../static/json/commodity.json").then((res) => {
            this.items = res.data.list;
          })
        },
        add(item){
          this.ist=false;
          for (let i=0;i<this.carts.length;i++){
            if(item.id==this.carts[i].id){
              this.carts[i].num++;
              this.carts[i].amount=(this.carts[i].num*item.amount).toFixed(2);
              this.Total.amount=(parseFloat(this.Total.amount)+parseFloat(item.amount)).toFixed(2);
              return;
            }
          }
          this.carts.push(
            {
              "id":item.id,
              "imgURL":item.imgURL,
              "name":item.name,
              "currency":item.currency,
              "amount":item.amount,
              "num":item.num
            }
          );
          this.Total.amount=(parseFloat(this.Total.amount)+parseFloat(item.amount)).toFixed(2);
        },
        handleDelete(){
          this.ist=true;
          this.carts=[];
          this.Total.amount=0;
        },
        handleCart(carts,Total){
          this.$router.push({
            name: 'cart',
            params: {
              carts: carts,
              total:Total
            }
          })
        }
      }
    }
</script>

<style scoped>
  .clearfloat:after{display:block;clear:both;content:"";visibility:hidden;height:0}
  .clearfloat{zoom:1}
</style>
