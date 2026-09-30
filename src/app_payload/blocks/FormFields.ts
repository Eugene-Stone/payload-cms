import type { Block } from 'payload'

const baseField = [
  {
    name: 'label',
    type: 'text' as const,
  },
  {
    name: 'name',
    type: 'text' as const,
    required: true,
  },
]

export const FormInput: Block = {
  slug: 'formInput',
  labels: {
    singular: 'Form Input',
    plural: 'Form Inputs',
  },
  fields: [
    ...baseField,
    {
      name: 'placeholder',
      type: 'text',
    },
    {
      name: 'type',
      type: 'select',
      options: ['text', 'email'],
    },
    {
      name: 'isRequired',
      type: 'checkbox',
    },
  ],
}

export const FormTextarea: Block = {
  slug: 'formTextarea',
  labels: {
    singular: 'Form Textarea',
    plural: 'Form Textareas',
  },
  fields: [
    ...baseField,
    {
      name: 'placeholder',
      type: 'text',
    },
    {
      name: 'isRequired',
      type: 'checkbox',
    },
  ],
}

export const FormSelect: Block = {
  slug: 'formSelect',
  labels: {
    singular: 'Form Select',
    plural: 'Form Selects',
  },
  fields: [
    ...baseField,
    {
      name: 'placeholder',
      type: 'text',
    },
    {
      name: 'isRequired',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'options',
      type: 'array',
      fields: [
        {
          name: 'label',
          type: 'text',
        },
        {
          name: 'value',
          type: 'text',
        },
      ],
    },
  ],
}

export const FormCheckboxes: Block = {
  slug: 'formCheckboxes',
  labels: {
    singular: 'Form Checkboxes',
    plural: 'Form Checkboxes',
  },
  fields: [
    ...baseField,
    {
      name: 'type',
      type: 'select',
      defaultValue: 'checkbox',
      options: ['checkbox', 'radio'],
    },
    {
      name: 'items',
      type: 'array',
      fields: [
        {
          name: 'title',
          type: 'text',
        },
        {
          name: 'value',
          type: 'text',
          required: true,
        },
        {
          name: 'isChecked',
          type: 'checkbox',
          defaultValue: false,
        },
      ],
    },
  ],
}

export const FormAgree: Block = {
  slug: 'formAgree',
  labels: {
    singular: 'Form Agree',
    plural: 'Form Agrees',
  },
  fields: baseField,
}

export const FormSubmit: Block = {
  slug: 'formSubmit',
  labels: {
    singular: 'Form Submit',
    plural: 'Form Submits',
  },
  fields: [
    {
      name: 'label',
      type: 'text',
    },
  ],
}

export const formBlocks = [
  FormTextarea,
  FormSubmit,
  FormSelect,
  FormInput,
  FormCheckboxes,
  FormAgree,
]
