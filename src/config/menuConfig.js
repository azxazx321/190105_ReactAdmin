const menuList = [
    {
    title: 'Index', // 菜单标题名称
    key: 'home', // 对应的path
    icon: 'home', // 图标名称
    },
    {
    title: 'Products',
    key: 'products',
    icon: 'appstore',
    children: [ // 子菜单列表
    {
    title: 'Product Category',
    key: 'category',
    icon: 'bars'
    },
    {
    title: 'Product Management',
    key: 'product',
    icon: 'tool'
    },
    ]
    },
    {
    title: 'User Management',
    key: '/admin/user',
    icon: 'user'
    },
    {
    title: 'Role Management',
    key: 'role',
    icon: 'safety',
    },
    {title: 'Charts',
    key: 'charts',
    icon: 'area-chart',
    children: [
    {
    title: 'Bar',
    key: 'bar',
    icon: 'bar-chart'
    },
    {
    title: 'Line',
    key: 'line',
    icon: 'line-chart'
    },
    {
    title: 'Pie',
    key: 'pie',
    icon: 'pie-chart'
    },
    ]
    },
    ]
    export default menuList