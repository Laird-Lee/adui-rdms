import { alova } from '@/libs/alova'

export interface DeptDto {
  id?: string
  name: string
  code: string
  parentId?: string
}

export type DeptTreeDto = DeptDto & {
  children?: DeptTreeDto[]
}

// 下拉项类型（按需调整为你后端的字段）
export interface DeptDropdownItem {
  label: string
  value: string
}

const deptApi = {
  create: (data: DeptDto) => alova.Post<void, DeptDto>('/dept', data),
  update: (id: string, data: DeptDto) => alova.Patch<void, DeptDto>(`/dept/${id}`, data),
  delete: (id: string) => alova.Delete<void>(`/dept/${id}`),

  // 列表
  all: () => alova.Get<DeptDto[]>('/dept'),

  // 下拉
  dropdown: () => alova.Get<DeptDropdownItem[]>('/dept/dropdown'),

  // 树
  tree: () => alova.Get<DeptTreeDto[]>('/dept/tree'),
}

export default deptApi
