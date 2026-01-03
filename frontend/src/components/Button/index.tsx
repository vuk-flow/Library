import { chakra, defineRecipe } from '@chakra-ui/react';

export const buttonRecipe = defineRecipe({
  base: {
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    cursor: 'pointer',
  },
  variants: {
    variant: {
      edit: {
        backgroundColor: '#79ccd4',
        color: '#ffffff',
      },
      delete: {
        backgroundColor: '#e8173d',
        color: '#ffffff',
        width: '60px',
      },
      add: {
        backgroundColor: '#42aaf5',
        color: '#ffffff',
        width: '80px',
      },
      save: {
        backgroundColor: '#42aaf5',
        color: '#ffffff',
        width: '80px',
        borderRadius: '10px',
      },
      close: {
        backgroundColor: '#ffffff',
        color: 'black',
        width: '100px',
        border: '1px solid black',
        borderRadius: '10px',
      },
    },
    size: {
      sm: {
        width: '40px',
        height: '20px',
        borderRadius: '5px',
        fontWeight: 'normal',
      },
      md: {
        width: '60px',
        height: '40px',
        borderRadius: '10px',
        fontWeight: 'normal',
      },
    },
  },
});

export const CustomButton = chakra('button', buttonRecipe);
