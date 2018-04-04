<template>
  <div class="header">
    <div class="header-box">
      <img :src='msg.avatar' class="himg"/>
      <div class="header-r">
        <p>
          <span><img src="./brand@2x.png"></span>
          <b>{{msg.name}}</b>
        </p>
        <div class="header-m">
          {{msg.description}}/{{msg.deliveryTime}}分钟送达
        </div>
        <div class="support">
          <span class="icon" :class='classArr[msg.supports[0].type]'></span>
          <span class="text">{{msg.supports[0].description}}</span>
        </div>
        <div class="header-more">
          <span>{{msg.supports.length}}个</span>
          <i @click="tomore">＞</i>
        </div>
      </div>
    </div>
    <div class="bg">
      <img :src="msg.avatar" width="100%" height="100%" />
    </div>
    <div class="header-notice">
      <span>
        <img src="./bulletin@2x.png" width="44/64rem" height="24/64rem" />
        <p>{{msg.bulletin}}</p>
        <i @click="tomore">></i>
      </span>
    </div>
    <div class="detail clearfix" ref="detail">
      <div class="detail-wrap">
        <div class="detail-cont">
          <p>{{msg.name}}</p>
          <div class="star-con">
            <stars :size='48' :score='msg.score'></stars>
          </div>
          <div class="detail-mid">
            <i></i>
            <a>优惠信息</a>
            <i></i>
          </div>
          <div class="detail-contcon">
            <span v-for="item in msg.supports">
              <i :class="delArr[item.type]"></i>
              <a>{{item.description}}</a>
            </span>
          </div>
          <div class="detail-mid">
            <i></i>
            <a>商家公告</a>
            <i></i>
          </div>
          <div class="detext">
            <p>{{msg.bulletin}}</p>
          </div>
        </div>
      </div>
      <div class="detail-close" @click="toLast">
        ×
      </div>
    </div>
  </div>
</template>

<script>
import stars from '@/components/star/star'
export default{
  name:'header',
  data(){
    return{
      msg:{}
    }
  },
  created:function(){
    var _this = this
    this.$http.get('/api/seller').then(function(response){
      if(response.data.err == 0){
        _this.msg = response.data.data
      }
    })
    this.classArr=['decrease','discount','special','invoice','guarantee'];
    this.delArr=['decrease','discount','special','invoice','guarantee'];
  },
  components:{
    stars:stars
  },
  methods:{
    tomore(){
      this.$refs.detail.style.display = 'block';
    },
    toLast(){
      this.$refs.detail.style.display = 'none';
    },
  }
}
</script>
<style scoped lang="less">
  .header{
    position: relative;
    width: 100%;
    height:220/64rem;
    padding-top: 48/64rem;
    background-color: rgba(7,17,27,0.5);
    .bg{
      position: absolute;
      left: 0;
      top: 0;
      z-index: -1;
      width: 100%;
      height: 268/64rem;
      filter: blur(10px);
    }
    .header-box{
      display: flex;
      height: 128/64rem;
      margin-right: 24/64rem;
      margin-left: 48/64rem;
      .himg{
        flex:0 0;
        width: 128/64rem;
        height: 128/64rem;
        margin-right: 32/64rem;
      }
      .header-r{
        position: relative;
        flex:1;
        height: 128/64rem;
        margin: 4/64rem 0; 
        p{
          display: flex;
          align-items: center;
          margin-bottom: 16/64rem;
          span{
            display: inline-block;
            height: 36/64rem;
            margin-right:12/64rem;
          }
          img{
            height: 36/64rem;
            width: 60/64rem;
          }
          b{
            font-size: 32/64rem;
            color:rgb(255,255,255);
            font-weight: bold;
            line-height: 36/64rem;
          }
          height: 36/64rem;
        }
        .header-m{
          font-size: 24/64rem;
          color:rgb(255,255,255);
          font-weight: 200;
          line-height: 24/64rem;
          margin-bottom: 20/64rem;
        }
        .support{
          height: 24/64rem;
          .text{
            display: block;
            height: 24/64rem;
            font-size: 20/64rem;
            color:rgb(255,255,255);
            font-weight: 200;
            line-height: 24/64rem;
          }
          .icon{
            float: left;
            width: 24/64rem;
            height: 24/64rem;
            margin-right: 8/64rem;
            background-repeat: no-repeat;
            background-size: 24/64rem 24/64rem;
            background-position: 0 0;
          }
          .decrease{
            background-image: url('decrease_1@2x.png');
          }
          .discount{
            background-image: url('discount_1@2x.png');
          }
          .guarantee{
            background-image: url('guarantee_1@2x.png');
          }
          .invoice{
            background-image: url('invoice_1@2x.png');
          }
          .special{
            background-image: url('special_1@2x.png');
          }
        }
        .header-more{
          position: absolute;
          right: 24/64rem;
          bottom: 8/64rem;
          width: 96/64rem;
          height: 48/64rem;
          border-radius: 10px;
          background: rgba(0,0,0,0.2);
          span{
            display: inline-block;
            margin-left: 16/64rem;
            height: 48/64rem;
            font-size: 20/64rem;
            color:rgb(255,255,255);
            font-weight: 200;
            line-height: 48/64rem;
          }
          i{
            display: inline-block;
            margin-right: 16/64rem;
            height: 48/64rem;
            font-size: 20/64rem;
            color:rgb(255,255,255);
            font-weight: 200;
            line-height: 48/64rem;
            cursor: pointer;
          }
        }
      }
    }
    .header-notice{
          position: absolute;
          bottom: 0;
          left: 0;
          height:56/64rem;
          width: 100%;
          span{
            display: flex;
            align-items: center;
            // width: 100%;
            height: 56/64rem;
            background:rgba(7,17,27,0.2);
            img{
              margin-right: 8/64rem;
              margin-left: 24/64rem;
            }
            p{
              font-size:20/64rem;
              font-weight: 200;
              line-height: 56/64rem; 
              margin-right: 8/64rem;
              color: #fff;
              font-weight: 200;
              overflow: hidden;
              text-overflow:ellipsis;
              white-space: nowrap;
            }
            i{
              font-size:20/64rem;
              font-weight: 200;
              line-height: 56/64rem; 
              margin-right: 24/64rem;
              color: #fff;
              font-weight: 200;
              cursor: pointer;
            }
          }
        }
        .clearfix{
          display: inline;
        }
        clearfix:after{
          content: '.';
          display: block;
          height: 0;
          clear: both;
          visibility: hidden;
        }
        .detail{
          display: none;
          position:fixed;
          left: 0;
          top: 0;
          background:rgba(7,17,27,0.8);
          width: 100%;
          height: 100%;
          overflow: auto;
          z-index: 10;
          .detail-wrap{
            width: 100%;
            min-height: 88%;
            .detail-cont{
              margin-top: 128/64rem;
              padding-bottom: 128/64rem;
              .star-con{
                text-align: center;
                margin-bottom: 56/64rem;
              }
              .detail-mid{
                margin: 0 auto;
                width: 608/64rem;
                display: flex;
                align-items: center;
                height: 28/64rem;
                i{
                  width: 224/64rem;
                  height: 1px;
                  background: rgba(255,255,255,0.2)
                }
                a{
                  margin: 0 24/64rem;
                  font-size: 28/64rem;
                  font-weight: 700;
                  color: rgb(255,255,255);
                  line-height: 24/64rem;
                }
              }
              .detail-contcon{
                margin-top: 48/64rem;
                margin-bottom: 56/64rem;
                span{
                  margin-left: 24/64rem;
                  margin-bottom: 24/64rem;
                  height: 32/64rem;
                  display: flex;
                  align-items: center;
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
                    color: rgb(255,255,255);
                    line-height: 24/64rem;
                  }
                }
              }
              .detext{
                padding-top: 48/64rem;
                width: 608/64rem;
                margin: 0 auto;
                p{
                  margin-left: 24/64rem;
                  font-size: 24/64rem;
                  font-weight: 200;
                  color: rgb(255,255,255);
                  line-height: 48/64rem;
                  text-align: left;
                }
              }
            }
          }
          p{
            font-size: 32/64rem;
            text-align: center;
            font-weight: 700;
            color:rgb(255,255,255);
            line-height: 32/64rem;
            margin-bottom: 32/64rem;
          }
          .detail-close{
            font-size: 64/64rem;
            color:rgba(255,255,255,0.5);
            position: relative;
            width: 64/64rem;
            height: 64/64rem;
            margin: -2rem auto 0;
            clear: both; 
            font-size: 64/64rem;
          }
        }
  }
</style>
