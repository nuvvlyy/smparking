<template>
  <div class="mt-5">
    <nav aria-label="Page navigation example">
      <div class="pagination overflow-auto justify-content-center ">
        <div>
          <b-pagination v-model="currentPage" :total-rows="rows" :per-page="perPage" first-number></b-pagination>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  data() {
    return {
      rows: 100,
      perPage: 1,
      currentPage: 4
    };
  }
};
</script>
<style lang="scss">
</style>