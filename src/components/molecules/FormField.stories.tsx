import type { Meta, StoryObj } from '@storybook/react';
import { FormField } from './FormField';

const meta = {
  title: 'Molecules/FormField',
  component: FormField,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'number', 'tel', 'url'],
    },
    disabled: {
      control: 'boolean',
    },
    required: {
      control: 'boolean',
    },
    onChange: { action: 'changed' },
  },
} satisfies Meta<typeof FormField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Email Address',
    id: 'email',
    type: 'email',
    placeholder: 'Enter your email...',
  },
};

export const WithValue: Story = {
  args: {
    label: 'Username',
    id: 'username',
    value: 'johndoe',
    placeholder: 'Enter username...',
  },
};

export const Required: Story = {
  args: {
    label: 'Password',
    id: 'password',
    type: 'password',
    placeholder: 'Enter password...',
    required: true,
  },
};

export const WithHelperText: Story = {
  args: {
    label: 'Phone Number',
    id: 'phone',
    type: 'tel',
    placeholder: '+1 (555) 123-4567',
    helperText: 'Include country code for international numbers',
  },
};

export const WithError: Story = {
  args: {
    label: 'Email Address',
    id: 'email-error',
    type: 'email',
    value: 'invalid-email',
    errorMessage: 'Please enter a valid email address',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled Field',
    id: 'disabled',
    value: 'Cannot edit this',
    disabled: true,
  },
};

