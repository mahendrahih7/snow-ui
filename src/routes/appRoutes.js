import React from "react";
import DashboardPageLayout from "../pages/dashboard/DashboardPageLayout";
import HomePage from "../pages/home/HomePage";
import DefaultPage from "../pages/dashboard/DefaultPage";
import DashboardIndex from "../pages/dashboard/DashboardIndex";
import ChangelogPage from "../pages/changelog/ChangelogPage";
import AnalyticsPage from "../pages/dashboard/AnalyticsPage";
import SaasPage from "../pages/dashboard/SaasPage";
import ComponentPageLayout from "../pages/component/ComponentPageLayout";
// import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
// import AppsOutlinedIcon from '@mui/icons-material/AppsOutlined';
// import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
// import FormatListBulletedOutlinedIcon from '@mui/icons-material/FormatListBulletedOutlined';
// import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import AlertPage from "../pages/component/AlertPage";
import ButtonPage from "../pages/component/ButtonPage";
// import InstallationPage from "../pages/installation/InstallationPage";
import DocumentationPage from "../pages/documentation/DocumentationPage";
import SellerLogin from "../components/sellers/SellerLogin";
// import OrderHistory from "../components/orders/OrderHistory";
import ProductList from "../components/sellers/products/ProductList";
import AddProduct from "../components/sellers/products/AddProduct";

const appRoutes = [
  // {
  //   index: true,
  //   element: <HomePage />,
  //   state: "home"
  // },

  {
    path: "/",
    element: <HomePage />,
    state: "installation",
    sidebarProps: {
      displayText: "Overview",
      icon: "nav_icon1.png",
    },
  },
  {
    path: "/dashboard",
    element: <DashboardPageLayout />,
    state: "dashboard",
    sidebarProps: {
      displayText: "Dashboard",
      icon: "nav_icon2.png",
    },
    child: [
      {
        index: true,
        element: <DashboardIndex />,
        state: "dashboard.index",
      },
      {
        path: "/dashboard/default",
        element: <DefaultPage />,
        state: "dashboard.default",
        sidebarProps: {
          displayText: "Default",
        },
      },
      {
        path: "/dashboard/analytics",
        element: <AnalyticsPage />,
        state: "dashboard.analytics",
        sidebarProps: {
          displayText: "Analytic",
        },
      },
      {
        path: "/dashboard/saas",
        element: <SaasPage />,
        state: "dashboard.saas",
        sidebarProps: {
          displayText: "Saas",
        },
      },
    ],
  },
  // {
  //   path: "/orders",
  //   element: <ComponentPageLayout />,
  //   state: "order",
  //   sidebarProps: {
  //     displayText: "Orders",
  //   },
  //   child: [
  //     {
  //       path: "/orders/order-history",
  //       element: <OrderHistory />,
  //       state: "orders.order-history",
  //       sidebarProps: {
  //         displayText: "Order History",
  //       },
  //     },
  //   ],
  // },
  {
    path: "/component",
    element: <ComponentPageLayout />,
    state: "component",
    sidebarProps: {
      displayText: "Components",
      icon: "nav_icon3.png",
    },
    child: [
      {
        path: "/component/alert",
        element: <AlertPage />,
        state: "component.alert",
        sidebarProps: {
          displayText: "Alert",
        },
      },
      {
        path: "/component/button",
        element: <ButtonPage />,
        state: "component.button",
        sidebarProps: {
          displayText: "Button",
        },
      },
    ],
  },
  // {
  //   path: "/analytics",
  //   element: "",
  //   state: "analytics",
  //   sidebarProps: {
  //     displayText: "Analytics",
  //     icon: "nav_icon4.png",
  //   },
  //   child: [
  //     {
  //       path: "/analytics/action",
  //       element: "",
  //       state: "analytics.action",
  //       sidebarProps: {
  //         displayText: "Action",
  //       },
  //     },
  //   ],
  // },
  {
    path: "/products",
    element: "",
    state: "products",
    sidebarProps: {
      displayText: "Products",
      icon: "nav_icon4.png",
    },
    child: [
      {
        path: "/products/product-list",
        element: <ProductList />,
        state: "products.product-list",
        sidebarProps: {
          displayText: "Product List",
        },
      },
      {
        path: "/products/add-product",
        element: <AddProduct />,
        state: "products.add-product",
        sidebarProps: {
          displayText: "Add Product",
        },
      },
    ],
  },
  {
    path: "/invoice",
    element: "",
    state: "invoice",
    sidebarProps: {
      displayText: "Invoice",
      icon: "nav_icon5.png",
    },
    child: [
      {
        path: "/invoice/action",
        element: "",
        state: "/invoice.action",
        sidebarProps: {
          displayText: "Action",
        },
      },
    ],
  },
  {
    path: "/customer",
    element: "",
    state: "customer",
    sidebarProps: {
      displayText: "Customer",
      icon: "nav_icon6.png",
    },
    child: [
      {
        path: "/customer/action",
        element: "",
        state: "/customer.action",
        sidebarProps: {
          displayText: "Action",
        },
      },
    ],
  },
  {
    path: "/sales",
    element: "",
    state: "sales",
    sidebarProps: {
      displayText: "Sales",
      icon: "nav_icon7.png",
    },
    child: [
      {
        path: "/sales/action",
        element: "",
        state: "/sales.action",
        sidebarProps: {
          displayText: "Action",
        },
      },
    ],
  },
  {
    path: "/widgets",
    element: "",
    state: "widgets",
    sidebarProps: {
      displayText: "Widgets",
      icon: "nav_icon8.png",
    },
    child: [
      {
        path: "/widgets/action",
        element: "",
        state: "/widgets.action",
        sidebarProps: {
          displayText: "Action",
        },
      },
    ],
  },
  {
    path: "/settings",
    element: "",
    state: "settings",
    sidebarProps: {
      displayText: "Settings",
      icon: "nav_icon9.png",
    },
    child: [
      {
        path: "/settings/action",
        element: "",
        state: "/settings.action",
        sidebarProps: {
          displayText: "Action",
        },
      },
    ],
  },
  {
    path: "/reviews",
    element: "",
    state: "reviews",
    sidebarProps: {
      displayText: "Reviews",
      icon: "nav_icon10.png",
    },
    child: [
      {
        path: "/reviews/action",
        element: "",
        state: "/reviews.action",
        sidebarProps: {
          displayText: "Action",
        },
      },
    ],
  },
  {
    path: "/food",
    element: "",
    state: "food",
    sidebarProps: {
      displayText: "Food",
      icon: "nav_icon11.png",
    },
    child: [
      {
        path: "/food/action",
        element: "",
        state: "/food.action",
        sidebarProps: {
          displayText: "Action",
        },
      },
    ],
  },
  {
    path: "/food-detail",
    element: "",
    state: "food-detail",
    sidebarProps: {
      displayText: "Food Detail",
      icon: "nav_icon12.png",
    },
    child: [
      {
        path: "/food-detail/action",
        element: "",
        state: "/food-detail.action",
        sidebarProps: {
          displayText: "Action",
        },
      },
    ],
  },
  {
    path: "/wallet",
    element: "",
    state: "wallet",
    sidebarProps: {
      displayText: "Wallet",
      icon: "nav_icon13.png",
    },
    child: [
      {
        path: "/wallet/action",
        element: "",
        state: "/wallet.action",
        sidebarProps: {
          displayText: "Action",
        },
      },
    ],
  },
  {
    path: "/chart",
    element: "",
    state: "chart",
    sidebarProps: {
      displayText: "Chart",
      icon: "nav_icon14.png",
    },
    child: [
      {
        path: "/chart/action",
        element: "",
        state: "/chart.action",
        sidebarProps: {
          displayText: "Action",
        },
      },
    ],
  },
  {
    path: "/calender",
    element: "",
    state: "calender",
    sidebarProps: {
      displayText: "Calender",
      icon: "nav_icon15.png",
    },
    child: [
      {
        path: "/calender/action",
        element: "",
        state: "/calender.action",
        sidebarProps: {
          displayText: "Action",
        },
      },
    ],
  },
  // {
  //   path: "/documentation",
  //   element: <DocumentationPage />,
  //   state: "documentation",
  //   sidebarProps: {
  //     displayText: "Documentation",
  //     icon: 'nav_icon4.png'
  //   }
  // },
  // {
  //   path: "/changelog",
  //   element: <ChangelogPage />,
  //   state: "changelog",
  //   sidebarProps: {
  //     displayText: "Changelog",
  //     icon: 'nav_icon4.png'
  //   },
  // }
];

export default appRoutes;
