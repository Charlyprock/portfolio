<template>
    <div v-if="props.data?.total_pages > 1" class="flex justify-center items-center">

        <button @click="new_page(props.data?.previous)" :disabled="!props.data?.previous" class="btn btn-sm p-2 mr-2 rounded-full">
            <DirectionIcon class="size-(--icon-size) rotate-90"/>
        </button>

        <div class="py-1 px-2 bg-base-200 rounded-box flex gap-1">
            <button
                class="btn btn-sm"
                :class="{ 'btn-primary': props.data?.current_page === page }"
                v-for="page in visiblePages"
                :key="page"
                :disabled="page === '…'"
                @click="page !== '…' && gotoPage(page)"
            >
                {{ page }}
            </button>
        </div>

        <button @click="new_page(props.data?.next)" :disabled="!props.data?.next" class="btn btn-sm p-2 ml-2 rounded-full">
            <DirectionIcon class="size-(--icon-size) -rotate-90"/>
        </button>
    </div>
</template>

<script setup>
import { DirectionIcon } from '@/components/icons';
import { computed } from 'vue'
import Axios from '@/services/axios.service'

const props = defineProps({
  data: Object
})

const emit = defineEmits(['new'])

function new_page(url) {
  if (!url) return
  Axios.get(url).then((res) => {
    emit('new', res.data)
  })
}

// Génère l'URL de base à partir de next ou previous
function gotoPage(pageNumber) {
  const url = new URL(props.data?.next || props.data?.previous || '/students/')
  url.searchParams.set('page', pageNumber)
  new_page(url.href)
}

// Calcule de l'afficher avec les points ...
const visiblePages = computed(() => {
  const total = props.data?.total_pages || 1
  const current = props.data?.current_page || 1

  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1)

  if (current <= 4) {
    return [1, 2, 3, 4, 5, '…', total]
  }

  if (current >= total - 3) {
    return [1, '…', total - 4, total - 3, total - 2, total - 1, total]
  }

  return [1, '…', current - 1, current, current + 1, '…', total]
})
</script>
