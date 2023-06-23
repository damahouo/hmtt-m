// 本地存储一系列方法

// 存储数据
export const setItem = (key, value) => {
  // 判断数据类型是否位对象格式  对象格式的话需要先JSON操作 不是的话直接存储
  if (typeof value === 'object') {
    value = JSON.stringify(value)
  }
  localStorage.setItem(key, value)
}

// 读取数据
export const getItem = (key) => {
  // 先获取到本地数据
  const value = localStorage.getItem(key)
  try {
    // 进行try尝试，如果本地数据可以被JSON处理，那么说明数据是对象格式的
    return JSON.parse(value)
  } catch (err) {
    // 如果不可以被JSON处理 那么说明数据不是对象的格式 可以直接返回操作
    return value
  }
}

// 删除数据

export const removeItem = (key) => {
  // 删除本地数据直接提供key即可
  localStorage.removeItem(key)
}
