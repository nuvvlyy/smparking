<template>
  <div class="page-wrapper d-flex align-items-stretch h-100 mb-5">
    <div class="container-fluid">
      <!-- <p>The destination is :{{this.$route.params.id}}</p> -->
      <!-- <div class="row">
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
      </div>-->

      <!-- <div class="display-1" v-if="notFound == true">Floor not found</div> -->

      <!-- <div>
        <b-nav>
          <b-nav-item disabled>Symbol Color:</b-nav-item>
          <b-nav-item disabled>
            Empty
            <div class="rectangle empty"></div>
          </b-nav-item>
          <b-nav-item disabled>
            Full
            <div class="rectangle full"></div>
          </b-nav-item>
          <b-nav-item disabled>
            Lady
            <div class="rectangle lady"></div>
          </b-nav-item>
          <b-nav-item disabled>
            Handicap
            <div class="rectangle handicap"></div>
          </b-nav-item>
          <b-nav-item disabled>
            Entrance
            <div class="box yellow-striped"></div>
          </b-nav-item>
        </b-nav>
      </div>-->
      

      <div>



        <ul v-for="(index,keyy) in slotStatus.floor" :key="keyy" class="text-left">
          <li v-for="(indexx,key) in index" :key="key">floor:{{keyy}} {{index}}</li>
        </ul>
        <hr />/**กำลังทำ */
        <div v-for="(i,key) in slotStatus" :key="key">{{key}} > status: {{i}}</div>
        <hr />
        <h5>Process from RDB</h5>
        <hr />
        <div>{{fromRdb}}</div>
      </div>

      <button class="btn btn-info my-5" @click="test">test</button>
      <button class="btn btn-danger my-5 mx-5" @click="arraySlot">Array Slot</button>

      <!-- <div class="border m-4">
              <div class="btn btn-primary m-2">primary</div>
              <div class="btn btn-secondary m-2">secondary</div>
              <div class="btn btn-success m-2">success</div>
              <div class="btn btn-info m-2">info</div>
              <div class="btn btn-warning m-2">warning</div>
              <div class="btn btn-danger m-2">danger</div>
      </div>-->

      <!-- <div class="mt-5">
              <ul v-for="i in floor.zone" :key="i">
                <li>ss</li>
              </ul>
      </div>-->
      <div v-if="!isShow" class="row justify-content-center">
        <EllipsisLoader :color="'#051232'" />
      </div>

      <!-- border border-primary p-5 -->

      <div v-if="isShow" class="parking">
        <div class="row border border-danger">
          <div class="col-3" v-for="(i,zone) in all_zones" :key="zone">
            <table class="table">
              <tr>
                <th :colspan="2" @click="zoneSelect(i)">
                  <div class="d-inline-flex align-items-center my-auto">
                    <span @click="zoneSelect(i)">Zone {{i[0]}}</span>
                    <div class="box ml-2 yellow-striped" v-if="i.entrance == true"></div>
                  </div>
                </th>
              </tr>
              <tbody>
                <!-- <tr v-for="(j,k) in slots" :key="k">
                              <td v-for="(i,slot) in 2" :key="slot" align="center" valign="center">
                                <div
                                  class="rectangle lady"
                                  :title="'id' +[[j]]"
                                  @click="infoSpot(i)"
                                >{{j['.key']}}</div>
                              </td>
                </tr>-->

                <tr v-for="(current_array, parent_node_index) in i[1]" :key="parent_node_index">
                  <td
                    v-for="(item,index) in current_array"
                    :key="index"
                    class="rectangle"
                    data-toggle="modal"
                    data-target="#slotModal"
                    @click="$bvModal.show('slotModall'),infoSpot(item)"
                    title="Slot setting"
                  >
                  <div v-if="item[1] === 'active'" class="empty">{{item[0]}}</div>
                  <div v-else-if="item[1] === 'inactive'" class="full">{{item[0]}}</div>
                   <div v-if="item[2] === false" class="handicap">{{item[0]}}</div>
                  </td>
                  <!--
                     @click="infoSpot(item)"
                  {{(parent_node_index*2+index+1)}} is {{item}}-->
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
import { db, rdb } from "../firebase";

import * as firebase from "firebase";

import EllipsisLoader from "@bit/joshk.vue-spinners-css.ellipsis-loader";

//var database = firebase.database();
var slotStatusRef = rdb.ref("/sensor");

export default {
  components: {
    EllipsisLoader
  },
  data() {
    return {
      destinationId: this.$route.params.id,
      currentFloor: this.$store.state.floor,
      counter: 0,
      floors: [],
      zones: [],
      slots: [],
      evenSlot: [],
      zoneSlot: [],
      floor: {
        height: null,
        width: null,
        zone: null
      },
      all_zones: new Map(),
      isShow: false,
      slotStatus: null,
      slotStatusKey: null,
      slotStatusRef: null
    };
  },
  // firestore() {
  //     return {
  //         floors: db.collection("floors"),
  //         zones: db
  //             .collection("floors")
  //             .doc(this.$store.state.floor.toString())
  //             .collection("zoneDetail"),
  //
  //         slots: db
  //             .collection("floors")
  //             .doc(this.$store.state.floor.toString())
  //             .collection("zoneDetail")
  //             .doc("zoneA")
  //             .collection("slotDetail")
  //
  //     };
  // },

  computed: {
    FBSlots() {
      let allSlot = this.zones;
      let zone = [];
      for (let i in allSlot) {
        zone.push(allSlot[i][".key"]);
      }

      return zone;
    },
    fromRdb() {
      let slot = Object.keys(this.slotStatus);
      let target = [];
      let floor, zone, slotNum;
      for (let i in slot) {
        target.push(slot[i].match(/[a-zA-Z]+|[0-9]+/g));
      }
      for (let i in target) {
        floor = parseInt(target[i][0]);
        zone = target[i][1];
        slot = parseInt(target[i][2]);
        console.log("rdb", floor, zone, slot);
      }

      return target;
    }
  },
  mounted() {
    this.getZoneWithSlot();

    /**ทำอยู่ */
    slotStatusRef.on("value", snapshot => {
      this.slotStatus = snapshot.val();
      this.slotStatusKey = snapshot.key;
    });
  },
  methods: {
    getZoneWithSlot() {
      console.log("getzone");
      let arr = this.zones;
      console.log(this.zones);
      console.log("1234");
      let arrayzone = [];
      let arrayChunked = [];
      db.collection("floors")
        .doc(this.$store.state.floor.toString())
        .collection("zoneDetail")
        .get()
        .then(data => {
          data.forEach(doc => {
            let size = data.size;
            // console.log(data.size)
            db.collection("floors")
              .doc(this.$store.state.floor.toString())
              .collection("zoneDetail")
              .doc(doc.id)
              .collection("slotDetail")
              .get()
              .then(data => {
                data.forEach(doc => {
                  // console.log("id >", doc.id);
                  console.log(arrayzone);
                  console.log(doc.data().status);

                  if(doc.data().bestSlot === true){
                    arrayzone.push([doc.id, doc.data().status,doc.data().bestSlot]);
                  }else{
                    
                    arrayzone.push([doc.id, doc.data().status,false]);
                  }
                  
                  if (arrayzone.length === 2) {
                    arrayChunked.push(arrayzone);
                    arrayzone = [];
                  }
                });
                this.all_zones.set(doc.id, arrayChunked);
                arrayChunked = [];
                console.log(this.all_zones);

                console.log(this.all_zones.size);
                if (this.all_zones.size === size) {
                  this.isShow = true;
                  console.log(this.all_zones);
                }
              });
          });
        });
    },
    arraySlot() {
      console.log("arrayslot");
      return zone => {
        this.isShow = false;
        console.log(zone);
        let arrayzone = [];
        let arrayChunked = [];
        db.collection("floors")
          .doc(this.$store.state.floor.toString())
          .collection("zoneDetail")
          .doc(zone[".key"])
          .collection("slotDetail")
          .get()
          .then(data => {
            data.forEach(doc => {
              console.log("id >", doc.id);
              arrayzone.push(doc.id);
              if (arrayzone.length == 2) {
                arrayChunked.push(arrayzone);
                arrayzone = [];
              }
            });
            //this.isShow = true;
            console.log("a", arrayChunked);
            this.evenSlot = arrayChunked;
            console.log("even", this.evenSlot);
            this.zoneSlot.push(this.evenSlot);
            console.log("zoneSlot", this.zoneSlot);
            return arrayChunked;
          });
      };
    },
 

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
      console.log("slotStaus", this.slotStatus);
      console.log("slotStausKey", this.slotStatusKey);
      console.log("arraySlots", this.arraySlot);
      //  for (let i in this.FBSlots) {

      //  }
      console.log("FBSlots", this.FBSlots);
      console.log("floors", this.floors);
      console.log("zones", this.zones);
      console.log("stateFloor", this.$store.state.floor);
      this.floors.forEach(floor => {
        if (floor[".key"] == this.$store.state.floor) {
          this.floor = {
            height: parseInt(floor.height),
            width: parseInt(floor.width),
            zone: parseInt(floor.zone)
          };
        }
      });
      let cityRef = db.collection("floors").doc("1");
      let getDoc = cityRef
        .get()
        .then(doc => {
          if (!doc.exists) {
            console.log("No such document!");
          } else {
            console.log("Document data:", doc.data());
          }
        })
        .catch(err => {
          console.log("Error getting document", err);
        });
      console.log("slots=>", this.slots);
    },
    zoneSelect(zone) {
      // let tranZone = zone[".key"];
      // let zonee = db
      //   .collection("floors")
      //   .doc((this.$store.state.floor).toString())
      //   .collection("zoneDetail")
      //   .doc(tranZone);
      // let getZone = zonee.get().then(doc => {
      //   console.log(doc.data());
      // });
      // console.log(tranZone);
      console.log("zoneSelect", zone);
      this.$store.commit("changeZone", zone);
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
      console.log(i[".key"], Object.values(i));
    },

    updated() {
      this.floor = this.$store.state.floor;
      // currentFloor: this.$store.state.floor
      console.log(this.floor);
    }
  }
};
</script>
<style lang="scss">
// td:nth-child(1){
//   align-: center;
// }
td div {
  text-align: center;
  vertical-align: middle;
}

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
  background: #c2c2c2;

  cursor: pointer;
}

// .box a:hover{
//   cursor: pointer;
// }
th {
  cursor: pointer;
}

td {
  margin: 0;
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

.lady {
  background-color: var(--mat-pink);
}

:root {
  --mat-green: #c8e6c9;
  --mat-dark-green: #97b498;
  --mat-teal: #009688;
  --mat-cyan: #00bcd4;
  --mat-white: #f5f5f5;
  --mat-light-gray: #e0e0e0;
  --mat-dark-teal: #00796b;
  --mat-blue: #5d99c6;
  --mat-red: #f44336;
  --mat-yellow: #ffb74d;
  --mat-dark-yellow: #f57c00;
  --mat-pink: #fce4ec;
}

.parking {
  min-width: 100%;
  min-height: 100%;
}

.nobr {
  white-space: nowrap;
}
</style>
