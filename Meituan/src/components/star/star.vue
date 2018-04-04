<template>
  <div class='star' :class="starSize">
      <span v-for='item in starsArr' :class="item"></span>
  </div>
</template>

<script>
export default {
    props:{
        size:{
           type:Number, 
        },
        score:{
            type:Number,
        },
    },
    name:'stars',
    computed:{
        starSize:function(){
            return 'star-'+this.size;
        },
        starsArr:function(){
            let result = []
            let integer = Math.floor(this.score)
            let decimal = this.score - integer
            for(let i=0;i<integer;i++){
                result.push('on')
            }
            if(decimal >= 0.5){
                result.push('half')
            }
            while (result.length <5) {
                result.push('off')    
            }
            return result
        }
    }
}
</script>

<style scoped lang="less">
    .star{
        span{
            display: inline-block;
            background-repeat: no-repeat;
        }
        span:last-child{
            margin-right: 0;
        }
    }
    .star-48 span{
        width: 48/64rem;
        height: 48/64rem;
        background-size:48/64rem 48/64rem;
         margin-right: 40/64rem;
    }
    .star-48 span.on{
        background-image: url('star48_on@2x.png');
    }
    .star-48 span.half{
        background-image: url('star48_half@2x.png');
    }
    .star-48 span.off{
        background-image: url('star48_off@2x.png');
    }
    .star-36 span{
        width: 36/64rem;
        height: 36/64rem;
        background-size:36/64rem 36/64rem;
        margin-right: 6/64rem;
        margin-left: 0 !important;
    }
    .star-36 span.on{
        background-image: url('star36_on@2x.png');
    }
    .star-36 span.half{
        background-image: url('star36_half@2x.png');
    }
    .star-36 span.off{
        background-image: url('star36_off@2x.png');
    }
    .star-24 span{
        width: 24/64rem;
        height: 24/64rem;
        background-size:24/64rem 24/64rem;
         margin-right: 28/64rem;
         margin-right: 6/64rem;
        margin-left: 0 !important;
    }
    .star-24 span.on{
        background-image: url('star24_on@2x.png');
    }
    .star-24 span.half{
        background-image: url('star24_half@2x.png');
    }
    .star-24 span.off{
        background-image: url('star24_off@2x.png');
    }
</style>
