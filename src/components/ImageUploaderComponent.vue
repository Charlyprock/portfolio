<template>
	<div class="size-full relative">

		<!-- Zone de prévisualisation -->
		<div class="relative group size-full rounded-full border border-inherit border-dashed bg-red-300f overflow-hidden">

			<div class="size-full flex items-center justify-center overflow-hidden transition-colors hover:border-primary cursor-pointer"
				:class="{ 'bg-base-200': isDragOver }" @click="triggerFileInput" @drop="handleDrop"
				@dragover="handleDragOver" @dragleave="handleDragLeave">

				<!-- Image preview -->
				<div v-if="previewUrl" class="relative w-full h-full">
					<img :src="previewUrl" :alt="alt || 'Image preview'" class="w-full h-full object-cover" />
				</div>

				<!-- Zone de drop vide -->
				<div v-else class="text-center p-8">
					<ImagePlusIcon class="mx-auto h-12 w-12 opacity-50 mb-4"/>
					<div class="text-sm opacity-60">
						<p class="font-medium">Cliquez ou glissez une image ici</p>
						<p class="text-xs mt-1">{{ allowedFormats.join(', ').toUpperCase() }} - Max {{ maxSizeMB }}MB
						</p>
					</div>
				</div>
			</div>

			<!-- Indicateur de chargement -->
			<div v-if="isUploading" class="absolute inset-0 bg-base-100 flex items-center justify-center">
				<div class="flex items-center gap-2">
					<LoadingIcon class="size-6" />
					<span class="text-sm opacity/50">Traitement...</span>
				</div>
			</div>
				
		</div>

		<!-- les boutons -->
		<div class="flex items-center w-fit bg-base-100 outline-3 outline-offset-4 outline-base-100 border border-base-300 rounded-field -translate-y-1/2 translate-x-full">
			
			<button type="button" @click.stop="triggerFileInput" class="tooltip btn btn-accent btn-ghost" data-tip="Changer l'image">
				<EditIcon class="size-(--icon-size)" />
			</button>

			<button type="button" @click.stop="removeImage" :disabled="!imageFile" class="tooltip tooltip-error btn btn-error btn-ghost" data-tip="Supprimer">
				<DeleteIcon class="size-(--icon-size)" />
			</button>
		</div>

		<!-- Input file caché -->
		<input ref="fileInput" type="file" class="hidden" :accept="acceptedTypes" @change="handleFileSelect" />

		<!-- Informations sur l'image -->
		<div v-if="imageInfo && showImageInfo" class="mt-3 text-xs text-gray-500 space-y-1">
			<div class="flex justify-between">
				<span>Taille:</span>
				<span>{{ formatFileSize(imageInfo.size) }}</span>
			</div>
			<div class="flex justify-between">
				<span>Dimensions:</span>
				<span>{{ imageInfo.width }} x {{ imageInfo.height }}px</span>
			</div>
			<div class="flex justify-between">
				<span>Format:</span>
				<span>{{ imageInfo.type.split('/')[1].toUpperCase() }}</span>
			</div>
		</div>
	
	</div>


	<!-- 
		exemple d'utilisation:
		<ImageUploader ref="imageUploader" 
			default-image-url='https://picsum.photos/400/400?random=1' 
			:max-size-m-b="2"
			:max-width="800" 
			:max-height="800" 
			:allowed-formats="['jpg', 'jpeg', 'png', 'webp']" 
			:quality="0.9"
			:auto-resize="true" 
			:show-image-info="true" 
			alt="Photo de profil" 
			@image-changed="onImageChanged"
			@image-removed="onImageRemoved" 
			@error="onImageError" 
		/>
	-->
</template>

<script>
import { LoadingIcon, DeleteIcon, EditIcon, ImagePlusIcon } from './icons'
export default {
	name: 'ImageUploader',

	components: {
		LoadingIcon,
		DeleteIcon,
		EditIcon,
		ImagePlusIcon,
	},
	props: {
		// URL de l'image par défaut (pour l'édition)
		defaultImageUrl: {
			type: String,
			default: ''
		},
		// Formats autorisés
		allowedFormats: {
			type: Array,
			default: () => ['jpg', 'jpeg', 'png', 'webp', 'gif']
		},
		// Taille maximale en MB
		maxSizeMB: {
			type: Number,
			default: 5
		},
		// Dimensions maximales
		maxWidth: {
			type: Number,
			default: 500
		},
		maxHeight: {
			type: Number,
			default: 500
		},
		// Qualité de compression (0.1 à 1.0)
		quality: {
			type: Number,
			default: 0.8
		},
		// Afficher les informations de l'image
		showImageInfo: {
			type: Boolean,
			default: false
		},
		// Alt text pour l'accessibilité
		alt: {
			type: String,
			default: ''
		},
		// Redimensionnement automatique
		autoResize: {
			type: Boolean,
			default: true
		}
	},
	emits: ['imageChanged', 'imageRemoved', 'error'],
	data() {
		return {
			imageFile: null,
			previewUrl: '',
			originalImageUrl: '',
			isDragOver: false,
			isUploading: false,
			error: null,
			imageInfo: null,
			showCropModal: false
		}
	},
	computed: {
		acceptedTypes() {
			return this.allowedFormats.map(format => `image/${format === 'jpg' ? 'jpeg' : format}`).join(',')
		}
	},
	watch: {
		defaultImageUrl: {
			immediate: true,
			handler(newUrl) {
				if (newUrl && !this.imageFile) {
					this.previewUrl = newUrl
					this.originalImageUrl = newUrl
				}
			}
		}
	},
	methods: {
		triggerFileInput() {
			this.$refs.fileInput.click()
		},

		handleFileSelect(event) {
			const file = event.target.files[0]
			if (file) {
				this.processFile(file)
			}
		},

		handleDrop(event) {
			event.preventDefault()
			this.isDragOver = false
			const files = event.dataTransfer.files
			if (files.length > 0) {
				this.processFile(files[0])
			}
		},

		handleDragOver(event) {
			event.preventDefault()
			this.isDragOver = true
		},

		handleDragLeave() {
			this.isDragOver = false
		},

		async processFile(file) {
			this.error = null
			this.isUploading = true
			
			try {
				// Validation du type de fichier
				const fileExtension = file.name.split('.').pop().toLowerCase()
				if (!this.allowedFormats.includes(fileExtension)) {
					throw new Error(`Format non supporté. Formats acceptés: ${this.allowedFormats.join(', ')}`)
				}

				// Validation de la taille
				const fileSizeMB = file.size / (1024 * 1024)
				if (fileSizeMB > this.maxSizeMB) {
					throw new Error(`Fichier trop volumineux. Taille maximale: ${this.maxSizeMB}MB`)
				}

				// Création de l'URL de prévisualisation
				const reader = new FileReader()
				reader.onload = async (e) => {
					this.originalImageUrl = e.target.result

					// Obtenir les informations de l'image
					const img = new Image()
					img.onload = async () => {
						this.imageInfo = {
							width: img.width,
							height: img.height,
							size: file.size,
							type: file.type,
							name: file.name
						}

						// Redimensionnement automatique si nécessaire
						let processedFile = file
						if (this.autoResize && (
							(this.maxWidth && img.width > this.maxWidth) ||
							(this.maxHeight && img.height > this.maxHeight)
						)) {
							processedFile = await this.resizeImage(file, img)
						}

						this.imageFile = processedFile
						this.previewUrl = await this.createPreviewUrl(processedFile)
						this.isUploading = false

						// Émettre l'événement avec le fichier
						this.$emit('imageChanged', {
							file: processedFile,
							info: this.imageInfo,
							preview: this.previewUrl
						})
					}
					img.src = e.target.result
				}
				reader.readAsDataURL(file)

			} catch (error) {
				this.error = error.message
				this.isUploading = false
				this.$emit('error', error.message)
			}
		},

		async resizeImage(file, img) {
			return new Promise((resolve) => {
				const canvas = document.createElement('canvas')
				const ctx = canvas.getContext('2d')

				// Calculer les nouvelles dimensions
				let { width, height } = this.calculateNewDimensions(img.width, img.height)

				canvas.width = width
				canvas.height = height

				// Dessiner l'image redimensionnée
				ctx.drawImage(img, 0, 0, width, height)

				// Convertir en blob
				canvas.toBlob((blob) => {
					const resizedFile = new File([blob], file.name, {
						type: file.type,
						lastModified: Date.now()
					})
					resolve(resizedFile)
				}, file.type, this.quality)
			})
		},

		calculateNewDimensions(originalWidth, originalHeight) {
			let width = originalWidth
			let height = originalHeight

			if (this.maxWidth && width > this.maxWidth) {
				height = (height * this.maxWidth) / width
				width = this.maxWidth
			}

			if (this.maxHeight && height > this.maxHeight) {
				width = (width * this.maxHeight) / height
				height = this.maxHeight
			}

			return { width: Math.round(width), height: Math.round(height) }
		},

		async createPreviewUrl(file) {
			return new Promise((resolve) => {
				const reader = new FileReader()
				reader.onload = (e) => resolve(e.target.result)
				reader.readAsDataURL(file)
			})
		},

		removeImage() {
			this.imageFile = null
			this.previewUrl = ''
			this.originalImageUrl = ''
			this.imageInfo = null
			this.error = null
			this.$refs.fileInput.value = ''
			this.$emit('imageRemoved')
		},

		formatFileSize(bytes) {
			if (bytes === 0) return '0 Bytes'
			const k = 1024
			const sizes = ['Bytes', 'KB', 'MB', 'GB']
			const i = Math.floor(Math.log(bytes) / Math.log(k))
			return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
		},

		// Méthode publique pour obtenir le fichier
		getImageFile() {
			return this.imageFile
		},

		// Méthode publique pour obtenir les informations
		getImageInfo() {
			return this.imageInfo
		},

		// Méthode publique pour réinitialiser le composant
		reset() {
			this.removeImage()
		}
	}
}
</script>