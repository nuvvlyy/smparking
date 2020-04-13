<template>
  <div class="page-wrapper d-flex align-items-stretch">
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-1" v-for="(i,index) in floor.zone" :key="index">
          <table class="table table-light">
            <thead>
              <tr>
                <th colspan="2">Zone{{index+1}}</th>
              </tr>
            </thead>
            <tbody>
              <tr class="spot-list" v-for="(i,index) in floor.height" :key="index">
                <td class="spot" v-for="i in floor.width" :key="i"></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <button class="btn btn-info my-5" @click="test">test</button>
      <!-- <div class="mt-5">
        <ul v-for="i in floor.zone" :key="i">
          <li>ss</li>
        </ul>
      </div>-->
      <div class="border border-primary p-5">
        <div class="box m-2"></div>
        <div class="row border border-danger">
          <div class="col" v-for="i in 50" :key="i">
            <table class="table">
              <thead align="center">
                <tr>
                  <th colspan="2" >FFF</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="i in 3" :key="i">
                  <td v-for="i in 2" :key="i" >{{i}} <div class="box" alt="ppp"  ></div> </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div class="my-5">
        <button @click="counterTest" class="btn btn-danger" name="5">counterTest</button>
        <p class="mt-2" ref="text">counter {{counter}}</p>
      </div>
    </div>
  </div>
</template>
<script>
import { db } from "../firebase";
export default {
  data() {
    return {
      counter: 0,
      floors: [],
      floor: {
        height: null,
        width: null,
        zone: null
      }
    };
  },
  firestore() {
    return {
      floors: db.collection("floors")
    };
  },
  methods: {
    test() {
      this.floors.forEach(floor => {
        if (floor[".key"] == 1) {
          this.floor = {
            height: parseInt(floor.height),
            width: parseInt(floor.width),
            zone: parseInt(floor.zone)
          };
        }
      });
      console.log(this.floor);
    },
    counterTest() {
      this.counter++;
      // console.log(this.$refs.text.baseURI);
      // console.log(this.$route.params.id)

      // fetch("http://localhost:8080/config").then(res =>
      //   console.log(res)
      // );
      //console.log('url')
      window.onload = () => {
        changeURL("rrrr");
        console.log("url", this.attributes.name.values);
      };
    },
    changeURL(data) {
      location.hash = data;
    }
  }
};
</script>
<style lang="scss">
.spot-list {
  //list-style-type: none;
  //margin: 0 auto;

  float: unset;
  position: relative;
  margin-top: 1rem;
  margin-bottom: 1rem;
}

.spot-list td {
  //padding: 15px;

  //float: left;
  width: 2.5em;
  height: 1em;
  margin: 0.1em;
  margin-right: 0.2em;
  margin-left: 0.2em;
  background-color: rgb(163, 163, 163);

  display: block;
}
// .spot-list-vertical {
//   transform: rotate(-90deg);
//}
.box {
  width: 30px;
  height: 30    px;
  background: gray;
  
}
.box a:hover{
  cursor: pointer;
}
</style>