// localStorage 安全存取：無痕模式或瀏覽器封鎖儲存空間時會直接拋錯，
// 這裡吞掉錯誤改回傳預設值，避免整個 App 白畫面
export function getItem(key) {
  try {
    return localStorage.getItem(key)
  } catch {
    return null
  }
}

export function setItem(key, value) {
  try {
    localStorage.setItem(key, value)
  } catch {
    // 儲存失敗只影響進度記憶，不影響操作
  }
}
