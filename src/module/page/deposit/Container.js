import { createContainer } from '@/util'
import Component from './Component'
import NTFToken from '@/service/NTFToken'
import NextyManager from '@/service/NextyManager'
import UserService from '@/service/UserService'

export default createContainer(Component, (state) => {
  return {
    ...state.user
  }
}, () => {
  const ntfTokenService = new NTFToken()
  const nextyManagerService = new NextyManager()
  const userService = new UserService()

  return {
    getWallet () {
      return userService.getWallet()
    },

    async callFunction (functionName, params) {
      return await nextyManagerService.callFunction(functionName, params)
    },

    async approve (amount) {
      return await ntfTokenService.approve(amount)
    },
    async deposit (amount) {
      return await nextyManagerService.callFunction('deposit', [amount])
    },

    getTokenBalance (address) {
      return ntfTokenService.getTokenBalance(address)
    },
    getAllowance () {
      return ntfTokenService.getAllowance()
    },
    getDepositedBalance () {
      return nextyManagerService.getDepositedBalance()
    },
    getStatus () {
      return nextyManagerService.getStatus()
    },
    getCoinbase () {
      return nextyManagerService.getCoinbase()
    },

    // events
    getEventApproval () {
      return ntfTokenService.getEventApproval()
    },
    getEventDeposited () {
      return nextyManagerService.getEventDeposited()
    }
  }
})
