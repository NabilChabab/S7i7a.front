<template>
  <div class="card-body z-index-3 mt-5" style="margin-left: 24%;">
    <form role="form" @submit.prevent="">
      <div class="row">
        <div class="mb-3 form-outline col-4">
          <input
            type="text"
            class="form-control form-control-lg"
            aria-describedby="emailHelp"
            style="background-color: transparent"
            placeholder="Full Name"
          />
        </div>
        <div class="mb-3 col-4">
          <input
            type="text"
            class="form-control form-control-lg"
            style="background-color: transparent"
            placeholder="Email Address"
          />
        </div>
        <div class="mb-3 col-8">
          <textarea
            type="text"
            class="form-control form-control-lg"
            style="background-color: transparent"
            placeholder="Message"
          />
        </div>
      </div>
      <div class="text-center col-8">
        <button
          type="submit"
          class="btn btn-lg btn-primary btn-lg w-100 mt-4 mb-0"
        >
          Contact us
        </button>
      </div>
    </form>
  </div>
</template>

<script></script>
