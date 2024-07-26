import { useState } from 'react';
import style from './AddProduct.module.css'
import upload_area from '../../assets/upload_area.svg'

const AddProduct = () => {

    // função para pegar os valores de imagem
    const [image, setImage] = useState(null); 
    
    // função para pegar os valores do formulario
    const [productDetails, setProductDetails] = useState({
        name: "",
        image: "",
        category: "women",
        new_price: "",
        old_price: ""
    })
    
    const imageHandler = (e) => {
        setImage(e.target.files[0]);
    }

    const changeHandler = (e) => {
        setProductDetails({...productDetails, [e.target.name]:e.target.value})
    }

    // função para mandar os valores do formulario para o backend
    const Add_product = async () => {
        console.log("Detalhes do produto antes de enviar a imagem:", productDetails);
        let responseData;
        let product = { ...productDetails};

        let formData = new FormData();
        formData.append('product', image);

        await fetch('http://localhost:4000/upload', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
            },
            body: formData,
        }).then((resp) => resp.json())
          .then((data) => {responseData = data})

        if(responseData && responseData.success){
            product.image = responseData.image_url;
            console.log("Detalhes do produto após receber o URL da imagem:", product);
            
            await fetch('http://localhost:4000/addproduct', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(product),
            }).then((resp) => resp.json()).then((data) => {
                data.success?alert("Produto Adicionado"):alert("Falhou")
            })
        } else {
            console.error("Upload da Imagem Falhou:", responseData);
        }
    };

  return (
    <div className={style.addProduct}>
        <div className={style.itemField}>
            <p>Titulo do Produto</p>
            <input value={productDetails.name} onChange={changeHandler} type="text" name='name' placeholder='Digite aqui' />
        </div>
        <div className={style.addProductPrice}>
            <div className={style.itemField}>
                <p>Preço</p>
                <input value={productDetails.old_price} onChange={changeHandler} type="text" name='old_price' placeholder='Digite aqui' />
            </div>
            <div className={style.itemField}>
                <p>Preço de Oferta</p>
                <input  value={productDetails.new_price} onChange={changeHandler} type="text" name='new_price' placeholder='Digite aqui' />
            </div>
        </div>
        <div className={style.itemField}>
            <p>Categoria do Produto</p>
            <select value={productDetails.category} onChange={changeHandler} name='category' className={style.addProductSeletor} >
                <option value="men">Homen</option>
                <option value="women">Mulher</option>
                <option value="kid">Criança</option>
            </select>
        </div>
        <div className={style.itemField}>
            <label htmlFor='file-input'>
                <img src={image?URL.createObjectURL(image):upload_area} className={style.addProductThumna} alt="" />
            </label>
            <input onChange={imageHandler} type= "file" name='image' id='file-input' hidden />
        </div>
        <button onClick={() => {Add_product()}} className={style.addProductBtn}>Adicionar</button>
    </div>
  )
}

export default AddProduct