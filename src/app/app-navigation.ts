export const navigation = [
  {
    text: 'Home',
    icon: 'home'
  },
  {
    text: 'Services',
    icon: 'fields',
    items: [
      {
        text: 'Wallet',
        path: '/wallet/depoToWallet',
        icon: 'folder'
      },
      {
        text: 'Horoscope',
        path: '/horoscope',
      },
      {
        text: 'Match Making',
        path: '/matchMaking',
      },
      {
        text: 'Astamangala',
        path: '/astamangala',
      },
      {
        text: 'Numerology',
        path: '/numerology',
      },
      {
        text: 'Nithya Panchanga',
        path: '/panchanga',
      },
    ],
    
  },
  {
    text: 'Registration',
    path:'/registration-form',
    icon: 'folder'
  },
  {
    text: 'Login',
    path:'/login-form',
    icon: 'folder'
  },
  {
    text: 'Settings',
    icon: 'folder',
    path:'/settings',
  },
  {
    text: 'Profile',
    icon: 'user',
    path:'/profile',
  },
  {
    text: 'Admin',
    icon: 'user',
    path:'/admin',
  },
  {
    text: 'About Us',
    icon: 'folder',
  },
  {
    text: 'Contact Us',
    icon: 'folder',
  },
];
