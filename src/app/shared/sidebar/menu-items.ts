import { RouteInfo } from './sidebar.metadata';

export const ROUTES: RouteInfo[] = [
  {
    path: '/admin-dashboard-section/admin-dashboard',
    title: 'MAIN DASHBOARD',
    icon: 'mdi mdi-view-dashboard',
    class: '',
    label: '',
    labelClass: '',
    extralink: false,
    submenu: []
  },
  {
    path: '/sub-admin-management/sub-admin-users',
    title: 'MANAGE SUBADMIN',
    icon: 'mdi mdi-account-multiple',
    class: '',
    label: '',
    labelClass: '',
    extralink: false,
    submenu: []
  },

  {
    path: '',
    title: 'USERS MANAGEMENT',
    icon: 'mdi mdi-account-multiple-plus',
    class: 'has-arrow',
    label: '',
    labelClass: '',
    extralink: false,
    submenu: [
      // { path: '/admin/user-overview', title: 'Overview', icon: '', class: '', label: '', labelClass: '', extralink: false, submenu: [] },
      { 
        path: '/admin/users-list',
        title: 'Total Users',
        icon: '',
        class: '', 
        label: '',
        labelClass: '',
        extralink: false,
        submenu: [] 
      },
      { 
        path: '/admin/members',
         title: 'Pending KYC',
          icon: '', class: '',
           label: '',
            labelClass: '',
             extralink: false,
             submenu: [] 
            },
      { path: '/admin/approved_kyc', title: 'Approved KYC', icon: '', class: '', label: '', labelClass: '', extralink: false, submenu: [] },
      { path: '/admin/user-bank', title: 'Bank Details', icon: '', class: '', label: '', labelClass: '', extralink: false, submenu: [] }
    ]
  },
  {
    path: '',
    title: 'ORDERS MANAGEMENT',
    icon: 'mdi mdi-account-multiple-plus',
    class: 'has-arrow',
    label: '',
    labelClass: '',
    extralink: false,
    submenu: [
      // { path: '/transcation/order-list', title: 'Trade Orders', icon: '', class: '', label: '', labelClass: '', extralink: false, submenu: [] },
      {
        path: '/transcation/buysell-orders',
        title: 'Buy/Sell Orders',
        icon: '',
        class: '',
        label: '',
        labelClass: '',
        extralink: false,
        submenu: []
      }
    ]
  },

  {
    path: '',
    title: 'FUND MANAGEMENT',
    icon: 'mdi mdi-scale-balance',
    class: 'has-arrow',
    label: '',
    labelClass: '',
    extralink: false,
    submenu: [
      { path: '/fund/deposit/all', title: 'Deposit', icon: '', class: '', label: '', labelClass: '', extralink: false, submenu: [] },
      {
        path: '/bank-deposits/list/all',
        title: 'Deposit Request',
        icon: '',
        class: '',
        label: '',
        labelClass: '',
        extralink: false,
        submenu: []
      },
      { path: '/fund/withdrawal', title: 'Withdrawal', icon: '', class: '', label: '', labelClass: '', extralink: false, submenu: [] },
      {
        path: '/zadmin/withdraw/list',
        title: 'Withdrawal Requests',
        icon: '',
        class: '',
        label: '',
        labelClass: '',
        extralink: false,
        submenu: []
      }
    ]
  },

  {
    path: '',
    title: 'CURRENCY MANAGEMENT',
    icon: 'mdi mdi-currency-usd',
    class: 'has-arrow',
    label: '',
    labelClass: '',
    extralink: false,
    submenu: [
      {
        path: '/currency-management/currency-manage',
        title: 'Currency',
        icon: '',
        class: '',
        label: '',
        labelClass: '',
        extralink: false,
        submenu: []
      },
      {
        path: '/currency-management/currency-pairs',
        title: 'Currency Pairs',
        icon: '',
        class: '',
        label: '',
        labelClass: '',
        extralink: false,
        submenu: []
      },
      // { path: '/currency-management/currency-pairs', title: 'Currency Pairs', icon: '', class: '', label: '', labelClass: '', extralink: false, submenu: [] },
      {
        path: '/currency-management/currency-summary',
        title: 'Currency Summary',
        icon: '',
        class: '',
        label: '',
        labelClass: '',
        extralink: false,
        submenu: []
      },
      {
        path: '/currency-management/currency-symbols',
        title: 'Active Currency',
        icon: '',
        class: '',
        label: '',
        labelClass: '',
        extralink: false,
        submenu: []
      }
      // { path: '/currency-management/fee-management', title: 'Fee Management', icon: '', class: '', label: '', labelClass: '', extralink: false, submenu: [] }
    ]
  },
  // {
  //   path: '',
  //   title: 'BUY SELL MANAGEMENT',
  //   icon: 'mdi mdi-currency-usd',
  //   class: 'has-arrow',
  //   label: '',
  //   labelClass: '',
  //   extralink: false,
  //   submenu: [
  //     { path: '/buysell-fee', title: 'Fee Management', icon: '', class: '', label: '', labelClass: '', extralink: false, submenu: [] },

  //     // { path: '/currency-management/fee-management', title: 'Fee Management', icon: '', class: '', label: '', labelClass: '', extralink: false, submenu: [] }
  //   ],
  // },

  // {
  //   path: '/earning-management/earnings-list',
  //   title: 'EARNINGS',
  //   icon: 'mdi mdi-crop',
  //   class: '',
  //   label: '',
  //   labelClass: '',
  //   extralink: false,
  //   submenu: [],
  // },
  {
    path: '',
    title: 'LIQUIDITY MANAGEMENT',
    icon: 'mdi mdi-chart-bar',
    class: 'has-arrow',
    label: '',
    labelClass: '',
    extralink: false,
    submenu: [
      {
        path: '/liquidity/liquidity-management/',
        title: 'Buy/Sell Liquidity',
        icon: '',
        class: '',
        label: '',
        labelClass: '',
        extralink: false,
        submenu: []
      },
      { path: '/liquidity/pairs', title: 'Liquidity Pairs', icon: '', class: '', label: '', labelClass: '', extralink: false, submenu: [] }
    ]
  },

  //  {
  //   path: '/liquidity/liquidity-management',
  //   title: 'LIQUIDITY MANAGEMENT',
  //   icon: 'mdi mdi-chart-bar',
  //   class: '',
  //   label: '',
  //   labelClass: '',
  //   extralink: false,
  //   submenu: [

  //   ]

  // },
  {
    path: '',
    title: 'BALANCE REPORT',
    icon: 'mdi mdi-memory',
    class: 'has-arrow',
    label: '',
    labelClass: '',
    extralink: false,
    submenu: [
      {
        path: '/reports/transfer-funds/',
        title: 'Transfer Funds',
        icon: '',
        class: '',
        label: '',
        labelClass: '',
        extralink: false,
        submenu: []
      }
      // { path: '/reports/balance-details/', title: 'Balance Details', icon: '', class: '', label: '', labelClass: '', extralink: false, submenu: [] },
      // { path: '/reports/external-deposit/', title: 'External Deposit', icon: '', class: '', label: '', labelClass: '', extralink: false, submenu: [] },
      // { path: '/reports/export', title: 'Export Balance Details', icon: '', class: '', label: '', labelClass: '', extralink: false, submenu: [] },
    ]
  },

  {
    path: '/settings/setting-list',
    title: 'PRICE MANAGEMENT',
    icon: 'mdi mdi-settings-box',
    class: '',
    label: '',
    labelClass: '',
    extralink: false,
    submenu: []
  },
  {
    path: '/admin/banks',
    title: 'PAYMENT METHOD',
    icon: 'mdi mdi-memory',
    class: '',
    label: '',
    labelClass: '',
    extralink: false,
    submenu: []
  }
];
