<template>
	<div id="content" class="content">
		<ol class="breadcrumb pull-right">
			<li class="breadcrumb-item active">
				<router-link :to="{
              name: 'message-list'
            }">
					讯息管理
				</router-link>
			</li>
		</ol>
		<h1 class="page-header">讯息管理</h1>

		<b-alert :variant="request.result" :show="!!request.result">{{ request.message }}</b-alert>

		<div class="row form-group">
			<div class="col-md-12">
				<button class="btn btn-sm btn-primary" v-b-modal.modalDetail @click="setData()">
					新增
				</button>
				<button class="btn btn-sm btn-danger" @click="mDeleteDatas()">删除</button>
			</div>
		</div>
		<!-- begin panel -->
		<div class="panel panel-inverse">
			<div class="panel-heading">
				<div class="panel-heading-btn">
					<a href="javascript:;" class="btn btn-xs btn-icon btn-circle btn-default" data-click="panel-expand">
						<i class="fa fa-expand"></i>
					</a>
					<a href="javascript:;" class="btn btn-xs btn-icon btn-circle btn-warning" data-click="panel-collapse">
						<i class="fa fa-minus"></i>
					</a>
				</div>
				<h4 class="panel-title">列表</h4>
			</div>
			<div class="panel-body">
				<table class="table table-striped table-hover">
					<thead>
						<tr>
							<th class="with-checkbox">
								<div class="checkbox checkbox-css">
									<input type="checkbox" id="checkbox_all" v-model="isAllChecked">
									<label for="checkbox_all">&nbsp;</label>
								</div>
							</th>
							<th class="index">#</th>
							<th>推播内容</th>
							<th>装置</th>
							<th class="action">操作</th>
						</tr>
					</thead>
					<tbody>

						<tr v-for="(d, index) in datas" :key="index">
							<td class="with-checkbox">
								<div class="checkbox checkbox-css">
									<input type="checkbox" :id="'checkbox_'+d.id" v-model="d.checked">
									<label :for="'checkbox_'+d.id">&nbsp;</label>
								</div>
							</td>
							<td>{{ d.id }}</td>
							<td>{{ d.content }}</td>
							<td>{{ _.map(d.app_managements, 'name').join(', ') }}</td>
							<td class="action">
								<button class="btn btn-sm btn-info" v-b-modal.modalDetail @click="setData(d)">
									编辑
								</button>
								<button class="btn btn-sm btn-warning" @click="pushMessage(d.id)">推播</button>
							</td>
						</tr>

					</tbody>
				</table>

				<paginate :page="paginate.page" :lastPage="lastPage" @pageChange="pageChange" />

			</div>
		</div>

		<detail :data.sync="data" :topics="topics" @post="post" @put="put" :method="method" />

	</div>
</template>

<script>
import ListMixins from 'mixins/common/List'

export default {
	mixins: [ListMixins],
	components: {
		detail: require('./Detail.vue').default
	},
	data: () => ({
		model: {
			content: '',
			app_managements: []
		},
		topics: []
	}),
	methods: {
		async dataInit() {
			var { 0: topicRes, 1: totalRes } = await axios.all([
				this.$callApi('getMessageTopic'),
				this.$callApi('getMessageTotal')
			])
			if (topicRes.success) {
				this.topics = topicRes.data
			}
			if (totalRes.success) {
				this.paginate.total = totalRes.data.count
			}
		},
		async mGetList() {
			var res = await this.getList('getMessageList')
			if (res.success) {
				_.forEach(res.data, data => {
					data.checked = false
					_.forEach(data.app_managements, (app, i) => {
						data.app_managements[i] = _.omit(app, 'pivot')
					})
				})
				this.datas = res.data
			}
		},
		post() {
			this.mRequestProccess('postMessage')
		},
		put() {
			this.mRequestProccess('putMessage')
		},
		async mRequestProccess(key) {
			const data = this.data
			return await this.requestProccess(key, {
				content: data.content,
				topic_id: _.map(data.app_managements, 'id')
			})
		},
		mDeleteDatas() {
      this.deleteDatas('deleteAppList')
		},
		pushMessage(id) {
			this.$callApi('pushMessage', { id })
			if (res.success) {
				this.request = {
					result: 'success',
					message: '推播成功'
				}
			} else {
				this.request = {
					result: 'danger',
					message: '推播失敗'
				}
			}
		}
	},
	created() {
		this.mGetList()
		this.dataInit()
	}
}
</script>