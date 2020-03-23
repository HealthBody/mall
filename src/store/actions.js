import{ADD_COUNTER, ADD_TO_CART} from './mutations.types'
export default {
  addCart(context, payload) {
    // let oldProduct = null;
    // for(let item of state.cartList){
    //   if (item.iid === payload.iid){
    //     oldProduct = item;
    //   }
    //   if (oldProduct){
    //     oldProduct.count += 1;
    //   }else{
    //     payload.count = 1
    //     state.cartList.push(payload)
    //   }
    // }
    return new Promise((resolve, reject) => {
      let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)

      if (oldProduct) {
        // oldProduct.count += 1;
        context.commit(ADD_COUNTER, oldProduct)
        resolve('商品数量+1')
      }else {
        payload.count = 1;
        // state.cartList.push(payload)
        context.commit(ADD_TO_CART, payload)
        resolve('添加商品成功')
    }
    })
  }
}