<template>
  <div class="min-height-300 bg-primary position-absolute w-100"></div>
  <SideNav
    :navigationLinks="navigationLinks"
    :accountLinks="accountLinks"
    style="z-index:1000;"
  />
  <main class="main-content position-relative border-radius-lg">
    <!-- Navbar -->
    <NavbarComponent @toggle-aside="toggleAside" />
    <!-- End Navbar -->
    <div class="container-fluid py-4">
      <CardsComponent />
      <div class="row mt-4">
        <div class="col-lg-7 mb-lg-0 mb-4">
          <div class="card">
            <div class="card-header pb-0 p-3">
              <div class="d-flex justify-content-between">
                <h6 class="mb-2">Sales by Country</h6>
              </div>
            </div>
            <div class="table-responsive">
              <table class="table align-items-center">
                <tbody>
                  <tr>
                    <td class="w-30">
                      <div class="d-flex px-2 py-1 align-items-center">
                        <div>
                          <img
                            src="../../assets/img/icons/flags/US.png"
                            alt="Country flag"
                          />
                        </div>
                        <div class="ms-4">
                          <p class="text-xs font-weight-bold mb-0">Country:</p>
                          <h6 class="text-sm mb-0">United States</h6>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div class="text-center">
                        <p class="text-xs font-weight-bold mb-0">Sales:</p>
                        <h6 class="text-sm mb-0">2500</h6>
                      </div>
                    </td>
                    <td>
                      <div class="text-center">
                        <p class="text-xs font-weight-bold mb-0">Value:</p>
                        <h6 class="text-sm mb-0">$230,900</h6>
                      </div>
                    </td>
                    <td class="align-middle text-sm">
                      <div class="col text-center">
                        <p class="text-xs font-weight-bold mb-0">Bounce:</p>
                        <h6 class="text-sm mb-0">29.9%</h6>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td class="w-30">
                      <div class="d-flex px-2 py-1 align-items-center">
                        <div>
                          <img
                            src="../../assets/img/icons/flags/DE.png"
                            alt="Country flag"
                          />
                        </div>
                        <div class="ms-4">
                          <p class="text-xs font-weight-bold mb-0">Country:</p>
                          <h6 class="text-sm mb-0">Germany</h6>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div class="text-center">
                        <p class="text-xs font-weight-bold mb-0">Sales:</p>
                        <h6 class="text-sm mb-0">3.900</h6>
                      </div>
                    </td>
                    <td>
                      <div class="text-center">
                        <p class="text-xs font-weight-bold mb-0">Value:</p>
                        <h6 class="text-sm mb-0">$440,000</h6>
                      </div>
                    </td>
                    <td class="align-middle text-sm">
                      <div class="col text-center">
                        <p class="text-xs font-weight-bold mb-0">Bounce:</p>
                        <h6 class="text-sm mb-0">40.22%</h6>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td class="w-30">
                      <div class="d-flex px-2 py-1 align-items-center">
                        <div>
                          <img
                            src="../../assets/img/icons/flags/GB.png"
                            alt="Country flag"
                          />
                        </div>
                        <div class="ms-4">
                          <p class="text-xs font-weight-bold mb-0">Country:</p>
                          <h6 class="text-sm mb-0">Great Britain</h6>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div class="text-center">
                        <p class="text-xs font-weight-bold mb-0">Sales:</p>
                        <h6 class="text-sm mb-0">1.400</h6>
                      </div>
                    </td>
                    <td>
                      <div class="text-center">
                        <p class="text-xs font-weight-bold mb-0">Value:</p>
                        <h6 class="text-sm mb-0">$190,700</h6>
                      </div>
                    </td>
                    <td class="align-middle text-sm">
                      <div class="col text-center">
                        <p class="text-xs font-weight-bold mb-0">Bounce:</p>
                        <h6 class="text-sm mb-0">23.44%</h6>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td class="w-30">
                      <div class="d-flex px-2 py-1 align-items-center">
                        <div>
                          <img
                            src="../../assets/img/icons/flags/AU.png"
                            alt="Country flag"
                          />
                        </div>
                        <div class="ms-4">
                          <p class="text-xs font-weight-bold mb-0">Country:</p>
                          <h6 class="text-sm mb-0">Brasil</h6>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div class="text-center">
                        <p class="text-xs font-weight-bold mb-0">Sales:</p>
                        <h6 class="text-sm mb-0">562</h6>
                      </div>
                    </td>
                    <td>
                      <div class="text-center">
                        <p class="text-xs font-weight-bold mb-0">Value:</p>
                        <h6 class="text-sm mb-0">$143,960</h6>
                      </div>
                    </td>
                    <td class="align-middle text-sm">
                      <div class="col text-center">
                        <p class="text-xs font-weight-bold mb-0">Bounce:</p>
                        <h6 class="text-sm mb-0">32.14%</h6>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div class="col-lg-5">
          <div class="card">
            <div class="card-header pb-0 p-3">
              <h6 class="mb-0">Categories</h6>
            </div>
            <div class="card-body p-3">
              <ul class="list-group">
                <li
                  class="list-group-item border-0 d-flex justify-content-between ps-0 mb-2 border-radius-lg"
                >
                  <div class="d-flex align-items-center">
                    <div
                      class="icon icon-shape icon-sm me-3 bg-gradient-dark shadow text-center"
                    >
                      <i class="ni ni-mobile-button text-white opacity-10"></i>
                    </div>
                    <div class="d-flex flex-column">
                      <h6 class="mb-1 text-dark text-sm">Devices</h6>
                      <span class="text-xs"
                        >250 in stock,
                        <span class="font-weight-bold">346+ sold</span></span
                      >
                    </div>
                  </div>
                  <div class="d-flex">
                    <button
                      class="btn btn-link btn-icon-only btn-rounded btn-sm text-dark icon-move-right my-auto"
                    >
                      <i class="ni ni-bold-right" aria-hidden="true"></i>
                    </button>
                  </div>
                </li>
                <li
                  class="list-group-item border-0 d-flex justify-content-between ps-0 mb-2 border-radius-lg"
                >
                  <div class="d-flex align-items-center">
                    <div
                      class="icon icon-shape icon-sm me-3 bg-gradient-dark shadow text-center"
                    >
                      <i class="ni ni-tag text-white opacity-10"></i>
                    </div>
                    <div class="d-flex flex-column">
                      <h6 class="mb-1 text-dark text-sm">Tickets</h6>
                      <span class="text-xs"
                        >123 closed,
                        <span class="font-weight-bold">15 open</span></span
                      >
                    </div>
                  </div>
                  <div class="d-flex">
                    <button
                      class="btn btn-link btn-icon-only btn-rounded btn-sm text-dark icon-move-right my-auto"
                    >
                      <i class="ni ni-bold-right" aria-hidden="true"></i>
                    </button>
                  </div>
                </li>
                <li
                  class="list-group-item border-0 d-flex justify-content-between ps-0 mb-2 border-radius-lg"
                >
                  <div class="d-flex align-items-center">
                    <div
                      class="icon icon-shape icon-sm me-3 bg-gradient-dark shadow text-center"
                    >
                      <i class="ni ni-box-2 text-white opacity-10"></i>
                    </div>
                    <div class="d-flex flex-column">
                      <h6 class="mb-1 text-dark text-sm">Error logs</h6>
                      <span class="text-xs"
                        >1 is active,
                        <span class="font-weight-bold">40 closed</span></span
                      >
                    </div>
                  </div>
                  <div class="d-flex">
                    <button
                      class="btn btn-link btn-icon-only btn-rounded btn-sm text-dark icon-move-right my-auto"
                    >
                      <i class="ni ni-bold-right" aria-hidden="true"></i>
                    </button>
                  </div>
                </li>
                <li
                  class="list-group-item border-0 d-flex justify-content-between ps-0 border-radius-lg"
                >
                  <div class="d-flex align-items-center">
                    <div
                      class="icon icon-shape icon-sm me-3 bg-gradient-dark shadow text-center"
                    >
                      <i class="ni ni-satisfied text-white opacity-10"></i>
                    </div>
                    <div class="d-flex flex-column">
                      <h6 class="mb-1 text-dark text-sm">Happy users</h6>
                      <span class="text-xs font-weight-bold">+ 430</span>
                    </div>
                  </div>
                  <div class="d-flex">
                    <button
                      class="btn btn-link btn-icon-only btn-rounded btn-sm text-dark icon-move-right my-auto"
                    >
                      <i class="ni ni-bold-right" aria-hidden="true"></i>
                    </button>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <FooterComponent />
    </div>
  </main>
</template>

<script>
import SideNav from "@/components/layouts/bars/Aside.vue";
import NavbarComponent from "@/components/layouts/bars/Navbar.vue";
import CardsComponent from "@/components/layouts/cards/admin/LatestComponent.vue";

import FooterComponent from "@/components/layouts/footer/FooterComponent.vue";
export default {
  data() {
    return {
      navigationLinks: [
        {
          url: "/admin/dashboard",
          text: "Dashboard",
          iconClass: "bx bx-home-alt text-primary text-sm opacity-10",
          active: "nav-link active",
        },
        {
          url: "/admin/doctors",
          text: "Doctors",
          iconClass:
            "bx bx-plus-medical calendar-grid-58 text-warning text-sm opacity-10",
          active: "nav-link ",
        },
        {
          url: "/admin/patients",
          text: "Patients",
          iconClass: "bx bx-user text-success text-sm opacity-10",
          active: "nav-link ",
        },
        {
          url: "/admin/appointments",
          text: "Appointments",
          iconClass: "bx bx-check-double text-info text-sm opacity-10",
          active: "nav-link ",
        },
        {
          url: "/admin/categories",
          text: "Categories",
          iconClass: "bx bxs-category-alt text-success text-sm opacity-10",
          active: "nav-link ",
        },
        {
          url: "/admin/articles",
          text: "Articles",
          iconClass: "bx bxs-notepad text-info text-sm opacity-10",
          active: "nav-link ",
        },
        {
          url: "/admin/payments",
          text: "Payments",
          iconClass: "bx bxs-credit-card text-danger text-sm opacity-10",
          active: "nav-link ",
        },
      ],
      accountLinks: [
        {
          p_url: "/admin/profile",
          p_text: "Profile",
          p_iconClass: "bx bx-user text-success text-sm opacity-10",
          p_active: "nav-link ",
        },
      ],
    };
  },
  computed: {
    allLinks() {
      return this.navigationLinks.concat(this.accountLinks);
    },
  },
  methods: {
    
  },
  components: {
    SideNav,
    NavbarComponent,
    CardsComponent,
    FooterComponent,
  },
};
</script>

<style></style>