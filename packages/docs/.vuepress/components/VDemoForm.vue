<template>
  <form action="">
    <input class="input" type="text" placeholder="姓名">
    <input class="input" type="text" placeholder="电话">
    <input class="input" type="text" placeholder="参加人数">
    <input class="input" type="text" placeholder="公司名字">
    <input class="input" type="text" placeholder="车牌号码">
  </form>
</template>

<script>
  export default {}
</script>

<style scoped>
  .input {
    box-sizing: border-box;
    width: 100%;
    height: 40px;
    padding: 8px;
    color: rgb(247, 217, 155);
    border-width: 1px;
    border-style: solid;
    border-color: rgb(247, 217, 155);
    border-radius: 0px;
    background-color: rgba(0, 0, 0, 0);
    text-align: left;
    font-weight: 400;
    font-size: 16px;
    line-height: 1.5;
    box-shadow: rgba(0, 0, 0, 0.5) 0px 0px 0px;
    margin-bottom: 10px;
    user-select: none;
  }

  .input::-webkit-input-placeholder {
    color: inherit;
  }

  .input:focus {
    outline: none;
  }
</style>