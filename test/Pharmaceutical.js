const { expect } = require("chai");

describe("Pharmaceutical", function () {
  let Pharmaceutical;
  let pharmaceutical;
  let manufacturer;
  let distributor;
  let retailer;

  beforeEach(async function () {
    [manufacturer, distributor, distributorB, retailer] = await ethers.getSigners();

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
    await pharmaceutical.connect(manufacturer).transferOwnershipToDistributor(2, distributorB.address, "DistributorB");
    await pharmaceutical.connect(manufacturer).transferOwnershipToDistributor(3, distributorB.address, "DistributorB"); 

    // Query the product after transfer to distributor
    const productAfterDistributorTransfer = await pharmaceutical.queryProduct(1);

    // Verify ownership transfer to distributor
    expect(productAfterDistributorTransfer.currentOwner).to.equal(distributor.address);
    expect(productAfterDistributorTransfer.currentState).to.equal(0); // State "Created"

    // Add shipment data
    const shipmentDate = 1675000000; // Shipment date (Unix timestamp)
    await pharmaceutical.connect(distributor).addShipmentDate(1, shipmentDate);
    await pharmaceutical.connect(distributorB).addShipmentDate(2, shipmentDate);
    await pharmaceutical.connect(distributorB).addShipmentDate(3, shipmentDate);

    // Query the product after shipment
    const productAfterShipment = await pharmaceutical.queryProduct(1);

    // Verify shipment data
    expect(productAfterShipment.shipmentDate).to.equal(shipmentDate);
    expect(productAfterShipment.currentState).to.equal(1); // State "Shipped"

    // Transfer ownership to retailer
    await pharmaceutical.connect(distributor).transferOwnershipToRetailer(1, retailer.address, "RetailerA");
    await pharmaceutical.connect(distributorB).transferOwnershipToRetailer(2, retailer.address, "RetailerB");
    await pharmaceutical.connect(distributorB).transferOwnershipToRetailer(3, retailer.address, "RetailerB");

    // Query the product after transfer to retailer
    const productAfterRetailerTransfer = await pharmaceutical.queryProduct(1);

    // Verify ownership transfer to retailer
    expect(productAfterRetailerTransfer.currentOwner).to.equal(retailer.address);
    expect(productAfterRetailerTransfer.currentState).to.equal(1); // State "Shipped"

    // Add receiving data
    const receivedDate = 1676000000; // Shipment date (Unix timestamp)
    await pharmaceutical.connect(retailer).addReceivedDate(1, receivedDate);

    // Query the product after shipment
    const productAfterReceived = await pharmaceutical.queryProduct(1);

    // Verify shipment data
    expect(productAfterReceived.receivedDate).to.equal(receivedDate);
    expect(productAfterReceived.currentState).to.equal(2); // State "Received"

    // Query all products
    const allProducts = await pharmaceutical.queryAllProducts();

    // Verify the total number of products
    expect(allProducts.length).to.equal(3);

    // Verify the details of the first product in the array
    expect(allProducts[0].productId).to.equal("123");
    expect(allProducts[0].currentOwner).to.equal(retailer.address);
  });
});
