<template>
  
    <div class="containner">
        <div class="center">

            <h2 class="my-5">Recommend Slot</h2>
            <p class="display-1" style="color:black">{{recommendSlot}}</p>
        </div>

   
</div>
  

   
</template>
<script>
export default {
 computed:{
     recommendSlot(){
         return this.$store.state.recommendSlot
     }
 }
}
</script>
<style lang="scss">
    
.center {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
html, 
body {
    margin: 0;
    padding: 0;
    background-color:#aebfbe;
}
</style>