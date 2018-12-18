<template>
  <div>
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column label="Product">
        <template slot-scope="scope">
          <div class="clearfloat">
            <div style="float: left;margin-right: 10px">
              <img v-bind:src="scope.row.imgURL" class="image" style="width: 100px">
            </div>
            <div style="float: left">
              <div>{{scope.row.name}}</div>
              <div>Status: In Stock</div>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        label="Quantity"
        prop="num"
        width="150" align="center">
      </el-table-column>
      <el-table-column
        label="Price"
        prop="amount"
        width="150" align="center">
        <template slot-scope="scope">
          <div>{{scope.row.priceAmount}}&nbsp;&nbsp;{{scope.row.currency}}</div>
        </template>
      </el-table-column>
      <el-table-column
        label="Total"
        width="150" align="center">
        <template slot-scope="scope">
          <div>{{scope.row.amount}}&nbsp;&nbsp;{{scope.row.currency}}</div>
        </template>
      </el-table-column>
      <el-table-column width="150">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.row.id, scope.row)">Delete</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div style="margin-top: 30px;font-size: 20px;">
      <div style="text-align: right;padding-right: 50px">
        <div style="margin-bottom: 8px"><span style="font-weight: 700;color: #000">Item(s) Subtotal:&nbsp;&nbsp;</span> {{cartTotal.amount1}}&nbsp;&nbsp;{{cartTotal.currency}}</div>
        <div><span style="font-weight: 700;color: #000">Shipping & Handling:&nbsp;&nbsp;</span>{{cartTotal.amount2}}&nbsp;&nbsp;{{cartTotal.currency}}</div>
      </div>
      <div style="border-top: 2px solid #fff;margin-top: 24px;text-align: right;padding-top: 20px;padding-right: 50px">
        <div><span style="font-weight: 700;color: #000">Total:&nbsp;&nbsp;</span> {{cartTotal.amount3}}&nbsp;&nbsp;{{cartTotal.currency}}</div>
        <div style="margin-top: 20px">
          <el-button @click="handleShopping()" class="button" size="small" icon="el-icon-sold-out"> Continue Shopping</el-button>
          <el-button @click="handleCheckout(tableData,cartTotal)" type="success" size="small" class="button">Checkout</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
      name: "cart",
      data() {
        return {
          tableData: [
            {
              amount: "3.00",
              currency: "USD",
              id: "002",
              imgURL: "../../static/img/coffee2.jpg",
              name: "Cafe Mocha",
              num: 1,
              priceAmount: "3.00",
            }
          ],
          cartTotal: {
            amount1:"600",
            amount2:"0.00",
            amount3:"600",
            currency:"USD"
          }
        }
      },
      created() {
        this.handleCreat(this.$route.params.carts,this.$route.params.total);
        // this.tableData=this.$route.params.carts;
        // this.$route.params.total
      },
      methods: {
        handleEdit(index, row) {
          console.log(index, row);
        },
        handleCreat(carts,total){
          this.tableData=[];
          this.cartTotal={
              amount1:"",
              amount2:"0.00",
              amount3:"",
              currency:"USD"
          };
          for(let i=0;i<carts.length;i++){
            this.tableData.push(carts[i]);
            this.tableData[i].priceAmount=(this.tableData[i].amount/this.tableData[i].num).toFixed(2)
          }
          this.cartTotal.amount1=total.amount;
          this.cartTotal.amount3=(parseFloat(this.cartTotal.amount1)+parseFloat(this.cartTotal.amount2)).toFixed(2);
        },
        handleDelete(index, row) {
          for(let i=0;i<this.tableData.length;i++){
            if(this.tableData[i].id==index){
              this.cartTotal.amount1=(this.cartTotal.amount1-this.tableData[i].amount).toFixed(2);
              this.cartTotal.amount3=(this.cartTotal.amount3-this.tableData[i].amount).toFixed(2);
              this.tableData.splice(i,1);
              return
            }
          }
        },
        handleShopping(){
          this.$router.push('/commodity')
        },
        handleCheckout(tableData,cartTotal){
          this.$router.push({
            name: 'invoice',
            params: {
              tableData: tableData,
              cartTotal:cartTotal
            }
          });
          console.log(tableData);
          console.log(cartTotal);
        }
      },
    }
</script>

<style scoped>
  .clearfloat:after{display:block;clear:both;content:"";visibility:hidden;height:0}
  .clearfloat{zoom:1}
</style>
