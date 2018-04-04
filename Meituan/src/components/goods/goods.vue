<template>
  <div class="boxx">
    <div class="goodsbox">
      <div class="goods-l" ref='menuScroll'>
        <ul>
          <li v-for="(item,index) in goods" :class="{'on':index == onIndex}" ref="menulist" @click="scrollTo(index)">
            <span>
              <p><i v-if="item.type>=0" :class="classArr[item.type]"></i>{{item.name}}</p>
            </span>
          </li>
        </ul>
      </div>
      <div class="goods-r" ref="listScroll">
        <ul class="foodItem">
          <li v-for="(item,indexs) in goods" ref="foodslist">
            <h3 class="title">{{item.name}}</h3>
            <dl class="foodList" v-for="(items,index) in item.foods">
              <dt>
                <img :src='items.image'>
              </dt>
              <dd>
                <p @click="more(index,indexs)">{{items.name}}</p>
                <span class="description">{{items.description}}</span>
                <span class="sell">月售{{items.sellCount}}份<i>好评率{{100}}%</i></span>
                <span class="price">￥<b>{{items.price}}</b><i v-show="items.oldPrice">￥{{items.oldPrice}}</i></span>
              </dd>
              <addcart :foods='items'></addcart>
            </dl>
          </li>
        </ul>
      </div>
    </div>
    <footers :cartArr='foodsToCart' :seller='seller'></footers>
    <div class="morebox" ref="moreboxscroll">
      <div>
        <div class="more-header">
          <swiper :options="swiperOption">
              <swiper-slide class="swlist">
                <img :src="goods[alstnum].foods[listnum].image">
              </swiper-slide>
          </swiper>
        </div>
        <div class="more-menu">
          <div class="toLast" @click="toLast">返回上级</div>
          <h3>{{goods[alstnum].foods[listnum].name}}</h3>
          <div class="more-txt">
            <span class="spr">月售{{goods[alstnum].foods[listnum].sellCount}}份</span>
            <span>好评率{{goods[alstnum].foods[listnum].rating}}%</span>
          </div>
          <div class="more-money">
            <span class="more-moneyh"><i>￥</i>{{goods[alstnum].foods[listnum].price}}</span>
            <span class="more-moneys" v-if="goods[alstnum].foods[listnum].oldPrice">￥{{goods[alstnum].foods[listnum].oldPrice}}</span>
          </div>
          <span class="more-btn" @click="moreAdd(alstnum,listnum)">加入购物车</span>
        </div>
        <div class="jg"></div>
        <div class="more-mid">
          <h3>商品介绍</h3>
          <p>{{goods[alstnum].foods[listnum].info}}</p>
        </div>
         <div class="jg"></div>
         <div class="more-mid">
          <h3>商品评价</h3>
         
        <div class="menu">
          <div class="menu-box">
            <span class="all">全部<i>{{goods[alstnum].foods[listnum].ratings.length}}</i></span>
            <span class="en">满意<i>{{ennum}}</i></span>
            <span class="un">不满意<i>{{unnum}}</i></span> 
          </div>
        </div>
        <div class="look">
          <i class="log iconfont icon-check_circle" ></i>
          <span>只看有内容的评价</span>
        </div>
        <div class="evaluate">
          <div>
            <dl v-for="item in goods[alstnum].foods[listnum].ratings">
              <dt>
                <!-- <img :src="item.avatar"> -->
                <div class="more-evt">
                  <span ref="spantxt">{{item.rateTime/1000 | moment}}</span>
                </div>
                <div class="more-evb">
                  <i class="log-up iconfont icon-thumb_up" v-show="item.rateType>=0"></i>
                  <i class="log-up iconfont icon-thumb_down" v-show="item.rateType<0"></i>
                  <span>{{item.text}}</span>
                </div>
              </dt>
              <dd>
                <span>{{item.username}}</span>
                <img :src="item.avatar" >
              </dd>
            </dl>
          </div>
        </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import bs from 'better-scroll'
import addcart from '@/components/addcart/addcart'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
 import footers from '@/components/footer/footer'
export default{
  name:'goods',
  props:{
    seller:{
      type:Object
    }
  },
  data(){
    return{
      goods:[],
      listheight:[],
      scrollHeight:0,
      listnum:0,
      alstnum:0,
      swiperOption:{
        slidesPerView:1,
      },
    }
  },
  created:function(){
    this.$http.get('/api/goods').then((response)=>{
      if(response.data.err == 0){
        this.goods = response.data.data
        this.$nextTick(function(){
          this.initscroll()
          this.getHeight()
        })
      }
    })
    this.classArr=['decrease','discount','special'];
  },
  computed:{
    onIndex:function(){
      for(let i=0;i<this.listheight.length;i++){
        let height1 = this.listheight[i]
        let height2 = this.listheight[i+1]
        if(this.scrollHeight>=height1 && this.scrollHeight<height2){
          this.menuScroll.scrollToElement(this.$refs.menulist[i],500,0,-100)
          return i
        }
      }
      return 0
    },
    foodsToCart(){
      let cartArr=[]
      for(let i=0;i<this.goods.length;i++){
        for(let j=0;j<this.goods[i].foods.length;j++){
          if(this.goods[i].foods[j].num > 0){
            cartArr.push(this.goods[i].foods[j])
          }
        }
      }
      return cartArr
    },
    ennum(){
      let aaa = 0
      for(let i=0;i<this.goods[this.alstnum].foods[this.listnum].ratings.length;i++){
        if(this.goods[this.alstnum].foods[this.listnum].ratings[i].rateType >=0){
          aaa ++
        }
      }
      return aaa
    },
    unnum(){
      let unnum =0;
      for(let i=0;i<this.goods[this.alstnum].foods[this.listnum].ratings.length;i++){
        if(this.goods[this.alstnum].foods[this.listnum].ratings[i].rateType <0){
          unnum++
        }
      }
      return unnum
    },
  },
  methods:{
    initscroll:function(){
      this.menuScroll = new bs(this.$refs.menuScroll,{
        click:true
      })
      this.listScroll = new bs(this.$refs.listScroll,{
        click:true,
        probeType:3
      })
      this.bgScroll = new bs(this.$refs.moreboxscroll,{
        click:true,
      })
      this.listScroll.on('scroll',(pos)=>{
       this.scrollHeight = Math.abs(Math.round(pos.y))
      })
    },
    getHeight(){
      let height = 0
      this.listheight.push(height)
      for(let i=0;i<this.$refs.foodslist.length;i++){
        height+=this.$refs.foodslist[i].clientHeight
        this.listheight.push(height)
      }
    },
    scrollTo(index){
      this.listScroll.scrollToElement(this.$refs.foodslist[index],300,0,0)
    },
    more(index,indexs){
      this.alstnum = indexs;
      this.listnum = index;
      this.$refs.moreboxscroll.style.display = 'block';
      console.log(this.listnum)
    },
    toLast(){
      this.$refs.moreboxscroll.style.display = 'none';
    },
    moreAdd(alstnum,listnum){
      if(!this.goods[alstnum].foods[listnum].num){
          Vue.set(this.goods[alstnum].foods[listnum],'num',1)
      }else{
          this.goods[alstnum].foods[listnum].num ++
      }
      console.log(this.goods[alstnum].foods[listnum].num)
    },
  },
  components:{
    'addcart':addcart,
    'footers':footers,
    swiper,
    swiperSlide
  }
}
</script>

<style scoped lang="less">
  .goodsbox{
    display: flex;
    position: absolute;
    top: 350/64rem;
    bottom: 120/64rem;
    width: 100%;
    overflow: hidden;
    .goods-l{
      flex: 0 0 160/64rem;
      li.on{
        background: #fff;
        color:rgb(7,17,27);
      }
      li{
        width: 160/64rem;
        height: 108/64rem;
        background: #f3f5f7;
        span{
          margin: 0 auto;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-wrap: wrap;
          width: 112/64rem;
          height: 100%;
          box-sizing: border-box;
          border-bottom: 1px solid;
          border-color: rgba(7,17,27,0.1);
          p{
            font-size: 24/64rem;
            color:#888b8e;
            i{
              display: inline-block;
              width: 24/64rem;
              height: 24/64rem;
              background-repeat: no-repeat;
              background-size: 24/64rem 24/64rem;
              background-position: 0 0;
            }
            i.special{
              background-image: url('./special_3@2x.png')
            }
            i.discount{
              background-image: url('./discount_3@2x.png')
            }
            i.decrease{
              background-image: url('./decrease_3@2x.png')
            }
          }
        }
      }
    }
    .goods-r{
      flex: 1;
      .foodItem{
        width: 100%;
        h3{
          padding-left: 24/64rem;
          box-sizing: border-box;
          border-left: 2px solid #d9dde1;
          height: 52/64rem;
          line-height: 52/64rem;
          background: #f3f5f7;
          font-size: 24/64rem;
          color:rgb(147,153,159)
        }
        .foodList:last-child{
          padding-bottom: 0.5625rem;
          border-bottom: 0;
        }
        .foodList{
          .add-box{
            right: 36/64rem;
            bottom: 36/64rem;
          }
          position: relative;
          padding-bottom: 36/64rem;
          padding:36/64rem;
          position: relative;
          display: flex;
          box-sizing: border-box;
          border-bottom: 1px solid;
          border-color: rgba(7,17,27,0.1);
          dt{
            height: 100%;
            margin-right: 20/64rem;
            img{
              width: 114/64rem;
              height: 114/64rem;
            }
          }
          dd{
            p{
              font-size: 28/64rem;
              color:rgb(7, 17, 27);
              line-height: 28/64rem;
            }
            span{
              font-size: 20/64rem;
              color:rgb(147,153,159);
              line-height: 20/64rem;
              margin: 16/64rem 0;
            }
            span.description{
              display: block;
            }
            span.sell{
              i{
                font-size: 20/64rem;
                color:rgb(147,153,159);
                line-height: 20/64rem;
                margin: 16/64rem 0;
                margin-left: 24/64rem;
              }
            }
            span.price{
              color:#ff0000;
              display: block;
              b{
                color:#ff0000;
                font-weight: 700;
              }
              i{
                color:rgb(147,153,159);
                margin-left: 16/64rem;
                text-decoration: line-through;
              }
            }
          }
        }
      }
    }
  }
  .morebox{
    display: none;
    width: 100%;
    max-height: 1032/64rem; 
    position: absolute;
    top: 0;
    bottom: 120/64rem;
    overflow: hidden;
    background: #fff;
    .more-header{
      width: 100%;
      height:750/64rem;
      .swlist{
        img{
          width: 100%;
          height: 750/64rem;;
        }
      }
    }
    .more-menu{
      position: relative;
      margin: 36/64rem 36/64rem 0 36/64rem;
      padding-bottom: 36/64rem;
      .toLast{
        position: absolute;
        right: 0;
        top: 0;
        width: 148/64rem;
        height: 48/64rem;
        text-align: center;
        line-height: 48/64rem;
        font-size: 20/64rem;
        color:rgb(255, 255, 255);
        background: rgb(0, 160, 220);
        border-radius: 24px;
      }
      h3{
        font-size: 28/64rem;
        font-weight: 700;
        color:rgb(7, 17, 27);
        line-height: 28/64rem;
      }
      .more-txt{
        margin-top: 16/64rem;
        margin-bottom:36/64rem;
        span{
          display: inline-block;
          font-size: 20/64rem;
          color:rgb(147,153,159);
          line-height: 20/64rem;
        }
        span.spr{
          margin-right: 24/64rem;
        }
      }
      .more-money{
        .more-moneyh{
          font-size: 28/64rem;
          font-weight: 700;
          color:rgb(240,20,20);
          margin-right: 20/64rem;
          line-height: 48/64rem;
          i{
            font-size: 20/64rem;
            color:rgb(240,20,20);
          }
        }
        .more-moneys{
          font-size: 20/64rem;
          font-weight: 700;
          color:rgb(147,153,159);
          line-height: 48/64rem;
          text-decoration: line-through;
        }
      }
      .more-btn{
        position: absolute;
        right: 0;
        bottom: 36/64rem;
        width: 148/64rem;
        height: 48/64rem;
        text-align: center;
        line-height: 48/64rem;
        font-size: 20/64rem;
        color:rgb(255, 255, 255);
        background: rgb(0, 160, 220);
        border-radius: 24px;
      }
    }
    .jg{
      width: 100%;
      height: 32/64rem;
      border-style: solid;
      border-color: #ccc;
      border-width:1px 0 1px 0;
      background: #f3f5f7;
    }
    .more-mid{
      margin: 36/64rem 36/64rem 0 36/64rem;
      padding-bottom: 36/64rem;
      h3{
        font-size: 28/64rem;
        font-weight: 700;
        color:#999;
        line-height: 28/64rem;
        margin-bottom: 12/64rem;
      }
      p{
        margin-left: 16/64rem;
        font-size: 24/64rem;
        font-weight: 200;
        color:rgb(77, 85, 93);
        line-height: 48/64rem;
        width: 100%;
      }
      .menu{
    width: 100%;
    height: 135/64rem;
    .menu-box{
      margin-left: 36/64rem;
      height: 136/64rem;
      width: 90%;
      border-bottom: 1px solid #ccc;
      span{
        display: inline-block;
        width: 120/64rem;
        height: 1rem;
        margin: 36/64rem 16/64rem 0;
        font-size: 24/64rem;
        text-align: center;
        line-height: 1rem;
        i{
          font-size: 15/64rem;
          margin-left: 5/64rem;
        }
      }
      span.all{
        background: #00a0dc;
        color:#ffffff;
      }
      span.en{
        background: #ccecf8;
        color: rgb(147,153,159); 
      }
      span.un{
        background: #e9ebec;
        color: rgb(147,153,159); 
      }
    }
  }
  .look{
    width: 100%;
    height: 97/64rem;
    border-bottom: 1px solid #ccc;
    display: flex;
    align-items: center;
    .log{
      margin-left: 36/64rem;
      margin-right: 10/64rem;
    }
    span{
      font-size: 24/64rem;
      color:#ccc;
    }
  }
  .evaluate{
    width: 100%;
    dl{
      display: flex;
      height: 120/64rem;
      margin:36/64rem;
      border-bottom: 1px solid #ccc;
      justify-content: space-between;
      dt{
        .more-evt{
          margin-bottom: 12/64rem;
          span{
            font-size: 20/64rem;
            color: rgb(147,153,159);
            line-height: 24/64rem;
          }
        }
        .more-evb{
          display: flex;
          align-items: center;
          i{
            display: block;
            width: 32/64rem;
            height: 32/64rem;
            font-size: 24/64rem;
            color:rgb(0,160,220);
            line-height: 32/64rem;
          }
          i.log-down{
            color: rgb(183,187,191) !important;
          }
          span{
            font-size: 24/64rem;
            color:rgb(7, 17, 27);
            line-height: 32/64rem;
            margin-left: 8/64rem;
          }
        }
      }
      dd{
        display: flex;
        align-items: center;
        span{
          font-size: 20/64rem;
          color: rgb(147, 153, 159);
          line-height: 24/64rem;
          margin-right: 12/64rem;
        }
        img{
          width: 24/64rem;
          height: 24/64rem;
        }
      }
    }
  }
    }
  }
</style>
