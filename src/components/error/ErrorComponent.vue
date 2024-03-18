<template>
  <div>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      id="robot-error"
      viewBox="0 0 260 118.9"
      role="img"
    >
      <title xml:lang="en">403 Error</title>

      <defs>
        <clipPath id="white-clip">
          <circle id="white-eye" fill="#cacaca" :cx="eyePosition.x" :cy="eyePosition.y" r="20" />
        </clipPath>
        <text id="text-s" class="error-text" y="106">403</text>
      </defs>
      <path
        class="alarm"
        fill="#e62326"
        d="M120.9 19.6V9.1c0-5 4.1-9.1 9.1-9.1h0c5 0 9.1 4.1 9.1 9.1v10.6"
      />
      <use xlink:href="#text-s" x="-0.5px" y="-1px" fill="black"></use>
      <use xlink:href="#text-s" fill="#2b2b2b"></use>
      <g id="robot">
        <g id="eye-wrap">
          <use xlink:href="#white-eye"></use>
          <circle
            id="eyef"
            class="eye"
            :clip-path="'url(#white-clip)'"
            fill="#000"
            stroke="#2aa7cc"
            stroke-width="2"
            stroke-miterlimit="10"
            :cx="eyePosition.x"
            :cy="eyePosition.y"
            r="11"
          />
          <ellipse
            id="white-eye"
            fill="#2b2b2b"
            :cx="eyePosition.x"
            :cy="eyePosition.y - 25"
            rx="18"
            ry="12"
          />
        </g>
        <circle class="lightblue" cx="105" cy="32" r="2.5" id="tornillo" />
        <use xlink:href="#tornillo" x="50"></use>
        <use xlink:href="#tornillo" x="50" y="60"></use>
        <use xlink:href="#tornillo" y="60"></use>
      </g>
    </svg>
    <h1>You are not allowed to enter here</h1>
    <h2>Go <router-link to="/">Home!</router-link></h2>
  </div>
</template>

<script>
export default {
  data() {
    return {
      eyePosition: {
        x: 130,
        y: 65
      }
    };
  },
  mounted() {
    this.$el.addEventListener("mousemove", this.handleMouseMove);
    this.$el.addEventListener("touchmove", this.handleTouchMove);
  },
  
  methods: {
    handleMouseMove(evt) {
      const x = evt.clientX / window.innerWidth;
      const y = evt.clientY / window.innerHeight;
      this.eyePosition.x = 115 + 30 * x;
      this.eyePosition.y = 50 + 30 * y;
    },
    handleTouchMove(touchHandler) {
      const x = touchHandler.touches[0].clientX / window.innerWidth;
      const y = touchHandler.touches[0].clientY / window.innerHeight;
      this.eyePosition.x = 115 + 30 * x;
      this.eyePosition.y = 50 + 30 * y;
    }
  }
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Bungee");

body {
  background: #1b1b1b;
  color: white;
  font-family: "Bungee", cursive;
  margin-top: 50px;
  text-align: center;
}
a {
  color: #2aa7cc;
  text-decoration: none;
}
a:hover {
  color: white;
}
svg {
  width: 50vw;
}
.lightblue {
  fill: #444;
}
.eye {
  cx: calc(115px + 30px * var(--mouse-x));
  cy: calc(50px + 30px * var(--mouse-y));
}
#eye-wrap {
  overflow: hidden;
}
.error-text {
  font-size: 120px;
}
.alarm {
  animation: alarmOn 0.5s infinite;
}

@keyframes alarmOn {
  to {
    fill: darkred;
  }
}
</style>
