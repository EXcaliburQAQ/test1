<template>
  <div class="main">
    <table class="main-table">
      <thead :class="'main-table-head'" >
        <td v-for="item in column" :key="item.id" v-on:click="sort(item.id)" :width="item.width">{{item.name}}</td>
      </thead>
      <tbody>
        <tr v-for="(row, rowIndex) in tableData" :key="row.id" :class="['main-table-row', {'hover': focus === rowIndex}]" v-on:mouseenter="setFocus(rowIndex)">
          <td :class="'main-table-body__cell'" v-for="col in column" :key="`${row.id}-${col.id}`">
            <span v-if="col.type==='num'" :class="{positive: row[col.id] > 0, negative: row[col.id] < 0}">{{(row[col.id]*100).toFixed(2)}}%</span>
            <span v-else-if="col.type === 'count'" :class="'count'">{{row[col.id]}}</span>
            <span v-else>{{row[col.id]}}</span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import {getData, column} from '../data/table';
import {debounce} from '../util/util';
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data() {
    return {
      column: column,
      start: 0,
      sortField: '',
      tableData: [],
      focus: null
    };
  },
  created() {
    this.initTableData();
  },
  mounted() {
    window.addEventListener('scroll', debounce(this.scrollHandler, 30));
    window.addEventListener('keydown', this.keyDownHandler)
  },
  methods: {
    initTableData: function() {
      this.tableData = getData(0, 50);
    },
    readMoreData: function() {
      this.tableData = this.tableData.concat(getData(this.tableData.length, 10));
    },
    sort: function(id) {
      if (this.sortField === id){
        this.tableData.reverse();
      } else {
        this.sortField = id;
        this.tableData = this.tableData.sort((a,b) => b[id]-a[id]);
      }
    },
    setFocus: function(index) {
      if (index >= 0 && index < this.tableData.length) {
        this.focus= index;
      }
    },
    scrollHandler: function() {
      if (document.documentElement.scrollHeight === document.documentElement.scrollTop + window.innerHeight) {
        this.readMoreData();
      }
    },
    keyDownHandler: function(event) {
      switch(event.keyCode) {
        case 38:
          this.setFocus(this.focus -1);
          break;
        case 40:
          this.setFocus(this.focus + 1);
          break;
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  @import '../style/table.scss';
</style>
