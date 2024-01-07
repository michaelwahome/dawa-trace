const { expect } = require("chai");

describe("Pharmaceutical", function () {
  let Pharmaceutical;
  let pharmaceutical;
  let manufacturer;
  let distributor;
  let retailer;

  beforeEach(async function () {
    [manufacturer, distributor, retailer] = await ethers.getSigners();

    Pharmaceutical = await ethers.getContractFactory("Pharmaceutical");
    pharmaceutical = await Pharmaceutical.deploy();
  });

  it("should create a product and transfer ownership to distributor and retailer", async function () {

    // Create a product
    await pharmaceutical.connect(manufacturer).createProduct(
      "123",
      "batch1",
      "Paracetamol",
      "ManufacturerA",
      1630767600, // Manufacture date (Unix timestamp)
      1672303600 // Expiration date (Unix timestamp)
    );

    await pharmaceutical.connect(manufacturer).createProduct(
        "456",
        "batch1",
        "Paracetamol",
        "ManufacturerA",
        1630767600, // Manufacture date (Unix timestamp)
        1672303600 // Expiration date (Unix timestamp)
      );

    await pharmaceutical.connect(manufacturer).createProduct(
        "789",
        "batch1",
        "Paracetamol",
        "ManufacturerA",
        1630767600, // Manufacture date (Unix timestamp)
        1672303600 // Expiration date (Unix timestamp)
    );


    // Query the product
    const product = await pharmaceutical.queryProduct(1);

    // Verify product details
    expect(product.productId).to.equal("123");
    expect(product.currentOwner).to.equal(manufacturer.address);

    // Transfer ownership to distributor
    await pharmaceutical.connect(manufacturer).transferOwnershipToDistributor(1, distributor.address, "DistributorA");

     // Add shipment data
     const shipmentDate = 1675000000; // Shipment date (Unix timestamp)
     await pharmaceutical.connect(distributor).addShipmentDate(1, shipmentDate); 

    // Query the product after transfer to distributor
    const productAfterDistributorTransfer = await pharmaceutical.queryProduct(1);

    // Verify ownership transfer to distributor
    expect(productAfterDistributorTransfer.currentOwner).to.equal(distributor.address);
    expect(productAfterDistributorTransfer.currentState).to.equal(1); // State "Shipped"

    // Verify shipment data
    expect(productAfterDistributorTransfer.shipmentDate).to.equal(shipmentDate);

    // Transfer ownership to retailer
    await pharmaceutical.connect(distributor).transferOwnershipToRetailer(1, retailer.address, "RetailerA");

    // Query the product after transfer to retailer
    const productAfterRetailerTransfer = await pharmaceutical.queryProduct(1);

    // Verify ownership transfer to retailer
    expect(productAfterRetailerTransfer.currentOwner).to.equal(retailer.address);
    expect(productAfterRetailerTransfer.currentState).to.equal(2); // State "Received"

    // Query the product by ProductId
    const productUsingProductId = await pharmaceutical.queryProductByProductId("123")

    // Verify the product was selected
    expect(productUsingProductId.manufactureDate).to.equal(1630767600);

    // Query the product by ProductId
    const productsUsingBatchId = await pharmaceutical.queryProductsByBatchId("batch1")

    // Verify the product was selected
    expect(productsUsingBatchId[2].productId).to.equal("789");
    
    // Query the product by ProductId
    const productsUsingDrugName = await pharmaceutical.queryProductsByDrugName("Paracetamol")

    // Verify the product was selected
    expect(productsUsingDrugName[1].productId).to.equal("456");

    // Query the product by ProductId
    const productsUsingManufacturer = await pharmaceutical.queryProductsByManufacturer("ManufacturerA")

    // Verify the product was selected
    expect(productsUsingManufacturer[2].productId).to.equal("789");
  });
});
