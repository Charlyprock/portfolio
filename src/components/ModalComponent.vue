<template>
    <!-- Overlay -->
    <Teleport to="body">

        <Transition enter-active-class="transition-all duration-300 ease-out" enter-from-class="opacity-0"
            enter-to-class="opacity-100" leave-active-class="transition-all duration-200 ease-in"
            leave-from-class="opacity-100" leave-to-class="opacity-0">

            <div v-if="isVisible" class="fixed inset-0 z-50 flex items-center justify-center bg-base-100/50 bg-opacity-50 p-4"
                @click="handleOverlayClick">
                
                <!-- Modal Container -->
                <Transition enter-active-class="transition-all duration-300 ease-out"
                    enter-from-class="opacity-0 scale-95 translate-y-4"
                    enter-to-class="opacity-100 scale-100 translate-y-0"
                    leave-active-class="transition-all duration-200 ease-in"
                    leave-from-class="opacity-100 scale-100 translate-y-0"
                    leave-to-class="opacity-0 scale-95 translate-y-4">

                    <div v-if="isVisible"
                        class="relative flex flex-col w-full max-w-md max-h-[90%] mx-auto bg-base-100 rounded-box shadow-xl transform border border-base-300" @click.stop>
                        <!-- Close Button -->
                        <button v-if="showCloseButton" @click="handleCancel"
                            class="absolute top-4 right-4 text-base-content/40 hover:text-base-content/60 transition-colors">
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                        </button>

                        <!-- Header -->
                        <div v-if="title" class="px-6 py-4 border-b border-base-300">
                            <h3 class="text-lg font-semibold pr-8">
                                {{ title }}
                            </h3>
                        </div>

                        <!-- Body -->
                        <div class="px-6 py-4 flex-1 h-full overflow-y-auto">
                            <!-- Slot pour contenu personnalisé -->
                            <slot>
                                <p class="text-base-content/80 leading-relaxed">
                                    {{ message }}
                                </p>
                            </slot>
                        </div>

                        <!-- Footer -->
                        <div class="px-6 py-4 bg-base-200/30 rounded-b-box flex justify-end space-x-3">
                            <button type="button" @click="handleCancel" :class="cancelButtonClass" :disabled="loading">
                                {{ cancelText }}
                            </button>

                            <button type="button" @click="handleConfirm" :class="confirmButtonClass" :disabled="loading">
                                <LoadingIcon v-if="loading" class="size-(--icon-size)" />
                                {{ confirmText }}
                            </button>
                        </div>
                    </div>
                </Transition>
            </div>
        </Transition>
    </Teleport>
</template>

<script setup>
import { LoadingIcon } from './icons'
import { ref, computed, nextTick, onMounted, onUnmounted } from 'vue'

// Props
const props = defineProps({
    // Contrôle de visibilité
    modelValue: {
        type: Boolean,
        default: false
    },

    // Contenu
    title: {
        type: String,
        default: ''
    },
    message: {
        type: String,
        default: ''
    },

    // Boutons
    confirmText: {
        type: String,
        default: 'Confirmer'
    },
    cancelText: {
        type: String,
        default: 'Annuler'
    },

    // Styles des boutons
    confirmButtonType: {
        type: String,
        default: 'primary', // primary, danger, success, warning
        validator: (value) => ['primary', 'danger', 'success', 'warning'].includes(value)
    },
    cancelButtonType: {
        type: String,
        default: 'secondary'
    },

    // Options
    persistent: {
        type: Boolean,
        default: false // Si true, ne se ferme pas en cliquant sur l'overlay
    },
    showCloseButton: {
        type: Boolean,
        default: true
    },
    loading: {
        type: Boolean,
        default: false
    }
})

// Emits
const emit = defineEmits(['update:modelValue', 'confirm', 'cancel', 'close'])

// État local
const isVisible = computed({
    get: () => props.modelValue,
    set: (value) => emit('update:modelValue', value)
})

// Classes CSS pour les boutons
const buttonBaseClass = 'btn'

const confirmButtonClass = computed(() => {
    const baseClass = buttonBaseClass
    const typeClasses = {
        primary: 'btn-primary',
        danger: 'btn-error',
        success: 'btn-success',
        warning: 'btn-warning'
    }
    return `${baseClass} ${typeClasses[props.confirmButtonType]}`
})

const cancelButtonClass = computed(() => {
    const baseClass = buttonBaseClass
    return `${baseClass}`
})

// Méthodes
const handleConfirm = async () => {
    emit('confirm')
}

const handleCancel = () => {
    isVisible.value = false
    emit('cancel')
    emit('close')
}

const handleOverlayClick = () => {
    if (!props.persistent) {
        handleCancel()
    }
}

// Gestion des touches clavier
const handleKeydown = (event) => {
    if (!isVisible.value) return

    if (event.key === 'Escape' && !props.persistent) {
        handleCancel()
    } else if (event.key === 'Enter') {
        handleConfirm()
    }
}

// Gestion du focus trap (optionnel)
onMounted(() => {
    document.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
    document.removeEventListener('keydown', handleKeydown)
})
</script>