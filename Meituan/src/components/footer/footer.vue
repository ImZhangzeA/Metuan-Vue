<template>
  <div class="shopcart">
      <div class="content">
          <div class="c-left">
              <div class="yu">
                  <div class="carlog" :class="{'wd':totalNum>0}" @click="carlistre">
                      <i class="logcar iconfont icon-shopping_cart" :class="{'ze':totalNum>0}"></i>
                  </div>
                  <div class="carnum" v-if="totalNum>0">{{totalNum}}</div>
              </div>
              <div class="txtcont">
                  <span class="money">￥{{totalMoney}}</span>
                  <u></u>
                  <span class="ps">另需配送费￥{{seller.deliveryPrice}}元</span>
              </div>
          </div>
          <div class="c-right" :class="payClass">{{qisong}}</div>
      </div>
      <transition name="fold">
      <div class="cartList" v-show="carshow">
          <div class="title">
              <span class='titL'>购物车</span>
              <span class='titR' @click="qk">清空</span>
          </div>
          <div class='carlister' ref="cartListscoll">
            <ul>
                <li v-for="item in cartArr">
                    <span>{{item.name}}</span>
                    <div class="spRig">
                        <b>￥{{item.price}}</b>
                        <addcart :foods='item' class="ibox"></addcart>
                    </div>
                </li>
            </ul>
          </div>
      </div>
      </transition>
  </div>
  
</template>
<script>
import addcart from '@/components/addcart/addcart'
import bs from 'better-scroll'
export default {
    name:'footers',
    data(){
        return{
            carshow:false
        }
    },
    components:{
        'addcart':addcart,
    },
    props:{
        cartArr:{
            type:Array
        },
        seller:{
            type:Object
        }
    },
    methods:{
        initscoll(){
            this.cartListscoll = new bs(this.$refs.cartListscoll,{
                click:true
            })
        },
        carlistre(){
            if(this.cartArr.length){
                this.carshow = !this.carshow
            }
        },
        qk(){
            for(let i=0;i<this.cartArr.length;i++){
                this.cartArr[i].num = 0;
            }
            this.cartArr = [];
            this.carshow = false;
        },
    },
    created(){
        this.$nextTick(function(){
            this.initscoll()
        })
    },
    computed:{
        totalNum(){
            let num=0;
            for(let i=0;i<this.cartArr.length;i++){
                num += this.cartArr[i].num
            }
            return num
        },
        totalMoney(){
            let money =0;
            for(let i=0;i<this.cartArr.length;i++){
                money += (this.cartArr[i].num * this.cartArr[i].price)
            }
            return money
        },
        qisong(){
            if(this.totalMoney ==0){
                return `￥${this.seller.minPrice}元起送`
            }else if(this.totalMoney < this.seller.minPrice){
                let ca = this.seller.minPrice - this.totalMoney
                return `还差￥${ca}元起送`
            }else{
                return `去结算`
            }
        },
        payClass(){
            if(this.totalMoney >= this.seller.minPrice){
                return 'settlement'
            }else{
                return 'unsettlement'
            }
        },
    }
}
</script>

<style lang="less">
    .shopcart{
        position: absolute;
        bottom:0;
        left: 0;
        width: 100%;
        z-index: 3;
        .content{
            width: 100%;
            height: 116/64rem;
            background: #141d27;
            display: flex;
        }
        .cartList{
            display: block;
            position: absolute;
            overflow: hidden;
            bottom: 120/64rem;
            z-index: -1;
            background: #ffffff;
            padding-bottom: 15px;
            left: 0;
            width: 100%;
            &.fold-enter-active,&.fold-leave-active{
                transition:all 0.5s;
            }
            &.fold-enter,&.fold-leave-active{
                transform: translate3d(0,100%,0); 
            }
            .title{
                width: 100%;
                height: 80/64rem;
                background: #f3f5f7;
                box-sizing: border-box;
                border-color: rgba(7,17,27,0.1);
                border-bottom: 1px solid;
                display: flex;
                align-items: center;
                justify-content: space-between;
                .titL{
                    float: left;
                    margin-left: 36/64rem;
                    font-size: 28/64rem;
                    font-weight: 200;
                    color:rgb(7,17,27);
                    line-height: 80/64rem;
                }
                .titR{
                    float: right;
                    margin-right: 36/64rem;
                }
            }
            .carlister{
                max-height: 370/64rem;
                overflow: hidden;
            }
            ul{
                width: 100%;
                background: #ffffff;
                li{
                    box-sizing: border-box;
                    margin-left: 36/64rem;
                    margin-right: 36/64rem;
                    height:96/64rem;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    border-bottom: 1px solid;
                    border-color: rgba(7,17,27,0.1);
                    span{
                        float: left;
                        font-size: 28/64rem;
                        color:rgb(7,17,27);
                    }
                    .spRig{
                        width: 220/64rem;
                        height: 100%;
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        span{
                            font-size: 28/64rem;
                            font-weight: 700;
                            color:rgb(240,20,20);
                        }
                        b{
                            color: rgb(240,20,20);
                            font-size: 28/64rem;
                            font-weight: 200;
                            line-height: 80/64rem;
                        }
                        .ibox{
                            right: 36/64rem;
                        }
                    }
                }
            }
        }
        .c-left{
            flex: 1;
            height: 116/64rem;
            position: relative;
            .yu{
                width: 116/64rem;
                height: 116/64rem;
                position: absolute;
                left: 24/64rem;
                bottom: 16/64rem;
                background: #141d27;
                border-radius: 50%;
                .carlog{
                    &.wd{
                        background: #00a0dc;
                    }
                    width: 88/64rem;
                    height: 88/64rem;
                    border-radius: 50%;
                    background:#2b333b;
                    margin: 20/64rem auto;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    .logcar{
                        font-size: 48/64rem;
                        color:rgba(255,255,255,0.4);
                        line-height: 45/64rem;
                        text-align: center;
                        &.ze{
                            color: #ffffff;
                        }
                    }
                }
                .carnum{
                    position: absolute;
                    top: 0;
                    left: 52/64rem;;
                    width: 48/64rem;
                    height: 32/64rem;
                    border-radius: 20px;
                    background: rgb(240,20,20);
                    color:#fff;
                    font-size: 18/64rem;
                    font-weight: 700;
                    line-height: 32/64rem;
                    text-align: center;
                }
            }
            .txtcont{
                height:116/64rem;
                margin-left:148/64rem;
                display: flex;
                align-items: center;
                span.money{
                    display: inline-block;
                    font-size: 32/64rem;
                    color:rgba(255,255,255,0.4);
                    font-weight: 700;
                }
                u{
                    display: inline-block;
                    width: 1px;
                    background: #2c343d;
                    height: 50/64rem;
                    margin: 0 12/64rem;
                }
                span.ps{
                    font-size:0.312rem;
                    color:rgba(255,255,255,0.4);
                    font-weight: 700;
                } 
            }

        }
        .c-right{
            flex: 0 0 210/64rem;
            height: 116/64rem;
            width: 210/64rem;
            background:#2b333b;
            font-size: 24/64rem;
            color:rgba(255,255,255,0.4);
            font-weight: 700;
            line-height: 116/64rem;
            text-align: center;
            &.settlement{
                background: #4cd;
                color: #ffffff;
            }
        }
    }
</style>
