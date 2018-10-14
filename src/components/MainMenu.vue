<template>
  <div id="mainMenu" :class="status?'true':'false'">
    <div class="header">
      <img src="../assets/wumpus.svg">
      <h1>WUMPUS</h1>
    </div>
    <div class="text">
      <img src="../assets/player.svg">
      <p>
        THE HUNT IS ABOUT TO BEGIN...<br>
        UABCS | DASC | IDS | 7mo | IA<br>
        MIGUEL PARRA GARCÍA
      </p>
    </div>
    <div :class="'press'+(classEffect?' hight':'')">
      <img src="../assets/bat.svg">
      <h3>
        PRESS ENTER TO BEGIN 
      </h3>
      <img src="../assets/bat.svg">
    </div>
    <!-- <img class="bat" src="../assets/bat.svg"> -->
  </div>
</template>

<script>
export default {
  name: 'MainMenu',
  props: ['status'],
  data(){
    return {
      classEffect: true
    }
  },
  mounted(){
    setInterval(() => {
      this.classEffect = !this.classEffect
    }, 500)
  }
}
</script>

<style lang="scss" scoped>

#mainMenu.true{
  display: flex;
}

#mainMenu.false{
  display: none;
}

#mainMenu{
  width: 100%;
  height: 100%;;
  max-width: 600px;
  max-height: 600px;
  background: #E5E5E5;
  border: solid 15px #5A35FE;
  position: relative;
  padding: 20px;
  justify-content: center;
  justify-items: center;
  align-content: center;
  align-items: center;
  .text{
    display: flex;
    justify-content: center;
    justify-items: center;
    align-content: center;
    align-items: end;
    >img{
      max-width: 80px;
    }
    >p{
      font-size: 30px;
      color: #5A35FE;
      padding-left: 10px;
    }
  }
  .press{
    position: absolute;
    text-align: center;
    bottom: 50px;
    width: 100%;
    display: flex;
    justify-content: center;
    justify-items: center;
    align-content: center;
    align-items: center;
    transition: all ease 0.5s;
    opacity: 1;
    h3{
      font-size: 25px;
      display: inline-block;
      color: #26A92C;
    }
    img{
      margin: 0 10px;
      max-width: 50px;
    }
  }
  .hight{
    opacity: .5;
  }
  .header{
    display: flex;
    justify-content: center;
    align-content: center;
    justify-items: center;
    align-items: center;
    position: absolute;
    top: 50px;
    width: 100%;
    >img{
      max-width: 100px;
      margin-right: 10px;
    }
    h1{
      margin-left: 10px;
      font-size: 100px;
      text-align: center;
      color: #CD5D23;
    }
  }
}
</style>
