<template>
	<modal v-model="status" title="Novo Cliente" @save="save">
		<div class="row q-col-gutter-md">
			<div class="col-8">
				<q-input v-model="form.nome" label="Nome" />
			</div>
			<div class="col-4">
				<q-input v-model="form.cpf" label="CPF" mask="###.###.###-##" />
			</div>

			<div class="col-6">
				<q-input v-model="form.email" label="Email" />
			</div>
			<div class="col-3">
				<q-input
					v-model="form.telefone"
					label="Telefone"
					mask="(##) ####-####"
				/>
			</div>
			<div class="col-3">
				<q-input
					v-model="form.celular"
					label="Celular"
					mask="(##) #####-####"
				/>
			</div>
		</div>
		<div class="row q-col-gutter-md q-mt-md">
			<div class="col-3">
				<q-input v-model="form.cep" label="CEP" mask="#####-###" />
			</div>
		</div>
		<div class="row q-col-gutter-md">
			<div class="col-6">
				<q-input v-model="form.bairro" label="Bairro" />
			</div>
			<div class="col-4">
				<q-input v-model="form.localidade" label="Cidade" />
			</div>
			<div class="col-2">
				<q-input v-model="form.uf" label="UF" />
			</div>

			<div class="col-6">
				<q-input v-model="form.logradouro" label="Rua" />
			</div>
			<div class="col-3">
				<q-input v-model="form.numero" ref="num" label="Numero" />
			</div>
			<div class="col-3">
				<q-input v-model="form.complemento" label="Complemento" />
			</div>

			<div class="col">
				<q-input v-model="form.referencia" label="Referencia" />
			</div>
		</div>
	</modal>
</template>

<script>
	import modal from 'components/modal'
	import customer from '../customer'
	import { clone } from 'lodash'
	import axios from 'axios'

	export default {
		components: {
			modal,
		},
		inject: ['loaddata'],
		data() {
			return {
				status: false,
				form: clone(customer),
			}
		},
		watch: {
			'form.cep': async function (val) {
				if (val.length == 9) {
					const cep = val.replace('-', '')
					const uri = `https://viacep.com.br/ws/${cep}/json/`
					const { data } = await axios.get(uri)
					this.$set(this, 'form', { ...this.form, ...data })
					this.$refs.num.focus()
				}
			},
		},
		methods: {
			open(data = null) {
				if (data) this.$set(this, 'form', clone(data))
				else this.$set(this, 'form', clone(customer))
				this.status = true
			},
			async save(res) {
				try {
					await this.$axios.post('/customers', this.form)
					await this.loaddata()
					res(true)
				} catch (error) {}
			},
		},
	}
</script>

<style lang="scss" scoped></style>
