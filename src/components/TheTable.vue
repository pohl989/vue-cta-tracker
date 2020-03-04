<template>
  <div id="sixthTable">
    <div class="col-md-12">
      <div class="clearfix"></div>
      <div class="table-search-row">
        <div class="table-filters">
          <slot></slot>
        </div>

        <div class="table-search-bar">
          <input
            type="text"
            placeholder="...search"
            v-model="search"
            v-on:keyup="searchTable"
            class="table-search"
            :disabled="isLoading"
            :class="isLoading ? 'disabled' : ''"
          />
          <TheButton icon="download" color="dark" v-on:click.native="downloadData" />
        </div>
      </div>
      <div class="table-results-summary-message">
        <p>
          <em>{{ resultsSummaryMessage }}</em>
        </p>
        <p v-if="filterCount % 11 === 0" class="deep-purple-text darken-4">
          <strong>Woah! Slow down! I'm getting dizzy from all the sorting!</strong>
        </p>
      </div>
      <div class="table-responsive">
        <table class="table table-hover">
          <thead>
            <tr>
              <th
                v-for="col in headers()"
                v-on:click="sortTable(col.value)"
                :key="col.value"
                :class="isLoading ? 'disable-th' : ''"
                :style="col.style"
              >
                <div
                  style="display: flex; justify-content: space-between; align-items: center; flex-wrap: nowrap"
                >
                  <p>{{ col.label }}</p>
                  <span
                    class="fa pull-right"
                    v-if="col.value == sortColumn"
                    :class="[ascending ? 'fa-chevron-up' : 'fa-chevron-down']"
                  ></span>
                </div>
              </th>
            </tr>
          </thead>
          <slot name="rows">
            <tbody>
              <tr v-if="isLoading">
                <td :colspan="headers().length + 1">
                  <AppSpinner />
                </td>
              </tr>
              <tr v-if="hasError">
                <td :colspan="headers().length + 1">
                  <p class="red-text darken-4 text-center">
                    <strong>{{ this.errorMsg }}</strong>
                  </p>
                </td>
              </tr>
              <tr v-if="printedRows.length === 0 && !isLoading && !hasError">
                <td :colspan="headers().length + 1">
                  <p class="red-text darken-4 text-center">
                    <strong>
                      No results for this query. Try broadening your search and
                      filters.
                    </strong>
                  </p>
                </td>
              </tr>
              <tr v-for="(row, index) in printedRows" :key="index">
                <td v-for="(col, index) in row" :key="index">
                  <p v-if="col.type === 'string'">{{ col.value }}</p>
                  <TheBadge v-else-if="col.type === 'badge'" :status="col.value" />
                  <TheCurrency v-else-if="col.type === 'currency'" :value="col.value" />
                  <p v-else-if="col.type === 'date'">{{ shortFormDate(col.value) }}</p>
                  <a v-else-if="col.type === 'link'" :href="col.url">{{ col.value }}</a>
                </td>
              </tr>
            </tbody>
          </slot>
        </table>
      </div>
      <div class="clear"></div>
      <div class="pagination">
        <div class="number" v-on:click="firstPage()">
          <TheIcon icon="angle-double-left" size="1x" />
        </div>
        <div class="number" v-on:click="decrementPage()">
          <TheIcon icon="angle-left" size="1x" />
        </div>
        <div
          class="number"
          v-for="i in selectableNumPages()"
          v-bind:class="[i == currentPage ? 'active' : '']"
          v-on:click="changePage(i)"
          :key="i"
        >{{ i }}</div>
        <div class="number" v-on:click="incrementPage()">
          <TheIcon icon="angle-right" size="1x" />
        </div>
        <div class="number" v-on:click="lastPage()">
          <TheIcon icon="angle-double-right" size="1x" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TheButton from '../components/TheButton'
import TheSpinner from '../components/TheSpinner'
import TheBadge from '../components/TheBadge'
import TheIcon from '../components/TheIcon'
import TheCurrency from '../components/TheCurrency'

import { apiToDate, dateToString } from '../library/index.js'

import { toTitleCase } from '../mixins/stringMethods'

import numeral from 'numeral'
import XLSX from 'xlsx'
import { saveAs } from 'file-saver'

export default {
  name: 'TheTable',
  components: { TheButton, TheBadge, TheCurrency, TheSpinner, TheIcon },
  mixins: [toTitleCase],

  data: function() {
    return {
      currentPage: 1,
      paginationRange: 5,
      elementsPerPage: 50,
      search: null,
      ascending: false,
      sortColumn: '',
      isLoading: true,
      hasError: false,
      errorMsg: '',
      searchRows: [],
      filterCount: 1,
      rowsData: [],
      rows: [],
    }
  },
  props: {
    downloadTitle: { type: String, default: 'CNSRVIT_DOWNLOAD' },
    tablePromise: { type: Promise, required: true },
    code: { type: Number },
    tableDefaults: {
      type: Array,
      default: function() {
        return []
      },
    },
    labelColumns: {
      type: Array,
      default: function() {
        return []
      },
    },
    elementsPerPageOptions: {
      type: Array,
      default: function() {
        return [10, 25, 50, 100]
      },
    },
  },
  methods: {
    shortFormDate: function(apiDate) {
      if (apiDate) {
        const date = apiToDate(apiDate)
        return date ? dateToString(date, 'short') : ''
      } else {
        return ' '
      }
    },
    getRenderType: function(data) {
      if (this.tableDefaults.length > 0) {
        return this.tableDefaults[data.index]
          ? this.tableDefaults[data.index]['type']
          : 'string'
      } else {
        return 'string'
      }
    },
    doesSearchValueMatchAttribute: function(value) {
      return String(value).includes(this.search)
    },
    searchTable: function() {
      if (this.search) {
        const filtered = this.rowsData.filter(obj => {
          const values = Object.values(obj)
          const searchValues = values.map(value =>
            this.doesSearchValueMatchAttribute(value)
          )
          return searchValues.includes(true)
        })
        this.currentPage = 1
        this.searchRows = filtered
      } else {
        this.currentPage = 1
        this.searchRows = this.rowsData
      }
    },
    sortTable: function sortTable(col) {
      if (this.sortColumn === col) {
        this.ascending = !this.ascending
      } else {
        this.ascending = true
        this.sortColumn = col
      }
      this.filterCount += 1
      var ascending = this.ascending
      this.searchRows.sort(function(a, b) {
        if (a[col] > b[col]) {
          return ascending ? 1 : -1
        } else if (a[col] < b[col]) {
          return ascending ? -1 : 1
        }
        return 0
      })
    },
    reformatExportValue: function(value, type) {
      let newValue = value
      if (type === 'badge') {
        newValue = this.toTitleCase(value)
      } else if (type === 'currency') {
        newValue = numeral(value).format('$0,0.00')
      } else if (value === null) {
        newValue = ''
      }
      return newValue
    },
    reformatSearchData: function() {
      const searchRows = this.searchRows
      const formatted = searchRows.map(obj => {
        const formmatedArr = this.tableDefaults.map(header => {
          return this.reformatExportValue(obj[header['value']], header['type'])
        })
        return formmatedArr
      })
      return formatted
    },
    processFile: function(file) {
      var buf = new ArrayBuffer(file.length)
      var view = new Uint8Array(buf)
      for (var i = 0; i < file.length; i++) view[i] = file.charCodeAt(i) & 0xff //convert to octet
      return buf
    },
    downloadData: function() {
      var wb = XLSX.utils.book_new()

      wb.Props = {
        Title: this.downloadTitle,
        CreatedDate: new Date(),
      }
      wb.SheetNames.push('Page 6')
      const headers = this.headers().map(header => header.label)
      const body = this.reformatSearchData()
      var ws_data = [headers, ...body] //a row with 2 columns
      var ws = XLSX.utils.aoa_to_sheet(ws_data)
      wb.Sheets['Page 6'] = ws
      var wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'binary' })
      saveAs(
        new Blob([this.processFile(wbout)], {
          type: 'application/octet-stream',
        }),
        `${this.downloadTitle}.xlsx`
      )
    },
    numPages: function numPages() {
      return Math.ceil(this.searchRows.length / this.elementsPerPage)
    },
    selectableNumPages: function() {
      const numPages = this.numPages()
      const currentPage = this.currentPage - 1
      const paginationRange = this.paginationRange
      const paginationBlock = [...Array(paginationRange).keys()]
      const pageStart =
        Math.floor(currentPage / paginationRange) * paginationRange + 1
      const tabs = paginationBlock.map(page => pageStart + page)
      return tabs.filter(tab => tab <= numPages)
    },
    getDataForActivePage: function getDataForActivePage() {
      var start = (this.currentPage - 1) * this.elementsPerPage
      var end = start + this.elementsPerPage
      return this.searchRows.slice(start, end)
    },
    decrementPage: function() {
      this.currentPage = this.currentPage > 1 ? this.currentPage - 1 : 1
    },
    incrementPage: function() {
      this.currentPage =
        this.currentPage < this.numPages()
          ? this.currentPage + 1
          : this.numPages()
    },
    lastPage: function() {
      this.currentPage = this.numPages()
    },
    firstPage: function() {
      this.currentPage = 1
    },
    changePage: function changePage(page) {
      this.currentPage = page
    },
    formatObjectToTableRow: function(obj) {
      const defaults = this.tableDefaults.filter(
        header => header.type !== 'hidden'
      )
      const order = defaults.map(item => item.value)
      if (this.tableDefaults.length > 0) {
        const tableRow = defaults.map(d => {
          const value = obj[d.value]
          const type = d.type ? d.type : 'string'
          const url = type === 'link' ? obj[d.url] : ''
          return { value, type, url }
        })
        return tableRow
      } else {
        tableRow = Object.values(obj).map(value => {
          return { value, type: 'string' }
        })
      }
    },
    headers: function() {
      if (this.tableDefaults.length !== 0) {
        return this.tableDefaults.filter(header => header.type !== 'hidden')
      } else if (this.rowsData.length == 0) {
        return []
      } else {
        return Object.keys(this.rowsData[0]).map(value => {
          const label = value
          const type = 'string'
          return { value, label, type }
        })
      }
    },
  },
  computed: {
    printedRows: function() {
      const filteredList = this.getDataForActivePage()
      if (filteredList.length > 0) {
        const formmatedTableRows = filteredList.map(row => {
          const tableRow = this.formatObjectToTableRow(row)
          return tableRow
        })
        return formmatedTableRows
      } else {
        return filteredList
      }
    },
    resultsSummaryMessage: function() {
      const unfilteredLength = this.rowsData.length
      const resultsLength = this.searchRows.length
      // const resultsLength = unfilteredLength
      // const resultsLength = this.rows.length
      const firstRecord = (this.currentPage - 1) * this.elementsPerPage + 1
      const lastRecord = this.currentPage * this.elementsPerPage
      return `showing ${firstRecord < resultsLength ? firstRecord : 0} to ${
        resultsLength > lastRecord ? lastRecord : resultsLength
      } of ${resultsLength} entries ${
        unfilteredLength !== resultsLength
          ? '(filtered from ' + unfilteredLength + ' total entries)'
          : ''
      }`
    },
  },
  mounted() {
    this.isLoading = true
    this.tablePromise
      .then(res => {
        this.isLoading = false
        this.rowsData = res.data
        this.searchRows = this.rowsData
      })
      .catch(err => {
        this.isLoading = false
        this.hasError = true
        this.errorMsg = err.message
      })
    this.searchRows = this.rowsData
  },
}
</script>

<style scoped>
.table-results-summary-message p {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-left: 10px;
  margin-bottom: 0px;
  flex-wrap: wrap;
}
.table-search-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin: 10px;
  flex-wrap: wrap;
}
.table-search-bar {
  display: inline-flex;
  justify-content: flex-end;
  align-items: center;
}
.table-search {
  margin-right: 0.5em;
  display: inline-block;
  width: 300px !important;
  height: 35px;
  border-radius: 3px;
  border: 1px solid black;
  vertical-align: middle;
  padding: 6px 12px;
}
.table-select-length {
  width: 75px;
  display: inline-block;
  border: 1px solid black;
  height: 30px;
  line-height: 30px;
}
table {
  font-family: 'Open Sans', sans-serif;
  border-collapse: collapse;
  border: 3px solid #44475c;
  margin: 5px 10px 0 10px;
}

table th {
  text-transform: uppercase;
  text-align: left;
  background: #44475c;
  color: #fff;
  cursor: pointer;
  padding: 8px;
  min-width: 30px;
}
table th:hover {
  background: #717699;
}
table td {
  text-align: left;
  padding: 8px;
  border-right: 2px solid #7d82a8;
}
table td:last-child {
  border-right: none;
}
/* table tbody tr:nth-child(2n) td {
  background: #effefe;
} */

table th:hover {
  background: #717699;
}

.disable-th {
  cursor: default;
  background: #44475c !important;
}

table td {
  text-align: left;
  padding: 8px;
  border-right: 2px solid #7d82a8;
  background-color: white;
}
table td:last-child {
  border-right: none;
}
tr:nth-child(2n) td {
  background: #f9f9f9;
}

.pagination {
  font-family: 'Open Sans', sans-serif;
  text-align: right;
  width: 100%;
}

.number {
  display: inline-block;
  padding: 4px 10px;
  color: #fff;
  border-radius: 4px;
  background: #44475c;
  margin: 0px 2px;
  cursor: pointer;
}
.number:hover,
.number.active {
  background: #717699;
}
.table-filters {
  display: flex;
  align-content: flex-start;
}
.table-filters > .form-group > label {
  display: block;
}
.table-filters > .form-group {
  margin: 0.25em;
}

.table-search-bar > button.btn {
  margin: 1px;
}
</style>
