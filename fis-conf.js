fis.set('project.ignore',['node_modules/**', 'lib/**','output/**', '.git/**', 'fis-conf.js','angular.min.js','jquery-1.11.1.min.js','jquery.nicescroll.min.js'])
fis.set('project.md5Connector ', '.');
fis.match('**.scss', {
    useHash: true,
    rExt: '.css',
    parser: fis.plugin('node-sass', {
        // options...
    })
})
fis.match('js/*.js', {
    // useHash: true,
    // optimizer: fis.plugin('uglify-js'),
    release:'/static/$0'
});
fis.match('**.{less,css,scss}', {
    useHash: true,
    optimizer: fis.plugin('clean-css')
});
fis.match('*.html:css',{
    optimizer:fis.plugin('clean-css')
})
fis.match('**.png', {
    useHash: false
});
fis.match('/images/(*.{png,gif})', {
    //发布到/static/pic/xxx目录下
    release: '/images/$1$2'
});
fis.match('*.png', {
    // fis-optimizer-png-compressor 插件进行压缩，已内置
    optimizer: fis.plugin('png-compressor')
});
// 启用 fis-spriter-csssprites 插件
fis.match('::package', {
    spriter: fis.plugin('csssprites')
})
// 对 CSS 进行图片合并
fis.match('*.css', {
    // 给匹配到的文件分配属性 `useSprite`
    useSprite: true
});
