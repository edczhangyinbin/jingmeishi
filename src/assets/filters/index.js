// 全局过滤器
// 此文件存放过滤器的函数
// export 导出
export function date(timestamp){
    // timestamp 是字符串格式  *1 变数字格式
    let date = new Date(timestamp * 1);

    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
}

