// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract Pharmaceutical {
    address public owner;

    uint256 private productNumberCounter;

    enum State { Created, Shipped, Received }

    struct Product {
        uint256 productNumber;
        string productId;
        string batchId;
        string drugName;
        string manufacturerName;
        uint256 manufactureDate;
        uint256 expirationDate;
        address currentOwner;
        State currentState;
        uint256 shipmentDate;
        string distributorName;
        string retailerName;
    }

    mapping(uint256 => Product) public products;
    mapping(string => uint256) public productIdToProductNumber;
    mapping(string => uint256[]) public batchIdToProductNumbers;
    mapping(string => uint256[]) public drugNameToProductNumbers;
    mapping(string => uint256[]) public manufacturerNameToProductNumbers;
    mapping(string => uint256[]) public distributorNameToProductNumbers;
    mapping(string => uint256[]) public retailerNameToProductNumbers;

    event ProductCreated(uint256 productNumber);
    event OwnershipTransferred(uint256 productNumber, address from, address to, State stateChanged, string distributorName, string retailerName);
    event ShipmentAdded(uint256 productNumber, uint256 shipmentDate);

    function generateProductNumber() private returns (uint256) {
        productNumberCounter++;
        return productNumberCounter;
    }

    modifier onlyOwner(uint256 _productNumber) {
        require(products[_productNumber].currentOwner == msg.sender, "You are not the owner");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function createProduct(
        string memory _productId,
        string memory _batchId,
        string memory _drugName,
        string memory _manufacturerName,
        uint256 _manufactureDate,
        uint256 _expirationDate
    ) external {
        uint256 newProductNumber = generateProductNumber();

        Product memory newProduct = Product({
            productNumber: newProductNumber,
            productId: _productId,
            batchId: _batchId,
            drugName: _drugName,
            manufacturerName: _manufacturerName,
            manufactureDate: _manufactureDate,
            expirationDate: _expirationDate,
            currentOwner: msg.sender,
            currentState: State.Created,
            shipmentDate: 0,
            distributorName: "",
            retailerName: ""
        });

        products[newProductNumber] = newProduct;
        productIdToProductNumber[_productId] = newProductNumber;
        batchIdToProductNumbers[_batchId].push(newProductNumber);
        drugNameToProductNumbers[_drugName].push(newProductNumber);
        manufacturerNameToProductNumbers[_manufacturerName].push(newProductNumber);

        emit ProductCreated(newProductNumber);
    }

    function transferOwnershipToDistributor(uint256 _productNumber, address _newOwner, string memory _distributorName) external onlyOwner(_productNumber) {
        require(products[_productNumber].currentState == State.Created, "Product is not in a transferable state");

        address previousOwner = products[_productNumber].currentOwner;
        products[_productNumber].currentOwner = _newOwner;
        products[_productNumber].currentState = State.Shipped; 
        products[_productNumber].distributorName = _distributorName;

        distributorNameToProductNumbers[_distributorName].push(_productNumber);

        emit OwnershipTransferred(_productNumber, previousOwner, _newOwner, State.Shipped, _distributorName, "");
    }

    function transferOwnershipToRetailer(uint256 _productNumber, address _newOwner, string memory _retailerName) external onlyOwner(_productNumber) {
        require(products[_productNumber].currentState == State.Shipped, "Product is not in a transferable state");

        address previousOwner = products[_productNumber].currentOwner;
        products[_productNumber].currentOwner = _newOwner;
        products[_productNumber].currentState = State.Received; 
        products[_productNumber].retailerName = _retailerName;

        retailerNameToProductNumbers[_retailerName].push(_productNumber);

        emit OwnershipTransferred(_productNumber, previousOwner, _newOwner, State.Received, "", _retailerName);
    }

    function addShipmentDate(uint256 _productNumber, uint256 _shipmentDate) external onlyOwner(_productNumber) {
        require(products[_productNumber].currentState == State.Shipped, "Product is not in a shippable state");

        products[_productNumber].currentState = State.Shipped;
        products[_productNumber].shipmentDate = _shipmentDate;

        emit ShipmentAdded(_productNumber, _shipmentDate);
    }

    function queryProduct(uint256 _productNumber) external view returns (Product memory) {
        return products[_productNumber];
    }

    function queryProductByProductId(string memory _productId) external view returns (Product memory) {
        uint256 productNumber = productIdToProductNumber[_productId];
        require(productNumber != 0, "No product found for the given product Id");
        return products[productNumber];
    }

    function queryProductsByBatchId(string memory _batchId) external view returns (Product[] memory) {
        uint256[] memory productNumbers = batchIdToProductNumbers[_batchId];
        Product[] memory result = new Product[](productNumbers.length);

        for (uint256 i = 0; i < productNumbers.length; i++) {
            result[i] = products[productNumbers[i]];
        }

        return result;
    }

    function queryProductsByDrugName(string memory _drugName) external view returns (Product[] memory) {
        uint256[] memory productNumbers = drugNameToProductNumbers[_drugName];
        Product[] memory result = new Product[](productNumbers.length);

        for (uint256 i = 0; i < productNumbers.length; i++) {
            result[i] = products[productNumbers[i]];
        }

        return result;
    }

    function queryProductsByManufacturer(string memory _manufacturerName) external view returns (Product[] memory) {
        uint256[] memory productNumbers = manufacturerNameToProductNumbers[_manufacturerName];
        Product[] memory result = new Product[](productNumbers.length);

        for (uint256 i = 0; i < productNumbers.length; i++) {
            result[i] = products[productNumbers[i]];
        }

        return result;
    }

    function queryProductsByDistributor(string memory _distributorName) external view returns (Product[] memory) {
        uint256[] memory productNumbers = distributorNameToProductNumbers[_distributorName];
        Product[] memory result = new Product[](productNumbers.length);

        for (uint256 i = 0; i < productNumbers.length; i++) {
            result[i] = products[productNumbers[i]];
        }

        return result;
    }

    function queryProductsByRetailer(string memory _retailerName) external view returns (Product[] memory) {
        uint256[] memory productNumbers = retailerNameToProductNumbers[_retailerName];
        Product[] memory result = new Product[](productNumbers.length);

        for (uint256 i = 0; i < productNumbers.length; i++) {
            result[i] = products[productNumbers[i]];
        }

        return result;
    }
}
