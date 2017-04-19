<template>
  <div>
    <hr>
    <p>
      <span class="existing-text">{{ existingDatesText }}</span>,
      <span class="added-text">{{ addedDatesText }}</span>,
      <span class="removed-text">{{ removedDatesText }}</span>
    </p>

    <label for="datepicker">Add a date</label>
    <q-datetime
      class="form-control"
      name="datepicker"
      v-model="datePickerModel"
      type="date"
      @input="onDateSelected">
    </q-datetime>

    <table
      class="q-table horizontal-delimiter form-control gamedate-table"
      v-if="datesForTable.length">
      <thead>
        <tr>
          <th class="text-left">Date</th>
          <th class="text-right"></th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="date in datesForTable"
          :class="tableRowClassName(date)">
          <td class="text-left date-row">{{ date }}</td>
          <td class="text-right">
            <button
              type="button"
              class="dark outline circular small game-date-editor-button"
              @click.prevent="onDateDeleteClick(date)">
              <i v-if="isRemoved(date)">refresh</i>
              <i v-else>delete_forever</i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>

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
    /** Returns the text to display for 'xxx existing' dates */
    existingDatesText () {
      const count = this.dates.length
      return `${count} existing`
    },

    /** Returns the text to display for 'xxx to add' dates */
    addedDatesText () {
      const count = this.datesAdded.length
      return `${count} to add`
    },

    /** Returns the text to display for 'xxx to remove' dates */
    removedDatesText () {
      const count = this.datesRemoved.length
      return `${count} to remove`
    },

    /**
     * Returns a list of dates formatted for displaying in the table.
     */
    datesForTable () {
      let dates = []

      this.dates.map((d) => {
        dates.push(d)
      })

      this.datesAdded.map((d) => {
        dates.push(d)
      })

      dates.sort((a, b) => a.date < b.date ? 1 : -1)
      return dates
    }
  },

  methods: {
    /**
     * Computes classes for table rows for both dates that have been added
     * but not yet saved, and dates that have been removed but not yet saved.
     */
    tableRowClassName (date) {
      if (this.datesAdded.includes(date)) {
        return 'added-row'
      } else if (this.datesRemoved.includes(date)) {
        return 'removed-row'
      }
      return ''
    },

    /** Returns whether the provided date row is currently in the 'removed' list */
    isRemoved (date) {
      return this.datesRemoved.includes(date)
    },

    /** Handler for 'show dates' button; simply toggle visibility */
    onDatesListToggle () {
      this.showingDates = !this.showingDates
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
.added-text {
  color: #085008;
}

.existing-text {
  color: #2020ca;
}

.removed-text {
  color: #af0000;
}

.gamedate-table .date-row {
  width: 100%
}

/* table rows for 'added' dates */
.gamedate-table .added-row {
  background: #a6e897;
}

/* table rows for 'removed' dates */
.gamedate-table .removed-row {
  background: #ffbcbc;
  text-decoration: line-through;
}

/* buttons inside the dates table */
.gamedate-table .game-date-editor-button {
  float: right;
}
</style>
