//este archivo js le da funcionalidad a nuestro front
Swal.fire('advertencia, mi creadora está aprendiendo')
/*-------------------------------------------------------------------------------------------------------------------------------------- */

const socket = io(); 

document.getElementById('productForm').addEventListener('submit', (e) => {
    e.preventDefault();

/*obtengo los valores desde mi formulario, produto, descripción, valor, id*/
    const productInput = document.getElementById('producto');
    const descriptionInput = document.getElementById('descripcion');
    const priceInput = document.getElementById('valor');
    const idInput = document.getElementById('id');
   
    const product = productInput.value;
    const description = descriptionInput.value;
    const price = priceInput.value;
    const id = idInput.value;

/*limpia los campos del formulario */
    productInput.value = '';
    descriptionInput.value = '';
    priceInput.value = '';
    idInput.value = '';

/* Crea un objeto con los datos del producto ingresados en el formulario*/
 const newProduct = {
    producto: product,
    descripcion: description,
    valor: price,
    id: id
};

socket.emit('newProduct', newProduct); /*se encarga de enviar el producto al servidor a través de websockets*/
});

socket.emit('messaje', 'hola, me estoy comunicando desde un websocket')









