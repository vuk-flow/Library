'use client';
import { SelectOption } from '@/types/common';
import { createListCollection, Flex, Portal, Select } from '@chakra-ui/react';
type Props = {
  authors: Array<string>;
  handleSelectOption: (value: string) => void;
};
const FilterSection = ({ authors, handleSelectOption }: Props) => {
  const authorsOptions: Array<SelectOption> = authors.map((author) => ({
    label: author,
    value: author,
  }));

  const authorsListCollection = createListCollection({
    items: authorsOptions,
  });

  return (
    <Flex width={'100%'} height={'50%'} padding={'10px'}>
      <Select.Root
        size={'md'}
        collection={authorsListCollection}
        onValueChange={(e) => {
          handleSelectOption(e.value[0]);
        }}
      >
        <Select.Label>Autori</Select.Label>
        <Select.Control>
          <Select.Trigger>
            <Select.ValueText placeholder='Select author/s' />
          </Select.Trigger>
          <Select.IndicatorGroup>
            <Select.Indicator />
          </Select.IndicatorGroup>
        </Select.Control>
        <Portal>
          <Select.Positioner>
            <Select.Content>
              {authorsListCollection.items.map((author) => (
                <Select.Item item={author} key={author.value}>
                  {author.label}
                  <Select.ItemIndicator />
                </Select.Item>
              ))}
            </Select.Content>
          </Select.Positioner>
        </Portal>
      </Select.Root>
    </Flex>
  );
};

export default FilterSection;
