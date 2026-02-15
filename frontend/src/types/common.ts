export type SelectOption<T = string> = {
  label: string;
  value: T;
};

export const defaultSelectOption: SelectOption = {
  label: 'Select all',
  value: '',
};
