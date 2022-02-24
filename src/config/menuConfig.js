const menuList = [
    {
    title: 'Index', // 菜单标题名称
    key: '/admin/home', // 对应的path
    icon: 'home', // 图标名称
    },
    {
    title: 'Products',
    key: '/admin/products',
    icon: 'appstore',
    children: [ // 子菜单列表
    {
    title: 'Product Category',
    key: '/admin/category',
    icon: 'bars'
    },
    {
    title: 'Product Management',
    key: '/admin/product',
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
    key: '/admin/role',
    icon: 'safety',
    },
    {title: 'Charts',
    key: '/admin/charts',
    icon: 'area-chart',
    children: [
    {
    title: 'Bar',
    key: '/admin/bar',
    icon: 'bar-chart'
    },
    {
    title: 'Line',
    key: '/admin/line',
    icon: 'line-chart'
    },
    {
    title: 'Pie',
    key: '/admin/pie',
    icon: 'pie-chart'
    },
    ]
    },
    ]
    export default menuList