<template>
  <el-row :gutter="20">
    <el-col :span="10" :offset="7" style="background-color: #fff">
      <el-row :gutter="20">
        <el-col :span="24">
          <el-row :gutter="20">
            <el-col :span="24">
              <div style="padding:10px 0px;font-size: 18px">Order #{{orderID}}</div>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="24">
              <div style="font-size: 14px;color: #a6a6a6;line-height: 20px">
                {{orders}}
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="24">
              <div v-show=step.step1 style="text-align: right;font-size: 24px;padding: 24px 0px">
                {{amount}}&nbsp;&nbsp;{{currency}}
              </div>
              <div v-show=!step.step1 style="text-align: right;padding: 24px 0px">
                <div class="clearfloat">
                  <div style="float: right;margin-left: 16px">
                    <img style="width: 50px;height: 50px" v-bind:src="ewm.imgURL" alt="">
                  </div>
                  <div style="float: right">
                    <div style="line-height: 24px;font-size: 20px">{{ewm.amount}}&nbsp;&nbsp;{{ewm.currency}}</div>
                    <div style="line-height: 28px;font-size: 16px;color: #aaa">{{amount}}&nbsp;&nbsp;{{currency}}</div>
                  </div>

                </div>
              </div>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
      <el-row :gutter="20" style="border-top: 2px solid #eee;padding: 30px 10px;">
        <el-col :span="24" v-show=step.step1>
          <el-row :gutter="20">
            <el-col :span="24">
              <div style="text-align: center;font-size: 24px;padding: 10px 0px">
                Select payment currency
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="20" :offset="2">
              <div class="currencyBox">
                <div v-for="(item, index) in invoice" class="currency clearfloat"
                     v-bind:class='{active:current == index}' v-on:click="handleCurrency(index,item)">
                  <div class="currencyImg">
                    <img v-bind:src="item.imgURL" alt="" style="">
                  </div>
                  <div class="currencyName">{{item.name}}</div>
                  <div class="currencyAmount">{{item.amount}}&nbsp;&nbsp;{{item.currency}}</div>
                </div>
                <!--<div class="currency clearfloat" v-on:click="handleCurrency($event)">
                  <div class="currencyImg">
                    <img src="../../static/img/bitcoin_cash.png" alt="" style="">
                  </div>
                  <div class="currencyName">Bitcoin Cash</div>
                  <div class="currencyAmount">0.062481 BCH</div>
                </div>-->
              </div>
              <div>
                <div>
                  <el-input
                    v-model="message"
                    size="medium"
                    placeholder="请输入内容"
                    prefix-icon="el-icon-message">
                  </el-input>
                </div>
                <div style="margin-top: 10px">
                  <el-button @click="handlePay()" style="width: 100%" type="primary" size="medium" :disabled="isdisabled">{{pay}}</el-button>
                </div>
              </div>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="20" :offset="2" v-show=step.step2>
          <div>
            <div style="text-align: center">
              <vue-q-art :config=config></vue-q-art>
            </div>
            <div style="text-align: center">Send the indicated amount to the address below</div>


            <div>
              <el-input readonly placeholder="请输入内容" v-model="ewm.amount">
                <template slot="prepend">{{ewm.currency}}</template>
                <el-button slot="append" icon="el-icon-third-erweima"></el-button>
              </el-input>
              <el-input readonly placeholder="请输入内容" v-model="ewm.address">
                <template slot="prepend">
                  <a :href=href >
                    <i class="el-icon-third-qianbao"></i>
                  </a>
                </template>
                <!--<el-button slot="prepend" icon="el-icon-third-qianbao"></el-button>-->
                <el-button slot="append" icon="el-icon-third-erweima"></el-button>
              </el-input>
            </div>
          </div>
        </el-col>
        <el-col :span="20" :offset="2" v-show=step.step3>
          <div style="text-align: center;color: #27AE60;">
            <i class="el-icon-third-zhifuchenggong" style="font-size: 60px;color: #27AE60"></i>
            <div style="margin-top: 16px;font-size: 20px">Paid and Confirmed</div>
            <div style="margin-top: 20px"></div>
          </div>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
  import VueQArt from 'vue-qart'
  export default {
    components: {VueQArt},
    name: "invoice",
    data() {
      return {
        invoice: [
          {
            "imgURL": "../../static/img/bitcoin.png",
            "name": "Bitcoin",
            "currency": "BTC",
            "amount": "0.00895738",
            "rate": ""
          }/*,
          {
            "imgURL": "../../static/img/litecoin.png",
            "name": "Litecoin",
            "currency": "LTC",
            "amount": "1.285225",
            "rate": ""
          },
          {
            "imgURL": "../../static/img/ethereum.png",
            "name": "Ethereum",
            "currency": "ETH",
            "amount": "0.06828",
            "rate": ""
          },
          {
            "imgURL": "../../static/img/bitcoin_cash.png",
            "name": "Bitcoin Cash",
            "currency": "BCH",
            "amount": "0.062481",
            "rate": ""
          }*/
        ],
        current: null,
        rate: "",
        isdisabled: true,
        pay: "pay",
        orders: "",
        amount: "",
        currency: "",
        orderID: "",
        message: "",
        href: "",
        step:{
          step1:true,
          step2:false,
          step3:false
        },

        ewm:{
          amount:"34567",
          address:"ertyukjhfgdfgthytj",
          currency:"BTC",
          imgURL:""
        },
        msg: 'Welcome to Your Vue.js App',
        config: {
          value: 'www.baidu.com',
          imagePath: '../../static/img/ewm.png',
          filter: 'threshold',
          size:200
        }

      }
    },
    created() {
      this.handleInvoice(this.$route.params.tableData, this.$route.params.cartTotal);
      // this.tableData=this.$route.params.carts;
      // this.$route.params.total
    },
    methods: {
      handleInvoice(order, cartTotal) {
        let orderArr = [];
        for (let i = 0; i < order.length; i++) {
          orderArr.push(order[i].num + "X" + order[i].name)
        }
        this.orders = orderArr.join(",");
        this.amount = cartTotal.amount3;
        this.currency = cartTotal.currency;
        this.$axios.post("/order/checkout",{
          "orderAmount":this.amount,
          "orderCurrency": "USD"
        }).then((res) => {
          console.log(res.data);
          this.orderID=res.data.orderId;
          for (let j = 0; j < this.invoice.length; j++) {
            if(this.invoice[j].currency==res.data.paymentCurrency){
              this.invoice[j].amount=res.data.paymentAmount
            }
          }
        }).catch(function (error) {
          console.log(error);
        });

      },
      handleCurrency(index, item) {
        this.current = index;
        this.isdisabled = false;
        this.pay = "pay with " + item.name;
        this.ewm={
            amount:item.amount,
            address:"ertyukjhfgdfgthytj",
            currency:item.currency,
            imgURL:item.imgURL
        }
      },
      handlePay(){
        this.step={
          step1:false,
          step2:true,
          step3:false
        };
        this.$axios.post("/order/pay",{
          "orderId": this.orderID,
          "payerEmail": this.message,
          "paymentAmount": this.ewm.amount,
          "paymentCurrency": this.ewm.currency
        }).then((res) => {
          console.log(res.data);
          this.ewm.address=res.data.paymentAddress;
          this.config.value=res.data.paymentUrl;
          this.href=res.data.paymentUrl;
          this.$axios.get("/order/result?address="+this.ewm.address+"&amount="+this.ewm.amount).then((res) => {
            this.step={
              step1:false,
              step2:false,
              step3:true
            };
          })
        }).catch(function (error) {
          console.log(error);
        });


      }
    }
  }
</script>

<style scoped>
  .currencyBox .currency {
    border: 2px solid #cecece;
    border-radius: 10px;
    height: 50px;
    margin: 16px 0px;
    cursor: pointer;
    padding-right: 12px;
  }

  .currencyBox .active {
    border-color: #3a8ee6;
  }

  .currency .currencyImg {
    width: 50px;
    height: 50px;
    line-height: 50px;
    text-align: center;
    float: left;
  }

  .currency .currencyImg img {
    height: 30px;
    width: 30px;
    margin-top: 10px;
  }

  .currency .currencyName {
    height: 50px;
    line-height: 50px;
    float: left;
    font-size: 18px;
  }

  .currency .currencyAmount {
    line-height: 50px;
    height: 50px;
    float: right;
    font-size: 18px;
  }

  .clearfloat:after {
    display: block;
    clear: both;
    content: "";
    visibility: hidden;
    height: 0
  }

  .clearfloat {
    zoom: 1
  }
</style>
