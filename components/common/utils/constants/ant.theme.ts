import type { ThemeConfig } from 'antd';

export const customTheme: ThemeConfig = {
    "token": {
        "colorPrimary": "#f2266b",
        "colorWarning": "#fabc00",
        "colorInfo": "#3997e9",
        "colorLink": "#f2266b",
        "colorBgBase": "#ffffff",
        "wireframe": false
    },
    "components": {
        "Divider": {
            "colorSplit": "rgb(255, 163, 185)",
            "colorText": "rgb(160, 160, 160)",
            "colorTextHeading": "rgb(160, 160, 160)"
        },
        "Anchor": {
            "colorText": "rgb(242, 38, 107)"
        }
    }
}