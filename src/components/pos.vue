<template>
  <el-row :gutter="20">
    <el-col :span="10" :offset="7">
      <div v-show="step.step1" class="grid-content bg-purple" style="padding: 0px 36px;">
        <el-row :gutter="20">
          <el-col :span="24">
            <div style="text-align: center;line-height: 50px;background-color: #3a8ee6;color: #fff">Test POS</div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="24">
            <div style="text-align: center;line-height: 50px;background-color: #fff;color: #000">{{num}}&nbsp;USD</div>
          </el-col>
        </el-row>
        <el-row class="bor">
          <el-col :span="8">
            <div class="key" @click="handleKey($event)">1</div>
          </el-col>
          <el-col :span="8">
            <div class="key keyB" @click="handleKey($event)">2</div>
          </el-col>
          <el-col :span="8">
            <div class="key" @click="handleKey($event)">3</div>
          </el-col>
        </el-row>
        <el-row class="bor">
          <el-col :span="8">
            <div class="key" @click="handleKey($event)">4</div>
          </el-col>
          <el-col :span="8">
            <div class="key keyB" @click="handleKey($event)">5</div>
          </el-col>
          <el-col :span="8">
            <div class="key" @click="handleKey($event)">6</div>
          </el-col>
        </el-row>
        <el-row class="bor">
          <el-col :span="8">
            <div class="key" @click="handleKey($event)">7</div>
          </el-col>
          <el-col :span="8">
            <div class="key keyB" @click="handleKey($event)">8</div>
          </el-col>
          <el-col :span="8">
            <div class="key" @click="handleKey($event)">9</div>
          </el-col>
        </el-row>
        <el-row class="bor">
          <el-col :span="8">
            <div class="key" @click="handleKey($event)" style="font-weight: 700;font-size: 20px">.</div>
          </el-col>
          <el-col :span="8">
            <div class="key keyB" @click="handleKey($event)">0</div>
          </el-col>
          <el-col :span="8">
            <div class="key" @click="handleKey($event)">C</div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="24">
            <div @click="handlePos(num)" style="text-align: center;line-height: 50px;background-color: #3a8ee6;color: #fff;cursor: pointer">OK</div>
          </el-col>
        </el-row>
      </div>
      <div class="box" v-show="step.step2">
        <el-row class="bor" style="line-height: 50px;border-bottom: 1px solid #e6e6e6">
          <el-col :span="12">
            <div>Test POS</div>
          </el-col>
          <el-col :span="12">
            <div style="text-align: right">{{num}}&nbsp;USD</div>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="20" :offset="2">
            <div v-show="tep.tep1">
              <div style="padding: 16px 0px; font-size: 24px;text-align: center">Select payment currency</div>
              <div class="currencyBox">
                <div v-for="(item, index) in invoice" class="currency clearfloat"
                     v-bind:class='{active:current == index}' v-on:click="handleCurrency(index,item)">
                  <div class="currencyImg">
                    <img v-bind:src="item.imgURL" alt="" style="">
                  </div>
                  <div class="currencyName">{{item.name}}</div>
                  <div class="currencyAmount">{{item.amount}}&nbsp;&nbsp;{{item.currency}}</div>
                </div>
              </div>
              <div>
                <div>
                  <el-input
                    v-model="order.payerEmail"
                    size="medium"
                    placeholder="请输入内容"
                    prefix-icon="el-icon-message">
                  </el-input>
                </div>
                <div style="margin-top: 10px">
                  <el-button @click="handlePay()" style="width: 100%" type="primary" size="medium" :disabled="isdisabled">{{pay}}</el-button>
                </div>
              </div>
            </div>
            <div v-show="tep.tep2">
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
            </div>
            <div v-show="tep.tep3" style="margin-top: 20px">
              <div style="text-align: center;color: #27AE60;">
                <i class="el-icon-third-zhifuchenggong" style="font-size: 60px;color: #27AE60"></i>
                <div style="margin-top: 16px;font-size: 20px">Paid and Confirmed</div>
                <div style="margin-top: 20px"></div>
              </div>
            </div>
          </el-col>
        </el-row>


      </div>


    </el-col>
  </el-row>
</template>

<script>
  import VueQArt from 'vue-qart'
    export default {
      components: {VueQArt},
        name: "pos",
      data(){
          return{
            current: null,
            href: "",
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
            num:"0.00",
            step:{
              step1:true,
              step2:false,
            },
            tep:{
              tep1:true,
              tep2:false,
              tep3:false,
            },
            message: "",
            pay: "pay",
            ewm:{
              amount:"34567",
              address:"ertyukjhfgdfgthytj",
              currency:"BTC",
              imgURL:""
            },
            order:{
              orderId:"",
              payerEmail:"",
              paymentAmount:"",
              paymentCurrency:""
            },
            isdisabled: true,
            config: {
              value: 'www.baidu.com',
              imagePath: '../../static/img/ewm.png',
              filter: 'threshold',
              size:200
            }
        }
      },
      methods:{
        handleKey(e){
          if(e.target.innerText == "C"){
            this.num="0.00"
          }else if(e.target.innerText == "0"){
            if(this.num == "0.00"){
              this.num="0"
            }else {
              this.num +=e.target.innerText
            }
          }else {
            if(this.num=="0.00"){
              this.num="";
              if(e.target.innerText == "."){
                this.num="0.";
              }
            }
            this.num +=e.target.innerText
          }

          if(((this.num.split('.')).length-1)>1){
            this.num = this.num.substring(0, this.num.length - 1)
          }


          if((this.num.toString()).indexOf(".") != -1){
            var y = String(this.num).indexOf(".") + 1;
            var count = String(this.num).length - y;
            if(count>2){
              this.num = this.num.substring(0, this.num.length - 1)
            }
          }
        },
        handlePos(num){
          this.$axios.post("/order/checkout",{
            "orderAmount":num,
            "orderCurrency": "USD"
          }).then((res) => {
            this.order.orderId=res.data.orderId;
            this.order.paymentAmount=res.data.paymentAmount;
            this.order.paymentCurrency=res.data.paymentCurrency;
            for (let j = 0; j < this.invoice.length; j++) {
              if(this.invoice[j].currency==res.data.paymentCurrency){
                this.invoice[j].amount=res.data.paymentAmount
              }
            }
          }).catch(function (error) {
            console.log(error);
          });
          this.step={
            step1:false,
            step2:true,
          };
          console.log(num)
        },
        handlePay() {
          this.tep={
            tep1:false,
            tep2:true,
            tep3:false
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
              this.tep={
                tep1:false,
                tep2:false,
                tep3:true
              };
            })
          }).catch(function (error) {
            console.log(error);
          });
        },
        handleCurrency(index, item){
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
      }
    }
</script>

<style scoped>
.bor{
  border-bottom: 1px solid #e6e6e6
}
.key{
    text-align: center;
    line-height: 80px;
    background-color: #f9f9f9;
    color: #000;
    cursor: pointer;
}.key:hover{
   background-color: #e6e6e6;
}
.keyB{
  border-left: 1px solid #e6e6e6;
  border-right: 1px solid #e6e6e6;
}
  .box{
    border: 1px solid #e6e6e6;padding: 8px;background-color: #fff;border-radius: 5px;
  }
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
