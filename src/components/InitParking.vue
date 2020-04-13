<template>
  <div class="initParking">
    <!-- <b-button v-b-modal.initParking>Open Modal</b-button> -->

    <!-- <div class="mt-3">
      Submitted Names:
      <div v-if="submittedNames.length === 0">--</div>
      <ul v-else class="mb-0 pl-3">
        <li v-for="name in submittedNames" :key="name">{{ name }}</li>
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
              :state="nameState"
              label="Number of Floor"
              label-for="name-input"
              invalid-feedback="Name is required"
              class="mb-2 mr-sm-2 mb-sm-0"
            >
              <b-form-input id="name-input" v-model="name" :state="nameState" required></b-form-input>
            </b-form-group>
          </b-col>
          <b-col cols="6">
            <b-form-group
              :state="nameState"
              label="Number of Zone"
              label-for="name-input"
              invalid-feedback="Name is required"
              class="mb-2 mr-sm-2 mb-sm-0"
            >
              <b-form-input id="name-input" v-model="name" :state="nameState" required></b-form-input>
            </b-form-group>
          </b-col>
          <b-col cols="6">
            <b-form-group
              :state="nameState"
              label="Height"
              label-for="name-input"
              invalid-feedback="Name is required"
              class="mb-2 mr-sm-2 mb-sm-0 mt-2"
            >
              <b-form-input id="name-input" v-model="name" :state="nameState" required></b-form-input>
            </b-form-group>
          </b-col>
          <b-col cols="6">
            <b-form-group
            class="mb-2 mr-sm-2 mb-sm-0 mt-2"
            label="Width"
            >
              <b-form-radio-group
                label="mro"
                v-model="selected"
                :options="options"
                class="my-1"
                value-field="item"
                text-field="name"
                disabled-field="notEnabled"
              ></b-form-radio-group>
              <div class="mt-1 ml-3">Side: <strong>{{ selected }}</strong></div>
            </b-form-group>
          </b-col>
          
          <b-col cols="12">
            <hr>
            <div class="text-center"><h5>Total: <strong>{{total}}</strong> Slots</h5></div>
            
          </b-col>
        </b-row>
      </form>
    </b-modal>
  </div>
</template>

<script>
import { db } from "../firebase";
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
      total:1000
    };
  },
  firestore() {
    return {
      floors: db.collection("floors")
    };
  },
  methods: {
    checkFormValidity() {
      const valid = this.$refs.form.checkValidity();
      this.nameState = valid;
      return valid;
    },
    resetModal() {
      this.name = "";
      this.nameState = null;
    },
    handleOk(bvModalEvt) {
      // Prevent modal from closing
      bvModalEvt.preventDefault();
      // Trigger submit handler
      this.handleSubmit();
    },
    handleSubmit() {
      // Exit when the form isn't valid
      if (!this.checkFormValidity()) {
        return;
      }
      // Push the name to submitted names
      this.submittedNames.push(this.name);
      // Hide the modal manually
      this.$nextTick(() => {
        this.$bvModal.hide("initParking");
      });
    }
  }
};
</script>