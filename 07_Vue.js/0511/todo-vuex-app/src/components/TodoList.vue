<template>
  <div>
    <h2>Todo List</h2>
    <todo-list-item
    v-for="todo in todos"
    :key="todo.date"
    :todo="todo"></todo-list-item>
  </div>
</template>

<script>
import TodoListItem from '@/components/TodoListItem.vue'

import {mapState} from 'vuex'

export default {
  name: 'TodoList',
  components: {TodoListItem},
  computed: {
    ...mapState(['todos'])
  },


}
</script>

<style>

</style>