import { ConfigProvider } from 'antd';
import React from 'react';

// Custom theme settings for Ant Design
const antdTheme = {
  token: {
    colorPrimary: '#7A53E8', // Primary color
    colorLink: '#1890ff', // Link color
    fontSize: 16, // Base font size
    fontSizeHeading1: 24, // Heading font size
    fontFamily: "Poppins",
  },
  components: {
    // Customize specific components here
    Menu: {
      itemColor: '#878A99', // Text color of menu items
      itemHoverColor: '#fff', // Hover text color of menu items
      itemHoverBg: '#73e5e1af', // Background color on hover
      itemSelectedBg: '#7539FF',
      itemSelectedColor: "#fff",
      fontSize: 16, // Base font size
    fontSizeHeading1: 24, // Heading font 
    fontFamily: "Poppins"
    },
    Input: {
      colorBgContainer: "#EFF4FB",
      colorText: 'black',
    },
    DatePicker: {
      colorBgContainer: "#EFF4FB",
      colorText: 'black',

    },
    Select:{
      colorBgContainer: "#EFF4FB",

    },
  
  },
};

export default antdTheme;

