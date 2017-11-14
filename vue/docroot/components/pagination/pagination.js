define(["Vue"], function() {
   return {
       // language=HTML
       template: `           
           <div class="pagination">
               <a class="pagination__button pagination__next" href="javascript:void(0)" v-on:click="nextPage" v-if="hasNext()">
                   next
               </a>
               <div class="pagination__mid">
                   <ul class="pagination__list">
                       <li class="pagination__list-cell pagination__list-cell-first">
                           <a class="pagination__link" v-on:click="changePage(1)" href="javascript:void(0);" v-bind:class="{ current: currentPage === page }" v-if="hasFirst()">1</a>
                       </li>
                       <li class="pagination__list-cell pagination__list-cell-separate" v-if="hasFirst()">
                           ...
                       </li>
                        <li class="pagination__list-cell" v-for="page in pages">
                            <a href="javascript:void(0);" class="pagination__link" v-on:click="changePage(page)" v-bind:class="{ current: currentPage === page }">
                                {{ page }}
                            </a>
                        </li>
                       <li class="pagination__list-cell pagination__list-cell-separate" v-if="hasLast()">
                           ...
                       </li>
                       <li class="pagination__list-cell pagination__list-cell-last">
                           <a class="pagination__link" v-on:click="changePage(totalPages)" href="javascript:void(0);" v-bind:class="{ current: currentPage === page }" v-if="hasLast()">{{ totalPages }}</a>
                       </li>
                   </ul>
               </div>
               <a class="pagination__button pagination__prev" href="javascript:void(0)" v-on:click="prevPage" v-if="hasPrev()">
                   prev
               </a>
           </div>
       `,
       data () {
           return {
               page: ""
           }
       },
       methods: {
           nextPage: function() {
               this.$store.dispatch("nextPage");
           },
           prevPage: function() {
               this.$store.dispatch("prevPage");
           },
           hasPrev: function() {
               return this.$store.getters.getCurrentPage > 1;
           },
           hasNext: function() {
               return this.$store.getters.getCurrentPage < this.$store.getters.getTotalPages;
           },
           changePage: function(page) {
               this.$store.dispatch("changePage", page);
           },
           hasFirst: function() {
               return this.rangeStart !== 1;
           },

           hasLast: function() {
               return this.rangeEnd < this.totalPages;
           }
       },
       computed: {
           totalPages: {
               get() {
                   return this.$store.state.totalPages;
               }
           },
           currentPage: {
               get() {
                   return this.$store.state.currentPage;
               }
           },
           pages: function() {
               let pages = [];
               for (let i = this.rangeStart; i < this.rangeEnd; i++) {
                   pages.push(i);
               }
               return pages;
           },
           rangeStart: function() {
               let start = this.$store.getters.getCurrentPage - this.$store.getters.getPageRange;

               return (start > 0) ? start : 1;
           },
           rangeEnd: function() {
               let end = this.$store.getters.getCurrentPage + this.$store.getters.getPageRange;

               return (end < this.$store.getters.getTotalPages) ? end : this.$store.getters.getTotalPages;
           }
       }
   }
});