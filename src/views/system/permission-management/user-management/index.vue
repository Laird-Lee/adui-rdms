<script setup lang="ts">
import type { FormField } from '@/components/AdForm.tsx'

const userForm = ref({
  username: null,
  nickname: null,
  email: null,
  phone: null,
  avatar: null,
  deptId: null,
  positionId: null,
  roleIds: null,
})

const userFormFields = ref<FormField[]>([
  {
    label: '用户名称',
    name: 'username',
    component: 't-input',
  },
])
</script>

<template>
  <ad-form :form-data="userForm" :form-fields="userFormFields" />
</template>

<style scoped></style>
