import { ref, computed } from 'vue';

export function useCheckbox(data) {

    const selectedItems = ref([])
    const isSelected = (itemId) => {
        return selectedItems.value.includes(itemId)
    }

    const toggleItem = (itemId) => {
        const index = selectedItems.value.indexOf(itemId)
        if (index > -1) {
            selectedItems.value.splice(index, 1)
        } else {
            selectedItems.value.push(itemId)
        }
    }

    const isAllSelected = computed(() => {
        return data.value.length > 0 && selectedItems.value.length === data.value.length
    })

    const isIndeterminate = computed(() => {
        return selectedItems.value.length > 0 && selectedItems.value.length < data.value.length
    })

    // Gestion du checkbox maître
    const toggleAll = () => {
        if (isAllSelected.value) {
            selectedItems.value = []
        } else {
            selectedItems.value = [...data.value.map(item => item.id)]
        }
    }

    return {
        isAllSelected,
        isIndeterminate,
        selectedItems,
        isSelected,
        toggleAll,
        toggleItem,
    }

}