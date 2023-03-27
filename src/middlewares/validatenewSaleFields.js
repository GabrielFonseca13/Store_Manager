// module.exports = (req, res, next) => {
//   const itemsSold = req.body;
  
//   const productId = [];
//   const quantity = [];
  
//   itemsSold.forEach((itemSold) => {
//     if (!itemSold.productId) { 
//       productId.push(false);
//     }
//     if (!itemSold.quantity && itemSold.quantity !== 0) {
//       quantity.push(false);
//     }
//   });

//   if (productId.some((item) => item === false)) {
//     return res.status(400).json({ message: '"productId" is required' });
//   } if (quantity.some((item) => item === false)) {
//     return res.status(400).json({ message: '"quantity" is required' });
//   }
  
//   return next();
// };
