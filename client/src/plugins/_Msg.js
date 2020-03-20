
/**
 * 还没完善，目前的想法是，把项目公用的提示部分都放到这里，便于更新维护。
 */
const messageMap ={
    success:'操作成功',
    error:'操作失败',
    info:'提示信息',
    wraning: '警告信息'
}
export default function (type = 'success', message = null) {
    message = message || messageMap[type]
    message = this.$t(message)
    this.$message({ type, message })
}