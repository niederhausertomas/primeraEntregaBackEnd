import {Router} from 'express'

const router = Router()

import ProductManager from '../productmanager.js';
const manager = new ProductManager('./productos.json');


router.get('/', async (req, res) =>{
    const products = await manager.getProducts()
    res.render('realTimeProducts',
    {
        title: "Lista de Productos",
        products: products
    })

})


export default router;