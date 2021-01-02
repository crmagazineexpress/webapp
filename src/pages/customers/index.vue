<template>
	<div>
		<!-- <q-btn
			label="cliente"
			icon="fas fa-plus"
			color="positive"
			class="q-mb-md"
			@click="$refs.modal.open()"
		/> -->
		<div class="row q-mb-lg">
			<div class="col-6">
				<q-input
					filled
					label="Pesquisar por nome, cpf, email"
					v-model="filter"
				/>
			</div>
			<!-- <div class="col text-right">
				<q-btn
					label="Novo cliente"
					color="secondary"
					class="q-mb-md"
					@click="$refs.modal.open()"
				/>
			</div> -->
		</div>
		<q-table
			:data="filtered_list"
			:columns="columns"
			row-key="name"
			:pagination="{ rowsPerPage: 10 }"
		>
			<template v-slot:body="props">
				<q-tr :props="props">
					<q-td key="name" :props="props">
						<div class="cnt-line">
							<b>{{ props.row.nome }} </b>
							<i v-if="props.row.cpf">
								{{ props.row.cpf }}
							</i>
						</div>
					</q-td>
					<q-td key="phone" :props="props">
						<div class="cnt-line">
							<span v-if="props.row.celular" class="iconed">
								<q-icon
									class="q-mr-sm"
									name="fas fa-mobile-alt"
								/>
								{{ props.row.celular }}
							</span>
							<span v-if="props.row.telefone" class="iconed">
								<q-icon
									class="q-mr-sm"
									name="fas fa-phone-alt"
								/>
								{{ props.row.telefone }}
							</span>
							<span v-if="props.row.email" class="iconed">
								<q-icon
									class="q-mr-sm"
									name="fas fa-envelope-open-text"
								/>
								{{ props.row.email }}
							</span>
						</div>
					</q-td>
					<q-td key="address" :props="props">
						<div class="cnt-line">
							<span>{{ props.row.cep }}</span>
							<span>
								{{ props.row.bairro }},
								{{ props.row.localidade }}
								{{ props.row.uf }}
							</span>
							<span>
								{{ props.row.logradouro }}
								{{ props.row.numero }}
								{{ props.row.complemento }}
							</span>
						</div>
					</q-td>
					<q-td key="actions" :props="props">
						<q-btn
							icon="edit"
							color="primary"
							@click="$refs.modal.open(props.row)"
							flat
							round
							size="md"
						/>
						<trash-btn :id="props.row._id" />
					</q-td>
				</q-tr>
			</template>
		</q-table>

		<customer-modal ref="modal" />
	</div>
</template>

<script>
	import TrashBtn from './components/trash-btn'
	import CustomerModal from './components/customer-modal'
	import { kebabCase } from 'lodash'

	export default {
		name: 'customers',
		components: {
			TrashBtn,
			CustomerModal,
		},
		data() {
			return {
				columns: [
					{
						name: 'name',
						label: 'Nome',
						align: 'left',
						field: 'nome',
						sortable: true,
					},
					{
						name: 'phone',
						label: 'Contato',
						align: 'left',
						field: 'telefone',
						sortable: true,
					},
					{
						name: 'address',
						label: 'Endereço',
						align: 'left',
						field: 'logradouro',
						sortable: true,
					},
					{
						name: 'actions',
						label: 'Ações',
						field: '_id',
					},
				],
				list: [],
				filter: '',
			}
		},
		provide() {
			return {
				loaddata: () => this.loaddata(),
			}
		},
		computed: {
			filtered_list() {
				return this.list.filter(({ nome, email, cpf }) => {
					const hasName =
						kebabCase(nome).indexOf(kebabCase(this.filter)) != -1
					const hasEmail = email.indexOf(this.filter) != -1
					const hasCpf = cpf.indexOf(this.filter) != -1

					return hasName || hasEmail || hasCpf
				})
			},
		},
		methods: {
			async loaddata() {
				try {
					const { data } = await this.$axios.get('/customers')
					this.list = data
				} catch (error) {
					console.log(error)
				}
			},
		},
		mounted() {
			this.loaddata()
		},
	}
</script>

<style lang="scss" scoped>
	.cnt-line {
		display: flex;
		flex-direction: column;
	}
</style>
