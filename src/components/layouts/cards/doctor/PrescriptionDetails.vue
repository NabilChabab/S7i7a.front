<template>
  <div class="invoice-wrapper" id="print-area">
    <div class="invoice">
      <div class="invoice-container">
        <div class="invoice-head">
          <div class="invoice-head-top">
            <div class="invoice-head-top-left text-start">
              <img src="" />
            </div>
            <div class="invoice-head-top me-5">
              <h3>S7I7A.ma</h3>
            </div>
          </div>
          <div class="hr"></div>
          <div class="invoice-head-middle">
            <div class="invoice-head-middle-left text-start">
              <p><span class="text-bold">Date</span>: {{ prescription.date }}</p>
            </div>
            <div class="invoice-head-middle-right text-end">
              <p><span class="text-bold">S7I7A.ma</span></p>
            </div>
          </div>
          <div class="hr"></div>
          <div class="invoice-head-bottom">
            <div class="invoice-head-bottom-left">
              <ul>
                <li class="text-bold">Invoiced To: <span>{{ prescription.patient }}</span></li>
              </ul>
            </div>
            <div class="invoice-head-bottom-right">
              <ul class="text-end">
                <li class="text-bold">Pay To: <span>{{ prescription.doctor }}</span></li>
              </ul>
            </div>
          </div>
        </div>
        <div class="overflow-view">
          <div class="invoice-body">
            <table>
              <thead>
                <tr>
                  <td class="text-bold">Medication</td>
                  <td class="text-bold">Date</td>
                  <td class="text-bold">Hour</td>
                  <td class="text-bold">Dosage</td>
                  <td class="text-bold">Price</td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{{ prescription.medication }}</td>
                  <td>{{ prescription.date }}</td>
                  <td>{{ prescription.hour }}</td>
                  <td>{{ prescription.dosage }}</td>
                  <td class="text-end">{{ prescription.price }} DH</td>
                </tr>
                <tr>
                  <td>{{ prescription.medication }}</td>
                  <td>{{ prescription.date }}</td>
                  <td>{{ prescription.hour }}</td>
                  <td>{{ prescription.dosage }}</td>
                  <td class="text-end">{{ prescription.price }} DH</td>
                </tr>
                <tr>
                  <td>{{ prescription.medication }}</td>
                  <td>{{ prescription.date }}</td>
                  <td>{{ prescription.hour }}</td>
                  <td>{{ prescription.dosage }}</td>
                  <td class="text-end">{{ prescription.price }} DH</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="invoice-foot text-center">
          <p>
            <span class="text-bold text-center">NOTE:&nbsp;</span>This is
            computer generated receipt and does not require physical signature.
          </p>

          <div class="invoice-btns">
            <button type="button" class="invoice-btn" @click="printInvoice">
              <span>
                <i class="fa-solid fa-print"></i>
              </span>
              <span>Print</span>
            </button>
            <button type="button" class="invoice-btn">
              <span>
                <i class="fa-solid fa-download"></i>
              </span>
              <span>Download</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from "@/services/api";
export default {
  name: "PrescriptionDetails",
  data() {
    return {
      prescription: {
        id: "",
        medication: "",
        dosage: "",
        instructions: "",
        doctor: "",
        patient: "",
        date : "",
        time : ""
      },
      isLoading: true,
    };
  },
  created() {
    this.fetchPrescriptionById();
  },
  methods: {
    printInvoice() {
        
        window.print();
    },
    async fetchPrescriptionById() {
      const id = this.$route.params.id;
      try {
        const response = await api.get(`/doctor/prescriptions/${id}`);
        this.prescription = response.data.prescription;
        this.isLoading = false;
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style>
*,
*::after,
*::before {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

:root {
  --blue-color: #0c2f54;
  --dark-color: #535b61;
  --white-color: #fff;
}

ul {
  list-style-type: none;
}
ul li {
  margin: 2px 0;
}

/* text colors */
.text-dark {
  color: var(--dark-color);
}
.text-blue {
  color: var(--blue-color);
}
.text-end {
  text-align: right;
}
.text-center {
  text-align: center;
}
.text-start {
  text-align: left;
}
.text-bold {
  font-weight: 700;
}
/* hr line */
.hr {
  height: 1px;
  background-color: rgba(0, 0, 0, 0.1);
}
/* border-bottom */
.border-bottom {
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

body {
  font-family: "Poppins", sans-serif;
  color: var(--dark-color);
  font-size: 14px;
}
.invoice-wrapper {
  min-height: 100vh;
  background-color: rgba(0, 0, 0, 0.1);
  padding-top: 20px;
  padding-bottom: 20px;
}
.invoice {
  max-width: 850px;
  margin-right: auto;
  margin-left: auto;
  background-color: var(--white-color);
  padding: 70px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  min-height: 920px;
}
.invoice-head-top-left img {
  width: 130px;
}
.invoice-head-top-right h3 {
  font-weight: 500;
  font-size: 27px;
  margin-top: 40px;
  color: var(--blue-color);
}
.invoice-head-middle,
.invoice-head-bottom {
  padding: 16px 0;
}
.invoice-body {
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  overflow: hidden;
}
.invoice-body table {
  border-collapse: collapse;
  border-radius: 4px;
  width: 100%;
}
.invoice-body table td,
.invoice-body table th {
  padding: 12px;
}
.invoice-body table tr {
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}
.invoice-body table thead {
  background-color: rgba(0, 0, 0, 0.02);
}
.invoice-body-info-item {
  display: grid;
  grid-template-columns: 80% 20%;
}
.invoice-body-info-item .info-item-td {
  padding: 12px;
  background-color: rgba(0, 0, 0, 0.02);
}
.invoice-foot {
  padding: 30px 0;
}
.invoice-foot p {
  font-size: 12px;
}
.invoice-btns {
  margin-top: 20px;
  display: flex;
  justify-content: center;
}
.invoice-btn {
  padding: 3px 9px;
  color: var(--dark-color);
  font-family: inherit;
  border: 1px solid rgba(0, 0, 0, 0.1);
  cursor: pointer;
}

.invoice-head-top,
.invoice-head-middle,
.invoice-head-bottom {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  padding-bottom: 10px;
}

@media screen and (max-width: 992px) {
  .invoice {
    padding: 40px;
  }
}

@media screen and (max-width: 576px) {
  .invoice-head-top,
  .invoice-head-middle,
  .invoice-head-bottom {
    grid-template-columns: repeat(1, 1fr);
  }
  .invoice-head-bottom-right {
    margin-top: 12px;
    margin-bottom: 12px;
  }
  .invoice * {
    text-align: left;
  }
  .invoice {
    padding: 28px;
  }
}

.overflow-view {
  overflow-x: scroll;
}
.invoice-body {
  min-width: 600px;
}

@media print {
  .print-area {
    visibility: visible;
    width: 100%;
    position: absolute;
    left: 0;
    top: 0;
    overflow: hidden;
  }

  .overflow-view {
    overflow-x: hidden;
  }

  .invoice-btns {
    display: none;
  }
}
</style>
