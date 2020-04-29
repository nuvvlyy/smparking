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
      <div class="display-1" v-if="notFound == true">Floor not found</div>
      <button class="btn btn-info my-5" @click="test">test</button>
      <button class="btn btn-danger my-5 mx-5" @click="test2">test5</button>

<div class="border m-4">
<div class="btn btn-primary m-2">primary</div>
<div class="btn btn-secondary m-2">secondary</div>
<div class="btn btn-success m-2">success</div>
<div class="btn btn-info m-2">info</div>
<div class="btn btn-warning m-2">warning</div>
<div class="btn btn-danger m-2">danger</div>

</div>

      <!-- <div class="mt-5">
        <ul v-for="i in floor.zone" :key="i">
          <li>ss</li>
        </ul>
      </div>-->
      <div class="border border-primary p-5">
        <div class="row" ><div v-for="i in 4" :key="i" class="box m-2 yellow-striped"></div></div>
        <div class="row border border-danger">
          <div class="col" v-for="i in 20" :key="i">
            <table class="table">
              <thead align="center">
                <tr>
                  <th colspan="2" @click="zoneSelect(i)">zone{{i}}</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="i in 3" :key="i">
                  <td v-for="i in 2" :key="i">
                    <div class="rectangle handicap" @click="infoSpot(i)"></div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { db } from "../firebase";
export default {
  data() {
    return {
      currentFloor: null,
      counter: 0,
      floors: [],
      floor: {
        height: null,
        width: null,
        zone: null,
 
      }
    };
  },
  firestore() {
    return {
      floors: db.collection("floors")
    };
  },
  methods: {
    readData() {},
    test2() {
      let found = this.floors.find(
        floor => floor[".key"] == this.$store.state.floor
      );
      if (found) {
        console.log("found =>", found);
        return {
          floor: {
            height: parseInt(found.height),
            width: parseInt(found.width),
            zone: parseInt(found.zone)
          }
        };
        console.log("floor =>", this.floor);
      } else {
        this.notFound = true;
        console.log("Not Found Floor Data");
      }
    },
    test() {
      console.log("floors", this.floors);
      this.floors.forEach(floor => {
        if (floor[".key"] == this.$store.state.floor) {
          this.floor = {
            height: parseInt(floor.height),
            width: parseInt(floor.width),
            zone: parseInt(floor.zone)
          };
        }
      });
    },
    zoneSelect(zone) {
      console.log(zone);
    },
    counterTest() {
      this.counter++;
      // console.log(this.$refs.text.baseURI);
      // console.log(this.$route.params.id)

      // fetch("http://localhost:8080/config").then(res =>
      //   console.log(res)
      // );
      //console.log('url')
      // window.onload = () => {
      //   changeURL("rrrr");
      //   console.log("url", this.attributes.name.values);
      // };
    },
    changeURL(data) {
      location.hash = data;
    },
    infoSpot(i) {
      console.log("id" + i);
    },
    updated() {
      this.floor = this.$store.state.floor;
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
  height: 30px;
  background: gray;
}
.rectangle {
  width: 30px;
  height: 20px;
  background: rgb(200, 200, 200);
  cursor: pointer;
}
// .box a:hover{
//   cursor: pointer;
// }
th {
  cursor: pointer;
}
.yellow-striped {
  background-color: var(--mat-yellow);
  background-image: repeating-linear-gradient(
    45deg,
    #ffffff,
    #ffffff 4px,
    rgba(1, 1, 1, 0) 4px,
    rgba(1, 1, 1, 0) 8px
  );
  box-shadow: inset 0 0 0 4px #ffb74d;
}
.handicap {
  background-color: var(--mat-blue);
}
.empty {
  background-color: var(--mat-green);
}
.full {
  background-color: var(--mat-red);
}

:root {
  --mat-green: #4caf50;
  --mat-dark-green: #388e3c;
  --mat-teal: #009688;
  --mat-cyan: #00bcd4;
  --mat-white: #f5f5f5;
  --mat-light-gray: #e0e0e0;
  --mat-dark-teal: #00796b;
  --mat-blue: #0086c3;
  --mat-red: #f44336;
  --mat-yellow: #ffb74d;
  --mat-dark-yellow: #f57c00;
}

</style>