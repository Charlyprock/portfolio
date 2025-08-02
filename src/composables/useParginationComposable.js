import { ref, onMounted, watch } from 'vue'

export function usePargination(){

    const paginate = ref({
        count: null,
        total_pages: null,
        current_page: null,
        next: null,
        previous: null,
        data: null
    })

    function new_page(data){
        refresch_paginate(data)
    }

    function refresch_paginate(data){
        paginate.value.count = data?.count
        paginate.value.current_page = data?.current_page
        paginate.value.total_pages = data?.total_pages
        paginate.value.next = data?.next
        paginate.value.previous = data?.previous
        paginate.value.data = data
    }

    return {
        new_page,
        refresch_paginate,
        paginate
    }

}