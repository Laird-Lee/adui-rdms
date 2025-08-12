import {
  Form as TForm,
  FormItem as TFormItem,
  type FormResetEvent,
  type FormRules,
  type SubmitContext,
  type ValidateResultContext,
} from 'tdesign-vue-next'
import {
  defineComponent,
  h,
  type Component,
  type PropType,
  type VNodeChild,
  type ExtractPropTypes,
} from 'vue'

// 1) 字段定义
export type BuiltinFieldType =
  | 't-auto-complete'
  | 't-cascader'
  | 't-checkbox-group'
  | 't-color-picker'
  | 't-date-picker'
  | 't-date-range-picker'
  | 't-input'
  | 't-input-number'
  | 't-tag-input'
  | 't-radio-group'
  | 't-range-input'
  | 't-select'
  | 't-select-input'
  | 't-slider'
  | 't-switch'
  | 't-textarea'
  | 't-transfer'
  | 't-time-picker'
  | 't-time-range-picker'
  | 't-tree-select'
  | 't-upload'

export type FormField<FD extends Record<string, unknown> = Record<string, unknown>> = {
  name: Extract<keyof FD, string>
  label?: string
  component?: BuiltinFieldType | Component
  componentProps?: Readonly<Record<string, unknown>>
  render?: (ctx: { value: unknown; setValue: (val: unknown) => void; formData: FD }) => VNodeChild
  slots?: Record<string, () => VNodeChild>
}

export interface AdFormProps<FD extends Record<string, unknown> = Record<string, unknown>> {
  formData: FD
  labelAlign?: 'left' | 'right' | 'top'
  layout?: 'inline' | 'vertical'
  rules?: FormRules<FD>
  onReset?: (context: { e?: FormResetEvent }) => void
  onSubmit?: (context: SubmitContext<FD>) => void
  onValidate?: (result: ValidateResultContext<FD>) => void
  formFields: Array<FormField<FD>>
}

// 2) 组件映射
const ComponentMap: Record<BuiltinFieldType, Component> = {
  't-auto-complete': TAutoComplete,
  't-cascader': TCascader,
  't-checkbox-group': TCheckboxGroup,
  't-color-picker': TColorPicker,
  't-date-picker': TDatePicker,
  't-date-range-picker': TDateRangePicker,
  't-input': TInput,
  't-input-number': TInputNumber,
  't-tag-input': TTagInput,
  't-radio-group': TRadioGroup,
  't-range-input': TRangeInput,
  't-select': TSelect,
  't-select-input': TSelectInput,
  't-slider': TSlider,
  't-switch': TSwitch,
  't-textarea': TTextarea,
  't-transfer': TTransfer,
  't-time-picker': TTimePicker,
  't-time-range-picker': TTimeRangePicker,
  't-tree-select': TTreeSelect,
  't-upload': TUpload,
}

// 3) v-model 适配
function bindModel<V>(
  props: Readonly<Record<string, unknown>> & {
    onChange?: (val: unknown, ...rest: unknown[]) => void
  },
  value: V,
  setValue: (val: V) => void,
) {
  return {
    ...(props as Record<string, unknown>),
    value,
    onChange: (val: unknown, ...rest: unknown[]) => {
      props?.onChange?.(val, ...rest)
      if (val && typeof val === 'object' && 'value' in (val as object)) {
        const v = (val as { value: V }).value
        setValue(v)
      } else {
        setValue(val as V)
      }
    },
  }
}

// 4) 将 props 定义提取并用 ExtractPropTypes 推导运行时类型
const adFormProps = {
  formData: { type: Object as PropType<Record<string, unknown>>, required: true },
  formFields: { type: Array as PropType<Array<FormField>>, required: true },
  formType: { type: String as PropType<'create' | 'edit' | 'view'>, default: 'create' },
  labelAlign: { type: String as PropType<'left' | 'right' | 'top'>, default: 'top' },
  layout: { type: String as PropType<'inline' | 'vertical'>, default: 'vertical' },
  rules: { type: Object as PropType<FormRules<Record<string, unknown>>>, default: () => ({}) },
  onReset: { type: Function as PropType<AdFormProps['onReset']>, default: undefined },
  onSubmit: { type: Function as PropType<AdFormProps['onSubmit']>, default: undefined },
  onValidate: { type: Function as PropType<AdFormProps['onValidate']>, default: undefined },
} as const

type AdFormRuntimeProps = Readonly<ExtractPropTypes<typeof adFormProps>>

const AdForm = defineComponent({
  name: 'AdForm',
  props: adFormProps,
  setup(props: AdFormRuntimeProps) {
    const renderField = (field: FormField) => {
      const key = field.name as string
      const value = (props.formData as Record<string, unknown>)[key]

      const setValue = (val: unknown) => {
        ;(props.formData as Record<string, unknown>)[key] = val
      }

      if (field.render) {
        return field.render({ value, setValue, formData: props.formData })
      }

      let Comp: Component | undefined
      if (typeof field.component === 'string') {
        Comp = ComponentMap[field.component]
      } else if (field.component) {
        Comp = field.component
      } else {
        Comp = TInput
      }

      const nodeProps = bindModel(field.componentProps ?? {}, value, setValue)
      const slots = field.slots ?? {}

      return h(Comp, nodeProps, slots)
    }

    return () => (
      <TForm
        data={props.formData}
        labelAlign={props.labelAlign}
        layout={props.layout}
        rules={props.rules}
        onReset={props.onReset}
        onSubmit={props.onSubmit}
        onValidate={props.onValidate}
      >
        {props.formFields.map((field: FormField) => (
          <TFormItem key={field.name} name={field.name} label={field.label}>
            {renderField(field)}
          </TFormItem>
        ))}
      </TForm>
    )
  },
})

export default AdForm
