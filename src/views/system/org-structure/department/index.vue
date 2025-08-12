<script setup lang="ts">
import {
  Button,
  type EnhancedTableProps,
  type FormInstanceFunctions,
  type FormProps,
  Popconfirm,
  Space,
} from 'tdesign-vue-next'
import deptApi, {
  type DeptDropdownItem,
  type DeptDto,
  type DeptTreeDto,
} from '@/api/system/org-structure/dept.ts'
import { EditIcon, DeleteIcon, BrowseIcon } from 'tdesign-icons-vue-next'
import { watch } from 'vue'
import { useRequest } from 'alova/client'
const searchForm = ref<{ name: string; code: string }>({ name: '', code: '' })

const columns: EnhancedTableProps['columns'] = [
  { colKey: 'name', title: '部门名称', ellipsis: true },
  { colKey: 'code', title: '部门编码', ellipsis: true },
  {
    colKey: 'operation',
    title: '操作',
    width: 250,
    align: 'center',
    cell: (h, { row }) =>
      h(Space, [
        h(
          Button,
          {
            size: 'small',
            variant: 'text',
            onClick: () => {
              dialog.value = { visible: true, title: '查看', type: 'view' }
              deptForm.value = row as DeptDto
            },
          },
          { icon: () => h(BrowseIcon), default: () => '查看' },
        ),
        h(
          Button,
          {
            size: 'small',
            variant: 'text',
            theme: 'primary',
            onClick: () => {
              dialog.value = { visible: true, title: '编辑', type: 'edit' }
              deptForm.value = row as DeptDto
            },
          },
          { icon: () => h(EditIcon), default: () => '编辑' },
        ),
        h(
          Popconfirm,
          {
            content: '确认删除该项？',
            theme: 'danger',
            onConfirm: async () => {
              if (!row?.id) return
              await deptApi.delete(row.id).send()
              await getList()
            },
          },
          {
            default: () =>
              h(
                Button,
                { size: 'small', variant: 'text', theme: 'danger' },
                { icon: () => h(DeleteIcon), default: () => '删除' },
              ),
          },
        ),
      ]),
  },
]

const treeConfig = reactive({ childrenKey: 'children' })

const deptList = ref<DeptTreeDto[]>([])

// 使用 alova 的 useRequest 管理部门树数据
const {
  data: treeData,
  loading: treeLoading,
  error: treeError,
  send: fetchTree,
} = useRequest(deptApi.tree(), {
  immediate: true, // 页面加载即发起请求
})

watch(treeData, (val) => {
  deptList.value = val ?? []
})

// 提供一个复用的刷新函数，供增删改后调用
const getList = async () => {
  await fetchTree()
}

const deptFormRef = ref<FormInstanceFunctions | null>(null)

const rules: FormProps['rules'] = {
  name: [{ required: true, message: '请输入部门名称！', trigger: 'blur' }],
  code: [{ required: true, message: '请输入部门编码！', trigger: 'blur' }],
  parentId: [{ required: false, message: '请选择上级部门！', trigger: 'change' }],
}

const deptForm = ref<DeptDto>({ name: '', code: '', parentId: '' })

const dialog = ref<{
  visible: boolean
  title: string
  type: 'create' | 'edit' | 'view'
}>({ visible: false, title: '', type: 'create' })

const handleCreateDept = () => {
  dialog.value = { visible: true, title: '新增', type: 'create' }
  // 重置表单
  deptForm.value = { name: '', code: '', parentId: '' }
}

// 部门下拉懒加载
const deptDropdownOptions = ref<DeptDropdownItem[]>([])
const {
  data: dropdownData,
  loading: dropdownLoading,
  send: fetchDropdown,
} = useRequest(deptApi.dropdown(), { immediate: false })

watch(dropdownData, (opts) => {
  deptDropdownOptions.value = opts ?? []
})

// 弹窗显隐时加载下拉
watch(
  () => dialog.value.visible,
  (visible) => {
    if (visible) fetchDropdown()
  },
)

// 确认处理：根据类型分别调用接口
const handleConfirm = async () => {
  if (dialog.value.type === 'create') {
    const valid = await deptFormRef.value?.validate()
    if (valid !== true) return
    await deptApi.create(deptForm.value).send()
    deptFormRef.value?.reset()
    dialog.value.visible = false
    await getList()
    return
  }

  if (dialog.value.type === 'view') {
    deptFormRef.value?.reset()
    dialog.value.visible = false
    return
  }

  if (dialog.value.type === 'edit') {
    const valid = await deptFormRef.value?.validate()
    if (valid !== true) return
    if (!('id' in deptForm.value) || !deptForm.value['id']) return
    await deptApi
      .update((deptForm.value as any).id, {
        name: deptForm.value.name,
        code: deptForm.value.code,
        parentId: deptForm.value.parentId,
      })
      .send()
    deptFormRef.value?.reset()
    dialog.value.visible = false
    await getList()
  }
}
</script>

<template>
  <t-space class="w-full" direction="vertical">
    <t-card>
      <t-space>
        <!-- 建议使用 data 属性绑定表单模型 -->
        <t-form :data="searchForm" layout="inline">
          <t-form-item label="部门名称" name="name">
            <t-input
              style="width: 200px"
              v-model="searchForm.name"
              clearable
              placeholder="请输入部门名称"
            />
          </t-form-item>
          <t-form-item label="部门编码" name="code">
            <t-input
              style="width: 200px"
              v-model="searchForm.code"
              clearable
              placeholder="请输入部门编码"
            />
          </t-form-item>
        </t-form>
        <t-space>
          <t-button
            type="submit"
            theme="primary"
            variant="base"
            :loading="treeLoading"
            @click="getList"
          >
            <template #icon><t-icon name="search" /></template>
            搜索
          </t-button>
          <t-button
            type="reset"
            theme="primary"
            variant="outline"
            @click="searchForm = { name: '', code: '' }"
          >
            <template #icon><t-icon name="refresh" /></template>
            重置
          </t-button>
        </t-space>
      </t-space>
    </t-card>

    <div class="flex justify-between items-center">
      <t-button theme="success" @click="handleCreateDept">
        <template #icon><t-icon name="plus" /></template>
        新增
      </t-button>
      <t-space>
        <t-button theme="success" variant="outline">
          <template #icon><t-icon name="file-import" /></template>
          导入
        </t-button>
        <t-button theme="primary" variant="outline">
          <template #icon><t-icon name="file-download" /></template>
          导出
        </t-button>
      </t-space>
    </div>

    <t-enhanced-table
      :data="deptList"
      :columns="columns"
      :tree="treeConfig"
      :loading="treeLoading"
      rowKey="id"
      bordered
      stripe
    />

    <t-alert v-if="treeError" theme="error" class="mt-2" :message="String(treeError)" />
  </t-space>

  <t-dialog
    :header="dialog.title"
    :visible="dialog.visible"
    destroy-on-close
    :confirm-btn="{ loading: dropdownLoading }"
    @close="dialog.visible = false"
    @confirm="handleConfirm"
  >
    <t-form ref="deptFormRef" :data="deptForm" :rules="rules" layout="vertical" label-align="top">
      <t-form-item label="部门名称" name="name">
        <t-input v-model="deptForm.name" clearable placeholder="请输入部门名称" />
      </t-form-item>
      <t-form-item label="部门编码" name="code">
        <t-input v-model="deptForm.code" clearable placeholder="请输入部门编码" />
      </t-form-item>
      <t-form-item label="上级部门" name="parentId">
        <t-cascader
          v-model="deptForm.parentId"
          :options="deptDropdownOptions"
          :loading="dropdownLoading"
          clearable
          placeholder="请选择上级部门"
        />
      </t-form-item>
    </t-form>
  </t-dialog>
</template>

<style scoped></style>
