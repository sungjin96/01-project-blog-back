export default [
    {
        name: 'blogEntity',
        model: require('./blog.entity').default,
    },
    {
        name: 'tagEntity',
        model: require('./tag.entity').default,
    },
    {
        name: 'categoryEntity',
        model: require('./category.entity').default,
    },
    {
        name: 'userEntity',
        model: require('./user.entity').default,
    },
];
