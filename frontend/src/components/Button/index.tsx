import { chakra, defineRecipe } from '@chakra-ui/react';

export const buttonRecipe = defineRecipe({
    base: {
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        cursor:'pointer',
    },
    variants: {
        variant: {
            edit: {
                backgroundColor:'#79ccd4',
                color:'#ffffff',
            },
            delete: {
                backgroundColor:'#e8173d',
                color:'#ffffff',
                width:'60px',
            }
        },
        size: {
            sm: {width:'40px', height: '20px', borderRadius:'5px', fontWeight:'normal'}
        }
    },
});

export const CustomButton = chakra('button',buttonRecipe);
