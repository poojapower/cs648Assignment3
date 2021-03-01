class Products extends React.Component {
    constructor() {
        super();
        this.state = { products: [] };
        this.addProduct = this.addProduct.bind(this);
    }

    addProduct(product) {
        product.id = new Date().getTime();
        const newProd = this.state.products.slice();
        newProd.push(product)
        this.setState({ products: newProd });
    }

    render() {
        return (
            <div title="Inner Div">
                <h1 className="headClass"> My Company Inventory </h1>
                <h2 className="headClass"> Showing all available products </h2>
                <hr />
                <ProductTable products={this.state.products} />
                <h2>Add a new product to the inventory</h2>
                <hr />
                <ProductAdd addProduct={this.addProduct} />
            </div>
        );
    }
}

function ProductTable(props) {
    const row = props.products.map((product) => <ProdRow key={product.id} product={product} />);

    return (
        <div >
            <table className="inventory_table" >
                <thead>
                    <th>Product Name</th>
                    <th>Price</th>
                    <th>Category</th>
                    <th>Image</th>
                </thead>
                <tbody>
                    {row}
                </tbody>
            </table>
        </div>
    );
}

class ProductAdd extends React.Component {
    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
       e.preventDefault();
        const addForm = document.forms.productAddForm;
        const prodPrice = addForm.prodPrice.value;
        const product = { name: addForm.prodName.value, category: addForm.productCategory.value,  price: prodPrice.substring(1, prodPrice.length),image: addForm.prodImage.value };
        this.props.addProduct(product);
        addForm.prodName.value = "";
        addForm.prodPrice.value = "$";
        addForm.prodImage.value = "";
    }

    render() {
        return (
            <div>
                <form name="productAddForm" onSubmit={this.handleSubmit}>
                    <div className="row">
                        <div className="column">
                            <h4 className="formTitle">Product Category</h4>
                            <select name="productCategory">
                                <option >Shirts</option>
                                <option >Jeans</option>
                                <option >Jackets</option>
                                <option >Sweaters</option>
                                <option >Accessories</option>
                                <option >Haitie</option>
                            </select>

                            <h4 className="formTitle">Product Name</h4>
                            <input type="text" name="prodName" placeholder="Product Name" />
                        </div>
                        <div className="column">
                            <h4 className="formTitle">Product Price</h4>
                            <input defaultValue="$" type="text" name="prodPrice" />

                            <h4 className="formTitle">Image URL</h4>
                            <input type="text" name="prodImage" placeholder="Product Image"/>
                        </div>
                    </div>

                    <br />
                    <button>Add Product</button>
                </form>
            </div>
        );
    };
}

function ProdRow(props) {
    const product = props.product;

    return (
        <tr>
            <td>{product.name}</td>
            <td>${product.price}</td>
            <td>{product.category}</td>
            <td><a href={product.image} target="_blank">View</a></td>
        </tr>
    );
};


const element = <Products/>

ReactDOM.render(element, document.getElementById('content'));
