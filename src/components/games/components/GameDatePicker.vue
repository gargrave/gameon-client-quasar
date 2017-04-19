<template>
  <div>
    <hr>

    <!-- text showing status of dates existing, added, and removed -->
    <p class="date-editor-label">
      <strong>Dates:</strong>&nbsp;
      <span class="existing-text">{{ existingDatesText }}</span>&nbsp;|&nbsp;
      <span class="added-text">{{ addedDatesText }}</span>&nbsp;|&nbsp;
      <span class="removed-text">{{ removedDatesText }}</span>
    </p>

    <button
      type="button"
      class="tertiary outline small date-editor-button"
      @click="showingDates = !showingDates">
      {{ toggleButtonText }}
    </button>

    <!-- datepicker for adding a single date -->
    <div v-show="showingDates">
      <q-datetime
        class="form-control"
        name="datepicker"
        placeholder="Click/tap to add a date"
        v-model="datePickerModel"
        type="date"
        @input="onDateSelected">
      </q-datetime>

      <!-- list of all dates existing, added, and removed -->
      <div class="list highlight item-delimiter gamedate-list">
        <div
          v-for="date in datesForTable"
          class="item"
          :class="dateDisplayClass(date)"
          @click.prevent="onDateDeleteClick(date)">
          <div class="item-content">{{ date }}</div>
        </div><!-- /list-item -->
      </div><!-- /list -->
    </div><!-- /dates list wrapper -->

  </div>
</template>

<script>
export default {
  props: {
    // whether any operations are currently running
    working: {
      type: Boolean,
      required: true
    },
    dates: {
      type: Array,
      required: true
    }
  },

  data: () => ({
    // whether the full set of controls is showing, or in compact mode
    showingDates: false,
    // list of dates that have been added but not yet saved
    datesAdded: [],
    // list of dates that have been removed but not yet saved
    datesRemoved: [],
    // model for binding to the datepicker's selected value
    datePickerModel: ''
  }),

  computed: {
    /**
     * Returns the text to display for 'xxx existing' dates
     */
    existingDatesText () {
      const count = this.dates.length
      return `${count} existing`
    },

    /**
     * Returns the text to display for 'xxx to add' dates
     */
    addedDatesText () {
      const count = this.datesAdded.length
      return `Adding ${count}`
    },

    /**
     * Returns the text to display for 'xxx to remove' dates
     */
    removedDatesText () {
      const count = this.datesRemoved.length
      return `Removing ${count}`
    },

    /**
     * Returns the text to show on the 'show/hide dates' buttons
     */
    toggleButtonText () {
      return this.showingDates ? 'Hide Dates' : 'Show Dates'
    },

    /**
     * Returns a list of dates formatted for displaying in the table.
     */
    datesForTable () {
      let dates = []

      this.dates.map((d) => { dates.push(d) })
      this.datesAdded.map((d) => { dates.push(d) })

      dates.sort((a, b) => a < b ? 1 : -1)
      return dates
    }
  },

  methods: {
    /**
     * Computes classes for table rows for both dates that have been added
     * but not yet saved, and dates that have been removed but not yet saved.
     */
    dateDisplayClass (date) {
      if (this.datesAdded.includes(date)) {
        return 'added-row'
      } else if (this.datesRemoved.includes(date)) {
        return 'removed-row'
      }
      return ''
    },

    /**
     * Returns whether the provided date row is currently in the 'removed' list
     */
    isRemoved (date) {
      return this.datesRemoved.includes(date)
    },

    /**
     * Handler for the event from selecting a date in the Datepicker.
     * Attempts to add the date to the current unsaved dates list.
     */
    onDateSelected (value, event) {
      if (value) {
        const date = value.trim().slice(0, 10)
        if (!this.datesAdded.includes(date) && !this.dates.includes(date)) {
          this.datesAdded.push(date)
        }
      }
    },

    /**
     * Handler for clicking the 'delete' button on a date row.
     * Attempts to add the date to the list of dates to be removed.
     */
    onDateDeleteClick (date) {
      // if the selected date is a new/unsaved one, simply remove it from the 'new dates' list
      if (this.datesAdded.includes(date)) {
        this.datesAdded = this.datesAdded.filter((d) => d !== date)
      } else {
        // otherwise, add it to the list of dates to delete
        if (!this.datesRemoved.includes(date)) {
          this.datesRemoved.push(date)
        } else {
          this.datesRemoved = this.datesRemoved.filter((d) => d !== date)
        }
      }
    },

    /**
     * Returns the updated list of dates
     * (i.e. 'added' dates are added, 'removed' dates are removed)
     */
    getDatesList () {
      let dates = Object.assign([], this.dates)

      // add all new dates to the list
      this.datesAdded.forEach((d) => {
        if (!dates.includes(d)) {
          dates.push(d)
        }
      })

      // remove all deleted dates from the list
      dates = dates.filter((d) => {
        return !this.datesRemoved.includes(d)
      })

      dates.sort()
      return dates
    },

    /**
     * Returns a list of dates to be removed from the current Game.
     */
    getRemovedDatesList () {
      let dates = []

      // add all removed dates to the list
      this.datesRemoved.forEach((d) => {
        if (!dates.includes(d)) {
          dates.push(d)
        }
      })

      return dates
    }
  }
}
</script>

<style scoped>
/* adjust styles for 'xxx existing, xxx to add...' label */
.date-editor-label {
  font-size: .9rem;
}

.added-text {
  color: #085008;
}

.existing-text {
  color: #2020ca;
}

/* spacing for buttons in the date editor */
.date-editor-button {
  margin: 0 0 10px 0;
}

.removed-text {
  color: #af0000;
}

/* adjust spacing/sizing for date rows */
.gamedate-list > .item {
  height: 40px;
}

/* adjust spacing/sizing for date rows */
.gamedate-list > .item > .item-content {
  padding: 13px 0;
  font-size: .9rem;
}

/* rows for 'added' dates */
.gamedate-list .added-row {
  background: #a6e897;
}

/* rows for 'removed' dates */
.gamedate-list .removed-row {
  background: #ffbcbc;
  text-decoration: line-through;
}
</style>
