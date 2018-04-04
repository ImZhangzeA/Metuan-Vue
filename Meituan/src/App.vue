<template>
  <div id="app">
    <vheader></vheader>
    <div class="tab">
      <ul>
        <li><router-link to='/goods'>商品</router-link></li>
        <li><router-link to='/comment'>评价</router-link></li>
        <li><router-link to='/seller'>商家</router-link></li>
      </ul>
    </div>
    <keep-alive>
    <router-view :seller='seller' :rating='rating' :goods='goods'></router-view>
    </keep-alive>
  </div>
</template>

<script>
  import header from '@/components/header/header'
  import goods from '@/components/goods/goods'
  export default {
    name: 'App',
    data(){
      return {
        seller:{},
        rating:[],
        goods:[],
      }
    },
    components:{
      'vheader':header,
    },
    created(){
      this.$http.get('/api/seller').then((response)=>{
        if(response.data.err == 0){
          this.seller = response.data.data
        }
      })
      this.$http.get('/api/ratings').then((response)=>{
        if(response.data.err == 0){
          this.rating = response.data.data
        }
      })
      this.$http.get('/api/goods').then((response)=>{
        if(response.data.err == 0){
          this.goods = response.data.data
        }
      })
    },
    computed:{

    },
    // goods
  }
</script>

<style>
  .tab{
    height: 1.27rem;
    width: 100%;
  }
  .tab ul{
    height:1.27rem;
    width: 100%;
    display: flex;
    box-sizing:border-box;
    border-bottom: 1px solid;
    border-color: rgba(7,17,27,0.1);
  }
  .tab ul li{
    flex:1;
    line-height: 1.25rem;
    text-align: center; 
  }
  .tab ul li a{
    font-size: 0.4375rem;
    color:rgb(77,85,93);
  }
  .router-link-active{
    color: rgb(240,20,20) !important;
  }
</style>