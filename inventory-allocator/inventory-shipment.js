function getCheapestShipmentList(orderList, warehouseList) {
    var shipmentList = [];
    var isStockNotAvailable = false;
    Object.keys(orderList).forEach(function (item) {
        var units = orderList[item];
        var shipment = warehouseList.map(warehouse => {
            if (units <= 0) {
                return;
            }
            if (warehouse.inventory[item] != null && warehouse.inventory[item] > 0) {
                var result = {};
                var value = {};
                value[item] = warehouse.inventory[item] < units ? warehouse.inventory[item] : units;
                result[warehouse.name] = value;
                units = units - warehouse.inventory[item];
                return result;
            }
        })
        if (units > 0) {
            isStockNotAvailable = true;
            return;
        }
        shipment.filter(element => element != undefined && element != null).forEach(function (warehouseObject, index) {
            var warehouseName = Object.keys(warehouseObject)[0];
            var existingShipment = shipmentList.find(element => element[warehouseName] != null);
            if (existingShipment != undefined) {
                var existingShipmentValue = existingShipment[warehouseName];
                var currShipment = shipment.find(element => element != null && element[warehouseName] != null);
                var currShipmentValue = currShipment[warehouseName];
                existingShipment[warehouseName] = { ...existingShipmentValue, ...currShipmentValue };
            } else {
                shipmentList.push(shipment.find(element => element != null && element[warehouseName] != null));
            }
        });
        if (shipmentList.length == 0) {
            shipmentList = shipment;
        }

    });
    if (isStockNotAvailable) {
        return [];
    }
    return shipmentList;
}

module.exports = getCheapestShipmentList