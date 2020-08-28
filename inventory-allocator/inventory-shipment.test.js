const inventory = require('./inventory-shipment')

test('return inventory shipped from one warehouse', () => {
    var orderList = { apple: 1 };
    var warehouseList = [{ name: 'owd', inventory: { apple: 1 } }];
    var res = [{ owd: { apple: 1 } }]
    expect(inventory(orderList, warehouseList)).toStrictEqual(res);
  });

  test('return inventory shipped from multiple warehouse', () => {
    var orderList = { apple: 10, orange: 50 };
    var warehouseList = [{ name: 'owd', inventory: { apple: 5, orange:35 } }, { name: 'dm', inventory: { apple: 5, orange:25 }}];
    var res = [{ owd: { apple: 5, orange: 35 }},{ dm: { apple: 5, orange: 15 }}]
    expect(inventory(orderList, warehouseList)).toStrictEqual(res);
  });

  test('Order cannot be shipped because there is not enough inventory', () => {
    var orderList = { apple: 1 };
    var warehouseList = [{ name: 'owd', inventory: { apple: 0 } }];
    var res = []
    expect(inventory(orderList, warehouseList)).toStrictEqual(res);
  });

  test('Order cannot be shipped because there no enough inventory', () => {
    var orderList = { apple: 2 , orange : 10};
    var warehouseList = [{ name: 'owd', inventory: { apple: 2, orange : 5 } }];
    var res = []
    expect(inventory(orderList, warehouseList)).toStrictEqual(res);
  });

  test('Empty Order', () => {
    var orderList = {};
    var warehouseList = [{ name: 'owd', inventory: { apple: 1 } }];
    var res = []
    expect(inventory(orderList, warehouseList)).toStrictEqual(res);
  });

  test('Should return empty if the item is not present in the inventory', () => {
    var orderList = {apple : 1};
    var warehouseList = [{ name: 'owd', inventory: { orange: 1 } }];
    var res = []
    expect(inventory(orderList, warehouseList)).toStrictEqual(res);
  });

