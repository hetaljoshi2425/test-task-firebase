<template>
    <div class="vue-component" id="app">
        <h3>User's data Users Id  : {{$attrs.userData.uid}}</h3>
        <ul>
            <li v-for="(item, key) in $attrs.userData">
                {{ key }} : {{ item }}
            </li>
        </ul>
    </div>
</template>
<script>


</script>
<style scoped>

</style>
