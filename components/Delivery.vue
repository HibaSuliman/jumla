<template>
  <div>
    <div v-if="details">
      <div v-if="days.length > 0">
        <h4 class="mx-4">{{ $t('chooseDeliveryTime') }}</h4>
        <v-slide-group
          @change="time = null"
          v-model="delivery"
          class="pa-4"
          mandatory
          show-arrows
        >
          <v-slide-item
            :disabled="day.is_past"
            v-for="(day,key) in days"
            :key="key"
            v-slot="{ active, toggle }"
          >
            <div v-if="!day.is_past" @click="toggle" class="text-center black--text mx-4 mt-3 mb-3" style="cursor: grab">
                  <span :class="active ? 'green--text font-weight-bold' : ' font-weight-medium'">
                    {{ $t(day.day) }}
                    <br>
                    <small>{{ day.date }}</small>
                  </span>
            </div>
            <div v-else class="text-center grey--text mx-4 mt-3 mb-3" style="cursor: grab">
                  <span class="font-weight-medium">
                    {{ $t(day.day) }}
                    <br>
                    <small>{{ day.date }}</small>
                  </span>
            </div>
          </v-slide-item>
        </v-slide-group>
        <v-divider />
        <v-chip-group @change="changeDelivery" mandatory class="mt-1"  column v-model="time" v-if="days[delivery]">
          <v-chip style="margin: 10px" :value="times" :disabled="times.is_past" filter v-for="times in days[delivery].times"
                  :key="times.id" class="font-weight-medium">{{ times.time }}</v-chip>
        </v-chip-group>
        <v-divider></v-divider>
      </div>
      <div v-else>
        <span class="font-weight-bold text-center">{{ $t('pleaseChooseAddress') }}</span>
      </div>
    </div>
    <v-menu
      v-else
      v-model="menu"
      :close-on-content-click="false"
      :nudge-width="300"
      offset-y
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="primary"
          icon
          v-bind="attrs"
          v-on="on"
        >
          <v-icon>mdi-truck-delivery</v-icon>
        </v-btn>
      </template>
      <v-card>
        <v-card-text>
          <v-card outlined>
            <v-card-text >
              <div v-if="days.length > 0">
                <h4 class="mx-4">{{ $t('chooseDeliveryTime') }}</h4>
                <v-slide-group
                  @change="time = null"
                  v-model="delivery"
                  class="pa-4"
                  mandatory
                  show-arrows
                >
                  <v-slide-item
                    :disabled="day.is_past"
                    v-for="(day,key) in days"
                    :key="key"
                    v-slot="{ active, toggle }"
                  >
                    <div v-if="!day.is_past" @click="toggle" class="text-center black--text mx-4 mt-3 mb-3" style="cursor: grab">
                  <span :class="active ? 'green--text font-weight-bold' : ' font-weight-medium'">
                    {{ $t(day.day) }}
                    <br>
                    <small>{{ day.date }}</small>
                  </span>
                    </div>
                    <div v-else class="text-center grey--text mx-4 mt-3 mb-3" style="cursor: grab">
                  <span class="font-weight-medium">
                    {{ $t(day.day) }}
                    <br>
                    <small>{{ day.date }}</small>
                  </span>
                    </div>
                  </v-slide-item>
                </v-slide-group>
                <v-divider />
                <v-chip-group @change="changeDelivery" mandatory class="mt-1"  column v-model="time" v-if="days[delivery]">
                  <v-chip style="margin: 10px" :disabled="times.is_past" filter v-for="times in days[delivery].times"
                          :key="times.id" class="font-weight-medium">{{ times.time }}</v-chip>
                </v-chip-group>
                <v-divider></v-divider>
                <v-btn
                  block
                  outlined
                  color="secondary"
                  class="text-capitalize mt-5"
                  @click="changeDelivery"
                >
                  {{ $t('chooseTime') }}
                </v-btn>
              </div>
              <div v-else>
                <span class="font-weight-bold text-center">{{ $t('pleaseChooseAddress') }}</span>
              </div>
            </v-card-text>
          </v-card>
        </v-card-text>
      </v-card>
    </v-menu>
  </div>

</template>

<script>
import {mapActions, mapGetters} from "vuex";
export default {
  name: "Delivery",
  props: {
    details: Boolean
  },
  data()
  {
    return {
      menu: false,
      delivery: null,
      time: null,
    }
  },
  computed:
    {
      ...mapGetters({
        days: 'days/getData'
      })
    },
  mounted() {
    if(this.$cookies.get('address'))
    {
      this.getDays(this.$cookies.get('address'));
      if (this.$cookies.get('delivery_key')) this.delivery = this.$cookies.get('delivery_key');
      if (this.$cookies.get('delivery_time')) this.time = this.$cookies.get('delivery_time');

    }
  },
  methods: {
    ...mapActions({
      getDays: 'days/fetchData'
    }),
    changeDelivery()
    {
      this.$cookies.set('delivery',this.days[this.delivery].id);
      this.$cookies.set('delivery_key',this.delivery);
      if (this.time)
      {
        this.$cookies.set('delivery_time',this.time.id)
        this.$cookies.set('delivery_date',this.time.full_date)
      }
    }
  }
}
</script>

<style scoped>

</style>
