<template>
  <div class="slotModal">

    <b-modal
      id="slotModall"
      ref="modal"
      :title="'Slot Setting '+[[$store.state.floor]]"
      @show="resetModal"
      @hidden="resetModal"
      @ok="handleOk"
      centered
    >
      <form ref="form" @submit.stop.prevent="handleSubmit">
        <b-form-group
          label-cols-lg="1"
          label="SMparking"
          label-size="lg"
          label-class="font-weight-bold pt-1 logo-primary h1"
          class="mb-0"
        >
          <b-form-group
            label-cols-sm="4"
            label="Best slot:"
            label-align-sm="right"
            :state="floorState"
            label-for="numberFloor"
            invalid-feedback="Floor is required"
          >
            <b-form-checkbox
              id="markEntrance"
              v-model="bestSlot"
              name="markEntrance"
              value="accepted"
              class="form-group col-md"
              unchecked-value="not_accepted"
              
            >
              This
              <strong>. . .</strong> is best slot
            </b-form-checkbox>
          </b-form-group>

          <b-form-group>
            <b-button variant="danger" class="float-right mr-auto" @click="deleteSlot">Remove slot</b-button>
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
  name: "EditFloor",
  data() {
    return {
      floors: [],
      selected: "2",
      options: [
        { item: "1", name: "1 Side" },
        { item: "2", name: "2 Side" }
      ],
      selectedFloor: null,
      name: "",
      nameState: null,
      submittedNames: [],

      bestSlot: null,

      // customfloor: null,
      // customFloorState: null,
      floor: this.$store.state.floor,
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
      let total = this.zone * this.zoneHeight * this.selected;
      return total;
    }
    // currentFloor:function(){
    //   let now =this.$store.state.floor
    //   return  now
    // }
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

      // this.selectedFloor = this.$store.state.floor;
      // this.selected = "2";
      this.floor = this.$store.state.floor;
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
    deleteSlot() {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then(result => {
        if (result.value) {

          //this.$firestore.products.doc(doc[".key"]).delete();
          // console.log(doc['.key']);

          Swal.fire("Deleted!", "Deleted successfully.", "success");
          // Toast.fire({           //***ดี */
          // icon: 'success',
          // title: 'Signed in successfully'
          // });
        }
      });
    },
    resetCollection() {
      // let citiesRef = db.collection("floors");
      // let allCities = citiesRef
      //   .get()
      //   .then(snapshot => {
      //     snapshot.forEach(doc => {
      //       if (!doc.exists) {
      //         console.log("No such document!");
      //       } else {
      //         console.log("Document data:", doc.id, "=>", doc.data());
      //       }
      //     });
      //   })
      //   .catch(err => {
      //     console.log("Error getting documents", err);
      //   });
      /* Delete Collection */
      // db.collection("floors")
      //   .get()
      //   .then(res => {
      //     res.forEach(element => {
      //       element.ref.delete();
      //     });
      //   })
      //   .catch(err => {
      //     console.log("Error getting documents", err);
      //   });
    },
    handleSubmit() {
      this.resetCollection();
      // Exit when the form isn't valid
      if (!this.checkFormValidity()) {
        return;
      }
      // Push the name to submitted names
      ////this.submittedNames.push(this.name);
      this.submittedNames.push(this.floor);
      // console.log("floor", this.floor);
      // console.log("zone", this.zone);
      // console.log("zoneHeight", this.zoneHeight);
      // console.log("zoneWidth", this.selected);

      let num = parseInt(this.floor);
      // var batch = db.batch();

      this.total = this.floor * this.zone * this.zoneHeight * this.selected;

      let dataFloor = {
        height: this.zoneHeight.toString(),
        width: this.selected.toString(),
        zone: this.zone.toString(),
        timeStramp: Date.now()
      };
      let zoneData = { id1: "handicap", entrance: false };
      let idStatus = { status: "active" };

      let az = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

      /** ได้แล้ว แต่สร้างนาน กิน Bandwidth */

      let setFloors = db
        .collection("floors")
        .doc(this.$store.state.floor.toString())
        .set(dataFloor);
      if (parseInt(this.zone) != 0) {
        for (let zone = 0; zone < parseInt(this.zone); zone++) {
          let setZoneDetail = db
            .collection("floors")
            .doc(this.$store.state.floor.toString())
            .collection("zoneDetail")
            .doc("zone" + az.charAt(zone))
            .set(zoneData);
          for (
            let slot = 0;
            slot < parseInt(this.zoneHeight * this.selected);
            slot++
          ) {
            let setSlotDetail = db
              .collection("floors")
              .doc(this.$store.state.floor.toString())
              .collection("zoneDetail")
              .doc("zone" + az.charAt(zone))
              .collection("slotDetail")
              .doc(
                this.$store.state.floor.toString() +
                  az.charAt(zone) +
                  "-" +
                  (slot + 1).toString()
              )
              .set(idStatus);
          }
        }
      }

      this.$nextTick(() => {
        this.$bvModal.hide("editFloor");
      });
    }
  }
  // updated() {
  //   currentFloor :this.$store.state.floor
  // }
};
</script>
<style lang="scss">
.text-total {
  color: #81b9bf;
}
.logo-primary {
  color: #aebfbe;
}
</style>
