<template>
	<div class="dropdown dropdown-start w-full">
		<button :disabled="props.values.length < 1" tabindex="0" role="button"
			class="w-full flex items-center justify-between btn btn-outline border-base-300 p-(--padding-box) text-sm">
			<p class="text-nowrap overflow-hidden text-ellipsis max-w-[80%]">{{ props.name }} ({{ select?.[props.defaulField] }})</p>
			<LoadingIcon v-if="props.loading" class="size-(--icon-size)" />
			<DirectionIcon v-else class="size-(--icon-size)" />
		</button>
		<ul tabindex="0"
			class="dropdown-content menu bg-base-100 rounded-box z-1 w-52 mt-1 max-h-[300px] flex-nowrap overflow-y-auto p-2 shadow-xl border border-base-300">
			<li @click="select_value(value)" v-for="value in props.values" :key="value.id"
				class="max-w-full overflow-hidden rounded-field">
				<div class="flex items-center gap-2 w-full">
					<CheckIcon :class="[select?.id != value.id ? 'text-transparent' : '', 'size-(--icon-size)']" />
					<a class="text-nowrap overflow-hidden text-ellipsis flex-1">{{ value[props.defaulField] }}</a>
				</div>
			</li>
		</ul>
	</div>
</template>

<script setup>
import {
	DirectionIcon,
	CheckIcon, LoadingIcon,
} from '@/components/icons';
import { onMounted, ref, watch } from 'vue';

const props = defineProps({
	loading: {
		default: false
	},
	values: null,
	name: '',
	defaulField: {
		default: 'name'
	},
	defaultSelect: Object
})

const select = ref({})
const emit = defineEmits(['selectValue'])

// // Watcher pour surveiller les changements de props.values
watch(() => props.values, (newValues) => {
	if (newValues && newValues.length > 0) {
		if(props.defaultSelect){
			// alert("dans le defaul")
			select.value = props.defaultSelect
		} else {
			// alert("dans le 0")
			select.value = props.values[0]
		}
		
		// emit('selectValue', select.value)
	}
}, { immediate: true });

watch(() => props.defaultSelect, (newValues) => {
	select.value = newValues
})

function select_value(value) {
	if (value.id != select.value.id) {
		select.value = value
		emit('selectValue', value)
	}
}
</script>