import {
    createTheme
} from "@mui/material";

export const Theme = createTheme({
    breakpoints: {
        values: {
            xxs: 0,
            xs: 600,
            sm: 1024,
            md: 1250,
            xl: 1440,
            lg: 2560,
        }
    },
})