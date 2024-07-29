import type { ThemeConfig } from 'antd';

export const customTheme: ThemeConfig = {
    "token": {
        "colorPrimary": "#f2266b",
        "colorSuccess": "#008000",
        "colorWarning": "#fabc00",
        "colorInfo": "#3997e9",
        "colorLink": "#f2266b",
        "colorBgBase": "#ffffff",
        "wireframe": false
    },
    "components": {
        "Radio": { "buttonBg": "#f2266b", "buttonColor": "white" },
        "Divider": {
            "colorSplit": "rgb(255, 163, 185)",
            "colorText": "rgb(160, 160, 160)",
            "colorTextHeading": "rgb(160, 160, 160)"
        },
        "Anchor": {
            "colorText": "rgb(242, 38, 107)"
        },
        "Carousel": {
            "arrowOffset": 16,
            "arrowSize": 32
        },
        "Card": {
            "headerFontSize": 20
        },
        "Segmented": {
            "colorText": "rgb(255, 255, 255)",
            "itemSelectedBg": "rgb(242, 38, 107)",
            "controlHeight": 40,
            "controlPaddingHorizontal": 20,
            "trackBg": "rgb(255, 255, 255)",
            "fontSize": 18,
            "borderRadiusSM": 14
        },
        "Tabs": {
            "fontSize": 20,
            "verticalItemPadding": "8px 52px",
            "verticalItemMargin": "8px 0 0 0"
        }
    }
}