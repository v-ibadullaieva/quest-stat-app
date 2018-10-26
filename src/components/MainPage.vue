<template>
  <div v-if="error" class="error">
    {{ error }}
  </div>
  <div v-else>
    <div class="table">
      <div v-for="(quest, i) in quests"  v-bind:key="i" class="table-col">
        <div class="table-head">{{ quest.alias }}</div>
        <router-link v-bind:to="`/quest/${quest.globalId}`" class="link">
          <i v-bind:class="statusToIcon[quest.status]"></i>
        </router-link>
      </div>
    </div>
    <input type="file" />
  </div>
</template>

<script>

import { getQuests } from '../api.js';

export default ({
  name: 'MainPage',
  data () {
    return {
      quests: [],
      statusToIcon: {
        SUCCESS: 'icon-check',
        CRASH: 'icon-cross',
        NO_DATA: 'icon-hyphen'
      },
      error: null
    }
  },
  async created () {
    const getQuestData = async () => {
      try {
        this.quests = await getQuests()
      }  
      catch (err) {
        this.error = err.toString();
      }
    };

    getQuestData();
    this.interval = setInterval(getQuestData, 3000);
  },
  beforeDestroy () {
    clearInterval(this.interval);
  }
})

</script>

<style scoped>
  .table {
    display: flex;
    justify-content: space-around;
    border: 1px solid black;
  }
  .table-col {
    display: flex;
    flex-direction: column;
    width: calc(100% / 3);
    border-right: 1px solid black;
  }
  .table-col:last-child {
    border-right: none;
  }
  .table-head {
    padding: 10px;
    border-bottom: 1px solid black;
  }
  .link {
    display: block;
    height: 100%;
    text-decoration: none;
    padding: 5px;
  }
  .link:hover {
    background-color: aliceblue;
  }
  .icon-check {
    font-size: 22px;
    color: green;
    position: relative;
  }
  .icon-check:before {
    content: '\2713';
    display: block;
  }
  .icon-cross {
    font-size: 20px;
    color: red;
  }
  .icon-cross:before {
    content: '\2613';
    display: block;
  }
  .icon-hyphen {
    font-size: 30px;
  }
  .icon-hyphen:before {
    content: '-';
    display: block;
  }
</style>
