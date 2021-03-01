class Products extends React.Component {
    constructor() {
        super();
        this.state = { products: [] };
        this.addProduct = this.addProduct.bind(this);
    }

    addProduct(product) {
        product.id = new Date().getTime();
        const newProd = this.state.products.slice();
        newProd.push(product);
        this.setState({ products: newProd });
    }

    render() {
        return React.createElement(
            "div",
            { title: "Inner Div" },
            React.createElement(
                "h1",
                { className: "headClass" },
                " My Company Inventory "
            ),
            React.createElement(
                "h2",
                { className: "headClass" },
                " Showing all available products "
            ),
            React.createElement("hr", null),
            React.createElement(ProductTable, { products: this.state.products }),
            React.createElement(
                "h2",
                null,
                "Add a new product to the inventory"
            ),
            React.createElement("hr", null),
            React.createElement(ProductAdd, { addProduct: this.addProduct })
        );
    }
}

function ProductTable(props) {
    const row = props.products.map(product => React.createElement(ProdRow, { key: product.id, product: product }));

    return React.createElement(
        "div",
        null,
        React.createElement(
            "table",
            { className: "inventory_table" },
            React.createElement(
                "thead",
                null,
                React.createElement(
                    "th",
                    null,
                    "Product Name"
                ),
                React.createElement(
                    "th",
                    null,
                    "Price"
                ),
                React.createElement(
                    "th",
                    null,
                    "Category"
                ),
                React.createElement(
                    "th",
                    null,
                    "Image"
                )
            ),
            React.createElement(
                "tbody",
                null,
                row
            )
        )
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
        const product = { name: addForm.prodName.value, category: addForm.productCategory.value, price: prodPrice.substring(1, prodPrice.length), image: addForm.prodImage.value };
        this.props.addProduct(product);
        addForm.prodName.value = "";
        addForm.prodPrice.value = "$";
        addForm.prodImage.value = "";
    }

    render() {
        return React.createElement(
            "div",
            null,
            React.createElement(
                "form",
                { name: "productAddForm", onSubmit: this.handleSubmit },
                React.createElement(
                    "div",
                    { className: "row" },
                    React.createElement(
                        "div",
                        { className: "column" },
                        React.createElement(
                            "h4",
                            { className: "formTitle" },
                            "Product Category"
                        ),
                        React.createElement(
                            "select",
                            { name: "productCategory" },
                            React.createElement(
                                "option",
                                null,
                                "Shirts"
                            ),
                            React.createElement(
                                "option",
                                null,
                                "Jeans"
                            ),
                            React.createElement(
                                "option",
                                null,
                                "Jackets"
                            ),
                            React.createElement(
                                "option",
                                null,
                                "Sweaters"
                            ),
                            React.createElement(
                                "option",
                                null,
                                "Accessories"
                            ),
                            React.createElement(
                                "option",
                                null,
                                "Haitie"
                            )
                        ),
                        React.createElement(
                            "h4",
                            { className: "formTitle" },
                            "Product Name"
                        ),
                        React.createElement("input", { type: "text", name: "prodName", placeholder: "Product Name" })
                    ),
                    React.createElement(
                        "div",
                        { className: "column" },
                        React.createElement(
                            "h4",
                            { className: "formTitle" },
                            "Product Price"
                        ),
                        React.createElement("input", { defaultValue: "$", type: "text", name: "prodPrice" }),
                        React.createElement(
                            "h4",
                            { className: "formTitle" },
                            "Image URL"
                        ),
                        React.createElement("input", { type: "text", name: "prodImage", placeholder: "Product Image" })
                    )
                ),
                React.createElement("br", null),
                React.createElement(
                    "button",
                    null,
                    "Add Product"
                )
            )
        );
    }
}

function ProdRow(props) {
    const product = props.product;

    return React.createElement(
        "tr",
        null,
        React.createElement(
            "td",
            null,
            product.name
        ),
        React.createElement(
            "td",
            null,
            "$",
            product.price
        ),
        React.createElement(
            "td",
            null,
            product.category
        ),
        React.createElement(
            "td",
            null,
            React.createElement(
                "a",
                { href: product.image, target: "_blank" },
                "View"
            )
        )
    );
};

const element = React.createElement(Products, null);

ReactDOM.render(element, document.getElementById('content'));