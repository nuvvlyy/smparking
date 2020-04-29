<template>
  <div class="initParking">
    <!-- <b-button v-b-modal.initParking>Open Modal</b-button> -->
    <!-- 
    <div class="mt-3">
      Submitted Names:
      <div v-if="submittedNames.length === 0">--</div>
      <ul v-else class="mb-0 pl-3">
        <li v-for="floor in submittedNames" :key="floor">{{ floor }}</li>
      </ul>
    </div>-->

    <b-modal
      id="initParkingg"
      ref="modal"
      title="Initialize Parking"
      @show="resetModal"
      @hidden="resetModal"
      @ok="handleOk"
    >
      <form ref="form" @submit.stop.prevent="handleSubmit">
        <b-form-group
          label-cols-lg="1"
          label="SMparking"
          label-size="lg"
          label-class="font-weight-bold pt-0"
          class="mb-0"
        >
          <b-form-group
            label-cols-sm="4"
            label="Floor:"
            label-align-sm="right"
            label-for="selectFloor"
          >
            <b-form-select
              v-model="selectedFloor"
              :state="widthZoneState"
              :options="optionsFloor"
              value-field="item"
              text-field="name"
              disabled-field="notEnabled"
            ></b-form-select>
            <b-form-input
              v-if="selectedFloor == '2'"
              id="selectFloor"
              v-model="customfloor"
              :state="customFloorState"
              class="mt-2"
              placeholder="Ex. 1-5, 8, 11-13"
              required
            ></b-form-input>
          </b-form-group>

          <b-form-group
            label-cols-sm="4"
            label="Number of floor:"
            label-align-sm="right"
            :state="floorState"
            label-for="numberFloor"
            invalid-feedback="Floor is required"
          >
            <b-form-input
              id="numberFloor"
              v-model="floor"
              :state="floorState"
              type="number"
              required
              placeholder="Max: 100"
            ></b-form-input>
          </b-form-group>

          <b-form-group
            label-cols-sm="4"
            label="Number of zone:"
            label-align-sm="right"
            label-for="numberZone"
            :state="zoneState"
            invalid-feedback="Zone is required"
          >
            <b-form-input
              id="numberZone"
              v-model="zone"
              :state="zoneState"
              type="number"
              placeholder="Max: 100"
              required
            ></b-form-input>
          </b-form-group>

          <b-form-group
            label-cols-sm="4"
            label="Zone height:"
            label-align-sm="right"
            :state="zoneHeightState"
            label-for="numberZoneHeight"
            invalid-feedback="Height is required"
          >
            <b-form-input
              id="numberZoneHeight"
              v-model.number="zoneHeight"
              :state="zoneHeightState"
              type="number"
              placeholder="Max: 100"
              required
            ></b-form-input>
          </b-form-group>

          <b-form-group
            label-cols-sm="4"
            label="Width:"
            label-align-sm="right"
            label-for="zoneWidth"
          >
            <b-form-radio-group
              id="zoneWidth"
              v-model="selected"
              :state="widthZoneState"
              :options="options"
              value-field="item"
              text-field="name"
              disabled-field="notEnabled"
              class="mt-2"
            ></b-form-radio-group>
            <div class="mt-1 ml-3">
              Side:
              <strong>{{ selected }}</strong>
            </div>
          </b-form-group>

          <b-form-group
            label-cols-sm="4"
            label="Total Slots:"
            label-size="lg"
            label-class="font-weight-bold pt-0 text-primary"
            label-align-sm="right"
            label-for="totalSlots"
          >
            <b-form-input
              v-model="total"
              disabled="true"
              id="totalSlots"
              class="text-center"
              size="lg"
            ></b-form-input>
          </b-form-group>
        </b-form-group>
      </form>
    </b-modal>
  </div>
</template>

<script>
import { db } from "../firebase";
import { firestore } from "firebase";
export default {
  name: "initParking",
  data() {
    return {
      floors: [],
      selected: "2",
      options: [
        { item: "1", name: "1 Side" },
        { item: "2", name: "2 Side" }
      ],
      selectedFloor: "1",
      optionsFloor: [
        { item: "1", name: "All" },
        { item: "2", name: "Custom adjective" }
      ],
      name: "",
      nameState: null,
      submittedNames: [],

      customfloor: null,
      customFloorState: null,
      floor: null,
      floorState: null,
      zone: null,
      zoneState: null,
      zoneHeight: null,
      zoneHeightState: null,
      zoneWidth: null,
      zoneWidthState: null,
      //total: null,
      totalState: null
    };
  },
  firestore() {
    return {
      floors: db.collection("floors")
    };
  },
  computed: {
    total: function() {
      // let floor = this.floor;
      // let zone = this.zone;
      // let zoneHeight = this.zoneHeight;
      // let width = this.selected;
      // total = floor * zone * zoneHeight * width;
      //console.log("total ", this.total + " Slots");
      let total = this.floor * this.zone * this.zoneHeight * this.selected;
      return total;
    }
  },
  methods: {
    checkFormValidity() {
      const valid = this.$refs.form.checkValidity();
      this.floorState = valid;
      this.zoneState = valid;
      this.zoneHeightState = valid;
      return valid;
    },
    resetModal() {
      this.name = "";
      this.nameState = null;

      this.selectedFloor = "1";
      this.selected = "2";
      this.floor = null;
      this.zone = null;
      this.zoneHeight = null;
      this.floorState = null;
      this.zoneState = null;
      this.zoneHeightState = null;
      this.total = null;
    },
    handleOk(bvModalEvt) {
      // Prevent modal from closing
      bvModalEvt.preventDefault();
      // Trigger submit handler
      this.handleSubmit();
    },
    toFirebase() {},
    handleSubmit() {
      // Exit when the form isn't valid
      if (!this.checkFormValidity()) {
        return;
      }
      // Push the name to submitted names
      ////this.submittedNames.push(this.name);
      this.submittedNames.push(this.floor);
      console.log("floor", this.floor);
      console.log("zone", this.zone);
      console.log("zoneHeight", this.zoneHeight);
      console.log("zoneWidth", this.selected);

      let num = parseInt(this.floor);
      // var batch = db.batch();

      this.total = this.floor * this.zone * this.zoneHeight * this.selected;

      let dataFloor = {
        height: this.zoneHeight,
        width: this.selected,
        zone: this.zone,
        timeStramp: Date.now()
      };
      let dataTest = { id1: "handicap" };
      let idStatus = { status: "active" };

      let jsonData =[{'floors':{'.key':'1','height':'5','zone':'5','whidth':'2','timeStramp':1588069179984},'zoneDetail':[{'.key':'zone1','id1':'handicap'},{'.key':'zone2'}]}  //{'zoneDetail':{klsd:ifjs}}
      ,{'.key':'2','height':'5','zone':'5','whidth':'2','timeStramp':1588069179984}]

      let ex ={"lambeosaurus": {"dimensions": {"height" : 2.1,"length" : 12.5,"weight": 5000 }}}
      console.log(jsonData);
      console.log('ex =>',ex)
      console.log('Floors[]',this.floors)

      // for (let floor = 0; floor < num; floor++) {
      //   let setFloors = db
      //     .collection("floors")
      //     .doc((floor + 1).toString())
      //     .set(jsonData);
      // }

/** ได้แล้ว แต่สร้างนาน กิน Bandwidth */
      for (let floor = 0; floor < num; floor++) {
        let setFloors = db
          .collection("floors")
          .doc((floor + 1).toString())
          .set(dataFloor);
        if (parseInt(this.zone) != 0) {
          for (let zone = 0; zone < parseInt(this.zone); zone++) {
            let setZoneDetail = db
              .collection("floors")
              .doc((floor + 1).toString())
              .collection("zoneDetail")
              .doc("zone" + (zone + 1).toString())
              .set(dataTest);
            for (
              let slot = 0;
              slot < parseInt(this.zoneHeight * this.selected);
              slot++
            ) {
              let setSlotDetail = db
                .collection("floors")
                .doc((floor + 1).toString())
                .collection("zoneDetail")
                .doc("zone" + (zone + 1).toString())
                .collection("SlotDetail")
                .doc("id" + (slot + 1).toString())
                .set(idStatus);
            }
          }
        }
      }






    // Get a new write batch
let batch = db.batch();

// Set the value of 'NYC'
let nycRef = db.collection('cities').doc('NYC');
batch.set(nycRef, {name: 'New York City'});

// // Update the population of 'SF'
// let sfRef = db.collection('cities').doc('SF');
// batch.update(sfRef, {population: 1000000});

// // Delete the city 'LA'
// let laRef = db.collection('cities').doc('LA');
// batch.delete(laRef);

// Commit the batch
return batch.commit().then(function () {
  // ...
});






      //let setDoc = db.collection('floors').doc('1').collection('zoneDetail').doc('zone3').set(dataFloor)
      // Hide the modal manually
      this.$nextTick(() => {
        this.$bvModal.hide("initParking");
      });
    }
  }
};
</script>
