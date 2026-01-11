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
        width: '60px',
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
        height: '30px',
      },
      save: {
        backgroundColor: '#42aaf5',
        color: '#ffffff',
        width: '80px',
      },
      close: {
        backgroundColor: '#ffffff',
        color: 'black',
        width: '100px',
        border: '1px solid black',
      },
      back: {
        backgroundColor: '#ffffff',
        color: 'black',
        width: '100px',
        height: 'auto',
        border: '1px solid #42aaf5',
        display: 'flex',
        padding: '2px',
      },
    },
    size: {
      sm: {
        borderRadius: '5px',
        fontWeight: 'normal',
        fontSize: '14px',
      },
      md: {
        borderRadius: '10px',
        fontWeight: 'normal',
        fontSize: '14px',
      },
    },
  },
});

export const CustomButton = chakra('button', buttonRecipe);
