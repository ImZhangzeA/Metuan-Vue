<template>
  <div class="add-box">
      <transition name="move">
      <div class="reduce iconfont icon-remove_circle_outlin" @click="reduce" v-show="foods.num>0"></div>
      </transition>
      <div class="num" v-show="foods.num>0"><p>{{foods.num}}</p></div>
      <div class="add iconfont icon-add_circle" @click="add">

      </div>
  </div>
</template>

<script>
import Vue from 'vue'
export default {
  props:{
      foods:{
          type:Object
      }
  },
  methods:{
      add(){
          if(!this.foods.num){
              Vue.set(this.foods,'num',1)
          }else{
              this.foods.num ++
          }
      },
      reduce(){
          if(this.foods.num){
              this.foods.num --
          }
      },
  }
}
</script>

<style lang="less">
    .add-box{
        position: absolute;
        display: flex;
        height: 48/64rem;
        line-height: 48/64rem;
        .reduce{
            display: inline-block;
            font-size: 48/64rem;
            color:rgb(0,160,220);
            transition: all 0.5s;
            transform: translate3d(0,0,0);
            &.move-enter-active,&.move-leave-active{
                transition: all 0.5s;
            }
            &.move-enter,&.move-leave-active{
                opacity: 0;
                transform: rotate(180deg) translate3d(-48/64rem,0,0);
            }
        }
        .add{
            display: inline-block;
            font-size: 48/64rem;
            color:rgb(0,160,220);
           
        }
        .num{
            p{
                display: flex;
                align-items: center;
                justify-content: center;
                height: 48/64rem;
                font-size: 20/64rem;
                color:rgb(147,153,159);
            }
            display: inline-block;
            height: 28/64rem;
            width: 48/64rem;
        }
    }
</style>

