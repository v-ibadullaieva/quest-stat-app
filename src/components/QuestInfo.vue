<template>
  <div v-if="!isLoading">
    <div v-if="error" class="error">
      {{ error }}
    </div>

    <div v-else>
      <component v-if="quest.status === 'NO_DATA'" v-bind:is="'noData'"></component>

      <div v-else>
        <div class="table">
          <div class="table-col">
            <span class="table-head">Build ID</span>
            <span>{{ quest.globalId }}</span>
          </div>
          <div class="table-col">
            <span class="table-head">Platform</span>
            <span>{{ quest.platform }}</span>
          </div>
          <div class="table-col">
            <span class="table-head">Quest Name</span>
            <span>{{ quest.name }}</span>
          </div>
        </div>

        <p>Pathways</p>

        <div class="path-wrap">
          <div class="path-info">
            <span>Status</span>
            <span class="path-txt">{{ quest.pathway.status }}</span>
          </div>
          <div class="path-info">
            <span>Path name</span>
            <span class="path-txt">{{ quest.pathway.name }}</span>
          </div>
          <div class="path-info">
            <span>Leafs info</span>
            <span class="path-txt d-flex">
              <span v-for="(quest, i) in quest.pathway.leafs" v-bind:key="i" class="d-flex icon-wrap">
                <i v-bind:class="quest.isCompleted ? 'icon-check' : 'icon-cross'"></i>
                <i class="icon-arrow">→</i>
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import { getQuest } from '../api';

export default ({
  name: 'QuestInfo',
  components: {
    'noData': () => import('./NoData.vue')
  },
  data () {
    return {
      isLoading: false,
      quest: null,
      error: null
    }
  },
  async created () {
    await this.fetchData(this.$route.params.id);
  },
  methods: {
    toggleIsLoading () {
      this.isLoading = !this.isLoading;
    },

    async fetchData (id) {
      this.error = this.quest = null;
      this.toggleIsLoading();
      try {
        this.quest = await getQuest(id);
      }
      catch (err) {
        this.error = err.toString();
      }
      this.toggleIsLoading();
    }
  }
})

</script>

<style scoped>
  .error {
    color: red;
  }
  .d-flex {
    display: flex;
  }
  .table {
    display: flex;
    justify-content: space-around;
    border: 1px solid black;
    margin-bottom: 50px;
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
    font-weight: 600;
    padding: 10px;
    border-bottom: 1px solid black;
  }
  .path-wrap {
    display: flex;
  }
  .path-info {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
  }
  .path-info > span:nth-child(2) {
    height: 40px;
    background-color: aliceblue;
    border-top: 1px solid black;
    padding: 25px;
  }
  .path-txt span {
    padding: 0 5px;
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
  .icon-arrow {
    color: cadetblue;
  }
  .icon-wrap:last-child .icon-arrow{
    display: none;
  }
</style>
