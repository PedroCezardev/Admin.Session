import { useEffect, useState } from 'react';
import style from './ListProduct.module.css';
import cross_icon from '../../assets/cross_icon.png'

const ListProduct = () => {

  const [allproducts, setAllproducts] = useState([]);

  // função para buscar todos produtos do banco
  const fetchInfo = async () => {
    await fetch('http://localhost:4000/allproducts')
    .then((res) => res.json())
    .then((data) => {
      setAllproducts(data)
    });
  }

  useEffect(() => {
    fetchInfo();
  }, [])

  // função para remover produtos do banco
  const removeProduct = async (id) => {
    await fetch('http://localhost:4000/removeproduct', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type':'application/json',
      },
      body:JSON.stringify({id:id})
    })
    await fetchInfo();
  }

  return (
    <div className={style.listProduct}>
        <h1>Todos os Produtos Listados</h1>
        <div className={style.formatMain}>
          <p>Produtos</p>
          <p>Título</p>
          <p>Preço Antigo</p>
          <p>Preço de Oferta</p>
          <p>Categoria</p>
          <p>Remover</p>
        </div>
        <div className={style.allProducts}>
          <hr />
          {allproducts.map((product, index) => {
            return <> 
                <div key={index} className={style.listProductFormat}>
                  <img src={product.image} className={style.productIcon} alt="" />
                  <p>{product.name}</p>
                  <p>${product.old_price}</p>
                  <p>${product.new_price}</p>
                  <p>{product.category}</p>
                  <img onClick={() => {removeProduct(product.id)}} src={cross_icon} className={style.removeIcon} alt="" />
                </div>
              <hr />
              </>
            })}
        </div>
    </div>
  )
}

export default ListProduct