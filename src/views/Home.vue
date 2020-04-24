<template>
  <div class="home container bg-white">
    <!-- <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />-->
    <div class="row h-100 d-inline-flex p-2">
      <div class="col-sm-12 my-auto">
        <img src="/png/bg1.png" class="img-fluid" alt="ตั้งใจทำงานอีสัส" width="500px" />
        <h1 class="title">Login</h1>
        <a
          class="btn btn-warning btn-login m-2"
          type="submit"
          data-toggle="modal"
          data-target="#login"
        >Login</a>
      </div>
      <div class="col">
        <router-link to="/config" tag="button" class="btn btn-danger m-2">To Config</router-link>
        <button class="btn btn-primary" @click="resetDB">Reset Database</button>
      </div>
    </div>

    <login></login>
  </div>
</template>

<script>
import Login from "@/components/Login.vue";
import { db } from "../firebase";
export default {
  name: "Home",
  components: { Login },

  methods: {
    resetDB() {
      function deleteCollection(db, collectionPath, batchSize) {
        let collectionRef = db.collection(collectionPath);
        let query = collectionRef.orderBy("floors").limit(batchSize);

        return new Promise((resolve, reject) => {
          deleteQueryBatch(db, query, resolve, reject);
        });
      }

      function deleteQueryBatch(db, query, resolve, reject) {
        query
          .get()
          .then(snapshot => {
            // When there are no documents left, we are done
            if (snapshot.size === 0) {
              return 0;
            }

            // Delete documents in a batch
            let batch = db.batch();
            snapshot.docs.forEach(doc => {
              batch.delete(doc.ref);
            });

            return batch.commit().then(() => {
              return snapshot.size;
            });
          })
          .then(numDeleted => {
            if (numDeleted === 0) {
              resolve();
              return;
            }

            // Recurse on the next process tick, to avoid
            // exploding the stack.
            process.nextTick(() => {
              deleteQueryBatch(db, query, resolve, reject);
            });
          })
          .catch(reject);
      }
    }
  }
};
</script>
<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=Raleway&display=swap");
.home {
  font-family: "Raleway", sans-serif;
}
.title {
  font-size: 10em;
}
.home {
  height: 100vh;
}
</style>
