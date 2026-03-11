import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

const TOKEN_KEY = 'mall_token'
const USER_KEY = 'mall_user'

export const useAuthStore = defineStore('auth', () => {
  const token = ref(uni.getStorageSync(TOKEN_KEY) || '')
  const user = ref(uni.getStorageSync(USER_KEY) || null)

  const isLoggedIn = computed(() => !!token.value)

  function setToken(newToken) {
    token.value = newToken
    uni.setStorageSync(TOKEN_KEY, newToken)
  }

  function setUser(newUser) {
    user.value = newUser
    uni.setStorageSync(USER_KEY, newUser)
  }

  function clearAuth() {
    token.value = ''
    user.value = null
    uni.removeStorageSync(TOKEN_KEY)
    uni.removeStorageSync(USER_KEY)
  }

  function getToken() {
    return token.value
  }

  return {
    token,
    user,
    isLoggedIn,
    setToken,
    setUser,
    clearAuth,
    getToken
  }
})
