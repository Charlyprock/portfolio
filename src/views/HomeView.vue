<template>
	<div class="flex flex-col gap-5">

		<!-- bare de recherche, titre, et bouton ajouter -->
		<header class="w-full bg-base-100 border border-base-300 flex justify-between items-center p-3 rounded-box">

			<!-- title -->
			<h1 class="text-xl text-nowrap">Liste des Etudiants</h1>
		</header>

		<!-- liste et filter -->
		<div class="w-full bg-base-100 border border-base-300 p-3 rounded-box flex flex-col gap-3">

			<!-- filtre -->
			<div class="flex items-centerg gap-3">
				<button class="btn btn-neutral">
					<FilterIcon class="size-(--icon-size)"/>
					Filtre
				</button>

				<!-- niveau -->
				<SelectFilter 
					:values="levels" 
					name="Niveau"
					@select-value="select_level"
				/>
			</div>

			<div>
				<button @click="showDeleteModalF()" :disabled="selectedItems.length <= 0" class="btn btn-error tooltip tooltip-right tooltip-error" data-tip="Supprimer les éléments cochés.">
					<DeleteIcon class="size-(--icon-size)"/>
                </button>
			</div>

			<!-- list -->
			<div>

				<div class="overflow-x-auto">
					<table class="table">
						<!-- head -->
						<thead>
						<tr>
							<th>
							<label>
								<input type="checkbox" class="checkbox" 
									:checked="isAllSelected"
									:indeterminate="isIndeterminate"
									@change="toggleAll" 
								/>
							</label>
							</th>
							<th>Nom</th>
							<th>Contact</th>
							<th></th>
						</tr>
						</thead>
						<tbody>
						<!-- row -->

						<tr v-for="student in students" :key="student.id">
							<th>
								<label>
									<input type="checkbox" class="checkbox" 
										:checked="isSelected(student.id)" 
										@change="toggleItem(student.id)"
									/>
								</label>
							</th>

							<td>
								<div class="flex items-center gap-3">
									<div class="avatar">
										<div class="mask mask-squircle h-12 w-12">
											<img
											src="https://img.daisyui.com/images/profile/demo/2@94.webp"
											alt="Avatar Tailwind CSS Component" />
										</div>
									</div>
									<div :data-tip="`${student.name}`" class="tooltip tooltip-right">
										<div class="tooltip tooltip-right font-bold text-nowrap text-ellipsis max-w-[90%] overflow-hidden">
											{{ `${student.name}` }}
										</div>
									</div>
								</div>
							</td>

							<td>
								<span class="badge badge-ghost badge-sm">{{ student.phone ?? '---' }}</span>
							</td>

							<th>
								<div class="dropdown dropdown-end">

									<button tabindex="0" class="btn btn-ghost btn-xs">
										<MenuIcon class="size-(--icon-size)" />
									</button>
									<ul tabindex="0" class="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-2xl border border-base-300 font-medium">
										<li>
											<button class="btn btn-ghost btn-sm text-sm justify-start">
												<EditIcon class="size-(--icon-size) kbd border p-[2px]" />
												Editer
											</button>
										</li>
										<li>
											<button @click="showDeleteModalF(student)" class="btn btn-ghostj btn-soft btn-error btn-sm text-sm justify-start">
												<DeleteIcon class="size-(--icon-size) kbd border border-error p-[2px] bg-error/10" />
												Suprimer
											</button>
										</li>
									</ul>
								</div>
							</th>
						</tr>

						</tbody>
						<!-- foot -->
						<tfoot>
						<tr>
							<th></th>
							<th>Nom</th>
							<th>Contact</th>
							<th></th>
						</tr>
						</tfoot>
					</table>
				</div>
			</div>

			<!-- le parginate -->
			<div class="flex justify-center">
				<Pargination :data="paginate" @new="new_page" />
			</div>
		</div>
					
		<Modal
			v-model="showDeleteModal"
			title="Supprimer les étudiants"
			message="Cette action est irréversible. Êtes-vous sûr de vouloir supprimer cet élément ?"
			confirm-text="Supprimer"
			cancel-text="Conserver"
			confirm-button-type="danger"
			:loading="deleteLoading"
			@confirm="handleDelete"
		/>
	</div>
</template>

<script setup>
import { 
	AddIcon, SearchIcon, MenuIcon, EditIcon, DeleteIcon,
	RefreschIcon, FilterIcon, CheckIcon,
} from '@/components/icons';
import SelectFilter from '@/components/SelectFilterComponent.vue';
import Modal from '@/components/ModalComponent.vue'
import Pargination from '@/components/ParginationComponent.vue';
import { usePargination } from '@/composables/useParginationComposable';
import { useCheckbox } from '@/composables/useCheckboxComposable';
import { onMounted, ref, watch, computed } from 'vue';
import { NotificationUtil } from '@/utils';

const Notification = NotificationUtil.notificationsUtil()

const students = ref([
  {
	id: 1,
    name: "John Doe",
    phone: "123-456-7890",
  },
  {
	id: 2,
    name: "Jane Smith",
    phone: "987-654-3210",
  },
  {
	id: 3,
    name: "Alice Johnson",
    phone: "555-555-5555",
  },
  {
	id: 4,
    name: "Bob Brown",
    phone: "444-444-4444",
  },
  {
	id: 5,
    name: "Charlie White",
    phone: "333-333-3333",
  },
  {
	id: 6,
    name: "David Green",
    phone: "222-222-2222",
  },
  {
	id: 7,
    name: "Eve Black",
    phone: "111-111-1111",
  },
  {
	id: 8,
    name: "Frank Blue",
    phone: "666-666-6666",
  },
  {
	id: 9,
    name: "Grace Yellow",
    phone: "777-777-7777",
  },
  {
	id: 10,
    name: "Hank Purple",
    phone: "888-888-8888",
  },
  { 
	id: 11,
	name: "Ivy Orange",
	phone: "999-999-9999",
  },
  {
	id: 12,
	name: "Ivy Orange",
    phone: "999-999-9999",
  },
])

const levels = ref([
	{ id: 1, name: "Niveau 1" },
	{ id: 2, name: "Niveau 2" },
	{ id: 3, name: "Niveau 3" },
	{ id: 4, name: "Niveau 4" },
	{ id: 5, name: "Niveau 5" },
	{ id: 6, name: "Niveau 6" },
	{ id: 7, name: "Niveau 7" },
	{ id: 8, name: "Niveau 8" },
	{ id: 9, name: "Niveau 9" },
	{ id: 10, name: "Niveau 10" },
	{ id: 11, name: "Niveau 11" },
	{ id: 12, name: "Niveau 12" },
])


const {
	new_page,
	refresch_paginate,
	paginate,
} = usePargination()

const {
	isAllSelected,
	isIndeterminate,
	selectedItems,
	isSelected,
	toggleAll,
	toggleItem
} = useCheckbox(students)


const showDeleteModal = ref(false)
const deleteLoading = ref(false)

function delete_student(id){
	students.value = students.value.filter(
		stud => stud.id != id
	)
	Notification.success("Suppréssion réussir.")
	closeDeleteModalF()
}

function delete_all(){
	students.value = students.value.filter(
		stud => !selectedItems.value.includes(stud.id)
	)
	selectedItems.value = []
	Notification.success("Suppréssion réussir.")
}

function handleDelete(){
	deleteLoading.value = true
	if (student_click.value) {
		delete_student(student_click.value.id)
	} else {
		delete_all()
	}
}

const student_click = ref(null)
function showDeleteModalF(student=null){
	showDeleteModal.value = true
	student_click.value = student
}

function closeDeleteModalF(){
	showDeleteModal.value = false
	student_click.value = null
}

function select_level(value){
	Notification.info(`Niveau sélectionné: ${value.name}`)
}

</script>