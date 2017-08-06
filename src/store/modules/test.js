import * as types from '../mutation-types'

// initial state
// shape: [{ id, quantity }]
const state = {
    zhu: 'zhu hai liang'
}

// getters
const getters = {
    checkoutStatus1: state => state.checkoutStatus1
}

// actions

// mutations
const mutations = {
    [types.ADD_TO_CART](state, { id }) {
        state.lastCheckout = null
        const record = state.added.find(p => p.id === id)
        if (!record) {
            state.added.push({
                id,
                quantity: 1
            })
        } else {
            record.quantity++
        }
    }
}

export default {
    state,
    getters,
    mutations
}
