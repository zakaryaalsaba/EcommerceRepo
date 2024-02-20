<template>
    <div>
        <div>
            <b-button :class="visible ? null : 'collapsed'" :aria-expanded="visible ? 'true' : 'false'"
                aria-controls="collapse-4" @click="visible = !visible" pill variant="light">
                <b-icon v-if="!visible" icon="chevron-down"></b-icon>
                <b-icon v-else icon="chevron-up"></b-icon>
                {{ visible ? 'Show less' : 'Show more' }}
            </b-button>
            <b-collapse id="collapse-4" v-model="visible" class="mt-2">
                <!-- <b-card>I should start open!</b-card> -->
                <ul>
                    <li><router-link to="/" style="color: white;">Image path is incorr..</router-link></li>
                    <li><router-link to="/about" style="color: white;">Rewrite: Daniel...</router-link></li>
                    <li><router-link to="/contact" style="color: white;">Rewrite: RMD should..</router-link></li>
                </ul>
            </b-collapse>
        </div>
        <div class="accordion" role="tablist">
            <b-card no-body class="mb-1">
                <b-card-header header-tag="header" class="p-1" role="tab">
                    <b-button block v-b-toggle.accordion-1 variant="info">Accordion 1</b-button>
                </b-card-header>
                <b-collapse id="accordion-1" visible accordion="my-accordion" role="tabpanel">
                    <b-card-body>
                        <b-card-text>I start opened because <code>visible</code> is <code>true</code></b-card-text>
                        <b-card-text>{{ text }}</b-card-text>
                    </b-card-body>
                </b-collapse>
            </b-card>

            <b-card no-body class="mb-1">
                <b-card-header header-tag="header" class="p-1" role="tab">
                    <b-button block v-b-toggle.accordion-2 variant="info">Accordion 2</b-button>
                </b-card-header>
                <b-collapse id="accordion-2" accordion="my-accordion" role="tabpanel">
                    <b-card-body>
                        <b-card-text>{{ text }}</b-card-text>
                    </b-card-body>
                </b-collapse>
            </b-card>

            <b-card no-body class="mb-1">
                <b-card-header header-tag="header" class="p-1" role="tab">
                    <b-button block v-b-toggle.accordion-3 variant="info">Accordion 3</b-button>
                </b-card-header>
                <b-collapse id="accordion-3" accordion="my-accordion" role="tabpanel">
                    <b-card-body>
                        <b-card-text>{{ text }}</b-card-text>
                    </b-card-body>
                </b-collapse>
            </b-card>
        </div>
    </div>
</template>
  
<script>
export default {
    name: "accordionCartCom",
    data() {
        return {
        visible: true,

            text: `
          Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry
          richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor
          brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon
          tempor, sunt aliqua put a bird on it squid single-origin coffee nulla
          assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore
          wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher
          vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic
          synth nesciunt you probably haven't heard of them accusamus labore VHS.
        `
        };
    },
};
</script>
  