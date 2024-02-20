<template>
  <div>
    <b-row>
      <b-col md="1"></b-col>
      <b-col>
        <b>
          <h2 class="h2Class">{{ titleProp }}</h2>
        </b>
      </b-col>
      <b-col md="4"></b-col>
    </b-row>
    <b-row>
      &nbsp;
    </b-row>
    <b-row>
      <b-col md="1"></b-col>
      <b-col md="9">
        <div class="e-r5n0an">
          <div class="e-tz4xap">
            <div class="e-1ucr7rw">
              <b-button pill variant="outline-success" class="svg-container">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="#40aa54" xmlns="http://www.w3.org/2000/svg"
                  size="24" aria-hidden="true" color="systemGrayscale80" class="e-bauix2">
                  <path d="M8 4.5h8v3H8v-3Z"></path>
                  <path fill-rule="evenodd" clip-rule="evenodd"
                    d="M24 11h-2.5v13H15v-8H9v8H2.5V11H0L4.8 0h14.4L24 11Zm-7.25 11.25h3V11H4.25v11.25h3v-8h9.5v8Zm4.57-13-3.27-7.5H5.94l-3.27 7.5h18.65Z">
                  </path>
                </svg>
                <br>
                Grocery
              </b-button>
              <b-button pill variant="outline-success" class="svg-container">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="#40aa54" xmlns="http://www.w3.org/2000/svg"
                  size="24" aria-hidden="true" color="systemGrayscale80" class="e-bauix2">
                  <path
                    d="M24 13.5c0-4.56-2.32-7.72-2.75-8.25l1-5.25-2.34 1.5L17.75 0 15 1.5 12.5 0 10 1.5 7.25 0 5 1.5 2.75 0l1 5.25C3.32 5.78 1 8.94 1 13.5 1 18.55 2.5 21 2.5 21L2 24h21l-.5-3s1.5-2.45 1.5-7.5ZM5.97 2.96l1.37-.91 1.82.99.88.48.86-.52 1.6-.96 1.6.96.86.52 2.68-1.46 1.28.88.88.61-.21 1.08H5.41l-.22-1.15.78-.52Zm-.88 3.42h14.82c.17.21 2.34 2.98 2.34 7.12 0 2.98-.56 4.92-.93 5.88H3.68c-.37-.96-.93-2.9-.93-5.88 0-4.14 2.17-6.91 2.34-7.12ZM4.06 22.26l.16-.96.02-.16h16.5l.03.16.16.96H4.06Z">
                  </path>
                  <path
                    d="M9.08 15.86c.72.76 1.72 1.14 2.78 1.14 1.16 0 2.38-.45 3.37-1.35 1.89-1.72 2.2-4.41.69-6.01-.72-.76-1.72-1.14-2.78-1.14-1.16 0-2.38.45-3.37 1.35-1.89 1.72-2.2 4.41-.69 6.01Zm1.87-4.71c.63-.57 1.43-.9 2.19-.9.61 0 1.15.21 1.51.59.42.45.49 1 .48 1.38-.03.77-.42 1.54-1.07 2.14-.63.57-1.43.9-2.19.9-.61 0-1.15-.21-1.51-.59-.42-.45-.49-1-.48-1.38.03-.77.42-1.54 1.07-2.14Z">
                  </path>
                </svg>
                <br>
                Meat & Poultry
              </b-button>
              <b-button pill variant="outline-success" class="svg-container">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="#40aa54" xmlns="http://www.w3.org/2000/svg"
                  size="24" aria-hidden="true" color="systemGrayscale80" class="e-bauix2">
                  <g clip-path="url(#prefix__clip0_4323_32025)">
                    <path fill-rule="evenodd" clip-rule="evenodd"
                      d="M5 6V4a4 4 0 1 1 8 0v2h4l.222 4h5.611L24 24H0L1 6h4Zm13.25 5.75h-2.5V14a1.25 1.25 0 1 0 2.5 0v-2.25Zm-4.25 0V14a3 3 0 1 0 6 0v-2.25h1.223l.875 10.5H11.902l.875-10.5H14ZM15.47 10l-.126-2.25H2.655L2.086 18H10.5l.667-8h4.303Zm-4.22-6v2h-4.5V4a2.25 2.25 0 0 1 4.5 0Z">
                    </path>
                  </g>
                  <defs>
                    <clipPath id="prefix__clip0_4323_32025">
                      <path fill="#fff" d="M0 0h24v24H0z"></path>
                    </clipPath>
                  </defs>
                </svg>
                <br>
                Bread & Bakery
              </b-button>
              <b-button pill variant="outline-success" class="svg-container">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="#40aa54" xmlns="http://www.w3.org/2000/svg"
                  size="24" aria-hidden="true" color="systemGrayscale80" class="e-t2xtfo">
                  <path
                    d="M3.9 10.89c-1.13.84-2.41 1.7-3.9 2.61L10.34 24c1.57-.78 3-1.68 4.29-2.65L3.9 10.89ZM24 1.28 22.8 0c-.51.47-.99.95-1.46 1.42L13.5 0c-2.58 3.97-4.49 6.8-8.2 9.82l10.71 10.44c5.47-4.58 7.99-9.92 7.99-9.92l-1.42-7.68c.46-.46.93-.92 1.42-1.38Zm-7.46 3.85c.86-.81 2.12-.85 2.81-.1.69.76.55 2.02-.32 2.83-.86.81-2.12.85-2.81.1-.69-.76-.54-2.02.32-2.83Z">
                  </path>
                </svg>
                <br>
                Coffee & Tea
              </b-button>

            </div>
          </div>
        </div>
      </b-col>
      <b-col md="2"></b-col>
    </b-row>
  </div>
</template>

<script>
export default {
  name: "DepartmentsButtonsCom",
  props: {
    titleProp: String
  },
};
</script>

<style scoped>
/* Add your component-specific styles here */
.h2Class {
  margin: 0;
  line-height: 24px;
  font-weight: unset;
  font-variation-settings: "wght" 800, "opsz" 8;
  --ids-typography-name: headlineMedium1;
  color: #04AA6D;
}

.e-r5n0an {
  margin-bottom: 8px;
}

.e-tz4xap {
  position: relative;
  padding-top: 4px;
  padding-left: 0px;
  padding-right: 0px;
}

.e-1ucr7rw {
  overflow: auto hidden;
  scrollbar-width: none;
  display: flex;
  -webkit-box-pack: start;
  justify-content: flex-start;
  gap: 8px;
  max-height: 58px;
  transition: max-height 200ms ease-in-out 0s;
  box-sizing: content-box;
}

.svg-container:hover svg path {
  fill: white;
}
</style>
