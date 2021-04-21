<template>
	<div class="bg-layout">
		<div class="cnt-login">
			<img class="logo q-pb-lg" src="/logo.png" />
			<div class="cnt-form">
				<q-input v-model="form.username" filled label="Login" />
				<q-input
					v-model="form.password"
					filled
					:type="isPwd ? 'password' : 'text'"
					label="Senha"
				>
					<template v-slot:append>
						<q-icon
							:name="isPwd ? 'visibility_off' : 'visibility'"
							class="cursor-pointer"
							@click="isPwd = !isPwd"
						/>
					</template>
				</q-input>
				<q-btn
					size="lg"
					@click="login"
					color="primary"
					label="Entrar"
					:loading="loading"
					:disable="loading"
				/>
			</div>
		</div>
	</div>
</template>

<script>
	import { mapMutations } from 'vuex'
	export default {
		data: () => ({
			isPwd: true,
			loading: false,
			form: {
				username: 'simpleteste',
				password: 'CQUT2sLA8wgO*nnO5JsAQ28u',
			},
		}),
		methods: {
			...mapMutations('auth', ['setUser']),
			async login() {
				try {
					this.loading = true
					const { data } = await this.$wp.post(
						'/jwt-auth/v1/token',
						this.form
					)

					this.setUser(data)
					this.$router.push('/pedidos')

					this.$q.notify({
						position: 'top-right',
						type: 'positive',
						message: 'Login efetuado com sucesso',
					})
					this.loading = false
				} catch (error) {
					this.$q.notify({
						position: 'top-right',
						type: 'negative',
						message: 'Usuário ou Senha errados',
					})
					this.loading = false
				}
			},
		},
	}
</script>

<style lang="scss" scoped>
	.cnt-login {
		width: 100vw;
		height: 100vh;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		.logo {
			width: 250px;
		}
		.cnt-form {
			display: flex;
			flex-direction: column;
			width: 300px;
			gap: 18px;
		}
	}
</style>
