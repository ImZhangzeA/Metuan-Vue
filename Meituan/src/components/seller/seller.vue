<template>
  <div class="box" ref="boxscroll">
    <div>
      <div class="seller-header">
        <div class="seller-menu">
          <div class="seller-l">
            <h3>{{seller.name}}</h3>
            <div class="sbox">
              <star :size='36' :score='seller.score'></star>
              <span class="num">({{seller.ratingCount}})</span>              
              <span class="snum">月售{{seller.sellCount}}单</span>              
            </div>
          </div>
          <div class="seller-r">
            <i class="iconfont icon-favorite"></i>
            <p>已收藏</p>
          </div>
        </div>
        <div class="seller-bm">
          <span>
            <p>起送价</p>
            <i class="m">{{seller.minPrice}}</i><i>元</i>
          </span>
          <span class="mid">
            <p>商家配送</p>
            <i class="m">{{seller.deliveryPrice}}</i><i>元</i>
          </span>
          <span>
            <p>平均配送时间</p>
            <i class="m">{{seller.deliveryTime}}</i><i>元</i>
          </span>
        </div>
      </div>
      <div class="jg"></div>
      <div class="sell-mid">
        <div class="sell-midhead">
          <h3>公告与活动</h3>
          <p>{{seller.bulletin}}</p>
          <ul>
            <li v-for="item in seller.supports">
              <i :class="delArr[item.type]"></i>
              <a>{{item.description}}</a>
            </li>
          </ul>
        </div>
      </div>
      <div class="jg"></div>
      <div class="sell-imgs">
        <div class="sell-imgsbox">
          <h3>商家实景</h3>
          <div class="imgs-box">
            <swiper :options="swiperOption">
                <swiper-slide v-for="tag in seller.pics" class="swlist">
                  <img :src="tag" class="swimg">
                </swiper-slide>
            </swiper>
          </div>
        </div>
      </div>
      <div class="jg"></div>
      <div class="sell-midhead">
        <h3>商家信息</h3>
        <ul>
          <li v-for="item in seller.infos">
            <span class="cots">{{item}}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import stars from '@/components/star/star'
import bs from 'better-scroll'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default{
  name:'seller',
  props:{
    seller:{
      type:Object
    }
  },
  components:{
    'star':stars,
    swiper,
    swiperSlide
  },
  data(){
    return{
      swiperOption:{
        slidesPerView: 2,
        
      },
    }
  },
  methods:{
    initScrolls(){
      this.boxscroll = new bs(this.$refs.boxscroll,{
        click:true
      })
    },
  },
  created(){
    this.$nextTick(function(){
      this.initScrolls()
    })
    this.delArr=['decrease','discount','special','invoice','guarantee'];    
  },
}
</script>

<style lang="less">
  .box{
    width: 100%;
    height: 12.5rem;
    position: absolute;
    top: 5.46875rem;
    bottom: 1.875rem;
    overflow: hidden;
    .seller-header{
      width: 100%;
      height: 301/64rem;
      padding-bottom: 36/64rem;
      border-bottom: 1px solid #ccc;
      .seller-menu{
        margin: 36/64rem 36/64rem 0 36/64rem;
        padding-bottom: 36/64rem;
        height: 80/64rem;
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid #ccc;
        .seller-l{
          h3{
            font-size: 28/64rem;
            color: rgb(7,17,27);
            line-height: 28/64rem;
            margin-bottom: 16/64rem;
          }
          .sbox{
            display: flex;
            align-items: center;
            span{
              font-size: 20/64rem;
              color: rgb(77,85,93);
              line-height: 36/64rem;
            }
            span.num{
              margin-left: 16/64rem;
            }
            span.snum{
              margin-left: 24/64rem;
            }
          }
        }
        .seller-r{
          height: 100%;
          text-align: center;
          i{
            margin-right: 36/64rem;
            font-size: 48/64rem;
            color:rgb(240,20,20);
            line-height: 48/64rem;
            margin-bottom: 8/64rem;
          }
          p{
            margin-right: 36/64rem;
            font-size: 20/64rem;
            color: rgb(77,85,93);
            line-height: 20/64rem;
          }
        }
      }
      .seller-bm{
          margin: 36/64rem 36/64rem 0 36/64rem;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 148/64rem;
          span{
            display: block;
            width: 250/64rem;
            box-sizing: border-box;
            text-align: center;
            p{
              font-size: 20/64rem;
              color:rgb(147,153,159);
              line-height: 20/64rem;
              margin-bottom: 16/64rem;
            }
            i.m{
              font-size: 48/64rem;
              font-weight: 200;
              color: rgb(7,17,27);
              line-height: 40/64rem;
            }
          }
          span.mid{
            border-width:0 1px 0 1px;
            border-style:solid;
            border-color: #ccc;
          }
        }
    }
    .jg{
      width: 100%;
      height: 32/64rem;
      background: #f3f5f7;
      border-bottom: 1px solid #e6e7e8;
    }
    .sell-mid{
      width: 100%;
      border-bottom: 1px solid #ccc;
    }
    .sell-midhead{
      margin: 36/64rem 36/64rem 0 36/64rem;
      h3{
        font-size: 28/64rem;
        color: rgb(7,17,27);
        line-height: 28/64rem;
      }
      span.cots{
        font-size: 24/64rem;
        font-weight: 200;
        color:rgb(7,17,27);
        line-height: 32/64rem;
      }
      p{
        margin: 16/64rem 24/64rem 32/64rem;
        font-size: 24/64rem;
        font-weight: 200;
        color: rgb(240,20,20);
        line-height: 48/64rem;
      }
      ul{
        margin: 36/64rem 36/64rem 0 36/64rem;
        padding-bottom: 60/64rem;
        li:first-child{
          border-width:1px 0 1px 0;
          border-style:solid;
          border-color:rgba(7,17,27,0.1);

        }
        li{
          width: 100%;
          height: 96/64rem;
          display: flex;
          align-items: center;
          border-bottom: 1px solid;
          border-color: rgba(7,17,27,0.1);
          i{
            display: inline-block;
            width: 32/64rem;
            height: 32/64rem;
            margin-left: 24/64rem;
            background-repeat: no-repeat;
            background-size: 32/64rem 32/64rem;
            background-position: 0 0;
          }
          i.decrease{
            background-image: url('decrease_2@2x.png');
          }
          i.special{
            background-image: url('special_2@2x.png');
          }
          i.invoice{
            background-image: url('invoice_2@2x.png');
          }
          i.discount{
            background-image: url('discount_2@2x.png');
          }
          i.guarantee{
            background-image: url('guarantee_2@2x.png');
          }
          a{
            margin-left: 12/64rem;
            font-size: 24/64rem;
            font-weight: 200;
            color: rgb(7,17,27);
            line-height: 24/64rem;
          }
        }
        li:last-child{
          border:0;
        }
      }
    }
    .sell-imgs{
      width: 100%;
      height: 304/64rem;
      border-bottom: 1px solid #ccc;
      .sell-imgsbox{
        margin: 36/64rem 36/64rem 0 36/64rem;
        h3{
          font-size: 28/64rem;
          color: rgb(7,17,27);
          line-height: 28/64rem;
          margin-bottom: 24/64rem;
        }
        .imgs-box{
          max-width: 624/64rem;
          height: 180/64rem;
          .swlist{
            width: 240/64rem !important;
            height: 180/64rem;
            margin-right: 0.4rem;
          }
          .swimg{
            width: 240/64rem;
            height: 180/64rem;
          }
        }
      }
    }
  }
</style>
