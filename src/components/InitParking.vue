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
        <b-row>
          <b-col cols="6">
            <b-form-group
              :state="floorState"
              label="Number of Floor"
              label-for="name-input"
              invalid-feedback="Floor is required"
              class="mb-2 mr-sm-2 mb-sm-0"
            >
              <b-form-input id="name-input" v-model.number="floor" :state="floorState" required></b-form-input>
            </b-form-group>
          </b-col>
          <b-col cols="6">
            <b-form-group
              :state="zoneState"
              label="Number of Zone"
              label-for="name-input"
              invalid-feedback="Zone is required"
              class="mb-2 mr-sm-2 mb-sm-0"
            >
              <b-form-input id="name-input" v-model.number="zone" :state="zoneState" required></b-form-input>
            </b-form-group>
          </b-col>
          <b-col cols="6">
            <b-form-group
              :state=" zoneHeightState"
              label="Height"
              label-for="name-input"
              invalid-feedback="Height is required"
              class="mb-2 mr-sm-2 mb-sm-0 mt-2"
            >
              <b-form-input id="name-input" v-model.number="zoneHeight" :state=" zoneHeightState" required></b-form-input>
            </b-form-group>
          </b-col>
          <b-col cols="6">
            <b-form-group class="mb-2 mr-sm-2 mb-sm-0 mt-2" label="Width">
              <b-form-radio-group
                label="mro"
                v-model="selected"
                :state="widthZoneState"
                :options="options"
                class="my-1"
                value-field="item"
                text-field="name"
                disabled-field="notEnabled"
              ></b-form-radio-group>
              <div class="mt-1 ml-3">
                Side:
                <strong>{{ selected }}</strong>
              </div>
            </b-form-group>
          </b-col>

          <b-col cols="12">
            <hr />
            <div class="text-center">
              <h5>
                Total:
                <strong>{{total}}</strong>
                Slots
              </h5>
           
            </div>
          </b-col>
        </b-row>
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
      name: "",
      nameState: null,
      submittedNames: [],

      floor: null,
      zone: null,
      zoneHeight: null,
      zoneWidth: null,
      floorState: null,
      zoneState: null,
      zoneHeightState: null,
      widthZoneState: null,
      total: null,
      totalState: null
    };
  },
  firestore() {
    return {
      floors: db.collection("floors")
    };
  },
  computed: {
    total: function(e) {
      let floor = this.floors;
      let zone = this.zone;
      let zoneHeight = this.zoneHeight;
      let width = this.selected;
      total = floor * zone * zoneHeight * width;
      //console.log("total ", this.total + " Slots");
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

      this.floor = "";
      this.zone = "";
      this.zoneHeight = "";
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

      this.total = this.floor *this.zone * this.zoneHeight * this.selected

      let dataFloor = {
        height: this.zoneHeight,
        width: this.selected,
        zone: this.zone,
        timeStramp: Date.now()
      };
      let dataTest = { Test: "test" };
      for (let index = 0; index < num; index++) {
        let setFloors = db
          .collection("floors")
          .doc((index + 1).toString())
          .set(dataFloor);
        if (parseInt(this.zone) != 0) {
          for (let zone = 0; zone < parseInt(this.zone); zone++) {
            let setZoneDetail = db
              .collection("floors")
              .doc((index + 1).toString())
              .collection("zoneDetail")
              .doc("zone" + (zone + 1).toString())
              .set(dataTest);
          }
        }
      }

      //let setDoc = db.collection('floors').doc('1').collection('zoneDetail').doc('zone3').set(dataFloor)
      // Hide the modal manually
      this.$nextTick(() => {
        this.$bvModal.hide("initParking");
      });
    }
  }
};
</script>