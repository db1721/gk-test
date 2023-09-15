<template>
    <form action="#" class="search-form bbp-search-form">
        <div class="input-group">
            <input type="search" v-model="search" class="form-control" placeholder="Search here...">
            <span class="input-group-btn">
                <button class="btn" type="button" @click="processSearch"><i class="fa fa-search"></i></button>
            </span>
        </div>
    </form>

    <div class="container">
        <div class="row">
            <div class="pull-right">
                <button v-if="search_results.length > 0" class="btn btn-primary" type="button" @click="clearSearch">Close Search Results</button>
            </div>
            <div v-for="result in search_results" :key="result.id">
                <h3 class="single-topic-title">
                    <router-link :to="{ name: 'forum-view', params: { forum_system_name: result.system_name } }">
                        {{ result.title }} - <span class="single-topic-author">{{ result.user.username }}</span>
                    </router-link>
                </h3>
                <p class="summary-result">
                    <span class="date-created">{{ result.createdAt }} -- </span>
                    <!-- Lorem ipsum dolor sit amet, consectetur adipiscing elit <span class="keyword-result">keyword or phrases</span>. Ut aliquet sollicitudin sem, vel iaculis turpis tempus sed. In lacinia adipiscing elementum. Sed vulputate arcu a augue dapibus fringilla vel id ante. -->
                    {{ result.content }}
                </p>
                <div class="spacer-sm"></div>
            </div>

            <a href="javascript:void(0)" @click="page--" v-if="search_results.length > 0 && page > 1" class="btn btn-lg btn-default"><i class="fa fa-angle-double-left"></i> PREVIOUS</a>
            &nbsp;
            <a href="javascript:void(0)" @click="page++" v-if="search_results.length > 0" class="btn btn-lg btn-default"><i class="fa fa-angle-double-right"></i> MORE</a>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
export default {
    data () {
        return {
            search: '',
            page: 1
        }
    },

    computed: {
        ...mapGetters('forumStore', {
            search_results: 'search_results'
        })
    },

    watch: {
        search (searchValue) {
            if (searchValue.length > 2) {
                this.searchForums({
                    search: this.search,
                    page: this.page
                })
            }
            else {
                this.EMPTY_SEARCH_RESULTS()
            }
        },

        page () {
            if (this.search.length > 2) {
                this.searchForums({
                    search: this.search,
                    page: this.page
                })
            }
        }
    },

    methods: {
        ...mapActions('forumStore', ['searchForums']),
        ...mapMutations('forumStore', ['EMPTY_SEARCH_RESULTS']),

        processSearch () {
            if (this.search.length < 3) {
                this.$notify({
                    type: "error",
                    title: 'Search Error',
                    text: 'Search needs 3 or more characters to proceed'
                })
                return
            }

            this.searchForums({
                search: this.search,
                page: this.page
            })
        },

        clearSearch () {
            this.search = ''
            this.EMPTY_SEARCH_RESULTS()
        }
    }
}
</script>
