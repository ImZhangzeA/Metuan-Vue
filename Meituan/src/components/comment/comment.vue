<template>
  <div class="box" ref="boxscroll">
    <div>
      <div class="comm">
        <div class="comm-header">
          <div class="comm-hl">
            <i></i>
            <h3>{{seller.score}}</h3>
            <p class="t2">综合评分</p>
            <p class="t3">高于周边商家{{seller.rankRate}}%</p>
          </div>
          <div class="comm-hr">
            <div class="comm-hrcon">
              <dl>
                <dt>服务态度</dt>
                <dd>
                  <star :size='36' :score='seller.score'></star>
                  <p>{{seller.score}}</p>
                </dd>
              </dl>
              <dl>
                <dt>商品评分</dt>
                <dd>
                  <star :size='36' :score='seller.foodScore'></star>
                  <p>{{seller.foodScore}}</p>
                </dd>
              </dl>
              <dl>
                <dt>送达时间</dt>
                <dd>
                  <div class="time">{{seller.deliveryTime}}分钟</div>
                </dd>
              </dl>
            </div>
          </div>
        </div>
        <div class="jg"></div>
        
        <div class="menu">
          <div class="menu-box">
            <span class="all">全部<i>{{rating.length}}</i></span>
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
            <dl v-for="item in rating">
              <dt>
                <img :src="item.avatar">
              </dt>
              <dd>
                <p class="name">{{item.username}}</p>
                <div class="timer">
                    <star :size='24' :score='item.score'></star>            
                    <span>{{item.deliveryTime}}分钟送达</span>
                </div>
                <div class="txt">{{item.text}}</div>
                <div class="eva-log">
                  <i class="log-up iconfont icon-thumb_up" :class="{'log-down':item.rateType>0}"></i>
                  <span v-for="items in item.recommend">{{items}}</span>
                </div>
              </dd>
            </dl>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  // import footers from '@/components/footer/footer'
  import stars from '@/components/star/star'
  import bs from 'better-scroll'
  export default{
    name:'comment',
    props:{
      seller:{
        type:Object
      },
      rating:{
        type:Array
      },
    },
    components:{
      'star':stars,
      // 'footers':footers
    },
    computed:{
      ennum(){
        let aaa = 0
        for(let i=0;i<this.rating.length;i++){
          if(this.rating[i].score >=4){
            aaa ++
          }
        }
        return aaa
      },
      unnum(){
        let unnum =0;
        for(let i=0;i<this.rating.length;i++){
          if(this.rating[i].score <4){
            unnum++
          }
        }
        return unnum
      },
    },
    methods:{
      initScroll(){
        this.evaluScroll = new bs(this.$refs.boxscroll,{
          click:true
        })
      },
    },
    created(){
      this.$nextTick(function(){
        this.initScroll()
      })
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
  }
  .comm-header{
    width: 100%;
    height: 204/64rem;
    display: flex;
    border-bottom: 1px solid #e6e7e8;
    .comm-hl{
      width: 36.7%;
      height: 100%;
      position: relative;
      i{
        width: 1px;
        height: 140/64rem;
        position: absolute;
        top: 36/64rem;
        right: 0;
        background: #ccc;
      }
      h3{
        margin-top: 36/64rem;
        text-align: center;
        font-size: 48/64rem;
        line-height: 56/64rem;
      }
      .t2{
        text-align: center;
        margin-top: 12/64rem;
        font-size: 24/64rem;
        color:rgb(7,17,27);
        line-height: 24/64rem;
        margin-bottom: 16/64rem;
      }
      .t3{
        font-size: 20/64rem;
        color:#ccc;
        line-height: 20/64rem;
        text-align: center;
      }
    }
    .comm-hr{
      width: 63.3%;
      height: 100%;
      .comm-hrcon{
        margin-left: 30/64rem;
        margin-top: 36/64rem;
        dl{
          margin-bottom: 16/64rem;
          dt{
            font-size: 24/64rem;
            color: rgb(7,17,27);
            line-height: 36/64rem;
            margin-right: 20/64rem;
            float: left;
          }
          dd{
            position: relative;
            height: 36/64rem;
            .time{
              font-size: 24/64rem;
              color: rgb(147,153,159);
              line-height: 36/64rem;
            }
            .star{
              float: left;
            }
            p{
              position: absolute;
              top: 0;
              right: -30/64rem;
              margin-left: 24/64rem;
              margin-right: 48/64rem;
              font-size: 24/64rem;
              color: rgb(255,153,0);
              line-height: 36/64rem;
            }
          }
        }
      }
    }
  }
  .jg{
    height: 0.2rem;
    width: 100%;
    background: #f3f5f7;
    border-bottom: 1px solid #e6e7e8;
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
      height: 216/64rem;
      margin:36/64rem;
      border-bottom: 1px solid #ccc;
      dt{
        width: 56/64rem;
        height: 100%;
        float: left;
        img{
          width: 56/64rem;
          height: 56/64rem;
        }
      }
      dd{
        float: left;
        margin-left: 24/64rem;
        p.name{
          font-size: 20/64rem;
          color: rgb(7,17,27);
          line-height: 24/64rem;
          margin-bottom: 8/64rem;
        }
        .timer{
          margin-bottom: 12/64rem;
          display: flex;
          align-items: center;
          span{
            font-size: 20/64rem;
            font-weight: 200;
            color:rgb(147,153,159);
            line-height: 24/64rem;
            margin-left: 12/64rem;
          }
        }
        .txt{
          width: 500/64rem;
          font-size: 24/64rem;
          color: rgb(7,17,27);
          line-height: 36/64rem;
        }
        .eva-log{
          display: flex;
          align-items: center;
          height: 32/64rem;
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
            display: block;
            width: 80/64rem;
            height: 30/64rem;
            box-sizing: border-box;
            border:1px solid;
            border-color: rgba(7,17,27,0.1);
            border-radius: 2px;
            text-align: center;
            line-height: 30/64rem;
            font-size: 18/64rem;
            color:rgb(147,153,159);
            overflow: hidden;
            text-overflow:ellipsis;
            white-space: nowrap;
          }
        }
      }
    }
  }
</style>
